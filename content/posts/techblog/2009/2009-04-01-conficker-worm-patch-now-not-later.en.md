---
title: Conficker Worm — Patch Now, Not Later
date: 2009-04-01T09:00:00+00:00
description: The Conficker worm exploited unpatched Windows systems in 2009. A practical patching and password checklist for homes and small offices.
layout: single
author_profile: true
url: 2009/04/01/conficker-worm-patch-now-not-later/
tags:
  - Conficker
  - Security
  - Windows
  - Malware
  - Patching

categories:
  - TechBlog
---
**Conficker** (also known as Downadup) has dominated security headlines for months. Today — April 1, 2009 — media coverage peaks because variant **Conficker.C** is programmed to check a larger set of domain names for update instructions. The worm has **not** melted the internet overnight, but the attention is useful if it pushes lagging patches out the door.

Defense is mostly **discipline**, not mystery.

## How It Spreads

Conficker exploits failures administrators have warned about for years:

- Missing **MS08-067** patch on Server and client systems — the Server Service vulnerability from October 2008
- **Autorun** on USB drives in environments that still allow it
- **Guessable passwords** on admin shares — dictionary attacks against `ADMIN$` and `IPC$`
- Machines that **never rebooted** after patch deployment — pending updates sit unapplied

One unpatched laptop on a flat network is enough to seed an entire office.

## What Conficker.C Changed

The C variant generates a long list of domains to contact for instructions — roughly 500 per day from a fixed set of TLDs. Security researchers at **SRI**, **OpenDNS**, and vendors worldwide are sinkholing and monitoring those domains. The April 1 date triggered anxiety, not necessarily a new payload — but infected machines remain a problem regardless of today's headlines.

## Action Checklist

1. **Install all outstanding Windows updates** — verify **KB958644** / MS08-067 on every XP and Server 2003 box
2. **Run the Microsoft Malicious Software Removal Tool** — updated to detect Conficker variants
3. **Disable Autorun** via Group Policy or registry where policy allows
4. **Enforce strong passwords** — especially Administrator and service accounts
5. **Block unnecessary SMB exposure** at the network edge
6. **Scan with updated antivirus** after patching — Conficker disables several security services

Test on one machine, then roll out. Document which systems were checked.

## Passwords Conficker Tries

Attackers love predictable defaults. Change passwords on:

- Local **Administrator** accounts
- Shared **service** logins used across multiple servers
- Old local accounts nobody disabled after staff left

Conficker's dictionary includes common weak passwords. If yours is on a public worm password list, change it today.

## Communication for Non-Technical Users

Plain language works better than CVE numbers:

- "Windows updates are mandatory this week — leave PCs on for the reboot."
- "Do not plug unknown USB drives into office PCs."
- "If the PC acts strange — slow network, disabled antivirus icon — disconnect the cable and call support."

Panic about April 1 does not help. Clear instructions do.

## What to Do If You Are Already Infected

Conficker blocks access to security vendor sites and disables Windows Update on some variants. Cleanup options:

- Use the **Conficker removal tools** published by Microsoft and major antivirus vendors
- Patch from a known-clean machine via network share or USB if the infected PC cannot reach Windows Update
- Consider network isolation until the machine is verified clean — reinfection from neighbors on the LAN is common

## Fix the Machines That Missed October

Today's date passed without catastrophe, but Conficker is still sitting on machines that never got MS08-067.

Start there. Patch the stragglers, clean weak local passwords, disable careless Autorun, and check the systems that never reboot after maintenance windows.
