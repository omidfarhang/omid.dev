---
title: Oh My Zsh installieren und in VS Code oder Cursor nutzen
date: 2019-06-05T00:45:20+00:00
lastmod: 2026-08-03T13:49:00+03:30
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
  - Cursor IDE
  - VS Code
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
## Kurzfassung

- Installiere `zsh` und führe den [Oh My Zsh](https://ohmyz.sh/)-Installer unter Ubuntu, Manjaro oder Arch aus.
- Aktiviere das `vscode`-Plugin, richte Powerlevel10k ein und installiere eine Meslo Nerd Font.
- Aktualisiere per `git pull` gelegentlich Themes/Plugins unter `$ZSH_CUSTOM` — das Auto-Update von Oh My Zsh deckt sie nicht ab.
- Richte das **integrierte VS-Code-Terminal** oder **Cursor-IDE-Terminal** in `settings.json` auf `/usr/bin/zsh` ein.
- Unter Manjaro siehe auch [Cursor IDE auf Manjaro Linux installieren](/de/2026/05/29/how-to-install-cursor-ide-in-manjaro/).

Wenn du bisher einfach die Standard-Bash deiner Distribution verwendest, ist Zsh einen Versuch wert: Die Shell lässt sich sehr weitgehend anpassen und wird durch eine aktive Community mit nützlichen Plugins erweitert. Ich nutze dafür Oh My Zsh, ein quelloffenes, von der Community gepflegtes Framework für die Zsh-Konfiguration.

![Screenshot von Oh My ZSH in Yakuake](/images/2019/06/Screenshot_20190605_040118.png)

## Oh My Zsh unter Ubuntu, Manjaro oder Arch installieren

Dieser Abschnitt ist der schnelle Einstieg, wenn du nach **oh my zsh installieren** gesucht hast und nur die Befehle brauchst. Danach folgen Schriftarten, Themes, Plugins sowie die Einrichtung des integrierten Terminals in VS Code und Cursor.

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

Während der Installation wirst du gefragt, ob Zsh deine Standardshell werden soll. Das kannst du mit Ja bestätigen.

Wenn du diesen Schritt übersprungen hast oder deine Distribution die Shell nicht automatisch umgestellt hat, kannst du sie manuell ändern:

```shell
chsh -s "$(command -v zsh)"
```

Melde dich nach der Änderung ab und wieder an.

## Oh My Zsh konfigurieren

Mit Oh My Zsh kannst du unter anderem das Update-Verhalten ändern, Plugins ein- oder ausschalten und den Standardbenutzer festlegen. Öffne deine eigene `~/.zshrc` immer ohne `sudo`:

```shell
nano ~/.zshrc
```

Dieses schlanke Beispiel funktioniert gut unter Linux. Aktiviere nur Plugins, die du tatsächlich verwendest:

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

[Powerlevel10k](https://github.com/romkatv/powerlevel10k) ist ein schnelles, vielseitig konfigurierbares Zsh-Theme. Oh My Zsh verwendet standardmäßig `~/.oh-my-zsh/custom` als `ZSH_CUSTOM`. Stelle daher zuerst sicher, dass die Verzeichnisse für eigene Themes und Plugins vorhanden sind:

```shell
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
mkdir -p "$ZSH_CUSTOM/themes" "$ZSH_CUSTOM/plugins"
```

Anschließend kannst du Powerlevel10k herunterladen:

```shell
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "$ZSH_CUSTOM/themes/powerlevel10k"
```

Trage es danach in deiner `~/.zshrc` als Theme ein:

```shell
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Installiere vor dem Neuladen von Zsh oder dem Öffnen eines neuen Terminals die Schriftart aus dem nächsten Abschnitt. Beim ersten Start führt dich Powerlevel10k durch einen Assistenten zur Auswahl des Prompt-Stils.

## Schriftart installieren

Powerlevel10k benötigt eine Nerd Font, damit Symbole und Zeichen im Prompt korrekt dargestellt werden. Wenn du Powerlevel10k verwendest, installiere die dafür empfohlene Meslo-Schriftart. Für andere Themes reicht in der Regel die normale Meslo Nerd Font.

### Für Powerlevel10k

Unter Ubuntu/Kubuntu installierst du die Powerlevel10k-Meslo-Schriftarten manuell für deinen aktuellen Benutzer:

```shell
font_dir="$HOME/.local/share/fonts/MesloLGS-NF"
mkdir -p "$font_dir"

wget -O "$font_dir/MesloLGS NF Regular.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf"
wget -O "$font_dir/MesloLGS NF Bold.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold.ttf"
wget -O "$font_dir/MesloLGS NF Italic.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Italic.ttf"
wget -O "$font_dir/MesloLGS NF Bold Italic.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold%20Italic.ttf"

fc-cache -fv "$font_dir"
```

Unter Manjaro/Arch installierst du das passende Paket aus dem Repository `extra`:

```shell
sudo pacman -S ttf-meslo-nerd-font-powerlevel10k
```

### Für andere Themes

Unter Ubuntu/Kubuntu installierst du die Meslo Nerd Font manuell für deinen aktuellen Benutzer:

```shell
font_dir="$HOME/.local/share/fonts/MesloNerdFont"
tmp_dir="$(mktemp -d)"

mkdir -p "$font_dir"
wget -O "$tmp_dir/Meslo.zip" https://github.com/ryanoasis/nerd-fonts/releases/latest/download/Meslo.zip
unzip -o "$tmp_dir/Meslo.zip" -d "$font_dir"
rm -rf "$tmp_dir"

fc-cache -fv "$font_dir"
```

Unter Manjaro/Arch kannst du Meslo Nerd Font über den Paketmanager installieren:

```shell
sudo pacman -S ttf-meslo-nerd
```

Wenn du für Powerlevel10k bereits `ttf-meslo-nerd-font-powerlevel10k` installiert hast, brauchst du `ttf-meslo-nerd` nicht zusätzlich.

Den installierten Schriftnamen kannst du so prüfen:

```shell
fc-match "MesloLGS NF"
fc-match "MesloLGS Nerd Font Mono"
```

Lade Zsh nach der Schriftinstallation neu:

```shell
source ~/.zshrc
```

Alternativ öffnest du einfach ein neues Terminal.

## Optionale Plugins

Diese beiden Plugins verbessern die Arbeit mit Oh My Zsh:

```shell
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
git clone https://github.com/zsh-users/zsh-autosuggestions.git "$ZSH_CUSTOM/plugins/zsh-autosuggestions"
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
```

Aktiviere sie anschließend in der Liste `plugins=(...)` deiner `~/.zshrc`. `zsh-syntax-highlighting` muss dabei immer an letzter Stelle stehen:

```shell
plugins=(
  git
  vscode
  zsh-autosuggestions
  zsh-syntax-highlighting # immer zuletzt
)
```

Lade Zsh nach dem Ändern der Plugin-Liste neu:

```shell
source ~/.zshrc
```

Alternativ öffnest du einfach ein neues Terminal.

## Eigene Themes und Plugins aktuell halten

Der eingebaute Updater von Oh My Zsh (`omz update` oder die oben gezeigte Einstellung `zstyle ':omz:update'`) aktualisiert nur das Framework selbst. Themes und Plugins, die du mit `git clone` nach `$ZSH_CUSTOM` geholt hast — etwa Powerlevel10k, zsh-autosuggestions und zsh-syntax-highlighting — bleiben unverändert, bis du sie separat aktualisierst.

Mit diesem Befehl aktualisierst du alle Git-Checkouts unter `custom/plugins` und `custom/themes`:

```shell
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
for d in "$ZSH_CUSTOM"/{plugins,themes}/*/; do
  [ -d "$d/.git" ] && git -C "$d" pull --ff-only
done
```

Führe den Befehl alle paar Monate aus oder lege dir einen Alias beziehungsweise Cron-Job an, wenn du nicht daran denken möchtest. So aktualisierst du Oh My Zsh und die eigenen Clones in einem Durchgang:

```shell
omz update
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
for d in "$ZSH_CUSTOM"/{plugins,themes}/*/; do
  [ -d "$d/.git" ] && git -C "$d" pull --ff-only
done
```

## Zsh als Standardterminal in VS Code oder Cursor IDE einstellen

![Screenshot von OhMyZSH in VSCode](/images/2019/06/Screenshot_20190605_051605.png)

Zsh ist nun eingerichtet, Powerlevel10k als Theme gesetzt und eine passende Schriftart installiert. **VS Code** und **Cursor IDE** verwenden im integrierten Terminal möglicherweise weiterhin Bash. Stelle deshalb das **VS-Code-Terminal** beziehungsweise Cursor auf Zsh um. Starte den Editor nach der Schriftinstallation neu, damit er die Schriftart erkennt.

Wenn du Cursor zuerst unter Manjaro einrichtest, lies [Cursor IDE auf Manjaro Linux installieren](/de/2026/05/29/how-to-install-cursor-ide-in-manjaro/). Mit dem Skript [update-cursor.sh](/scripts/update-cursor.sh) hältst du die AppImage anschließend aktuell.

Das Oh-My-Zsh-Plugin `vscode` verbessert außerdem das integrierte Terminal im Editor. Aktiviere es wie im Konfigurationsabschnitt gezeigt in der Liste `plugins=(...)` deiner `~/.zshrc`.

Konfiguriere nun VS Code oder Cursor für Zsh. Füge die folgenden Einträge in die `settings.json` ein oder suche sie einzeln in den Einstellungen:

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
