---
title: Sysinternals Suite for Windows Troubleshooting
date: 2006-11-08T14:15:00+00:00
description: Mark Russinovich's Sysinternals tools — Process Explorer, Autoruns, TCPView — were essential for understanding what Windows was really doing.
layout: single
author_profile: true
url: 2006/11/08/sysinternals-suite-for-windows-troubleshooting/
tags:
  - Sysinternals
  - Windows
  - Troubleshooting
  - Security

categories:
  - TechBlog
---
When a Windows PC feels slow, popup-heavy, or "haunted," Task Manager is not enough. The **Sysinternals Suite** from Mark Russinovich answers the question power users actually have: **what is running, why, and who started it?**

Microsoft acquired Sysinternals in July 2006, but the tools remain free, still updated, and still the first thing I reach for on a troubled machine.

## Process Explorer: Task Manager with X-Ray Vision

Process Explorer shows:

- Parent/child process trees — see which service launched which child
- Loaded DLLs per process
- Handles and threads when you need depth
- Easy path to **kill a stuck subtree** safely
- Different colors for services, own processes, and jobs

If a rogue antivirus clone hooks the system, Process Explorer often reveals the culprit faster than Add/Remove Programs. Right-click a process, check properties, inspect strings and TCP connections — evidence, not guesswork.

## Autoruns: The Startup Map

Nothing beats **Autoruns** for answering:

- What launches at logon?
- What browser helper objects remain installed?
- What services run under suspicious names?
- What Winsock providers and Explorer shell extensions are registered?

Unchecking the wrong item can break a PC — but **hiding** startup entries is how malware survives reinstalls of "clean" apps. Compare against a known-good baseline when you can.

## TCPView: Who Is Talking to the Internet?

When a machine uploads traffic at 2 a.m., TCPView lists:

- Local and remote endpoints
- Owning process
- Connection state

Pair it with a firewall alert and you have evidence for the user who insists "I wasn't doing anything."

## Other Tools Worth Keeping on a USB Stick

- **Process Monitor** — real-time file, registry, and network activity (Filemon and Regmon merged)
- **RootkitRevealer** — essential after the copy-protection rootkit discussions this year
- **PsExec, PsKill, PsList** — remote and local process management from the PSTools set
- **AccessChk** — who has permissions on what

Download the full suite ZIP from the Sysinternals site. No installer, no EULA surprises — just portable executables.

## How I Use the Suite Day to Day

Typical workflow on a suspect PC:

1. **Autoruns** — export baseline, look for unsigned or unusual publishers
2. **Process Explorer** — identify CPU hogs, injected DLLs, suspicious parents
3. **TCPView** — confirm outbound calls during cleanup
4. **RootkitRevealer** when something still feels wrong after AV scan

Observe first. Reinstall last. Half of "slow PC" tickets are startup junk, not hardware failure.

## After the Microsoft Acquisition

Some worried Microsoft would bury the tools or charge for them. So far, the opposite happened — Sysinternals gained visibility and continued updates. Process Explorer even picked up integration hooks toward Microsoft's own troubleshooting story.

Keep downloading from the official Sysinternals site. Third-party mirrors sometimes bundle adware.

## Observe First

Sysinternals does not replace antivirus. It replaces mystery.

If you support Windows desktops, keep these tools on a USB stick next to the spare patch cables. They teach the habit that saves the most time on messy machines: see what the machine is actually doing before you start deleting things.
