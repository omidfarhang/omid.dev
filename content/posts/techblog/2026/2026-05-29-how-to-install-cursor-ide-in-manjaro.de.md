---
title: "Cursor IDE auf Manjaro Linux installieren"
date: 2026-05-29T16:45:00+03:30
description: "Praktische AppImage-Anleitung für Cursor IDE unter Manjaro Linux: Launcher, Desktop-Integration, Icon-Extraktion und ein kleines Install-/Update-/Deinstall-Skript."
layout: single
author_profile: true
shortlink: https://g.omid.dev/yAXBVd2
keywords:
  - cursor ide manjaro
  - cursor linux installieren
  - cursor appimage
  - manjaro cursor
url: 2026/05/29/how-to-install-cursor-ide-in-manjaro/
tags:
  - Manjaro
  - Arch Linux
  - Cursor
  - Cursor IDE
  - Linux
  - AppImage
categories:
  - TechBlog
howToSteps:
  - name: Benötigte Pakete installieren
    text: Installiere curl und fuse2 mit pacman unter Manjaro.
  - name: Cursor AppImage herunterladen
    text: Lade die aktuelle stabile AppImage über die Cursor-API nach ~/.local/opt/cursor.
  - name: Launcher und Desktop-Eintrag erstellen
    text: Verlinke die AppImage nach ~/.local/bin/cursor und erstelle eine .desktop-Datei mit dem extrahierten Icon.
  - name: Cursor aktuell halten
    text: Nutze das update-cursor-Skript von omid.dev/scripts/update-cursor.sh für Installation, Update und Deinstallation.
---
Cursor wird unter Linux als AppImage verteilt — auf Manjaro musst du nicht auf ein Paket in den offiziellen Repos oder im AUR warten.

Vor diesem Beitrag habe ich Cursor aus dem AUR installiert, aber es war für mich nicht stabil genug. Zum Zeitpunkt des Schreibens gibt es kein offizielles Snap-Paket und kein offizielles Manjaro- oder Arch-Paket.

Diese Anleitung nutzt die offizielle Download-API von Cursor. AppImages liegen bei mir unter `~/.local/opt`, der Launcher unter `~/.local/bin`.

## Benötigte Pakete installieren

```shell
sudo pacman -Syu curl fuse2
```

## Verzeichnis für Cursor anlegen

```shell
mkdir -p ~/.local/opt/cursor
```

## Neueste Cursor AppImage herunterladen

```shell
curl -L "https://api2.cursor.sh/updates/download/golden/linux-x64/cursor/" \
  -o ~/.local/opt/cursor/cursor.AppImage

chmod +x ~/.local/opt/cursor/cursor.AppImage
```

## Den `cursor`-Befehl erstellen

```shell
mkdir -p ~/.local/bin
ln -sf ~/.local/opt/cursor/cursor.AppImage ~/.local/bin/cursor
```

Falls nötig, in `~/.zshrc`:

```shell
export PATH="$HOME/.local/bin:$PATH"
source ~/.zshrc
```

Test:

```shell
cursor
```

Für Zsh und Oh My Zsh siehe [Oh My Zsh in VS Code oder Cursor](/de/2019/06/05/install-and-configure-oh-my-zsh-and-use-it-in-vscode-in-linux/).

## Cursor-Icon extrahieren

```shell
cd ~/.local/opt/cursor
./cursor.AppImage --appimage-extract

cp \
  ~/.local/opt/cursor/squashfs-root/usr/share/icons/hicolor/512x512/apps/cursor.png \
  ~/.local/opt/cursor/cursor.png

rm -rf ~/.local/opt/cursor/squashfs-root
```

## Desktop-Eintrag erstellen

```shell
mkdir -p ~/.local/share/applications
nano ~/.local/share/applications/cursor.desktop
```

Inhalt (ersetze `YOUR_USER` durch deinen Benutzernamen):

```ini
[Desktop Entry]
Name=Cursor
Exec=/home/YOUR_USER/.local/opt/cursor/cursor.AppImage
Icon=/home/YOUR_USER/.local/opt/cursor/cursor.png
Type=Application
Categories=Development;
Terminal=false
StartupNotify=true
```

```shell
chmod +x ~/.local/share/applications/cursor.desktop
```

## Install-Skript (empfohlen)

```shell
mkdir -p ~/.local/bin
curl -fsSL https://omid.dev/scripts/update-cursor.sh -o ~/.local/bin/update-cursor
chmod +x ~/.local/bin/update-cursor
```

Installation oder Update:

```shell
update-cursor
```

Erzwingen:

```shell
update-cursor --force
```

Deinstallation:

```shell
update-cursor --uninstall
```

Cursor vor dem Update schließen, dann `update-cursor` ausführen und neu starten.

## Siehe auch

- [Oh My Zsh in VS Code oder Cursor installieren](/de/2019/06/05/install-and-configure-oh-my-zsh-and-use-it-in-vscode-in-linux/)
- [Ubuntu, Manjaro und der Linux-Desktop, den ich neu denke](/2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/)
