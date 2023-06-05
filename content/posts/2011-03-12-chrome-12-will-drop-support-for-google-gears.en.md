---
title: Chrome 12 Will Drop Support for Google Gears
date: 2011-03-12T21:25:00+00:00
layout: single
author_profile: true
url: 2011/03/12/chrome-12-will-drop-support-for-google-gears/
tags:
  - Google
  - Google Chrome
  - news
lang: en
category: 
  - techblog
---
**Google Operation System:** While most Chrome users have been upgraded to Chrome 10, Google is fixing [the bugs from Chrome 11](http://googlechromereleases.blogspot.com/2011/03/dev-channel-update_10.html) and working on Chrome 12. A recent Chromium build made [a significant change](http://src.chromium.org/viewvc/chrome?view=rev&revision=77888): Gears is no longer included in Google Chrome.

[<img title="chromium-no-more-gears" border="0" alt="chromium-no-more-gears" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TXvdiYqRWiI/AAAAAAAADq0/NYxVdUzxiow/chromium-no-more-gears_thumb%5B3%5D.png?imgmax=800" width="504" height="107" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TXvdguF94BI/AAAAAAAADqw/ri2kQOiYpO8/s1600-h/chromium-no-more-gears%5B5%5D.png)

Gears is a browser plugin released by Google [back in 2007](http://googleblog.blogspot.com/2007/05/29-hours-of-code.html), The initial goal was to add support for offline web apps, but the plugin added many other HTML5 features at a time when HTML5 wasn't a priority for most browsers. Google [discontinued Gears last year](http://gearsblog.blogspot.com/2010/02/hello-html5.html) to focus on “bringing all of the Gears capabilities into web standards like HTML5” and to implement them in Google Chrome. Features like geolocation, notifications, web workers, application caches are [already available in Google Chrome](http://gearsblog.blogspot.com/2011/03/stopping-gears.html), so it's probably the right time to stop bundling the Gears plugin.

“With all this now available in HTML5, it's finally time to say goodbye to Gears. There will be no new Gears releases, and newer browsers such as Firefox 4 and Internet Explorer 9 will not be supported. We will also be removing Gears from Chrome in Chrome 12,” [informs Google](http://gearsblog.blogspot.com/2011/03/stopping-gears.html).

What's surprising is that important services like Gmail and Google Calendar still use Gears to work offline. Other services like [Google Docs](http://googledocs.blogspot.com/2010/04/new-google-docs.html) and [Google Reader](http://googlereader.blogspot.com/2010/05/spring-cleaning-comments-offline-and.html) dropped offline support last year. Google promised that they will use HTML5 features implemented in browsers like Chrome or Firefox, but that hasn't materialized yet. 

[<img title="gmail-offline-mar2011" border="0" alt="gmail-offline-mar2011" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TXvdlgYciSI/AAAAAAAADq8/sghQo4_Z6CA/gmail-offline-mar2011_thumb%5B4%5D.png?imgmax=800" width="465" height="329" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TXvdj6ta1OI/AAAAAAAADq4/XSPjcGJ1few/s1600-h/gmail-offline-mar2011%5B6%5D.png) 

<img alt="" src="https://blogger.googleusercontent.com/tracker/18157064-1296382169766081449?l=googlesystem.blogspot.com" width="1" height="1" /> [<img title="google-calendar-offline-mar2011" border="0" alt="google-calendar-offline-mar2011" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TXvdo9ZsQlI/AAAAAAAADrE/L-Xc0kdb4wg/google-calendar-offline-mar2011_thumb%5B2%5D.png?imgmax=800" width="471" height="320" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TXvdnCB18jI/AAAAAAAADrA/7V6-I5xckuY/s1600-h/google-calendar-offline-mar2011%5B4%5D.png)