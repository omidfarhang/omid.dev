---
title: Skype divulges user IP addresses
date: 2012-04-30T17:36:00+00:00
layout: single
author_profile: true
url: 2012/04/30/skype-divulges-user-ip-addresses/
tags:
  - report
  - security
  - Skype
  - Vulnerability
lang: en
category: 
  - techblog
---
[<img title="skype_logo200" border="0" alt="skype_logo200" align="right" src="http://lh4.ggpht.com/-7EPh_zAX_yI/T57GZ-WuvwI/AAAAAAAAFx4/r0qGoHHpA7w/skype_logo200_thumb.png?imgmax=800" width="200" height="88" />](http://lh3.ggpht.com/-vNLSJyvb0pw/T57GX25RrHI/AAAAAAAAFxs/3xDJMiD49B0/s1600-h/skype_logo200%25255B2%25255D.png)The H-Online: According to a [blog post](http://skype-open-source.blogspot.com/2012/04/skype-user-ip-address-disclosure.html), a modified version of the [Skype](http://www.skype.com/) VoIP software can be used to easily find out the [IP address](http://en.wikipedia.org/wiki/IP_address) of any valid Skype user. No contact has to be made with the user in order to get the information. This IP could then be used to find out other personal details about the user, such as their location or even their employer. 

With a certain registry key, the manipulated version of Skype will create a log file with information including other users' external and internal IP addresses. These IPs can be retrieved simply by opening up a user's profile with the Skype client. In a test conducted by The H's associates at heise Security, the log file always showed the correct IPs – and when a user was logged in with multiple clients, the IP addresses for all the clients were visible. 

[<img title="skypeip" border="0" alt="skypeip" align="right" src="http://lh5.ggpht.com/-vYOZzpsCd5Q/T57GiySHF9I/AAAAAAAAFyI/2jAaifgn598/skypeip_thumb%25255B1%25255D.png?imgmax=800" width="400" height="268" />](http://lh4.ggpht.com/-j2GeF3d4fPY/T57GgYoEjTI/AAAAAAAAFyA/wLbgIm10Cp0/s1600-h/skypeip%25255B3%25255D.png)Shortly after this was discovered, a hacker known as “Zhovner” put together the skype-ip-finder.tk web service. After a CAPTCHA has been submitted, the service can be used to find out IPs even without the special Skype client, and therefore without having to use a valid Skype account. 

The service uses a modified version of Skype's [SkypeKit SDK](http://developer.skype.com/public/skypekit) that is currently only available via BitTorrent, and Zhovner has [put](https://github.com/zhovner/Skype-iplookup/) the necessary Python scripts on GitHub. In a [post](https://news.ycombinator.com/item?id=3900590) on Hacker News, Zhovner says that Skype has already banned his account, likely because of his experiments.