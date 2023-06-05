---
title: Google Chrome fixes seven high-risk vulnerabilities
date: 2012-04-06T20:28:00+00:00
layout: single
author_profile: true
url: 2012/04/06/google-chrome-fixes-seven-high-risk-vulnerabilities/
tags:
  - Browser
  - Google
  - Google Chrome
  - software
  - Updates
  - Vulnerability
lang: en
categories: 
  - techblog
---
[<img title="new-chrome-logo" border="0" alt="new-chrome-logo" align="right" src="http://lh3.ggpht.com/-21hvbRz1hww/T39K4ZcSLwI/AAAAAAAAFbM/O1ibokDSomQ/new-chrome-logo_thumb%25255B1%25255D.png?imgmax=800" width="128" height="125" />](http://lh6.ggpht.com/-oBFEuHM2jXA/T39Ky857ckI/AAAAAAAAFbE/2TO8aqTx9KY/s1600-h/new-chrome-logo%25255B3%25255D.png)The H-Online: Google [has announced updates](http://googlechromereleases.blogspot.co.uk/2012/04/stable-and-beta-channel-updates.html) to the Stable and Beta channels of their Chrome browser, fixing several bugs and twelve security vulnerabilities. Seven of the twelve security fixes were classed as high-risk problems and Google paid a total of $6000 to the researchers who discovered the bugs. 

The update also includes a new version of the bundled Flash Player. Adobe have revised the Flash Player advisory from the [end of March](http://www.h-online.com/news/item/Patch-for-Adobe-Flash-closes-two-critical-security-holes-1486334.html) to include fixes for a Chrome/Flash only pair of memory corruption issues listed as CVE-2012-0724 and CVE-2012-0725. Given that these issues only affect Chrome and Chrome manages its own update, it is unlikely that Adobe will be reissuing or updating the advisory or patches for other browsers and platforms. 

The seven high risk vulnerabilities are bugs that left several Chrome components open to being exploited by [using memory after it had been freed](https://www.owasp.org/index.php/Using_freed_memory). Many of these issues are detected using [AddressSanitizer](http://code.google.com/p/address-sanitizer/wiki/AddressSanitizer). The Chrome developers have also fixed several cross-origin problems and two issues where the browser could be exploited to read from memory where it shouldn't. Details of these vulnerabilities are not available yet as Google usually gives the updates some time to roll out before it publishes further information. This is done to prevent attackers from reverse engineering the vulnerabilities before the updates have a chance to reach all affected systems. 

Changes in this update that are not security-related include several graphics and HTML Canvas fixes. The developers have also remedied problems with CSS rendering and bugs in the browser's UI.