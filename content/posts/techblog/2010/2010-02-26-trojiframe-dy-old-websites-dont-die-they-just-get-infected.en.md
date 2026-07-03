---
title: "Troj/IFrame-DY: Old websites don’t die they just get infected"
date: 2010-02-26T19:41:00+00:00
layout: single
author_profile: true
url: 2010/02/26/trojiframe-dy-old-websites-dont-die-they-just-get-infected/
tags:
  - alert
  - hack
  - Malware
  - report
  - review
  - Security

categories:
  - TechBlog
---
Earlier this week Sophos informed a UK [Local Police Authority](http://www.apa.police.uk/APA/About+Police+Authorities/) (Hertfordshire) that a website they owned was infected with [Troj/IFrame-DY](http://www.sophos.com/security/analyses/viruses-and-spyware/trojiframedy.html).

It turns out that the Police Authority has a new site and the infected site is an old one that just leads the user to the new site:

[![](/images/2010/02/redirect.jpg)](/images/2010/02/redirect-42ff629e.jpg)

Unfortunately, the old site also contains a malicious script, appended after the closing /HTML tag.

[![](/images/2010/02/src-big.jpg)](/images/2010/02/src-big-5335b270.jpg)

There are several ways of migrating users to a new website:

  * Deleting the old and let a search engine take the strain
  * Doing Server side redirects
  * Asking the ISP to point the old website to the new sites IP address.
  * and relying on client side redirects.

There are benefits and costs for all the above methods, however, from a security point of view having an old abandoned (not updated and secured) website is the worst.