---
title: Check for Windows Updates
date: 2009-01-13T23:50:43+03:30
lastmod: 2026-07-06T23:38:01+03:30
description: A practical checklist for keeping Windows and third-party software patched — updated after FileHippo and Secunia retired their scanners.
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

Turn on automatic updates and verify nothing is pending:

- **Windows 10/11:** Settings → **Windows Update** → **Check for updates**
- **Microsoft 365 / Office:** install updates from the same Windows Update channel or from any in-app update prompt

Reboot when prompted. Pending restarts are how patches sit half-applied.

## 2. Update third-party programs

FileHippo no longer maintains an update checker. Practical replacements:

- **[winget](https://learn.microsoft.com/en-us/windows/package-manager/winget/)** — built into current Windows releases; run `winget upgrade` to see what is outdated, or `winget upgrade --all` to install available updates
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
