---
title: "Obsidian on a Git Research Vault"
date: 2026-09-22T02:00:00+03:30
description: "Open the research repo as an Obsidian vault if you want links and a graph. Git still holds the Markdown. If a note matters, it must still read in a terminal, an editor, and a diff."
layout: single
author_profile: true
url: 2026/09/22/obsidian-on-a-git-research-vault/
shortlink: https://g.omid.dev/DPToNGd
x_link: https://x.com/OmidFarhang/status/2102167379413282846
mastodon_link: https://mastodon.social/@omidfarhang/117311456679907297
bluesky_link: https://bsky.app/profile/omid.dev/post/3mw2s3du6as2t
linkedin_link: https://lnkd.in/p/dE45mknV
tags:
  - Data & AI
  - Knowledge Management
  - Productivity
categories:
  - TechBlog
seeAlso:
  - /2026/08/29/one-ai-chat-is-not-a-research-workspace/
  - /2025/12/28/personal-knowledge-engine-jupyter-llm/
  - /2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/
  - /2026/06/29/how-to-stretch-cursor-pro-with-a-split-ai-workflow/
---

You already have the research repo. Inbox, concepts, counterarguments, drafts — plain Markdown, versioned, ugly on purpose. Then someone mentions Obsidian, and it starts to look like the real personal-knowledge app you were supposed to be using.

It is not. The repository is the system. Obsidian is one optional way to look at it.

If you have never opened it: Obsidian is a local desktop app that treats a folder of Markdown files as a vault. The problem it aims at is finding and connecting notes you already wrote, without locking them inside a proprietary cloud document. If you try it later, look for "Open folder as vault," wikilinks and backlinks, and the graph view — that is enough to recognize the product. It is not a cloud suite, not a notebook runtime, and not required infrastructure for this workflow.

## The One Rule: Same Files

{{< alert type="tip" title="The rule" >}}

An Obsidian vault is a Git working copy. If a note matters, it must remain useful in a terminal, a normal editor, and a diff.

{{< /alert >}}

Open the repository folder as an Obsidian vault. Obsidian reads the same Markdown tree that Git tracks. Git remains the history and synchronization layer — `git pull`, a remote, a backup. You do not need an Obsidian plugin to make that true.

The vault path is the clone. If a note only exists inside Obsidian's sync, a plugin database, or a format `grep` cannot read, it failed the test above.

## Where Obsidian Helps

The pile in [a research workspace](/2026/08/29/one-ai-chat-is-not-a-research-workspace/) is mostly prose: observations, half-formed concepts, arguments you are not ready to defend. A file tree is honest. It is also a bad map once `inbox/` has a few dozen dated fragments.

That is the useful slice of Obsidian:

- **Daily notes** over `inbox/`, so capture stays a dump and not a filing decision.
- **Backlinks**, so a concept shows which notes already point at it.
- **The graph**, as a way to see clusters you have not named yet.

Those are views. They are not a second archive. The same folders still work if you close the app:

```text
research-workspace/
├── README.md
├── inbox/
├── research/
├── concepts/
├── examples/
├── counterarguments/
├── notebooks/
├── drafts/
└── outline.md
```

That is the same tree as the research-workspace post, plus `notebooks/` for anything you actually run. Obsidian may browse and link across it. A terminal, Cursor, `grep`, and Git still operate on those files with no translation layer.

Here is the job, on notes that already belong in that tree.

Monday, `inbox/2026-08-24.md`:

```md
# 2026-08-24

A person hit an ESLint warning, read it as a generic build failure,
pasted it into AI, accepted the fix.

They did not know what a linter was.

Maybe: AI as a substitute for mental models?
```

Wednesday, still in `inbox/`, still not filed:

```md
# 2026-08-26

Same shape, different tool. Someone asked a chatbot to write a
debounce helper. The repo already had one. They never opened the
utils folder, so they could not tell.

Not "lazy." Missing map of the codebase.
```

A file tree shows two dated files. Backlinks show they are the same claim: a tool already existed, and the chatbot hid that fact. The graph draws a small knot around "linter," "already in the repo," and "mental model." You still do not reorganize on arrival. You notice the repeat.

When the repeat is boring, promote one note into `concepts/` and leave the inbox fragments where they are:

```md
# Premature delegation

## What keeps showing up

People hand a tool's job to a chatbot before they know the tool exists.
Linter. Debounce helper. Probably more.

## Still messy

Is this deskilling, or a smoother Stack Overflow?
Do not draft the polemic yet.
```

Promotion is a decision. Capture is not. Obsidian's useful move is making the repeat visible so you can decide later. `grep` can find the same pair. The graph is faster once the pile is large, and it is still only a view of files Git already has.

## What Not to Hand Over

Three ways this goes wrong:

- **Sync becomes the canonical store.** If the only copy that matters lives in a vendor sync product, you are back to a nicer conversation. The working copy on disk, committed, is the archive.
- **Plugins hide the note.** A database, a canvas blob, or a "smart" block that does not survive as Markdown will not show up in a diff or in an agent's read of the repo.
- **The graph replaces Git.** A prettier map is not a reason to stop committing. Leave the app the day the vault and the clone disagree about what the note says.

The failure I would actually watch for is quieter than a plugin database. You enable daily notes. They feel productive. A week later Cursor cannot find Tuesday's fragment. It is in the folder Obsidian created the first time you clicked "Create new vault" — something like `~/Documents/Obsidian Vault/daily/` — not in `research-workspace/inbox/`.

You now have two inboxes. The graph looks connected, because it is connected to the wrong folder. `git status` is clean, which is the tell: nothing new was committed, because the notes were never in the clone.

Open the repository folder as the vault. Point daily notes at `inbox/`. If a note matters and `git status` cannot see it, it is not in the archive yet.

## Obsidian Is Not Jupyter

[Jupyter](/2025/12/23/jupyter-the-strategic-value-of-thinking-in-notebooks/) is for executable thinking: code, narrative, and outputs in one place. A [personal knowledge engine](/2025/12/28/personal-knowledge-engine-jupyter-llm/) in that shape still belongs in notebooks.

Obsidian does not run that work. It browses and links the prose around it. Put notebooks in `notebooks/` (or keep them in their own repo and link the path). Do not ask a graph view to be a kernel, and do not ask a notebook to be your long-term filing system for contradictory essays.

Chat still moves an idea. The Markdown repo keeps it. Jupyter runs it when there is something to run. Obsidian, if you want it, only helps you walk the prose.

## Keep the Vault Agent-Readable

Coding agents already read this repo the way they read code: files on disk, plain text, diffs. Protect that.

- Prefer ordinary Markdown links when a note has to stay obvious outside Obsidian. Wikilinks are fine as a convenience inside the app; they should not be the only way a sentence points at its source.
- Keep folder names boring and stable. Rename in Git, not in a plugin that rewrites paths you cannot see.
- Do not bury the text in embeds, callouts-as-databases, or attachments that are the actual argument. If the claim is not in a `.md` file, the agent did not read the claim.

The Wednesday note, after you promote the concept, can point at it like this:

```md
# 2026-08-26

Same shape, different tool. Someone asked a chatbot to write a
debounce helper. The repo already had one.

Related: [premature delegation](../concepts/premature-delegation.md)
```

Inside Obsidian, `[[premature delegation]]` jumps to the same file. Use that keystroke if you want it. Keep the Markdown link in the file you commit. GitHub, `grep`, and an agent that never loads Obsidian's link resolver can all follow a normal link. A wikilink alone stays a private shortcut.

Close Obsidian and open that file in an editor. The note should still be the note.

### One sitting, two tools

Morning, same clone, two windows.

In Obsidian you walk the prose. The graph has a knot around "mental model," "linter," and "already in the repo." You do not rewrite the inbox. You open the three notes and add one line to today's daily note: `cluster: tool already exists.`

In Cursor, on that same folder, you ask for a read, not a draft:

> Read `inbox/` and `concepts/premature-delegation.md`. List contradictions. Do not rewrite anything.

A useful answer sounds like: the inbox treats the missing mental model as the whole story; `counterarguments/` says engineers have always used abstractions that hide knowledge. That disagreement is the research, the same split as [arguing with yourself on purpose](/2026/08/29/one-ai-chat-is-not-a-research-workspace/#argue-with-yourself-on-purpose). Obsidian helped you see the knot. The agent named it and left the prose messy.

Leave Jupyter shut unless one of those notes needs a measurement. When it does, the notebook goes in `notebooks/` and the prose note links to the file. The graph may show that link. It does not run the cells.

## Use the Lens, Keep the Archive

Use Obsidian when it helps you stay inside the vault — when backlinks surface a contradiction you would have missed in a flat `inbox/`. Drop it when it becomes a second inbox, a sync silo, or the place you "really" keep the research.

The Git Markdown repository remains the system. Obsidian is one optional interface to it.
