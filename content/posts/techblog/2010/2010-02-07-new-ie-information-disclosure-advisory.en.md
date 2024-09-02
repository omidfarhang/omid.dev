---
title: New IE Information Disclosure Advisory…
date: 2010-02-07T21:46:00+00:00
layout: single
author_profile: true
url: 2010/02/07/new-ie-information-disclosure-advisory/
tags:
  - alert
  - Internet Explorer
  - Microsoft
  - Vulnerability
lang: en
categories: 
  - techblog
---
Microsoft has announced in [Advisory (980088)](http://www.microsoft.com/technet/security/advisory/980088.mspx) that there has been a [publicly disclosed vulnerability](http://www.coresecurity.com/content/internet-explorer-dynamic-object-tag) in Internet Explorer, versions 5 through 8. Users not running [Internet Explorer in Protected Mode](http://windows.microsoft.com/en-GB/windows-vista/What-does-Internet-Explorer-protected-mode-do) are at risk of having information, in files with predictable names, accessed by attackers. This vulnerability cannot be exploited to [execute remote code](http://en.wikipedia.org/wiki/Remote_code_execution) or used for a [denial-of-service](http://en.wikipedia.org/wiki/Denial_of_service) attack.

The largest group of users at risk are Windows XP users running IE without Protected Mode enabled. Internet Explorer on Vista and Windows 7 has Protected Mode enabled by default.

Though no patch exists at this time, users can protect themselves by simply enabling Protected Mode in Internet Explorer.

Ars Technica puts it this way: [Microsoft warns of IE flaw, turns PC into public file server](http://arstechnica.com/microsoft/news/2010/02/microsoft-warns-of-ie-flaw-affecting-windows-xp-users.ars). That doesn't sound very good, does it?

Microsoft Support has a [Fix it for me](http://support.microsoft.com/kb/980088#FixItForMe) tool available.