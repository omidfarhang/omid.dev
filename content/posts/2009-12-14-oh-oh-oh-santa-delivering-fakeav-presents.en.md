---
title: “OH” “OH” “OH”, Santa Delivering FakeAV Presents
date: 2009-12-14T13:09:00+00:00
layout: single
author_profile: true
url: 2009/12/14/oh-oh-oh-santa-delivering-fakeav-presents/
shortlink: https://g.omid.dev/1RjHE4D
tags:
  - Facebook
  - malware
  - phishing
  - scam
lang: en
category: 
  - techblog
---
Following on from the latest Captcha techniques used by the W32/Koobface worm, it seems that the malware authors have turned to Santa for help to deliver it’s nasty surprise which awaits Facebook users. The infection drops other trojans such as FakeAlert and leaves the user renderless.

It all begins with a post on a user’s Facebook Wall. If the user clicks on the link, they are presented with a fake video player with a Christmas greeting as shown below

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/SyYxMuUPA6I/AAAAAAAAAV8/OkWoCZUhW_k/s640/koob1.gif)](http://2.bp.blogspot.com/_vaUVXcmC3OI/SyYxMuUPA6I/AAAAAAAAAV8/OkWoCZUhW_k/s1600-h/koob1.gif)

A fake message states that in order to view the video the user must download the latest version of Adobe Flash. If the user clicks on ‘install’, instead of the flash player being downloaded, it runs a variant of W32/Koobface on the user’s system. Furthermore to this, the user’s browser is redirected to more harmful sites harboring malicious files which are automatically installed and exceuted on the infected system.  
Amongst the malicious files that are downloaded and executed includes FakeAlert trojans. Like its predecessors, a fake message is displayed stating that the system is infected with various viruses and that the user requires to buy a product to remove them.

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyYxZvE4haI/AAAAAAAAAWE/1D9ae2BboCI/s640/koob3.gif)](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyYxZvE4haI/AAAAAAAAAWE/1D9ae2BboCI/s1600-h/koob3.gif)

Users are advised to avoid installing anything that results from clicking on video links relating to any Christmas greetings.