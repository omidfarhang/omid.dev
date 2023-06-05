---
title: "Targeted Attack using &quot;Operation Aurora&quot; as the lure"
date: 2010-01-21T20:47:00+00:00
layout: single
author_profile: true
url: 2010/01/21/targeted-attack-using-operation-aurora-as-the-lure/
tags:
  - Adobe
  - alert
  - Vulnerability
lang: en
category: 
  - techblog
---
Now here's an interesting turn of events.

In the middle of all the attention to the “Operation Aurora” attacks, we're now seeing new targeted attacks that are using this very event as the lure to get the targets to open a malicious attachment!

Here's the email we saw:

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S1i2Fg2DmzI/AAAAAAAAArs/BCP248WbOxQ/s640/mail.JPG)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S1i2Fg2DmzI/AAAAAAAAArs/BCP248WbOxQ/s1600-h/mail.JPG)

The attachment Chinese cyberattack.pdf (md5: 238ecf8c0aee8bfd216cf3cad5d82448) is a PDF file which exploits the CVE-2009-4324 vulnerability in Adobe Reader (again, this is the one which was patched last week).

The exploit drops and runs a backdoor called Acrobat.exe (md5: 72170fc42ae1ca8a838843a55e293435).