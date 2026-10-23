---
title: WiniGuard
date: 2009-01-12T12:00:00+00:00
description: WiniGuard rogue antispyware dossier — scareware UI, $49.95 unlock pitch, infection paths, and the long list of clone install paths observed in 2008–2009.
layout: single
author_profile: true
url: 2009/01/12/winiguard/
shortlink: https://g.omid.dev/CFhBm7q
tags:
  - Malware
  - rogue software
  - Security

categories:
  - TechBlog

seeAlso:
  - /2011/01/02/malware-removal-guide-for-Windows/
  - /2009/12/14/iguardpc/
  - /2009/12/15/the-biggest-rogue-family/
  - /2009/12/16/like-clockwork-the-next-member-of-the-winiguard-rogue-family-appears/
  - /2009/12/18/winiguard-clones-are-coming-thick-and-fast/
  - /2009/10/05/securitytool/
---
![](/images/2009/01/winiguard/02.jpg)

**WiniGuard** is rogue antispyware — scareware dressed up as a legitimate security product. It exploits fear of PC infections to push a paid “cleanup.” It does not protect the machine; infected PCs should have it removed, not licensed.

This page is a 2009-era field dossier: how it behaved, how it typically arrived, and the filesystem / registry fingerprints shared across the clone family. For the wider genealogy, see [The biggest rogue family](/2009/12/15/the-biggest-rogue-family/).

## How it spreads

WiniGuard usually arrives via Trojans. A common lure at the time was a fake video codec that dropped the installer.

## What it does

It cannot reliably find or remove real threats, yet it demands payment (historically about **$49.95**) to “enable” the program. It may not brick hardware, but it can trick people into paying. Do not buy it; follow the [Malware Removal guide for Windows](/2011/01/02/malware-removal-guide-for-Windows/) instead.

## Known System Changes

## Created Files

- %CommonDesktop%WiniGuard.lnk
- %Desktop%WiniFighter.lnk
- %Desktop%BlockDefense.lnk
- %Desktop%SaveKeeper.lnk
- %Desktop%SoftSafeness.lnk
- %Desktop%SaveDefender.lnk
- %Desktop%SaveArmor.lnk
- %Desktop%SecuritySoldier.lnk
- %Desktop%SecureWarrior.lnk
- %Desktop%SafeFighter.lnk
- %Desktop%TrustFighter.lnk
- %Desktop%SoftCop.lnk
- %Desktop%softveteran.lnk
- %Desktop%shieldsafeness.lnk
- %Desktop%softstronghold.lnk
- %Desktop%SoftBarrier.lnk
- %Desktop%BlockScanner.lnk
- %Desktop%blockprotector.lnk
- %Desktop%blockdefender.lnk
- %Desktop%blockkeeper.lnk
- %Desktop%blockwatcher.lnk
- %Desktop%softsoldier.lnk
- %Desktop%TrustSoldier.lnk
- %Desktop%TrustCop.lnk
- %Desktop%SecureFighter.lnk
- %Desktop%secureveteran.lnk
- %Desktop%SecurityFighter.lnk
- %Desktop%TrustWarrior.lnk
- %Desktop%SafetyKeeper.lnk
- %Desktop%QuickHealCleaner.lnk
- %Desktop%systemcop.lnk
- %Desktop%SaveDefense.lnk
- %Desktop%TrustNinja.lnk
- %Desktop%SaveSoldier.lnk
- %Desktop%SaveKeep.lnk
- %Desktop%Winishield.lnk
- %Desktop%WiniBlueSoft.lnk
- %CommonDesktop%SystemFighter.lnk
- %CommonPrograms%SystemFighter
- %Desktop%SystemWarrior.lnk
- %StartMenu%Programs\SystemWarrior
- %StartMenu%Program\SystemWarrior
- %StartMenu%Program\SystemFighter
- %StartMenu%Programs\SystemFighter
- %Desktop%SystemFighter.lnk
- %Desktop%antiaid.lnk
- %CommonDesktop%LinkSafeness.lnk
- %CommonDesktop%SecureKeeper.lnk
- %Desktop%reanti.lnk

## Created Folders

- %ProgramFiles%Innovagest 2000 SL
- %ProgramFiles%Innovagest 2000 SL\WiniGuard
- %CommonPrograms%WiniGuard
- %CommonPrograms%WiniFighter
- %ProgramFiles%WiniFighter
- %CommonPrograms%BlockDefense
- %CommonPrograms%SaveKeeper
- %ProgramFiles%SoftSafeness
- %ProgramFiles%SaveDefender
- %ProgramFiles%SaveArmor
- %CommonPrograms%SaveArmor
- %ProgramFiles%SecuritySoldier
- %CommonPrograms%SecuritySoldier
- %CommonPrograms%SecureWarrior
- %ProgramFiles%SecureWarrior
- %ProgramFiles%SafeFighter
- %ProgramFiles%TrustFighter
- %ProgramFiles%SoftCop
- %ProgramFiles%softveteran
- %CommonPrograms%softveteran
- %ProgramFiles%shieldsafeness
- %CommonPrograms%shieldsafeness
- %ProgramFiles%softstronghold
- %CommonPrograms%softstronghold
- %ProgramFiles%SoftBarrier
- %CommonPrograms%SoftBarrier
- %ProgramFiles%BlockScanner
- %CommonPrograms%BlockScanner
- %ProgramFiles%blockprotector
- %CommonPrograms%blockprotector
- %CommonPrograms%blockdefender
- %ProgramFiles%blockdefender
- %ProgramFiles%blockkeeper
- %CommonPrograms%blockkeeper
- %ProgramFiles%blockwatcher
- %CommonPrograms%blockwatcher
- %ProgramFiles%softsoldier
- %ProgramFiles%TrustSoldier
- %ProgramFiles%TrustCop
- %ProgramFiles%SecureFighter
- %ProgramFiles%secureveteran
- %ProgramFiles%SecurityFighter
- %ProgramFiles%TrustWarrior
- %ProgramFiles%SafetyKeeper
- %ProgramFiles%SaveKeeper
- %ProgramFiles%QuickHealCleaner
- %ProgramFiles%systemcop
- %ProgramFiles%BlockDefense
- %ProgramFiles%SaveDefense
- %ProgramFiles%TrustNinja
- %ProgramFiles%SaveSoldier
- %ProgramFiles%SaveKeep
- %ProgramFiles%Winishield
- %ProgramFiles%WiniBlueSoft
- %CommonPrograms%BlockKeeper
- %CommonPrograms%BlockWatcher
- %CommonPrograms%ShieldSafeness
- %CommonPrograms%SoftStronghold
- %CommonPrograms%SoftVeteran
- %CommonPrograms%SoftCop
- %CommonPrograms%SoftSoldier
- %CommonPrograms%TrustFighter
- %CommonPrograms%TrustSoldier
- %CommonPrograms%SafeFighter
- %CommonPrograms%TrustCop
- %CommonPrograms%SecureFighter
- %CommonPrograms%SecureVeteran
- %CommonPrograms%SecurityFighter
- %CommonPrograms%SaveDefender
- %CommonPrograms%TrustWarrior
- %CommonPrograms%SoftSafeness
- %CommonPrograms%SafetyKeeper
- %CommonPrograms%QuickHealCleaner
- %CommonPrograms%SystemCop
- %CommonPrograms%SaveDefense
- %CommonPrograms%TrustNinja
- %CommonPrograms%SaveSoldier
- %CommonPrograms%SaveKeep
- %CommonPrograms%Winishield
- %CommonPrograms%WiniBlueSoft
- %ProgramFiles%SystemFighter Software
- %ProgramFiles%SystemWarrior Software
- %ProgramFiles%antiaid
- %CommonPrograms%antiaid
- %ProgramFiles%LinkSafeness Software
- %CommonPrograms%LinkSafeness
- %ProgramFiles%SecureKeeper Software
- %CommonPrograms%SecureKeeper
- %ProgramFiles%reanti
- %CommonPrograms%reanti
- %CommonPrograms%softsoldier
- %CommonPrograms%systemcop
- %CommonPrograms%secureveteran

## Registry Entries

- Key: HKEY_CLASSES_ROOT\Interface\{9692BE2F-EB8F-49D9-A11C-C24C1EF734D5}
- Value:
- Data:
- Key: HKEY_CURRENT_USER\software\winiguard
- Key: HKEY_LOCAL_MACHINE\software\microsoft\windows\currentversion\uninstall\winiguard
- Key: HKEY_LOCAL_MACHINE\software\winiguard
- Key: HKEY_LOCAL_MACHINE\software\microsoft\windows\currentversion\run
- Value: winiguard
- Key: HKEY_CURRENT_USER\Software\WinPC Defender
- Key: HKEY_CLASSES_ROOT\Interface\{4B66E1DF-4DE3-4CDA-83B5-11673EADAB0B}
- Key: HKEY_CLASSES_ROOT\TypeLib\{B360243E-09E8-402F-8721-00B6798089AD}
- Key: HKEY_CURRENT_USER\software\WiniBlueSoft
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\WiniBlueSoft
- Key: HKEY_CLASSES_ROOT\CLSID\{39fc2065-c9c7-49cd-8942-44cc2dedc844}
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\Browser Helper Objects\{39fc2065-c9c7-49cd-8942-44cc2dedc844}
- Key: HKEY_CURRENT_USER\software\WiniFighter
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\WiniFighter
- Key: HKEY_CURRENT_USER\software\Winishield
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\Winishield
- Key: HKEY_CURRENT_USER\software\SaveKeep
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SaveKeep
- Key: HKEY_CURRENT_USER\software\SaveSoldier
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SaveSoldier
- Key: HKEY_CURRENT_USER\software\TrustNinja
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\TrustNinja
- Key: HKEY_CURRENT_USER\software\SaveDefense
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SaveDefense
- Key: HKEY_CURRENT_USER\software\BlockDefense
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\BlockDefense
- Key: HKEY_CURRENT_USER\software\QuickHealCleaner
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\QuickHealCleaner
- Key: HKEY_CURRENT_USER\software\SaveKeeper
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SaveKeeper
- Key: HKEY_CURRENT_USER\software\SoftSafeness
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SoftSafeness
- Key: HKEY_CURRENT_USER\software\SaveDefender
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SaveDefender
- Key: HKEY_CURRENT_USER\software\SaveArmor
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SaveArmor
- Key: HKEY_CURRENT_USER\software\SecuritySoldier
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SecuritySoldier
- Key: HKEY_CURRENT_USER\software\SecureWarrior
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SecureWarrior
- Key: HKEY_CURRENT_USER\software\TrustWarrior
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\TrustWarrior
- Key: HKEY_CURRENT_USER\software\TrustCop
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\TrustCop
- Key: HKEY_CURRENT_USER\software\SafeFighter
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SafeFighter
- Key: HKEY_CURRENT_USER\software\TrustSoldier
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\TrustSoldier
- Key: HKEY_CURRENT_USER\software\TrustFighter
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\TrustFighter
- Key: HKEY_CURRENT_USER\Software\SoftVeteran
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SoftVeteran
- Key: HKEY_CURRENT_USER\Software\Microsoft\Windows\CurrentVersion\Run
- Value: SoftVeteran
- Data: C:\Program Files\SoftVeteran Software\SoftVeteran\SoftVeteran.exe -min
- Key: HKEY_CURRENT_USER\Software\ShieldSafeness
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\ShieldSafeness
- Value: ShieldSafeness
- Data: C:\Program Files\ShieldSafeness Software\ShieldSafeness\ShieldSafeness.exe -min
- Key: HKEY_CURRENT_USER\Software\SoftStronghold
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SoftStronghold
- Value: SoftStronghold
- Data: C:\Program Files\SoftStronghold Software\SoftStronghold\SoftStronghold.exe -min
- Key: HKEY_CURRENT_USER\Software\SoftBarrier
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SoftBarrier
- Value: SoftBarrier
- Data: C:\Program Files\SoftBarrier Software\SoftBarrier\SoftBarrier.exe -min
- Key: HKEY_CURRENT_USER\Software\BlockScanner
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\BlockScanner
- Value: BlockScanner
- Data: C:\Program Files\BlockScanner Software\BlockScanner\BlockScanner.exe -min
- Value: dvu4.tmp.exe
- Data: C:\WINDOWS\system32\dvu4.tmp.exe
- Key: HKEY_CURRENT_USER\Software\BlockProtector
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\BlockProtector
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\blockdefender
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\blockdefender
- Value: blockdefender
- Data: C:\Program Files\blockdefender Software\blockdefender\blockdefender.exe -min
- Value: blockprotector
- Data: C:\Program Files\blockprotector Software\blockprotector\blockprotector.exe -min
- Key: HKEY_CURRENT_USER\Software\BlockKeeper
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\BlockKeeper
- Value: BlockKeeper
- Data: C:\Program Files\BlockKeeper Software\BlockKeeper\BlockKeeper.exe -min
- Key: HKEY_CURRENT_USER\Software\blockwatcher
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\blockwatcher
- Value: blockwatcher
- Data: C:\Program Files\blockwatcher Software\blockwatcher\blockwatcher.exe -min
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run
- Value: BlockProtector.exe
- Data: C:\Program Files\BlockProtector Software\BlockProtector\BlockProtector.exe
- Key: HKEY_CLASSES_ROOT\WinInetApp.WinInet
- Key: HKEY_CLASSES_ROOT\WinInetApp.WinInet.1
- Key: HKEY_CURRENT_USER\software\SoftCop
- Key: HKEY_CURRENT_USER\Software\SoftSoldier
- Key: HKEY_CURRENT_USER\software\SecureFighter
- Key: HKEY_CURRENT_USER\Software\SecureVeteran
- Key: HKEY_CURRENT_USER\software\SecurityFighter
- Key: HKEY_CURRENT_USER\software\SafetyKeeper
- Key: HKEY_CURRENT_USER\Software\SystemCop
- Key: HKEY_LOCAL_MACHINE\software\BlockKeeper
- Key: HKEY_LOCAL_MACHINE\software\BlockScanner
- Key: HKEY_LOCAL_MACHINE\software\BlockWatcher
- Key: HKEY_LOCAL_MACHINE\software\SoftBarrier
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\ShieldSafeness
- Key: HKEY_LOCAL_MACHINE\software\SoftStronghold
- Key: HKEY_LOCAL_MACHINE\software\SoftVeteran
- Key: HKEY_LOCAL_MACHINE\software\SoftCop
- Key: HKEY_LOCAL_MACHINE\software\SoftSoldier
- Key: HKEY_LOCAL_MACHINE\software\TrustFighter
- Key: HKEY_LOCAL_MACHINE\software\TrustSoldier
- Key: HKEY_LOCAL_MACHINE\software\SafeFighter
- Key: HKEY_LOCAL_MACHINE\software\TrustCop
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\SecureWarrior
- Key: HKEY_LOCAL_MACHINE\software\SecureFighter
- Key: HKEY_LOCAL_MACHINE\software\SecureVeteran
- Key: HKEY_LOCAL_MACHINE\software\SecuritySoldier
- Key: HKEY_LOCAL_MACHINE\software\SecurityFighter
- Key: HKEY_LOCAL_MACHINE\software\SaveArmor
- Key: HKEY_LOCAL_MACHINE\software\SaveDefender
- Key: HKEY_LOCAL_MACHINE\software\TrustWarrior
- Key: HKEY_LOCAL_MACHINE\software\SoftSafeness
- Key: HKEY_LOCAL_MACHINE\software\SafetyKeeper
- Key: HKEY_LOCAL_MACHINE\software\SaveKeeper
- Key: HKEY_LOCAL_MACHINE\software\QuickHealCleaner
- Key: HKEY_LOCAL_MACHINE\software\SystemCop
- Key: HKEY_LOCAL_MACHINE\software\BlockDefense
- Key: HKEY_LOCAL_MACHINE\software\SaveDefense
- Key: HKEY_LOCAL_MACHINE\software\TrustNinja
- Key: HKEY_LOCAL_MACHINE\software\SaveSoldier
- Key: HKEY_LOCAL_MACHINE\software\SaveKeep
- Key: HKEY_LOCAL_MACHINE\software\Winishield
- Key: HKEY_LOCAL_MACHINE\software\WiniFighter
- Key: HKEY_LOCAL_MACHINE\software\WiniBlueSoft
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SoftCop
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SoftSoldier
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SecureFighter
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SecureVeteran
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SecurityFighter
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SafetyKeeper
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SystemCop
- Key: HKEY_CURRENT_USER\Software\SystemFighter
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SystemFighter
- Value: fbh4E.tmp.exe
- Data: C:\WINDOWS\system32\fbh4E.tmp.exe
- Value: SystemFighter
- Data: "C:\Program Files\SystemFighter Software\SystemFighter\SystemFighter.exe" -min
- Value: setup.exe
- Data: C:\WINDOWS\system32\setup.exe
- Key: HKEY_CURRENT_USER\Software\SystemWarrior
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SystemWarrior
- Value: SystemWarrior
- Data: "C:\Program Files\SystemWarrior Software\SystemWarrior\SystemWarrior.exe" -min
- Key: HKEY_CURRENT_USER\Software\AntiAID
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\AntiAID
- Value: AntiAID
- Data: C:\Program Files\AntiAID Software\AntiAID\AntiAID.exe -min
- Key: HKEY_CURRENT_USER\Software\LinkSafeness
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\LinkSafeness
- Value: LinkSafeness
- Data: C:\Program Files\LinkSafeness Software\LinkSafeness\LinkSafeness.exe -min
- Value: m0suq8wt.exe
- Data: C:\WINDOWS\system32\m0suq8wt.exe
- Key: HKEY_CURRENT_USER\Software\SecureKeeper
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\SecureKeeper
- Value: kxrc7foz.exe
- Data: C:\WINDOWS\system32\kxrc7foz.exe
- Value: SecureKeeper
- Data: C:\Program Files\SecureKeeper Software\SecureKeeper\SecureKeeper.exe -min
- Key: HKEY_CURRENT_USER\Software\REAnti
- Key: HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Uninstall\REAnti
- Value: 7h4jwicw.exe
- Data: C:\WINDOWS\system32\7h4jwicw.exe
- Value: REAnti.exe
- Data: C:\Program Files\REAnti Software\REAnti\REAnti.exe
- Value: SoftSoldier
- Data: C:\Program Files\SoftSoldier Software\SoftSoldier\SoftSoldier.exe -min
- Value: SecureVeteran
- Data: C:\Program Files\SecureVeteran Software\SecureVeteran\SecureVeteran.exe -min

## Related clones and follow-ups

The WiniGuard line spawned dozens of rebrands (often a new name every couple of days in late 2009). Examples and field notes on this blog:

- [IGuardPC](/2009/12/14/iguardpc/) — late-2009 clone with its own install paths
- [The biggest rogue family](/2009/12/15/the-biggest-rogue-family/) — three generations and the ~50-clone count
- [Like clockwork: the next member of the WiniGuard rogue family appears](/2009/12/16/like-clockwork-the-next-member-of-the-winiguard-rogue-family-appears/)
- [WiniGuard clones are coming thick and fast](/2009/12/18/winiguard-clones-are-coming-thick-and-fast/)

Other scareware dossiers from the same period (different families): [SecurityTool](/2009/10/05/securitytool/), [SafetyAntiSpyware](/2009/12/09/safetyantispyware/), [Advanced Virus Remover](/2009/12/10/advanced-virus-remover/), [Data Doctor 2010](/2009/12/18/data-doctor-2010/).
