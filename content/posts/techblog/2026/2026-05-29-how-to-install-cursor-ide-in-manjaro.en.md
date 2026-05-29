---
title: "How to Install Cursor IDE on Manjaro Linux"
date: 2026-05-29T16:45:00+03:30
description: "A practical AppImage-based Cursor IDE installation guide for Manjaro Linux, including launcher setup, desktop integration, icon extraction, and a one-command update script."
layout: single
author_profile: true
shortlink: https://g.omid.dev/yAXBVd2
# x_link: 
# mastodon_link: 
# bluesky_link: 
# linkedin_link: 
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
---
Cursor is distributed for Linux as an AppImage, which works well on Manjaro because you do not need to wait for a package in the official repositories or the AUR.

Before writing this post, I tried installing Cursor from the AUR, but it was not stable enough for me. I also did not love the extra Electron dependency, although that was not the main reason I moved away from that method. At the time of writing, there is no official Snap release, no official Manjaro or Arch package for Cursor either.

So this guide uses the AppImage directly from Cursor's own update endpoint. I usually prefer keeping AppImages under `~/.local/opt` and exposing only a small launcher command from `~/.local/bin`.

This keeps the installation local to your user, easy to update, and easy to remove.

## Install the Required Packages

First make sure `curl` is installed. On Manjaro, it is also useful to have `fuse2` available because many AppImages still depend on it.

```shell
sudo pacman -Syu curl fuse2
```

## Create a Directory for Cursor

Create a dedicated directory for the Cursor AppImage:

```shell
mkdir -p ~/.local/opt/cursor
```

## Download the Latest Cursor AppImage

Download the latest Cursor build into that directory:

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

## One-Command Install and Update Script

If you want a single command for future updates, create a small `update-cursor` script:

```shell
mkdir -p ~/.local/bin

cat > ~/.local/bin/update-cursor <<'EOF'
#!/usr/bin/env bash
set -euo pipefail

CURSOR_DIR="$HOME/.local/opt/cursor"
CURSOR_APPIMAGE="$CURSOR_DIR/cursor.AppImage"
CURSOR_ICON="$CURSOR_DIR/cursor.png"
DESKTOP_FILE="$HOME/.local/share/applications/cursor.desktop"
DOWNLOAD_URL="https://api2.cursor.sh/updates/download/golden/linux-x64/cursor/"

if ! command -v curl >/dev/null 2>&1; then
  echo "curl is required. Install it with: sudo pacman -S curl" >&2
  exit 1
fi

mkdir -p "$CURSOR_DIR" "$HOME/.local/bin" "$HOME/.local/share/applications"

TMP_DIR="$(mktemp -d)"
TMP_APPIMAGE="$TMP_DIR/cursor.AppImage"

cleanup() {
  rm -rf "$TMP_DIR"
}
trap cleanup EXIT

echo "Downloading latest Cursor AppImage..."
curl --fail --location --show-error "$DOWNLOAD_URL" --output "$TMP_APPIMAGE"
chmod +x "$TMP_APPIMAGE"

echo "Extracting Cursor icon..."
(
  cd "$TMP_DIR"
  "$TMP_APPIMAGE" --appimage-extract >/dev/null
)
install -m 644 \
  "$TMP_DIR/squashfs-root/usr/share/icons/hicolor/512x512/apps/cursor.png" \
  "$CURSOR_ICON"

mv -f "$TMP_APPIMAGE" "$CURSOR_APPIMAGE"
ln -sfn "$CURSOR_APPIMAGE" "$HOME/.local/bin/cursor"

cat > "$DESKTOP_FILE" <<DESKTOP
[Desktop Entry]
Name=Cursor
Exec=$CURSOR_APPIMAGE
Icon=$CURSOR_ICON
Type=Application
Categories=Development;
Terminal=false
StartupNotify=true
DESKTOP

chmod +x "$DESKTOP_FILE"

if command -v update-desktop-database >/dev/null 2>&1; then
  update-desktop-database "$HOME/.local/share/applications" >/dev/null 2>&1 || true
fi

echo "Cursor has been installed or updated."
echo "Run it with: cursor"
EOF

chmod +x ~/.local/bin/update-cursor
```

After that, installing or updating Cursor is just:

```shell
update-cursor
```

If Cursor is open while you update it, close it first, run `update-cursor`, and then start it again.
