---
title: Avira AV update hangs systems
date: 2012-05-15T14:46:00+00:00
layout: single
author_profile: true
url: 2012/05/15/avira-av-update-hangs-systems/
tags:
  - advice
  - Avira
  - News
  - report

categories:
  - TechBlog
---
[**H-Online Says:**](http://www.h-online.com/security/news/item/Avira-AV-update-hangs-systems-1575974.html)

![avira_logo_red_rgb (2)](http://lh5.ggpht.com/-7eHRK6IOMGc/T7JlKIRe20I/AAAAAAAAF-k/7kXaHLSMbYs/s1600-h/avira_logo_red_rgb%252520%2525282%252529%25255B3%25255D.jpg)

A faulty update for [Avira](http://www.avira.com/en/index)‘s paid-for anti-virus software blocks harmless processes and may in some cases stop computers from booting. The update results in the ProActiv behavioral monitoring component becoming oversensitive in its treatment of executable files. 

According to [user reports](http://forum.avira.com/wbb/index.php?page=Thread&threadID=144883&pageNo=1), ProActiv blocks trusted system processes such as cmd.exe, rundll32.exe, taskeng.exe, wuauclt.exe, dllhost.exe, iexplore.exe, notepad.exe and regedit.exe. In some cases this results in Windows failing to boot properly. It also appears to be blocking non-OS applications such as Microsoft Office, the Opera web browser and Google's Updater program. 

All versions which include the ProActiv behavioral monitoring component are affected, including Avira Antivirus Premium 2012 and the enterprise version; only 32-bit systems are affected, as ProActiv doesn't currently support 64-bit operating systems. On the Avira forum, an employee of a company which runs Avira on one hundred computers [complains](http://forum.avira.com/wbb/index.php?page=Thread&postID=1179702#post1179702) that, “This update has been pretty catastrophic. The whole company ground to a standstill.” 

![Avira_Professional_Security_ProActiv](http://lh3.ggpht.com/-GyvL3f3JqLA/T7JlSx8xFQI/AAAAAAAAF-0/PGm0r2T5w8g/s1600-h/Avira_Professional_Security_ProActiv%25255B4%25255D.png)

In view of the arbitrariness with which the behavioral monitoring component is blocking files, users who have installed the update are advised to disable ProActiv. To do so, access Avira's settings, activate the Expert mode using the switch on the left and uncheck ‘Enable Avira ProActiv' under ‘Realtime Protection', ‘ProActiv'. According to user reports, if Windows is having difficulty booting, this can be fixed in some cases by starting in safe mode and then deactivating ProActiv. 

In a statement to The H's associates at heise Security, Avira confirmed the problem and said that its developers are currently working on an automatic update to resolve the bug. The potential scale of the bug is huge – according to Avira, the faulty update has already been downloaded more than 70 million times; this figure includes those running the free version of Avira which is not affected. The company has now stopped distributing the update. 

Source: [Heise Security](/2012/05/avira-av-update-hangs-systems.html) 

**Update:** [Avira update fixes service pack bug](/2012/05/avira-update-fixes-service-pack-bug.html)