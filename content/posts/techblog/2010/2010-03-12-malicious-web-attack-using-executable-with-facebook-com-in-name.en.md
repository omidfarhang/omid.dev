---
title: Malicious Web Attack Using Executable With facebook.com in Name
date: 2010-03-12T12:30:00+00:00
layout: single
author_profile: true
url: 2010/03/12/malicious-web-attack-using-executable-with-facebook-com-in-name/
tags:
  - alert
  - Malware
  - review
  - Security

categories:
  - TechBlog
---
As we were working through URLs identified as suspicious due to our GTI technology, one of the URLs that presented itself was an average “.com” site that loaded a php. As we processed this – it was interesting to see that this php actually reached out to download a file that ended with the string facebook.com.exe — as this “.com” site was very social-network friendly – it would be easy to see how an average user, without web protection in place, would not even realize what was going on.

[![](/images/2010/03/2010-03-blog-malware-1.png)](/images/2010/03/2010-03-blog-malware-1-b0820f7d.png)

And what was this *facebook.com.exe?  This was  detected as:

|        File IM24672.JPG-www.facebook.com.exe received on 2010.03.10 19:54:18 (UTC)      |  |  |  |
|---|---|---|---|
|        Antivirus      |        Version      |        Last Update      |        Result      |
|        AntiVir      |        8.2.1.180      |        2010.03.10      |        TR/Injector.Awi.88      |
|        AVG      |        9.0.0.787      |        2010.03.09      |        I-Worm/Stration.IPY      |
|        BitDefender      |        7.2      |        2010.03.10      |        GenPack:Backdoor.SDBot.DGEY      |
|        F-Secure      |        9.0.15370.0      |        2010.03.10      |        GenPack:Generic.Malware.SYd!Cdldsp.B424F431      |
|        GData      |        19      |        2010.03.10      |        GenPack:Backdoor.SDBot.DGEY      |
|        Jiangmin      |        13.0.900      |        2010.03.10      |        Trojan/Buzus.chp      |
|        Kaspersky      |        7.0.0.125      |        2010.03.10      |        Trojan.Win32.Buzus.dmgy      |
|        McAfee+Artemis      |        5916      |        2010.03.10      |        Artemis!6B8A163B27CD      |
|        McAfee-GW-Edition      |        6.8.5      |        2010.03.10      |        Trojan.Injector.Awi.88      |
|        Microsoft      |        1.5502      |        2010.03.10      |        VirTool:Win32/CeeInject.gen!BE      |
|        NOD32      |        4932      |        2010.03.10      |        a variant of Win32/Injector.AWI      |
|        Prevx      |        3.0      |        2010.03.10      |        High Risk Worm      |
|        Sunbelt      |        5816      |        2010.03.10      |        Trojan.Win32.Generic!BT      |



[![](/images/2010/03/2010-03-blog-malware-2.png)](/images/2010/03/2010-03-blog-malware-2-6ed593f0.png)



[![](/images/2010/03/2010-03-blog-malware-3.png)](/images/2010/03/2010-03-blog-malware-3-74cc63b1.png)

 By the time I am writing this – it is already being seen with further visibility across McAfee Artemis detection and we are making sure that all of our products protect against this threat.

[![](/images/2010/03/2010-03-blog-malware-4.png)](/images/2010/03/2010-03-blog-malware-4-0ff6a9f9.png)

This server where this was hosted has already been taken off-line – however, this threat, maneuver, and piece of malware will continue to be seen again, and again, and again. In fact, we already have other webservers that are hosting that same attack – along the same lines – and will be continuing to monitor and follow this particular attack.
