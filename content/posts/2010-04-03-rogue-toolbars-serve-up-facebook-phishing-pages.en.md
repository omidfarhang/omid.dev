---
title: Rogue Toolbars Serve Up Facebook Phishing Pages
date: 2010-04-03T20:35:00+00:00
layout: single
author_profile: true
url: 2010/04/03/rogue-toolbars-serve-up-facebook-phishing-pages/
tags:
  - alert
  - Facebook
  - Firefox
  - malware
  - phishing
  - scam
  - social networking
lang: en
category: techblog
---
There are a number of Toolbars out there in the wild with a nasty sting in the tail for anybody using them to login to Facebook. We’ve seen two of these so far; it’s possible there are more.

Promoted as toolbars that allow you to cheat at popular Zynga games such as Mafia Wars, they appear to be normal at first glance with a collection of links to various websites and other features common to this type of program.

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S7eeY1fTkQI/AAAAAAAABe8/peDIjwL4D5c/s400/fbpshtb000.gif)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S7eeY1fTkQI/AAAAAAAABe8/peDIjwL4D5c/s1600-h/fbpshtb000.gif)

Should the end-user hit the “Facebook” button, however, things start to go wrong very quickly. In testing, what opened up for us wasn’t the real Facebook login screen – it was a verified Facebook Phish.

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S7eeZ6DXFaI/AAAAAAAABfA/PeAfVSkKM1c/s400/fbpshtb44.gif)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S7eeZ6DXFaI/AAAAAAAABfA/PeAfVSkKM1c/s1600-h/fbpshtb44.gif)

Taken to apps-facebook-inthemafia(dot)tk, only the anti-phish protection in both IE and Firefox would probably have saved the end-user from entering their details into the fake page. mafiamafiamafiamafia(dot)t35(dot)com was also flagged on [Phishtank](http://www.phishtank.com/phish_detail.php?phish_id=949821), and it looks like we arrived just in time to catch the suspicious activity taking place because the t35 URL was deactivated shortly after.

The story doesn’t end there, however – once the above domain went down at around 5:20 GMT, it was around 90 minutes or less before the toolbars were now pointing to a fresh URL!

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7eebDCvb9I/AAAAAAAABfE/_mnG2-CwhSE/s400/fbpshtb65.gif)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7eebDCvb9I/AAAAAAAABfE/_mnG2-CwhSE/s1600-h/fbpshtb65.gif)

As you can see from the above screenshot, the toolbars now took end-users to apps-inthemafias-facebook(dot)tk, which was a cover for another t35 URL: mafiawars200uk(dot)t35(dot)com. Again, it wasn’t too long before the domain looked like this:

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S7eecD5tN2I/AAAAAAAABfI/pmNzPHzj_x8/s400/fbpshtb999.gif)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S7eecD5tN2I/AAAAAAAABfI/pmNzPHzj_x8/s1600-h/fbpshtb999.gif)

Currently, the toolbars we have point to the real Facebook URL – the obvious danger is that they could suddenly switch to another fake site and continue harvesting Facebook logins. I’ve reported both Toolbars (which can be created by anyone through this [Community Toolbar form](http://accounts.conduit.com/wizard/)) to [Conduit](http://www.conduit.com/), and hopefully action will be taken shortly. If we see any new phish pages linked to, I’ll update this entry.

For now, some handy tips:

1) If you install a toolbar from the ourtoolbar(dot)com domain, pay attention to what kind of toolbar it is. Does it promise “cheats” for Zynga games? If so, you might want to avoid logging into Facebook by clicking buttons on the toolbar itself.

2) If you do click a Facebook button on one of these toolbars, are you taken to a .tk domain? If so, check at the bottom of the page – the phish page creators are a little lazy, and have left a rather large clue that you’re not on the real Facebook site:

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S7efEMtK7kI/AAAAAAAABfM/gJ5q34CUAqM/s400/fbpshtad.gif)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S7efEMtK7kI/AAAAAAAABfM/gJ5q34CUAqM/s1600-h/fbpshtad.gif)

Adverts and a T35 hosting notice – probably a bit of a giveaway (you can also View Source in your browser and confirm you’re on a T35 domain and not Facebook).
