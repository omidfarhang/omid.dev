---
title: Fake Alert Uses McAfee-like Domain Name to Attract Victims
date: 2010-01-06T13:40:00+00:00
layout: single
author_profile: true
url: 2010/01/06/fake-alert-uses-mcafee-like-domain-name-to-attract-victims/
tags:
  - phishing
  - scam
lang: en
category: techblog
---
Cybercriminals love to use social engineering techniques to trick users into installing their malware. One of the latest fake-alert variants attempts to trick users into believing the software is related to or hosted by McAfee:**mcafeevirusremover.com**.

The script hosted by the domain can attack the Windows browsers Internet Explorer, Mozilla Seamonkey, and Chrome. The script also affects browsers on Linux platforms.

This fake-alert variant is hosted on at least 13 other known domains. McAfee’s Trusted Source blocks the IP addresses and the domains (including DNS and mail servers) associated with this Trojan. For example:

<div>
</div>

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S0SKqR0UiHI/AAAAAAAAAjI/rzTROJLi21A/s1600-h/TS+Screenshot.png" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S0SKqR0UiHI/AAAAAAAAAjI/rzTROJLi21A/s640/TS+Screenshot.png" /></a>
</div>

The infection begins by redirecting the victim to the domain hosting the Trojan script code. This website is designed to look like Windows Explorer in Windows XP. It “reports” multiple infections on the victim’s computer:

<a name="more"></a>

<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S0SKtpwCqJI/AAAAAAAAAjQ/LTRTQzMzTsE/s1600-h/Domain+screenshot.jpg" imageanchor="1"><img border="0" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S0SKtpwCqJI/AAAAAAAAAjQ/LTRTQzMzTsE/s640/Domain+screenshot.jpg" /></a>
</div>

<div>
</div>

If the user clicks anything within the browser, the [SecurityTool](http://sites.google.com/site/boelectronic/computer/malware/list-of-common-malwares/securitytool) Malware will download.