---
title: New Koobface variant saves researchers time from analysis
date: 2010-01-16T00:28:00+00:00
layout: single
author_profile: true
url: 2010/01/16/new-koobface-variant-saves-researchers-time-from-analysis/
tags:
  - Facebook
  - malware
  - report
  - Twitter
lang: en
categories: 
  - techblog
---
Researchers at McAfee labs monitor Koobface activities 24/7 via custom honeypots and while reviewing one such update we noticed a variant that had debug/log features. Unlike the traditional captcha breaking technique to create new accounts, this variant of the worm converts the infected machine to a bot.

When we analysed the malware trapped in our botnet, we found that this variant of Koobface has a special feature for logging all activities carried out during the infection process in a log file . Log file is created under system root with date and time stamp for eg, C:\fb_reg20090612.log.

Activities logged by the worm:

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S1EAVBo2CoI/AAAAAAAAApc/CQsUkVKWfBw/s640/log.jpg)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S1EAVBo2CoI/AAAAAAAAApc/CQsUkVKWfBw/s1600-h/log.jpg)

Before every entry in the log file, it queries the thread id and process id and adds it as prefix. The worm also logs the for iexplore.exe version. It then sends a query to www.google.com to ensure that there is active internet connection in the system , this process is also logged as “check inet” in the log file. Once the acknowledgement for the query is received it confirms that the internet connection is available and logs this in the log file as “inet ok”.

This particular variant of Koobface worm contains an encrypted list of compromised websites. It selects a random URL on every execution and sends a query to check if it is a valid domain. Upon getting response from the site, it posts a request to that site again to download its latest variant.

Response received:

#BLACKLABEL

RESET

UPDATE|http://[Removed]/.sys/?getexe=fb.79.exe

EXIT

Koobface worm then requests for some more information from the compromised site like Login Name, Passwords, Birthday-Year, Birthday-Month, Birthday-day etc., which is used to login into Facebook account.

The screenshot clearly shows the request sent and response:

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S1EAVyJizcI/AAAAAAAAApk/hCE3nSaqxCE/s640/Sniffer.jpg)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S1EAVyJizcI/AAAAAAAAApk/hCE3nSaqxCE/s1600-h/Sniffer.jpg)

The worm saves the response received in another log file as below. It then tries to log on to the Facebook account using the logs. On successfull login it tries sending friend requests or scan friend lists. In case the credentials are not accepted, it terminates itself.

ThreadID:1664 ProcID: 1916 #BLACKLABEL

ThreadID:1664 ProcID: 1916 SOFT|ADD

ThreadID:1664 ProcID: 1916 LOGIN|as9:76Aipeim0fsm

ThreadID:1664 ProcID: 1916 PASS|zjnez363

ThreadID:1664 ProcID: 1916 ID|20589

ThreadID:1664 ProcID: 1916 BIRTHDAY-YEAR|1975

ThreadID:1664 ProcID: 1916 BIRTHDAY-MONTH|10

ThreadID:1664 ProcID: 1916 BIRTHDAY-DAY|15

ThreadID:1664 ProcID: 1916 LOGS|1

I have observed the same behavior in Twitter as well. I suggest not to click on links and other requests from unknown users and be careful with unusual messages from friends.