---
title: Help The Homeless, Feed the Phishers?
date: 2010-04-03T19:15:00+00:00
layout: single
author_profile: true
url: 2010/04/03/help-the-homeless-feed-the-phishers/
tags:
  - alert
  - phishing
  - review
  - scam
lang: en
categories: 
  - TechBlog
---
Well, this is unfortunate. In the UK, they have something called “The Big Issue”, which is a magazine designed to help the homeless get back into society via a legitimate income. It sells around 300,000 copies a week and is listed as the third-favourite newspaper of young British people aged 15 to 24, according to [Wikipedia](http://en.wikipedia.org/wiki/The_Big_Issue). At this moment in time, The Big Issue website is playing host to a French Paypal Phish – they have a zipped copy of the Phish uploaded to the server, and a live Phish directory too:

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S7eMAegtR_I/AAAAAAAABeU/AdWskcIGuQk/s400/bigssuehck1.gif)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S7eMAegtR_I/AAAAAAAABeU/AdWskcIGuQk/s1600-h/bigssuehck1.gif)

Here’s the live Phish:

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7eMDzmJgqI/AAAAAAAABeY/NwPBSmdZ_XU/s400/bigssuehck2.gif)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7eMDzmJgqI/AAAAAAAABeY/NwPBSmdZ_XU/s1600-h/bigssuehck2.gif)

Should the end-user enter their Paypal login, the next screen they see asks them to “Update their Paypal account” with valid card details:

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S7eMFRoQziI/AAAAAAAABeg/KVQDdG3tjRo/s400/bigssuehck4.gif)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S7eMFRoQziI/AAAAAAAABeg/KVQDdG3tjRo/s1600-h/bigssuehck4.gif)

Checking out the Fiddler log reveals something interesting:

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7eMEU2wO3I/AAAAAAAABec/RPrS7bR92z0/s1600/bigssuehck3.gif)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7eMEU2wO3I/AAAAAAAABec/RPrS7bR92z0/s1600-h/bigssuehck3.gif)

Googling for that particular name reveals it has appeared in a couple of Paypal related Phishes [previously](http://www.google.co.uk/search?q=rak0n+phish&btnG=Search&hl=en&safe=off&client=firefox-a&hs=1uZ&rls=org.mozilla%3Aen-GB%3Aofficial&sa=2), all at the tail end of 2009. We’ve notified the host, and hopefully the Phish will be offline soon. Making ill gotten gains through the website of a magazine designed to help generate income for the homeless is in pretty poor taste, even for a scammer.