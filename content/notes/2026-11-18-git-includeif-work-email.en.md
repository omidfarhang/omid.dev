---
date: 2026-11-18T16:36:16+03:30
url: notes/179500717636358511/
---
I committed from home and GitLab’s pipeline page showed me as something like `mailto:undefined`. The repo graph looked fine — same name, same commits. Only the pipelines UI was broken.

The graph reads the author *name* from the commit. Pipelines try to map the author *email* to a GitLab user. At home my global config still used my personal Gmail; at work the commits used the company address GitLab already knows. Name matched. Email did not. Lookup failed, UI fell over.

I did not want to flip the global email every time I switch machines, or sprinkle `git config user.email` into every work repo. Git already has an answer: conditional includes.

Create `~/.gitconfig-work`:

```ini
[user]
	email = you@work.example
```

Then in `~/.gitconfig`:

```ini
[includeIf "gitdir:/home/you/Projects/work/"]
	path = ~/.gitconfig-work
```

Any repo under that directory picks up the work email; everything else keeps the personal global. Check with `git config --get user.email` inside and outside the tree.

To undo:

```bash
git config --global --unset-all includeIf.gitdir:/home/you/Projects/work/.path
rm ~/.gitconfig-work
```

One include. No per-repo busywork. Pipelines know who I am again.
