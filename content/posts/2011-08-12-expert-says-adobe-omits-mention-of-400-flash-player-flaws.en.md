---
title: Expert says Adobe omits mention of 400 Flash Player flaws
date: 2011-08-12T20:13:00+00:00
layout: single
author_profile: true
url: 2011/08/12/expert-says-adobe-omits-mention-of-400-flash-player-flaws/
tags:
  - Adobe
  - flash player
  - Google
  - report
  - security
  - Vulnerability
lang: en
category: 
  - techblog
---
[![](http://2.bp.blogspot.com/-oDFcQgoaetw/TkWBLoxk0WI/AAAAAAAAD9U/-O1zOVPkgW0/s1600/adobe_logo200.jpg)](http://2.bp.blogspot.com/-oDFcQgoaetw/TkWBLoxk0WI/AAAAAAAAD9U/-O1zOVPkgW0/s1600/adobe_logo200.jpg)

**H-Online:** Officially, Adobe's [current update](http://www.h-online.com/news/item/Adobe-fixes-critical-vulnerabilities-in-four-products-on-patch-day-1320840.html) for Flash Player has closed only 13 holes, but unofficially it is said to have closed several hundred. Security specialist Tavis Ormandy, who works for Google, claims that he discovered 400 holes and notified Adobe of them. The specialist has now complained that, while the holes have been closed, they haven't been mentioned in the official advisory, and he hasn't been given credit for their discovery.

Ormandy says that he [plans to release](https://twitter.com/#!/taviso/status/101046396790128640) his own advisory soon. Ormandy is quite a well-known security specialist; he regularly discovers critical software holes and, for instance, [started a dispute](http://www.h-online.com/news/item/Quarrels-about-new-Windows-Vulnerability-Update-1020449.html) with Microsoft last year.

Why Adobe has only mentioned 13 holes and left the rest officially undocumented is as yet unclear. One reason could be that Google and Adobe have agreed to co-operate in troubleshooting Flash Player. Flaws that are found in this context are probably treated as having been discovered internally – and Adobe's guidelines state that such flaws are not mentioned explicitly in official advisories. Microsoft pursues a [similar strategy](http://www.h-online.com/news/item/Microsoft-still-using-undercover-patches-1190204.html) for holes that are discovered internally.

Another issue of contention appears to be the point at which a flaw becomes a hole. In Adobe's view, a hole apparently requires a CVE number and a PoC exploit, while Ormandy probably only reported “unique bugs”, most of which were discovered via fuzzing.

At least Ormandy receives adequate credits in Google's [release notes](http://googlechromereleases.blogspot.com/2011/08/stable-channel-update_09.html) for the Flash update in Chrome 13.0.782.112: the Google Team said that it would like to thank Ormandy “for donating a large amount of time and compute power to identify a significant number of vulnerabilities”.