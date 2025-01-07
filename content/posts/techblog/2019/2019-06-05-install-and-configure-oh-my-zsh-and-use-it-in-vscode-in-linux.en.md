---
title: Install and Configure Oh My Zsh and use it in VSCode
date: 2019-06-05T00:45:20+00:00
layout: single
author_profile: true
url: 2019/06/05/install-and-configure-oh-my-zsh-and-use-it-in-vscode-in-linux/
shortlink: https://g.omid.dev/31b2bWc
image: /images/2019/06/Screenshot_20190605_051605.png
tags:
  - Kubuntu
  - oh my zsh
  - ubuntu
  - vscode
  - zsh
lang: en
categories: 
  - TechBlog
---
If you use the simple Bash Terminal in your OS, you may want to give Zsh a try to use a faster and safer terminal with many more features. The simple Bash that exist in the common dist of Linuxes are not changed over years and just received some security fixes, but the community behind Zsh are improving it everyday and bring new useful plugins.

I use 'Oh my Zsh', Oh My Zsh is an open source, community-driven framework for managing your zsh configuration.

![Screenshot of Oh My ZSH in Yakuake](/images/2019/06/Screenshot_20190605_040118.png)

Installing it is easy, here we go:

### First we install zsh itself

```shell
sudo apt install zsh
```

### And then &#8216;Oh my Zsh' framework

#### Via Curl

```shell
sudo sh -c "$(curl -fsSL https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

#### Or via Wget

```shell
sh -c "$(wget -O- https://raw.githubusercontent.com/robbyrussell/oh-my-zsh/master/tools/install.sh)"
```

During installation it will ask you if you want to make it your default terminal and you may answer yes.

Install the requirments:

```shell
sudo apt install fonts-powerline ttf-ancient-fonts
```

### Configure Oh My Zsh

You can configure Oh My Zsh to change how it update (Automate or asking), Enable/Disable Plugins, Setting Default user etc. Here is part of changes I've made, I've enabled some plugins and uncommented/changed some settings:

`sudo nano ~/.zshrc`

```shell
export PATH=$HOME/bin:/usr/local/bin:$PATH
DEFAULT_USER=`whoami`

zstyle ':omz:update' mode auto
zstyle ':omz:update' frequency 1

plugins=(
  bower
  composer
  git
  bundler
  dotenv
  osx
  vscode
  rake
  rbenv
  ruby
)

 if [[ -n $SSH_CONNECTION ]]; then
   export EDITOR='nano'
 else
   export EDITOR='atom'
 fi
 ```

### Installing Theme

There are many plugins installed by default, but I've found this nice theme that comes with some nice features and looks pretty useful, so first we set a `ZSH_CUSTOM` directory and then download our favorite theme into that:

```shell
mkdir $home/.zsh-custom
```

and set the path in `~/.zshrc` file:

```shell
ZSH_CUSTOM=~/.zsh-custom
```

and Download it:

```shell
sudo wget -P $ZSH_CUSTOM/themes/ http://raw.github.com/zakaziko99/agnosterzak-ohmyzsh-theme/master/agnosterzak.zsh-theme
```

And then configure the theme in your `~/.zshrc` file:

```shell
ZSH_THEME="agnosterzak"
```

### Change the default terminal in VSCode

![Screenshot of OhMyZSH in VSCode](/images/2019/06/Screenshot_20190605_051605.png)

Ok so by now we have installed and configured Zsh and set it as default but still VSCode use the default Bash as the integrated terminal. So we want to change it to Zsh, but there are a problem, VSCode only support monospace fotns and cannot use the power-fonts we have installed. so we have to install some compatible fonts first:

My suggestion is **Meslo** from _nerd-fonts_ package. You can download it from their repository: [nerd-fonts/patched-fonts/Meslo/M/Regular/complete](https://github.com/ryanoasis/nerd-fonts/tree/master/patched-fonts/Meslo/M/Regular/complete)  
Just download the mono version and install it via font manager in your OS.

Or if you wish to install it via command line:

```shell
#!/bin/bash

sudo apt install fontconfig
cd ~
wget https://github.com/ryanoasis/nerd-fonts/releases/download/v3.1.1/Meslo.zip
mkdir -p .local/share/fonts
unzip Meslo.zip -d .local/share/fonts
cd .local/share/fonts
rm *Windows*
cd ~
rm Meslo.zip
fc-cache -fv
```

Now we can configure VSCode to use Zsh, Add the following lines to settings.json of VSCode or find them one by one in settings and apply them:

```shell
"terminal.integrated.defaultProfile.linux": "/usr/bin/zsh",
"terminal.integrated.defaultProfile.osx": "/usr/bin/zsh",
"terminal.integrated.fontFamily": "MesloLGM Nerd Font"
```
