---
title: "Ubuntu, Manjaro, and the Linux Desktop I Thought I'd Left Behind"
date: 2026-06-03T01:10:00+03:30
description: "After years on Manjaro KDE, I'm testing Kubuntu 26.04 again. A long-time Linux user's honest look at what changed on Ubuntu, what Manjaro still does well, and why hybrid NVIDIA laptops make the decision harder than a distro chart."
layout: single
author_profile: true
url: 2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/
shortlink: https://g.omid.dev/MlHE7cZ
x_link: https://x.com/OmidFarhangEn/status/2061938024435560747
mastodon_link: https://mastodon.social/@omidfarhang/116682880286083467
bluesky_link: https://bsky.app/profile/omid.dev/post/3mndnidxlsc27
linkedin_link: https://www.linkedin.com/posts/omidfarhang_stop-modeling-angular-screens-with-five-booleans-share-7467351377959112705-PGT_/
tags:
  - Linux
  - Ubuntu
  - Kubuntu
  - Manjaro
  - KDE Plasma
  - NVIDIA
  - Desktop Linux
  - AUR
  - Package Management
categories:
  - TechBlog
---

I have not switched back to Kubuntu yet.

I am still daily-driving **Manjaro KDE** on my ASUS Vivobook Pro 15, with Plasma 6.6.5, Wayland, btrfs, and a hybrid **Intel Arc + NVIDIA RTX 3050** setup. But I have been running **Kubuntu 26.04 LTS** in VirtualBox, comparing the two side by side, and asking a question I did not expect to ask again after several happy years on Arch-based rolling release:

**Did the distro I left quietly get good enough that the trade-offs flipped?**

This post is my attempt to answer that honestly — with facts checked against current release notes, not nostalgia, and not a "winner" declaration.

---

## A short history of my desktop Linux choices

I have been using Linux on the desktop for a long time. I started in the **early Ubuntu era** (back when "Ubuntu" still meant a fresh GNOME 2 desktop and a community that felt like it was building something new), stayed through the **Unity** years, moved to **Kubuntu** when Ubuntu's default desktop direction stopped matching what I wanted, and eventually landed on **Manjaro KDE**.

The reasons for leaving Ubuntu-family distros back then were real:

- **KDE on Kubuntu often lagged** behind what KDE was shipping upstream.
- **Kernels felt old** on LTS unless you chased HWE stacks, PPAs, or third-party mainline tooling.
- **PPAs accumulated** for one app, one driver tweak, one toolchain — and became their own maintenance project.
- **Snap was young and rough**; many of us wanted `.deb` or native packages first.
- On laptops, **hybrid graphics** (Intel + NVIDIA) was frequently more painful on Ubuntu than we wanted to admit.

Manjaro solved a bundle of problems at once:

- One primary package manager (`pacman`) plus **AUR** access for everything else.
- **Newer kernels and Mesa** without hand-rolling.
- **Newer Plasma** on a schedule that felt closer to upstream KDE.
- **`mhwd`** for GPU driver profiles without reading three wiki pages on day one.

For years, that was a strong deal.

---

## What actually changed in 2026

The surprise is not "Ubuntu is perfect now." The surprise is **how much of the old gap closed** on a current LTS.

According to the [Kubuntu 26.04 LTS release notes](https://kubuntu.org/news/kubuntu-26-04-release-notes/), Resolute Raccoon ships:

| Component | Kubuntu 26.04 LTS |
| --- | --- |
| Desktop | KDE Plasma **6.6** |
| Qt / Frameworks | **6.10.2** / **6.24.0** |
| Kernel | Linux **7.0** |
| Default session | **Plasma Wayland** (supported default) |
| Support | Security updates through **April 2029** |

My Manjaro install today is in the same generation: Plasma **6.6.5**, kernel **7.0.10**, Wayland, Qt 6-based Breeze theming. In a VM, Kubuntu 26.04 reported Plasma **6.6.4**, Qt **6.10.2**, Frameworks **6.24.0**, and kernel **7.0.0-22-generic**.

That is not "Ubuntu is five years behind KDE anymore." That is **the same major era of the Linux desktop**, with different packaging philosophy underneath.

A few corrections worth stating up front, because overselling helps nobody:

1. **Ubuntu Desktop (GNOME) and Kubuntu are not the same product.** Ubuntu 26.04's GNOME session is Wayland-only in ways that do not apply identically to Kubuntu. Kubuntu still documents an optional X11 session package (`plasma-session-x11`) in the archive, but the team does **not** install or support it by default.
2. **Kernel freshness on Ubuntu LTS is not magic.** You get Linux 7.0 in 26.04 as part of the release. If you need kernels *ahead* of what Canonical ships on your LTS, you still use **HWE** paths, vendor stacks, or third-party mainline tooling — I have used [Mainline on Ubuntu before](/2022/12/30/how-to-upgrade-ubuntu-kernel/) myself. Manjaro's rolling model is still simpler if "always newest kernel" is the goal.
3. **Snap is part of the Ubuntu world whether you love it or not.** On Kubuntu 26.04, Firefox is delivered as a Snap. That is improved compared to the early Snap era, but it is still a political and technical choice you should accept consciously.

---

## The question that started this post: if AUR just unpacks `.deb` files, why am I on Arch?

This is the observation that broke my lazy mental model.

On Manjaro I run roughly **1986 pacman packages**, plus a small number of Snaps, plus AUR when needed. In practice, many of the apps I care about are not "native Arch builds." They are:

- upstream **`.deb`** repackaged in the AUR,
- **AppImages** or GitHub release tarballs,
- or wrapper scripts that download vendor binaries.

Examples from my own experience:

- **Google Chrome** — official vendor packaging is `.deb`; AUR often wraps that.
- **Cursor** — the AUR package I tried wrapped the `.deb` package. The extracted `.deb` did not behave as expected on my system, so I moved to the **official AppImage** instead and wrote about that setup ([How to Install Cursor IDE on Manjaro Linux](/2026/05/29/how-to-install-cursor-ide-in-manjaro/)). That experience was a good reminder that "available in AUR" does not always mean "better integrated."
- **Dropbox, Mattermost, VirtualBox, FileZilla** — Ubuntu/Debian ecosystems are first-class targets for vendors.

So the honest sentence is not "AUR is useless." It is:

**For mainstream commercial desktop software, Arch-based distros often act as a compatibility layer on top of vendor binaries built for Debian/Ubuntu.**

That does not make Manjaro wrong. It means the *reason* I reach for AUR is narrower than I used to tell myself. I still value AUR for niche tools, patched packages, and community-maintained software that never ships a vendor installer. I just should not pretend it replaces Debian packaging for everything I run daily.

On Kubuntu, the mainstream path is usually:

```bash
sudo apt install <package>
```

or a vendor `.deb`, or `snap install`, or Flatpak — sometimes two or three options for the same app, which is its own kind of clutter, but at least the vendor tested against **that** ecosystem.

---

## My real app stack (and what I would verify before switching)

These are the apps I actually care about on a work machine:

| App | Manjaro today | What I'd check on Kubuntu |
| --- | --- | --- |
| Chrome | Official / AUR-wrapped deb path | Official Google `.deb` or repo |
| VS Code / Cursor | Cursor via AppImage; VS Code available | Official packages / AppImage / `.deb` |
| Node (nvm) | User-space, distro-agnostic | Same — not a distro differentiator |
| Lutris / gaming | Strong on both; Wine/Proton ecosystem | Test games I actually play |
| VirtualBox | Works; kernel module rebuilds on updates | Oracle packages target Ubuntu closely |
| Dropbox | Often AUR or vendor script | Official `.deb` |
| Mattermost | Desktop client packaging | Official `.deb` |
| FileZilla | Repo or Flatpak | `apt` |
| v2ray / proxy tooling | Depends on client; verify Linux port | Confirm client, systemd units, split tunneling |

Nothing in that table is a guaranteed win for either side without **your** hardware and **your** workflow. It is a checklist, not a verdict.

---

## Package management: the trade-off in plain language

### Manjaro (rolling, pacman + AUR)

The good parts:

- One primary system package manager with clear dependency semantics.
- Fresh kernels, Mesa, Plasma, and toolchain updates without waiting for an LTS cadence.
- AUR remains excellent for niche software and custom builds.
- `mhwd` is genuinely helpful for GPU profile selection on install.
- The Manjaro community does something I genuinely appreciate: update announcements in the forum are usually clear, visible, and practical. Before a big stable update, you can read what changed, what broke for some users, and what workaround exists. I have not felt the same sense of one obvious community place around Ubuntu desktop updates.

The rough parts:

- Rolling release means occasional breakage — sometimes in core packages, sometimes in AUR packages after a big update.
- AUR quality varies by maintainer; `-git` packages and delayed rebuilds happen.
- Vendor apps may still be repackaged deb/AppImage workflows with extra fragility.

### Kubuntu (LTS base, apt + snaps + flatpaks)

The good parts:

- Predictable security maintenance for years on an LTS.
- Vendors test against Ubuntu first for many commercial desktop apps.
- Less day-to-day "distro maintenance" if you stay close to the archives.
- Aligns mentally with **Ubuntu Server** environments many of us use at work (`apt`, systemd units, paths, docs).

The rough parts:

- Newer software between LTS releases comes from backports, Snaps, Flatpaks, PPAs, or third-party repos — the fragmentation did not disappear; it moved shape.
- Snap policies and Firefox-as-Snap still annoy people for good reasons.
- You can end up with **three** packaging stories on one machine if you are not disciplined.

---

## KDE experience: finally, not the main argument

For a long time, "I use KDE" was almost synonymous with "I should not use Ubuntu."

That is no longer the headline.

On my hardware, Manjaro and Kubuntu 26.04 feel like **the same Plasma generation**: Wayland-first, Qt 6, similar apps, similar settings modules, similar annoyances (themes after upgrades, fractional scaling edge cases, per-app Wayland quirks).

If you are choosing between them **only** because you want Plasma 6.6 and a modern Wayland session, you are probably choosing for the wrong reason in 2026.

Choose for **update philosophy**, **vendor packaging**, **GPU behavior on your laptop**, and **how much time you want to spend being your own distro engineer**.

---

## Hybrid graphics: Intel Arc + NVIDIA on a laptop (the part that matters)

This is the section most "distro comparison" posts hand-wave. It matters on my machine.

### What I run today (Manjaro)

- **Intel Arc** integrated GPU + **NVIDIA RTX 3050** discrete GPU.
- Manjaro's `mhwd` profiles for Intel/NVIDIA hybrid setups (for example `video-hybrid-intel-nvidia-prime`) install the proprietary NVIDIA stack and configure PRIME-style offload.
- For per-app discrete GPU use on Arch-based systems, `prime-run` (from `nvidia-prime`) is the common pattern, alongside environment variables documented on the [Arch Wiki PRIME page](https://wiki.archlinux.org/title/PRIME).

Manjaro has been **good enough** here for me, not flawless. Hybrid laptops are inherently messy: external displays wired to the dGPU, suspend/resume, Wayland vs X11 behavior, and driver/kernel pairing all still produce forum threads.

### What Ubuntu/Kubuntu offers

Ubuntu's supported path is **`nvidia-driver-*` via `ubuntu-drivers`**, plus **`nvidia-prime`** and the `prime-select` tool:

```bash
prime-select query
sudo prime-select intel
sudo prime-select nvidia
sudo prime-select on-demand
```

- **`intel`** — power-saving, iGPU drives the session (logout/reboot typically required to switch profiles).
- **`nvidia`** — discrete GPU drives the session (higher power draw).
- **`on-demand`** — both GPUs available; most apps stay on Intel, and you offload heavy apps to NVIDIA with PRIME Render Offload environment variables (for example `__NV_PRIME_RENDER_OFFLOAD=1` and `__GLX_VENDOR_LIBRARY_NAME=nvidia`), or desktop-specific "run on discrete GPU" integrations where provided.

Wayland + proprietary NVIDIA has improved a lot, but it is still **hardware- and driver-version-dependent**. On Ubuntu-family systems you may need `nvidia-drm.modeset=1` and a recent enough driver for a smooth Plasma Wayland experience. This is an area where **VM testing is misleading**: my VirtualBox guest uses software rendering (`llvmpipe`), so it tells me nothing about real PRIME behavior on the laptop.

### Is Ubuntu better than Manjaro for hybrid graphics?

The fair answer: **neither wins by reputation alone.**

- **Ubuntu** benefits from vendor QA on popular laptop chipsets and enormous documentation surface area.
- **Manjaro** benefits from newer driver/kernel combos landing sooner — which can fix hardware faster or break it faster, depending on the week.

I would not switch distros based on a blog post claiming a knockout victory. I would switch only after **bare-metal** tests on my exact machine: external monitor on HDMI/DisplayPort, suspend, on-demand gaming via Lutris, CUDA/ML if needed, and Plasma Wayland session stability.

---

## Rolling release vs LTS: the trade-off I am actually weighing

Manjaro is not "unstable Arch" in meme form, but it **is** rolling. Updates can require attention: NVIDIA module rebuilds, AUR package rebuilds, occasional Plasma/KWin regressions.

Kubuntu 26.04 LTS is the opposite bet: accept a slower-moving base in exchange for **years of security maintenance** with less surprise. For a machine that is primarily a **work tool** — Angular/TypeScript/Nx, browsers, IDEs, calls, family life around it — that stability premium matters more to me now than it did ten years ago.

That is a life-stage preference, not a universal truth. If you enjoy living on the rolling edge and debugging is part of the hobby, Manjaro still shines.

---

## "But I use Ubuntu Server at work"

This is a smaller factor than GPU behavior, but it is real.

Most production Linux I touch is **Debian/Ubuntu-shaped**: `apt`, `systemd`, paths under `/etc`, packaging docs that assume Ubuntu LTS. Manjaro's `pacman` world is not hard to context-switch from, but the friction is constant and low-grade:

- different package names,
- different service layout conventions in third-party docs,
- different "just apt install it" copy-paste moments in tutorials.

Matching desktop and server is not required for competence. It is a **quality-of-life** bonus that accumulates over years.

---

## What I am not claiming

To keep this post useful instead of preachy:

- **Manjaro did not "go bad."** It still delivers what I wanted when I switched.
- **Kubuntu is not automatically better** because it is LTS and popular.
- **AUR is not dead** — it is just not the universal advantage I once mentally assigned it for vendor apps.
- **Snap is not "fixed" for everyone** — it is more mature, and still a value judgment.
- **I have not migrated yet.** VM success is necessary but not sufficient.

---

## What I am doing next

This is my practical plan, and maybe yours if you are in the same boat:

1. **Keep Kubuntu 26.04 in a VM** for workflow tests (Cursor, Node projects, browsers, Mattermost, basic dev containers).
2. **Do not rush the migration.** I would rather keep testing in a VM for a while than turn my main work machine into a weekend experiment.
3. **Switch when I have enough quiet time** to reinstall and configure all my systems properly, not just one laptop in a hurry.
4. **Run the checklist that VM cannot answer after the switch**: hybrid GPU, battery life, fan curves, external monitor behavior, suspend, Lutris, VPN/proxy tooling, Dropbox sync, and Wayland + NVIDIA on real sessions.

If those pass after the move, switching was rational. If they do not, I will at least know exactly which trade-off was not worth it.

---

## Closing thought

The Linux desktop **did** change while I was on Manjaro. Ubuntu and Kubuntu in 2026 are not the slow KDE + old kernel experience that pushed me toward rolling release years ago.

But the question was never "Which distro wins in 2026?"

The question is: **what problems do I still need a rolling Arch-based distro to solve for me — and what problems would an LTS Ubuntu base solve better today?**

Right now, my answer is: **maybe fewer of the first than before, and more of the second than I expected** — especially around vendor packaging and maintenance cost. The laptop GPU test is still the gate.

I will post a follow-up if I do the bare-metal trial. If you have switched either direction recently on Intel + NVIDIA hybrid hardware, I would genuinely like to hear what broke and what did not.

---

### References and further reading

- [Kubuntu 26.04 LTS release notes](https://kubuntu.org/news/kubuntu-26-04-release-notes/)
- [Arch Wiki: PRIME](https://wiki.archlinux.org/title/PRIME)
- [My earlier post: How to Upgrade Ubuntu Kernel (Mainline)](/2022/12/30/how-to-upgrade-ubuntu-kernel/)
- [My earlier post: How to Install Cursor IDE on Manjaro Linux](/2026/05/29/how-to-install-cursor-ide-in-manjaro/)
