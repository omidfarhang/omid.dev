---
title: Google closes persistent XSS holes in Gmail
date: 2012-06-14T07:56:00+00:00
layout: single
author_profile: true
url: 2012/06/14/google-closes-persistent-xss-holes-in-gmail/
tags:
  - Google
  - Google Mail
  - Updates
  - XSS
lang: en
category: 
  - techblog
---
<a href="http://lh4.ggpht.com/-6Zc1Bg0dyrU/T9mSLzP3heI/AAAAAAAAGPA/_Vs6RjpNuO4/s1600-h/gmail-logo200%25255B2%25255D.png" target="_blank"><img title="gmail-logo200" border="0" alt="gmail-logo200" align="right" src="http://lh4.ggpht.com/-tcaZDLjfGBw/T9mSOL6iGvI/AAAAAAAAGPI/rSLVoNiWxds/gmail-logo200_thumb.png?imgmax=800" width="200" height="93" /></a>The H-online: Google has closed several cross-site scripting (XSS) holes in its Gmail email service – which has more than 350 million active users – that could have allowed an attacker to inject a malicious client-side script into a victim's system. Security researcher Nils Juenemann discovered the three different XSS vulnerabilities in Gmail and disclosed them to Google's Security Team as part the company's [Vulnerability Reward Program](http://www.google.com/about/company/rewardprogram.html), in which researchers are rewarded with up to $20,000 for reporting qualifying bugs in its web-based services. 

The worst of these was a [persistent](http://en.wikipedia.org/wiki/Cross-site_scripting#Persistent) XSS vulnerability exploitable via a specially crafted URL; persistent XSS flaws are considered to be more dangerous than normal XSS problems as data provided by an attacker is saved by the server, possibly leading to the execution of arbitrary code. For an attack to be successful, an attacker first needed to obtain key information including the user's static ID and the message ID. However, Juenemann says that the needed values were easy to get through referrer leaking: by sending an HTML-encoded email to victims with additional content, the required information is leaked when the message is opened and a link is clicked. 

The other XSS flaws were a persistent [DOM-based](http://en.wikipedia.org/wiki/Cross-site_scripting#Traditional_versus_DOM-based_vulnerabilities) ([Document Object Model](http://en.wikipedia.org/wiki/Document_Object_Model)) XSS bug and a reflective DOM XSS bug in the mobile view for Gmail used on, for example, tablets such as the iPad. Juenemann says that the Google Security Team was quick to fix the bugs after he reported them. Further details about these can be found in Juenemann's [blog post](http://www.nilsjuenemann.de/2012/06/cross-site-scripting-in-google-mail.html?m=1), in which he also recommends that users enable [2-step verification](http://www.h-online.com/news/item/Google-brings-2-step-verification-to-more-than-150-countries-1288358.html) on their accounts. 

[http://h-online.com/-1617159](http://h-online.com/-1617159 "http://h-online.com/-1617159")