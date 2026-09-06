---
title: "Oh My Zsh git plugin: local branches whose remote is gone"
date: 2026-09-07T00:26:00+03:30
url: notes/178872844834633445/
---
After a few merged pull requests, local clones fill up with feature branches that no longer exist on origin. Git still has the local refs; the remote-tracking branch is what disappeared.

The Oh My Zsh [git plugin](https://github.com/ohmyzsh/ohmyzsh/tree/master/plugins/git) already has aliases for this, but the README only dumps the pipelines. The names are `gbg`, `gbgd`, and `gbgD`. Enable the plugin with `plugins=(... git)` in `~/.zshrc`.

**What “gone” means**

`git branch -vv` prints tracking info next to each local branch. After a prune, a branch whose upstream was deleted looks like `[origin/feature-x: gone]`. The aliases grep for that `: gone]` marker. `LANG=C` keeps the match working even if Git is localized.

They will not show up until you fetch with prune. `gfa` (`git fetch --all --tags --prune`) does that.

**The three aliases**

| Alias | What it does |
| ----- | ------------ |
| `gbg` | List local branches whose upstream is gone |
| `gbgd` | Delete that list with `git branch -d` (refuses unmerged work) |
| `gbgD` | Same list, force-delete with `git branch -D` |

Typical flow:

```bash
gfa     # prune stale remote-tracking refs
gbg     # inspect first
gbgd    # safe delete
gbgD    # force-delete what -d refused
```

A `gbg` line looks like this — branch name, tip commit, gone upstream, subject:

```text
  feature-login  a1b2c3d [origin/feature-login: gone] fix session timeout
  hotfix-retry   e4f5g6h [origin/hotfix-retry: gone] bump retry budget
```

**When `-d` is not enough**

`gbgd` uses `git branch -d`, which only deletes a branch Git considers fully merged into `HEAD`. Squash-merged PRs often fail that check: the remote is gone and the work is on the default branch, but the local commits are not ancestors of `HEAD`. Git then prints `the branch is not fully merged` and suggests `git branch -D`.

If you already inspected the `gbg` list and you do not need those leftover commits, `gbgD` is the force-delete alias.

**When to use this**

Use it when `git branch` is cluttered after remote cleanup — merged PRs, deleted topic branches, a teammate who pruned origin. List with `gbg`, prefer `gbgd`, reach for `gbgD` only when you know the work is already on the default branch (or you truly do not need it).

This is not the same as `gbda`, which deletes *merged* local branches whether or not the remote still exists. `gbg*` is specifically “upstream is gone.”
