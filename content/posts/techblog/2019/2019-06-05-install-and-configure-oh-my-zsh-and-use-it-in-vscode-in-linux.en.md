---
title: Install and Configure Oh My Zsh and use it in VSCode or Cursor
date: 2019-06-05T00:45:20+00:00
lastmod: 2026-06-16T12:00:00+03:30
description: "Install Oh My Zsh on Ubuntu, Manjaro, or Arch Linux, then use Zsh as the integrated terminal in VS Code or Cursor IDE with Powerlevel10k, Nerd Fonts, and useful plugins."
layout: single
author_profile: true
url: 2019/06/05/install-and-configure-oh-my-zsh-and-use-it-in-vscode-in-linux/
shortlink: https://g.omid.dev/31b2bWc
keywords:
  - oh my zsh
  - vscode terminal
  - zsh
  - cursor ide
  - manjaro
  - arch linux
  - install oh my zsh
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
  - name: Install Zsh and dependencies
    text: Install zsh, git, curl, wget, unzip, and fontconfig with apt on Ubuntu or pacman on Manjaro/Arch.
  - name: Install Oh My Zsh
    text: Run the official Oh My Zsh install script via curl or wget, then set zsh as your default shell with chsh.
  - name: Configure Oh My Zsh
    text: Edit ~/.zshrc to enable plugins, set Powerlevel10k as the theme, and install a Nerd Font.
  - name: Use Zsh in VS Code or Cursor
    text: Set terminal.integrated.defaultProfile.linux to zsh and configure the Meslo Nerd Font in settings.json.
---
**TL;DR**

- Install `zsh`, then run the [Oh My Zsh](https://ohmyz.sh/) installer on Ubuntu, Manjaro, or Arch.
- Enable the `vscode` plugin, add Powerlevel10k, and install a Meslo Nerd Font.
- Point the **VS Code integrated terminal** or **Cursor IDE terminal** at `/usr/bin/zsh` in `settings.json`.
- On Manjaro, also see [How to Install Cursor IDE on Manjaro Linux](/2026/05/29/how-to-install-cursor-ide-in-manjaro/).

If you use the simple Bash Terminal in your OS, you may want to give Zsh a try to use a faster and safer terminal with many more features. The simple Bash that exist in the common dist of Linuxes are not changed over years and just received some security fixes, but the community behind Zsh are improving it everyday and bring new useful plugins.

I use 'Oh my Zsh', Oh My Zsh is an open source, community-driven framework for managing your zsh configuration.

![Screenshot of Oh My ZSH in Yakuake](/images/2019/06/Screenshot_20190605_040118.png)

## Install Oh My Zsh on Ubuntu, Manjaro, or Arch

This section is the fastest path if you searched for **install oh my zsh** and only need the commands. The rest of the post covers fonts, themes, plugins, and the VS Code / Cursor integrated terminal.

### Step 1 — Install Zsh

On Ubuntu/Kubuntu:

```shell
sudo apt update
sudo apt install zsh git curl wget unzip fontconfig
```

On Manjaro/Arch:

```shell
sudo pacman -Syu zsh git curl wget unzip fontconfig
```

### Step 2 — Install the Oh My Zsh framework

### Via Curl

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

### Or via Wget

```shell
sh -c "$(wget -O- https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

During installation it will ask you if you want to make it your default terminal and you may answer yes.

If you skipped that step or your distro did not change it automatically, you can change your default shell manually:

```shell
chsh -s "$(command -v zsh)"
```

Log out and back in after changing your default shell.

## Configure Oh My Zsh

You can configure Oh My Zsh to change how it updates, enable or disable plugins, set the default user, and more. Open your own `~/.zshrc` file without `sudo`:

```shell
nano ~/.zshrc
```

Here is a simple Linux-friendly example. Keep only the plugins you really use:

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
  # If you use Cursor instead of VSCode, use: export EDITOR='cursor --wait'
fi
```

## Installing Powerlevel10k Theme

[Powerlevel10k](https://github.com/romkatv/powerlevel10k) is a fast and customizable theme for Zsh. Oh My Zsh uses `~/.oh-my-zsh/custom` as `ZSH_CUSTOM` by default, so first make sure its custom theme and plugin directories exist:

```shell
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
mkdir -p "$ZSH_CUSTOM/themes" "$ZSH_CUSTOM/plugins"
```

Then download Powerlevel10k:

```shell
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "$ZSH_CUSTOM/themes/powerlevel10k"
```

Then set it as your theme in `~/.zshrc`:

```shell
ZSH_THEME="powerlevel10k/powerlevel10k"
```

Install the font in the next section before you reload Zsh or open a new terminal. The first time Powerlevel10k loads, it will start a setup wizard to help you choose the prompt style.

## Installing Font

Powerlevel10k needs a Nerd Font to show icons and prompt symbols correctly. If you use Powerlevel10k, install the Meslo font recommended for Powerlevel10k. If you use another theme later, regular Meslo Nerd Font is usually enough.

### For Powerlevel10k

On Ubuntu/Kubuntu, install the Powerlevel10k Meslo font files manually for your current user:

```shell
font_dir="$HOME/.local/share/fonts/MesloLGS-NF"
mkdir -p "$font_dir"

wget -O "$font_dir/MesloLGS NF Regular.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf"
wget -O "$font_dir/MesloLGS NF Bold.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold.ttf"
wget -O "$font_dir/MesloLGS NF Italic.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Italic.ttf"
wget -O "$font_dir/MesloLGS NF Bold Italic.ttf" "https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold%20Italic.ttf"

fc-cache -fv "$font_dir"
```

On Manjaro/Arch, install the matching package from the `extra` repository:

```shell
sudo pacman -S ttf-meslo-nerd-font-powerlevel10k
```

### For other themes

On Ubuntu/Kubuntu, install Meslo Nerd Font manually for your current user:

```shell
font_dir="$HOME/.local/share/fonts/MesloNerdFont"
tmp_dir="$(mktemp -d)"

mkdir -p "$font_dir"
wget -O "$tmp_dir/Meslo.zip" https://github.com/ryanoasis/nerd-fonts/releases/latest/download/Meslo.zip
unzip -o "$tmp_dir/Meslo.zip" -d "$font_dir"
rm -rf "$tmp_dir"

fc-cache -fv "$font_dir"
```

On Manjaro/Arch, you can install Meslo Nerd Font from the package manager:

```shell
sudo pacman -S ttf-meslo-nerd
```

If you installed `ttf-meslo-nerd-font-powerlevel10k` for Powerlevel10k, you do not need to install `ttf-meslo-nerd` too.

You can verify the installed font name with:

```shell
fc-match "MesloLGS NF"
fc-match "MesloLGS Nerd Font Mono"
```

After installing the font, reload Zsh:

```shell
source ~/.zshrc
```

You can also just open a new terminal.

## Optional: useful plugins

You can also install these two plugins for a better experience with Oh My Zsh:

```shell
ZSH_CUSTOM="${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}"
git clone https://github.com/zsh-users/zsh-autosuggestions.git "$ZSH_CUSTOM/plugins/zsh-autosuggestions"
git clone https://github.com/zsh-users/zsh-syntax-highlighting.git "$ZSH_CUSTOM/plugins/zsh-syntax-highlighting"
```

Then enable them in the `plugins=(...)` list in `~/.zshrc`. Keep `zsh-syntax-highlighting` last:

```shell
plugins=(
  git
  vscode
  zsh-autosuggestions
  zsh-syntax-highlighting # keep this last
)
```

Reload Zsh after changing the plugins:

```shell
source ~/.zshrc
```

You can also just open a new terminal.

## Change the default terminal in VS Code or Cursor IDE

![Screenshot of OhMyZSH in VSCode](/images/2019/06/Screenshot_20190605_051605.png)

By now we have installed and configured Zsh, set Powerlevel10k as the theme, and installed a compatible font. **VS Code** and **Cursor IDE** may still use Bash as the integrated terminal, so we want to switch the **vscode terminal** (or Cursor terminal) to Zsh. After installing the font, restart VS Code or Cursor so it can detect it.

If you are setting up Cursor on Manjaro first, follow [How to Install Cursor IDE on Manjaro Linux](/2026/05/29/how-to-install-cursor-ide-in-manjaro/) and use the `update-cursor` script from [omid.dev/scripts/update-cursor.sh](/scripts/update-cursor.sh) to keep the AppImage current.

The Oh My Zsh `vscode` plugin also improves the integrated terminal experience inside the editor. Enable it in your `plugins=(...)` list in `~/.zshrc` as shown in the configuration section above.

Now configure VS Code or Cursor to use Zsh. Add the following lines to `settings.json` or find them one by one in settings and apply them:

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
