---
title: "How to Install Cursor IDE on Manjaro Linux"
date: 2026-05-29T16:45:00+03:30
description: "A practical AppImage-based Cursor IDE installation guide for Manjaro Linux, including launcher setup, desktop integration, icon extraction, and a small install/update/uninstall script."
layout: single
author_profile: true
shortlink: https://g.omid.dev/yAXBVd2
keywords:
  - cursor ide manjaro
  - install cursor linux
  - cursor appimage
  - manjaro cursor
x_link: https://x.com/OmidFarhangEn/status/2060358981831602255
mastodon_link: https://mastodon.social/@omidfarhang/116658204889356987
bluesky_link: https://bsky.app/profile/omid.dev/post/3mmyorvy3fc26
linkedin_link: https://www.linkedin.com/posts/omidfarhang_how-to-install-cursor-ide-on-manjaro-linux-share-7466142810790887426-mVHc/
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
seeAlso:
  - /2019/06/05/install-and-configure-oh-my-zsh-and-use-it-in-vscode-in-linux/
  - /2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/
  - /2026/06/04/building-a-tiny-linux-app-to-explain-desktop-stutter/
howToSteps:
  - name: Install required packages
    text: Install curl and fuse2 with pacman on Manjaro.
  - name: Download the Cursor AppImage
    text: Download the latest stable AppImage from Cursor's API into ~/.local/opt/cursor.
  - name: Create launcher and desktop entry
    text: Symlink the AppImage to ~/.local/bin/cursor and create a .desktop file with the extracted icon.
  - name: Keep Cursor updated
    text: Use the update-cursor script from omid.dev/scripts/update-cursor.sh for install, update, and uninstall.
---
Cursor is distributed for Linux as an AppImage, which works well on Manjaro because you do not need to wait for a package in the official repositories or the AUR.

Before writing this post, I tried installing Cursor from the AUR, but it was not stable enough for me. I also did not love the extra Electron dependency, although that was not the main reason I moved away from that method. At the time of writing, there is no official Snap release, no official Manjaro or Arch package for Cursor either.

So this guide uses Cursor's official download API to find the current stable AppImage. I usually prefer keeping AppImages under `~/.local/opt` and exposing only a small launcher command from `~/.local/bin`.

This keeps the installation local to your user, easy to update, and easy to remove.

## Install the Required Packages

First make sure `curl` and `fuse2` are installed. `fuse2` is useful because many AppImages still depend on it.

```shell
sudo pacman -Syu curl fuse2
```

## Create a Directory for Cursor

Create a dedicated directory for the Cursor AppImage:

```shell
mkdir -p ~/.local/opt/cursor
```

## Download the Latest Cursor AppImage

Download the Cursor AppImage into that directory:

```shell
curl -L "https://api2.cursor.sh/updates/download/golden/linux-x64/cursor/" \
  -o ~/.local/opt/cursor/cursor.AppImage
```

Then make it executable:

```shell
chmod +x ~/.local/opt/cursor/cursor.AppImage
```

## Create the `cursor` Command

Create `~/.local/bin` if it does not already exist:

```shell
mkdir -p ~/.local/bin
```

Then create a symlink so you can start Cursor from the terminal:

```shell
ln -sf ~/.local/opt/cursor/cursor.AppImage ~/.local/bin/cursor
```

Make sure `~/.local/bin` is in your `PATH`. If you use Zsh, add this to `~/.zshrc` if it is not already there:

```shell
export PATH="$HOME/.local/bin:$PATH"
```

Reload your shell:

```shell
source ~/.zshrc
```

Now test it:

```shell
cursor
```

## Extract the Cursor Icon

For a proper desktop launcher, you need an icon file. The AppImage already contains one, so you can extract it:

```shell
cd ~/.local/opt/cursor

./cursor.AppImage --appimage-extract

cp \
  ~/.local/opt/cursor/squashfs-root/usr/share/icons/hicolor/512x512/apps/cursor.png \
  ~/.local/opt/cursor/cursor.png

rm -rf ~/.local/opt/cursor/squashfs-root
```

## Create the Desktop Entry

Create the desktop applications directory:

```shell
mkdir -p ~/.local/share/applications
```

Then create the desktop entry:

```shell
nano ~/.local/share/applications/cursor.desktop
```

Use this content, but replace `YOUR_USER` with your real Linux username:

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

For example, if your username is `omid`, the paths should start with `/home/omid/...`.

After saving the file, make it executable:

```shell
chmod +x ~/.local/share/applications/cursor.desktop
```

You should now be able to find Cursor in your application launcher.

## Install Script (Recommended)

The manual steps above are useful to understand what is happening, but for day-to-day use I keep the logic in a small script instead of a long copy-paste block.

Download it once:

```shell
mkdir -p ~/.local/bin
curl -fsSL https://omid.dev/scripts/update-cursor.sh -o ~/.local/bin/update-cursor
chmod +x ~/.local/bin/update-cursor
```

If you prefer to inspect the source first, it lives in the repo at [`static/scripts/update-cursor.sh`](https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-cursor.sh).

After that, installing or updating Cursor is just:

```shell
update-cursor
```

The script compares the installed version in `~/.local/opt/cursor/version.txt` with the latest stable release from Cursor's API. If you already have the same version, or a newer one, it skips the download. To reinstall anyway:

```shell
update-cursor --force
```

To remove Cursor completely, including the AppImage, icon, desktop entry, `cursor` command, and the `update-cursor` script itself:

```shell
update-cursor --uninstall
```

If Cursor is open while you update it, close it first, run `update-cursor`, and then start it again.
