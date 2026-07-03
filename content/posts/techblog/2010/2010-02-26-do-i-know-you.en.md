---
title: Do I Know You?
date: 2010-02-26T18:49:00+00:00
layout: single
author_profile: true
url: 2010/02/26/do-i-know-you/
tags:
  - Malware
  - phishing
  - rogue software
  - scam
  - spam
  - Security

categories:
  - TechBlog
---
Imagine that you’re sitting at home catching up on your email backlog. In comes an email from your ISP, FooBarBazCo (some creativity required here, I know). The email seems to be from Technical Support  – ‘From:    FooBarBazCo.com Team’ – and states that you need to update your email settings as a result of a recent security upgrade. Can you trust it?

Today we observed an increase in spam messages containing links to a particular malicious URL. The messages masquerade as having come from mail administrators, with the ‘from’ address spoofed so that they appear to have come from the same network domain as the address to which the mails are sent (the ‘from’ and ‘to’ addresses are actually identical, although this will not be visible in most email programs).

The received messages state that mailbox ‘settings were changed' and urge users to ‘apply the new set of settings' by clicking a link to an executable, which unsurprisingly turns out to be malicious:

[![](/images/2010/02/image1.jpeg)](/images/2010/02/image1-2517d433.jpeg)

Clicking the link leads to a download of the following misleading application, which we see here with the usual UI misspellings and fake scan results:

[![](/images/2010/02/image2.jpeg)](/images/2010/02/image2-c2240820.jpeg)

And, naturally, the usual prompt for registration:

[![](/images/2010/02/image3.jpeg)](/images/2010/02/image3-c271f51f.jpeg)

Uh-oh: “25 critical system objects”! But I just installed the OS!

Symantec products detect the downloaded misleading application as AntiVirus2010. Do always be sure, however, to confirm with your ISP or IT team before following such “directions” to run a particular file and certainly before running any unknown executables hosted on external domains.