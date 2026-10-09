---
title: update-cursor
date: 2026-10-09T19:30:00+03:30
description: Cursor IDE von der offiziellen stabilen AppImage-API unter Linux installieren oder aktualisieren — Download überspringen wenn aktuell, erzwungen neu installieren oder sauber deinstallieren.
layout: tool
hidemeta: true
ShowToc: true
url: /de/tools/update-cursor/
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

Cursor erscheint unter Linux als AppImage. Dieses Skript installiert oder aktualisiert es über die offizielle stabile Download-API, legt Dateien unter `~/.local` ab und richtet einen Desktop-Eintrag sowie den Launcher `cursor` in deinem `PATH` ein.

Es vergleicht die Version in `~/.local/opt/cursor/version.txt` mit dem neuesten Stable-Release und überspringt den Download, wenn du bereits aktuell (oder neuer) bist. Mit `--force` erzwungen neu installieren.

## Installation

```bash
mkdir -p ~/.local/bin
curl -fsSL https://omid.dev/scripts/update-cursor.sh -o ~/.local/bin/update-cursor
chmod +x ~/.local/bin/update-cursor
```

Benötigt `curl`. Unter Manjaro/Arch zusätzlich `fuse2` für AppImages (`sudo pacman -S curl fuse2`). `~/.local/bin` sollte im `PATH` liegen.

Quellcode: [`static/scripts/update-cursor.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-cursor.sh).

## Schnellstart

```bash
update-cursor              # installieren oder auf neuestes Stable aktualisieren
update-cursor --force      # neu installieren, auch wenn aktuell
update-cursor --uninstall  # Cursor, Desktop-Eintrag und dieses Skript entfernen
update-cursor --self-update
update-cursor --help
```

Danach starten mit:

```bash
cursor
```

Wenn Cursor während des Updates offen ist: schließen, `update-cursor` ausführen, neu starten.

## Ablauf

1. Stabile Cursor-API für Linux x64 abfragen (`downloadUrl` + `version`).
2. Mit `version.txt` vergleichen (außer `--force`).
3. AppImage herunterladen, Icon extrahieren, unter `~/.local/opt/cursor/` installieren.
4. `~/.local/bin/cursor` → AppImage verlinken.
5. `cursor.desktop` schreiben und Desktop-Datenbank aktualisieren, falls vorhanden.

## Dateien auf der Festplatte

| Pfad | Zweck |
| --- | --- |
| `~/.local/opt/cursor/cursor.AppImage` | AppImage |
| `~/.local/opt/cursor/cursor.png` | Icon |
| `~/.local/opt/cursor/version.txt` | Installierte Version |
| `~/.local/bin/cursor` | Launcher |
| `~/.local/bin/update-cursor` | Dieses Skript |
| `~/.local/share/applications/cursor.desktop` | Desktop-Eintrag |

## Befehle und Optionen

| Option | Beschreibung |
| --- | --- |
| *(Standard)* | Neueste stabile AppImage installieren oder aktualisieren |
| `--force`, `-f` | Neu installieren, auch ohne Update-Bedarf |
| `--uninstall`, `-u` | Cursor, Eintrag, Launcher und Skript entfernen |
| `--self-update` | Skript von omid.dev aktualisieren |
| `-h`, `--help` | Hilfe |

## Umgebungsvariablen

| Variable | Beschreibung |
| --- | --- |
| `UPDATE_CURSOR_SCRIPT_URL` | Alternative URL für `--self-update` |
| `UPDATE_CURSOR_SKIP_SELF_CHECK` | Mit `1` Prüfung auf neuere Skriptversion überspringen |

## Self-Update

```bash
update-cursor --self-update
```

## Deinstallation

```bash
update-cursor --uninstall
```

## Verwandt

- Anleitung (Manjaro): [Cursor IDE auf Manjaro Linux installieren](/de/2026/05/29/how-to-install-cursor-ide-in-manjaro/)
- Quelle: [`static/scripts/update-cursor.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-cursor.sh)
