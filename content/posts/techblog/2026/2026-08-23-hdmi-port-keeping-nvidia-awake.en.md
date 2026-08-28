---
title: "The HDMI Port Was Keeping NVIDIA Awake"
date: 2026-08-23T02:10:00+03:30
description: "On an Intel + NVIDIA hybrid laptop, native HDMI can keep the dGPU in the display path. That explains the fan noise — and may be a contributor to Chrome and Cursor freezes on this stack."
layout: single
author_profile: true
url: 2026/08/23/hdmi-port-keeping-nvidia-awake/
shortlink: https://g.omid.dev/qEO8Tfu
x_link: https://x.com/OmidFarhang/status/2091303648483844361
mastodon_link: https://mastodon.social/@omidfarhang/117141710669673417
bluesky_link: https://bsky.app/profile/omid.dev/post/3mtpfucfkks2l
linkedin_link: https://lnkd.in/p/g5FRthmW
keywords:
  - hybrid intel nvidia prime
  - hdmi wired to nvidia laptop
  - prime-run manjaro
  - usb-c displayport alt mode
  - thunderbolt external monitor linux
tags:
  - Linux
  - Manjaro
  - NVIDIA
  - Desktop Linux
  - KDE Plasma
  - Performance
  - Hybrid Graphics
  - PRIME
categories:
  - TechBlog
seeAlso:
  - /2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/
  - /2026/06/16/how-i-learned-my-linux-machine-has-been-compressing-memory-for-years/
  - /2026/06/04/building-a-tiny-linux-app-to-explain-desktop-stutter/
  - /2026/05/29/how-to-install-cursor-ide-in-manjaro/
---

Command & Conquer Generals: Zero Hour is not a demanding game in 2026.

On the internal panel of this ASUS Vivobook Pro 15, it stays quiet. Plug the same laptop into an old 1080p HDMI monitor, launch the same Wine/Lutris game with no `prime-run`, and the chassis warms up. The fans come on. Unplug the monitor, and it cools down again.

That is a bad mental model if you assume "old game = Intel GPU = cool laptop." On a hybrid machine, **who renders the frames** and **who owns the physical connector** are two different questions. My native HDMI port is wired to NVIDIA. As long as that monitor is connected, the RTX 3050 has to stay in the display path — even when Mesa Intel Arc is doing all the actual drawing.

That is also why this belongs next to the Chrome and Cursor freezes on this laptop: the symptoms involve the same hybrid-GPU, Wayland, compositor, and power-management stack. Those stalls look like an Electron or Wayland bug. They may share a dGPU that cannot settle into a stable idle. HDMI is one concrete way this machine refuses to let NVIDIA sleep.

This post is the wiring map. The freeze is still an unresolved graphics and power-management problem. The connector is the part I could actually prove.

{{< alert type="info" title="Start with the connector" >}}
Do not begin by changing drivers. First determine which GPU owns the physical connector.
{{< /alert >}}

---

## The machine, and what was already fine

This is an **ASUS Vivobook Pro 15** (`N6506MJ_Q543MJ`) running Manjaro, KDE Plasma on Wayland, with:

- Intel Meteor Lake Arc iGPU (`i915`)
- NVIDIA GeForce RTX 3050 6GB Laptop GPU (Ampere GA107)
- Manjaro MHWD profile `video-hybrid-intel-nvidia-prime`
- NVIDIA driver **610.57.04**

I started this investigation by wondering whether I should switch from the generic hybrid profile to `video-hybrid-intel-nvidia-580xx-prime`. That was the wrong fork. The two profiles share the same hybrid PRIME design, but a different NVIDIA driver branch and package set. The current profile was the recommended one, the GPU is Ampere, and 610 is a current branch. I left it alone.

`inxi` already showed a healthy hybrid session:

| Piece | What it was doing |
| --- | --- |
| Internal panel (`eDP-1`) | Intel |
| External HDMI (`HDMI-A-1`) | NVIDIA |
| Default OpenGL renderer | Mesa Intel Arc Graphics (MTL) |
| Vulkan | Both Intel and NVIDIA devices present |
| Session | `kwin_wayland` |

That last OpenGL line is easy to misread. Intel as the default renderer is **not** a misconfiguration. It is hybrid mode working as designed: the desktop lives on the iGPU, and NVIDIA is there for offload.

The problem was the HDMI row.

---

## Two jobs that look like one

On a hybrid laptop, a GPU can do two different jobs:

1. **Render** the application (OpenGL / Vulkan / CUDA).
2. **Scan out** the image to a physical connector (laptop panel, HDMI, USB-C DisplayPort).

[PRIME render offload](https://wiki.archlinux.org/title/PRIME) is about job 1. `prime-run steam` asks NVIDIA to render that process. It does **not** change which GPU owns HDMI.

Port wiring is about job 2. Linux, NVIDIA Settings, KDE, and MHWD cannot re-solder a connector. If the HDMI jack is electrically attached to the RTX, that port stays an NVIDIA connector.

{{< alert type="tip" title="prime-run is not a display switch" >}}
`prime-run` chooses which GPU renders an application. It cannot move a physically NVIDIA-wired HDMI port onto Intel, and switching MHWD from the generic hybrid profile to `580xx` will not either.
{{< /alert >}}

So the topology I actually had, for a lightweight Intel-rendered game on the external monitor, was:

```text
Game rendered by Intel Arc
        ↓
KWin/PRIME must cross the GPU display boundary
        ↓
NVIDIA scans out HDMI-A-1
        ↓
External monitor
```

The exact buffer-sharing path depends on KWin, Wayland, the driver, and the application. The important observation is simpler: the NVIDIA GPU owns the active connector and cannot fully leave the display path.

It is not Intel → NVIDIA → Intel. The final output GPU is NVIDIA, because the cable is in the NVIDIA jack. That is enough heat and fan noise for an old RTS. It resembles a recurring class of hybrid-GPU reports involving the dGPU remaining active when the desktop otherwise appears to be using the iGPU.

On the internal panel the path is simpler:

```text
Game rendered by Intel Arc
        ↓
Intel scans out eDP-1
        ↓
Laptop display
```

NVIDIA can stay idle. The laptop feels like the machine I expected.

---

## Prove the wiring before you buy a cable

The useful commands are boring, and they are the whole debug.

```bash
sudo dmidecode -s system-product-name
mhwd -li
inxi -Gazy
```

Then list DRM connectors:

```bash
for f in /sys/class/drm/*/status; do
  printf '%s: ' "$f"
  cat "$f"
done
```

On this laptop, with the LG IPS226 on native HDMI, that looked like:

```text
card0-HDMI-A-1   connected     # NVIDIA HDMI
card0-eDP-2      disconnected
card1-eDP-1      connected     # Intel laptop panel
card1-DP-1       disconnected
card1-DP-2       disconnected
card1-DP-3       disconnected
card1-DP-4       disconnected
```

Match that against `inxi`: HDMI-A-1 under the NVIDIA device, eDP-1 under Intel. Then `card0` is NVIDIA and `card1` is Intel.

The four disconnected `card1-DP-*` connectors are the interesting part. They are Intel-associated DRM DisplayPort connectors; one may represent the USB-C/TB4 display path.

This N6506 family has a Thunderbolt 4 USB-C port with display output. ASUS also lists USB-C DisplayPort on some related SKUs; reviews of N6506 variants often say **only TB4 carries video**. Use the port with the lightning-bolt icon first.

A MUX switch, if the firmware offers hybrid vs discrete-GPU modes, does not physically rewire the HDMI jack; its effect depends on how the firmware changes display ownership. Leave hybrid mode on if the goal is "external monitor without permanently waking NVIDIA."

---

## Move the monitor onto Intel

My monitor only has VGA, DVI-D, and HDMI. VGA is not a serious option. HDMI is the practical input.

That does **not** mean "use the laptop's HDMI jack." It means:

```text
Laptop Thunderbolt 4 USB-C
        ↓
USB-C hub or adapter with DisplayPort Alt Mode
        ↓
HDMI
        ↓
Monitor
```

I used an **Anker 332 USB-C hub**. After a few hours the fans had not come on at all. That is the result I wanted, but I still needed the DRM map to prove *why*.

After the hub:

```text
Intel Arc:
  DP-1   → Anker 332 → HDMI → LG monitor
  eDP-1  → internal panel

NVIDIA:
  HDMI-A-1 → disconnected
  eDP-2    → disconnected
```

`inxi` said the same thing in fewer words: Intel `ports: active: DP-1`, NVIDIA `ports: active: none`, monitor on `DP-1`. The sysfs view:

```text
card1-DP-1/status: connected
card0-HDMI-A-1/status: disconnected
```

Both screens are now Intel-driven.

{{< alert type="warning" title="Avoid DisplayLink-only hubs" >}}
Look for USB-C to HDMI with **DisplayPort Alt Mode** (or Thunderbolt 3/4 compatible). Hubs that are **DisplayLink-only** send a compressed USB framebuffer and need extra drivers. They are a different, worse path for a desktop or a game.
{{< /alert >}}

For a 1080p/60 panel, any reputable 4K@60 USB-C-to-HDMI adapter is enough. A future monitor is a better place to spend money: **DisplayPort 1.4**, or USB-C with DP Alt Mode and enough Power Delivery if you want one-cable charging. HDMI-only shopping recreates the original temptation to use the NVIDIA jack.

---

## PRIME still works. Scan-out just moved to Intel.

With the monitor on Intel, an old game launched normally is:

```text
Game → Intel Arc → DP-1 → hub → monitor
```

Intel owns scan-out, so NVIDIA can sit in a low-power idle unless an app explicitly offloads to it. That is why Generals no longer heats the chassis just because a second screen is on.

A demanding app still goes through PRIME:

```bash
prime-run steam
prime-run blender
prime-run glxinfo -B
```

The route becomes:

```text
Game rendered by RTX 3050
        ↓
KWin/PRIME must cross the GPU display boundary
        ↓
Intel scans out DP-1
        ↓
Hub → monitor
```

NVIDIA wakes because it is **rendering**, not because it owns the cable. After the process exits, it can idle again.

| Workload | Native HDMI (NVIDIA-wired) | TB4/USB-C if Intel-wired |
| --- | --- | --- |
| Desktop, browser, editor | NVIDIA stays in the display path | Intel only; NVIDIA can idle |
| Old Intel-rendered game | Intel render → NVIDIA scan-out; extra heat | Intel render → Intel scan-out |
| `prime-run` game | NVIDIA render → NVIDIA HDMI (direct) | NVIDIA render → Intel scan-out |
| Lowest-latency / high-refresh dGPU gaming | More direct | Extra transfer across the GPU boundary |

At 1920×1080/60, any additional PRIME transfer is likely to be less noticeable than it would be at high resolution and refresh rate, although the actual cost depends on the application and compositor. At 1440p/240 or a G-SYNC-sensitive setup, native NVIDIA HDMI (or discrete MUX mode) can still be the better scan-out path. I am keeping the HDMI cable in the drawer for that case, not for daily desktop use.

Confirm both renderers:

```bash
glxinfo -B | grep -E 'OpenGL vendor|OpenGL renderer'
prime-run glxinfo -B | grep -E 'OpenGL vendor|OpenGL renderer'
```

Expected:

```text
# default
OpenGL renderer: Mesa Intel Arc Graphics (MTL)

# offload
OpenGL renderer: NVIDIA GeForce RTX 3050 6GB Laptop GPU
```

---

## What "idle NVIDIA" actually looks like

I did not capture a baseline power reading before moving the cable, but the connector map proves that native HDMI was NVIDIA-owned. After the change, NVIDIA reports `Disp.A: Off`, P8, and 3 W.

| State | Connector | NVIDIA display | NVIDIA power |
| --- | --- | --- | --- |
| Native HDMI | `card0-HDMI-A-1` | Active | Not captured |
| Anker hub | `card1-DP-1` | Off | 3 W, P8 |

`nvidia-smi` after the hub, desktop only:

```text
Disp.A: Off
P8
3W / 60W
GPU-Util: 0%
Memory-Usage: 39 MiB
```

One process: `kwin_wayland` holding **6 MiB**. That does not mean KWin is compositing the desktop on NVIDIA. `inxi` still reports `dri: iris` and the Intel renderer. The small allocation is consistent with a driver or compositor graphics context; it is not evidence that NVIDIA is compositing the desktop. `Persistence-M: On` keeps the driver initialized; it is not the same as driving a display.

56°C at 3 W in P8 is a lukewarm idle, not a render load. The quiet fans over several hours were the practical confirmation.

---

## The freezes sit on the same stack

The random freezes — Chrome, Cursor, sometimes the whole Plasma session — showed up more often with that HDMI monitor attached. I first treated them as an app bug: Chromium, Electron, Wayland, take your pick.

That is the wrong first diagnosis. The more consistent match is a **Linux hybrid-GPU power-management and driver problem**: Intel Arc, the RTX 3050, the NVIDIA driver and GSP firmware, KWin on Wayland, and the GPU moving in and out of low-power states. Hybrid-GPU reports keep describing the same symptom I had on the HDMI cable: the NVIDIA dGPU stays active when it should be idle. [Omarchy #1776](https://github.com/basecamp/omarchy/issues/1776) is one of those write-ups; the recommended shape of a working setup is the one this laptop was already supposed to have — Intel as the default renderer, NVIDIA only for apps that need it, via `prime-run`.

The HDMI jack prevented NVIDIA from fully leaving the display path while that monitor was active. The port required it to keep scanning out `HDMI-A-1`. Chrome and Cursor then did hardware-accelerated compositing on top of a dGPU that could not leave the display path. That is a handoff this class of stack is known to mishandle. It is not proof that Cursor is broken.

The exact root cause on this machine is **not confirmed**. The live suspects are:

- NVIDIA GSP firmware or driver instability
- the dGPU failing to enter or leave a low-power state
- Intel/NVIDIA handoff while Chrome or Cursor is using hardware acceleration
- a kernel, Wayland compositor, or firmware/ACPI interaction

[ArchWiki's NVIDIA page](https://wiki.archlinux.org/title/NVIDIA) currently documents complete failures on some Ampere laptops with the NVIDIA open kernel modules, and tells you to test the proprietary driver with GPU firmware disabled (`NVreg_EnableGpuFirmware=0`) if GSP is the suspect. The [troubleshooting guide](https://wiki.archlinux.org/title/NVIDIA/Troubleshooting) also blames GSP — enabled by default since driver 555 — for Vulkan failures and crashes.

I did **not** switch MHWD profiles or disable GSP for this post. The HDMI path was a confirmed, local reason NVIDIA could not idle. GSP remains an investigation lever, not a fix I have proven here.

This Vivobook Pro family also has separate firmware/ACPI power-management bugs under Linux. The public write-up for the N6506 is [suspend immediately waking up](https://www.reddit.com/r/Fedora/comments/1tzmkn8/fix_asus_vivobook_pro_15_n6506_intel_core_ultra/), not this desktop freeze. A BIOS update is the proper fix for that one; masking the ACPI event is only a workaround. Same machine family, same "power management is messy" neighborhood — not the same bug.

I could not find a confirmed upstream fix for these Cursor/Chrome freezes on this exact Intel + RTX 3050 + Manjaro + Wayland setup. Treat it as unresolved. Driver, kernel, GPU mode, and hardware-acceleration changes are workarounds, not a permanent solution.

Moving the monitor onto Intel `DP-1` is one of those workarounds, and it is a topology workaround rather than a driver patch. It stops forcing NVIDIA into the display path all day. It does not promise the GSP/handoff bug is gone. If a freeze still happens, the remaining A/B tests are still worth running:

```bash
cursor --disable-gpu
google-chrome-stable --disable-gpu
```

If those stop the stalls, you have evidence for the GPU-compositing path on top of hybrid power management — not evidence that you needed a different editor.

---

## Closing

Command & Conquer was not the bug. PRIME was not misconfigured. The MHWD profile was already the right one.

The HDMI jack on this laptop belongs to NVIDIA. Using it for a second screen means the dGPU stays in the display path, even when Intel is rendering a cheap game. That is the fan story. Chrome and Cursor sit on the same hybrid-GPU, Wayland, compositor, and power-management stack; HDMI may have been a contributor, not a proven cause.

A Thunderbolt USB-C hub with DisplayPort Alt Mode moved that screen onto Intel `DP-1`. NVIDIA dropped to a few watts. The fans went quiet. The freeze is still unresolved upstream — GSP, power states, Wayland handoff, maybe ACPI. I did not "fix Cursor." I stopped forcing the dGPU to own an external display that the Intel GPU could drive directly.

`prime-run` is still there when I actually want the RTX. I just stopped paying NVIDIA tax to show an Intel desktop on a 2009 LG.

If you have the same class of hybrid laptop, do not start in Settings. Start in `/sys/class/drm`. The connector names will tell you which GPU you just plugged into.

---

### Further reading

- [Arch Wiki: PRIME](https://wiki.archlinux.org/title/PRIME) — render offload vs. which GPU owns the outputs
- [Arch Wiki: NVIDIA](https://wiki.archlinux.org/title/NVIDIA) — GSP firmware failures on some Ampere laptops; proprietary driver plus `NVreg_EnableGpuFirmware=0` as a test
- [Arch Wiki: NVIDIA/Troubleshooting](https://wiki.archlinux.org/title/NVIDIA/Troubleshooting) — GSP enabled by default since 555; Vulkan failures and crashes
- [Omarchy #1776](https://github.com/basecamp/omarchy/issues/1776) — hybrid laptop where the NVIDIA dGPU stays active instead of idling; Intel default + `prime-run`
- [Gentoo Wiki: Hybrid graphics](https://wiki.gentoo.org/wiki/Hybrid_graphics) — PRIME as iGPU-display / dGPU-on-demand
- [ASUS Vivobook Pro 15 OLED N6506 tech specs](https://www.asus.com/laptops/for-home/vivobook/asus-vivobook-pro-15-oled-n6506/techspec/) — TB4 / USB-C display capabilities on this family
- [Fedora thread: N6506 suspend immediately wakes](https://www.reddit.com/r/Fedora/comments/1tzmkn8/fix_asus_vivobook_pro_15_n6506_intel_core_ultra/) — related ACPI/power-management neighborhood, different symptom
- [ASUS: DisplayPort Alt Mode vs DisplayLink](https://www.asus.com/support/faq/1048768/)
- Earlier lab notes in this series: [Ubuntu, Manjaro, and the Linux Desktop](/2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/) (hybrid GPU as the remaining distro gate) and [Building a Tiny Linux App to Explain Desktop Stutter](/2026/06/04/building-a-tiny-linux-app-to-explain-desktop-stutter/)
