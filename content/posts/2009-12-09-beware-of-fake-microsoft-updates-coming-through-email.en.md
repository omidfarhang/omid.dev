---
title: Beware of fake Microsoft updates coming through email
date: 2009-12-09T01:20:00+00:00
layout: single
author_profile: true
url: 2009/12/09/beware-of-fake-microsoft-updates-coming-through-email/
shortlink: https://g.omid.dev/1Y7H1QX
tags:
  - alert
  - Apple
  - Microsoft
  - scam
  - spam
lang: en
categories: 
  - techblog
---
Email is still the most common method used for security update notifications from all major vendors, but it is also the most commonly used trigger for launching the chain of infection attacks by malware writers. When I came to work today I found in my Inbox a message from Microsoft with the [Security Bulletin Advance Notification for December](http://www.microsoft.com/technet/security/Bulletin/ms09-dec.mspx). I immediately clicked on one of the links to visit the yet to be published December Security Bulletin and investigate how many critical vulnerabilities will be fixed this month.

Investigating advanced security notifications is important for us in SophosLabs. It may give us warnings of potential new attack vectors as well as rough estimates of amount of work while analysing the latest vulnerabilities and writing the analysis for next week. This month we are expecting three critical vulnerabilities that may result in remote code execution. Three disclosed critical vulnerabilities is not many, compared with some of the previous months. It seems that the vulnerabilities in Microsoft products are getting more difficult to find. Hopefully, the patch for the [recently discovered IE vulnerability](http://www.sophos.com/support/knowledgebase/article/67122.html) will also be released.

Following the first message from Microsoft there are two emails from Apple Product Security team announcing availability of [security updates for Java for Mac](http://support.apple.com/kb/HT3970) and after them another message coming directly from Steve Lipner, Microsoft’s Director of Security Assurance. What an honour I thought, but then the content seemed to ring a bell.

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/Sx7yu_bbirI/AAAAAAAAASY/NQ3RLlZRZf8/s640/malencpkee.jpg)](http://3.bp.blogspot.com/_vaUVXcmC3OI/Sx7yu_bbirI/AAAAAAAAASY/NQ3RLlZRZf8/s1600-h/malencpkee.jpg)

The email contains a direct link to an alleged update executable file Windows-KBxxxxx-ENU.exe which immediately set the malware alarm off, since original Microsoft emails never directly link to an executable file or have an executable attached. I remembered that [Graham has written](http://www.sophos.com/blogs/gc/g/2008/10/13/malicious-microsoft-security-patch-spammed-out-before-patch-tuesday/) about a similar campaign more than a year ago.

I immediately started the download of the executable using SophosLabs secure network downloader and the file was already proactively detected as [Mal/EncPK-LL](http://www.sophos.com/security/analyses/viruses-and-spyware/malencpkll.html).

The executable itself is a Delphi executable packed using a custom packer but it seems to be malformed and caused errors while executing on my test system. Additional testing would be required for a detailed analyses of the cause. Nevertheless as the file was already detected by Sophos products I moved on to other tasks, being pleased that Sophos users were already protected.

It is clear that the malware campaign was deliberately launched to coincide with Microsoft Security Bulletin Advance Notification which makes even more important to be careful and not follow direct links to executable files in times when a real notification is expected.

As a side line, Steve Lipner’s should be well known to all software engineers developing software for Windows as he is one of the main people behind the [Microsoft’s Security Development Lifecycle](http://msdn.microsoft.com/en-us/security/sdl.aspx) process, which is one of the main reasons for significant decrease in number of discovered vulnerabilities in Microsoft products that implemented it. I also came across [this interesting interview with Steve Lipner](http://threatpost.com/en_us/blogs/steve-lipner-microsoft-sdlc-and-windows-7-security-112409) from our colleagues at ThreatPost. Have a quiet weekend.