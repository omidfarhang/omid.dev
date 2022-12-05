---
title: Chrome 18 improves graphics performance, closes security holes
date: 2012-03-29T14:26:00+00:00
layout: single
author_profile: true
url: 2012/03/29/chrome-18-improves-graphics-performance-closes-security-holes/
tags:
  - Browser
  - Google
  - Google Chrome
  - software
  - Updates
lang: en
category: techblog
---
[<img title="new-chrome-logo" border="0" alt="new-chrome-logo" align="right" src="http://lh4.ggpht.com/-5rGDEem1_34/T3RqDf3SHiI/AAAAAAAAFU0/7pZpQFaNyUI/new-chrome-logo_thumb%25255B1%25255D.png?imgmax=800" width="128" height="125" />](http://lh5.ggpht.com/-BfPid33cfng/T3RqBXoTN2I/AAAAAAAAFUs/CswboIa19-g/s1600-h/new-chrome-logo%25255B3%25255D.png)Google has released version 18 of Chrome, the company's own extended version of the open source Chromium web browser. The new [Stable channel](http://www.chromium.org/getting-involved/dev-channel#TOC-How-do-I-choose-which-channel-to-us) release, labeled 18.0.1025.142, fixes several security vulnerabilities, and improves graphics and drawing performance on systems with capable hardware. 

This is done by adding support for GPU-accelerated rendering of 2D Canvas content on Windows and Mac OS X systems. [According to the developers](http://blog.chromium.org/2012/02/gpu-accelerating-2d-canvas-and-enabling.html), the GPU acceleration should improve the overall performance of graphics-intensive web applications, making canvas-based animations and games “run faster and feel smoother”. For older systems that can't make use of of the GPU, Chrome can now display 3D content using the [SwiftShader](http://transgaming.com/business/swiftshader) software rasterizer, which Google licensed from TransGaming, Inc. However, the developers note that “a software-backed WebGL implementation is never going to perform as well as one running on a real GPU, but now more users will have access to basic 3D content on the web”. 

Additionally, this new version [closes a total of nine security holes](http://googlechromereleases.blogspot.com/2012/03/stable-channel-release-and-beta-channel.html), of which three are rated as “[High severity](https://sites.google.com/a/chromium.org/dev/developers/severity-guidelines)” by Google. These include high-risk use-after-free errors in SVG clipping, an off-by-one problem in OpenType Sanitizer and memory corruption bugs in Skia. Other closed holes include five medium-severity problems such as out-of-bounds reads in SVG text and text fragment handling, a cross-site scripting (XSS) bug, a SPDY proxy certificate checking error and an invalid read in the V8 JavaScript engine. A low-severity bug [used by a hacker going by the name of “Pinkie Pie”](http://www.h-online.com/news/item/Pwn2Own-ends-with-three-browsers-felled-Update-1469096.html) during the Pwn2Own competition at CanSecWest was also closed. Google's Karen Grunberg notes that some of these “represent the start of hardening measures based on study of the exploits submitted to the [Pwnium competition](http://www.h-online.com/news/item/Chrome-hackers-strike-Pwnium-1466270.html)“. 

As part of its [Chromium Security Vulnerability Rewards programme](https://sites.google.com/a/chromium.org/dev/Home/chromium-security), Google paid security researchers $4,000 for discovering and reporting the holes – $8,000 in additional rewards were issued for security bugs reported to the company during the development cycle of Chrome 18. As usual, more details about the vulnerabilities are being withheld until “a majority of users are up-to-date with the fix”. 

Further information about this stable update can be found in a [post](http://blog.chromium.org/2012/03/moar-better-graphics.html) on the Chromium Blog. Chrome 18.0.1025.142 is available to download for Windows, Mac OS X and Linux from [google.com/chrome](http://www.google.com/chrome); alternatively, existing users can upgrade using the [built-in update function](http://support.google.com/chrome/bin/answer.py?hl=en&answer=95414).