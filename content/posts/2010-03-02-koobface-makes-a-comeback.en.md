---
title: KOOBFACE Makes a Comeback
date: 2010-03-02T23:42:00+00:00
layout: single
author_profile: true
url: 2010/03/02/koobface-makes-a-comeback/
tags:
  - Facebook
  - phishing
  - scam
  - social networking
  - spam
  - YouTube
lang: en
category: 
  - techblog
---
A new KOOBFACE variant is again making the rounds in the social-networking scene. According to Trend Micro researcher, Norman Ingal, the malware employs Facebook’s Private Message feature to proliferate.

The threat arrives as a Facebook private message that does not bear a subject but contains a supposed link to a YouTube video. Taking a closer look at the link, however, indicates that it is not an authentic YouTube link as in previous attacks.

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S42aD59p8kI/AAAAAAAABGs/V-jpg4FimI8/s640/022510_KOOBFACEPM1.gif)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S42aD59p8kI/AAAAAAAABGs/V-jpg4FimI8/s1600-h/022510_KOOBFACEPM1.gif)

Users who are tricked into clicking the link are redirected to other pages until they finally end up at a spoofed YouTube site called YuoTube.

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S42aFfEIu4I/AAAAAAAABG0/rtvVj7l6hNA/s640/022510_KOOBFACEPM2.gif)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S42aFfEIu4I/AAAAAAAABG0/rtvVj7l6hNA/s1600-h/022510_KOOBFACEPM2.gif)

Similar to previously featured KOOBFACE-related attacks, users were asked to install a rouge software to play the said video, an Adobe Flash Player file, which in reality, is a worm detected by Trend Micro as WORM_KOOBFACE.IT.

WORM_KOOBFACE.IT is notable for several reasons:

  * It connects to specific malicious sites to receive commands and executes these on affected systems.
  * It connects to malicioius sites and downloads other malware, namely, TROJ\_AGENTT.EA and WORM\_KOOBFCE.SMM.
  * It searches for social-networking-related cookies and connects to these using saved login sessions. It then navigates through users’ pages to search for their friends. Once found, it sends an HTTP POST request to a remote server, which then replies with data containing the actual message that the worm will then spread.

Users are advised to think twice before clicking embedded links in messages. Double-checking the legitimacy of URLs also help.