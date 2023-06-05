---
title: Critical vulnerabilities closed by Winamp update
date: 2012-06-23T20:29:00+00:00
layout: single
author_profile: true
url: 2012/06/23/critical-vulnerabilities-closed-by-winamp-update/
tags:
  - security
  - software
  - Updates
lang: en
categories: 
  - techblog
---
<a href="http://lh3.ggpht.com/-bGFP5WLafPA/T-YgDCDk9rI/AAAAAAAAGWA/ukDr1NYb91A/s1600-h/winamp_logo200%25255B2%25255D.png" target="_blank"><img title="winamp_logo200" border="0" alt="winamp_logo200" align="right" src="http://lh5.ggpht.com/-VMN_mg-ggdw/T-YgEjjsLQI/AAAAAAAAGWI/YcMGskGwbKk/winamp_logo200_thumb.png?imgmax=800" width="200" height="46" /></a>With the [release](http://forums.winamp.com/showthread.php?t=345684) of version 5.63 of [Winamp](http://www.winamp.com/media-player), Nullsoft, a division of AOL Music, has eliminated four critical security vulnerabilities in the media player. Three of these were heap-based buffer overflows in Winamp's bmp.w5s component that could have been exploited by an attacker to execute arbitrary code on a victim's system. 

For an attack to be successful, a user must first open a specially crafted AVI file. It has been confirmed that the vulnerability affects version 5.622; other builds may also be affected. The update also addresses unspecified errors in the _in_mod.dll_ module that could have been used to corrupt memory and could possibly result in arbitrary code being executed. Upgrading to Winamp 5.63, specifically build 3234 (5.6.3.3234), fixes these problems. 

More details about Winamp 5.63, including non-security related changes and download links, are given in the [forum release announcement](http://forums.winamp.com/showthread.php?t=345684) and the [version history](http://www.winamp.com/help/Version_History). At the time of writing, the [official download page](http://www.winamp.com/media-player/en) still lists Winamp 5.623 as the current stable version. 

[http://h-online.com/-1624345](http://h-online.com/-1624345 "http://h-online.com/-1624345")