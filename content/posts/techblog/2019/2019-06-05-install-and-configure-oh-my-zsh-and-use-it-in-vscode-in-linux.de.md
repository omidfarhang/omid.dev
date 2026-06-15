---
title: Oh My Zsh installieren und in VS Code oder Cursor nutzen
date: 2019-06-05T00:45:20+00:00
lastmod: 2026-06-16T12:00:00+03:30
description: "Oh My Zsh unter Ubuntu, Manjaro oder Arch Linux installieren und Zsh als integriertes Terminal in VS Code oder Cursor IDE mit Powerlevel10k, Nerd Fonts und Plugins einrichten."
layout: single
author_profile: true
url: 2019/06/05/install-and-configure-oh-my-zsh-and-use-it-in-vscode-in-linux/
shortlink: https://g.omid.dev/31b2bWc
keywords:
  - oh my zsh installieren
  - vscode terminal
  - zsh
  - cursor ide
  - manjaro
  - arch linux
tags:
  - Kubuntu
  - Manjaro
  - Arch Linux
  - oh my zsh
  - Ubuntu
  - Cursor
  - vscode
  - zsh
  - Linux

categories:
  - TechBlog
seeAlso:
  - /2026/05/29/how-to-install-cursor-ide-in-manjaro/
  - /2024/06/19/advanced-shell-scripting-techniques-automating-complex-tasks-with-bash/
  - /2022/11/27/how-to-use-cloudflare-warp-on-linux/
howToSteps:
  - name: Zsh und Abhängigkeiten installieren
    text: Installiere zsh, git, curl, wget, unzip und fontconfig mit apt unter Ubuntu oder pacman unter Manjaro/Arch.
  - name: Oh My Zsh installieren
    text: Führe das offizielle Oh-My-Zsh-Installationsskript per curl oder wget aus und setze zsh mit chsh als Standardshell.
  - name: Oh My Zsh konfigurieren
    text: Bearbeite ~/.zshrc, aktiviere Plugins, setze Powerlevel10k als Theme und installiere eine Nerd Font.
  - name: Zsh in VS Code oder Cursor nutzen
    text: Setze terminal.integrated.defaultProfile.linux auf zsh und konfiguriere die Meslo Nerd Font in settings.json.
---
**Kurzfassung**

- Installiere `zsh` und führe den [Oh My Zsh](https://ohmyz.sh/)-Installer unter Ubuntu, Manjaro oder Arch aus.
- Aktiviere das `vscode`-Plugin, richte Powerlevel10k ein und installiere eine Meslo Nerd Font.
- Richte das **integrierte VS-Code-Terminal** oder **Cursor-IDE-Terminal** in `settings.json` auf `/usr/bin/zsh` ein.
- Unter Manjaro siehe auch [Cursor IDE auf Manjaro Linux installieren](/de/2026/05/29/how-to-install-cursor-ide-in-manjaro/).

Wenn du noch das einfache Bash-Terminal deiner Distribution nutzt, lohnt sich ein Blick auf Zsh: schneller, sicherer und mit einem aktiven Plugin-Ökosystem. Oh My Zsh ist ein Open-Source-Framework zur Verwaltung deiner Zsh-Konfiguration.

![Screenshot von Oh My ZSH in Yakuake](/images/2019/06/Screenshot_20190605_040118.png)

## Oh My Zsh unter Ubuntu, Manjaro oder Arch installieren

Dieser Abschnitt ist der schnellste Weg, wenn du nach **oh my zsh installieren** gesucht hast und nur die Befehle brauchst.

### Schritt 1 — Zsh installieren

Unter Ubuntu/Kubuntu:

```shell
sudo apt update
sudo apt install zsh git curl wget unzip fontconfig
```

Unter Manjaro/Arch:

```shell
sudo pacman -Syu zsh git curl wget unzip fontconfig
```

### Schritt 2 — Oh My Zsh installieren

Per Curl:

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Oder per Wget:

```shell
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Bei der Installation wirst du gefragt, ob Zsh deine Standardshell werden soll — antworte mit Ja.

Falls nicht, manuell wechseln:

```shell
chsh -s "$(command -v zsh)"
```

Nach dem Wechsel ab- und wieder anmelden.

## Oh My Zsh konfigurieren

Bearbeite `~/.zshrc` ohne `sudo`:

```shell
nano ~/.zshrc
```

Einfaches Beispiel:

```shell
export PATH=$HOME/bin:/usr/local/bin:$PATH
DEFAULT_USER="$(whoami)"

zstyle ':omz:update' mode auto
zstyle ':omz:update' frequency 1

plugins=(
  git
  vscode
)

if [[ -n $SSH_CONNECTION ]]; then
  export EDITOR='nano'
else
  export EDITOR='code --wait'
  # Mit Cursor statt VSCode: export EDITOR='cursor --wait'
fi
```

## Powerlevel10k-Theme installieren

```shell
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
mkdir -p "$ZSH_CUSTOM/themes" "$ZSH_CUSTOM/plugins"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "$ZSH_CUSTOM/themes/powerlevel10k"
```

In `~/.zshrc`:

```shell
ZSH_THEME="powerlevel10k/powerlevel10k"
```

## Schriftart installieren

### Für Powerlevel10k

Ubuntu/Kubuntu:

```shell
font_dir="$HOME/.local/share/fonts/MesloLGS-NF"
mkdir -p "$font_dir"

wget -O "$font_dir/MesloLGS NF Regular.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf"
wget -O "$font_dir/MesloLGS NF Bold.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold.ttf"
wget -O "$font_dir/MesloLGS NF Italic.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Italic.ttf"
wget -O "$font_dir/MesloLGS NF Bold Italic.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold%20Italic.ttf"

fc-cache -fv "$font_dir"
```

Manjaro/Arch:

```shell
sudo pacman -S ttf-meslo-nerd-font-powerlevel10k
```

Danach Zsh neu laden:

```shell
source ~/.zshrc
```

## Optionale Plugins

```shell
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
git clone https://github.com/zsh-users/zsh-autosuggestions.git "$ZSH_CUSTOM/plugins/zsh-autosuggestions"
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
```

In `~/.zshrc` — `zsh-syntax-highlighting` immer zuletzt:

```shell
plugins=(
  git
  vscode
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

## Standardterminal in VS Code oder Cursor IDE ändern

![Screenshot von OhMyZSH in VSCode](/images/2019/06/Screenshot_20190605_051605.png)

**VS Code** und **Cursor IDE** nutzen oft noch Bash als integriertes Terminal. Nach der Schriftinstallation Editor neu starten.

Für Cursor unter Manjaro: [Cursor IDE auf Manjaro Linux installieren](/de/2026/05/29/how-to-install-cursor-ide-in-manjaro/) und das Skript [update-cursor.sh](/scripts/update-cursor.sh) für Updates.

In `settings.json`:

```json
{
  "terminal.integrated.profiles.linux": {
    "zsh": {
      "path": "/usr/bin/zsh"
    }
  },
  "terminal.integrated.defaultProfile.linux": "zsh",
  "terminal.integrated.fontFamily": "'MesloLGS Nerd Font Mono', 'MesloLGS NF', monospace"
}
```
