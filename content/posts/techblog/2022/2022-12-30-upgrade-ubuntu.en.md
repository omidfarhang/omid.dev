---
title: "How Ubuntu Ships Releases: LTS, Interim, and do-release-upgrade"
date: 2022-12-30T23:55:43+03:30
lastmod: 2026-09-10T21:00:00+03:30
description: "Ubuntu does not upgrade when you sed a codename. LTS and interim are different products, point releases are still the same LTS, and do-release-upgrade is the safe default. Rewriting sources is how I still change series — not if a stuck apt would leave you stranded."
layout: single
author_profile: true
url: 2022/12/30/how-to-upgrade-ubuntu/
shortlink: https://g.omid.dev/r0QrWud
keywords:
  - Ubuntu do-release-upgrade
  - LTS vs interim Ubuntu
  - Prompt=lts release-upgrades
  - ubuntu.sources DEB822
  - sed sources.list Ubuntu upgrade
tags:
  - Linux
  - Ubuntu
  - Package Management
categories:
  - TechBlog
seeAlso:
  - /2022/12/30/how-to-upgrade-ubuntu-kernel/
  - /2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/
---
In 2022 I published this as a `sed` on `/etc/apt/sources.list`: replace `jammy` with `kinetic`, then `apt full-upgrade`. I have [used that pattern on servers](/notes/178199161645258618/). It can work. It is not how Ubuntu ships releases, and the example was the wrong jump — Kinetic was 22.10, an interim, nine months of support, off the LTS track.

Ubuntu does not have one "upgrade" command. It has **three different operations** that people collapse into that word: package updates *inside* a release, point releases of the same LTS, and a **release upgrade** to a new codename. `do-release-upgrade` is the supported path for the third. [Rewriting sources](#rewriting-sources) by hand is still how I change series. It is a bad default if `apt` dying halfway through would leave you without a next step.

This post is that model, then the commands. If you only wanted the `sed`, skip to [Rewriting sources](#rewriting-sources). If you are about to change 24.04 into 26.04, start here instead.

{{< alert type="info" title="do-release-upgrade unless you can finish a stuck apt" >}}
I still rewrite archive codenames myself. If you do not already know Linux and Ubuntu well enough to recover a half-finished unpack — not just `full-upgrade` and a reboot — use `do-release-upgrade`. The upgrader exists for that failure mode.
{{< /alert >}}

## The Mental Model

Three operations, one word:

| What people say | What it actually is | Command | New Ubuntu? |
| --- | --- | --- | --- |
| "I upgraded Ubuntu" | Package updates on the **same** release | `apt update` && `apt full-upgrade` | No. Still 24.04. |
| "I am on 24.04.3 now" | A **point release** of that LTS | Already happened via apt (and new install media) | No. Still 24.04. The `.3` is media and HWE, not a distro. |
| "I upgraded to 26.04" | A **release upgrade** to a new codename | `do-release-upgrade` | Yes. New userspace, new default kernel track. |

Two products, not a slider:

| Product | Cadence | Support | Upgrade path |
| --- | --- | --- | --- |
| **LTS** (24.04, 26.04) | Every two years | Five years (longer with Ubuntu Pro / ESM) | Next LTS, after that LTS's **first point release** (`.1`). Sequential. You cannot skip (22.04 → 26.04 in one hop is not supported). |
| **Interim** (25.10, 26.10) | Every six months | About nine months | Next interim, or into the next LTS when that LTS ships. Leaving LTS for an interim is leaving the long clock. |

```text
LTS track (Prompt=lts)

22.04 -------> 24.04 -------> 26.04
         .1            .1
      (gate)        (gate)

Interim track (Prompt=normal)

24.10 -> 25.04 -> 25.10 -> 26.04 -> 26.10 -> ...
```

The `.1` gate is deliberate. Canonical does not open LTS-to-LTS on day one of the new LTS. Early movers find the blockers; `.1` is when `do-release-upgrade` on `Prompt=lts` is supposed to see the target. Until then, `No new release found` is often **correct**, not a broken machine.

Point releases are not a third product. Installing from a 26.04.1 ISO still lands you on **26.04**. Your 24.04 machine that has been taking updates is not "behind" a 24.04.2 ISO except for HWE kernel rolls — that is [the kernel shipping model](/2022/12/30/how-to-upgrade-ubuntu-kernel/), not a release upgrade.

## Which Release Are You On?

```bash
lsb_release -ds
cat /etc/os-release
cat /etc/update-manager/release-upgrades
do-release-upgrade -c
```

Read it like this:

- `Ubuntu 24.04.x LTS` and `Prompt=lts` → you are offered the **next LTS** when that LTS's `.1` is open. You are not offered 25.10.
- `Prompt=normal` on an LTS → you asked to leave LTS for the next interim. That is the 2022 `jammy` → `kinetic` jump, made official.
- `Prompt=never` → some cloud images set this. `do-release-upgrade` will stay quiet until you change it.
- `do-release-upgrade -c` prints `No new release found` → either you are current, the `.1` gate is still shut, or `Prompt` / a proxy is hiding `changelogs.ubuntu.com`. Check [meta-release-lts](https://changelogs.ubuntu.com/meta-release-lts) (`Supported: 1` on the target) before you force anything.

`Prompt=lts` on an **interim** install is treated as `normal`. The setting only means "LTS-only" when you are already on LTS.

## The Supported Path: do-release-upgrade

Prepare on the **current** release. The upgrader refuses to start if packages are pending or a reboot is required after a kernel/libc update (DKMS rebuilds are why):

```bash
sudo apt update
sudo apt full-upgrade
# reboot if /var/run/reboot-required exists
sudo do-release-upgrade
```

On a desktop, Software Updater is the same tool with a GUI. On a server or over SSH, the CLI is the one that is meant for a remote session.

The upgrader will:

1. Read `Prompt` and the matching meta-release file.
2. Show release notes and the package add/remove set.
3. **Disable third-party sources and PPAs** (comment them out, or disable the Deb822 stanza). Ubuntu archive only, for the duration.
4. Run release-specific quirk scripts (the part `sed` does not have).
5. Unpack the new release, then offer to remove obsolete packages from the old one.
6. Ask for a reboot.

After reboot, `lsb_release -ds` should name the new series. PPAs are still off. Re-enable them only when that PPA actually publishes the new codename — otherwise you get the 404 the 2022 post mentioned, which was the symptom, not the model.

{{< alert type="warning" title="Do not force the gate unless you mean it" >}}
`do-release-upgrade --devel-release` (or `-d`) is for testing the *next* development release, or for jumping before `.1` when you accept that you are a tester. It is not "make `No new release found` go away." Snapshots and console access first.
{{< /alert >}}

Wait for `.1` on production. That is the whole point of `Prompt=lts`.

## Why a Laptop (or a Fleet) Might Need a New *Release*

A newer **kernel** is a track inside the LTS you already have. A newer **release** is a new userspace: Mesa, PipeWire, Plasma/GNOME, glibc, the default Snap policy, the NVIDIA userspace stack.

Typical reasons to change series, not just HWE:

- The desktop you want (Plasma 6.6 on Kubuntu 26.04, for example) is not coming to 24.04 as a supported stack.
- A userspace library or GPU stack you need is tied to the new series.
- The LTS you are on is approaching EOL and you want the next five-year clock, not Ubuntu Pro as a surprise.
- You are on an **interim** that is about to go EOL. Nine months is the design. The supported move is the next interim or the next LTS, not `sed` to whatever name you saw on DistroWatch.

Typical reasons **not** to:

- "The kernel looks old" — that is [HWE / OEM / mainline](/2022/12/30/how-to-upgrade-ubuntu-kernel/), and Desktop is already on HWE.
- "I want 24.04.3" — you get that with `apt` on 24.04.
- A PPA you depend on has not built the new series yet. The upgrade will disable it; the app may vanish or pin you to an old ABI. That is the [PPA pile](/2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/) that made Ubuntu feel like a maintenance project.

Downgrade is not supported. If the new series is wrong, you reinstall. Snapshot the disk or the VM first.

## Third-Party Sources and PPAs

This is the part the upgrader exists to handle and `sed` exists to ignore.

Third-party lines are not Ubuntu. They pin packages to versions the next release's archive does not expect. `do-release-upgrade` turns them off so the calculation is "Ubuntu 24.04 → Ubuntu 26.04," not "Ubuntu plus a Mesa PPA plus Google Chrome plus a random kernel PPA."

After a successful upgrade:

1. `apt update` should hit **only** Ubuntu until you choose otherwise. On current desktops that is `/etc/apt/sources.list.d/ubuntu.sources` (Deb822), not a classic `sources.list`.
2. Re-enable a PPA when it has a pocket for the **new** codename. If it 404s, leave it disabled or remove it. The 2022 advice — "downgrade that source back to last release" — keeps you on a *mix* of two series. That is how you get a partial upgrade you cannot finish.
3. Vendor `.list` files that use `stable` instead of a codename (some Chrome, some third-party) may survive. Still check them.

`--allow-third-party` on `do-release-upgrade` keeps those sources on during the calculation. That is a test for PPA maintainers, not a laptop shortcut.

## Rewriting Sources

This is still my favorite way to change series. I published it in 2022, I [used it on servers](/notes/178199161645258618/) for `mantic` → `noble`, and I still use it. A **codename rewrite plus `full-upgrade`** is fast and has no upgrader prompts.

It is not a `do-release-upgrade`. There are no quirk scripts, no obsolete-package pass, no automatic PPA disable. If the `full-upgrade` dies in the middle — network drop, full disk, a package that fails to unpack, DKMS, a PPA that mixed two series — **another `full-upgrade` and a reboot are often not enough.** You need `dpkg --configure -a`, `apt --fix-broken install`, sometimes a live session or an older kernel in GRUB. That is normal for this method.

If you do not already know Linux and Ubuntu well enough to do that recovery, prefer `do-release-upgrade`. The upgrader exists so a stuck run has a path besides "reinstall." Use the rewrite on a machine you can snapshot, sit in front of, or throw away.

**When I still do it:** servers I know, EOL series (see [old-releases](#eol-and-old-releases)), a fleet already imaged identically, a VM I will delete if it fails.

Do not assume `/etc/apt/sources.list`. On 22.04 that file is usually the archive. On 24.04 and later the same lines often live in Deb822 `/etc/apt/sources.list.d/ubuntu.sources`. A `sed` of the wrong file is a no-op. Some machines still have a stub `sources.list` *and* `ubuntu.sources` — grep for the running series and edit the files that actually contain it.

```bash
old=$(lsb_release -cs)
new=resolute   # you pick the target; there is no "next LTS" one-liner

# Which files actually name this series?
sudo grep -rnF --include='*.list' --include='*.sources' "$old" \
  /etc/apt/sources.list /etc/apt/sources.list.d/ 2>/dev/null
```

Classic one-liners look like `deb http://archive.ubuntu.com/ubuntu noble main`. Deb822 puts the series on `Suites:`:

```text
Types: deb
URIs: http://archive.ubuntu.com/ubuntu
Suites: noble noble-updates noble-backports
Components: main restricted universe multiverse
Signed-By: /usr/share/keyrings/ubuntu-archive-keyring.gpg
```

A single `s/noble/resolute/g` rewrites both shapes (`noble-updates` becomes `resolute-updates`). Apply it only to the files grep printed:

```bash
sudo grep -rlF --include='*.list' --include='*.sources' "$old" \
  /etc/apt/sources.list /etc/apt/sources.list.d/ 2>/dev/null \
| sudo xargs -r sed -i "s/${old}/${new}/g"
```

If grep hits both `sources.list` and `ubuntu.sources` for `archive.ubuntu.com`, you have the same archive twice. Edit the one apt is using and leave the other as a comment or empty stub, or `apt update` will complain about duplicates.

That same `grep | sed` already rewrites PPA files that contain `$old`. If a PPA has not published `$new` yet, skip that file — a 404 is better than a mixed series.

Then:

```bash
sudo apt update
sudo apt full-upgrade
```

`apt upgrade` will refuse to add/remove packages the new series requires. `full-upgrade` (same as the old `dist-upgrade`) is the one that can actually move the system. Reboot if it finishes cleanly.

If it does **not** finish — Ctrl-C, SSH drop, "exit status 1" at 40% — do not treat reboot as the fix. Finish the unpack first:

```bash
sudo dpkg --configure -a
sudo apt --fix-broken install
sudo apt full-upgrade
```

Those two extra commands were the only recovery the 2022 post had. They are still first aid after a failed unpack. They are also why this method is mine and not the default: you have to know to run them, and sometimes they are not enough (held packages, a mixed PPA, NVIDIA DKMS, a box that no longer boots). A laptop with a proprietary driver is the easy way to learn that the hard way.

Do not rewrite 20.04 `focal` or 22.04 `jammy` straight to an interim name because a blog said so. The 2022 example (`jammy` → `kinetic`) took an LTS to a nine-month release. The LTS path from 22.04 was **24.04**, after 24.04.1.

## EOL and old-releases

When a series reaches end of standard support, `archive.ubuntu.com` stops serving it. `apt update` 404s. That is not "add a PPA." Point the Ubuntu stanzas at [old-releases.ubuntu.com](http://old-releases.ubuntu.com/ubuntu/), get a working `apt update`, *then* `do-release-upgrade` to a supported series. You may have to hop (20.04 → 22.04 → 24.04) if you are more than one LTS behind. Sequential is the rule.

Ubuntu Pro / ESM extends the **security** clock on an LTS. It is not a release upgrade, and it does not move you to 26.04.

## Common Mistakes

- **`apt full-upgrade` and calling it a release upgrade.** You patched 24.04. You are still on 24.04.
- **`sed` on `sources.list` while the archive is in `ubuntu.sources`.** Grep for `lsb_release -cs` under `/etc/apt/` and edit the files that match.
- **Jumping LTS → interim** because the interim number looks newer (`22.04` → `22.10`). You left the five-year clock.
- **Skipping an LTS.** 22.04 → 26.04 is not a supported hop. 22.04 → 24.04 → 26.04 is.
- **Forcing `-d` because of `No new release found`.** Often the `.1` gate. Read `Prompt` and meta-release-lts first.
- **Rewriting PPAs to the new codename before they exist.** 404s, or worse, a mix of two series. Leave them disabled.
- **Starting a release upgrade with pending updates or without a reboot** after a new kernel. The upgrader will stop; DKMS is why.
- **Preferring a sources rewrite because it looks like two commands.** If `full-upgrade` dies halfway, reboot is not the next step. Configure the unpack, fix broken packages, then continue — or reinstall. If that sentence is not already muscle memory, use `do-release-upgrade`.

## What This Post Does Not Cover

Clean-install vs upgrade as a lifestyle choice. Flavor-specific gotchas beyond "Kubuntu is Ubuntu + KDE." Cloud image `Prompt=never`. Building a local mirror. Those are adjacent shelves. Kernel tracks inside a release: [How Ubuntu Ships Kernels](/2022/12/30/how-to-upgrade-ubuntu-kernel/).

## Further Reading

- [Upgrade Ubuntu Desktop](https://ubuntu.com/desktop/docs/en/latest/how-to/upgrade-ubuntu-desktop/) (official: sequential LTS, `.1` gate, `do-release-upgrade`)
- [meta-release-lts](https://changelogs.ubuntu.com/meta-release-lts) (`Supported:` is the gate `Prompt=lts` actually reads)
- `/etc/update-manager/release-upgrades` on your machine (`Prompt=lts|normal|never`)

The distro comparison that lives with this: [Ubuntu, Manjaro, and the Linux Desktop](/2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/).
