---
title: "Sandboxed Flash Player for Firefox: Adobe Flash update closes several critical holes"
date: 2012-06-09T12:53:00+00:00
layout: single
author_profile: true
url: 2012/06/09/sandboxed-flash-player-for-firefox-adobe-flash-update-closes-several-critical-holes/
tags:
  - Adobe
  - flash player
  - security
  - software
  - Updates
lang: en
category: techblog
---
<a href="http://lh4.ggpht.com/-RAspI1MLoAs/T9NASlqeg9I/AAAAAAAAGOA/zfLZo3iz0nA/s1600-h/Flash_Logo_b_80%25255B4%25255D.png" target="_blank"><img title="Flash_Logo_b_80" border="0" alt="Flash_Logo_b_80" align="right" src="http://lh6.ggpht.com/-ZAkaFlQZJzE/T9NAVbUpWsI/AAAAAAAAGOI/4xEsUqkpzuE/Flash_Logo_b_80_thumb%25255B2%25255D.png?imgmax=800" width="80" height="80" /></a>The H-Online: Adobe has [announced](http://www.adobe.com/support/security/bulletins/apsb12-14.html) the release of an update for Flash Player on Windows, Mac, Linux, Android 3.x and 4.x, and within its own AIR runtime. The update addresses several critical vulnerabilities which involve memory corruption, stack overflows, integer overflows, security being bypassed, null dereferencing and binary planting (DLL hijacking). All, except the security bypass, could lead to code execution. 

The updates also include a number of [security enhancements](http://blogs.adobe.com/asset/2012/06/flash-player-11-3-delivers-additional-security-capabilities-for-mac-and-firefox-users.html) on various platforms. The Windows version of Flash Player now offers a production version of &#8220;[Flash Player Protected Mode for Firefox](http://blogs.adobe.com/asset/2012/06/inside-flash-player-protected-mode-for-firefox.html)&#8221; which brings a sandbox to the running of Flash, making it harder for attackers to get at other processes. 

On the Mac, Adobe has included silent background updating for Flash. A daemon is launched every hour to check for updates until it gets a response from Adobe's servers; once a response has been obtained, it then waits 24 hours before checking again. If an update is available it is silently installed, but users can override that behavior from the Flash Player preferences (found within the OS X System Preferences). Adobe adds that it has also now signed Flash Player with its Apple Developer ID, ready for Mac OS X 10.8 (&#8220;Mountain Lion&#8221;) and its new [Gatekeeper](http://www.h-online.com/news/item/Apple-previews-OS-X-10-8-with-Gatekeeper-Update-1436172.html) feature. 

Flash Player on Windows and Macintosh should be updated to version 11.3.300.257 and on Linux to 11.2.202.236; all earlier versions on the respective operating systems are vulnerable. The desktop updates are available from Adobe's [Flash download](http://get.adobe.com/flashplayer/) or [Flash distribution](http://www.adobe.com/products/flashplayer/distribution3.html) pages. For Android 4.x, users should update to version 11.1.115.9, and for Android 3.0, 11.1.111.10; these updates are available from the [Google Play](https://play.google.com/store/apps/details?id=com.adobe.flashplayer&hl=en) store. Adobe AIR should be updated to version 3.3.0.3610 from the [AIR Download Center](http://get.adobe.com/air/) on Windows and Macintosh, and from the [Google Play](https://play.google.com/store/apps/details?id=com.adobe.air) store on Android. Google Chrome users should see an update to version 19.0.1084.56 of the browser which [includes the Flash update](http://googlechromereleases.blogspot.com/2012/06/stable-channel-update_08.html). 

[http://h-online.com/-1614700](http://h-online.com/-1614700 "http://h-online.com/-1614700")