---
title: "The AUR Is Frozen: Inside Arch's Third Supply-Chain Attack Wave"
date: 2026-08-10T12:00:00+03:30
description: "Arch Linux froze all AUR writes after a third supply-chain attack wave, then restored pushes and adoption on August 11 with review gates. Timeline, how Atomic Arch worked, and what to do on Manjaro and other Arch-derived distros."
layout: single
author_profile: true
url: 2026/08/10/aur-freeze-supply-chain-attack/
shortlink: https://g.omid.dev/6A7oOph
x_link: https://x.com/OmidFarhang/status/2086759787711328410
mastodon_link: https://mastodon.social/@omidfarhang/117070712573310769
bluesky_link: https://bsky.app/profile/omid.dev/post/3mspuw5q3vk2u
linkedin_link: https://www.linkedin.com/posts/omidfarhang_the-aur-is-frozen-inside-archs-third-supply-chain-share-7492525989839925248-szm3/
relatedNote: notes/178622011772729005/
keywords:
  - AUR freeze
  - Arch Linux supply chain attack
  - Atomic Arch campaign
  - AUR malware
  - Manjaro AUR security
tags:
  - Linux
  - Arch Linux
  - AUR
  - Security
  - Supply Chain
  - Manjaro
  - Package Management
  - DevOps
categories:
  - TechBlog
seeAlso:
  - /2026/08/15/the-frontend-is-a-privileged-system-now/
  - /2026/06/03/ubuntu-manjaro-and-the-linux-desktop-im-rethinking/
  - /2026/08/03/a-maintainable-command-line-workspace-on-linux/
  - /2026/07/18/dependency-risk-sboms-and-automated-security-for-angular/
---
If you fired up `yay -Syu` over the past week and noticed your AUR packages silently refusing to update, you're not imagining it — and it isn't a bug in your helper. As of August 1, 2026, Arch Linux disabled **all pushes** to the Arch User Repository, meaning maintainers could no longer publish updates, new versions, or fixes to the community package collection that most of us rely on daily. The AUR stayed up and readable, but writes were locked down while the project fought off its **third supply-chain attack** since June.

This isn't a routine outage. It's the latest, most aggressive escalation in a sustained campaign — nicknamed "Atomic Arch" — that has weaponized the very feature that makes the AUR powerful: the open adoption of orphaned packages. For anyone running Arch, Manjaro, EndeavourOS, CachyOS, or any Arch-derived distro with AUR packages installed, it's worth understanding what happened, what changed when the freeze lifted, and what to do next.

## Update — August 11

The write freeze is over. On August 11, Leonidas Spyropoulos announced on the `aur-general` mailing list that `aurweb v6.5.0` had been deployed: **SSH/Git push access and package adoption are back** — but not under the old rules.

Pushes and adoption no longer mean "claim an orphan and commit immediately." Adopting through the web UI or `ssh aur@aur.archlinux.org adopt <pkgbase>` now files an adoption **request**; a Package Maintainer has to approve it before maintainership transfers. Only one pending request is allowed per package base, and unanswered requests auto-reject after 14 days. Unverified accounts get a warning after 7 days and are removed after 14 — verifying the email address at any point stops that cleanup. New account registration stays closed "for now," so only existing, verified maintainers can push.

That is the structural change the community had been asking for. It closes the path the attackers used in all three waves: adopt an orphan, then immediately ship malicious commits.

A few caveats still matter. The announcement restores functionality; it does **not** declare the malware incident resolved. The same August 11 thread includes a report of `storageexplorer-bin` shipping a hidden 43 KB `optimizer` ELF binary — currently inert because of a PKGBUILD quirk, but "a single corrected push would arm it." With the freeze lifted, the backlog of delayed updates will start flowing, so treat freshly updated AUR packages with extra scrutiny: read the PKGBUILD, check who maintains it, verify checksums. The community scanner at `github.com/lenucksi/aur-malware-check` is still the fastest way to cross-check installed packages against known-compromised lists.

Pushes and adoption are back with review gates. Registration is still closed. Vigilance is still required.

## What Was Frozen (and What Still Worked)

During the lockdown, the AUR was **not down** — it was a write freeze, not an outage.

- **Disabled (Aug 1–11):** all `git push` access to AUR packages, the package adoption mechanism, and new account registration.
- **Still working throughout:** browsing, reading, cloning, and installing existing packages via `yay`, `paru`, or plain `makepkg`.

Every AUR package sat at whatever version it held when the lockdown hit. Maintainers could not push updates, fix broken builds, or track upstream. Reading stayed fine; writing stayed blocked until the August 11 restoration (see [Update — August 11](#update--august-11)). Registration remains closed.

## A Timeline of the "Atomic Arch" Campaign

The freeze didn't come out of nowhere. It's the third major response Arch has mounted against a coordinated campaign that researchers at Sonatype dubbed "Atomic Arch" ([SecurityWeek](https://www.securityweek.com/atomic-arch-supply-chain-attack-hits-1500-aur-packages/), [Sonatype](https://www.sonatype.com/blog/atomic-arch-npm-campaign-adds-malicious-dependency)).

**Wave 1 — June 11–12:** Attackers systematically adopted orphaned AUR packages and modified their `PKGBUILD` files to run `npm install atomic-lockfile` during the build, pulling in a malicious npm package alongside a few legitimate ones for cover. That package shipped a bundled Linux ELF binary — a Rust credential stealer — that executed during `makepkg`. Around 1,500+ packages were compromised. Arch froze new account registration, purged the malicious commits, and declared the repository clean by mid-June ([The Hacker News](https://thehackernews.com/2026/06/over-400-arch-linux-aur-packages.html), [Privacy Guides](https://www.privacyguides.org/news/2026/06/12/around-1-500-aur-packages-compromised-with-rootkit-like-malware/)).

**The (failed) hardening:** Registration reopened on July 13 with new restrictions — disposable email addresses rejected, mandatory email verification with a 24-hour token, email changes locked during cooldown. It wasn't enough.

**Wave 3 — late July:** A new wave returned with a delivery mechanism engineered specifically to evade the detection signatures that caught the June attacks. Instead of npm commands, attackers embedded obfuscated JavaScript downloaders and compiled ELF binaries directly into build scripts. The payload is a Tor-backed, Rust-based infostealer with RAT and SSH worm capabilities — it targets browser credentials, crypto wallets, SSH keys, and API/cloud secrets, and spreads laterally across your SSH trust graph ([SC Media](https://www.scworld.com/brief/arch-linux-temporarily-disables-aur-package-adoption-amid-malicious-takeover-surge), [Tech Times](https://www.techtimes.com/articles/322619/20260801/arch-linux-freezes-aur-adoption-tor-backed-rust-infostealer-bypasses-june-defenses-third-wave.htm)).

**July 30:** Robin Candau ("Antiz"), on behalf of the Arch Linux DevOps team, announced package adoption was disabled, citing "the current influx of malicious package adoptions and follow-up commits" ([BleepingComputer](https://www.bleepingcomputer.com/news/security/arch-linux-disables-aur-package-adoption-to-stop-malware-flood/)).

**August 1:** Less than two days later, the response escalated. Candau posted: *"We have now disabled pushes altogether as well for the moment, while we handle the situation."* — a repository-wide write freeze blocking legitimate and malicious updates alike ([RuntimeWire](https://runtimewire.com/article/aur-malware-wave-forces-arch-linux-to-disable-every-package-push)).

Also on August 1, Morten Linderud — known as "Foxboron," Arch Linux security team member and AUR maintainer for a decade — announced his resignation ([ETTAYEB](https://ettayeb.fr/en/linux/arch-linux-aur-crise-juillet-2026/)). The timing is hard to separate from the crisis.

**August 11:** Leonidas Spyropoulos announced on `aur-general` that `aurweb v6.5.0` was live — pushes and adoption restored under review gates, registration still closed. Details in [Update — August 11](#update--august-11).

## How the Attack Actually Works

The mechanism is almost annoyingly simple, and that's what makes it effective.

Until August 11, the AUR let any registered user "adopt" a package whose maintainer had abandoned it, gaining full commit access to the associated Git repository. Attackers automated this at scale: claim an orphan, inherit its name and trusted history, then rewrite the build scripts to execute malicious payloads during installation. The critical execution point is the `makepkg` phase — when you install an AUR package via `yay` or `paru`, the `PKGBUILD` script runs with the privileges required for the build.

The compromised packages kept their names, their histories, and the trust that came with them. Only the build instructions changed. The trap sat in the recipe, leaving the package itself looking exactly like the software users meant to install. No exploit, no zero-day, and no sign Arch's own systems were breached. The attackers just read the documentation and used the adoption process as designed ([Melvin Jones Repol](https://www.melvinjonesrepol.com/blog/how-the-aur-become-ground-zero-for-linux-worst-supply-chain-attack-wave)).

Known affected packages in the current wave include `openconnect-sso`, `boringssl-git`, `icloudpd`, `org-cli`, and dozens of others, with at least 89 publicly corroborated names and counting ([Corgea](https://corgea.com/research)). Adoption now requires Package Maintainer approval before maintainership transfers — closing the instant-takeover path — but reviewing `PKGBUILD`s before you build is still non-negotiable.

## When Did It Come Back?

When this piece was first drafted on August 9, the honest answer was **no one knew**. Arch hadn't committed to a timeline. The last official word, from August 1, was that the team would "send a follow-up once we're able to." Mailing-list traffic was proposals and speculation; status.archlinux.org still listed AUR as "Operational" because the service was reachable, even though it rejected every write.

That follow-up landed on **August 11** — see [Update — August 11](#update--august-11). Whether the new gates hold against the next wave remains to be seen, but the most reliable place to watch is still the [`aur-general` mailing list archives](https://lists.archlinux.org/hyperkitty/list/aur-general@lists.archlinux.org/latest).

## What You Should Do Right Now

**If you're on Manjaro, EndeavourOS, CachyOS, or plain Arch with AUR packages:**

1. **Don't blindly rush the backlog.** Pushes are back, so a flood of delayed AUR updates is likely. Treat packages updated in the next few days with extra scrutiny before you `yay -Syu` everything.

2. **Audit what you installed recently.** Run `pacman -Qm` to list all foreign (non-official-repo) packages on your system. Cross-reference against the affected-package lists circulating on the mailing list and Reddit. Pay special attention to any AUR package that changed maintainers in the last few weeks.

3. **Check your build cache.** Look for suspicious ELF binaries in `~/.cache/yay/` or `~/.cache/paru/`. The malicious payloads are often disguised as tools named `linter`, `hasher`, `minifier`, `validator`, `assembler`, or `optimizer`.

4. **Run the community scanner.** The community-maintained tool at `github.com/lenucksi/aur-malware-check` cross-references your installed AUR packages against the known-compromised list and checks for rootkit/persistence indicators.

5. **If a flagged package was built — especially with `sudo makepkg` — treat the host as fully compromised.** Rotate every credential: browser-stored passwords, SSH private keys (regenerate and replace `authorized_keys` on every reachable system), cloud provider API keys, CI/CD secrets, and crypto wallets. Because the SSH worm may already have pivoted using your stolen keys, coordinate credential rotation across your entire infrastructure, not just the affected workstation. A clean reinstall from trusted media is the safest path for any confirmed compromise ([Cloud Security Alliance](https://labs.cloudsecurityalliance.org/research/csa-research-note-aur-supply-chain-ebpf-rootkit-20260614-csa/)).

6. **Official repos are fine.** `pacman -Syu` for core/extra/multilib packages is completely unaffected — only the AUR is involved. Consider Flatpak or building from upstream sources for anything you don't fully trust yet.

## The Bigger Picture

This incident exposes the fundamental tension at the heart of the AUR: the open, community-maintained model that makes it attractive is the same open architecture that makes it vulnerable. The AUR holds over 90,000 community-contributed packages. There's no mandatory review, no cryptographic signing of build scripts, no automated behavioral analysis before a package goes live. The system has always carried an explicit "user-submitted, not vetted" warning — but in practice, most users (myself included) treat `yay -Syu` as a fire-and-forget operation.

The attackers didn't find a vulnerability in Arch. They didn't break `pacman`, compromise the official repositories, or exploit a flaw in `makepkg`. They read the documentation, found the adoption process for orphaned packages, and used it as designed. That's the uncomfortable truth: this wasn't a hack of the system, it was the system working exactly as specified — and being turned against its users.

Whether this crisis finally forces lasting structural change (PKGBUILD signing, mandatory maintainer verification, automated scanning) or just another cleanup-and-hope cycle remains to be seen. The August 11 `aurweb` deployment closed the instant-adopt-and-push path — a real fix, not just another freeze — but registration is still closed, there is still no official all-clear, and the malware reports haven't stopped. For now, the AUR many of us built our workflows around is writable again under stricter rules, and the only responsible assumption is that vigilance stays mandatory until the mailing list says otherwise.

Stay vigilant, audit your systems, and maybe — as the community half-jokingly suggests — get reacquainted with compiling from source like it's the 90s.
