---
title: Firefox 3.6.2 early edition
date: 2010-03-23T20:04:00+00:00
layout: single
author_profile: true
url: 2010/03/23/firefox-3-6-2-early-edition/
tags:
  - advice
  - alert
  - Browser
  - Firefox
  - Updates
lang: en
categories: 
  - techblog
---
[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S6kWM3OJt5I/AAAAAAAABZA/N4z2vHnoclE/s1600/Firefox_20early.png)](http://www.mozilla.com/products/download.html?product=firefox-3.6.2&os=win&lang=en-US)

Mozilla Foundation has released version 3.6.2 of its Firefox browser a week early. The group had said the update would be available March 30.

The update fixes a widely reported vulnerability (CVE-2010-1028) that prompted Germany’s CERT to advise Web users to switch to another browser until a fix was made. (My blog post “[Germany’s CERT warns against Firefox use](http://boelectronic.blogspot.com/2010/03/germanys-cert-warns-against-firefox-use.html)” )

Intevydis researcher Evgeny Legerov  had found that Wide Open Font Format decoder in Firefox had an integer overflow in its font decompression mechanism. The flaw involved a memory buffer that was too small to handle a downloadable font. Legerov had found that exploiting the vulnerability could crash a victim's browser making it possible to run arbitrary code on the system.

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S6kWNJkTrVI/AAAAAAAABZE/ws8FzM8iDQw/s400/Firefox_202.png)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S6kWNJkTrVI/AAAAAAAABZE/ws8FzM8iDQw/s1600-h/Firefox_202.png)

If you use Firefox, update [here](http://www.mozilla.com/en-US/firefox/3.6.2/releasenotes/).

Security advisories for Firefox 3.6 [here](http://www.mozilla.org/security/known-vulnerabilities/firefox36.html#firefox3.6.2).