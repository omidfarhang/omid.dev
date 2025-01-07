---
title: Google plans to turn off online checks for SSL certificate validity
date: 2012-02-07T14:07:00+00:00
layout: single
author_profile: true
url: 2012/02/07/google-plans-to-turn-off-online-checks-for-ssl-certificate-validity/
tags:
  - Browser
  - Google
  - Google Chrome
  - news
  - SSL
lang: en
categories: 
  - TechBlog
---
**[<img title="new-chrome-logo" border="0" alt="new-chrome-logo" align="right" src="http://lh4.ggpht.com/-EZg5DtyTaQo/TzEpHdSxRbI/AAAAAAAAEhw/yr9BGtBjzNU/new-chrome-logo_thumb%25255B1%25255D.png?imgmax=800" width="128" height="125" />](http://lh3.ggpht.com/-psxG5t21KGw/TzEo4Qx435I/AAAAAAAAEho/1lsmsL3CQAo/s1600-h/new-chrome-logo%25255B3%25255D.png)The H-Online:** Google plans to turn off online checks for SSL certificate validity in its Chrome browser soon, according to a [blog post](http://www.imperialviolet.org/2012/02/05/crlsets.html) by Adam Langley, the developer in charge of that element of the browser. Instead, the browser will use the update mechanism to receive lists of revoked certificates. 

When browsers make a connection, they check whether the certificate presented by the server has already been blocked by the certificate authority, using either the certificate authority's certificate revocation lists (CRLs) or, directly and interactively, the Online Certificate Status Protocol (OCSP). But that whole process has never been completely reliable, since, if the browser isn't certain of the validity – if, say, an OCSP request doesn't work – it simply “looks the other way”. Otherwise, there would be too many false alarms. 

At the same time, an attacker manipulating SSL connections can generally also interrupt OCSP requests, as clearly demonstrated by tools such as [sslsniff](http://www.thoughtcrime.org/software/sslsniff/). When the breach at Comodo resellers made certificate revocations necessary, browser developers were obliged to embed those revocations into their browsers through updates. 

Since OCSP requests significantly extend the loading time for SSL pages even during normal operations, Google plans to make the best of the situation. In future, the online checks will be done away with and replaced with lists that are renewed through an existing update mechanism which doesn't require the browser to restart and makes the updated lists available immediately. Langley is inviting the certificate authorities to contribute their revocation lists to Google's browser revocation list before Google implements the changes. Whether, and to what extent, this change will also affect extended validation certificates remains to be seen.