---
title: Chrome 21 arrives with new API for video and audio communication
date: 2012-08-02T19:53:00+00:00
layout: single
author_profile: true
url: 2012/08/02/chrome-21-arrives-with-new-api-for-video-and-audio-communication/
tags:
  - Google
  - Google Chrome
  - software
  - Updates
lang: en
categories: 
  - TechBlog
---
[![new-chrome-logo](http://lh6.ggpht.com/-2EmMc9Ve3t4/UBrTZNd7lgI/AAAAAAAAGx4/Vu4J4XG059g/new-chrome-logo_thumb.png?imgmax=800 "new-chrome-logo")](http://lh5.ggpht.com/-2E06ei7wjEo/UBrTXKPuvtI/AAAAAAAAGxw/qomp-xpQ_pM/s1600-h/new-chrome-logo%25255B2%25255D.png)

h-online: With the [release of Chrome 21](http://chrome.blogspot.com/2012/07/new-senses-for-web.html), web applications can now directly access the local system's built-in camera and microphone. Instead of requiring a special plugin, the major stable update to the WebKit-based web browser includes a new HTML5 `<a href="http://www.html5rocks.com/en/tutorials/getusermedia/intro/">getUserMedia</a>` API – currently a [W3C Editor's Draft](http://dev.w3.org/2011/webrtc/editor/getusermedia.html) – to provide web apps with access to the camera and microphone. For security purposes, users will be prompted to grant apps permission to access the hardware. 

Google Software Engineer Shijing Xian says that the new release is Chrome's “first step” towards implementing the Web Real Time Communication ([WebRTC](http://www.webrtc.org/)) standard, which enables browsers to use JavaScript to control real-time communications. The addition of the `getUserMedia` API support also enables functionality such as motion detection and real-time video effects – one demo, from [StinkDigital](http://www.stinkdigital.com/), lets users [play a xylophone by waving their hands](http://www.soundstep.com/blog/experiments/jsdetection/), while another web app called [HTML5 Webcam Toy](http://neave.com/webcam/html5/) uses WebGL fragment shaders (GLSL) to apply real-time special effects to a live camera video feed. 

[![chrome-permission](http://lh5.ggpht.com/-h1HRueuHJSE/UBrTlbTJEMI/AAAAAAAAGyI/rLoldbBZ3sM/chrome-permission_thumb%25255B2%25255D.jpg?imgmax=800 "chrome-permission")](http://lh6.ggpht.com/-9KBypd1Bgu0/UBrTd0a0IeI/AAAAAAAAGyA/0NBiLUON_4g/s1600-h/chrome-permission%25255B2%25255D.jpg)_Before accessing a user's built-in camera and microphone in Chrome, web apps must first get the user's permission_

Other changes include the addition of a Gamepad JavaScript API that enables game controllers to be used with web-based games, and improvements to Google's [Cloud Print](http://www.google.com/cloudprint/learn/) technology, which lets users to print over the web from PCs, smartphones and tablets. On Mac OS X systems, Chrome 21 now [supports the new Retina display](http://chrome.blogspot.com/2012/06/chrome-and-new-shiny.html) (HiDPI) in Apple's latest MacBook Pro laptop. 

Version 21 of Chrome also closes a total of 26 security holes in the browser. These include integer overflows, use-after-free errors and out-of-bounds writes in the PDF viewer, as well as a use-after-free problem in CSS DOM, and a buffer overflow in the [WebP](https://developers.google.com/speed/webp/) image format decoder, all of which are rated as “high severity” by the company. A critical vulnerability in tab handling and a medium-severity cross-process interference problem in renderers that affect Linux systems have also been corrected. 

A full list of security fixes can be found in a [post](http://googlechromereleases.blogspot.com/2012/07/stable-channel-release.html) on the Google Chrome Releases blog. Chrome 21 is available to download from [google.com/chrome](http://www.google.com/chrome) for Windows, Mac OS X and Linux; existing users can upgrade using the [built-in update function](http://support.google.com/chrome/bin/answer.py?hl=en&answer=95414). Chrome is built from Chromium, the open source browser project run by Google. 

[http://h-online.com/-1657169](http://h-online.com/-1657169 "http://h-online.com/-1657169")