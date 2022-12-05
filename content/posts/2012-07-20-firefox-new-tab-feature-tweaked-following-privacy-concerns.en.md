---
title: "Firefox &quot;new tab&quot; feature tweaked following privacy concerns"
date: 2012-07-20T18:51:00+00:00
layout: single
author_profile: true
url: 2012/07/20/firefox-new-tab-feature-tweaked-following-privacy-concerns/
tags:
  - Firefox
  - Mozilla
  - privacy
lang: en
category: techblog
---
[![logo-only](http://lh4.ggpht.com/-Vs1N-QXO-yE/UAmhme-tVBI/AAAAAAAAGiY/yeR00KFYMXY/logo-only_thumb%25255B2%25255D.png?imgmax=800 "logo-only")](http://lh3.ggpht.com/-mOB6Xw8pB0s/UAmhiB3Z2rI/AAAAAAAAGiQ/SQb5QKQkwrk/s1600-h/logo-only%25255B4%25255D.png)h-online: Mozilla has implemented changes to Firefox 14 that address [concerns](http://www.h-online.com/news/item/Security-concerns-over-Firefox-s-new-tab-thumbnail-feature-1625761.html) raised by privacy-conscious users over the “new tab” feature in Firefox 13. The Firefox developers have changed the browser's behavior so that sensitive information should no longer leak via screenshots of web sites. 

When opening a new tab, Firefox 13 shows users a grid of screenshots of their most visited pages. After this feature was introduced, several users complained to Mozilla and pointed out that the feature also takes screenshots of sensitive web sites such as login pages for online banking sites. 

In Firefox 14 – [released](/2012/07/firefox-thunderbird-panda-and-more.html) on Tuesday – Mozilla has implemented several tweaks to the “new tab” feature. Connections established over a secured HTTPS link are now excluded from being captured by the screenshot feature. Similarly, if the browser encounters a “Cache-Control: no-store” header, the page in question will also never be captured. 

[![ff14-disable-thumbnails](http://lh3.ggpht.com/-uHXYVrmJNmQ/UAmhr002gWI/AAAAAAAAGio/cES40okqeEY/ff14-disable-thumbnails_thumb%25255B3%25255D.png?imgmax=800 "ff14-disable-thumbnails")](http://lh4.ggpht.com/-3mGp6xueJl0/UAmhpEjefJI/AAAAAAAAGig/NkDuqA-_qd8/s1600-h/ff14-disable-thumbnails%25255B5%25255D.png) Click to see full-size

In addition to this, users can manually delete the stored screenshots by ticking the option “Browsing & Download History” from the “Clear Recent History” link in Firefox's Privacy settings. This data can be automatically deleted whenever Firefox is shut down. If users prefer to <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=726347" target="_blank">completely disable the thumbnail feature</a> instead, they can now open Firefox's advanced options by entering about:config in the address bar of the browser and creating a new preference named `browser.pagethumbnails.capturing_disabled` which they will have to set to `true`. 

The “new tab” feature is still controversial, however. The feature's <a href="https://wiki.mozilla.org/Privacy/Reviews/New_Tab" target="_blank">review</a> by the Firefox Privacy Team has not yet been concluded and still lists the issue as “at risk: needs resolutions”. Additionally, there are still users who do not consider that the [original bug](https://bugzilla.mozilla.org/show_bug.cgi?id=754608) has been fixed to their satisfaction. 

[http://h-online.com/-1647976](http://h-online.com/-1647976 "http://h-online.com/-1647976")