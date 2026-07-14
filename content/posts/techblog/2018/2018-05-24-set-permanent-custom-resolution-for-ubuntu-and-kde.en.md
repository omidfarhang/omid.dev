---
title: "Set a Permanent Custom Resolution on Ubuntu and KDE with xrandr and Xsetup"
date: 2018-05-24T22:50:53+00:00
lastmod: 2026-07-14T22:15:00+03:30
description: "How to add an undetected monitor mode with cvt and xrandr, then make it persist across reboot and the SDDM login screen on Kubuntu/KDE via Xsetup — with notes for modern Plasma and Wayland."
layout: single
author_profile: true
url: 2018/05/24/set-permanent-custom-resolution-for-ubuntu-and-kde/
shortlink: https://g.omid.dev/2KRbLVf
keywords:
  - xrandr custom resolution
  - SDDM Xsetup
  - Kubuntu ultrawide
  - permanent monitor mode Linux
tags:
  - Linux
  - Ubuntu
  - Kubuntu
  - KDE
  - SDDM
  - xrandr
  - CLI
  - How to

categories:
  - TechBlog
seeAlso:
  - /2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/
  - /2019/06/05/install-and-configure-oh-my-zsh-and-use-it-in-vscode-in-linux/
howToSteps:
  - name: Find your display output name
    text: Run xrandr and note the connected output (for example HDMI-2 or DP-1).
  - name: Generate a modeline with cvt
    text: Run cvt with your width, height, and refresh rate, then create and add the mode with xrandr.
  - name: Apply the mode for this session
    text: Use xrandr --output and --mode to switch to the new resolution and confirm it looks correct.
  - name: Persist via SDDM Xsetup
    text: Append the same xrandr commands to /usr/share/sddm/scripts/Xsetup so the login screen and desktop boot at the right resolution.
---
{{< figure src="/images/2018/05/KDE_Logo_Official_Lineart_Detailed.svg_-150x150.png" alt="KDE logo" >}}

**TL;DR**

- Generate a modeline with `cvt`, add it with `xrandr --newmode` / `--addmode`, then enable it on your output.
- Session-only changes vanish on reboot and never fix the login screen.
- On KDE/Kubuntu with SDDM, put the same commands in `Xsetup` so they run before the greeter.

---

After I switched from GNOME/Unity to KDE, SDDM would not pick up my ultrawide panel. It stuck at Full HD instead of **2560×1080**. I had hit the same class of problem earlier on Ubuntu with an older monitor whose native mode never showed up in the display settings.

The fix is the same in both cases: create a custom mode with **xrandr**, then make it permanent — including on the login screen — with **Xsetup**.

{{< alert type="warning" title="X11 vs Wayland" >}}
This workflow is for **X11** (and SDDM’s classic X11 greeter). Pure Wayland sessions do not use `xrandr` the same way. On modern Plasma, try **System Settings → Colors & Themes → Login Screen (SDDM) → Apply Plasma Settings…** first; use Xsetup when you still need a custom modeline or an X11 greeter.
{{< /alert >}}

## 1. Find your output name

Modes are attached to a specific connector. List them:

```shell
xrandr
```

Look for a line with `connected` — for example `HDMI-2`, `DP-1`, or `eDP-1`. Everything below uses `HDMI-2`; replace that with yours.

## 2. Generate a modeline with cvt

For **2560×1080 @ 50 Hz**:

```shell
cvt 2560 1080 50
```

That prints a `Modeline` line. Drop the `Modeline` keyword when you pass it to `xrandr`. In my case the numbers were:

```shell
xrandr --newmode "2560x1080_50.00" 188.75 2560 2712 2976 3392 1080 1083 1093 1114 -hsync +vsync
xrandr --addmode HDMI-2 2560x1080_50.00
xrandr --output HDMI-2 --mode 2560x1080_50.00 --rate 50
```

{{< alert type="tip" title="Safer than -s" >}}
Prefer `--output … --mode …` over plain `xrandr -s …`. Explicit output naming is clearer when more than one display is connected.
{{< /alert >}}

If the screen blanks or flickers, try a lower refresh rate (`cvt 2560 1080 45`) or `cvt -r` for reduced blanking on some LCDs. You can also wrap a test in a fallback:

```shell
xrandr --output HDMI-2 --mode 2560x1080_50.00 && sleep 5 && xrandr --output HDMI-2 --auto
```

## 3. Make it permanent (including the login screen)

`xrandr` changes last only for the current X session. They also do not run before the display manager, so SDDM can still greet you at the wrong resolution.

SDDM runs **Xsetup** as root before the greeter appears. Put the same three commands there.

**KDE 5 / SDDM (Kubuntu 18.04 and later):**

`/usr/share/sddm/scripts/Xsetup`

Example file contents (keep any existing shebang or comments):

```shell
#!/bin/sh
# Xsetup — run as root before the login dialog appears

xrandr --newmode "2560x1080_50.00" 188.75 2560 2712 2976 3392 1080 1083 1093 1114 -hsync +vsync
xrandr --addmode HDMI-2 2560x1080_50.00
xrandr --output HDMI-2 --mode 2560x1080_50.00 --rate 50
```

Edit with sudo, then reboot and check both the greeter and the desktop.

{{< alert type="info" title="Package updates" >}}
Files under `/usr/share/sddm/` can be overwritten on package upgrade. If that happens, re-add the lines, or point SDDM at your own script via a drop-in under `/etc/sddm.conf.d/` with `DisplayCommand=/path/to/your/Xsetup`.
{{< /alert >}}

**Older KDE / KDM paths:**

```text
/etc/kde4/kdm/Xsetup
/etc/kde3/kdm/Xsetup
/etc/kde/kdm/Xsetup
```

## Alternatives when you only need the desktop session

If fixing the **login screen** is optional:

| Approach | Persists for | Notes |
|----------|--------------|--------|
| `~/.xprofile` or autostart script | Your X session | Easy; greeter unchanged |
| `/etc/X11/xorg.conf.d/10-monitor.conf` | Whole X server | Modeline in a `Monitor` section; more durable but fiddlier |
| SDDM **Apply Plasma Settings** | Greeter (Plasma 5/6) | Best first try for layout/scaling when the mode already exists |

## Troubleshooting

- **`xrandr: cannot find mode`** — Create the mode with `--newmode` before `--addmode`, and use the exact mode name string.
- **`BadMatch` on `--addmode`** — Wrong timing for that panel/cable, or a bad EDID. Try another refresh rate, or a modeline from the Xorg log / the monitor’s EDID.
- **Wrong connector name** — Names differ between GPU drivers and can change under Wayland vs X11. Always read them from `xrandr` in an X11 session.
- **Works after login but greeter is wrong** — Your session script ran; Xsetup did not. Confirm the greeter is X11-based SDDM and that `DisplayCommand` still points at your script.

Once the mode sticks through reboot and on the login screen, you are done — ultrawide (or that stubborn old panel) at the resolution it should have had all along.
