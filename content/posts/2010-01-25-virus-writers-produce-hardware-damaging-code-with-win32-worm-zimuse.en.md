---
title: Virus Writers Produce Hardware Damaging Code with Win32.Worm.Zimuse
date: 2010-01-25T22:03:00+00:00
layout: single
author_profile: true
url: 2010/01/25/virus-writers-produce-hardware-damaging-code-with-win32-worm-zimuse/
tags:
  - alert
  - malware
lang: en
category: techblog
---
Disguised IQ test combines virus, rootkit and worm &#8212; malicious code for one fatal formula

BitDefender today identified a new e-threat that combines the destructive behavior of a virus with the spreading mechanisms of a worm. There are two known variants of this virus, which enters the computer as a harmless IQ test.

Once executed, the worm creates between seven and eleven copies of itself (depending on the variant) in critical areas of the Windows system.

Win32.Worm.Zimuse.A is an extremely dangerous piece of malware. Unlike average worms, Win32.Worm.Zimuse.A could lead to severe data loss as it overwrites the first 50 KB of the Master Boot Record &#8211; a key zone of the hard disk drive.

In order to execute on each Windows boot-up, the worm sets the following registry entry:

[HKEY\_LOCAL\_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Run]&#8221;Dump&#8221;=&#8221;%programfiles%\Dump\Dump.exe

It also creates two driver files, namely:

%system%\drivers\Mstart.sys and %system%\drivers\Mseu.sys

Since 64-bit versions of Windows Vista and Windows 7 require digitally signed drivers, the worm would fail installing these files.

Unfortunately, in its early stages, this worm makes it nearly impossible for users to know their system has fallen victim to the e-threat. If a certain number of days have elapsed since the infection (40 days for variant A and 20 days for variant B), the computer user receives an error message stating that a problem has occurred due to malicious content in IP packets from a peculiar-looking web address. It then asks the user to recover the system by pressing “OK.” After this message, the next restart causes the computer’s hard disk to become damaged due to the compromised boot sector. To view a video detailing what occurs during an attack by Win32.Worm.Zimuse.A, please click here.

In order to stay safe, download and install an antivirus, antispyware and firewall and keep using them updated always. Users should also employ extra caution when prompted to open files from unfamiliar locations.