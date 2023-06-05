---
title: Apple previews OS X 10.8 with Gatekeeper
date: 2012-02-17T14:45:00+00:00
layout: single
author_profile: true
url: 2012/02/17/apple-previews-os-x-10-8-with-gatekeeper/
tags:
  - Announcement
  - Apple
  - Mac OS X
  - Updates
lang: en
category: 
  - techblog
---
**[<img title="ml_100" border="0" alt="ml_100" align="right" src="http://lh3.ggpht.com/-gI3X2n5or38/Tz5g_WQbqII/AAAAAAAAE1s/p_9MRgAovdg/ml_100_thumb%25255B1%25255D.png?imgmax=800" width="100" height="93" />](http://lh3.ggpht.com/-EieElZzWL5c/Tz5gzdw352I/AAAAAAAAE1k/Jhfg1DrJ9uI/s1600-h/ml_100%25255B3%25255D.png)The H-Online:** A developer preview of Mac OS X 10.8 is now available to registered Mac developers after [Apple](http://apple.com/) announced the new version, named [Mountain Lion](http://www.apple.com/macosx/mountain-lion/), and previewed a number of its features. Among those features is [Gatekeeper](http://www.apple.com/macosx/mountain-lion/features.html#gatekeeper) which Apple says “helps prevent you from unknowingly downloading and installing malicious software”. 

The Gatekeeper feature has three levels of security for running applications downloaded from the Internet; “Mac App Store”, “Mac App Store and identified developers” and “Anywhere”. The first setting only runs applications downloaded from the Mac App Store, in a style similar to the iPhone only running apps from the App Store. Unlike the iPhone though, Gatekeeper lets users allow applications from other sources. The “Mac App Store and Identified Developers” option only allows applications from the store and from developers who have signed their program with an Apple-issued Developer ID, while “Anywhere” allows any program to be downloaded and run. It is unclear how Gatekeeper interacts with software loaded from other media, such as a USB memory stick or CD/DVD. 

According to [reports](http://www.macrumors.com/2012/02/16/gatekeeper-already-present-in-os-x-10-7-3-available-for-developer-testing/), Apple has informed developers that Gatekeeper is already present in Mac OS X 10.7.3, but lacks a graphical user interface. It can be enabled with the command “sudo spctl –enable” and disabled with “sudo spctl –disable”. This inclusion will allow developers to test their applications with Gatekeeper and, soon, with newly issued Developer IDs, well before the release of OS X 10.8.