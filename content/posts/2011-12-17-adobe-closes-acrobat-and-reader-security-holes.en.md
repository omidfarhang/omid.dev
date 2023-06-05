---
title: Adobe closes Acrobat and Reader security holes
date: 2011-12-17T19:09:00+00:00
layout: single
author_profile: true
url: 2011/12/17/adobe-closes-acrobat-and-reader-security-holes/
tags:
  - Adobe
  - report
  - review
  - Updates
  - Vulnerability
lang: en
categories: 
  - techblog
---
![](http://1.bp.blogspot.com/-XpllBUvjElA/TuzhGgTYqOI/AAAAAAAAEWQ/6-eeLKvIM40/s1600/adobe+reader.jpg)

[The H-Online:](http://www.h-online.com/) The first patches for the zero-day flaw in Adobe's Acrobat and Reader applications, which the company confirmed was being exploited in the wild, have been [released](http://www.adobe.com/support/security/bulletins/apsb11-30.html). The initial problem was caused by a memory corruption when processing Universal 3D (U3D) files, which could allow attackers to potentially take control of an affected system. The patches released also address a newly revealed critical flaw (CVE-2011-4369) which can cause memory corruption when processing Product Representation Compact (PRC) 3D files.

Adobe has now released updates for Adobe Reader 9.x for Windows and Acrobat 9.x for Windows. The updates can be installed by selecting Help ➤Check for Updates in either application. Manual downloads for [Reader 9.4.7](http://www.adobe.com/support/downloads/detail.jsp?ftpID=5319) and [Acrobat 9.4.7](http://www.adobe.com/support/downloads/detail.jsp?ftpID=5320) are also available. Adobe is not releasing updates for Reader X or Acrobat X at this time because it says the defensive technologies added to those products stops any exploitation of the flaws. It will be releasing fixed versions of those applications as part of the next quarterly security update on 10 January 2012, along with updates for the Unix and Mac OS X versions.

Adobe suggests that users of Reader and Acrobat X should verify the defensive mechanisms are enabled. In Acrobat X a user should go to Edit ➤ Preferences➤ Security (Enhanced) and make sure that “Enable Enhanced Security” is checked along with either “Files from potentially unsafe locations” or “All files”. Adobe Reader X users should go to Edit ➤ Preferences ➤ General and ensure that “Enable Protected Mode at startup” is checked.
