---
title: PCWorld links to scareware
date: 2010-10-21T21:37:00+00:00
layout: single
author_profile: true
url: 2010/10/21/pcworld-links-to-scareware/
tags:
  - advice
  - Hijack
  - Malware
  - report
  - review
  - scam
  - Security

categories:
  - TechBlog
---
I was reading an article on PCWorld’s website about the upcoming Google Chrome OS:

![pcworld](http://lh3.ggpht.com/_vaUVXcmC3OI/TMCrNYcVI8I/AAAAAAAAC1k/LB5WE5OM3Yw/s1600-h/pcworld%5B3%5D.png)

So far so good. Except that I inadvertently clicked on one of their sponsored links:

![links](http://lh3.ggpht.com/_vaUVXcmC3OI/TMCrRir42WI/AAAAAAAAC1s/2zp-qBzEGRM/s1600-h/links%5B4%5D.png)

which ironically states “Here is all about spyware removal and even more.”

After a few redirects, my browser is hijacked by one of those FakeAV scanners:

![fakeav](http://lh4.ggpht.com/_vaUVXcmC3OI/TMCrXvBFAzI/AAAAAAAAC10/es598LwRY-U/s1600-h/fakeav%5B3%5D.png)

Here is the HTTP traffic capture screenshot and log:

![fiddlerscreen](http://lh6.ggpht.com/_vaUVXcmC3OI/TMCrcBlxdlI/AAAAAAAAC18/oGrEODMZyP4/s1600-h/fiddlerscreen%5B3%5D.png)

[fiddlerlog1](http://blogs.paretologic.com/malwarediaries/images/2010/10/fiddlerlog1.txt)

Most computer users will end up with this on their PC:

![rog21](http://lh5.ggpht.com/_vaUVXcmC3OI/TMCrihrSJ5I/AAAAAAAAC2E/RCO00hHjQck/s1600-h/rog21%5B3%5D.png)

Third-party ads are the cause of a lot of problems. It does not matter how legitimate a site is, as long as it is referencing dynamic ads, it can expose its users to malware.

I usually never click on “Sponsored links” as I’m most likely not interested in such or such product. But a lot of people do because those links are relevant to the article (or the search). For every click, the website hosting the ad will receive some money, and more if the user “converts” (the user ends up buying whatever was promoted).

As a general rule, I would advise never to click on “Sponsored links” or ads that you see on a website. There is big debate about marketing: Does it fulfill a need people already had and never knew or does it create a need that never existed? I believe in the latter.

Then again, you may click on one by accident!

_Taken From ‘malware diaries’_