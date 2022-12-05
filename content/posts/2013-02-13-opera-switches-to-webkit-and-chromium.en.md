---
title: Opera Switches to WebKit and Chromium
date: 2013-02-13T22:38:00+00:00
layout: single
author_profile: true
url: 2013/02/13/opera-switches-to-webkit-and-chromium/
tags:
  - Browser
  - Google
  - Google Chrome
  - news
  - Opera
  - WebKit
lang: en
category: techblog
---
After many years of dealing with site compatibility issues, Opera found [the solution](http://my.opera.com/haavard/blog/2013/02/13/webkit): it will switch from its proprietary rendering engine (Presto) to WebKit and [will be powered by Chrome's open source version, Chromium](http://my.opera.com/ODIN/blog/300-million-users-and-move-to-webkit).

“Presto is a great little engine. It's small, fast, flexible and standards compliant while at the same time handling real-world web sites. It has allowed us to port Opera to just about any platform you can imagine. (…) It was always a goal to be compatible with the real web while also supporting and promoting open standards. That turns out to be a bit of a challenge when you are faced with a web that is not as open as one might have wanted. Add to that the fact that it is constantly changing and that you don't get site compatibility for free (which some browsers are fortunate enough to do), and it ends up taking up a lot of resources – resources that could have been spent on innovation and polish instead,” [explains an Opera employee](http://my.opera.com/haavard/blog/2013/02/13/webkit).

“For all new products Opera will use WebKit as its rendering engine and V8 as its JavaScript engine. It's built using the open-source Chromium browser as one of its components. Of course, a browser is much more than just a renderer and a JS engine, so this is primarily an &#8216;under the hood' change. Consumers will initially notice better site compatibility, especially with mobile-facing sites – many of which have only been tested in WebKit browsers. The first product will be for Smartphones, which we'll demonstrate at Mobile World Congress in Barcelona at the end of the month. Opera Desktop and other products will transition later,” [mentions Bruce Lawson](http://my.opera.com/ODIN/blog/300-million-users-and-move-to-webkit).

The problem with Opera is that it has a low market share on the desktop ([about 1-2%](http://en.wikipedia.org/wiki/Usage_share_of_web_browsers#StatCounter_.28July_2008_to_present.29)) and not many web developers bother to test their sites in Opera. Google's sites have always had issues in Opera and most Google web apps don't officially support Opera (check the system requirements for [Google Drive](http://support.google.com/drive/bin/answer.py?hl=en&answer=2375082)). Gmail's help center actually mentions that “_We don't test Opera, but believe it works with all of Gmail's features._” Probably Google doesn't want to allocate resources for testing sites in a desktop browser that's not popular, but it has a completely different rendering engine.

<a href="http://lh3.ggpht.com/-NWw2ge0Eu54/URwOul0ML0I/AAAAAAAAHus/xfUMqCWOZDA/s1600-h/google-docs-in-opera%25255B6%25255D.jpg" target="_blank"><img title="google-docs-in-opera" border="0" alt="google-docs-in-opera" src="http://lh5.ggpht.com/-y7vrRig_9gk/URwOwvOu_GI/AAAAAAAAHu0/qbObNH7zgVI/google-docs-in-opera_thumb%25255B4%25255D.jpg?imgmax=800" width="504" height="179" /></a> 

In a perfect world, browsers and sites would just follow the standards and everything would work well, but it takes time to create the standards and browsers implement their own version in the meanwhile. Not to mention that browsers have [all kinds of quirks](http://www.quirksmode.org/compatibility.html).

Google launched Chrome in 2008 and [one of the reasons why it chose WebKit](http://blog.chromium.org/2008/09/chrome-3s-webkit.html) was that “we knew we didn't want to create yet another rendering engine. After all, web developers already have enough to worry about when it comes to making sure that all users can access their web pages and web applications.”

[WebKit started](http://en.wikipedia.org/wiki/WebKit) in 2001 as an Apple fork of KDE's KHTML engine, it was used to build Safari, a few years later it was open sourced and Nokia ported WebKit to Symbian. WebKit is now the most popular mobile rendering engine, since it powers Safari Mobile and all iOS browsers (other than thin clients like Opera Mini), Android's stock browser, Chrome for Android and many other mobile browsers. WebKit's combined market share is now [more than 40%](http://en.wikipedia.org/wiki/Usage_share_of_web_browsers#StatCounter_.28July_2008_to_present.29), according to StatCounter and Wikimedia's stats.

_Credit: Google Operation System <a href="http://googlesystem.blogspot.com/" target="_blank">blog</a>_