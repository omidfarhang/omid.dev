---
title: Yahoo released private certificate with new extension
date: 2012-05-25T09:16:00+00:00
layout: single
author_profile: true
url: 2012/05/25/yahoo-released-private-certificate-with-new-extension/
tags:
  - privacy
  - report
  - Yahoo
lang: en
categories: 
  - techblog
---
[<img title="axisscreenbig" border="0" alt="axisscreenbig" align="right" src="http://lh6.ggpht.com/-zcbUM2UWWs0/T79G27HrnQI/AAAAAAAAGFs/mCFDu-lvj4c/axisscreenbig_thumb%25255B2%25255D.png?imgmax=800" width="244" height="85" />](http://lh3.ggpht.com/-NmgK1g58UzY/T79GzkK5VQI/AAAAAAAAGFk/JhAthPA4mqY/s1600-h/axisscreenbig%25255B4%25255D.png)<a href="http://www.h-online.com/" target="_blank">H-Online</a>: Yahoo! introduced a new “browser”, [Axis](http://axis.yahoo.com/), last night, both as a standalone application for iPhone and iPad and as a browser extension on Chrome, Firefox, Internet Explorer and Safari. Axis is meant to offer faster, smarter searching using Yahoo's services. Within hours of the launch, hacker and blogger Nik Cubrilovic [posted on his blog](http://nikcub.appspot.com/posts/yahoo-axis-chrome-extension-leaks-private-certificate-file) that the Chrome extension came with a worrying extra, a Yahoo private certificate file which was used to sign the extension package and prove the package's authenticity to the Google browser. 

With the private key in the wild it would be possible to create and sign an extension which appeared to be from Yahoo!; Cubrilovic demonstrated this by creating “[yahoo-spoof](https://github.com/nikcub/yahoo-spoof)“, a lightly modified version of the extension, signed with the private certificate. According to Cubrilovic, there was no password associated with the certificate, which allowed this signing to take place, and the build script was also included in the extension. 

It would have been possible, if DNS was appropriately compromised, to have updated a legitimate Axis extension with a correctly signed but malicious version. Given how new Axis is, this would have been unlikely, but leaving a private certificate in the distributed extension does raise questions over how through and secure Yahoo's release process is. A member of the Axis team, Ethan Batraski, [commented](http://thenextweb.com/insider/2012/05/24/whoops-someone-forgot-to-publish-the-yahoo-axis-terms-and-conditions/) on various sites that Yahoo! had pulled down the Chrome extension and blacklisted the exposed certificate. The company has since released an updated version of the Chrome extension signed with a new private certificate.