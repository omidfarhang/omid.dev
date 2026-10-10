---
title: update-nvm
date: 2026-10-09T19:30:00+03:30
description: Jeden installierten Node-Major über nvm aktualisieren, globale npm-Pakete auffrischen, npm upgraden und corepack aktivieren.
layout: tool
hidemeta: true
ShowToc: true
url: /de/tools/update-nvm/
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

Vielleicht läufst du täglich `pacman -Syu` — aber wann hast du zuletzt jeden Node-Major in nvm aktualisiert?

`update-nvm` geht die bereits installierten Majors durch (oder die, die du explizit angibst), installiert den neuesten Patch, frischt globale npm-Pakete auf, upgraded npm mit `--latest-npm` (Standard: an) und führt `corepack enable` aus. Liegt ein Major schon auf dem neuesten Patch, bleibt Node unberührt, Globals werden trotzdem aktualisiert — außer mit `--skip-npm`.

## Installation

```bash
mkdir -p ~/.local/bin
curl -fsSL https://omid.dev/scripts/update-nvm.sh -o ~/.local/bin/update-nvm
chmod +x ~/.local/bin/update-nvm
```

Benötigt [nvm](https://github.com/nvm-sh/nvm) und `curl`. `~/.local/bin` sollte in deinem `PATH` liegen.

Quellcode: [`static/scripts/update-nvm.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh).

## Schnellstart

```bash
update-nvm              # alle bereits installierten Majors
update-nvm --lts        # nur lts/*
update-nvm 24           # ein Major
update-nvm 28           # neuen Major installieren (fragt nach Globals-Kopie)
update-nvm --npm-only   # nur npm und Globals, Node unberührt
update-nvm --prune      # ältere Patches derselben Major-Linie entfernen
update-nvm --self-update  # nur das Skript ersetzen
update-nvm --version
update-nvm -q --lts
update-nvm --dry-run
```

## Ablauf

1. Ziel-Majors bestimmen (installiert, `--lts` oder explizit).
2. Pro Major den neuesten Release via nvm installieren, sofern nicht schon aktuell (oder `--force` / `--npm-only`).
3. Ohne `--skip-npm` globale npm-Pakete auffrischen.
4. Ohne `--no-latest-npm` npm auf die neueste von Node unterstützte Version bringen.
5. Ohne `--no-corepack` `corepack enable` ausführen.
6. Mit `--prune` ältere Patches derselben Major-Linie entfernen.

Fehlt ein Major noch, fragt das Skript, ob Globals von einem anderen Major kopiert werden sollen. Enter = frische Installation. Für nicht-interaktive Installationen: `NVM_REINSTALL_FROM`.

## Befehle und Optionen

| Option | Beschreibung |
| --- | --- |
| *(ohne Args)* | Alle installierten Majors |
| `VERSION …` | Angegebene Majors aktualisieren oder installieren |
| `--lts` | Nur `lts/*` |
| `--force`, `-f` | Neu installieren, auch wenn der Patch aktuell ist |
| `--prune` | Ältere Patches innerhalb jeder Major-Linie entfernen |
| `--latest-npm` | npm upgraden (Standard: an) |
| `--no-latest-npm` | Mit Node geliefertes npm behalten |
| `--no-corepack` | `corepack enable` überspringen |
| `--skip-npm` | Nur Node; keine Globals |
| `--npm-only` | Nur npm und Globals |
| `--quiet`, `-q` | Wenig Ausgabe; keine Installationsfragen |
| `--dry-run`, `-n` | Nur anzeigen, nichts ändern |
| `--plain`, `-p` | Nur scrollen (kein Alternate Screen / kein Frame-Redraw) |
| `--self-update` | Skript von omid.dev aktualisieren |
| `--version` | Skriptversion ausgeben |
| `-h`, `--help` | Hilfe |

## Umgebungsvariablen

| Variable | Beschreibung |
| --- | --- |
| `NVM_DIR` | nvm-Verzeichnis (Standard: `~/.nvm`) |
| `NVM_UPDATE_VERSIONS` | Leerzeichengetrennte Versionen (ignoriert mit `--lts`) |
| `NVM_REINSTALL_FROM` | Bei nicht-interaktiver Neuinstallation Globals von diesem Major kopieren |
| `UPDATE_NVM_SCRIPT_URL` | Alternative URL für `--self-update` |
| `UPDATE_NVM_SKIP_SELF_CHECK` | Mit `1` Prüfung auf neuere Skriptversion überspringen |

## Cron-Beispiel

```cron
0 3 * * 0 ~/.local/bin/update-nvm -q --lts --prune
```

## Self-Update

```bash
update-nvm --self-update
```

Bei interaktiven Läufen wird bei einer neueren Version auf omid.dev gefragt, ob jetzt aktualisiert werden soll (`[Y/n]`, Standard: Yes). Quiet/Cron und Non-TTY überspringen die Frage (Non-TTY zeigt nur einen Hinweis). Mit `UPDATE_NVM_SKIP_SELF_CHECK=1` entfällt die Prüfung ganz.

## Verwandt

- Kurznotiz: [/notes/178818221780902383/](/notes/178818221780902383/)
- Quelle: [`static/scripts/update-nvm.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh)
