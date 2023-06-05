---
title: Security Advisory for Adobe Flash Player, Adobe Reader and Acrobat
date: 2010-10-29T12:58:00+00:00
layout: single
author_profile: true
url: 2010/10/29/security-advisory-for-adobe-flash-player-adobe-reader-and-acrobat/
tags:
  - Adobe
  - advice
  - security
  - Vulnerability
lang: en
category: 
  - techblog
---
[<img title="" border="0" alt="" align="right" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TMq990s4SMI/AAAAAAAAC-k/K5cqSz3qejg/adobe-logo_thumb%5B7%5D.jpg?imgmax=800" width="150" height="150" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TMq95bVLgLI/AAAAAAAAC-g/kEyx90tEy8M/s1600-h/adobe-logo%5B5%5D.jpg)Adobe have published [details](http://www.adobe.com/support/security/advisories/apsa10-05.html) of a critical vulnerability the following applications.

Adobe Flash Player 10.1.85.3 and earlier versions  
Adobe Reader 9.4 and earlier 9.x versions  
Adobe Acrobat 9.4 and earlier 9.x versions

The vulnerability could cause a crash and potentially allow an attacker to take control of the affected system.

There are reports that this vulnerability is being actively exploited in the wild against Reader and Acrobat 9.x. Adobe is not currently aware of attacks targeting Flash Player.

Adobe plan to provide an update to Flash on Nov 9 2010 and for Acrobat and Reader on Nov 15 2010.

Until then, the following mitigtation procedure is recommended by Adobe:

Deleting, renaming, or removing access to the authplay.dll file that ships with Adobe Reader and Acrobat 9.x mitigates the threat for those products, but users will experience a non-exploitable crash or error message when opening a PDF file that contains Flash (SWF) content.

The authplay.dll that ships with Adobe Reader and Acrobat 9.x for Windows is typically located at C:\Program Files\Adobe\Reader 9.0\Reader\authplay.dll for Adobe Reader or C:\Program Files\Adobe\Acrobat 9.0\Acrobat\authplay.dll for Acrobat.