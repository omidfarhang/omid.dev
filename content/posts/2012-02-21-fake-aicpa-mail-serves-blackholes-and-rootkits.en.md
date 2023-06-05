---
title: Fake AICPA Mail Serves Blackholes and Rootkits
date: 2012-02-21T20:29:00+00:00
layout: single
author_profile: true
url: 2012/02/21/fake-aicpa-mail-serves-blackholes-and-rootkits/
tags:
  - advice
  - alert
  - malware
  - spam
lang: en
category: 
  - techblog
---
**Sunbelt:** Be wary of emails claiming to be from AICPA – as per their alert [here](http://www.aicpa.org/News/FeaturedNews/Pages/alert-fraudulent-email.aspx), these are not real and any mention of “unlawful tax return fraud” is just a bait to convince the end-user to open up a malicious attachment (in this case, a .doc file although there are rogue PDF files in circulation too). 

[<img title="aicpaexploitmails" border="0" alt="aicpaexploitmails" src="http://lh6.ggpht.com/-90d3co_hVds/T0P3ftEUoBI/AAAAAAAAE7g/euCBkpsrYg0/aicpaexploitmails_thumb%25255B1%25255D.jpg?imgmax=800" width="504" height="260" />](http://lh4.ggpht.com/-BT0lPZFhSho/T0P3SFbgmkI/AAAAAAAAE7Y/ZMG7VbhiSM4/s1600-h/aicpaexploitmails%25255B3%25255D.jpg) 

As with many of the malicious spam campaigns doing the rounds at the moment, this one will use the Blackhole exploit kit to serve up zbot from multiple compromised domains. Worse, a Sakura kit (typical example [here](http://xylibox.blogspot.com/2012/01/sakura-exploit-pack-10.html)) will download Sirefef / ZeroAccess , which as we’ve seen elsewhere is [not a good thing to have on your system](http://www.cio.com/article/691811/Bing_and_Yahoo_Sponsored_Results_Lead_to_Hard_to_Remove_Rootkit). 

One of the more unpleasant spam campaigns we’ve seen recently.