---
title: Microsoft Hack
date: 2009-12-10T16:12:00+00:00
layout: single
author_profile: true
url: 2009/12/10/microsoft-hack/
shortlink: https://g.omid.dev/1VloUYG
tags:
  - hack
  - Microsoft
  - phishing
  - scam
lang: en
category: 
  - techblog
---
Basically, the rogue antispy was directing the victim to a genuine Microsoft address, but was modifying the html on the fly as it came back from the real Microsoft page. It made it read that Microsoft was recommending that the victim should buy the rogue. That’s a pretty good trick that will catch a lot of folks, and it reminded us of another one that we frequently see.

It works like this… The victim attempts to reach Microsoft, or receives a link like <http://go.microsoft.com/?linkid=9480113> and if you go there on a normal computer, you see a page like this (click to enlarge)…

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyEV3J3zzwI/AAAAAAAAAT4/rXPoS1IhU4I/s640/Image001.png)](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyEV3J3zzwI/AAAAAAAAAT4/rXPoS1IhU4I/s1600-h/Image001.png)

But, if you go there (or any Microsoft address) on a hacked computer, you see this…

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyEV_cS-V8I/AAAAAAAAAUA/f1be1cXP-xs/s640/Image003.png)](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyEV_cS-V8I/AAAAAAAAAUA/f1be1cXP-xs/s1600-h/Image003.png)

Instead of going to a Microsoft address, you are taken to 91.212.127.227, which is not owned by Microsoft, but by someone in the United Kingdom…

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/SyEWDePzQrI/AAAAAAAAAUI/NtRQb-8R6IM/s640/Image005.png)](http://4.bp.blogspot.com/_vaUVXcmC3OI/SyEWDePzQrI/AAAAAAAAAUI/NtRQb-8R6IM/s1600-h/Image005.png)

The question is how are they doing it?

The answer is that they’ve hacked the host’s file on the victim’s computer. All Microsoft queries are redirected to the hacked computer. If the user is paying attention, they’ll see the numeric ip address instead of the Microsoft address, but if they are a little unsophisticated, all they’ll know is that they put in Microsoft.com, and that’s what they got.

These two tricks underscore just how tricky the Bad Guys are. Who would have thought they’d modify the html on the fly, and that they could mess with urls like Microsoft.com, but they do.