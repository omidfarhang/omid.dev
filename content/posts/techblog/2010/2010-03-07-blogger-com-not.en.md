---
title: Blogger.com – -not!
date: 2010-03-07T01:32:00+00:00
layout: single
author_profile: true
url: 2010/03/07/blogger-com-not/
tags:
  - alert
  - phishing
  - scam
  - spam
lang: en
categories: 
  - TechBlog
---
Cybercriminals are attacking bloggers who use Google’s Blogger.com. We have received emails intended for bloggers to update their account. Here’s the snapshot email of the email we have received:

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S5L5_b9mR0I/AAAAAAAABNk/gkm7Afhg_oA/s400/email.jpg)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S5L5_b9mR0I/AAAAAAAABNk/gkm7Afhg_oA/s1600-h/email.jpg)

The email contains link that will redirect to fake login page of the “Blogger.com”. As seen from the highlighted link, it has a root domain “*.erdca.kr” which is differ from the authentic root domain of blogger.com. The fake login page which is known as phishing site appears to be like this:

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S5L6BI4RmNI/AAAAAAAABNs/_myazt6CDJE/s400/fakebloggersite2.jpg)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S5L6BI4RmNI/AAAAAAAABNs/_myazt6CDJE/s1600-h/fakebloggersite2.jpg)

Upon entering the bloggers credentials and clicking “Sign in” button on the phishing site above, it will redirect to this page saying the account is updated:

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S5L6CQOor8I/AAAAAAAABN0/oEW8Kdeyxzw/s400/fakebloggersiteupdate.jpg)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S5L6CQOor8I/AAAAAAAABN0/oEW8Kdeyxzw/s1600-h/fakebloggersiteupdate.jpg)

Blogger’s credentials will be secretly sent to the phishers site.

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S5L6EU1mngI/AAAAAAAABN8/aME1eQuVZu0/s400/packetscapture.jpg)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S5L6EU1mngI/AAAAAAAABN8/aME1eQuVZu0/s1600-h/packetscapture.jpg)

The stolen blog may be:

  * sold for profit due to its readiness to earn income through advertising etc.
  * modified and put phishers advertisements for another potential income.

Be extra careful when logging in your credentials in the internet. Always double check the root domain of the site before you log-on. This will give you an idea if it’s Fake or Authentic site.