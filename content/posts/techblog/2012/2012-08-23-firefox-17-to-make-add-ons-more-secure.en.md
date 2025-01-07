---
title: Firefox 17 to make add-ons more secure
date: 2012-08-23T12:38:00+00:00
layout: single
author_profile: true
url: 2012/08/23/firefox-17-to-make-add-ons-more-secure/
tags:
  - Announcement
  - Beta
  - Firefox
  - Firefox Addon
  - Mozilla
lang: en
categories: 
  - TechBlog
---
<a href="http://lh3.ggpht.com/-Bl6QQWRBgLc/UDYd0_TdHUI/AAAAAAAAHH0/E1J8aCHEiBg/s1600-h/logo-only%25255B5%25255D.png" target="_blank"><img title="logo-only" border="0" alt="logo-only" align="right" src="http://lh5.ggpht.com/-lalTDAjyZT4/UDYd4VU9IiI/AAAAAAAAHH8/gHD-JXnWt3w/logo-only_thumb%25255B3%25255D.png?imgmax=800" width="240" height="240" /></a>h-Online: As [suggested](https://bugzilla.mozilla.org/show_bug.cgi?id=553102) by some of its developers back in 2010, the Firefox browser will [introduce](https://blog.mozilla.org/addons/2012/08/20/exposing-objects-to-content-safely/) enhanced separation between add-ons and the rest of the browser. With the change, which is planned to take effect with the release of Firefox 17, scripts on web pages will only be able to access the data belonging to add-ons if they are included in a whitelist. 

The beta version of Firefox 15 already logs warning messages in the browser's Error Console when a page that is not on the whitelist tries to access data from add-ons. This behavior has been included to make add-on developers aware of the new policy and to give them time to fix their add-on's behavior before the release of Firefox 17. 

In the current versions of Firefox, entire add-on objects can be shared by adding them to`contentWindow.wrappedJSObject` which allows scripts on web sites to access all data belonging to these objects through the `window.sharedObject` variable. With Firefox 17, add-on developers are required to explicitly mark attributes with the `__exposedProps__`property which acts as a whitelist for objects that Firefox will share. Possible values for this property allow read-only access, write-only access and read and write access. 

Web site code will not have to be modified. The change also does not affect add-ons that are passing numbers, booleans or strings from the add-on to the web page; only actual add-on objects are affected. 

Mozilla recommends that add-on developers thoroughly test their code in the [Firefox 15 beta](http://www.mozilla.org/en-US/firefox/channel/), keeping an eye out for errors in the Error Console. Afterwards, they should test with a [nightly release version](http://nightly.mozilla.org/) of Firefox 17 and see whether their add-ons break. Add-ons developed with Firefox's Add-on SDK should be automatically compatible after updating to the latest release of the SDK, but Mozilla recommends that developers test them after updating nonetheless. 

[http://h-online.com/-1672626](http://h-online.com/-1672626 "http://h-online.com/-1672626")