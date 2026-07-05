---
title: Fake Alert Uses McAfee-like Domain Name to Attract Victims
date: 2010-01-06T13:40:00+00:00
layout: single
author_profile: true
url: 2010/01/06/fake-alert-uses-mcafee-like-domain-name-to-attract-victims/
tags:
  - Phishing
  - scam
  - Security

categories:
  - TechBlog
---
Cybercriminals love to use social engineering techniques to trick users into installing their malware. One of the latest fake-alert variants attempts to trick users into believing the software is related to or hosted by McAfee:**mcafeevirusremover.com**.

The script hosted by the domain can attack the Windows browsers Internet Explorer, Mozilla Seamonkey, and Chrome. The script also affects browsers on Linux platforms.

This fake-alert variant is hosted on at least 13 other known domains. McAfee’s Trusted Source blocks the IP addresses and the domains (including DNS and mail servers) associated with this Trojan. For example:

[![](/images/2010/01/TS-Screenshot.png)](/images/2010/01/TS-Screenshot-813bd54a.png)

The infection begins by redirecting the victim to the domain hosting the Trojan script code. This website is designed to look like Windows Explorer in Windows XP. It “reports” multiple infections on the victim’s computer:

[![](/images/2010/01/Domain-screenshot.jpg)](/images/2010/01/Domain-screenshot-04223744.jpg)

If the user clicks anything within the browser, the [SecurityTool](http://sites.google.com/site/boelectronic/computer/malware/list-of-common-malwares/securitytool) Malware will download.