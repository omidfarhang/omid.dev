---
title: "Troj/IFrame-DY: Old websites don’t die they just get infected"
date: 2010-02-26T19:41:00+00:00
layout: single
author_profile: true
url: 2010/02/26/trojiframe-dy-old-websites-dont-die-they-just-get-infected/
tags:
  - alert
  - hack
  - malware
  - report
  - review
lang: en
category: techblog
---
Earlier this week Sophos informed a UK <a href="http://www.apa.police.uk/APA/About+Police+Authorities/" target="_blank">Local Police Authority</a> (Hertfordshire) that a website they owned was infected with <a href="http://www.sophos.com/security/analyses/viruses-and-spyware/trojiframedy.html" target="_blank">Troj/IFrame-DY</a>.

It turns out that the Police Authority has a new site and the infected site is an old one that just leads the user to the new site:

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S4gcE6mm_SI/AAAAAAAABBU/bgLeC-EWRSw/s1600-h/redirect.jpg" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S4gcE6mm_SI/AAAAAAAABBU/bgLeC-EWRSw/s640/redirect.jpg" /></a>
</div>

Unfortunately, the old site also contains a malicious script, appended after the closing /HTML tag.

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S4gcHRmWBCI/AAAAAAAABBc/LGI0ktRiBjw/s1600-h/src-big.jpg" imageanchor="1"><img border="0" height="158" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S4gcHRmWBCI/AAAAAAAABBc/LGI0ktRiBjw/s400/src-big.jpg" width="400" /></a>
</div>

There are several ways of migrating users to a new website:

  * Deleting the old and let a search engine take the strain
  * Doing Server side redirects
  * Asking the ISP to point the old website to the new sites IP address.
  * and relying on client side redirects.

There are benefits and costs for all the above methods, however, from a security point of view having an old abandoned (not updated and secured) website is the worst.