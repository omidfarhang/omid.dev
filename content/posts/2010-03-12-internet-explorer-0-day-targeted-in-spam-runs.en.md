---
title: Internet Explorer 0-day targeted in spam runs
date: 2010-03-12T14:06:00+00:00
layout: single
author_profile: true
url: 2010/03/12/internet-explorer-0-day-targeted-in-spam-runs/
tags:
  - 0-Day
  - Internet Explorer
  - Patch Tuesday
  - phishing
  - spam
  - Vulnerability
lang: en
category: techblog
---
Hot on the heels of the Patch Tuesday announcements yesterday, came the [announcement](http://www.microsoft.com/technet/security/advisory/981374.mspx) of a new zero-day in Internet Explorer ([CVE-2010-0806](http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2010-0806)).

Whilst checking through some URLs supposedly serving up malicious code to exploit this vulnerability, I noticed a link to some spam runs from earlier in the week. On March 8th SophosLabs saw spam messages attempting to trick the recipient into visiting rogue web pages. Messages used at least two social engineering tricks to lure victims into clicking the malicious link.

  * _the tried and tested “delivery failed, please confirm address details” messages_
  * _request for details confirmation for insurance quote_

Example messages are shown below.

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5pCf9vlmOI/AAAAAAAABQs/CC_l-sSHy5w/s1600-h/0806-spam1.jpg" imageanchor="1"><img border="0" height="382" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5pCf9vlmOI/AAAAAAAABQs/CC_l-sSHy5w/s400/0806-spam1.jpg" width="400" /></a>
</div>



<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S5pCgJmE_FI/AAAAAAAABQw/zDVy1bcyhqk/s1600-h/0806-spam2.jpg" imageanchor="1"><img border="0" height="400" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S5pCgJmE_FI/AAAAAAAABQw/zDVy1bcyhqk/s400/0806-spam2.jpg" width="311" /></a>
</div>

In either case, clicking on the link takes the victim to a web page which kickstarts the infection process.

Our investigation has shown that the latest version of the browser, Internet Explorer 8, is not affected.

If you are an IE user and have not yet upgraded to version 8, take a hint! It is strongly recommended that you do so. Aside from not being affected from this particular issues, there are a whole bundle of other security related features you are missing out on otherwise.