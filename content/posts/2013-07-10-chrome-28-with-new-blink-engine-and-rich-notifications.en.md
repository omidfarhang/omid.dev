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

[<img class="alignright size-full wp-image-6600" alt="new-chrome-logo" src="/images/2013/05/new-chrome-logo.png" width="128" height="125" />](/images/2013/05/new-chrome-logo.png)Google <a href="http://googlechromereleases.blogspot.co.uk/2013/07/stable-channel-update.html" target="_blank" rel="external">has released</a> the stable version 28 of its Chrome browser. It is the first version to use the new <a href="http://www.chromium.org/blink" target="_blank" rel="external">Blink engine</a> for rendering web pages and it appears that the new engine will allow web pages to be loaded about ten per cent faster. The developers say that the increased speed is also thanks to the new <a href="https://groups.google.com/a/chromium.org/forum/#%21topic/chromium-dev/hBUVtg7gacE" target="_blank" rel="external">threaded HTML parser</a>, which frees up the JavaScript thread, allowing DOM content to be displayed faster. The HTML parser also takes fewer breaks, which is said to result in time savings of up to 40 per cent. Another contributor to the faster working speed is the optimized <a href="https://code.google.com/p/v8/" target="_blank" rel="external">V8</a> JavaScript engine.

<a href="http://blog.chromium.org/2013/05/rich-notifications-in-chrome.html" target="_blank" rel="external">Rich Notifications</a> are another new Chrome feature. Chrome already supported basic notifications, but with the new notifications users can be shown, and can interact with, tips and information outside of the browser. For example, a pop-up window in the Windows task bar can inform users when a new email arrives. Notifications can contain pictures, buttons and URLs as well as text. The notifications are handled by a notification center outside the browser, which not only allows the information to be displayed without a running browser but also serves as somewhere a user can consult to see what notifications they have missed.<figure id="attachment_6689" aria-describedby="caption-attachment-6689" style="width: 374px" class="wp-caption aligncenter">

[<img class="size-full wp-image-6689" alt="Chrome's new Rich Notifications in action Source: Google" src="/images/2013/07/basic-notification.png" width="384" height="223" srcset="/images/sites/3/2013/07/basic-notification.png 384w, /images/sites/3/2013/07/basic-notification-300x174.png 300w, /images/sites/3/2013/07/basic-notification-258x150.png 258w, /images/sites/3/2013/07/basic-notification-280x162.png 280w" sizes="(max-width: 384px) 100vw, 384px" />](/images/2013/07/basic-notification.png)<figcaption id="caption-attachment-6689" class="wp-caption-text">Chrome's new Rich Notifications in action  
Source: Google</figcaption></figure> 

Rich Notifications replace HTML-based notifications in the Chrome extensions: HTML-based notifications are no longer supported in version 28. <a href="http://developer.chrome.com/dev/apps/notifications.html" target="_blank" rel="external">Comprehensive instructions</a> for developers are available. At the moment, Rich Notifications only work in Chrome OS and Windows – support for Mac OS X and Linux is said to be coming.

Version 28 also closes various <a href="http://googlechromereleases.blogspot.com/2013/07/stable-channel-update.html" target="_blank" rel="external">security holes</a> including a richly rewarded use-after-free issue with network sockets and a well-rewarded fix to a HTTP/SSL man-in-the-middle attack. Other rewarded bugs included two use-after-free issues in input handling and resource loading, plus an out-of-bounds read in SVG, all found by Chrome bounty regular miaubiz, a screen data leak through GL textures with Windows and NVIDIA cards, and a lack of entropy in renderers.

The updated browser is available <a title="Google Chrome" href="/en/knowledge-base/programs/google-chrome" target="_blank" rel="external">to download</a> for Windows, Linux and Mac OS X or, for existing users, will arrive automatically. Chrome has also seen its Flash player updated to version 11.8.800.97 as noted in Adobe's patch day.