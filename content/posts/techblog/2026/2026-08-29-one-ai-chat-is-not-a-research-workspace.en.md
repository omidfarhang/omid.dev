---
title: "One AI Chat Is Not a Research Workspace"
date: 2026-08-29T00:25:01+03:30
description: "Long-form research does not fit in one ChatGPT conversation. A Git repo of messy Markdown — inbox, concepts, counterarguments — lets ideas stay contradictory until you are ready to write."
layout: single
author_profile: true
url: 2026/08/29/one-ai-chat-is-not-a-research-workspace/
shortlink: https://g.omid.dev/cwhrarJ
x_link: https://x.com/OmidFarhang/status/2093450126073499836
mastodon_link: https://mastodon.social/@omidfarhang/117175250469701985
bluesky_link: https://bsky.app/profile/omid.dev/post/3mu6chms4ps2o
linkedin_link: https://lnkd.in/p/gPSMVKQi
keywords:
  - ai research workspace
  - chatgpt conversation limits
  - git markdown knowledge base
  - obsidian research notes
  - observation vs interpretation
tags:
  - AI Tools
  - Data & AI
  - Software Engineering
  - Productivity
  - Knowledge Management
  - Cursor IDE
categories:
  - TechBlog
seeAlso:
  - /2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/
  - /2026/06/30/local-ai-with-ollama-aider-and-cline-on-manjaro/
  - /2025/12/28/personal-knowledge-engine-jupyter-llm/
  - /2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/
---

I was deep in a research thread that was not going to become a weekend post.

The topic started small: juniors asking an AI to format code that Prettier already owns, or to invent a debounce helper the repo already has. It got larger fast. Sometimes the person is not a developer at all — they have an idea, they paste a warning into ChatGPT, the "build" goes green, and they never learn that the message was ESLint. The software can become more sophisticated than the operator's mental model. That is a different problem than "juniors are lazy," and it is too big to finish in one sitting.

Then the conversation itself became the bottleneck. Scrollback got expensive. Earlier distinctions went fuzzy. I caught myself asking the model to remember what we had already decided, which is a bad use of a thinking partner.

The useful question was not "which model has a longer context window?"

It was:

> Where do the notes live so this can become an article — or a playbook — months from now?

Not in that chat. Not in the next chat either.

## A conversation is a scratchpad

Chat is excellent at *moving* an idea. It is a poor place to *keep* one.

A long ChatGPT, Claude, Gemini, or Cursor thread will fail a research project in boring, predictable ways:

- **It is linear.** Real research branches. You will contradict yourself on Tuesday and be right on Thursday. A transcript cannot hold both versions without turning into sludge.
- **It wants to be helpful.** The model will synthesize, smooth, and close. That is the opposite of what early research needs. Early research needs loose ends.
- **It has no honest memory.** "Remember what we discussed?" is a prompt, not a filing system. Context windows fill. Summaries drop the awkward examples you actually needed.
- **You cannot search or diff it.** Six weeks later you will not know whether a sentence was an observation, a guess, or a line the model invented to sound complete.
- **You do not own it.** Export formats change. Projects get renamed. The vendor's "memory" is not your archive.

I already argued that [Cursor should not be the place you debate architecture](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/). The same split applies one layer up. The chat is not the knowledge base. The chat is a tool you point *at* a knowledge base.

{{< alert type="tip" title="The rule" >}}

Keep a workspace where ideas can be messy, contradictory, duplicated, and only gradually organized. Do not spend your energy deciding where a thought belongs before you have captured it.

{{< /alert >}}

That sounds sloppy. It is the point. Organization is a later pass, the same way a clean API is a later pass over a spike. If you file every thought into the "right" folder on arrival, you will stop writing thoughts down.

## What I actually wanted

I wanted a place with four properties:

1. **Ugly is allowed.** An inbox that does not judge you.
2. **Contradiction is allowed.** Two notes can disagree in public. That disagreement is data.
3. **Duplication is allowed.** If the same idea shows up four times in different words, that is a signal, not a mess to tidy on day one.
4. **AI can read the files.** Not "paste the last twenty messages." The actual notes, on disk, in a repo, the way I already work on code.

Jupyter can be that for *executable* thinking — I wrote about a [personal knowledge engine](/2025/12/28/personal-knowledge-engine-jupyter-llm/) in that shape. This problem was different. Most of the material was not code to run. It was observations, half-formed concepts, examples, and arguments I was not ready to defend. Markdown in Git is the boring tool that fits.

## A repo that is allowed to be ugly

Something like this:

```text
research-workspace/
├── README.md
├── inbox/
│   ├── raw-thoughts.md
│   ├── examples.md
│   └── observations.md
├── research/
│   ├── cognitive-offloading.md
│   └── ai-coding-studies.md
├── concepts/
│   ├── premature-delegation.md
│   └── productive-friction.md
├── examples/
│   └── linting.md
├── counterarguments/
│   └── ai-is-not-the-problem.md
├── drafts/
└── outline.md
```

Name the folders for *your* project. The structure is not the insight. The insight is the `inbox/` contract:

**Nothing in `inbox/` has to be true, unique, or well placed.**

Dump dated fragments and move on:

```md
# 2026-08-24

A person hit an ESLint warning, read it as a generic build failure,
pasted it into AI, accepted the fix.

They did not know what a linter was.

This is not the same as a developer using AI badly.

Maybe: AI as a substitute for mental models?

Need notes on cognitive offloading.
```

That paragraph is more valuable in a file than it is as message 87 in a chat you will never re-read carefully.

When a fragment keeps showing up, *then* promote it into `concepts/` or `examples/`. Promotion is a decision. Capture is not.

## Separate observation from interpretation

This is the part that saves the eventual article from becoming a vibe.

Six months later you will not remember whether you *saw* something or *theorized* it. Chat transcripts erase that distinction because the model blends them for you. Your files should not.

A note in `examples/` can look like this:

```md
## Observation

Someone using AI-generated code hit an ESLint warning. They did not
know what ESLint was. They treated it as a build error, pasted it
into a chatbot, and accepted the generated fix.

## Interpretation

AI can hide a missing mental model. The failure disappears without
the concept ever appearing.

## Hypothesis

Resolving a tooling failure through a chatbot reduces the pressure
to learn what the tool is for.

## Questions

- Is this new, or is it Stack Overflow with a smoother UX?
- Does it happen to experienced developers in unfamiliar stacks?
- What would falsify this?
```

Those four headings are not bureaucracy. They stop you from publishing a confident thesis built on one anecdote plus a lot of fluent continuation.

The originating research — AI as a substitute for engineering knowledge — is still in that shape for me. This post is not that article. This post is the container I needed before I was allowed to write that article.

## Argue with yourself on purpose

Create a `counterarguments/` folder early, while you still like your thesis.

For every claim you are tempted to tattoo on the outline:

```md
# AI causes deskilling

## Argument for

Cheap code production can skip the friction where judgment forms.

## Argument against

Engineers have always used abstractions. Nobody needs to understand
the TypeScript compiler to use TypeScript. Libraries already hide
enormous amounts of knowledge.

## What would falsify this?

Evidence that people who use AI as an oracle still build accurate
mental models at the same rate, just faster.

## Current confidence

Medium. Do not draft the polemic yet.
```

If you skip this, the project will drift into an anti-AI rant. The position I actually expect to land on is narrower than "AI bad":

> Abstraction is normal. The failure mode is operating an abstraction without enough of its boundary to use it safely.

That sentence is only trustworthy if I have tried to kill it.

## Point the model at the repo

Once the notes exist as files, the AI job changes.

Do **not** ask:

> Remember everything we discussed and write the book.

Ask against the tree:

1. *Read `inbox/` and list recurring concepts, contradictions, and research questions. Do not rewrite anything.*
2. *Compare those observations with `research/`. Where is the evidence thin?*
3. *Build a conceptual model. Preserve uncertainty.*
4. *Only then: propose an outline.*

That is the same discipline as the [split coding workflow](/2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/): the model executes against artifacts you own. Cursor is unusually good at this part — not as a chatbot with a repo attached, but as an editor that can cluster notes, open three files, and leave the prose messy on purpose.

A useful progression, and I would not skip steps because a model offered to:

```text
raw notes
  → cluster
  → name concepts
  → find contradictions
  → read the literature
  → challenge hypotheses
  → conceptual model
  → outline
  → draft
  → editorial review
```

**Do not ask AI to turn a pile of thoughts into a book. Ask it to help you think about the pile first.**

If that sounds slow, good. The slowness is the research. Generating a 4,000-word draft from a chat summary is how you get a fluent article you do not believe next month.

## Why Git, and what else

**Git plus Markdown** is the default I would give another developer. Version history, diffs, branches, grep, backup, no proprietary format, and any coding agent can read it. A private GitHub repo is enough. Make pieces public later if you want; do not start public and perform the mess.

**Obsidian** is optional and compatible. It sits on the same Markdown files. Use it if you want daily notes, backlinks, and a graph over `inbox/`. Do not use it as an excuse to leave Git. The vault should be the working copy of the repo.

**ChatGPT Projects, Claude Projects, NotebookLM** are fine as *lenses*. They are not the source of truth. If the files only live in the vendor's project, you are back to a nicer conversation.

**FigJam / Figma** is for a later pass: once you have a model worth drawing — amplifier vs prosthetic vs oracle, a knowledge-gradient sketch, a hierarchy of "already solved" problems. Keep the diagram as a view, not as the archive. Boxes in a whiteboard do not grep.

I would not put this kind of work in Notion as the canonical store. It is a reasonable reading surface. It is a weak object for agents, diffs, and "this paragraph changed."

## When you are allowed to write the article

Not when the chat feels complete.

When you can point at files and answer:

- What did I actually observe?
- What did I only interpret?
- Which hypotheses have counterarguments I have written down?
- Where is the evidence still a vibe?
- What would make me drop the thesis?

If those answers are fuzzy, you do not have an article yet. You have an inbox. That is a successful research workspace. Treat it that way.

The chat that started this was useful. It was also the wrong database. I moved the notes out. The bigger piece — when AI becomes a substitute for software-engineering knowledge — can wait until the workspace has earned a draft.
