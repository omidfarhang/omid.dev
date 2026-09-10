---
title: "How Ubuntu Ships Kernels: GA, HWE, Mainline, and DKMS"
date: 2022-12-30T23:55:43+03:30
lastmod: 2026-09-10T20:50:00+03:30
description: "Ubuntu does not have one kernel you upgrade. GA stays put for the LTS life, HWE rolls every six months, OEM covers vendor laptops, and mainline is unsigned and unsupported. DKMS is why jumping tracks can break NVIDIA."
layout: single
author_profile: true
url: 2022/12/30/how-to-upgrade-ubuntu-kernel/
shortlink: https://g.omid.dev/KaQylFt
keywords:
  - Ubuntu HWE vs GA kernel
  - linux-generic-hwe
  - Ubuntu mainline kernel
  - DKMS NVIDIA Ubuntu
  - Ubuntu OEM kernel
tags:
  - Linux
  - Ubuntu
  - Kernel
  - Desktop Linux
categories:
  - TechBlog
seeAlso:
  - /2022/12/30/how-to-upgrade-ubuntu/
  - /2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/
  - /2026/08/23/hdmi-port-keeping-nvidia-awake/
  - /2026/06/16/how-i-learned-my-linux-machine-has-been-compressing-memory-for-years/
---
In 2022 I published this as a Mainline one-liner: add a PPA, `mainline --install-latest`, reboot. The commands still work. They were never the interesting part.

Ubuntu does not have one kernel you "upgrade." It has a **shipping model**. GA stays on the version that shipped on day one. HWE rolls forward from interim releases. OEM is a vendor-laptop cadence that is supposed to fold back. Mainline is a set of unofficial builds from [kernel.ubuntu.com](https://kernel.ubuntu.com/mainline/) that Canonical does not support. DKMS is the reason jumping tracks is not free on a laptop.

This post is that model, then the commands. If you only wanted the installer, skip to [Mainline](#mainline-the-last-rung). If a laptop "needs a newer kernel," start here instead.

{{< alert type="info" title="Start with HWE, not Mainline" >}}
Ubuntu Desktop already tracks HWE. The supported next step on an LTS is HWE or OEM. Mainline is the last rung, and it breaks Secure Boot and many DKMS modules.
{{< /alert >}}

## The Mental Model

Four tracks, plus one thing that is not a track:

| Track | Metapackage | What it is | Who should use it |
| --- | --- | --- | --- |
| **GA** | `linux-generic` | The kernel version frozen on LTS day one. Security backports for the full LTS life. No new drivers. | Servers, ABI-sensitive workloads, hardware that already works. |
| **HWE** | `linux-generic-hwe-YY.MM` | A newer upstream version, rolled about every six months until it matches the *next* LTS GA kernel. Canonical-supported. | Desktops and laptops on LTS. This is the default on Ubuntu Desktop since 20.04. |
| **OEM** | `linux-oem-*` | Early drivers for specific vendor machines. Meant to land in GA/HWE later, then the machine moves over. | Preinstalls and laptops `ubuntu-drivers list-oem` names. |
| **Mainline** | none (third-party debs) | Upstream builds, unsigned, no Ubuntu patches, no security maintenance. | Testing, or hardware that HWE/OEM still does not know. |

Interim releases (25.10, and so on) are a different product: they already ship a current kernel and live about nine months. HWE exists *because* you stayed on LTS and still needed that newer kernel without leaving LTS.

```text
Same Ubuntu 24.04 userspace
        |
        +-- GA  6.8  ------------------------------> April 2029
        |
        +-- HWE 6.8 → 6.11 → 6.14 → 6.17 → 7.0
        |         .2     .3     .4     .5
        |
        +-- OEM  (vendor kernel, then fold into HWE/GA)
        |
        \-- Mainline  whatever Linus tagged last week
                      (not on this diagram's support clock)
```

The numbers above are the 24.04 story as Canonical published it. **Look up the live table** on [Ubuntu kernel lifecycle](https://ubuntu.com/kernel/lifecycle) before you quote a point-release kernel; HWE versions move. As of September 2026, 26.04 LTS GA is Linux 7.0. On a fresh 26.04 desktop, HWE and GA are still the same kernel until the first HWE roll.

GA and HWE are **different kernel versions**, packaged side by side. You cannot mash them into one tree. `uname -r` will say `-generic` for both. The version number and the metapackage tell you which track you are on, not the flavour suffix.

## Desktop vs Server

This is the default people miss.

- **Ubuntu Desktop** (20.04 and later, including Kubuntu) **tracks HWE**. A 24.04 laptop installed from current media is already on the enablement stack. `linux-generic-hwe-24.04` is not an exotic opt-in; it is what the installer put there.
- **Ubuntu Server** stays on **GA** unless you install the HWE metapackage. That is the conservative choice for ABI-sensitive services.

So "my LTS kernel looks old" on a desktop often means "I am on HWE, and the next roll has not shipped yet," not "I forgot to upgrade." On a server it may mean you are still on GA on purpose.

OEM is a third default on some vendor images. Check before you "fix" it:

```bash
ubuntu-drivers list-oem
```

If that prints packages, the machine is on the OEM cadence, not plain HWE. Install what it names rather than guessing `linux-generic-hwe-*`.

## Why a Laptop Needs a Newer Kernel

The kernel is the first driver tree the hardware meets. Userspace can be current and the machine still blind if the kernel does not know the chip.

Typical reasons a laptop wants a kernel newer than GA:

- **Wi-Fi / Bluetooth** — Intel BE200-class, MediaTek, and new USB Bluetooth dongles land in mainline first. GA will not grow those drivers. HWE might, six months later.
- **GPU** — Intel Arc, new NVIDIA laptop IDs, display-link and USB4 / Thunderbolt quirks. On a hybrid Intel + NVIDIA machine, *who owns the HDMI port* is a wiring fact ([I wrote that up separately](/2026/08/23/hdmi-port-keeping-nvidia-awake/)); *whether the driver even binds* is a kernel-and-module fact.
- **Audio** — SOF firmware, new codecs, missing internal mic or speakers until a later kernel.
- **Power / suspend** — s2idle vs deep, AMD/Intel idle bugs, the difference between "lid close works" and "lid close hangs."
- **The calendar** — you bought the laptop 18 months after LTS day one. GA is frozen at day one. HWE exists for that gap.

That is why [kernels felt old on Ubuntu LTS](/2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/) unless you chased HWE, OEM, or mainline. Manjaro's rolling kernel is a different shipping model, not a moral victory. Ubuntu's model is: **stay on one userspace, swap the kernel track**.

HWE is usually enough. The laptop case for mainline is: HWE's current roll still does not know this SKU, OEM did not publish a kernel for it, and you would rather run an unsupported kernel than wait.

## DKMS: The Cost of Changing Tracks

In-tree drivers travel *with* the kernel. Out-of-tree modules do not. NVIDIA's proprietary driver, VirtualBox, some Wi-Fi, v4l2loopback, ZFS — those are built against the **running kernel's ABI** when the kernel is installed. **DKMS** (Dynamic Kernel Module Support) is that rebuild hook.

```text
apt installs linux-image-X
        |
        +--> linux-headers-X must exist
        |
        +--> DKMS rebuilds each registered module for X
        |
        +--> on Secure Boot, the new .ko must be signed
             (Ubuntu's nvidia packages hook this for Ubuntu kernels)
```

When it works, you reboot and `nvidia-smi` still answers. When it fails, you get a black screen, `NVIDIA-SMI has failed`, or a module that refuses to load, and GRUB still lists the new kernel first.

**Ubuntu kernels (GA, HWE, OEM)** ship matching `linux-headers-*` metapackages. DKMS is wired. NVIDIA from Ubuntu's `ubuntu-drivers` / `linux-modules-nvidia-*` path is built for those ABIs. Secure Boot stays possible because Canonical signs the kernel.

**Mainline kernels** are a different ABI (`6.17.0-061700-generic` vs Ubuntu's `6.17.0-xx-generic`). Headers come from the same unofficial debs. DKMS may fail because:

- the compiler the mainline kernel was built with is not in your release (`gcc-15: not found` on an older LTS is a real failure mode)
- the NVIDIA Ubuntu package is not built for that ABI
- the kernel image is **unsigned**, so Secure Boot refuses to boot it (`bad shim signature`) even if DKMS succeeded

Check the damage before you reboot into a new kernel as the default:

```bash
uname -r
dkms status
dpkg -l "linux-headers-$(uname -r)" | grep ^ii
mokutil --sb-state
```

`dkms status` should show `installed` for each module on the kernel you are about to boot. Empty output means you have no DKMS modules — mainline is cheaper for you. `installed` on the old kernel and missing on the new one means you do not boot that kernel until the rebuild is fixed.

## Which Track Are You On?

```bash
uname -r
lsb_release -ds
dpkg -l 'linux-generic*' 'linux-image-generic*' 'linux-oem*' 2>/dev/null | grep ^ii
hwe-support-status --verbose
```

Read it like this:

- Version `6.8.0-*-generic` on 24.04, with `linux-generic` and **no** `linux-generic-hwe-24.04` → GA.
- A **newer** `6.x` or `7.x` on 24.04, with `linux-generic-hwe-24.04` installed → HWE. Desktop installs look like this.
- `linux-oem-*` installed, or `ubuntu-drivers list-oem` is non-empty → OEM.
- Version like `7.1.0-070100-generic` (three-digit extra in the middle) → someone installed **mainline**. That is not an Ubuntu metapackage.

`hwe-support-status` comes from `update-manager-core`. It tells you whether the HWE stack you are on is still in its support window. Each rolling HWE kernel is supported until the next one replaces it; the *final* HWE kernel (the next LTS GA, backported) rides until this LTS ends. That is why "HWE is shorter-lived" is true per roll and false for the last roll.

## The Supported Path: Install HWE

On an LTS **server** (or a desktop that was pinned to GA):

```bash
sudo apt update
sudo apt install --install-recommends linux-generic-hwe-$(lsb_release -sr)
```

Reboot. GRUB should pick the new kernel. GA stays installed as a fallback under **Advanced options**.

To go back to GA: boot the GA kernel from GRUB, then remove the HWE metapackage (`linux-generic-hwe-24.04` or `linux-generic-hwe-26.04`) and `sudo apt autoremove`. Do not delete images by hand while they are still the running kernel.

On **Desktop**, this command is often a no-op — you are already tracking HWE. If `uname -r` is still the GA version months after a point release that shipped a newer HWE, then install the metapackage and check you did not pin `linux-generic` in `/etc/apt/preferences.d/`.

Live versions and EOL dates: [Ubuntu kernel lifecycle](https://ubuntu.com/kernel/lifecycle). Variant names: [Ubuntu kernel variants](https://ubuntu.com/kernel/variants).

## Mainline: The Last Rung

This is the 2022 recipe, in its proper place.

The builds live at [kernel.ubuntu.com/mainline](https://kernel.ubuntu.com/mainline/). They are not Ubuntu kernels. They do not get Canonical security updates. They are unsigned. [The Mainline installer](https://github.com/bkw777/mainline) (PPA `ppa:cappelikan/ppa`) is a third-party UI over those debs — the same family of tool as the old `ukuu`.

Use it when HWE and OEM still do not know the hardware, you accept DKMS and Secure Boot cost, and you can still boot an Ubuntu kernel from GRUB if it goes wrong.

**Install the installer:**

```bash
sudo add-apt-repository ppa:cappelikan/ppa
sudo apt update
sudo apt install mainline
```

**Install a kernel:**

```bash
sudo mainline --list
sudo mainline --install-latest
# or: sudo mainline --install <name>
```

Reboot. Confirm `uname -r` and `dkms status`. When a newer mainline kernel is running and you do not need the older mainline packages:

```bash
sudo mainline --uninstall-old
```

`--include-unstable` adds RC builds. Do not do that on a machine you need tomorrow.

{{< alert type="warning" title="Secure Boot and NVIDIA" >}}
Mainline images are unsigned. With Secure Boot on, GRUB will refuse them (`bad shim signature`) and you may fall back to the last Ubuntu kernel without noticing. `mokutil --sb-state` before you install. Signing mainline yourself is possible; it is a project, not a flag. NVIDIA and VirtualBox DKMS often fail on these ABIs even after headers install. Keep a signed Ubuntu kernel in GRUB.
{{< /alert >}}

The [Ubuntu mainline PPA has gone missing before](/notes/178199247194399389/). The installer cannot invent builds that kernel.ubuntu.com is not publishing.

## Common Mistakes

- **Jumping to mainline because `uname` looks old.** On Desktop you are probably already on HWE. Compare with the lifecycle table for *this* LTS, not with Fedora or Manjaro.
- **Treating HWE as unsupported.** It is Canonical-supported. Each roll has a shorter window; the last roll lasts until LTS EOL.
- **Installing HWE on OEM.** If `ubuntu-drivers list-oem` lists packages, that is the track. Mixing OEM and HWE is how you get two "almost right" kernels and a surprise GRUB default.
- **Mainline with Secure Boot still on.** The kernel never boots. You debug the wrong layer.
- **Mainline without headers / DKMS.** NVIDIA goes black. Check `dkms status` on the *new* kernel version before you make it the default.
- **Removing the GA/HWE metapackage while it is the only bootable signed kernel.** Always keep one Ubuntu kernel you can select in GRUB.
- **Using mainline on a server.** There is no laptop-SKU excuse. Stay on GA or HWE.

## What This Post Does Not Cover

Building your own kernel. Ubuntu Pro / ESM calendars beyond "GA is the long clock." Cloud variants (`linux-aws`, `linux-azure`, `linux-gcp`) — same idea (a kernel variant), different SKU. Compiling NVIDIA from the `.run` installer. Changing *series* (24.04 → 26.04) is a [release upgrade](/2022/12/30/how-to-upgrade-ubuntu/), not a kernel track. Those are adjacent shelves.

## Further Reading

- [Ubuntu kernel lifecycle and enablement stack](https://ubuntu.com/kernel/lifecycle)
- [Ubuntu kernel variants](https://ubuntu.com/kernel/variants)
- [HWE kernels](https://ubuntu.com/kernel/docs/reference/hwe-kernels/)
- [kernel.ubuntu.com mainline](https://kernel.ubuntu.com/mainline/)
- [Mainline installer](https://github.com/bkw777/mainline)

The distro comparison that pointed here: [Ubuntu, Manjaro, and the Linux Desktop](/2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/). The hybrid-GPU wiring problem that a newer kernel will not fix by itself: [The HDMI Port Was Keeping NVIDIA Awake](/2026/08/23/hdmi-port-keeping-nvidia-awake/). Changing Ubuntu *series* is a different operation: [How Ubuntu Ships Releases](/2022/12/30/how-to-upgrade-ubuntu/).
