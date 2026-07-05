---
title: Who’s the quickest? Only one way to find out…
date: 2009-12-17T23:03:00+00:00
layout: single
author_profile: true
url: 2009/12/17/whos-the-quickest-only-one-way-to-find-out/
shortlink: https://g.omid.dev/1Lg6V3g
tags:
  - Malware
  - Phishing
  - scam
  - Security

categories:
  - TechBlog
---
Earlier on this morning I happened to notice a redirect page used in a meds spam campaign that just happened to also be compromised with a malicious script.

[![](/images/2009/12/infmeds0.jpg)](/images/2009/12/infmeds0-2b596513.jpg)

You can see the META tag redirect that will instruct the browser to immediately load the page on the target site. And immediately below, it, the obfuscated JavaScript injected into the page. Deobfuscating this script, we can see its payload is also redirection, this time to a malware site.

[![](/images/2009/12/infmed0d.jpg)](/images/2009/12/infmed0d-07bb48e9.jpg)

Curiosity got the better of me. Which payload ‘wins’ when the browser loads the page? The META redirect or the JavaScript? [Only one way to find out](http://en.wikipedia.org/wiki/Harry_Hill's_TV_Burp#Fights)…

Ok, not quite [Harry Hill](http://www.itv.com/entertainment/comedy/harryhillstvburp/default.html), but I loaded the page with Internet Explorer on a test machine to find out. It appears that the malicious script has precedence over the META redirect, and the iframe payload was delivered. Unfortunately, not a happy ending – infection with rogue security software.

[![](/images/2009/12/infmed1.jpg)](/images/2009/12/infmed1-67ac44c6.jpg)

[![](/images/2009/12/infmed2.jpg)](/images/2009/12/infmed2-a9f57cc8.jpg)

[![](/images/2009/12/infmed4_sm.jpg)](/images/2009/12/infmed4_sm-eadc09cd.jpg)

Definitely one scenario where you would have been better off with our Canadian Health friends at the end of the META redirect.

[![](/images/2009/12/canhealth.jpg)](/images/2009/12/canhealth-c9c1e0e4.jpg)