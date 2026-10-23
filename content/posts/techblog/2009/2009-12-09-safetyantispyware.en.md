---
title: SafetyAntiSpyware
date: 2009-12-09T12:00:00+00:00
description: SafetyAntiSpyware rogue dossier — fake detections, license nags, and the install paths observed when “Safety Anti-Spyware 3” appeared.
layout: single
author_profile: true
url: 2009/12/09/safetyantispyware/
shortlink: https://g.omid.dev/7OPW3G6
tags:
  - Malware
  - rogue software
  - Security

categories:
  - TechBlog

seeAlso:
  - /2011/01/02/malware-removal-guide-for-Windows/
  - /2009/12/10/new-rogue-safetyantispyware/
  - /2009/01/12/winiguard/
  - /2009/10/05/securitytool/
  - /2009/12/10/advanced-virus-remover/
---
![](/images/2009/12/safetyantispyware/02.jpg)

**SafetyAntiSpyware** (branded in the wild as *Safety Anti-Spyware 3*) is rogue anti-spyware. The behavior matches the usual scareware pattern from that period: invent threats, then sell a license to “remove” them.

## What it does

First it “detects” fake infections. Then it asks the user to license the product and keeps nagging until someone pays. Activation does not make the machine safer.

![](/images/2009/12/safetyantispyware/03.jpg)

When it showed up in the wild: [New rogue: SafetyAntiSpyware](/2009/12/10/new-rogue-safetyantispyware/). To clean an infected PC, use the [Malware Removal guide for Windows](/2011/01/02/malware-removal-guide-for-Windows/).

## Known System Changes

### Files

- `%Desktop%\Safety Anti-Spyware 3.lnk`
- `%ProgramFiles%\Safety Anti-Spyware 3\Safety Anti-Spyware 3.exe`

### Folders

- `%ProgramFiles%\Safety Anti-Spyware 3`
- `%StartMenu%\Safety Anti-Spyware 3`

### Registry Entries

- Key: `HKEY_CURRENT_USER\Software\21CDEB48ECA505D5BCF7433258F34A70`
- Key: `HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Uninstall\Safety Anti-Spyware 3`
- Key: `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run`
- Value: `Safety Anti-Spyware 3`

## Related scareware

- [WiniGuard](/2009/01/12/winiguard/) / [IGuardPC](/2009/12/14/iguardpc/)
- [SecurityTool](/2009/10/05/securitytool/)
- [Advanced Virus Remover](/2009/12/10/advanced-virus-remover/)
- [Data Doctor 2010](/2009/12/18/data-doctor-2010/)
