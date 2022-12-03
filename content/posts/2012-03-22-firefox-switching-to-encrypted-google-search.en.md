---
title: Firefox switching to encrypted Google search
date: 2012-03-22T20:01:00+00:00
layout: single
author_profile: true
url: 2012/03/22/firefox-switching-to-encrypted-google-search/
tags:
  - Announcement
  - Firefox
  - Google
  - Mozilla
  - SSL
lang: en
category: techblog
---
[<img title="logo-wordmark" border="0" alt="logo-wordmark" align="right" src="http://lh5.ggpht.com/-NhBoZaDx_co/T2t-GDRpFLI/AAAAAAAAFSM/6fdcpXvoplU/logo-wordmark_thumb%25255B1%25255D.png?imgmax=800" width="240" height="92" />](http://lh6.ggpht.com/-QGQvrTRY99I/T2t-BR5Z26I/AAAAAAAAFSE/SDGEPsy7f20/s1600-h/logo-wordmark%25255B3%25255D.png)The H-Online: An inconspicuous &#8220;s&#8221; added to various [​lines](https://hg.mozilla.org/mozilla-central/rev/36fd3090b006) of code in its [latest](http://www.squarefree.com/burningedge/2012/03/18/2012-03-18-trunk-builds/) nightly builds means that future versions of Firefox will send all search queries to Google in encrypted form. This means that instead of HTTP, the open source browser will use the HTTPS protocol, which encrypts traffic between the web site and browser using SSL. The nightly builds will feed through, over the next few months, until the feature is, most probably, in Firefox 14. 

The change has been prompted by a discussion between Firefox developers which [started](https://bugzilla.mozilla.org/show_bug.cgi?id=633773) about a year ago. Then, Google opposed making SSL the default, with Adam Langley, a member of Google's security team, [explaining](https://bugzilla.mozilla.org/show_bug.cgi?id=633773#c4) that the encrypted search was slower than the standard unencrypted search. 

Google has since made encryption the [global default](http://www.h-online.com/news/item/Google-is-globally-switching-its-search-to-HTTPS-by-default-1468558.html) for its own search site, though only for signed-in users. In early February, the Firefox development team gave the green light for the change to go ahead in the browser as well. 

The switch to SSL means that only Google will be able to read search queries. According to Danny Sullivan, [​writing](http://searchengineland.com/firefox-to-use-google-secure-search-by-default-116231) on his Search Engine Land blog, they will, however, continue to be contained in the referrer header which the browser sends to the relevant web site when a user clicks on an advert. He has asked both the Firefox and Internet Explorer development teams whether they would stop sending this critical referrer data, but has not received a response from either browser maker.