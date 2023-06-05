---
title: "Firesheep: who is eating my cookies?"
date: 2010-10-26T14:40:00+00:00
layout: single
author_profile: true
url: 2010/10/26/firesheep-who-is-eating-my-cookies/
tags:
  - Firefox
  - Firefox Addon
  - Offer
  - privacy
  - security
  - WiFi
lang: en
category: 
  - techblog
---
Internet is great, and everyday millions of people spend their day surfing it, using Google, Gmail, Youtube, Twitter, Facebook, etc. Some people buy at ebay, or Amazon. Even some people use it to work, though these cases maybe not that common![Winking smile](http://lh4.ggpht.com/_vaUVXcmC3OI/TMbhDPTZKhI/AAAAAAAAC6U/xQwJOsqyl9g/wlEmoticon-winkingsmile%5B2%5D.png?imgmax=800) 

As a reader of this blog, you are concerned about security and therefore you already know that connecting through public WiFi is a risky sport. But it is also really convenient, how many of you have done it in McDonalds,Starbucks, etc.? Yeah, me too![Open-mouthed smile](http://lh4.ggpht.com/_vaUVXcmC3OI/TMbhFQXc7ZI/AAAAAAAAC6Y/1c57ir6tCes/wlEmoticon-openmouthedsmile%5B2%5D.png?imgmax=800) 

As we always say, anyone could be sniffing the traffic and capture the data. There are even some websites that send the password in plain text! Yes, incredible but true. Anyway, that’s not the way of working of the main websites, as the ones I mentioned earlier. As we use to spend a lot of time in these webs (how many hours do you spend on Facebook per day?) in order to keep us logged in, once we validate ourselves a cookie is created with our session information, so we don’t have to enter our credentials over and over again.

Do you imagine what would happen if these cookies were sent in plain text, so anyone could capture them? Yes, that would be a nightmare, anyone could capture them and recreate them in their computers and steal our session. Well, this is something that happens ALL THE TIME. And it is no new. But yet, to perform this operation the guy must be smart enough to sniff the traffic, and work with it in order to steal your cookie. Not hard, but not everyone could do it.

Now the bad news; it’s been made available a Firefox add-on you can install that will do everything for you: sniff the traffic, gather the cookies around and show you the different ’stolen’ cookies, so you only have to click on them to steal the session. Easy, isn’t it? Even Netkairo, the Mariposa guy, would be able to do such thing.

This has been shown in Toorcon last weekend by Ian Gallager and Eric Butler, in a talk called “**Hey Web 2.0: Start protecting user privacy instead of pretending to**“. The slides can be found [here](http://codebutler.github.com/firesheep/tc12/#1).

A screenshot od the add-on working, with stolen sessions from Google, Facebook, Twitter and Flickr:

[<img title="Mozilla-Firefox" border="0" alt="Mozilla-Firefox" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TMbhMstI74I/AAAAAAAAC6g/l0RnM7_ode4/Mozilla-Firefox_thumb%5B1%5D.jpg?imgmax=800" width="304" height="255" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TMbhJLR3ilI/AAAAAAAAC6c/E-m_3jhhczc/s1600-h/Mozilla-Firefox%5B3%5D.jpg)

Don’t panic. Yes, this is bad, but there are some countermeasures to take. The best solution would be to use SSL encryption in all communications, but this has to be supported in the server side, so that won’t be happening (at least massively) anytime soon. Meanwhile, you should use [HTTPS Everywhere](https://www.eff.org/https-everywhere), which will force to use https when connecting to some mayor websites, such as Twitter or Facebook:

[<img title="HTTPS-Everywhere-Preferences" border="0" alt="HTTPS-Everywhere-Preferences" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TMbhTuMG1bI/AAAAAAAAC6o/G5yK5F-fYbY/HTTPS-Everywhere-Preferences_thumb%5B1%5D.jpg?imgmax=800" width="304" height="192" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TMbhP0AQnwI/AAAAAAAAC6k/pLu1U-JjhNw/s1600-h/HTTPS-Everywhere-Preferences%5B3%5D.jpg)

I installed it since it went public and it is always on.

But the best solution right now if you are connecting through an open WiFi, is using a VPN. If you cannot, at least use the HTTPS Everywhere.

_Credit to Luis Corrons, Panda Labs_