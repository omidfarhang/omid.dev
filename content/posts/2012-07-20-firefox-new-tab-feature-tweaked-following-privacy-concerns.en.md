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
<a href="http://lh3.ggpht.com/-mOB6Xw8pB0s/UAmhiB3Z2rI/AAAAAAAAGiQ/SQb5QKQkwrk/s1600-h/logo-only%25255B4%25255D.png" target="_blank"><img title="logo-only" border="0" alt="logo-only" align="right" src="http://lh4.ggpht.com/-Vs1N-QXO-yE/UAmhme-tVBI/AAAAAAAAGiY/yeR00KFYMXY/logo-only_thumb%25255B2%25255D.png?imgmax=800" width="240" height="240" /></a>h-online: Mozilla has implemented changes to Firefox 14 that address <a href="http://www.h-online.com/news/item/Security-concerns-over-Firefox-s-new-tab-thumbnail-feature-1625761.html" target="_blank">concerns</a> raised by privacy-conscious users over the &#8220;new tab&#8221; feature in Firefox 13. The Firefox developers have changed the browser's behavior so that sensitive information should no longer leak via screenshots of web sites. 

When opening a new tab, Firefox 13 shows users a grid of screenshots of their most visited pages. After this feature was introduced, several users complained to Mozilla and pointed out that the feature also takes screenshots of sensitive web sites such as login pages for online banking sites. 

In Firefox 14 – <a href="/2012/07/firefox-thunderbird-panda-and-more.html" target="_blank">released</a> on Tuesday – Mozilla has implemented several tweaks to the &#8220;new tab&#8221; feature. Connections established over a secured HTTPS link are now excluded from being captured by the screenshot feature. Similarly, if the browser encounters a &#8220;Cache-Control: no-store&#8221; header, the page in question will also never be captured. 

<p align="center">
  <a href="http://lh4.ggpht.com/-3mGp6xueJl0/UAmhpEjefJI/AAAAAAAAGig/NkDuqA-_qd8/s1600-h/ff14-disable-thumbnails%25255B5%25255D.png" target="_blank"><img title="ff14-disable-thumbnails" border="0" alt="ff14-disable-thumbnails" src="http://lh3.ggpht.com/-uHXYVrmJNmQ/UAmhr002gWI/AAAAAAAAGio/cES40okqeEY/ff14-disable-thumbnails_thumb%25255B3%25255D.png?imgmax=800" width="504" height="117" /></a> Click to see full-size
</p>

In addition to this, users can manually delete the stored screenshots by ticking the option &#8220;Browsing & Download History&#8221; from the &#8220;Clear Recent History&#8221; link in Firefox's Privacy settings. This data can be automatically deleted whenever Firefox is shut down. If users prefer to <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=726347" target="_blank">completely disable the thumbnail feature</a> instead, they can now open Firefox's advanced options by entering about:config in the address bar of the browser and creating a new preference named `browser.pagethumbnails.capturing_disabled` which they will have to set to `true`. 

The &#8220;new tab&#8221; feature is still controversial, however. The feature's <a href="https://wiki.mozilla.org/Privacy/Reviews/New_Tab" target="_blank">review</a> by the Firefox Privacy Team has not yet been concluded and still lists the issue as &#8220;at risk: needs resolutions&#8221;. Additionally, there are still users who do not consider that the <a href="https://bugzilla.mozilla.org/show_bug.cgi?id=754608" target="_blank">original bug</a> has been fixed to their satisfaction. 

<a title="http://h-online.com/-1647976" href="http://h-online.com/-1647976" target="_blank">http://h-online.com/-1647976</a>