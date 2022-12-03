---
title: Online forums hacked and misused on a large scale
date: 2012-04-25T20:20:00+00:00
layout: single
author_profile: true
url: 2012/04/25/online-forums-hacked-and-misused-on-a-large-scale/
tags:
  - advice
  - forum
  - hack
  - report
lang: en
category: techblog
---
[<img title="Forum_Ad_English" border="0" alt="Forum_Ad_English" align="right" src="http://lh4.ggpht.com/-TV8Yy8-rdmU/T5hVgJMjGyI/AAAAAAAAFsQ/e6mJpdIRq3M/Forum_Ad_English_thumb%25255B2%25255D.jpg?imgmax=800" width="400" height="332" />](http://lh4.ggpht.com/-ugYDuGCnbtg/T5hVdq9BaKI/AAAAAAAAFsI/PLGFWSjJaKA/s1600-h/Forum_Ad_English%25255B2%25255D.jpg)The H-Online: Online forums have, for some time, apparently been the target of hackers who inject additional code. However, the attackers aren't interested in publishing cool slogans or political messages, they're looking for money. They steal Google traffic from the forums and exploit this traffic via ads. Their main targets appear to be forums that are based on the [vBulletin software](https://www.vbulletin.com/). 

Unlike the &#8220;Look how cool I am&#8221; crackers, these attackers have very discreet working methods. They hide their code deeply within the system and ensure that their redirections don't attract much attention. Only users who visit forum pages for the first time via a search engine such as Google are redirected to a _url123.info_ URL. This site initially displays a strange blocking alert (&#8220;Access denied&#8221;) followed by some arbitrary text and then loads a full-page ad by InfinityAds. The ads are probably a direct source of income for the intruders even though each ad is only worth a few pennies. However, as some forum operators have reported that their [traffic has dropped](http://www.vbseo.com/f3/hacked-url123-info-53045/) by more than 70 per cent, and the phenomenon seems to be a rather wide-spread one, the overall yield is likely to be considerable. 

Forum owners and regular forum users who access the pages directly never encounter the redirection. Neither will those who try to reproduce the issue by repeatedly clicking through to the forum via Google be redirected, because a cookie already exists for the page. One way of reliably reproducing the redirection is to carry out a search with a browser in private or anonymous mode. 

The German [Typo3 forum](http://www.typo3forum.net/forum/nderungen/55773-redirect-google-url123-info.html) is among the forums currently affected but some other [reports](http://www.vbulletin.org/forum/showthread.php?p=2299319) date back several months. The precise cause remains unclear. Various contributors suspect a connection to vbSEO – a search engine optimization extension. It appears that this extension was [compromised](http://www.vbseo.com/f5/vbseo-security-bulletin-all-supported-versions-patch-release-52783/) in a way that allowed attackers to install malicious plug-ins via the forum administrator's account. In their [FAQs](http://www.vbseo.com/f5/faqs-rogue-plugins-exploit-1-23-vbseo-patch-release-52862/#post326304), the vbSEO developers have provided a tool for testing vBulletin installations. The vBulletin support team recommends a slightly more generic [vBulletin test](https://www.vbulletin.com/forum/showthread.php/397114-A-fix-if-your-site-is-already-exploited?p=2269868&viewfull=1#post2269868).