---
title: "Opera 12 supports Mozilla's &quot;Do Not Track&quot; header"
date: 2012-02-13T16:57:00+00:00
layout: single
author_profile: true
url: 2012/02/13/opera-12-supports-mozillas-do-not-track-header/
tags:
  - Mozilla
  - Opera
  - software
  - Updates
lang: en
category: 
  - techblog
---
**[<img title="Opera-logo" border="0" alt="Opera-logo" align="right" src="http://lh5.ggpht.com/-p1OrQqFRhvE/Tzk5xyvY-_I/AAAAAAAAEvw/-kn85P-nkLs/Opera-logo_thumb%25255B3%25255D.jpg?imgmax=800" width="240" height="84" />](http://lh4.ggpht.com/-TXuKGILdgFg/Tzk5uZadqwI/AAAAAAAAEvo/yvenmwkGfxw/s1600-h/Opera-logo%25255B6%25255D.jpg)The H-Online:** Opera has [published](http://my.opera.com/desktopteam/blog/2012/02/10/core-dnt-mail-themes) a development snapshot of version 12 of its web browser that adds support for Mozilla's “Do Not Track” (DNT) header. Code-named “Wahoo”, the unstable release is the first from Opera to support the DNT header, which signals web sites that the browser user wishes to opt-out of online behavioral tracking; online advertising networks use cookies and other web technologies to recognize internet users and serve them tailored advertising. Support for DNT in Opera 12 is currently disabled by default. Users can enable it in the preferences dialogue by selecting “Preferences > Advanced > Security > Ask websites not to track me”. 

[<img title="Opera_12_unstable_DNT_annotated" border="0" alt="Opera_12_unstable_DNT_annotated" src="http://lh3.ggpht.com/--E7oC3LveYA/Tzk59DsFs5I/AAAAAAAAEwA/ngMHnRGiIEM/Opera_12_unstable_DNT_annotated_thumb%25255B1%25255D.jpg?imgmax=800" width="504" height="423" />](http://lh3.ggpht.com/-cgD51ulq-fc/Tzk522vKzuI/AAAAAAAAEv4/PmX9meksSoA/s1600-h/Opera_12_unstable_DNT_annotated%25255B1%25255D.jpg) 

The Do Not Track HTTP header was first announced in January 2011 and is designed to help users defend against this practice. It does so by, for example, deleting cookies, not accepting cookies, or setting an opt-out cookie, which declares that they do not want their online activity to be tracked. However, the DNT header doesn't actively block content as it relies on the cooperation of the advertising industry. The first browser to support the system was Firefox 4.0; version 9 extended the ability to detect users opting out of tracking to JavaScript. 

This experimental build of Opera also includes optimizations to improve SSL handling and updates to [XMLHttpRequest](http://en.wikipedia.org/wiki/XMLHttpRequest) (XHR) that its developers say should “improve the upload experience on Google services (no more Flash uploaders on YouTube and Gmail)”. More details about the development snapshot, including download links, can be found in the [announcement blog post](http://my.opera.com/desktopteam/blog/2012/02/10/core-dnt-mail-themes). Its developers advise users that the development release of Opera 12 may crash or lead to data loss situations, adding that “In fact, it may not work at all”. The current stable version is Opera 11.61 from January.