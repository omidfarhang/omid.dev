---
title: Cleanup Windows Hard Disk
date: 2009-01-13T23:50:43+03:30
lastmod: 2026-07-07T14:38:00+03:30
description: How to free up disk space on Windows with built-in tools and PatchCleaner — updated from the 2009 version that leaned on Auslogics BoostSpeed and CCleaner.
layout: single
author_profile: true
url: 2009/01/13/cleanup-windows-hard-disk/
shortlink: https://g.omid.dev/tK2xIAl
tags:
  - Microsoft
  - Windows
  - how to
  - cleanup
  - maintenance
  - Guide

categories:
  - TechBlog
---
Freeing up disk space keeps Windows responsive and gives updates room to install. The original 2009 version of this guide recommended **Auslogics BoostSpeed** and **CCleaner** for the job. Today you rarely need either — Windows 10 and 11 ship with cleanup tools that are safer than third-party "boosters" and registry cleaners. Here is the modern workflow.

Why cleanup
-----------

Over time Windows accumulates files you can safely remove:

* Temporary files from apps and the system
* Browser caches and downloaded program files
* Windows Update leftovers, WinSxS component-store bloat, and orphaned installer patches
* The Recycle Bin
* Delivery Optimization cache and old restore points
* Apps and games you no longer use

**Tip:** On modern browsers the cache is capped and self-managing, so the biggest wins are usually Windows Update leftovers (especially WinSxS and the Installer folder), the `Downloads` folder, and unused applications — not the browser cache.

How to cleanup
--------------

Use the built-in tools first. They are free, safe, and require nothing extra to install:

* **Storage settings** — the modern, recommended way
* **Storage Sense** — set it and forget it
* **Disk Cleanup (`cleanmgr`)** — the classic tool, still available
* **[PatchCleaner](https://www.homedev.com.au/Free/PatchCleaner)** — for orphaned files in `C:\Windows\Installer` after years of patching

### Storage settings (recommended)

1. Open **Settings → System → Storage**.
2. Windows shows a breakdown of what is using space (Apps, Temporary files, Documents, and so on).
3. Click **Temporary files**, review the categories, and select what to remove — Windows Update cleanup, Recycle Bin, Downloads, delivery optimization files, and thumbnails are all listed here.
4. Click **Remove files**.

This replaces almost everything the old Disk Cleanup dialog did, with clearer descriptions of each category.

### Storage Sense (automatic)

To stop worrying about this manually, turn on **Storage Sense** under **Settings → System → Storage → Storage Sense**. It can:

* Delete temporary files automatically
* Empty the Recycle Bin after a set number of days
* Offload rarely used files to the cloud with OneDrive Files On-Demand

Configure the schedule once and Windows keeps the drive tidy on its own.

### Disk Cleanup (`cleanmgr`)

The legacy tool still ships with Windows if you prefer it:

1. Press **Win + R**, type `cleanmgr`, and press Enter (or search the Start menu for *Disk Cleanup*). Pick the drive if prompted.
2. Select the file categories to delete.
3. For system files — old Windows Update files, previous Windows installations (`Windows.old`), and more — click **Clean up system files**.
4. Click **OK**, then confirm.

### WinSxS and Windows Installer bloat

After years of patching, two hidden folders often grow much larger than people expect:

* **`C:\Windows\WinSxS`** — the component store. Explorer may report a huge size because of hard links; the real disk cost is usually smaller, but superseded update files still pile up.
* **`C:\Windows\Installer`** — hidden `.msi` and `.msp` files Windows keeps for patching and uninstalling software. Orphaned copies can consume many gigabytes.

**WinSxS:** use **Windows Update Cleanup** from **Settings → System → Storage → Temporary files**, or via **Disk Cleanup → Clean up system files**. That prunes superseded component-store files. Run this before reaching for third-party tools.

**Windows Installer:** **[PatchCleaner](https://www.homedev.com.au/Free/PatchCleaner)** is a free tool I've relied on for years. It compares Windows' own list of required installer files (via WMI) against what's on disk and flags the orphans. In my experience this is one of the most common sources of "mystery" disk usage on heavily patched PCs — often alongside a bloated WinSxS folder after a long stretch of Windows Updates.

1. Download and run PatchCleaner.
2. Let it scan `C:\Windows\Installer`.
3. Prefer **Move** over **Delete** the first time — you can copy files back if something goes wrong.
4. Review the list, then reclaim the space.

PatchCleaner ships with an exclusion filter for Adobe Reader patches (enabled by default) — removing those orphans can break Adobe's auto-updater. The tool also has a CLI (`/m` to move, `/d` to delete) if you want to script it. Requires .NET 4.5.2; works on Windows 7, 8, 10, 11, and Server — not XP.

### Remove apps you don't use

Uninstalling software you no longer need is often the biggest single cleanup: **Settings → Apps → Installed apps**, then remove anything you don't recognize or use.

Older versions of Windows
-------------------------

If you are still running an older release, Disk Cleanup works much the same way — the steps below are preserved from the original 2009 guide. Note that Windows 7 and Windows XP are both **end of life** and no longer receive security updates, so treat these systems as offline or legacy machines.

### Windows 7

1. Click **Start → All Programs → Accessories → System Tools → Disk Cleanup**. If several drives are available, you might be prompted to specify which drive you want to clean.
2. When Disk Cleanup has calculated how much space you can free, scroll through the *Files to delete* list.
3. Clear the check boxes for files that you don't want to delete, then click **OK**.
4. For more options, such as cleaning up System Restore and Shadow Copy files, click **Clean up system files**, then open the **More Options** tab.
5. When prompted to confirm, click **Yes**.

### Windows XP

1. Click **Start → All Programs → Accessories → System Tools → Disk Cleanup**. If several drives are available, you might be prompted to specify which drive you want to clean.
2. In the *Disk Cleanup* dialog box, scroll through the *Files to delete* list.
3. Clear the check boxes for files that you don't want to delete, then click **OK**.
4. When prompted to confirm, click **Yes**.

After a few minutes the process completes and the Disk Cleanup dialog box closes, leaving your computer cleaner and performing better.

A note on third-party "cleaners"
--------------------------------

The 2009 version recommended paid optimization suites and registry cleaners. That advice has aged poorly:

* **Registry cleaners** offer no measurable performance benefit on modern Windows and can break things.
* **CCleaner** suffered a [supply-chain malware incident in 2017](https://en.wikipedia.org/wiki/CCleaner#Security_incidents) and now bundles extra components — use it with caution, if at all.
* General "speed booster" suites like **Auslogics BoostSpeed** duplicate what Windows already does for free.

**PatchCleaner** is the exception — a free, targeted tool for one specific folder, not a registry cleaner or "speed booster." Pair it with the built-in WinSxS cleanup above rather than using it alone.

If you have an **SSD** (most machines today do), skip defragmentation entirely — Windows handles TRIM automatically, and manually defragging an SSD just adds wear.
