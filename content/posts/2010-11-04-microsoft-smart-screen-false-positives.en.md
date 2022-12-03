---
title: Microsoft Smart Screen False Positives
date: 2010-11-04T22:19:00+00:00
layout: single
author_profile: true
url: 2010/11/04/microsoft-smart-screen-false-positives/
tags:
  - Internet Explorer
  - Microsoft
  - report
  - SmartScreen
lang: en
category: techblog
---
[<img title="screenshot_smartscreen" border="0" alt="screenshot_smartscreen" align="right" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TNMqarQQCyI/AAAAAAAADCg/KZh9JC6bGkY/screenshot_smartscreen_thumb%5B1%5D.jpg?imgmax=800" width="154" height="114" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TNMqVz8GZXI/AAAAAAAADCc/IQ1i1alV-Xw/s1600-h/screenshot_smartscreen%5B4%5D.jpg)SANS.edu: We received a couple of reports about Microsoft's &#8220;Smart Screen&#8221; flagging harmless sites as malicious. Initially, we considered the possibility of an infected ad service. But it may be a bug in Smartfilter as well. Some reports on <a href="http://twitter.com/#!/search/%23smartscreen" target="_blank">twitter</a> show that the problem has been resolved.

Please let us know if you have sample URLs that are still affected.

To disable smart screen: Select &#8220;Internet Options&#8221; from the &#8220;Tools&#8221; menu. Select the &#8220;Advanced&#8221; tab and find the &#8220;Enable SmartScreen Filter&#8221;  setting (about the 10th item from the bottom. Scroll all the way down). Needless to say: This will also remove the smart screen protection from real-evil sites, not just from appear-to-be-evil-to-smartscreen-today sites. The setting should only be changed if you can't wait for the problem to be fixed.