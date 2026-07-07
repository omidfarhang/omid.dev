---
title: Check for Windows Updates
date: 2009-01-13T23:50:43+03:30
lastmod: 2026-07-07T18:05:00+03:30
description: A practical checklist for keeping Windows (XP through 11) and third-party software patched — updated after FileHippo and Secunia retired their scanners.
layout: single
author_profile: true
url: 2009/01/13/check-for-windows-updates/
shortlink: https://g.omid.dev/PjFbqOk
tags:
  - Microsoft
  - Windows
  - how to
  - Updates
  - maintenance
  - Guide

categories:
  - TechBlog

seeAlso:
  - /2009/01/13/cleanup-windows-hard-disk/
  - /2009/01/13/tfc/
---
Three steps to keep Windows fast, stable, and secure. The original 2009 version of this guide recommended **FileHippo Update Checker** (later renamed **AppManager**) and the **Secunia Online Scanner**. Both are gone — FileHippo retired its updater, and Secunia's consumer tools shut down years ago. Here is what still works.

## 1. Patch Windows and Microsoft products

Turn on automatic updates and verify nothing is pending. Reboot when prompted — pending restarts leave patches half-applied.

On every release that still talks to Microsoft's update servers, also opt in to **Microsoft Update** (not just Windows Update). That channel delivers patches for Office, .NET, SQL Server, and other Microsoft products alongside the OS. You enable it once in Windows Update settings; the checkbox label varies slightly by version.

### Windows 11 and Windows 10

- **Windows 11:** Settings → **Windows Update** → **Check for updates**
- **Windows 10:** Settings → **Update & Security** → **Windows Update** → **Check for updates**
- **Microsoft Update:** **Advanced options** → enable **Receive updates for other Microsoft products** (11) or **Give me updates for other Microsoft products when I update Windows** (10)

### Windows 8.1 and Windows 8

- **Windows 8.1:** **Settings** → **Change PC settings** → **Update and recovery** → **Windows Update** → **Check now**
- **Windows 8:** **Settings** charm → **Change PC settings** → **Windows Update** → **Check for updates now**
- **Microsoft Update:** in the same Windows Update area, enable **Give me updates for other Microsoft products when I update Windows**

Both releases are past end of life, but the built-in Windows Update client can still reach Microsoft's servers if you must keep one running.

### Windows 7

- **Control Panel** → **System and Security** → **Windows Update** → **Check for updates**
- **Microsoft Update:** open **Change settings** (or click **Find out more** in the sidebar) and opt in to **Give me updates for other Microsoft products when I update Windows**

Windows 7 reached end of support in January 2020. If the built-in checker stalls, errors out (common code: **80072EFE**), or never finishes, use [Legacy Update](https://legacyupdate.net/) instead — see below.

### Windows Vista, XP, and earlier

Microsoft's built-in Windows Update service no longer works reliably on these releases. You may see endless "checking for updates," error **80072EFE**, or no results at all. Use **[Legacy Update](https://legacyupdate.net/)** — a community-run replacement that restores the classic Windows Update website, installs the prerequisite patches your system lacks, and lets you download security updates, optional updates, and drivers.

- Install from [legacyupdate.net](https://legacyupdate.net/) and run **Install Updates** from the site or the Start menu entry it creates.
- Legacy Update also restores **Windows Product Activation** online on XP, Server 2003, and Vista (a legitimate product key is still required).

These OS versions are long past end of life. Use them only when you must — for old hardware, software compatibility, or a sandboxed lab — and keep them off the public internet when possible.

### Microsoft 365 / Office

On currently supported Windows releases, Office updates ride the same **Microsoft Update** channel once you opt in above. Otherwise install updates from any in-app update prompt.

## 2. Update third-party programs

FileHippo no longer maintains an update checker. Practical replacements:

- **[winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/)** — built into Windows 10 and 11; run `winget upgrade` to see what is outdated, or `winget upgrade --all` to install available updates
- **[Patch My PC Home Updater](https://patchmypc.com/home-updater)** — free scanner and installer, closest in spirit to what FileHippo offered
- **[Ninite](https://ninite.com/)** — pick your common apps once and re-run the installer periodically to refresh them

Pay special attention to browsers, PDF readers, and messaging apps — those are the programs attackers probe after the OS itself.

## 3. Remove or replace insecure software

Secunia's online scanner and **Personal Software Inspector (PSI)** were discontinued in 2018. There is no direct one-click replacement for home users, but the same goal is reachable:

- Run **Patch My PC** or **winget** after installing new software — anything still outdated deserves attention
- **Uninstall** programs you no longer use (Settings → Apps → Installed apps)
- **Retire end-of-life runtimes** (old Java, Silverlight, abandoned plugins) instead of trying to patch them forever
- Keep your **browser** on the current stable release and remove extensions you do not need

Staying current is maintenance, not a one-time fix. Revisit this checklist after major installs and at least once a quarter on family PCs.
