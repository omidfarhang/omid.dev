---
title: "Local AI on Manjaro: Ollama, Aider, and Cline Without Another Subscription"
date: 2026-06-30T01:14:50+03:30
description: "A follow-up to the split Cursor workflow: install Ollama on Manjaro with CUDA, pull coding models, wire up Aider and Cline for scoped local work — with honest limits on tool reliability, privacy, and when to fall back to cloud models."
layout: single
author_profile: true
url: 2026/06/30/local-ai-with-ollama-aider-and-cline-on-manjaro/
shortlink: https://g.omid.dev/d1OsiXZ
tags:
  - Ollama
  - Aider
  - Cline
  - Cursor
  - Cursor IDE
  - Manjaro
  - Linux
  - AI Tools
  - Software Engineering
  - Angular
categories:
  - TechBlog
series:
  id: split-ai-workflow
  title: "Split AI Workflow"
  order: 1
  label: "Local Setup"
  role: part
seeAlso:
  - /2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/
  - /2026/05/29/how-to-install-cursor-ide-in-manjaro/
  - /2026/05/27/angular-mcp-ai-workflows-real-teams/
  - /2025/12/28/personal-knowledge-engine-jupyter-llm/
---

In [How to Stretch Cursor Pro Further](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/), I argued for treating Cursor as the execution layer and routing planning, research, and cheap thinking elsewhere. Ollama got a few paragraphs — enough to explain why local models belong in the pipeline, not enough to actually set them up.

This post is the missing piece: **install Ollama on Manjaro, pick models for your hardware, and connect local agents that can read your repo, edit files, and run commands** without sending code to a cloud API.

The goal is not to cancel Cursor overnight. It is to build a local tier that handles the repetitive work — refactors, documentation, blog formatting, test generation — so premium requests stay reserved for the hard problems.

**Privacy note:** local inference keeps code off third-party cloud APIs, but the model still reads whatever you paste or point an agent at. Treat secrets, production credentials, and regulated data the same way you would in Cursor — redact first, or do not load the repo into an agent at all.

---

## What this setup is not good for

Before installing anything, be honest about the ceiling:

- **Greenfield architecture** — designing a new system from scratch with tradeoffs you have not settled yet
- **Novel debugging** — race conditions, flaky integration tests, or bugs that need deep reasoning across unfamiliar legacy code
- **Current-events research** — anything that requires the web, release notes from last month, or citations
- **Hands-off autonomy** — walk-away agent runs that must get it right the first time
- **Replacing code review** — local 7B–14B models miss things a strong frontier model or a human reviewer will catch

If that is the job, use Perplexity, ChatGPT, or Cursor cloud models from the [split workflow post](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/). This post is for the **boring middle**: scoped refactors, docs, boilerplate, and repetitive monorepo edits where "good enough locally" saves quota.

---

## What you are building

Three layers, each with a clear job:

```
Ollama     → runs the language model (the brain)
Aider      → terminal agent for repo-wide edits (the mechanic)
Cline      → editor agent while you code (the copilot)
Cursor     → cloud fallback when local models get stuck
```

Ollama alone answers questions. Pair it with an agent and, in my experience, you get something in the same *category* as Claude Code or Cursor agent mode — just slower, less reliable on tool use, and weaker on architecture. There is no monthly API bill, but electricity, setup time, and the occasional failed run are real costs too.

---

## 1. Install Ollama on Manjaro

On Manjaro, the straightforward path is the official Arch package in `extra`. If NVIDIA drivers are already installed, add the CUDA companion package — on Arch/Manjaro, `ollama-cuda` depends on `ollama`, so you install both.

### Base install

```bash
sudo pacman -Syu ollama
```

### GPU acceleration (recommended on NVIDIA)

For CUDA on an RTX 3050 or similar:

```bash
sudo pacman -S ollama-cuda
```

This pulls in `ollama` as a dependency if it is not already installed. The base package provides the daemon and CLI; `ollama-cuda` adds the CUDA backend. AMD users would look at `ollama-rocm` instead. See the [ArchWiki Ollama page](https://wiki.archlinux.org/title/Ollama) for package details — names and backends change occasionally, so verify with `pacman -Ss ollama` before copying commands blindly.

### Start the service

```bash
sudo systemctl enable --now ollama.service
```

Verify:

```bash
systemctl status ollama
ollama --version
```

If `ollama --version` runs without complaining about a missing server, you are ready.

### Confirm the GPU is in play

```bash
nvidia-smi
```

You should see your RTX 3050 listed. While a model is generating, run:

```bash
watch -n1 nvidia-smi
```

If GPU memory climbs during inference, Ollama is using CUDA. If not, check that `ollama-cuda` is installed, that the service was restarted after install, and that `nvidia-smi` works outside Ollama — otherwise you are on CPU, which is usable but slower.

---

## 2. Pull a model that matches your machine

My daily driver is an ASUS Vivobook Pro 15 with an RTX 3050 Laptop GPU and (after a RAM upgrade) **40 GB RAM**. That is a comfortable setup for 7B–14B coding models, with larger quants spilling into system RAM when VRAM runs out.

For the full RAM/VRAM tradeoffs and 2026 model families, see the earlier post. Here are practical first pulls:

**Best default for coding:**

```bash
ollama pull qwen2.5-coder:7b
```

**General-purpose alternative:**

```bash
ollama pull qwen3:8b
```

**Other worth trying:**

```bash
ollama pull gemma3:12b      # slower, good prose
ollama pull deepseek-r1:8b  # reasoning-heavy debugging
```

The first run downloads weights. Later runs are offline.

### Useful day-to-day commands

```bash
ollama list                          # downloaded models
ollama pull qwen3:8b                 # update or fetch
ollama rm qwen3:8b                   # delete
ollama ps                            # running models
ollama stop qwen3:8b                 # unload from memory
```

### Interactive and one-shot use

```bash
# Interactive chat
ollama run qwen2.5-coder:7b

# Single prompt
ollama run qwen2.5-coder:7b "Explain Angular Signals"
```

### OpenAI-compatible API

Ollama exposes an HTTP API on `http://localhost:11434`. Many tools — Cursor, VS Code extensions, Open WebUI — connect here:

```bash
curl http://localhost:11434/api/generate \
  -d '{
    "model": "qwen2.5-coder:7b",
    "prompt": "Hello!"
  }'
```

For editor integrations that expect OpenAI format, the base URL is typically `http://localhost:11434/v1`. Native Ollama clients and some agents use the root URL without `/v1` — the Aider and Cline sections below spell out which is which.

### Context window warning

Ollama's default context can be small — often around 2k tokens on older defaults — and **may discard overflow without making it obvious**. For repo work, plan for more headroom:

**If you run Ollama manually** (not only via systemd), Aider's docs recommend starting the server with a larger window:

```bash
OLLAMA_CONTEXT_LENGTH=8192 ollama serve
```

That environment variable is version-dependent; check [Ollama's current docs](https://github.com/ollama/ollama/blob/main/docs/faq.md) if it does not behave as expected. Alternatives include a Modelfile with `PARAMETER num_ctx 8192` (or higher if RAM allows) for a specific model tag.

**If you use the systemd service**, set the variable in an override file rather than running `ollama serve` by hand — otherwise you can end up with two servers fighting for port 11434.

**With Aider specifically**, the tool often expands context per request so prompts are less likely to be silently truncated — but that is not a guarantee for every model or agent. When output looks like it "forgot" half your spec, context limits are the first thing to check.

---

## 3. What local models are actually good at

Do not think of Ollama as "ChatGPT but offline." Think of it as **a local worker you can automate and trust with your codebase**, with clear limits.

### Writing blog posts

Yes — if you supply the facts.

Local models handle:

- turning rough notes into polished prose
- rewriting technical sections
- grammar and style passes
- titles, summaries, and meta descriptions
- bullet points → full article

Example input:

```
- Problem: Cursor agent keeps losing context
- Constraints: huge Nx monorepo, several internal libraries
- Solution: split work into multiple agents with narrow scope
- Result: ~50% less context usage per session
```

Prompt:

> Write a 1500-word blog post in a direct, technical tone. Use short paragraphs and code examples where helpful.

That workflow works well. The model does not know what happened yesterday, what is in your private repo, or how your internal library works unless you paste it in.

### Monorepo chores

This is where local models shine — **long, boring, repetitive tasks** that would burn premium quota in Cursor:

- find every component using `DialogService`
- migrate `subscribe()` calls to `takeUntilDestroyed()`
- add JSDoc to exported functions
- generate Storybook stories from component metadata
- rename `merchantId` → `accountId` across a workspace

The model does not get bored. You still need an agent to read files, apply edits, and iterate — Ollama is only the LLM.

### Tool use and agent reliability

Raw chat quality is only half the story. **Agents live or die on tool-use consistency** — reading the right files, emitting valid diffs, retrying after a failed command, and not wandering scope.

On my hardware with 7B–8B coding models, I see a familiar pattern:

- **Single-file edits and small refactors** — usually fine in Aider or Cline
- **Multi-step plans** — the model sometimes skips files, edits the wrong library, or loops on a lint error it introduced
- **Shell commands** — Cline may propose sensible commands that fail on my PATH, Nx target names, or monorepo layout unless the prompt is very explicit
- **Retry behavior** — cloud agents recover more gracefully; local runs often need you to narrow scope and restart

That is not a reason to skip local agents. It is a reason to **keep tasks bounded** and treat diffs like any other PR — read them, run tests, reject bad hunks.

### What they struggle with

Weaker than frontier cloud models on:

- designing an entire application from scratch
- novel algorithms
- very long context (unless you configure it and have RAM)
- bleeding-edge APIs released last week
- web research

For those, keep Perplexity, ChatGPT, or Cursor in the loop — exactly the split from the [previous post](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/).

---

## 4. "Agent" is not a paid product

The terminology is messy. Here is the distinction:

| Term | What it is |
| --- | --- |
| **Ollama** | Runs the model locally |
| **Agent** | A program that uses the model to read files, edit code, run shell commands, and retry |

You do not need Cursor, Claude Pro, or another subscription for an agent. Several excellent options run locally:

| Tool | Style | Best for |
| --- | --- | --- |
| **[Aider](https://aider.chat/)** | Terminal, Git-aware | Repo-wide refactors, migrations, multi-file edits |
| **[Cline](https://github.com/cline/cline)** | VS Code / Cursor extension | In-editor tasks with approval gates |
| **[Continue](https://continue.dev/)** | VS Code / Cursor extension | Inline assistant, less autonomous |
| **[OpenHands](https://github.com/All-Hands-AI/OpenHands)** | Autonomous sandbox | Heavier setup, more RAM |

For an Angular/Nx monorepo on Linux with a Git workflow, **Ollama + Aider** is the first stack I would try. **Cline** is the in-editor complement when you want to stay inside Cursor/VS Code.

---

## 5. Install and use Aider

In my setup, Aider is the most capable **fully local** terminal agent I have used for repo-wide edits: it reads the tree, edits files, shows Git diffs, and can run shell commands — all pointed at Ollama. Your mileage may vary by model and repo size.

### Install

The recommended path uses a dedicated installer (keeps Python deps isolated):

```bash
python -m pip install aider-install
aider-install
```

If `aider` is not on your PATH, use `python -m aider` instead. See [Aider's install docs](https://aider.chat/docs/install.html) for pipx and uv alternatives.

### Point Aider at Ollama

Aider talks to Ollama's **native API** (not the OpenAI-compatible `/v1` path). Add these to `~/.zshrc` (or `~/.bashrc`) so they persist across sessions:

```bash
# Ollama endpoint
export OLLAMA_API_BASE=http://127.0.0.1:11434

# Default Aider model
export AIDER_MODEL=ollama_chat/qwen2.5-coder:7b
```

The second variable saves you from typing `--model ollama_chat/qwen2.5-coder:7b` on every launch — handy if you stick with one model most of the time. You can still override it per session with the `--model` flag when you need a different model.

See [Aider's Ollama docs](https://aider.chat/docs/llms/ollama.html) if the default endpoint changes.

With both variables set, launching Aider is just:

```bash
cd /path/to/your/nx-workspace
aider
```

Or override the default model for a one-off session:

```bash
aider --model ollama_chat/deepseek-r1:8b
```

If you restarted Ollama with a larger context window, do that in a separate terminal before launching Aider.

### Example prompts

Once Aider is running in your repo root:

> Read the workspace. Find every Angular component using `ChangeDetectionStrategy.Default` and convert it to `OnPush`. Skip components with mutable `@Input()` bindings.

> In `libs/payment`, add an IBAN validator following existing patterns. Update unit tests. Do not touch other libraries.

> Add JSDoc to every exported function in `libs/shared/utils`.

Aider will:

1. Read relevant files
2. Propose edits
3. Show a Git diff
4. Wait for your approval before committing

No subscription. Your code stays on disk — but still on **your** disk, in plaintext, visible to any process you run. Do not point Aider at trees full of secrets.

### Aider vs Claude CLI

Rough comparison from my daily use — not a benchmark:

| Feature | Claude CLI | Ollama + Aider (my setup) |
| --- | --- | --- |
| Edit multiple files | Yes | Yes, with review |
| Read whole repo | Yes | Yes, within context limits |
| Git-aware | Yes | Yes |
| Run shell commands | Yes | Yes |
| Stays local / no cloud API | No | Yes |
| Hard tasks (architecture, subtle bugs) | Stronger in my experience | Weaker; scoped tasks only |

For migrations, documentation, and repetitive refactors, the gap is smaller than you might expect. For novel architecture or a nasty production bug, I still fall back to Cursor or Claude.

### When local mode failed for me

Example from a Hugo blog repo: I asked Aider + `qwen2.5-coder:7b` to add frontmatter fields to a batch of posts and update a related partial. It edited most files correctly but **mis-indented one YAML block** and **skipped two files** at the bottom of the list. Local lint did not catch the YAML issue; the site build failed.

Fix: I reverted the bad hunks, split the job into "three posts at a time," and finished the last two manually in Cursor. Total time was still less than burning agent turns on the whole corpus in the cloud — but **fallback was required**. Plan for that.

---

## 6. Install and use Cline in Cursor or VS Code

Cline is an editor agent: it can create files, run terminal commands (with your approval), and work across multiple files — while you stay in the IDE.

### Install the extension

In VS Code or Cursor:

1. Open Extensions (`Ctrl+Shift+X`)
2. Search for **Cline**
3. Install the extension published as **Cline** (marketplace ID `saoudrizwan.claude-dev` as of mid-2026 — the display name used to be "Claude Dev," so search by ID if the name alone is ambiguous)

Or from the command palette: `ext install saoudrizwan.claude-dev`

Cline also ships a CLI and JetBrains plugin now; this post focuses on the VS Code / Cursor extension. See [Cline's install docs](https://docs.cline.bot/getting-started/installing-cline) for other targets.

### Connect Cline to Ollama

**Preferred path — native Ollama provider** (per [Cline's local models docs](https://docs.cline.bot/running-models-locally/overview)):

1. Open the Cline panel from the activity bar
2. Open Settings (gear icon)
3. Set **API Provider** to **Ollama**
4. Set **Base URL** to `http://localhost:11434` (no `/v1` suffix)
5. Pick your model from the dropdown — in my setup this lists models Ollama already has pulled; if the list is empty, type the tag manually (e.g. `qwen2.5-coder:7b`) after confirming `ollama list` shows it

**Fallback — OpenAI Compatible** (also works with Ollama):

- Base URL: `http://localhost:11434/v1`
- API Key: any string (Ollama ignores it)
- Model ID: your pulled model name exactly as `ollama list` shows it

Send a test prompt. You should see streaming output within a few seconds on a 7B model. If you get "connection refused", check `systemctl status ollama` or `curl http://localhost:11434/api/version`.

Cline's docs also recommend enabling **Use Compact Prompt** under Features for local models — smaller context, faster responses.

### Hybrid workflow with Cursor

You do not have to pick one assistant. This is the setup I use:

```
Cursor / VS Code
├── Cline  → Ollama (local, no API bill)
└── Cursor AI → Claude / GPT (cloud, premium)
```

**Use Cline + Ollama for:**

- rename APIs across a library
- generate tests and JSDoc
- refactor components to Signals
- update imports after a move
- draft documentation from code

**Use Cursor + cloud models for:**

- new architecture
- complex race conditions
- large greenfield features
- tasks where a bad first pass creates expensive cleanup

Same editor. Different assistant depending on difficulty.

Optionally add a `.clinerules` file at the repo root with Nx boundaries, testing conventions, and Angular patterns — the same kind of context you might put in Cursor Rules.

---

## 7. A practical split for daily work

After installing all three — Ollama, Aider, Cline — route tasks like this:

| Task | Tool |
| --- | --- |
| "Fix this across the entire Nx workspace" | **Aider** in terminal |
| "Help me while I edit this component" | **Cline** in editor |
| "I'm stuck on a hard design problem" | **Cursor + cloud model** |
| "Quick regex / commit message / shell one-liner" | **`ollama run`** in a terminal tab |
| "Research what changed in Angular 21" | **Perplexity** (browser) |

Local models benefit from the same discipline as Cursor: **narrow scope beats vague ambition**.

Instead of:

> Build an invoice system.

Try:

> In `libs/payment`, add an IBAN validator. Follow existing validator patterns. Update tests. Do not modify other libraries.

A 7B–8B coding model can often handle that. A whole feature spanning twelve libraries — probably not without breaking it into chunks.

---

## 8. Weekend experiment

If you want a concrete way to evaluate whether local AI can replace part of your subscription spend:

1. Install Ollama, Aider, and Cline (this post)
2. Point both Aider and Cline at the same Ollama model — start with `qwen2.5-coder:7b`
3. For one week, **force yourself to try the local stack first**
4. Keep Cursor/Claude as fallback only when local models fail or stall
5. Track which tasks actually needed the cloud

After a week you will know, from your own repo and habits, where local models are "good enough" and where they are not. That beats any benchmark table.

---

## Troubleshooting

Problems I hit or see often on Manjaro:

| Symptom | Things to check |
| --- | --- |
| **`ollama: command not found`** after install | Open a new shell; confirm `/usr/bin/ollama` exists; on some setups the service runs but the CLI path is not on `PATH` for your user session |
| **Connection refused on :11434** | `systemctl status ollama`; `sudo systemctl restart ollama`; ensure you are not also running a manual `ollama serve` on the same port |
| **GPU idle during generation** | `ollama-cuda` installed? NVIDIA driver working (`nvidia-smi`)? Restart the service after adding CUDA packages |
| **Model not found** | `ollama list` — pull the tag first (`ollama pull qwen2.5-coder:7b`); use the exact tag string in Aider/Cline |
| **Agent loops or nonsense edits** | Shrink scope; switch to a `-coder` model; increase context (`OLLAMA_CONTEXT_LENGTH` or Modelfile); try `ollama_chat/` prefix in Aider |
| **Cline empty model list** | Ollama running before opening settings; type model name manually; try OpenAI Compatible + `/v1` fallback |
| **Everything slow + swap thrash** | Stop unused models (`ollama stop <model>`); close extra browser tabs; 7B + Cursor + `nx serve` competes for RAM on 24 GB machines |

When a local run fails twice on the same task, that is usually the signal to escalate to Cursor cloud rather than fight the model.

---

## Hardware notes for my laptop

On an RTX 3050 Laptop with 40 GB RAM:

- **VRAM** limits how much of a model stays on GPU — expect 7B–8B to run comfortably; 12B+ may split between GPU and RAM
- **40 GB RAM** lets you keep Cursor, Chrome, Docker, `nx serve`, and Ollama open together — a meaningful upgrade from 24 GB for local AI
- **Start with `qwen2.5-coder:7b`** for TypeScript, Angular, Nx, Bash, and test generation

For model families, quantization, and the honest ceiling on laptop hardware, the [Cursor split workflow post](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/) still has the detailed tables.

---

## When to stay on cloud tools

Keep paying for Cursor (or API keys) when:

- the task needs frontier reasoning, not mechanical edits
- you are exploring architecture with no settled spec yet
- copy/paste friction to a local agent costs more time than one premium run
- local agents failed twice on the same scoped task — diminishing returns
- your employer's policy forbids local inference on certain code — check before pointing Aider at production repos

Local AI is not a religion. It is a **cost and privacy lever** for the boring middle of software work — not a guarantee that data is "safe" if the repo should never have been loaded into an agent in the first place.

---

## The stack in one picture

```
┌─────────────────────────────────────────────────────────────┐
│                     Your Manjaro machine                    │
│                                                             │
│   ┌──────────┐    ┌──────────┐    ┌──────────────────┐   │
│   │  Ollama  │◀───│  Aider   │    │ Cline (in Cursor)│   │
│   │  (LLM)   │◀───│ (terminal│    │   (editor agent) │   │
│   └────▲─────┘    │  agent)  │    └────────▲─────────┘   │
│        │          └────┬─────┘             │             │
│        │               │                   │             │
│        │          Git diff /           Approve edits /    │
│        │          repo edits           run commands       │
└────────┼──────────────────┼───────────────────┼───────────┘
         │                  │                   │
         │            Nx monorepo          Hugo blog / demos
         │
         └──── fallback ────▶ Cursor + Claude/GPT (cloud)
```

Ollama is the brain. Aider and Cline are mechanics. Cursor stays in the picture for the jobs local 7B–14B models still fumble.

That is the local half of the split workflow — installed, wired, and ready for the tasks that never needed a premium request in the first place.
