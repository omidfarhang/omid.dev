---
title: Adservers compromised in latest Zbot push
date: 2010-03-05T19:27:00+00:00
layout: single
author_profile: true
url: 2010/03/05/adservers-compromised-in-latest-zbot-push/
tags:
  - malware
  - phishing
  - report
  - review
lang: en
category: techblog
---
As we have commented before when content served up from adservers is compromised, the effects can be far reaching, potentially exposing huge numbers of victims to the malicious code as they innocently browse legitimate sites. The problem is further complicated by the fact that legitimate ad content is often heavily obfuscated, in order to evade ad-blocking technology.

During the latter half of this week we have seen a whole batch of compromised adservers injected with malicious JavaScript to silently load malicious content from a remote site. A significant number of popular sites that load ads content from these servers have therefore been affected by this attack.

The injected malicious JavaScript can be seen at the top of the ads content:

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S5FStI9jp4I/AAAAAAAABKs/yFHeh_sfYXo/s640/comp_ads.jpg)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S5FStI9jp4I/AAAAAAAABKs/yFHeh_sfYXo/s1600-h/comp_ads.jpg)

Readers may recognise the target domain, masquerading as a legitimate Google Analytics site. It was mentioned in the ISC handlers diary yesterday.

So what happens when the compromised ads are loaded by the browser?

* 301 redirect from google-analitics dot net to a salefale dot com subdomain.
* malicious script which attempts to load further malicious Flash, Java and PDF content in order to deliver the payload.
* payloads seen thus far have been Zbot and Bredo.

It would appear that salefale dot com is now inactive, though we can expect the attack to simply move to new sites.