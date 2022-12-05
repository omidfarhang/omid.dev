---
title: "What's New in Chrome 10?"
date: 2011-03-08T21:02:00+00:00
layout: single
author_profile: true
url: 2011/03/08/whats-new-in-chrome-10/
tags:
  - Browser
  - Google
  - Google Chrome
  - review
lang: en
category: techblog
---
[Google Chrome 10](http://googlechromereleases.blogspot.com/2011/03/chrome-stable-release.html) is ready for primetime and it comes with a surprising number of new features. Here are some of them:

1. The Options dialog is now a web page that opens in a new tab. Chrome has one less modal dialog and [the new Options page](http://www.google.com/support/chrome/bin/answer.py?answer=1183665) is better suited for netbooks. Another advantage is that each section of the Options page has a permalink that can be bookmarked.  
Even if Chrome doesn't have too many customizable settings, there's a search box that lets you quickly find an option. Try searching for “cookies” and you'll notice that Chrome finds settings that aren't immediately obvious.

[<img title="chrome-options-tab-m" border="0" alt="chrome-options-tab-m" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TXaSUsU2CbI/AAAAAAAADno/VcLHJtbBSho/chrome-options-tab-m_thumb%5B1%5D.png?imgmax=800" width="504" height="348" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TXaSQxeywOI/AAAAAAAADnk/R-TMZYWxdeY/s1600-h/chrome-options-tab-m%5B3%5D.png)

2. You can now change the default page zoom value. Go to the Options page and select “Under the hood” (or paste chrome://settings/advanced in the address bar) and change the “page zoom” value. The default value is “100%”, but you can pick values like “120%” or “144%” which are better suited for big screens.

3. The same section of the Options page lets you change the minimum font size. Click “customize fonts” and choose one of the values that are available for the minimum font size.

4. Synchronize passwords and use them from any computer, as long as you can install Google Chrome. The new option is not enabled by default and it requires your confirmation before saving your passwords to your Google Account. There's even an extra security feature that lets you choose a custom encryption passphrase, so that your passwords are safe even if someone guesses your Google Account password. 

[<img title="chrome-sync-passwords-2" border="0" alt="chrome-sync-passwords-2" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TXaSXuVx3EI/AAAAAAAADnw/1L6rp0K_eyg/chrome-sync-passwords-2_thumb%5B1%5D.png?imgmax=800" width="410" height="379" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TXaSWAdGtgI/AAAAAAAADns/HgMHExzH7ow/s1600-h/chrome-sync-passwords-2%5B3%5D.png)

5. Reorder the apps from the new tab page using drag and drop. This option was available for the frequently visited pages and you can now use it to change the order of your favorite apps. 

[<img title="chrome-ntp-reorder-apps" border="0" alt="chrome-ntp-reorder-apps" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TXaSdheD-dI/AAAAAAAADn4/RI81dM2v-ho/chrome-ntp-reorder-apps_thumb%5B1%5D.png?imgmax=800" width="413" height="329" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TXaSajXhTBI/AAAAAAAADn0/xA0pLgjnJ6g/s1600-h/chrome-ntp-reorder-apps%5B3%5D.png)

6. A new version of V8, Chrome's JavaScript engine, includes a better compilation infrastructure codenamed [Crankshaft](http://blog.chromium.org/2010/12/new-crankshaft-for-v8.html). “By using aggressive optimizations, Crankshaft dramatically improves the performance of compute-intensive JavaScript applications – often by more than a factor of two! This will give users a faster and more responsive experience loading web pages and applications built with complex JavaScript.”

7. Chrome 10 comes with hardware acceleration for Web videos. “Traditionally, web browsers relied entirely on the CPU to render web page content. With capable GPUs becoming an integral part of even the smallest of devices and with rich media such as video and 3D graphics playing an increasingly important role to the web experience, attention has turned on finding ways to make more effective utilization of the underlying hardware to achieve better performance and power savings. There's clear indication that getting the GPU directly involved with compositing the contents of a web page can result in very significant speedups. The largest gains are to be had from eliminating unecessary (and very slow) copies of large data, especially copies from video memory to system memory. The most obvious candidates for such optimizations are the <video> element and the WebGL canvas, both of which can generate their results in areas of memory that that CPU doesn't have fast access to,” [explains Google](https://sites.google.com/a/chromium.org/dev/developers/design-documents/gpu-accelerated-compositing-in-chrome).  
Test GPU acceleration for videos at [YouTube's HTML5 site](http://www.youtube.com/html5). Adobe Flash 10.2 also [added full GPU acceleration](http://blogs.adobe.com/flashplayer/2011/02/flash-player-10-2-launch.html) for videos and YouTube is one of the sites that support this feature, so you can compare Flash 10.2 videos and HTML5 videos to see which version uses less processing power.

8. Chrome 10 for Windows finally sandboxes the built-in Adobe Flash plugin. This is one of the reasons why Google decided to bundle the plugin with Chrome.

9. If you didn't like Gmail's notification feature because it didn't work when you closed Chrome, you'll find it much more useful now that Chrome supports [background pages](http://blog.chromium.org/2011/02/amping-up-chromes-background-eature.html). “Apps and extensions that use the new background feature can continue to run in the background — even if the user closes down all of Chrome's windows. Background apps will continue to run until Chrome exits. The next time Chrome starts up, any background windows that were previously running will also be re-launched. These windows are not going to be visible but they will be able to perform tasks like checking for server-side changes and pre-emptively loading content into local storage,” [explains Google](http://blog.chromium.org/2011/02/amping-up-chromes-background-feature.html).  
To find all the extensions and apps that support backgrounding, click “view background pages” in Chrome's menu and check the highlighted items.

10. Chrome disables certain outdated plugins by default and provides an option to update to the latest version. Popular software like Adobe Reader, Java or Quicktime have many security vulnerabilities that are frequently exploited in the wild because users don't install the versions that fix these issues.

_Taken from Google Chrome Operation System blog_