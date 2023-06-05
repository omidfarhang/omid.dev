---
title: Popular sites (including YouPorn) caught sniffing user browser history
date: 2010-12-07T11:52:00+00:00
layout: single
author_profile: true
url: 2010/12/07/popular-sites-including-youporn-caught-sniffing-user-browser-history/
tags:
  - Browser
  - exploit
  - Firefox
  - Google Chrome
  - Internet Explorer
  - privacy
  - Safari
  - Yahoo
lang: en
category: 
  - techblog
---
**The Register:** YouPorn nabbed in real-world privacy sting

[<img title="logo" border="0" alt="logo" align="right" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TP4ZED_pVRI/AAAAAAAADZU/Z-K0uBv2Fm0/logo_thumb%5B9%5D.png?imgmax=800" width="251" height="140" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TP4ZCAqGYcI/AAAAAAAADZQ/JMAMXV1GsnU/s1600-h/logo%5B11%5D.png)Boffins from Southern California have caught YouPorn.com and 45 other sites pilfering visitors' surfing habits in what is believed to be the first study to measure in-the-wild exploits of a decade-old browser vulnerability.

YouPorn, which fancies itself the YouTube of smut, uses JavaScript to detect whether visitors have recently browsed to PornHub.com, tube8.com and 21 other sites, according to the study. It tracked the 50,000 most popular websites and found a total of 46 other offenders, including news sites charter.net and newsmax.com, finance site morningstar.com and sports site espnf1.com.

“We found that several popular sites – including an Alexa global top-100 site – make use of history sniffing to exfiltrate information about users' browsing history, and, in some cases, do so in an obfuscated manner to avoid easy detection,” the report states. “While researchers have known about the possibility of such attacks, hitherto it was not known how prevalent they are in real, popular websites.”

To cover its tracks, YouPorn encodes its JavaScript to hide the sites it searches for and decodes it only when used. Other websites dynamically generate the snoop code to prevent detection by simple inspection. Still others rely on third-party history-stealing libraries from services that include interclick.com and meaningtool.com.

The scientists detected the history stealing by concocting their own version of Google's Chrome browser with a JavaScript information flow engine that “uses a dynamic source-to-source rewriting approach.”

The 46 sites exploit a widely known vulnerability that currently exists in all production version browsers except of Apple's Safari, which earlier this year became the first major browser to insulate users against the threat. Google Chrome, which is based on the same Webkit engine, soon followed. Beta versions of Mozilla Firefox and Microsoft Internet Explorer also fix the problem, but production versions of those browsers are still wide open.

The exploit works by using JavaScript to read cascading style sheet technologies included in virtually every browser that causes visited links to appear in purple rather than blue. Developers have known of the weakness for a decade or more but until recently said it couldn't be easily repaired without removing core functionality.

The study also detected code on sites maintained by Microsoft, YouTube, Yahoo and About.com that perform what the scientists called “behavioral sniffing.” They employ JavaScript that covertly tracks mouse movements on a page to detect what a user does after visiting it.

A PDF of the paper, which was written by Dongseok Jang, Ranjit Jhala, Sorin Lerner, and Hovav Shacham, is [here](http://cseweb.ucsd.edu/~d1jang/papers/ccs10.pdf).

To see what they see from your History, visit this site: <a href="http://startpanic.com/" target="_blank">Start Panic</a>