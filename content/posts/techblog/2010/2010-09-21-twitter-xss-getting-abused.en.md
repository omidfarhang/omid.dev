---
title: Twitter XSS getting abused
date: 2010-09-21T20:20:00+00:00
layout: single
author_profile: true
url: 2010/09/21/twitter-xss-getting-abused/
tags:
  - advice
  - report
  - Twitter
  - Vulnerability

categories:
  - TechBlog
---
![twitter_t_logo-246x300](http://lh6.ggpht.com/_vaUVXcmC3OI/TJj-i3k6yfI/AAAAAAAACe0/5OMlNvUwmAs/s1600-h/twitter_t_logo-246x300%5B7%5D.png)

On Twitter a new security flaw gets currently exploited. Hackers found a way to inject malicious JavaScript code into tweets with the onMouseOver event. This can lead to pop-ups appearing, redirecting to websites, re-tweeting spam, or even worse things like cookie stealing (compromising the user accounts). The problem is that Twitter doesn’t properly filter out some tags in tweets.

Users should be very cautious when seeing colored text blocks (background and text colors are the same, called “rainbow tweets”) – these are currently mostly used to exploit the security vulnerability. Hopefully, Twitter closes the security hole soon! Until then, using the NoScript web browser extension or disabling JavaScript on Twitter helps against the attack. Also, using twitter applications which rely upon the Twitter API aren’t affected.