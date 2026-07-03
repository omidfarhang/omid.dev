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
  - Security

categories:
  - TechBlog
---
Basically, the rogue antispy was directing the victim to a genuine Microsoft address, but was modifying the html on the fly as it came back from the real Microsoft page. It made it read that Microsoft was recommending that the victim should buy the rogue. That’s a pretty good trick that will catch a lot of folks, and it reminded us of another one that we frequently see.

It works like this… The victim attempts to reach Microsoft, or receives a link like <http://go.microsoft.com/?linkid=9480113> and if you go there on a normal computer, you see a page like this (click to enlarge)…

[![](/images/2009/12/Image001.png)](/images/2009/12/Image001-81edfb06.png)

But, if you go there (or any Microsoft address) on a hacked computer, you see this…

[![](/images/2009/12/Image003.png)](/images/2009/12/Image003-067fae2c.png)

Instead of going to a Microsoft address, you are taken to 91.212.127.227, which is not owned by Microsoft, but by someone in the United Kingdom…

[![](/images/2009/12/Image005.png)](/images/2009/12/Image005-29534741.png)

The question is how are they doing it?

The answer is that they’ve hacked the host’s file on the victim’s computer. All Microsoft queries are redirected to the hacked computer. If the user is paying attention, they’ll see the numeric ip address instead of the Microsoft address, but if they are a little unsophisticated, all they’ll know is that they put in Microsoft.com, and that’s what they got.

These two tricks underscore just how tricky the Bad Guys are. Who would have thought they’d modify the html on the fly, and that they could mess with urls like Microsoft.com, but they do.