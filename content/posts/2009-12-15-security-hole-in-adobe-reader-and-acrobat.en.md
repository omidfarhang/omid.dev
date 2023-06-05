---
title: Security hole in Adobe Reader and Acrobat
date: 2009-12-15T19:43:00+00:00
layout: single
author_profile: true
url: 2009/12/15/security-hole-in-adobe-reader-and-acrobat/
shortlink: https://g.omid.dev/1TPFU9a
tags:
  - Adobe
  - alert
  - Vulnerability
lang: en
categories: 
  - techblog
---
[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/SyffL-JURJI/AAAAAAAAAWM/pANPmriBXO4/s320/acrobat_logo.png)](http://1.bp.blogspot.com/_vaUVXcmC3OI/SyffL-JURJI/AAAAAAAAAWM/pANPmriBXO4/s1600-h/acrobat_logo.png)

Adobe is currently investigating a new security hole in Reader and Acrobat. Cybercriminals are currently spamming emails with prepared documents which lead to an infection of the computer with malware.

The PDF document abuses a buffer overflow in a new place within the Adobe programs. There is a JavaScript object included in the PDF which checks the Reader Version – the exploit works with Adobe Reader starting at version 8. The code it injects downloads malware which it stores in the file “winver32.exe” in the Windows directory. This file drops 3 further files which Avira detects as BDS/Ientlcp.A, TR/Agent.faa and TR/Agent.HO.

Anyhow users are best advised to not open PDF files they receive unexpectedly until Adobe provides Updates for Reader and Acrobat.

Note From Adobe:

> This afternoon, Adobe received reports of a vulnerability in Adobe Reader and Acrobat 9.2 and earlier versions being exploited in the wild (CVE-2009-4324). We are currently investigating this issue and assessing the risk to our customers. We will provide an update as soon as we have more information.