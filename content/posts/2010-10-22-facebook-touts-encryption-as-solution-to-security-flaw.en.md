---
title: Facebook touts encryption as solution to security flaw
date: 2010-10-22T20:58:00+00:00
layout: single
author_profile: true
url: 2010/10/22/facebook-touts-encryption-as-solution-to-security-flaw/
tags:
  - Facebook
  - Facebook Privacy
  - news
  - privacy
  - social networking
lang: en
category: techblog
---
[<img title="facebook(low)" border="0" alt="facebook(low)" align="right" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TMHz7kVXEYI/AAAAAAAAC3k/7QWpbQTkOJE/facebook%28low%29_thumb.jpg?imgmax=800" width="154" height="47" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TMHz5t7jxKI/AAAAAAAAC3g/myp3hfeZW3U/s1600-h/facebook%28low%29%5B2%5D.jpg)Facebook has proposed a solution to a recent security flaw that allowed apps to transmit personal data that involves encrypting the relevant string of numbers, according to a post on its [Developer Blog](http://developers.facebook.com/blog/post/419) on Thursday. The new set of parameters would allow developers to apply encryption within the next few weeks, preventing data that identifies application users from leaking to places it shouldn't be.

Facebook's security flaw works something like this: when a Facebook user loads a particular kind of application (one that uses iframes) and authorizes the application to access their profile, the URL of the iframe then carries the user's UID, a number that can link the account to actions on other websites.

Usually the UID is responsible for webpage personalization, as when a box informs you which of your other friends have “liked” something on a page outside of Facebook. If an ad network or similarly nefarious Web presence is able to mine the iframes for UIDs, it could open users up to a new level of targeting.

To make iframe-based applications handle UIDs more responsibly, Facebook's Mike Vernal has proposed that developers begin encrypting the parameters passed to these applications. Facebook has posted the technical details of the proposal, followed by a comment thread for developers to give feedback.

[InformationWeek](http://www.informationweek.com/news/security/vulnerabilities/showArticle.jhtml?articleID=227900537&cid=RSSfeed_IWK_ALL) notes that while this would prevent the accidental sharing of UIDs, it will not make HTTP referrer headers less prone to carrying information about the use of other websites. Data sharing via HTTP headers is a “Web-wide problem” that Facebook wants to address as a whole in the coming months.

_Taken from ‘[Ars Technica](http://arstechnica.com/)’_