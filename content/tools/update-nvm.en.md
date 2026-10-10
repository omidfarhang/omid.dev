---
title: update-nvm
date: 2026-10-09T19:30:00+03:30
description: Update every installed Node major via nvm, refresh global npm packages, upgrade npm, and enable corepack.
layout: tool
hidemeta: true
ShowToc: true
url: /tools/update-nvm/
tool:
  id: update-nvm
  version: "1.3.0"
  scriptPath: /scripts/update-nvm.sh
  installName: update-nvm
  sourceUrl: https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh
  platform: Linux
  tags:
    - nvm
    - Node.js
---

You may run `pacman -Syu` every day, but when did you last refresh every Node major you keep in nvm?

`update-nvm` walks the majors you already have installed (or ones you pass explicitly), installs the latest patch for each, refreshes global npm packages, upgrades npm with `--latest-npm` (default on), and runs `corepack enable`. If a major is already on the latest patch, Node is left alone but globals are still refreshed unless you pass `--skip-npm`.

## Install

```bash
mkdir -p ~/.local/bin
curl -fsSL https://omid.dev/scripts/update-nvm.sh -o ~/.local/bin/update-nvm
chmod +x ~/.local/bin/update-nvm
```

Requires [nvm](https://github.com/nvm-sh/nvm) and `curl`. Put `~/.local/bin` on your `PATH` if it is not already.

Inspect the source first if you prefer: [`static/scripts/update-nvm.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh).

## Quick start

```bash
update-nvm              # every major already installed via nvm
update-nvm --lts        # only lts/*
update-nvm 24           # one major
update-nvm 28           # install a new major (prompts to copy globals from another)
update-nvm --npm-only   # refresh npm and global packages without touching Node
update-nvm --prune      # drop older patch releases within each major
update-nvm --self-update  # replace the script only; does not touch Node
update-nvm --version    # print the script version
update-nvm -q --lts     # quiet one-liner for cron
update-nvm --dry-run    # preview commands
```

## What it does

1. Resolves which Node majors to update (installed majors, `--lts`, or explicit versions).
2. For each major, installs the latest matching release via nvm unless it is already current (or `--force` / `--npm-only`).
3. Unless `--skip-npm`, refreshes global npm packages for that version.
4. Unless `--no-latest-npm`, upgrades npm to the newest version that Node supports.
5. Unless `--no-corepack`, runs `corepack enable` for that version.
6. With `--prune`, removes older patch releases left in the same major line.

When a major is **not** installed yet, the script asks whether to copy global packages from another installed major. Press Enter for a fresh install, or pick a source major. For non-interactive installs, set `NVM_REINSTALL_FROM` (see [Environment](#environment)).

## Commands and options

| Option | Description |
| --- | --- |
| *(no args)* | Update every major already installed via nvm |
| `VERSION …` | Update or install the given majors (e.g. `24`, `28`) |
| `--lts` | Update `lts/*` only (overrides auto-detected majors) |
| `--force`, `-f` | Reinstall even when the latest patch is already installed |
| `--prune` | Remove older patch releases within each updated major |
| `--latest-npm` | Upgrade npm to the latest supported by each Node (default: on) |
| `--no-latest-npm` | Keep the npm version bundled with Node |
| `--no-corepack` | Skip `corepack enable` |
| `--skip-npm` | Reinstall Node only; skip global package updates |
| `--npm-only` | Skip Node installs; only refresh npm and globals |
| `--quiet`, `-q` | Minimal output; skips install prompts |
| `--dry-run`, `-n` | Print what would run without changing anything |
| `--plain`, `-p` | Scroll-only output (no alternate screen / frame redraws) |
| `--self-update` | Download and install the latest script from omid.dev (Node untouched) |
| `--version` | Print script version and exit |
| `-h`, `--help` | Show help |

## Environment

| Variable | Description |
| --- | --- |
| `NVM_DIR` | nvm install directory (default: `~/.nvm`) |
| `NVM_UPDATE_VERSIONS` | Space-separated versions (explicit list; ignored with `--lts`) |
| `NVM_REINSTALL_FROM` | When installing a missing major non-interactively, copy globals from this major (e.g. `24`) |
| `UPDATE_NVM_SCRIPT_URL` | Override script URL for `--self-update` (default: omid.dev) |
| `UPDATE_NVM_SKIP_SELF_CHECK` | Set to `1` to skip the newer-script availability check |

## Cron example

Weekly LTS refresh, quiet, prune old patches:

```cron
0 3 * * 0 ~/.local/bin/update-nvm -q --lts --prune
```

## Self-update

The script can refresh itself without touching Node:

```bash
update-nvm --self-update
```

On interactive runs, if a newer script is available on omid.dev, you are asked whether to update now (`[Y/n]`, default Yes). Quiet/cron and non-TTY runs skip the prompt (non-TTY still prints a one-line hint). Set `UPDATE_NVM_SKIP_SELF_CHECK=1` to silence the check entirely.

## Related

- Short announcement note: [/notes/178818221780902383/](/notes/178818221780902383/)
- Source: [`static/scripts/update-nvm.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh)
