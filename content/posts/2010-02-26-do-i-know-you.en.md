---
title: Do I Know You?
date: 2010-02-26T18:49:00+00:00
layout: single
author_profile: true
url: 2010/02/26/do-i-know-you/
tags:
  - malware
  - phishing
  - rogue software
  - scam
  - spam
lang: en
category: 
  - techblog
---
Imagine that you’re sitting at home catching up on your email backlog. In comes an email from your ISP, FooBarBazCo (some creativity required here, I know). The email seems to be from Technical Support  – ‘From:    FooBarBazCo.com Team’ – and states that you need to update your email settings as a result of a recent security upgrade. Can you trust it?

Today we observed an increase in spam messages containing links to a particular malicious URL. The messages masquerade as having come from mail administrators, with the ‘from’ address spoofed so that they appear to have come from the same network domain as the address to which the mails are sent (the ‘from’ and ‘to’ addresses are actually identical, although this will not be visible in most email programs).

The received messages state that mailbox &#8216;settings were changed' and urge users to &#8216;apply the new set of settings' by clicking a link to an executable, which unsurprisingly turns out to be malicious:

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S4f1NnBjxMI/AAAAAAAABA8/aRUl_3Ahifw/s640/image1.jpeg)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S4f1NnBjxMI/AAAAAAAABA8/aRUl_3Ahifw/s1600-h/image1.jpeg)

Clicking the link leads to a download of the following misleading application, which we see here with the usual UI misspellings and fake scan results:

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S4f1RZCWfHI/AAAAAAAABBE/HyE9hxB25KY/s640/image2.jpeg)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S4f1RZCWfHI/AAAAAAAABBE/HyE9hxB25KY/s1600-h/image2.jpeg)

And, naturally, the usual prompt for registration:

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S4f1T6Z7czI/AAAAAAAABBM/jdvwbUn-hmg/s640/image3.jpeg)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S4f1T6Z7czI/AAAAAAAABBM/jdvwbUn-hmg/s1600-h/image3.jpeg)

Uh-oh: “25 critical system objects”! But I just installed the OS!

Symantec products detect the downloaded misleading application as AntiVirus2010. Do always be sure, however, to confirm with your ISP or IT team before following such “directions” to run a particular file and certainly before running any unknown executables hosted on external domains.