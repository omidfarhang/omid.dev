---
title: "How to Stretch Cursor Pro Further: A Split AI Workflow"
date: 2026-06-29T10:00:00+03:30
description: "Cursor Pro is best when it edits code, not when it thinks out loud. A practical split workflow — Perplexity for current research, ChatGPT for planning, Claude for review, Ollama for cheap tasks, and Cursor for multi-file execution — plus what actually counts against your quota."
layout: single
author_profile: true
url: 2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/
shortlink: https://g.omid.dev/CJUh3R5
x_link: https://x.com/omidfarhang/status/2071523930091983286
mastodon_link: https://mastodon.social/@omidfarhang/116832657718683055
bluesky_link: https://bsky.app/profile/omid.dev/post/3mpg5vcgjfk2b
linkedin_link: https://www.linkedin.com/posts/omidfarhang_how-to-stretch-cursor-pro-further-a-split-share-7477290595409874944-fSjh/
tags:
  - Cursor IDE
  - AI Tools
  - Ollama
  - Perplexity
  - Manjaro
  - Linux
  - Software Engineering
  - Angular
categories:
  - TechBlog
series:
  id: split-ai-workflow
  title: "Split AI Workflow"
  order: 0
  label: "Strategy & Quota"
  role: anchor
seeAlso:
  - /2026/06/30/local-ai-with-ollama-aider-and-cline-on-manjaro/
  - /2026/05/29/how-to-install-cursor-ide-in-manjaro/
  - /2026/05/27/angular-mcp-ai-workflows-real-teams/
  - /2025/12/28/personal-knowledge-engine-jupyter-llm/
  - /2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/
---
I use Cursor every day across a lot of codebases — not just one repo. At work that is mostly a large Angular/Nx monorepo plus many smaller web projects. At home it is broader still: [playground companion repos](https://github.com/omidfarhang/example-projects) tied to omid.dev articles, browser demos on [playground.omid.dev](https://playground.omid.dev), Rust/WASM experiments, Linux tooling, and whatever the next post needs. Agent mode, multi-file refactors, and inline edits are genuinely faster than doing the same work by hand on any of them.

But premium requests are finite across *all* of that usage. And if you treat Cursor like a general-purpose chatbot — architecture debates, "why doesn't this compile?", documentation drafts, design brainstorming — you burn through quota on work that never needed IDE integration in the first place.

The fix is not to use Cursor less. It is to **use Cursor for the work only Cursor is good at**, and route everything else to tools that are cheaper, free, or billed differently.

This post is the workflow I landed on after asking exactly that question: *how do I code more with Cursor Pro without treating it as my only AI?*

---

## Treat Cursor as one tool in a pipeline

Cursor shines when the answer has to become a diff:

- editing twenty files at once
- refactoring across a codebase
- applying planned changes in agent mode
- autocomplete, find usages, and repo-aware navigation

Cursor is a poor default for:

- explaining concepts
- brainstorming architecture
- reviewing design before anything is written
- writing documentation
- debugging with long back-and-forth reasoning

Those jobs are fine. They just do not need an IDE-native agent burning premium requests.

A useful mental model:

```
Perplexity  → research (current docs, citations)
ChatGPT     → plan
Claude      → critique
Local model → small utilities
Cursor      → apply changes
Git         → verify
```

Cursor becomes the execution layer in the IDE. Everything upstream is the architect.

---

## Where each tool earns its place

For my kind of work — Nx migrations at the day job, shared libraries, platform decisions, and a rotating set of small demo repos at home — this split has held up:

| Tool | Best use |
| --- | --- |
| **Perplexity** | Current docs, release notes, "what changed in X," library comparisons, tech research with citations — I use this daily |
| **ChatGPT** | Architecture, migration strategy, Angular discussions, debugging complex behavior |
| **Claude** (or any long-context model) | Code review, refactoring ideas, finding hidden issues — Claude tends to shine on long diffs, but GPT-class models are comparable for structured review |
| **Cursor** | Editing files, implementing a predefined plan, agent mode |
| **Ollama (local)** | Shell commands, commit messages, documentation, boilerplate, small code generation |

### Use Perplexity when the answer must be current

Cursor and ChatGPT both carry training cutoffs and repo-local blind spots. When I need **today's** answer — an API that shipped last month, whether a Manjaro package moved, how a library handles a breaking change in the current major — I reach for [Perplexity](https://www.perplexity.ai/) first.

Typical questions:

- "What is the recommended way to configure X in Angular 21?"
- "Did Cursor change how BYO API keys work?"
- "Compare Ollama coding model benchmarks from the last six months"

Perplexity searches the web and returns cited sources. That makes it better than burning a Cursor turn on research that does not touch your codebase, and better than trusting a chat model's memory on fast-moving tooling.

It does not write diffs. It does not know your monorepo. Use it to **ground** the plan, then hand the decision to ChatGPT or straight to Cursor with a spec.

Like ChatGPT Plus and Claude Pro, **Perplexity Pro does not plug into Cursor** — it stays in the browser (or its apps). That is fine. Research is not an IDE job.

### Use ChatGPT for planning, Cursor for execution

Instead of asking Cursor:

> Create a reusable Angular pagination system.

Ask ChatGPT first. Have it produce:

- architecture
- interfaces
- folder layout
- API shape
- edge cases

Then tell Cursor:

> Implement exactly this design. Do not redesign anything.

One focused Cursor run replaces a long chain of exploratory agent turns.

### Use a long-context model as a second pair of eyes

Typical flow:

```
Cursor writes the change
        ↓
Copy the diff or key files
        ↓
Claude (or ChatGPT): find weaknesses, suggest improvements
        ↓
Back to Cursor only after the design is settled
```

I often reach for Claude on long diffs, but any strong frontier model works here. The point is review outside Cursor — not a specific brand loyalty.

### Give Cursor a spec, not a question

Expensive prompt:

> What should we build?

Cheaper prompt:

```
Implement exactly this.

Requirements:
...

Constraints:
...

Acceptance tests:
...

Don't redesign anything.
```

Planning in a browser tab is not inherently cheaper in tokens — a long ChatGPT thread can add up too. The win is **higher value per Cursor request**: you spend premium quota on work that actually needs IDE integration, not on open-ended reasoning you could do anywhere.

Agent runs are not automatically cheap. Large context, repeated file attachments, repo indexing, and tool-call loops can make a single agent session *more* expensive than a planning chat. Agent runs may resend large parts of context between steps — which is why repeated loops get expensive quickly. The split works because **one bounded execution pass with a settled spec** beats ten exploratory agent loops on the same feature.

### A rough cost mental model

Numbers shift with plan tier and model choice, but the shape is consistent:

| Approach | Typical cost pattern |
| --- | --- |
| **ChatGPT planning session** (pagination design, interfaces, edge cases) | One browser session — often free with an existing Plus subscription, or a few cents via API |
| **Ten Cursor agent turns** on the same feature (debating design, retrying, wandering scope) | Ten premium requests — or heavy token usage if usage-billed |
| **One Cursor agent run** with a pasted spec and explicit file scope | One request — higher per-run token cost possible, but fewer total runs |

The goal is not to minimize tokens everywhere. It is to **stop paying IDE prices for non-IDE work**.

---

## What actually counts against Cursor limits

This is the part many developers get wrong. You **can** connect other models and tools to Cursor, but **whether a request counts against your Cursor quota depends on how it is connected — and that behavior is not uniform across models or plans.**

**Check the model label in Cursor.** Some models draw from your bundled premium quota. Others are usage-billed per token even without bringing your own API key. Team vs individual plans, "auto" vs named frontier models, and overage settings can all change the math. Cursor's pricing page and in-app model picker are the source of truth — this post describes patterns, not a guarantee of current billing rules.

### Your own API keys (recommended if you are a heavy user)

Cursor supports bringing your own keys for providers such as OpenAI, Anthropic, and Google.

When Cursor sends a request using **your API key**, that usage is billed by the provider — **not deducted from Cursor's included premium request quota** (subject to Cursor's current implementation and the model you select).

For some usage patterns, paying per token directly can be cheaper than burning through included premium requests.

### Local models via Ollama

Run [Ollama](https://ollama.com/) locally and point Cursor at an OpenAI-compatible base URL (typically `http://localhost:11434/v1`).

In that setup:

- no Cursor AI credits are used
- no API costs
- quality depends on the model and your hardware

**Expect chat and small edits, not reliable agent mode.** Cursor's OpenAI-compatible routing is not always first-class. Tool-calling and agent mode break more often with local models than with hosted frontier models. Many Ollama models do not support tool use reliably at all. Local models are best for terminal questions, single-file suggestions, tests, and boilerplate — not as a drop-in replacement for Cursor agent on a large monorepo.

### MCP servers do not replace the model

Cursor supports [MCP (Model Context Protocol)](/2026/05/27/angular-mcp-ai-workflows-real-teams/) servers — GitHub, docs, databases, filesystem tools, and more.

MCP servers are **tools**, not models. They let the selected model query structured context instead of stuffing everything into the prompt. That often improves quality and reduces wasted tokens.

But the reasoning still runs on whichever AI model you picked. **Using MCP does not by itself avoid AI request usage.**

### ChatGPT Plus, Claude Pro, and Perplexity Pro do not plug into Cursor

If you pay for ChatGPT Plus, Claude Pro, or Perplexity Pro, those subscriptions work only inside their own apps.

Cursor cannot "borrow" your personal subscriptions. There is no backend API that exposes Plus/Pro accounts to third-party editors.

The practical offload is manual: plan in the browser, implement in Cursor.

---

## Reduce token waste inside Cursor

Even when Cursor is the right tool, you can spend less per session.

**Build reusable prompt files.** Instead of retyping the same conventions every day:

```
.angular.md
.testing.md
.architecture.md
.review.md
```

Reference them in Cursor rules or `@` mentions. Same guardrails, fewer repeated tokens.

**Keep context small.** Attach the component, service, test, or interface — not the entire workspace unless the task truly needs it.

**Watch for repeated large prompts.** Some providers support context caching or reuse; Cursor may or may not surface that clearly. Re-sending the same big rules block, architecture doc, or folder context on every message is a silent quota killer — another reason project read files and Cursor Rules beat copy-paste every session.

**Separate thinking from editing.** Do not use agent mode to explore ideas you have not committed to yet.

---

## Self-host the cheap thinking with Ollama

Local inference has crossed the "toy" line for everyday dev tasks. On Linux — Manjaro included — Ollama is straightforward to install and maintain.

Use local models for:

- regex and shell scripts
- SQL
- documentation drafts
- brainstorming
- summarizing logs
- generating tests

Reserve Cursor's frontier models for repository-wide understanding and coordinated edits.

### How much RAM and CPU do you need?

Ollama itself is lightweight. The model is what consumes memory and compute.

| Model size | RAM needed (CPU) | Good for |
| --- | ---: | --- |
| 3B | 3–5 GB | Autocomplete, shell, regex, simple code |
| 7–8B | 6–10 GB | Everyday coding, documentation, small refactors |
| 14B | 12–18 GB | Better reasoning, medium projects |
| 32B | 24–40 GB | Complex code, decent assistant — if you have the RAM |
| 70B | 48–80+ GB | Strong, but impractical on most laptops |

CPU-wise, you do not need a workstation. A modern Ryzen or Intel Core Ultra class chip runs 7B–14B models reasonably well. The tradeoff is speed (very approximate — quantization, GPU offload percentage, and llama.cpp build all move these numbers):

- **7B:** order of magnitude ~20–50 tokens/sec on a good CPU
- **14B:** order of magnitude ~10–20 tokens/sec
- **32B:** often only a few tokens/sec without serious GPU VRAM

**GPU makes the biggest difference.** With NVIDIA VRAM:

- **8 GB** → 7B models run very well
- **12 GB** → 14B becomes practical
- **24 GB** → 32B is much more usable

Without a GPU, Ollama falls back to system RAM and CPU. Usable, just slower.

### What about the NPU?

Many "AI PC" laptops — including mine — advertise an NPU with a TOPS number on the spec sheet. My Vivobook Pro 15 lists **up to 13 TOPS** on the Intel Core Ultra 9 185H.

For local LLMs in 2026, that number is **almost irrelevant**.

| Hardware | Importance for Ollama |
| --- | --- |
| NVIDIA GPU (CUDA) | Excellent |
| System RAM | Very important |
| CPU | Important |
| NPU | Very little today |

The Intel NPU is optimized for Windows Studio Effects, webcam blur, noise cancellation, and small on-device models — not the large matrix multiplications LLMs need. Current inference engines are built around **CUDA**, CPU, and (increasingly) AMD ROCm. Ollama does not have a mature Intel NPU backend.

Projects like OpenVINO, llama.cpp, and oneAPI are gradually improving Intel AI hardware support. In a year or two, NPUs may matter more. Today they do not.

**Do not buy into "AI PC = great LLM machine."** For local coding assistants, CUDA support and RAM still dominate — and a modest RTX 3050 contributes more than a 13 TOPS NPU in today's software stack.

For most developers, **8B is an excellent free junior developer**, **14B is a solid coding companion**, and **32B starts to feel like a capable senior assistant** — if your machine can hold it.

Local models will not replace Cursor for large Nx workspaces. In my experience:

- **Ollama + 7B coding model:** often good enough for everyday single-file tasks, boilerplate, and quick questions — but noticeably weaker on cross-file reasoning and repo-wide refactors
- **Cursor + Claude/GPT:** still the better fit when the task needs coordinated multi-file agentic edits

Think of it as: Ollama replaces Stack Overflow and quick drafts; Cursor replaces the expensive coordinated edit.

---

## "My laptop can't run it" — maybe it can

I assumed local models were out of reach until I looked at my actual machine honestly.

**My daily driver:** ASUS Vivobook Pro 15 N6506MJ, Manjaro Linux, Intel Core Ultra 9 185H, ~24 GB RAM, NVIDIA RTX 3050 Laptop GPU (6 GB VRAM).

The marketing page highlights the NPU. For coding LLMs, the real advantages on this machine are the **22-core CPU**, **24 GB RAM**, and **RTX 3050 with CUDA** — not the TOPS badge.

That is not a datacenter. It is also **not** too weak for useful local models.

### What runs well on this hardware

**Excellent:**

- Qwen3 4B
- Gemma 3 4B
- Qwen2.5-Coder 7B
- DeepSeek-Coder 6.7B

**Usable if you are patient:**

- Qwen3 8B
- Qwen3-Coder 8B (when you want tool-friendly coding over general chat)
- Gemma 3 12B (quantized)
- Qwen2.5-Coder 14B (quantized)
- DeepSeek-R1 14B (quantized) — slower, but strong for step-by-step debugging

**Not worth it here:**

- 32B+ dense models and 70B models — they spill into system RAM and crawl during interactive coding
- Qwen3-Coder 30B (MoE) and Qwen3-Coder-Next — excellent in 2026, but realistically need 24 GB+ VRAM or 48 GB+ system RAM

The 6 GB RTX 3050 will not hold larger models entirely in VRAM, but Ollama can split work between GPU and RAM. That still beats pure CPU inference.

### The wider 2026 landscape (not exhaustive)

No static list stays complete for long — new quantizations and MoE variants ship every few months. The post is not trying to benchmark every GGUF on Hugging Face. It is trying to answer: **which local models are actually worth pulling for dev work in 2026?**

Grouped by job, these are the **families** I watch. Exact Ollama tags change — run `ollama search coder` or browse the [model library](https://ollama.com/search?c=tools) before pulling:

| Job | Families / examples | Pull when… |
| --- | --- | --- |
| **Everyday coding** | Qwen Coder, DeepSeek Coder, Devstral, Codestral, Gemma | TypeScript, Python, Bash, tests, boilerplate |
| **Reasoning / debugging** | DeepSeek R1 and distill variants | Chain-of-thought on a nasty failure, not fast edits |
| **Agentic / tool use** | Qwen3-Coder, newer Qwen3 tool-capable variants | You need tool-calling — verify support before expecting agent mode |
| **Strong general local** | Llama 3.x, Mistral, Phi — at 32B+ or 70B scale | You have 32 GB+ RAM and want one model for many languages |
| **Fast / tiny** | Qwen3, Gemma3, Phi-mini, Granite | Stack Overflow speed on tight RAM |

A few 2026-specific notes:

**MoE changed the game — but not on every laptop.** Models like `qwen3-coder:30b` activate only a few billion parameters per token despite a much larger total size. On a 24 GB GPU they can feel like a frontier coding model. On my 6 GB RTX 3050, they are a benchmark curiosity, not a daily driver. Same story for `qwen3-coder-next` — impressive, but a 48 GB+ class machine.

**`-coder` variants beat general chat models for dev work.** `qwen3:8b` is fine. `qwen2.5-coder:7b` or `qwen3-coder:8b` is usually better for the same RAM budget when the task is code.

**Not every local model plays nice with IDE agents.** Some models analyze well but lack reliable tool-calling for multi-file edits. If Ollama is only a side terminal for quick questions, that does not matter. If you route Cursor agent mode through it, check whether the model supports tools before expecting file operations.

**Context window defaults are often too small.** Ollama may ship with 8k context. For multi-file snippets, create a Modelfile or set `num_ctx` higher (16k–32k if RAM allows). A coding model with tiny context forgets half your prompt mid-task.

**Older models still work.** `starcoder2`, `codellama`, and first-gen `deepseek-coder` are not 2026 leaders anymore, but remain fine for simple completion on very weak hardware.

What we did **not** try to cover: embedding models, vision/multimodal models, image generation, or the full OpenVINO/llama.cpp ecosystem outside Ollama. Those are useful — just a different article.

**If you have more headroom than my laptop:**

| RAM / VRAM | Families that become realistic |
| --- | --- |
| 16 GB | 14B-class models (Qwen3, DeepSeek R1, Phi) — quantized |
| 24 GB | 30B MoE coders (Qwen3-Coder), 32B coders — quantized |
| 32 GB+ | Llama 70B-class, larger quants, comfortable multi-app multitasking |
| 48 GB+ | Latest MoE agent models (e.g. Qwen3-Coder-Next tier) — check Ollama for current tags |

On my 24 GB Vivobook, I treat local models as a **cheap assistant tier** — not a replacement for Cursor's frontier models on large monorepos. That is the honest ceiling, and it is still worth having.

If you are on a tighter machine:

- **8 GB RAM:** some 3B–4B models, but multitasking with an IDE is painful
- **16 GB RAM:** 7B quantized models are realistic; Cursor, Chrome, and Angular builds will compete for memory
- **32 GB RAM:** local coding models become much more comfortable alongside a full dev stack

### RAM upgrade: the investment that actually matters

On the N6506, ASUS ships **8 GB soldered DDR5** plus one SO-DIMM slot. My config has a **16 GB module** in that slot — **24 GB total**. ASUS officially lists **24 GB as the maximum**, though community reports suggest higher-capacity sticks sometimes work; verify before buying.

When I run a normal session — Cursor, Chrome with many tabs, an Angular dev server, Docker, terminal, and Ollama — I can hit **16–20 GB** before the model is fully loaded. That is workable, but tight.

**Replacing the 16 GB SO-DIMM with a 32 GB module** would land at **40 GB total**. That is probably the sweet spot for this laptop:

- run larger quantized models without constant memory pressure
- less swapping to disk
- keep Cursor, Chrome, Docker, and Ollama open together
- smoother multitasking on a heavy frontend stack

More RAM does not make a model smarter. It lets you **load larger models**, **avoid swap**, and **keep your dev stack running** while Ollama works.

If I were spending money specifically to improve local AI on this machine, the priority list would look like this:

1. **More RAM** — swap 16 GB SO-DIMM for 32 GB (DDR5 5600 MHz)
2. **Better GPU** — not practical in a laptop
3. **Faster SSD** — nice, but I already have a 2 TB NVMe drive
4. **NPU** — negligible benefit today

On 24 GB, local models work — I just manage concurrent load more carefully. A RAM upgrade would matter **far more** than any NPU marketing on the product page.

---

## Getting started on Manjaro

For full install steps (CUDA, systemd, Aider, Cline, and agent workflows), see the follow-up: [Local AI on Manjaro: Ollama, Aider, and Cline Without Another Subscription](/2026/06/30/local-ai-with-ollama-aider-and-cline-on-manjaro/).

Install Ollama, then pull a coding-oriented model. On my hardware I would start with one of these:

```bash
# Best default for coding on ~24 GB RAM
ollama pull qwen2.5-coder:7b

# General-purpose Qwen3 if you want one model for code + prose
ollama pull qwen3:8b

# Smaller/faster when Cursor and a dev server already eat RAM
ollama pull qwen3:4b

# Reasoning-heavy debugging (slower — use in a terminal, not agent mode)
ollama pull deepseek-r1:14b
```

If you have 32 GB+ RAM or a GPU with 12 GB+ VRAM, also look at `qwen3-coder:30b` and `deepseek-coder-v2:16b`. If you have 48 GB+ system RAM, `qwen3-coder-next` is the 2026 local agent model everyone benchmarks — but it is not a laptop story.

Browse what is current: `ollama list` after install, or the [Ollama model library](https://ollama.com/search?c=tools) filtered for tools/coding.

Both `qwen2.5-coder:7b` and `qwen3:8b` are sensible first choices for TypeScript, Angular, Bash, Git, SQL, and test generation on a machine like mine.

If you have not set up Cursor on Manjaro yet, I wrote a separate guide for the AppImage install and update script: [How to Install Cursor IDE on Manjaro Linux](/2026/05/29/how-to-install-cursor-ide-in-manjaro/).

To wire Ollama into Cursor, configure an OpenAI-compatible base URL pointing at your local Ollama instance (typically `http://localhost:11434/v1`) and switch models from the editor when you want free local inference instead of a premium cloud model.

On a memory-tight machine, run Ollama in a terminal when you need it and stop it when you do not (`ollama stop <model>` or quit the service). A loaded 7B model can sit on several gigabytes whether or not you are prompting it.

---

## What consistently works

These patterns have held up across weeks of real monorepo work — not just theory.

**Paste compiler and test output elsewhere first.** TypeScript errors, Jest failures, ESLint noise, and CI log snippets are ideal for Perplexity (when the issue might be a known upstream bug), ChatGPT, Claude, or a local model. You get an explanation and a suggested fix without burning a Cursor agent turn on diagnosis.

**Use Cursor Rules for project context that never changes.** Nx boundaries, standalone-component policy, OnPush defaults, testing conventions, forbidden imports — put them in `.cursor/rules` or project rules once. That beats re-attaching half the repo or re-explaining your stack every session. This pairs well with the prompt files mentioned earlier.

**Break agent work into bounded chunks.** One feature, one refactor pass, one migration step — with explicit file scope. "Rename this service and update its three consumers" costs less and fails less often than "modernize the entire auth module."

**Review the diff before accepting.** Cursor is fast at generating plausible code. Catching a wrong import or a missed edge case in the diff view is cheaper than a follow-up agent loop to fix what you should have rejected.

**Use the right model tier for the job.** Fast or "auto" models are fine for mechanical edits — rename a symbol, add a typed interface, wire a boilerplate test. Reserve premium models for multi-file reasoning, unfamiliar legacy code, or tasks where a bad first pass creates expensive cleanup.

**Let Git, CI, and your test runner be the verifier.** The pipeline diagram ends at Git for a reason. Do not ask the agent to "confirm it works" in a long back-and-forth. Run `nx test`, `nx lint`, or your affected target locally — and let CI catch what you miss. In an Nx monorepo, affected targets and lint rules are AI guardrails: they turn vague "looks good" into enforceable constraints.

**Keep a planning artifact.** A short markdown spec, a ChatGPT thread, or even a checklist in the issue tracker gives Cursor something concrete to execute. The best sessions start with "implement section 3 of this doc" — not "figure out what we should do."

**Update the spec when the plan changes.** The split workflow breaks down when copy-paste friction lets the plan drift. An out-of-sync spec produces worse results than no spec — Cursor will confidently implement the wrong thing.

---

## More ideas worth trying

**Terminal Ollama for micro-tasks.** You do not need Cursor open to ask a local model for a regex, a `git rebase` command sequence, a Dockerfile snippet, or a commit message from `git diff`. A separate terminal tab keeps those questions completely off your Cursor quota.

```bash
ollama run qwen2.5-coder:7b "write a bash one-liner to find duplicate package.json versions in an nx monorepo"
```

**Structured handoffs between tools.** When ChatGPT produces a plan, ask for JSON or markdown with fixed headings — interfaces, file list, acceptance criteria. Paste that structure into Cursor verbatim. Less reinterpretation, fewer wasted tokens on both sides.

**MCP for framework docs, not for vibes.** On Angular work, an MCP server that exposes official docs and workspace metadata helps the model query facts instead of hallucinating deprecated APIs. It does not replace the model, but it can shorten prompts and reduce bad edits. See [Angular MCP workflows for real teams](/2026/05/27/angular-mcp-ai-workflows-real-teams/) for the team-level version of this idea.

**Jupyter for exploratory thinking.** When the problem is "what does this data/API behave like?" rather than "change these twelve files," a notebook is often the right environment — and it keeps Cursor out of the loop entirely. I wrote about that split in [Jupyter, ChatGPT, Copilot (Part 1)](/2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/).

**Pre-flight with read-only prompts.** Before agent mode, a single chat message like "list the files you would change and why — do not edit yet" can surface a bad plan cheaply. Then switch to execution with the approved file list.

**Quantized models on limited RAM.** On a 24 GB laptop, prefer `q4_K_M` or similar quantizations over full-precision weights. You trade a small quality hit for fitting the model alongside Cursor and a dev server without swap thrashing.

---

## Things that burn quota for nothing

Avoid these — they are the most common ways I have seen developers (including me) waste premium requests.

**Open-ended agent loops.** "Keep going until it works" without tests or scope is the fastest path to thirty messages and a broken branch. Set a stopping condition: files touched, tests passing, or one specific error resolved.

**Using agent mode to learn a concept.** "Explain how Angular signals work" belongs in Perplexity, ChatGPT, or a local model — especially when you want current docs cited. Agent mode will wander the codebase, attach random files, and act like it is implementing something.

**Attaching the whole monorepo.** `@Codebase` or huge folder context on every prompt is expensive and often noisy. Start narrow; widen only when the task proves it needs more.

**Re-debating architecture inside Cursor.** If you are still arguing about approach, you are not ready for agent mode. Finish the debate in a browser tab, then come back with a decision.

**Asking AI to search for things ripgrep finds instantly.** File names, symbol usages, and string matches are IDE and terminal jobs. Do not pay frontier-model prices for `grep`.

**Premium model for Tab-level work.** If the task is completing one obvious line inside a file you already have open, inline completion or a fast model is enough. Sonnet-class reasoning for a semicolon is overkill.

**Running everything at once on 24 GB.** Ollama 7B + Docker + `nx serve` + Chrome + Cursor can push you into swap and make *everything* feel slow — including Cursor responses. Serialize heavy workloads or stop Ollama between sessions.

**Trusting "AI PC" marketing over hardware reality.** The NPU will not save you. RAM and CUDA will. Do not delay a useful RAM upgrade because the spec sheet already says "AI."

**Expecting cloud subscriptions to integrate.** ChatGPT Plus, Claude Pro, and Perplexity Pro do not plug into Cursor. Manually copying research and plans is the workflow. Fighting that fact leads to half-built automations that break every month.

---

## When to keep everything in Cursor

The split is not universal. Stay in Cursor when:

- you need `@` file context and immediate edits in one flow (tight debug loop on code you can share)
- the task is small, scoped, and already clear — a rename, a test fix, a single-component change
- copy/paste overhead would cost more time than one agent run

Skip the split when the work is mostly thinking with no diff at the end.

---

## Privacy: what goes where

Not all code belongs in every tool. A short policy helps:

| Sensitivity | Safer default |
| --- | --- |
| **Public OSS, blog demos, learning exercises** | Any tool — cloud or local |
| **Employer code under NDA, client IP, credentials-adjacent logic** | Cursor/ChatGPT/Claude only if your contract and company AI policy allow it; otherwise local Ollama or no AI |
| **Secrets, keys, production configs** | Never paste into cloud tools — rotate if you already did |
| **"I am not sure"** | Local model or redact identifiers first |

Local models are not automatically safer — they still see what you paste — but they keep data off third-party training pipelines. Check your employer's policy before sending monorepo code to any external service, Cursor included.

---

## When this workflow is the wrong fit

- **Exploration is the deliverable.** Greenfield spikes where you do not know the shape yet may need iterative agent mode — just budget for it.
- **Zero copy/paste tolerance.** If context-switching to a browser feels worse than burning quota, optimize inside Cursor instead of forcing the split.
- **Strict air-gapped or compliance environments.** You may be limited to local models only — or no AI at all.
- **Stale specs.** If nobody maintains the planning artifact, skip the handoff and pair directly in Cursor with a tight scope.

---

## The workflow in one picture

```
┌──────────────┐     ┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│ Perplexity   │     │  ChatGPT    │     │   Claude    │     │   Ollama    │
│ (research)   │────▶│  (plan)     │────▶│  (review)   │     │  (cheap)    │
└──────────────┘     └─────────────┘     └─────────────┘     └──────┬──────┘
        │                    │                  │                  │
        └────────────────────┴──────────────────┴──────────────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │     Cursor      │
                    │  (apply diffs)  │
                    └────────┬────────┘
                             │
                             ▼
                    ┌─────────────────┐
                    │       Git       │
                    │    (verify)     │
                    └─────────────────┘
```

Reserve Cursor Pro for the step where IDE integration pays off: **turning a settled plan into real changes across your codebase.**

Everything else — planning, critique, small utilities, documentation — belongs elsewhere. That is how you code more with Cursor without treating every question like an agent task.
