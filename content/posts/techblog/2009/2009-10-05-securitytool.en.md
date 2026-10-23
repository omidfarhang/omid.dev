---
title: SecurityTool
date: 2009-10-05T12:00:00+00:00
description: SecurityTool scareware dossier — fake infection pop-ups, bogus startup scans, and the install paths used to persist on Windows.
layout: single
author_profile: true
url: 2009/10/05/securitytool/
tags:
  - Malware
  - rogue software
  - Security

categories:
  - TechBlog

seeAlso:
  - /2009/12/09/securitytool-rogue-is-trying-to-be-a-moving-target/
  - /2009/01/12/winiguard/
  - /2009/12/09/safetyantispyware/
  - /2011/01/02/malware-removal-guide-for-Windows/
---
![](/images/2009/10/securitytool/02.jpg)

**SecurityTool** is rogue antivirus software — a scareware scam built to take money, not to protect a PC. It belongs to the same late-2000s wave of fake “security suites” that flooded Windows desktops with false positives and purchase prompts.

## Symptoms

If a machine is infected you typically see continuous pop-ups and system warnings claiming the PC is infected, urging you to buy SecurityTool. Those alerts are false. Paying does not clean infections or prevent new ones; SecurityTool *is* the infection.

It also tends to run a “scan” at Windows startup and show a long list of fabricated threats — again to push the purchase.

## What to do

Do not buy SecurityTool. Follow the [Malware Removal guide for Windows](/2011/01/02/malware-removal-guide-for-Windows/), then change passwords used on that machine. Field note when the operators kept renaming domains: [SecurityTool rogue is trying to be a moving target](/2009/12/09/securitytool-rogue-is-trying-to-be-a-moving-target/).

## Known System Changes

### Created Files

- `%Desktop%Security Tool.lnk`
- `%StartMenu%Programs\Security Tool`

### Created Folders

- `%CommonPrograms%SecurityTool`
- `%ApplicationData%[randomnamedfolder]`

### Registry Entries

- Key: `HKEY_CURRENT_USER\Software\Security Tool`
- Data: `C:\Documents and Settings\%userprofile%\Application Data\[randomnumber]\[randomnumber].bat`
- Key: `HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run`
- Value: `[randomnumber]`
- Data: `C:\DOCUME~1\ALLUSE~1\APPLIC~1\[randomnumber]\[randomnumber].exe`

## Related scareware

Same era, similar playbook:

- [WiniGuard](/2009/01/12/winiguard/) and its clones ([IGuardPC](/2009/12/14/iguardpc/))
- [SafetyAntiSpyware](/2009/12/09/safetyantispyware/)
- [Advanced Virus Remover](/2009/12/10/advanced-virus-remover/)
- [Data Doctor 2010](/2009/12/18/data-doctor-2010/)
