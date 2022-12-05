---
title: Google Chrome Stable Channel Update
date: 2010-01-25T22:13:00+00:00
layout: single
author_profile: true
url: 2010/01/25/google-chrome-stable-channel-update-3/
tags:
  - Google
  - Google Chrome
  - Updates
lang: en
category: techblog
---
The stable channel has been updated to 4.0.249.78 for Windows, and includes the following features and security fixes (since 3.0):

  * Extensions
  * Bookmark sync
  * Enhanced developer tools
  * HTML5: Notifications, Web Database, Local Storage, WebSockets, Ruby support
  * v8 performance improvements
  * Skia performance improvements
  * Full ACID3 pass, due to re-enabled remote font support (with added defense against bugs in operating system font libraries)
  * HTTP byte range support
  * New security feature: “Strict Transport Security” support
  * Experimental new anti-reflected-XSS feature called “XSS Auditor”

**Security Fixes:**

Please see the [Chromium security page](http://sites.google.com/a/chromium.org/dev/Home/chromium-security) for more detail. Note that the referenced bugs may be kept private until a majority of our users are up to date with the fix.

  * [[3275](http://code.google.com/p/chromium/issues/detail?id=3275)] **Low** Pop-up blocker bypass. Credit to Google Chrome Security Team (SkyLined).
  * [[9877](http://code.google.com/p/chromium/issues/detail?id=9877)] **Medium** Cross-domain theft due to CSS design error. Credit to Chris Evans of the Google Security Team.
  * [[12523](http://code.google.com/p/chromium/issues/detail?id=12523)] **Medium** Browser memory error with stale pop-up block menu. Credit to Jacob Balle and Carsten Eiram, Secunia Research.
  * [[20450](http://code.google.com/p/chromium/issues/detail?id=20450)] **Low** Prevent XHR to directories. Credit to the Chromium development community.
  * [[23693](http://code.google.com/p/chromium/issues/detail?id=23693)] **Low** Escape more characters in shortcuts. Credit to Michal Zalewski of the Google Security Team and, independently, Inferno of SecureThoughts.com.
  * [[8864](http://code.google.com/p/chromium/issues/detail?id=8864)] [[24701](http://code.google.com/p/chromium/issues/detail?id=24701)] [[24646](http://code.google.com/p/chromium/issues/detail?id=24646)] **High** Renderer memory errors drawing on canvases. Credit to Michal Zalewski of the Google Security Team and Google Chrome Security Team (SkyLined).
  * [[28566](http://code.google.com/p/chromium/issues/detail?id=28566)] **High** Image decoding memory error. Credit to Robert Swiecki of the Google Security Team.
  * [[29920](http://code.google.com/p/chromium/issues/detail?id=29920)] **Low** Corner case failure to strip Referer. Credit to the Chromium development community.
  * [[30666](http://code.google.com/p/chromium/issues/detail?id=30666)] **High** Cross-domain access error. Credit to Tokuji Akamine, Senior Consultant at Symantec Consulting Services.
  * [[31307](http://code.google.com/p/chromium/issues/detail?id=31307)] **High** Bitmap deserialization error. Credit to Mark Dowd, under contract to Google Chrome Security Team.
  * [[31517](http://code.google.com/p/chromium/issues/detail?id=31517)] **Low** Browser crash with nested URL.