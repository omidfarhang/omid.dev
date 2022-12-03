---
title: Chrome 17 update fixes high-risk vulnerabilities
date: 2012-03-22T12:47:00+00:00
layout: single
author_profile: true
url: 2012/03/22/chrome-17-update-fixes-high-risk-vulnerabilities/
tags:
  - Google
  - Google Chrome
  - security
  - software
  - Updates
  - Vulnerability
lang: en
category: techblog
---
[<img title="new-chrome-logo" border="0" alt="new-chrome-logo" align="right" src="http://lh4.ggpht.com/-gRhdAHeQVjA/T2sYQCGgkjI/AAAAAAAAFRc/xlFa7prQDHI/new-chrome-logo_thumb%25255B1%25255D.png?imgmax=800" width="128" height="125" />](http://lh5.ggpht.com/-oE9AqbdwcfE/T2sYKP0JlDI/AAAAAAAAFRU/CuCvzQKh35E/s1600-h/new-chrome-logo%25255B3%25255D.png)The H-Security: Google has [released version 17.0.963.83](http://googlechromereleases.blogspot.co.uk/2012/03/stable-channel-update_21.html) of its Chrome web browser, a maintenance update that fixes issues with Flash games and closes several security holes. The Stable channel update addresses a total of nine vulnerabilities, six of which are rated as &#8220;[high severity](https://sites.google.com/a/chromium.org/dev/developers/severity-guidelines)&#8220;. 

These include an integer issue in [libpng](http://www.libpng.org/pub/png/libpng.html) (the official PNG reference library), a memory corruption problem in WebGL canvas handling and a cross-origin violation related to &#8220;magic iframe&#8221;, as well as use-after-free errors in first-letter handling, CSS cross-fade handling and block splitting. One medium-risk invalid read in the V8 JavaScript engine and two low-risk problems related to WebUI privileges and unpacked extension installation have also been fixed. 

As part of its [Chromium Security Vulnerability Rewards programme](https://sites.google.com/a/chromium.org/dev/Home/chromium-security), Google paid security researchers $5,500 for discovering and reporting the holes. Additional details about the vulnerabilities are being withheld until &#8220;a majority of users are up-to-date with the fix&#8221;. The developers also note that a low severity issue related to the extension web request API was fixed in a previous release but was not properly credited. 

Further information about the update can be found in a [post](http://googlechromereleases.blogspot.co.uk/2012/03/stable-channel-update_21.html) on the Google Chrome Releases blog. Chrome 17.0.963.83 is available to download from [google.com/chrome](https://www.google.com/chrome/) for Windows, Mac OS X and Linux; alternatively, existing users can upgrade using the [built-in update function](http://support.google.com/chrome/bin/answer.py?hl=en&answer=95414).