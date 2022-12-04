---
title: Avira know better what to put and where
date: 2010-10-18T22:40:00+00:00
layout: single
author_profile: true
url: 2010/10/18/avira-know-better-what-to-put-and-where/
tags:
  - Interesting
  - malware
  - report
lang: en
category: techblog
---
Sometimes we encounter childish <a href="/2010/10/02/messages-from-malware-authors-in-malware/" target="_blank">messages</a> from the authors in the body of malware. A variant of the TDSS family we got recently is even going a step further by offering a convenient location for a malware signature. The samples include the message “Put your signature here”, which is shown when run inside a debugger.

[](http://lh6.ggpht.com/_vaUVXcmC3OI/TLzFxckQDJI/AAAAAAAACt4/QjnASLqGS30/s1600-h/disass_screenshot%5B4%5D.png)

While in many cases signatures could be still useful for detection, Avira prefer to use other technologies which are more generic and proactive. This is especially the case with malware families like TDSS/Alureon, whose authors continuously adapt their creations so they are able to work around even proactive detection in a short time. This variant is detected as TR/Crypt.XPACK.Gen3.
