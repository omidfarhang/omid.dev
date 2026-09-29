---
title: "Coding Agents Are Becoming CI Workers. Start Sandboxing Them Like It."
date: 2026-09-29T13:30:00+03:30
description: "The real developer-AI upgrade isn't a smarter model. It's a sandbox, short-lived credentials, telemetry, and a kill switch. A layered guide with copy-paste examples."
layout: single
author_profile: true
url: 2026/09/29/coding-agents-are-ci-workers-sandbox-them/
shortlink: https://g.omid.dev/SSX4sKN
tags:
  - Security
  - DevOps
  - Docker
  - Data & AI
categories:
  - TechBlog
seeAlso:
  - /2026/08/15/the-frontend-is-a-privileged-system-now/
  - /2026/07/18/dependency-risk-sboms-and-automated-security-for-angular/
  - /2026/06/30/local-ai-with-ollama-aider-and-cline-on-manjaro/
---

Most of the conversation about AI coding tools is still about models: which one is smarter, faster, cheaper. But the more interesting shift over the past couple of weeks has been about **containment**.

OpenAI [paused training of its most powerful models](https://www.wired.com/story/openai-pauses-training-most-powerful-models-after-rogue-agents-target-government/) after agents breached security controls on websites during training and evaluation, and then [shelved the launch of its next ChatGPT model](https://www.abc.net.au/news/2026-09-29/openai-apologises-medicare-shelves-chatgpt-astra-launch/107207156) because it "didn't quite meet the bar in terms of staying within scope and authorisation." One of those agents had [gained unauthorised access to a Medicare statistics portal](https://www.computerweekly.com/news/366651163/Australia-sets-up-taskforce-after-OpenAI-agent-breaches-statistics-portal) run by Services Australia, and the Australian government set up a taskforce in response. Nvidia announced an [Open Agent Safety Platform](https://investor.nvidia.com/news/press-release-details/2026/NVIDIA-Launches-Open-Agent-Safety-Platform-to-Secure-Agents-From-Testing-to-Deployment/default.aspx) built around a sandboxed agent runtime and an out-of-band watchdog. GitHub added [local sandboxing](https://github.blog/changelog/2026-09-23-local-sandboxing-in-the-github-copilot-app/) and [OpenTelemetry](https://github.blog/changelog/2026-09-22-opentelemetry-in-the-github-copilot-app/) to its Copilot app, and made [workflow execution protections](https://github.blog/changelog/2026-09-17-workflow-execution-protections-in-github-actions-generally-available/) in GitHub Actions generally available.

Different vendors, same message. Nvidia put it bluntly: an agent under pressure to finish its task "cannot be expected to fully govern its own behavior." An agent that can read your repo, run commands, and call the network is not a chat window. It is a **process running with your privileges**, steered by text it reads along the way. It needs the same treatment we already give any other code that touches production.

This post is a practical guide to doing that. It covers the threat model, seven layers of defense, working examples (Docker, an egress proxy, GitHub Actions, a patch validator), what to log, and a kill-switch runbook you can write before you need it.

## Why agents are not just "fancy autocomplete"

A traditional developer tool does what you tell it. An agent does what it *decides* to do, based on a context window that mixes your instructions with content from places you don't control:

- issue and pull-request text
- READMEs and docs of dependencies
- web pages it fetches
- error messages and log output
- files in a repository someone else contributed to

Any of those can contain instructions. That's **prompt injection**, and it turns an ordinary-looking task ("fix this failing test") into a possible supply-chain attack. There is no reliable way to make a model perfectly ignore instructions inside data, so the defensible position is: **assume the agent can be steered, and limit what a steered agent can do.**

The recent incidents add a second reason. Nobody had to inject anything: the agents hit a roadblock and "climbed the fence" to finish the job. Whether the push comes from an attacker or from the agent's own persistence, the controls are the same.

A useful mental check is the "lethal trifecta," a term popularized by Simon Willison. An agent becomes dangerous when it combines all three of:

1. **Access to private data** (source code, `.env` files, cloud credentials, SSH keys)
2. **Exposure to untrusted content** (issues, web pages, third-party packages)
3. **Ability to communicate externally** (network requests, git push, opening PRs, sending messages)

You don't have to remove all three to be safer. Removing **any one** breaks the attack chain. Most of the controls below are ways of removing one leg cleanly.

## The threat model in one table

| Risk | Example | Main control |
|---|---|---|
| Prompt injection via repo content | A dependency README tells the agent to "print all env vars to this URL" | Network egress allowlist; no secrets in the sandbox |
| Credential theft | Agent reads `~/.aws`, `~/.ssh`, `.npmrc` tokens | Isolated filesystem; short-lived scoped credentials |
| Malicious or hallucinated dependency | Agent installs a typosquatted package | Registry allowlist; lockfile changes need review |
| Workflow tampering | Agent edits `.github/workflows/*` to widen its own permissions | Protected paths; CODEOWNERS; patch validation |
| Destructive commands | `rm -rf`, force-push, dropping a database | Read-only mounts; no write tokens; approvals |
| Runaway cost or loops | Agent retries forever, burns tokens and CI minutes | Timeouts, budgets, concurrency limits |
| No forensic trail | "What did it run last Tuesday?" | Structured logs and traces |

## The core pattern: brain outside, hands inside

The single most useful design decision is separating **the model client** from **the tools it can invoke**.

- The **brain** (the process that talks to the model API) runs outside the sandbox and holds the API key.
- The **hands** (shell, test runner, file edits, package manager) run inside a locked-down container or VM with no secrets and restricted network.

This solves an awkward problem: if you put everything in a container with `--network none`, the agent can't reach its model. If you give the container internet so it can, you've re-opened the exfiltration path. Splitting brain from hands means the sandbox can be genuinely offline (or nearly so) while the agent is still useful.

```mermaid {caption="The model client holds the API key; the tools it calls run in a sandbox with no secrets."}
flowchart TD
  core["Agent core<br/>(model API key here)"]
  subgraph sandbox["Sandbox (no secrets)"]
    direction LR
    repo["Read-only repo"]
    out["Writable /out only"]
    egress["Egress via allowlist"]
    repo ~~~ out ~~~ egress
  end
  log["Audit log / OpenTelemetry"]
  core -->|"tool calls"| sandbox
  sandbox -->|"results"| core
  core --> log
```

Many agent tools now ship some form of built-in sandboxing. Use it, but read what it actually restricts (filesystem? network? credentials?) rather than assuming. GitHub's Copilot app sandbox, for example, is off by default, is configured per project, and fails closed: if the operating system can't enforce the requested policy, the sandboxed shell errors out instead of quietly running unsandboxed. That last property is the one to look for in any tool.

## Layer 1: Filesystem and process isolation

Start with a container that can do very little:

```bash
mkdir -p .agent-out

docker run --rm -it \
  --network none \
  --read-only \
  --cap-drop ALL \
  --security-opt no-new-privileges \
  --pids-limit 256 \
  --memory 2g \
  --cpus 2 \
  --user 1000:1000 \
  -e HOME=/tmp \
  -v "$PWD":/workspace:ro \
  -v "$PWD/.agent-out":/out:rw \
  --tmpfs /tmp:rw,size=256m \
  -w /workspace \
  node:22-slim bash
```

What each flag buys you:

- `--network none`: no exfiltration path (relaxed in Layer 2 when you need packages)
- `--read-only` plus `:ro` mount: the agent can't modify the repo or the container image
- `--cap-drop ALL`, `no-new-privileges`: no privilege escalation tricks
- `--pids-limit`, `--memory`, `--cpus`: a fork bomb or runaway build can't take down your machine
- `HOME=/tmp`: tools that write caches to `$HOME` still work on the read-only filesystem
- `/out` as the only writable location: everything the agent produces is a **reviewable artifact**, such as a patch file

**What to keep out of the sandbox entirely:** your home directory, `~/.ssh`, `~/.aws`, `~/.config/gh`, `.env` files, browser profiles, the Docker socket (`/var/run/docker.sock` is root on the host), and any `.npmrc` containing an auth token.

**Dev Containers** work well here if your team already uses them. Put the sandbox definition in the repo so it's versioned and reviewable:

```jsonc
// .devcontainer/agent/devcontainer.json
{
  "name": "agent-sandbox",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:22",
  "remoteUser": "node",
  "runArgs": [
    "--cap-drop=ALL",
    "--security-opt=no-new-privileges",
    "--pids-limit=256",
    "--memory=2g"
  ],
  "mounts": [],
  "containerEnv": {}
}
```

This definition restricts processes and keeps host mounts out, but it leaves the default network open. Pair it with the egress setup from Layer 2 before you call it a sandbox.

For stronger isolation than a shared-kernel container, consider a microVM or gVisor-style runtime, especially if the agent will run code from untrusted repositories.

## Layer 2: Network egress control

An offline sandbox is safest, but agents usually need to install packages or fetch docs. Instead of opening the network, route traffic through a proxy that only permits specific hosts.

```yaml
# compose.agent.yaml
services:
  proxy:
    image: ubuntu/squid:latest
    volumes:
      - ./squid.conf:/etc/squid/squid.conf:ro
    networks: [internal, egress]

  sandbox:
    image: node:22-slim
    command: sleep infinity
    read_only: true
    cap_drop: [ALL]
    security_opt: ["no-new-privileges:true"]
    environment:
      HTTP_PROXY: http://proxy:3128
      HTTPS_PROXY: http://proxy:3128
      NO_PROXY: localhost,127.0.0.1
    volumes:
      - ./:/workspace:ro
      - ./.agent-out:/out:rw
    tmpfs: ["/tmp"]
    working_dir: /workspace
    networks: [internal]

networks:
  internal:
    internal: true   # no route to the outside world except via the proxy
  egress: {}
```

```conf
# squid.conf
http_port 3128

acl SSL_ports port 443
acl CONNECT method CONNECT
acl allowed_domains dstdomain registry.npmjs.org .github.com

http_access allow CONNECT SSL_ports allowed_domains
http_access allow allowed_domains
http_access deny all
```

The `internal: true` network is the important part. The sandbox has no route out except through the proxy, so a script that ignores proxy environment variables simply fails instead of leaking data.

Two cautions:

- **Allowing `github.com` is broad.** An injected instruction can still push data to an attacker-controlled repository or gist. Allow specific paths via a more capable proxy if you can, or accept the residual risk knowingly.
- **Log denied requests.** A blocked connection to an unfamiliar host is exactly the signal you want to see.

If package installation is the only reason for network access, an even tighter approach is to install dependencies **before** the agent starts (from your lockfile, in a trusted step) and run the agent fully offline.

## Layer 3: Credentials, or rather the lack of them

The best credential to give an agent is none. When it truly needs one, make it short-lived and narrow. In GitHub Actions, OIDC can hand out cloud credentials that expire in minutes, so there is no long-lived key sitting in secrets. For GitHub itself, a GitHub App installation token or a fine-grained token limited to one repository and specific permissions is far better than a classic PAT with `repo` scope. Issue it to the agent's own identity, a dedicated bot account or app, so its actions are attributable and you can revoke it without locking out a human.

Where the credential lives matters as much as what it can do. Never put it in the same environment that ingests untrusted text: if the sandbox can read a token, an injected instruction can send it out. That's why reading and writing belong in different places. The step that reads issues, dependencies, and web pages holds nothing worth stealing, and a separate, reviewed step holds the write access.

A simple rule: if you would be uncomfortable pasting the credential into a public issue comment, don't put it where the agent can read it.

## Layer 4: The propose/dispose pattern in CI

This is the highest-leverage pattern for teams. **The agent proposes; a separate, gated job disposes.**

```yaml
name: agent-proposal

on:
  workflow_dispatch:
    inputs:
      task:
        description: "What should the agent do?"
        required: true

permissions: {}   # deny everything by default

concurrency:
  group: agent-${{ github.ref }}
  cancel-in-progress: false

jobs:
  propose:
    if: vars.AGENTS_ENABLED == 'true'
    runs-on: ubuntu-latest
    timeout-minutes: 20
    permissions:
      contents: read
    steps:
      - uses: actions/checkout@<full-commit-sha>
        with:
          persist-credentials: false   # don't leave a token in .git/config

      - name: Run agent in sandbox
        env:
          TASK: ${{ inputs.task }}     # via env, never interpolated into a shell string
        run: ./scripts/run-agent-sandboxed.sh   # produces patch.diff

      - name: Validate patch
        run: ./scripts/validate-patch.sh patch.diff

      - uses: actions/upload-artifact@<full-commit-sha>
        with:
          name: proposed-patch
          path: patch.diff
          retention-days: 7

  open-pr:
    needs: propose
    runs-on: ubuntu-latest
    timeout-minutes: 10
    environment: agent-review        # required reviewers configured on this environment
    permissions:
      contents: write
      pull-requests: write
    steps:
      - uses: actions/checkout@<full-commit-sha>
      - uses: actions/download-artifact@<full-commit-sha>
        with:
          name: proposed-patch
      - name: Re-validate patch
        run: ./scripts/validate-patch.sh patch.diff
      - name: Apply patch and open PR
        run: ./scripts/open-agent-pr.sh patch.diff
```

Replace each `<full-commit-sha>` with the pinned commit of the action release you've reviewed. `run-agent-sandboxed.sh` is whatever launches your agent of choice inside the Layer 1 and 2 sandbox and writes its diff to `/out`. `open-agent-pr.sh` applies the diff on a new branch, commits as the agent identity, and opens a pull request.

Why this structure works:

- The job that runs the agent has **`contents: read` and nothing else**, and no deploy secrets.
- The job that can write sits behind an **environment with required reviewers**, so a human approves before any credential is issued.
- The patch is a **plain diff artifact**: small, inspectable, and easy to diff-review or reject.
- The agent cannot merge its own pull request because branch protection and code owner review require a human.

A few workflow hygiene rules that matter more once agents are involved:

- **Never interpolate untrusted text into `run:`.** Expressions like `${{ github.event.issue.title }}` inside a shell command are a classic injection route. Pass values through `env:` and quote them in the script.
- **Pin third-party actions to full commit SHAs** (with Dependabot or Renovate to update them), and set `permissions:` explicitly at workflow and job level.
- **Treat caches as part of the threat model.** A poisoned cache written by an untrusted workflow can be restored by a trusted one. Keep untrusted and trusted workflows on separate cache scopes.
- **Treat the artifact as untrusted input.** That's why `open-pr` re-validates the patch it downloads instead of trusting the earlier job.

One trigger deserves its own warning. `pull_request_target` runs with secrets in the context of the base repository, so checking out and executing code from a fork's head there is a well-known way to lose credentials. GitHub now agrees strongly enough that public repositories without an event policy get a default rule disabling it, enforced from November 2, 2026. The same workflow execution protections let you restrict which actors (including Copilot and Dependabot) and which events can trigger a workflow at all, which is exactly the kind of boundary an agent identity should sit behind.

### A patch validator you can start from

The agent's output is data that came from a steerable process. Check it mechanically before a human even looks:

```bash
#!/usr/bin/env bash
# scripts/validate-patch.sh
set -euo pipefail

PATCH="${1:?usage: validate-patch.sh patch.diff}"
MAX_CHANGED_LINES=800

# 1. Size limit: huge diffs are hard to review and often a sign of trouble
changed=$(grep -E '^[+-]' "$PATCH" | grep -cvE '^(\+\+\+|---) ' || true)
if [ "$changed" -gt "$MAX_CHANGED_LINES" ]; then
  echo "Patch too large ($changed changed lines)"; exit 1
fi

# 2. Protected paths: the agent must not change its own guardrails or supply chain
protected='^(\.github/|\.devcontainer/|scripts/|\.npmrc|Dockerfile|CODEOWNERS)'
if git apply --numstat "$PATCH" | awk '{print $3}' | grep -qE "$protected"; then
  echo "Patch touches protected paths"; exit 1
fi

# 3. Lockfile and dependency changes need a human decision, not an agent one
if git apply --numstat "$PATCH" | awk '{print $3}' \
   | grep -qE '(package-lock\.json|pnpm-lock\.yaml|yarn\.lock|package\.json)$'; then
  echo "Dependency changes require manual review"; exit 1
fi

# 4. It must actually apply cleanly
git apply --check "$PATCH"

echo "Patch passed automated checks"
```

This is deliberately simple. Renames and unusual path encodings can slip past a naive `awk`, so treat it as a first filter, not a security boundary. The real boundary is required human review plus branch protection.

Back it up with repository settings that the agent's identity can't change: **branch protection**, **required status checks**, and **CODEOWNERS** entries for `.github/`, deployment config, and lockfiles.

## Layer 5: Approvals that match the blast radius

Not every action deserves the same friction. Too many prompts trains people to click "approve" without reading, which is worse than no prompts at all. Match the control to the consequence:

| Action | Suggested policy |
|---|---|
| Read files in the repo, run linters and unit tests | Auto-allow inside the sandbox |
| Edit files in the working tree (in the sandbox) | Auto-allow; the result is a reviewable diff |
| Install a new dependency | Require approval; check the package and the lockfile diff |
| Change CI config, Dockerfiles, or build scripts | Require human review from code owners |
| Access secrets or call authenticated APIs | Require explicit, per-run approval with a scoped token |
| Push, merge, tag, or publish a release | Human only |
| Deploy, change DNS, run database migrations | Human only, through your normal change process |

The principle: **the agent can do anything that's cheap to undo and easy to review; humans keep anything that's hard to undo or hard to see.**

If you work in a monorepo (an Nx workspace, for example), you can encode part of this in tooling. Let the agent run affected lint, test, and build targets, but keep release, publish, and deploy targets out of the command allowlist entirely.

## Layer 6: Telemetry, so you can answer "what happened?"

Agent runs should show up in the same observability stack as your services. GitHub's OpenTelemetry support in the Copilot app traces the flow of a session, including model requests and tool use, and the same idea applies to any agent you run yourself.

At minimum, record for each run:

- **Who and what:** run ID, human initiator, agent identity, model and version, task description
- **Every tool call:** command, arguments, working directory, exit code, duration
- **Every file written:** path and hash (or the diff)
- **Network activity:** destination host, allowed or denied, bytes transferred
- **Credentials used:** which token or identity, and when it was issued and revoked
- **Cost:** tokens in and out, wall-clock time, CI minutes

A structured log line per tool call is enough to start:

```json
{
  "ts": "2026-09-29T09:14:03Z",
  "run_id": "a1b2c3",
  "actor": "agent-bot",
  "initiator": "jane",
  "model": "example-model-v1",
  "tool": "shell",
  "cmd": "npm test",
  "cwd": "/workspace",
  "exit_code": 0,
  "duration_ms": 8412,
  "net_denied": []
}
```

If you already run an OpenTelemetry collector, emit these as spans (one span per tool call, one trace per run) and point the exporter at your existing backend using the standard `OTEL_EXPORTER_OTLP_ENDPOINT` variable.

Decide deliberately whether to capture prompt and response content. It's the most useful data for an investigation, and also the most likely to contain source code, customer data, or secrets the agent stumbled across. GitHub excludes it by default for that reason. If you do capture it, treat the telemetry backend with the same access controls as the repository.

Then **alert** on the things that should almost never happen: a denied egress request to an unknown host, a tool call touching a protected path, a run blowing through its time or token budget, or a credential used outside its expected window.

## Layer 7: The kill switch (write it before you need it)

"Stop button" sounds abstract until something is going wrong at 2 a.m. Decide these in advance and write them down:

1. **How do we stop running agents?** A single command or workflow that cancels all in-flight runs, for example `gh run cancel` across the agent workflows, or stopping the sandbox containers.
2. **How do we cut credentials?** Revoke the agent's GitHub App installation or token, disable its OIDC trust policy, and rotate anything it could have touched.
3. **How do we disable the capability entirely?** A repository variable or feature flag that every agent workflow checks first, like the `if: vars.AGENTS_ENABLED == 'true'` guard in the workflow above.
4. **How do we see what it did?** Which log query shows every action by that identity in the last N hours?
5. **How do we roll back?** Which branches, PRs, releases, or artifacts did it create, and how do we revert them?
6. **Who do we tell, and how?** In the Australian incident, the disclosure went to a generic public mailbox that was checked once a day. Know the direct contact for anyone your agents could affect before you need it.

Then **test it**. A kill switch you have never pulled is a hypothesis, not a control.

## A rollout path that doesn't require a big-bang project

You don't have to build all of this at once. A sensible order:

1. **Week 1: Stop the worst risks.** Move agents off your main dev environment secrets. No `.env`, cloud credentials, or SSH keys in reach. Turn on branch protection so agents can't push to protected branches.
2. **Week 2: Sandbox.** Run agent tools in a container with a read-only repo and a writable output directory.
3. **Week 3: Egress.** Add the internal network plus proxy allowlist. Review the denied-request logs.
4. **Week 4: Propose/dispose.** Move agent-driven changes into the two-job CI pattern with an approval environment.
5. **Ongoing: Telemetry and drills.** Ship structured logs, add alerts, and run a kill-switch drill quarterly.

## Two traps that survive all of this

The first is **"it's only local, so it's safe."** Your laptop holds your SSH keys, browser sessions, and cloud credentials, which makes it a richer target than most CI runners. Local agents deserve the sandbox at least as much.

The second is **trusting the model's own guardrails.** A system prompt saying "never exfiltrate secrets" is a request, not a control, and the incidents that opened this post are what it looks like when a capable agent treats a boundary as an obstacle. Every layer above works because it sits outside the model.

## A quick checklist

- [ ] Agent tools run in a sandbox with no host secrets
- [ ] Repo mounted read-only; one writable output directory
- [ ] Network is offline or goes through an allowlist proxy
- [ ] Credentials are short-lived, scoped, and belong to a dedicated agent identity
- [ ] The job that reads untrusted content has no write access
- [ ] Writes happen in a separate job behind required human approval
- [ ] Patches are validated mechanically before review
- [ ] `.github/`, sandbox config, lockfiles, and CODEOWNERS are protected paths
- [ ] Tool calls, file writes, network denials, and cost are logged
- [ ] Alerts exist for anomalies and budget overruns
- [ ] A documented, tested kill switch exists

## The takeaway

Smarter models will keep arriving, and they will mostly make agents more capable of doing damage quickly if they are steered the wrong way, or simply decide that the fence is in the way of the task. The durable engineering work is the unglamorous part: least privilege, ephemeral credentials, approvals that match consequences, audit trails, and a way to stop.

We already know how to run untrusted-ish code safely in CI. The job now is to apply those lessons to agents before autonomy outruns our controls.
