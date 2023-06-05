---
title: Defensive Computing
date: 2010-10-22T19:52:00+00:00
layout: single
author_profile: true
url: 2010/10/22/defensive-computing/
tags:
  - Adobe
  - advice
  - PDF
lang: en
category: 
  - techblog
---
[<img title="" border="0" alt="" align="right" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TMHkhS73PnI/AAAAAAAAC2k/6B6Q1Nlff_4/adobe-logo_thumb%5B3%5D.jpg?imgmax=800" width="150" height="150" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TMHkfTreoxI/AAAAAAAAC2g/JqzGGzgydoo/s1600-h/adobe-logo%5B5%5D.jpg)Windows is an attractive platform for the malware writers, in part, because of the sheer number of users. As Microsoft creep towards making their offerings more secure, applications are increasingly becoming the focus for vulnerability exploitation.

Like Windows, Adobe products are a default software choice for most users. The bad guys know this and realize that its profitable to scrutinize their applications for exploitable vulnerabilities and create malware to take advantage of the fact.

Adobe have published a [security advisory](http://www.adobe.com/support/security/advisories/apsa10-04.html) for a critical vulnerability affecting Adobe Shockwave Player 11.5.8.612 and earlier. So far there have been no reports of malware capitalizing on the vulnerability while Adobe work on a fix.

The ubiquitous Adobe Reader has also had its fair share of problems, judging by the fairly [long list](http://www.adobe.com/support/security/#readerwin) of security advisories and updates.

In an effort to contain malicious PDFs, Adobe have previewed [Adobe Reader X](http://blogs.adobe.com/adobereader/2010/10/announcing-adobe-reader-x.html). I'm looking forward to checking out the [protected mode](http://blogs.adobe.com/asset/2010/07/introducing-adobe-reader-protected-mode.html) where Adobe Reader is fenced off from the operating system so that even if a malicious PDF is launched, its unable to “reach” the operating system to make changes to it.

This is a fairly realistic and pragmatic approach from Adobe to addressing the problem of malware that exploits vulnerabilities within Reader. Adobe accept their applications will continue to be a target for malware writers and are doing something interesting and, from the user's perspective, innovative about it.

However, if an application is on the malware writers' radar, there could be another way to handle the problem. Many computer users are aware of the volume of malware that affects Windows and have made the switch to alternative more secure, but also less popular operating systems to try to minimize the likelihood of being the victim of a malware attack. If the majority of malware attacks focus on Windows, for some, it's a no-brainer to make the switch to an alternative like Ubuntu or Mac OSX.

The same approach can be applied to the applications on your Windows PC. There are alternative PDF viewers to Adobe Reader in the form of open source, non-ad supported and free applications – here's a [list](http://en.wikipedia.org/wiki/List_of_PDF_software#Microsoft_Windows).

A final word of advice: whatever PDF viewer you use, check its help file to see how to disable JavaScript

_Taken from ‘Lavasoft Blog’_