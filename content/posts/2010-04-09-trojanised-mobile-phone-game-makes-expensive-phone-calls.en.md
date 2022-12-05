---
title: Trojanised Mobile Phone Game Makes Expensive Phone Calls
date: 2010-04-09T23:26:00+00:00
layout: single
author_profile: true
url: 2010/04/09/trojanised-mobile-phone-game-makes-expensive-phone-calls/
tags:
  - advice
  - Game
  - games
  - malware
  - report
  - review
lang: en
category: techblog
---
We have received reports of a malicious Windows Mobile game that creates significant phone bills to affected users. 

The game in question is called **3D Anti-terrorist action**, and it's manufactured by Beijing Huike Technology in China. 

[![3dat_5](http://lh5.ggpht.com/_vaUVXcmC3OI/S7-wI9sKF0I/AAAAAAAAB4A/LW2lL7T4DVo/3dat_5_thumb%5B3%5D.png?imgmax=800 "3dat_5")](http://lh4.ggpht.com/_vaUVXcmC3OI/S7-wEtNuLvI/AAAAAAAAB38/UZlW2fQ4Hms/s1600-h/3dat_5%5B5%5D.png) 

The game itself is a 3D first-person shooter.

[![3dat_anim](http://lh6.ggpht.com/_vaUVXcmC3OI/S7-wQ4jX8HI/AAAAAAAAB4I/1dBps-PjoFo/3dat_anim_thumb%5B2%5D.gif?imgmax=800 "3dat_anim")](http://lh4.ggpht.com/_vaUVXcmC3OI/S7-wMx29WaI/AAAAAAAAB4E/En2DH7Pv3Uw/s1600-h/3dat_anim%5B4%5D.gif) 

Apparently some Russian malware author took the game and trojanized it. Then he uploaded the trojanized version to several Windows Mobile freeware download sites.

Quite quickly people started reporting that the phone was making expensive calls on it's own.

Here's an example of a thread on the [XDA-Developers forum](http://forum.xda-developers.com/showthread.php?t=650393&page=1):

[![3dat_7](http://lh3.ggpht.com/_vaUVXcmC3OI/S7-wXHYzdDI/AAAAAAAAB4Q/dDOsP6I2lj8/3dat_7_thumb%5B2%5D.png?imgmax=800 "3dat_7")](http://lh6.ggpht.com/_vaUVXcmC3OI/S7-wS4czp5I/AAAAAAAAB4M/IMoa8XBD4zw/s1600-h/3dat_7%5B4%5D.png) 

When analyzing the code of the trojanized game, it's easy to see how it initiates several phone calls and waits for the calls to proceed. The calls are billed by minute.

[![3d_antiterrorist](http://lh5.ggpht.com/_vaUVXcmC3OI/S7-wbt9r4SI/AAAAAAAAB4Y/Yr0-VPhduDY/3d_antiterrorist_thumb%5B2%5D.png?imgmax=800 "3d_antiterrorist")](http://lh4.ggpht.com/_vaUVXcmC3OI/S7-wZPWo2UI/AAAAAAAAB4U/07MgaWGFsaU/s1600-h/3d_antiterrorist%5B4%5D.png) 

But how do such international premium-rate numbers work? 

It turns out there are several companies that make all of their money by offering expensive international premium rate numbers in faraway countries. Go figure. 

[![maxtis](http://lh3.ggpht.com/_vaUVXcmC3OI/S7-wiRHy0TI/AAAAAAAAB4g/94x45BO8eFA/maxtis_thumb%5B8%5D.png?imgmax=800 "maxtis")](http://lh3.ggpht.com/_vaUVXcmC3OI/S7-wfM0XP-I/AAAAAAAAB4c/M96pkVIKg4M/s1600-h/maxtis%5B10%5D.png)