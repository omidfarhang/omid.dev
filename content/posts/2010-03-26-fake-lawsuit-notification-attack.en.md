---
title: Fake Lawsuit Notification Attack
date: 2010-03-26T00:12:00+00:00
layout: single
author_profile: true
url: 2010/03/26/fake-lawsuit-notification-attack/
tags:
  - phishing
  - report
  - scam
  - spam
lang: en
category: techblog
---
A few of days ago, we encountered an e-mail with a malicious RTF attachment. It was sent with a supposed lawsuit notification message.

The e-mail didn't mention any company by name and took a shotgun, rather than targeted, approach.

Today, a security blogger forwarded us (and others) his version of the e-mail:

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S6v0ir-YACI/AAAAAAAABZ8/6IzzhceKM6s/s400/MLC.png)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S6v0ir-YACI/AAAAAAAABZ8/6IzzhceKM6s/s1600-h/MLC.png)

At this point, it appears that the attachment has been replaced by hyperlink pointing to the Marcus Law Center.

It is difficult to determine whether or not the MLC site is compromised or just completely bogus. Their Our Firm page text borrows heavily from a New York lawyer's site, but that could just be a case of “honest” plagiarism.

In any case, our browsing protection feature is now blocking the sub-directory hosting the malicious file as unsafe.

The RTF file includes an embedded object that acts as a trojan dropper (Trojan-Dropper:W32/Agent.DIOY) and it drops a downloader (Trojan-Downloader:W32/Lapurd.D), which then attempts to connect to a server located in Southern China.

The earlier attachment that we saw also attempted to connect to a server in China.

SANS diary reports [that a number of .edu sites have also received a similar message](http://isc.sans.org/diary.html?storyid=8497).

The domain, touchstoneadvisorsonline.com, is hosting the same RTF (.doc) file.