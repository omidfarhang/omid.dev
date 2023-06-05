---
title: Iranian block on Tor traffic quickly foiled
date: 2011-09-16T13:58:00+00:00
layout: single
author_profile: true
url: 2011/09/16/iranian-block-on-tor-traffic-quickly-foiled/
tags:
  - Censorship
  - Iran
  - Tor Project
  - Updates
lang: en
categories: 
  - techblog
---
[![](http://4.bp.blogspot.com/-jZU7fXtdOi0/TnNOpyrNktI/AAAAAAAAECI/2HuwYeqtLLg/s1600/Tor_Logo200.png)](http://4.bp.blogspot.com/-jZU7fXtdOi0/TnNOpyrNktI/AAAAAAAAECI/2HuwYeqtLLg/s1600/Tor_Logo200.png)

**The H-Security:** The online privacy and security service [Tor](https://www.torproject.org/index.html.en) was blocked by the Iranian government late evening (local time) 13 September. This was done by adding a filter rule to the Iranian border routers which identified Tor traffic and blocked it. The blocking was quickly discovered by Tor and the project released a fix a few hours later. The fix consists of a new version of the Tor software, [Tor 0.2.3.4-alpha](http://archives.seul.org/tor/talk/Sep-2011/msg00187.html), and once this is installed on relays and bridges, the company expects normal service to be resumed for users in Iran.

A [report](https://blog.torproject.org/blog/iran-blocks-tor-tor-releases-same-day-fix) on the Tor web site explains how the filter worked. The Iranian block used a peculiarity in the expiry time of Tor's SSL certificates, which was a very unusual two hours and very different to the year which might be typical for a normal CA certificate. It was this minor difference that enabled Tor traffic to be recognised and subsequently blocked. To fix the problem, at least for now, Tor has given its certificates more typical expiry times.

The company accepts that it needs to develop both medium and longer term solutions to the problem of being blocked, and notes that the last time Iran attempted to block its traffic was in January 2011.

**Update:**

*   Tor relays and bridges should upgrade to Tor 0.2.2.33 or Tor 0.2.3.4-alpha so users in Iran can reach them again. More Info: [https://blog.torproject.org/blog/iran-blocks-tor-tor-releases-same-day-fix](https://blog.torproject.org/blog/iran-blocks-tor-tor-releases-same-day-fix)