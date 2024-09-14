---
title: Set permanent custom resolution for Ubuntu and KDE Using Xrandr and Xsetup
date: 2018-05-24T22:50:53+00:00
layout: single
author_profile: true
url: 2018/05/24/set-permanent-custom-resolution-for-ubuntu-and-kde/
shortlink: https://g.omid.dev/2KRbLVf
image: /images/2018/05/klogo-official-lineart_detailed-3000x3000.png
tags:
  - CLI
  - How to
  - KDE
  - KDE5
  - Kubuntu
  - shell
  - ubuntu
  - xrandr
  - xsetup
lang: en
categories: 
  - techblog
---
![KDE Logo](/images/2018/05/KDE_Logo_Official_Lineart_Detailed.svg_-150x150.png) After switching from Gnome and Unity to KDE, I had a problem with SDDM and it was that it could not detect correct resolution for my UltraWide monitor and set it to Full HD instead of 2560×1080. I had a similar problem in Ubuntu with another old monitor. Anyway that solution is same in both cases.

The solution for this problem is using Xrandr and Xsetup to set the correct resolution and make it permanent.

For example, in my case for 2560×1080 resolution and 50hz refresh rate, I used the following commands:

```shell
xrandr --newmode "2560x1080_50.00" 188.75 2560 2712 2976 3392 1080 1083 1093 1114 -hsync +vsync
xrandr --addmode HDMI-2 2560x1080_50.00
xrandr -s 2560x1080 -r 50
```

Note: you can get the right numbers for the first line of command using this:

`cvt 2560 1080 50`

Ok, we have the correct commands and resolution for our system, but problem is that we should run all these commands after every reboot and also these commands won't apply to our login screen, so we should use Xsetup file to run the commands before loading the desktop manager, so we put above commands into Xsetup file.

The path for Xsetup file in KDE 5 (Kubuntu 18.04):

`/usr/share/sddm/scripts/Xsetup`

And for older versions of KDE:

```shell
/etc/kde4/kdm/Xsetup
/etc/kde3/kdm/Xsetup
/etc/kde/kdm/Xsetup
```

Done, now reboot your system and enjoy the correct resolution.
