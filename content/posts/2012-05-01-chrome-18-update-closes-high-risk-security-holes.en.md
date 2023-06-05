---
title: Chrome 18 update closes high-risk security holes
date: 2012-05-01T15:49:00+00:00
layout: single
author_profile: true
url: 2012/05/01/chrome-18-update-closes-high-risk-security-holes/
tags:
  - Browser
  - Google
  - Google Chrome
  - security
  - software
  - Updates
lang: en
category: 
  - techblog
---
[<img title="new-chrome-logo" border="0" alt="new-chrome-logo" align="right" src="http://lh3.ggpht.com/-0YUqNQsppC4/T5__D_6US8I/AAAAAAAAFyo/RNx9PkesM98/new-chrome-logo_thumb.png?imgmax=800" width="128" height="125" />](http://lh3.ggpht.com/-mv8-JdAayAM/T5__CD9bF_I/AAAAAAAAFyg/eSExO5AJ3B0/s1600-h/new-chrome-logo%25255B2%25255D.png)The H-Online: Google has [released a new update](http://googlechromereleases.blogspot.co.uk/2012/04/stable-channel-update_30.html) to the stable 18.x branch of its Chrome web browser to close a number of security holes found in the application. The update, labelled 18.0.1025.168, addresses a total of five vulnerabilities, three of which are rated as “[high severity](https://sites.google.com/a/chromium.org/dev/developers/severity-guidelines)” by the company. 

These include use-after-free problems in [floating point](http://en.wikipedia.org/wiki/Floating_point) handling and the XML parser; all of these bugs were detected using the [AddressSanitizer](http://code.google.com/p/address-sanitizer/wiki/AddressSanitizer). As part of its [Chromium Security Vulnerability Rewards program](https://sites.google.com/a/chromium.org/dev/Home/chromium-security), Google paid a security researcher by the name of “miaubiz”, who is number three in the company's [Security Hall of Fame](http://www.chromium.org/Home/chromium-security/hall-of-fame), $1,000 for discovering and reporting one of the float handling problems. Two medium risk problems related to IPC validation and a race condition in sandbox IPC have also been corrected. 

Further information about the update can be found in the [announcement post](http://googlechromereleases.blogspot.co.uk/2012/04/stable-channel-update_30.html) on the Google Chrome Releases blog. Chrome 18.0.1025.168 is available to download for Windows, Mac OS X and Linux from [google.com/chrome](http://www.google.com/chrome); existing users can upgrade using the [built-in update function.](http://support.google.com/chrome/bin/answer.py?hl=en&answer=95414)