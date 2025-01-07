---
title: Consoles for old games come with new malcode
date: 2010-03-12T14:44:00+00:00
layout: single
author_profile: true
url: 2010/03/12/consoles-for-old-games-come-with-new-malcode/
tags:
  - Hijack
  - malware
  - report
  - scam
lang: en
categories: 
  - TechBlog
---
Be on the lookout for websites offering up “free applications” which come with a nasty sting in the tail. Here’s a typical example: Appzkeygen(dot)com

If you like videogame consoles, you may be a fan of emulators (programs that ape long dead consoles, allowing you to play old games on your PC – we’ll avoid the murky legal minefield that comes with this practice and instead focus on the malware).

Below is a Playstation 2 emulator – no really, it is. Would they lie to you?

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S5pLXIYNv1I/AAAAAAAABQ0/7cgT6MkDVJc/s400/fkps22.jpg)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S5pLXIYNv1I/AAAAAAAABQ0/7cgT6MkDVJc/s1600-h/fkps22.jpg)

Probably best not to answer that question.

Download and run any of the above files – all hosted at movieutilitesonline(dot)com – and you’ll probably be wondering where the alleged emulator is that is “by far superior to all other PS2 Emulators released before it.”

A pair of files will be dropped onto your PC, including a randomly named executable in the Windows directory and xpysys.dll in your System32 Folder. You’ve actually wound up with Trojan-Downloader.Win32.CodecPack.2GCash.Gen, which is – as you’ve probably guessed from the name – a Trojan downloader.

In some cases, people have reported this particular attack resulting in rogue antivirus appearing on the compromised system – however, during testing nothing was downloaded onto the PC. This doesn’t mean it won’t happen, of course – and you’ll still have the downloader onboard. Trojan-Downloader.Win32.CodecPack.2GCash.Gen has been used in everything from fake codec scams to rogue AV hijacks in previous months, and is probably going to stick around for quite some time.