---
title: update-cursor
date: 2026-10-09T19:30:00+03:30
description: Install or update Cursor IDE from the official stable AppImage API on Linux — skip download when already current, force reinstall, or uninstall cleanly.
layout: tool
hidemeta: true
ShowToc: true
url: /tools/update-cursor/
tool:
  id: update-cursor
  version: "1.0.0"
  scriptPath: /scripts/update-cursor.sh
  installName: update-cursor
  sourceUrl: https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-cursor.sh
  platform: Linux
  tags:
    - Cursor IDE
    - AppImage
---

Cursor ships for Linux as an AppImage. This script installs or updates it from Cursor’s official stable download API, keeps files under `~/.local`, and wires up a desktop entry plus a `cursor` launcher on your `PATH`.

It compares the installed version in `~/.local/opt/cursor/version.txt` with the latest stable release and skips the download when you are already current (or newer). Use `--force` to reinstall anyway.

## Install

```bash
mkdir -p ~/.local/bin
curl -fsSL https://omid.dev/scripts/update-cursor.sh -o ~/.local/bin/update-cursor
chmod +x ~/.local/bin/update-cursor
```

Requires `curl`. On Manjaro/Arch you also need `fuse2` for AppImages (`sudo pacman -S curl fuse2`). Put `~/.local/bin` on your `PATH` if it is not already.

Inspect the source first if you prefer: [`static/scripts/update-cursor.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-cursor.sh).

## Quick start

```bash
update-cursor              # install or update to latest stable
update-cursor --force      # reinstall even when already up to date
update-cursor --uninstall  # remove Cursor, desktop entry, and this script
update-cursor --self-update  # replace the script only
update-cursor --help
```

After install, launch with:

```bash
cursor
```

If Cursor is open while you update it, close it first, run `update-cursor`, then start it again.

## What it does

1. Calls Cursor’s stable API for Linux x64 (`downloadUrl` + `version`).
2. Compares against `~/.local/opt/cursor/version.txt` (unless `--force`).
3. Downloads the AppImage to a temp dir, extracts the icon, and installs under `~/.local/opt/cursor/`.
4. Symlinks `~/.local/bin/cursor` → the AppImage.
5. Writes `~/.local/share/applications/cursor.desktop` and refreshes the desktop database when available.

## Layout on disk

| Path | Purpose |
| --- | --- |
| `~/.local/opt/cursor/cursor.AppImage` | AppImage binary |
| `~/.local/opt/cursor/cursor.png` | Icon |
| `~/.local/opt/cursor/version.txt` | Installed Cursor version |
| `~/.local/bin/cursor` | Symlink launcher |
| `~/.local/bin/update-cursor` | This script |
| `~/.local/share/applications/cursor.desktop` | Desktop entry |

## Commands and options

| Option | Description |
| --- | --- |
| *(default)* | Install or update to the latest stable AppImage |
| `--force`, `-f` | Reinstall even when no update is needed |
| `--uninstall`, `-u` | Remove Cursor, desktop entry, launcher, and this script |
| `--self-update` | Download and install the latest script from omid.dev |
| `-h`, `--help` | Show help |

## Environment

| Variable | Description |
| --- | --- |
| `UPDATE_CURSOR_SCRIPT_URL` | Override script URL for `--self-update` (default: omid.dev) |
| `UPDATE_CURSOR_SKIP_SELF_CHECK` | Set to `1` to skip the newer-script availability check |

## Self-update

Refresh the script without touching the Cursor install:

```bash
update-cursor --self-update
```

On normal runs it may warn when a newer script version is available. Set `UPDATE_CURSOR_SKIP_SELF_CHECK=1` to silence that check.

## Uninstall

```bash
update-cursor --uninstall
```

Removes the AppImage directory, icon, desktop entry, `cursor` symlink, and the `update-cursor` script itself.

## Related

- Walkthrough (Manjaro): [How to Install Cursor IDE on Manjaro Linux](/2026/05/29/how-to-install-cursor-ide-in-manjaro/)
- Source: [`static/scripts/update-cursor.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-cursor.sh)
