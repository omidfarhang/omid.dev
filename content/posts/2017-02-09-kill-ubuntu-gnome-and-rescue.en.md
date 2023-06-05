---
title: Test Gnome on Ubuntu and Rescue Back
date: 2017-02-09T02:42:21+00:00
layout: single
author_profile: true
url: 2017/02/09/test-gnome-ubuntu-and-back-alive-lightdm-gdm/
shortlink: https://g.omid.dev/WSQaL4J
lang: en
tags: 
  - gdm
  - lightdm
  - ubuntu
  - gnome
category: 
  - techblog
---
## How it started

A few days ago I just decided to give my Ubuntu a new look and experience.

I thought KDE is not in a good situation and maybe Gnome 3 is a better option than Unity.

The easiest option to try Gnome on Ubuntu (Without a clean install of OS) is to install it as a package:

```bash
sudo apt-get install ubuntu-gnome-desktop
```

During the install process it asks for Display Manager, you have options to choose, gdm and lightdm, since I want to try Gnome, I select gdm:

![Choose Display Manager](/images/2017/02/uj0A9.png)

Here is the difference between them (gdm on right, lightdm on left)

![Lightdm vs gdm](/images/2017/02/LaCqz.jpg)

After a few minutes, installation is complete and I can see the changes after a reboot.

Boot screen has been changed, after exploring around for a while, I'm sure it's not what I've been looking for, it's not what I wanted! So I went ahead and removed it all!

```bash
sudo apt-get remove ubuntu-gnome-desktop

```

## Here is my mistake

Here is my mistake, I had to revert the display manager (Back to lightdm) before removing it (gdm that came with gnome).

During the boot after reboot I noticed something is wrong, so looking at what Alt + F1 shows, yikes! gdm service is missing.

Well, I'm not going for a clean install, I should rescue my work!

## Rescue the Ubuntu with Recovery Mode

I need to remove this gdm service error and back to lightdm that exist, so press Esc during boot of Ubuntu and choose 'Recovery Mode'.

We have "Drop to root shell prompt" option in recovery mode, but by default it's useless because it's in Read Only mode, so how can I save my system?

### Get Read/Write access in Recovery Mode

There is a solution for gaining Read/Write access in Recovery Mode and it's to unmount and mount the drive.

```bash
mount -o rw,remount /
```

So now that we have R/W Access we can change the default Display Manager:

```bash
dpkg-reconfigure lightdm
```

Now choose lightdm and reboot the system, tadaaa!

### Cleanup leftover of Gnome

After removing Gnome-Desktop still there are some leftovers which we have to remove until get the system back to its original state, e.g. the boot logo still shows gnome logo:

```shell
sudo apt-get remove plymouth-theme-gnome-ubuntu-logo
```

And/Or Sessions:

```bash
sudo apt-get remove gnome-session-wayland
```

And a general Clean Up:

```bash
sudo apt-get autoremove
```

Now it must be working much better!

Feel free to ask questions in the comments.
