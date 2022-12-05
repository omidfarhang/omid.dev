---
title: "Follow up: Hacker Gains Access To WordPress.com Servers, Site Source Code Exposed"
date: 2011-04-13T23:18:00+00:00
layout: single
author_profile: true
url: 2011/04/13/follow-up-hacker-gains-access-to-wordpress-com-servers-site-source-code-exposed/
tags:
  - attack
  - hack
  - news
  - report
  - security
  - WordPress
lang: en
category: techblog
---
Follow up from: [Hacker Gains Access To WordPress.com Servers](http://boelectronic.blogspot.com/2011/04/hacker-gains-access-to-wordpresscom.html)

[![](http://1.bp.blogspot.com/-M4hHNzGu-nk/TaXbdZIuHBI/AAAAAAAAD1Y/Zu38oSLhxAg/s200/wordpress.png)](http://1.bp.blogspot.com/-M4hHNzGu-nk/TaXbdZIuHBI/AAAAAAAAD1Y/Zu38oSLhxAg/s1600/wordpress.png)

**Tech Crunch:** WordPress.com [has revealed](http://en.blog.wordpress.com/2011/04/13/security/) that someone has gained root-access (“low-level,” as in deep) to several of its servers this morning and that VIP customers’ source code was accessible. WordPress.com VIP customers are all on “code red” and in the process of changing all the passwords/API keys they’ve left in the source code.

_“Tough note to communicate today: Automattic had a low-level (root) break-in to several of our servers, and potentially anything on those servers could have been revealed._

_We have been diligently reviewing logs and records about the break-in to determine the extent of the information exposed, and re-securing avenues used to gain access. We presume our source code was exposed and copied. While much of our code is Open Source, there are sensitive bits of our and our partners’ code. Beyond that, however, it appears information disclosed was limited.”_

While Automattic is downplaying the leak, sites’ source code could include API keys and Twitter and Facebook passwords which can let interested parties gain access to sensitive information as well as shut people out of their Twitter and other vulnerable accounts.

Automattic says that the investigation “is ongoing.” I’ve contacted founder Matt Mullenweg for more information and will update this post when I hear back.

WordPress.com currently serves 18 million publishers, including VIPs like TED, CBS and is responsible for 10% of all websites in the world. WordPress.com itself sees about 300 million unique visits monthly.