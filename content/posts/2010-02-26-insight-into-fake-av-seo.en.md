---
title: Insight into fake AV SEO
date: 2010-02-26T20:25:00+00:00
layout: single
author_profile: true
url: 2010/02/26/insight-into-fake-av-seo/
tags:
  - advice
  - alert
  - malware
  - phishing
  - report
  - review
  - scam
lang: en
category: techblog
---
In this post I want to highlight how SEO attacks are working:

  1. Pages using server side kits to fool search engine bots into ranking them high in results are uploaded to legitimate web sites. If all goes to plan, when a user searches for a popular term, high up in the search engine results are links to these pages. In the example below, the malicious SEO page was the 2nd item in the search results (highlighted in blue).
  2. When the user arrives on such a page (highlighted in green in the example below), the referrer is typically checked to ensure they came from a search engine. If so, there are redirected (302 redirect) to another site (orange below).
  3. There are typically additional levels of redirection from this point. In the example shown below, the user is bounced from the .org to the .in site (purple).
  4. Finally, the user will be redirected to the fake AV distribution site (red). This is where the user receives the usual visual trickery, in order to fool them into installing the rogue application.

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S4gme8XaQcI/AAAAAAAABBk/njEBqA2qxsc/s640/seo_fake2.jpg)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S4gme8XaQcI/AAAAAAAABBk/njEBqA2qxsc/s1600-h/seo_fake2.jpg)

So how do you protect against these attacks? Of course, detected the fake AV itself is important, and as Graham indicated, [Mal/FakeAV-BW](http://www.sophos.com/security/analyses/viruses-and-spyware/malfakeavbw.html) does just that for this spate of attacks. But there are additional layers of protection as well, which are equally important.

The first is URL filtering – blocking access to the malicious sites used in these attacks. This is highly effective, made ever more challenging with attackers continually using freshly registered domains (`.in` being a current favourite). On top of this, detection of some of the redirect pages themselves can be really valuable. Earlier this week I added [Troj/JSRedir-AT](http://www.sophos.com/security/analyses/viruses-and-spyware/trojjsredirat.html) for this very purpose. Additionally, detection for the scripts used in the fake AV distribution sites themselves provide another tier of protection (blocked as [Mal/FakeAvJs-A](http://www.sophos.com/security/analyses/viruses-and-spyware/malfakeavjsa.html)). With this detection in place, when the user clicks on the SEO link in the search engine they simply see a block page and the attack is thwarted.

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S4gmfspawgI/AAAAAAAABBs/vxcDG2naQrw/s640/seo_block.jpg)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S4gmfspawgI/AAAAAAAABBs/vxcDG2naQrw/s1600-h/seo_block.jpg)

If I look through some of the URLs on which we have been detecting Troj/JSRedir-AT over the past 24 hours, I can extract the search terms that the user was using. The usual suspects are present: ‘killer whales’, ‘Winter Olympics’, technology, Tiger Woods (sigh) and ‘American Idol’ (bigger sigh).

> jagr+hit  \
> ovechkin+hit+on+jagr  \
> Cheryl+Bernard+swimsuit  \
> Dawn+Brancheau  \
> hannah+storm+outfit+picture  \
> Hannah+Storm  \
> olympic+hockey+bracket+2010  \
> seaworld+accident  \
> shamu+attacks  \
> who+did+tim+urban+replace+on+american+idol  \
> tiger+woods+apology+video  \
> american+idol+judges  \
> motorola+backflip+specs  \
> Scotty+Largo+Pictures  \
> seaworld+trainer+killed  \
> shamu+attacks  \
> usa+hockey+roster  \
> natalee+holloway+latest+news  \
> natalie+holloway  \
> yu+na+kim  \
> whale+kills+trainer+video

As ever, it is the combination of product technologies that provide the best protection against such threats.
