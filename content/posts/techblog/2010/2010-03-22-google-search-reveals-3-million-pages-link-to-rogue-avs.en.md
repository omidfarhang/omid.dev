---
title: Google search reveals 3 million pages link to rogue AVs
date: 2010-03-22T15:59:00+00:00
layout: single
author_profile: true
url: 2010/03/22/google-search-reveals-3-million-pages-link-to-rogue-avs/
tags:
  - Google
  - malware
  - review
  - scam
  - YouTube
lang: en
categories: 
  - TechBlog
---
Do you know what the latest version of Adobe’s Flash Player is? If you don’t, you may very well fall for this:

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S6eLs_q-qTI/AAAAAAAABWE/HCTbO1ju4l4/s400/g1.png)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S6eLs_q-qTI/AAAAAAAABWE/HCTbO1ju4l4/s1600-h/g1.png)

Flash Player 11?

There are more than 3 million pages linking to this alleged version 11:

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S6eLtnfWDwI/AAAAAAAABWI/LeOreVi5JtM/s400/g2.png)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S6eLtnfWDwI/AAAAAAAABWI/LeOreVi5JtM/s1600-h/g2.png)

Most pages are from unsanitized forums, but there is even a Google Ad for it! Ooooops….

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S6eLthqaFSI/AAAAAAAABWM/uMkx8YONZf4/s400/g3.png)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S6eLthqaFSI/AAAAAAAABWM/uMkx8YONZf4/s1600-h/g3.png)

The screen below depicts the social engineering trick: What appears to be an X-rated video with a Windows Media Player logo (that is odd!).

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S6eLt9vbWCI/AAAAAAAABWQ/nHa2JqS3t2M/s400/g5.png)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S6eLt9vbWCI/AAAAAAAABWQ/nHa2JqS3t2M/s1600-h/g5.png)

What intrigued me in that screenshot was that this malicious post was made with a user account that was highly rated:

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S6eLt-sT_JI/AAAAAAAABWU/ArRhqrLzoCQ/s1600/hero.png)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S6eLt-sT_JI/AAAAAAAABWU/ArRhqrLzoCQ/s1600-h/hero.png)

Such posts are automated, so I’d guess this user got his credentials stolen. Regardless, it adds to the deceptiveness, coming from what looks like an ‘approved’ forum user.

 What happens next is an intermediary URL, freevideos.osa.pl/video.php?, redirects you to fast flux domains updated on a regular basis, all showing the well known “YouTube-like” screenie:

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S6eMeEHcJiI/AAAAAAAABWY/DDcNncKg66A/s400/g6.png)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S6eMeEHcJiI/AAAAAAAABWY/DDcNncKg66A/s1600-h/g6.png)

Clicking on it will download ‘video-plugin.45210.exe’ (Virus Total detection [here](http://www.virustotal.com/analisis/c3b76274c1162b2c8e10c2aeca63b5d352d99a38a1263f5497c0b137097f16a0-1268690835))

 So, what really is the latest Adobe Flash Player? The answer: 10.0.45.2

You can find it here <http://www.adobe.com/software/flash/about/>

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S6eMeO0FBWI/AAAAAAAABWc/MNZMZfnT1ik/s400/g4.png)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S6eMeO0FBWI/AAAAAAAABWc/MNZMZfnT1ik/s1600-h/g4.png)

Looks like the bad guys are already one step ahead. By the way, I did a Google search with version 12 and it returned nothing 😉

In the meantime, there are million of pages out there fooling people and infecting them with a non-existent Flash Player version.