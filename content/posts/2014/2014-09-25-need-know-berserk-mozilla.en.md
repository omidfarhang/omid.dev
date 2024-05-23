---
title: What you need to know about BERserk and Mozilla
date: 2014-09-25T22:10:46+00:00
layout: single
author_profile: true
url: 2014/09/25/need-know-berserk-mozilla/
shortlink: https://g.omid.dev/212WQIC
image: /images/sites/3/2014/09/nss-1024x686.png
tags:
  - browsers
  - Google
  - hack
  - Mozilla
  - nss
  - security
  - Updates
lang: en
categories: 
  - techblog
---
The **Intel Security Advanced Threat Research Team** has discovered a critical signature forgery vulnerability in the **Mozilla Network Security Services (NSS) crypto library** that could allow malicious parties to set up fraudulent sites masquerading as legitimate businesses and other organizations.

The Mozilla NSS library, commonly utilized in the **Firefox web browser, can also be found in Thunderbird, Seamonkey, and other Mozilla products.**  Dubbed **“BERserk”**, this vulnerability allows for attackers to forge RSA signatures, thereby allowing for the bypass of authentication to websites utilizing SSL/TLS.  Given that certificates can be forged for any domain, this issue raises serious concerns around integrity and confidentiality as we traverse what we perceive to be secure websites.

![nss-1024x686](/images/2014/09/nss-1024x686.png) 

**What users can do immediately**

Individual Firefox browser users can take immediate action by updating their browsers with the latest patches from [Mozilla](https://www.mozilla.org/en-US/firefox/new/).

Google has also released updates for [Google Chrome](http://googlechromereleases.blogspot.com/2014/09/stable-channel-update_24.html) and [ChromeOS](http://googlechromereleases.blogspot.com/2014/09/stable-channel-update-for-chrome-os_24.html), as these products also utilize the vulnerable library.

Ensuring that privacy and integrity be maintained is core to what we do at Intel Security.  As this issue unfolds we will continue to provide updates on effective countermeasures and proper mitigation strategies.

Read the whole story at [McAfee Blog](http://blogs.mcafee.com/executive-perspectives/need-know-berserk-mozilla)