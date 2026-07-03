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
  - Security

categories:
  - TechBlog
---
Cybercriminals are attacking bloggers who use Google’s Blogger.com. We have received emails intended for bloggers to update their account. Here’s the snapshot email of the email we have received:

[![](/images/2010/03/email.jpg)](/images/2010/03/email-ebdde631.jpg)

The email contains link that will redirect to fake login page of the “Blogger.com”. As seen from the highlighted link, it has a root domain “*.erdca.kr” which is differ from the authentic root domain of blogger.com. The fake login page which is known as phishing site appears to be like this:

[![](/images/2010/03/fakebloggersite2.jpg)](/images/2010/03/fakebloggersite2-a3584712.jpg)

Upon entering the bloggers credentials and clicking “Sign in” button on the phishing site above, it will redirect to this page saying the account is updated:

[![](/images/2010/03/fakebloggersiteupdate.jpg)](/images/2010/03/fakebloggersiteupdate-b9e0585e.jpg)

Blogger’s credentials will be secretly sent to the phishers site.

[![](/images/2010/03/packetscapture.jpg)](/images/2010/03/packetscapture-0f5d5r5rr.jpg)

The stolen blog may be:

  * sold for profit due to its readiness to earn income through advertising etc.
  * modified and put phishers advertisements for another potential income.

Be extra careful when logging in your credentials in the internet. Always double check the root domain of the site before you log-on. This will give you an idea if it’s Fake or Authentic site.