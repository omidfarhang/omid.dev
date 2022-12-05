---
title: Who’s the quickest? Only one way to find out…
date: 2009-12-17T23:03:00+00:00
layout: single
author_profile: true
url: 2009/12/17/whos-the-quickest-only-one-way-to-find-out/
shortlink: https://g.omid.dev/1Lg6V3g
tags:
  - malware
  - phishing
  - scam
lang: en
category: techblog
---
Earlier on this morning I happened to notice a redirect page used in a meds spam campaign that just happened to also be compromised with a malicious script.

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/SyqtahliKbI/AAAAAAAAAY0/2_4bpHrklV0/s640/infmeds0.jpg)](http://1.bp.blogspot.com/_vaUVXcmC3OI/SyqtahliKbI/AAAAAAAAAY0/2_4bpHrklV0/s1600-h/infmeds0.jpg)

You can see the META tag redirect that will instruct the browser to immediately load the page on the target site. And immediately below, it, the obfuscated JavaScript injected into the page. Deobfuscating this script, we can see its payload is also redirection, this time to a malware site.

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/SyqtP9PcsLI/AAAAAAAAAYM/FBpiLcee-8o/s640/infmed0d.jpg)](http://4.bp.blogspot.com/_vaUVXcmC3OI/SyqtP9PcsLI/AAAAAAAAAYM/FBpiLcee-8o/s1600-h/infmed0d.jpg)

Curiosity got the better of me. Which payload ‘wins’ when the browser loads the page? The META redirect or the JavaScript? [Only one way to find out](http://en.wikipedia.org/wiki/Harry_Hill's_TV_Burp#Fights)…

Ok, not quite [Harry Hill](http://www.itv.com/entertainment/comedy/harryhillstvburp/default.html), but I loaded the page with Internet Explorer on a test machine to find out. It appears that the malicious script has precedence over the META redirect, and the iframe payload was delivered. Unfortunately, not a happy ending – infection with rogue security software.

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/SyqtSnuHqiI/AAAAAAAAAYc/kN3jy-GQmIA/s640/infmed1.jpg)](http://2.bp.blogspot.com/_vaUVXcmC3OI/SyqtSnuHqiI/AAAAAAAAAYc/kN3jy-GQmIA/s1600-h/infmed1.jpg)

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/SyqtTZqKYBI/AAAAAAAAAYk/l_Wm_WYAesU/s640/infmed2.jpg)](http://4.bp.blogspot.com/_vaUVXcmC3OI/SyqtTZqKYBI/AAAAAAAAAYk/l_Wm_WYAesU/s1600-h/infmed2.jpg)

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyqtWIIuFWI/AAAAAAAAAYs/EF6N9JLt2dg/s640/infmed4_sm.jpg)](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyqtWIIuFWI/AAAAAAAAAYs/EF6N9JLt2dg/s1600-h/infmed4_sm.jpg)

Definitely one scenario where you would have been better off with our Canadian Health friends at the end of the META redirect.

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyqtSOfSLKI/AAAAAAAAAYU/0efyLk73RGc/s640/canhealth.jpg)](http://3.bp.blogspot.com/_vaUVXcmC3OI/SyqtSOfSLKI/AAAAAAAAAYU/0efyLk73RGc/s1600-h/canhealth.jpg)