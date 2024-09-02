---
title: A Mini-Newsletter From Your Google Chrome Security Team
date: 2011-03-09T22:26:00+00:00
layout: single
author_profile: true
url: 2011/03/09/a-mini-newsletter-from-your-google-chrome-security-team/
tags:
  - Google
  - Google Chrome
  - review
  - security
lang: en
categories: 
  - techblog
---
**Google Chrome Security Team wrote:** We’re always working hard to enhance the Chrome browser with bug fixes, new defenses and new features. The [release of Chrome 10](http://googlechromereleases.blogspot.com/2011/03/chrome-stable-release.html) is no different, and there are some items worth highlighting:

**Chrome 10: Flash sandboxing**

With Chrome 10, our first cut of the previously announced [Flash sandboxing initiative](http://blog.chromium.org/2010/12/rolling-out-sandbox-for-adobe-flash.html) is now enabled by default for the Windows platform on Vista and newer. Additionally, because we automatically update Flash to the latest and most secure version, this should provide useful defense in depth.

**Chrome 10: Out-of-date plug-in warnings**

As we [previously mentioned](http://blog.chromium.org/2010/06/improving-plug-in-security.html), we believe that some of the most significant opportunities to increase user security revolve around plugins. We’ve made a number of improvements in this area, including actively encouraging users to update their plug-ins to the most secure version. Chrome now detects when a plug-in is out of date and blocks it with a simple infobar. This infobar helps guide the user towards updating their plug-in with the latest security fixes.

[<img title="out of date plugin" border="0" alt="out of date plugin" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TXf3dBkVwcI/AAAAAAAADoA/oFN9eDWViQw/out%20of%20date%20plugin_thumb%5B1%5D.png?imgmax=800" width="504" height="186" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TXf3Z5GDq5I/AAAAAAAADn8/rNmUtTVffyM/s1600-h/out%20of%20date%20plugin%5B3%5D.png)

**Chrome 10: Plug-in blocking enhancements**

Some of our more advanced users prefer fine-grained control over which plug-ins they wish to run — which can have security and privacy benefits. Chrome has long had a feature which blocks plug-ins by default (Wrench menu -> Preferences -> Under the hood -> Content Settings -> Plug-ins). We’ve improved this feature by adding a context menu to the blocked plug-in placeholder. This menu lets users control which plug-ins do and do not run. Using a context menu helps prevent clickjacking attacks that try to bypass the block. Plug-in placeholders can also be hidden (for example, if they are floating over and obscuring real content), and the actual plug-in that wishes to run is made apparent.

[<img title="blocked plugin" border="0" alt="blocked plugin" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TXf3jX3eViI/AAAAAAAADoI/eGzEpkjII0s/blocked%20plugin_thumb%5B1%5D.png?imgmax=800" width="504" height="135" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TXf3faJUVyI/AAAAAAAADoE/XRxKcQ5I3FY/s1600-h/blocked%20plugin%5B3%5D.png)

**Chromium Security Rewards program still going strong**

We mentioned in passing in the [9.0.597.107 release notes](http://googlechromereleases.blogspot.com/2011/02/stable-channel-update_28.html) that our [rewards program](http://blog.chromium.org/2010/01/encouraging-more-chromium-security.html) has passed $100,000 of rewards. We’d like to re-iterate our thanks to all the named researchers in our [Hall of Fame](http://www.chromium.org/Home/chromium-security/hall-of-fame). We’re continually delighted with the stream of interesting and clever bugs that we receive, so it will be exciting to see what the rest of 2011 brings. Remember, we love giving out money!

**Still hiring!**

We are always looking to expand the Google Chrome Security Team, and we’re looking for a wide range of talents. We can promise exciting and varied work, working to protect hundreds of millions of users and working alongside the best in the industry. Why not have a look at [our job posting](http://www.google.com/intl/mn/jobs/uslocations/mountain-view/swe/information-security-engineer-chrome-mountain-view/index.html)?

Posted by Chris Evans, Google Chrome Security Team, Bernhard Bauer, Software Engineer, and Carlos Pizano, Software Engineer