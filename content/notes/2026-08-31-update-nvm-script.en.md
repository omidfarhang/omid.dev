---
date: 2026-08-31T16:50:00+03:30
url: notes/178818221780902383/
---
You may run `pacman -Syu` every day, but when did you last refresh every Node major you keep in nvm?

I added [`update-nvm.sh`](/scripts/update-nvm.sh) for that. It updates each installed major to the latest patch, refreshes global npm packages, upgrades npm via `--latest-npm`, and runs `corepack enable`. It skips versions already on the latest patch unless you pass `--force`.

**Install**

```bash
curl -fsSL https://omid.dev/scripts/update-nvm.sh -o ~/.local/bin/update-nvm
chmod +x ~/.local/bin/update-nvm
```

**Common usage**

```bash
update-nvm              # every major already installed via nvm
update-nvm --lts        # only lts/*
update-nvm 24           # one major
update-nvm 28           # install a new major (prompts to copy globals from another)
update-nvm --prune      # drop older patch releases within each major
update-nvm -q --lts     # quiet one-liner for cron
update-nvm --dry-run    # preview commands
```

**Cron** (weekly LTS refresh, quiet, prune old patches):

```cron
0 3 * * 0 ~/.local/bin/update-nvm -q --lts --prune
```

When installing a major that is not installed yet, the script asks whether to copy global npm packages from another major. Press Enter for a fresh install (default), or pick a source major. For non-interactive installs, set `NVM_REINSTALL_FROM=24`.

Run `update-nvm --help` for the full option list. Source: [`static/scripts/update-nvm.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh).
