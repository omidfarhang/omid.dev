---
title: Chrome 28 with new Blink engine and Rich Notifications
date: 2013-07-10T13:31:59+00:00
layout: single
author_profile: true
url: 2013/07/10/chrome-28-with-new-blink-engine-and-rich-notifications/
shortlink: https://g.omid.dev/1n614lh
image: /images/sites/3/2013/05/new-chrome-logo.png
tags:
  - Browser
  - Google
  - Google Chrome
  - Updates
lang: en
category: techblog
---
Cross-posted from H-Online:

[![new-chrome-logo](/images/2013/05/new-chrome-logo.png)](/images/2013/05/new-chrome-logo.png)Google [has released](http://googlechromereleases.blogspot.co.uk/2013/07/stable-channel-update.html) the stable version 28 of its Chrome browser. It is the first version to use the new [Blink engine](http://www.chromium.org/blink) for rendering web pages and it appears that the new engine will allow web pages to be loaded about ten per cent faster. The developers say that the increased speed is also thanks to the new [threaded HTML parser](https://groups.google.com/a/chromium.org/forum/#%21topic/chromium-dev/hBUVtg7gacE), which frees up the JavaScript thread, allowing DOM content to be displayed faster. The HTML parser also takes fewer breaks, which is said to result in time savings of up to 40 per cent. Another contributor to the faster working speed is the optimized [V8](https://code.google.com/p/v8/) JavaScript engine.

[Rich Notifications](http://blog.chromium.org/2013/05/rich-notifications-in-chrome.html) are another new Chrome feature. Chrome already supported basic notifications, but with the new notifications users can be shown, and can interact with, tips and information outside of the browser. For example, a pop-up window in the Windows task bar can inform users when a new email arrives. Notifications can contain pictures, buttons and URLs as well as text. The notifications are handled by a notification center outside the browser, which not only allows the information to be displayed without a running browser but also serves as somewhere a user can consult to see what notifications they have missed.

[!\[Chrome's new Rich Notifications in action Source: Google\](/images/2013/07/basic-notification.png)\](/images/2013/07/basic-notification.png)Chrome's new Rich Notifications in action Source: Google 

Rich Notifications replace HTML-based notifications in the Chrome extensions: HTML-based notifications are no longer supported in version 28. [Comprehensive instructions](http://developer.chrome.com/dev/apps/notifications.html) for developers are available. At the moment, Rich Notifications only work in Chrome OS and Windows – support for Mac OS X and Linux is said to be coming.

Version 28 also closes various [security holes](http://googlechromereleases.blogspot.com/2013/07/stable-channel-update.html) including a richly rewarded use-after-free issue with network sockets and a well-rewarded fix to a HTTP/SSL man-in-the-middle attack. Other rewarded bugs included two use-after-free issues in input handling and resource loading, plus an out-of-bounds read in SVG, all found by Chrome bounty regular miaubiz, a screen data leak through GL textures with Windows and NVIDIA cards, and a lack of entropy in renderers.

The updated browser is available [to download](/en/knowledge-base/programs/google-chrome "Google Chrome") for Windows, Linux and Mac OS X or, for existing users, will arrive automatically. Chrome has also seen its Flash player updated to version 11.8.800.97 as noted in Adobe's patch day.
