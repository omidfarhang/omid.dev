---
title: Google warns the operators of thousands of hacked web sites
date: 2012-04-19T08:08:00+00:00
layout: single
author_profile: true
url: 2012/04/19/google-warns-the-operators-of-thousands-of-hacked-web-sites/
tags:
  - Google
  - hack
  - news
  - report
lang: en
category: 
  - techblog
---
![](http://lh6.ggpht.com/-iUloGInc-To/T4_A6RX9U_I/AAAAAAAAFjs/6tmfT_Ne2uk/s1600-h/google_logo200%25255B1%25255D.jpg)

The H-Security: The head of Google's Webspam team, Matt Cutts, [announced on Twitter](https://twitter.com/#%21/mattcutts/status/191900489988849664) that Google has sent out a message to the webmasters of 20,000 sites informing them that their sites may have been hacked. In the [email message](http://www.traidnt.net/vb/traidnt2077417/), the company warns operators that the affected sites appear to be being used to redirect visitors to a malicious site.

Google asks the site administrators to check the files in their web space for an `eval(function(p,a,c,k,e,r)` JavaScript code segment. The `eval()` function can be used to execute JavaScript character strings that may have previously been decrypted using an unpack feature. Google also warns of specially crafted .htaccess files. These may cause a file to be redirected only in certain circumstances, for example, when a visitor accesses the page via Google. Consequently, regular visitors to a site, such as the webmaster, will be unaware of the infection.

The email contains a link to [Google's Webmaster Tools support page](https://support.google.com/webmasters/bin/answer.py?hl=en&answer=163634) with instructions designed to help web masters clean up their sites. Administrators are also being asked to close the security hole that was exploited to infect the site. Google started warning webmasters in this way in late 2010. At the time, [the company announced](http://www.h-online.com/news/item/Google-warns-users-of-hacked-web-sites-1156568.html) that it also intended to warn users about visiting infected sites in its search results.
