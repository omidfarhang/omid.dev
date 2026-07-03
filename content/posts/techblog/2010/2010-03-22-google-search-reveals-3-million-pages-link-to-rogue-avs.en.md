---
title: Google search reveals 3 million pages link to rogue AVs
date: 2010-03-22T15:59:00+00:00
layout: single
author_profile: true
url: 2010/03/22/google-search-reveals-3-million-pages-link-to-rogue-avs/
tags:
  - Google
  - Malware
  - review
  - scam
  - YouTube
  - Security

categories:
  - TechBlog
---
Do you know what the latest version of Adobe’s Flash Player is? If you don’t, you may very well fall for this:

[![](/images/2010/03/g1.png)](/images/2010/03/g1-3878aadc.png)

Flash Player 11?

There are more than 3 million pages linking to this alleged version 11:

[![](/images/2010/03/g2.png)](/images/2010/03/g2-207ae50c.png)

Most pages are from unsanitized forums, but there is even a Google Ad for it! Ooooops….

[![](/images/2010/03/g3.png)](/images/2010/03/g3-8c1f0cf5.png)

The screen below depicts the social engineering trick: What appears to be an X-rated video with a Windows Media Player logo (that is odd!).

[![](/images/2010/03/g5.png)](/images/2010/03/g5-bca46dbd.png)

What intrigued me in that screenshot was that this malicious post was made with a user account that was highly rated:

[![](/images/2010/03/hero.png)](/images/2010/03/hero-7608538b.png)

Such posts are automated, so I’d guess this user got his credentials stolen. Regardless, it adds to the deceptiveness, coming from what looks like an ‘approved’ forum user.

 What happens next is an intermediary URL, freevideos.osa.pl/video.php?, redirects you to fast flux domains updated on a regular basis, all showing the well known “YouTube-like” screenie:

[![](/images/2010/03/g6.png)](/images/2010/03/g6-44aff836.png)

Clicking on it will download ‘video-plugin.45210.exe’ (Virus Total detection [here](http://www.virustotal.com/analisis/c3b76274c1162b2c8e10c2aeca63b5d352d99a38a1263f5497c0b137097f16a0-1268690835))

 So, what really is the latest Adobe Flash Player? The answer: 10.0.45.2

You can find it here <http://www.adobe.com/software/flash/about/>

[![](/images/2010/03/g4.png)](/images/2010/03/g4-1a1be7f9.png)

Looks like the bad guys are already one step ahead. By the way, I did a Google search with version 12 and it returned nothing 😉

In the meantime, there are million of pages out there fooling people and infecting them with a non-existent Flash Player version.