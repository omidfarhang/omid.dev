---
title: Hotmail Always-On Encryption Breaks Microsoft’s Own Apps
date: 2010-11-10T15:37:00+00:00
layout: single
author_profile: true
url: 2010/11/10/hotmail-always-on-encryption-breaks-microsofts-own-apps/
tags:
  - Hotmail
  - Microsoft
  - privacy
  - security
  - Windows Live
lang: en
category: techblog
---
[![img-33742-microsoft-windows-live-logo-450x360](http://lh4.ggpht.com/_vaUVXcmC3OI/TNq1JAkRARI/AAAAAAAADHU/qcudHe_83rk/img-33742-microsoft-windows-live-logo-450x360_thumb%5B6%5D.jpg?imgmax=800 "img-33742-microsoft-windows-live-logo-450x360")](http://lh5.ggpht.com/_vaUVXcmC3OI/TNq1GrG0FwI/AAAAAAAADHQ/fYUXs2hv6mw/s1600-h/img-33742-microsoft-windows-live-logo-450x360%5B4%5D.jpg)Oh look, Microsoft is late to the party again? They are finally launching full-session SSL encryption to Hotmail a mere 2 years after Google did the [same thing for Gmail](http://gmailblog.blogspot.com/2008/07/making-security-easier.html).

It looks like the release of [FireSheep](/2010/10/26/firesheep-who-is-eating-my-cookies/) really has had an impact on web-application vendors due to the amount of mainstream media coverage it got and the sheer number of downloads.

At least they are doing something and I hope more vendors follow and give users an option to force full-session HTTPS connections for all web properties.

> _For the first time in its 13-year history, Microsoft’s Hotmail comes with the ability to protect email sessions with secure sockets layer encryption from start to finish._
> 
> _It’s the same always-on encryption Google Mail has offered for more than two years. And it comes with some pretty extreme limitations – namely the inability to protect email that’s downloaded using Microsoft apps including Outlook Hotmail Connector (required to use Outlook with Hotmail) and Windows Live Mail. But to hear Microsoft describe the new feature, you’d think it was a cure for the common cold._
> 
> _“As you saw, with the recent additions of several security features to Hotmail, including Single-Use codes and new account recovery options, building towards the most secure webmail experience is very importance to us,” a spokeswoman, who asked that her name not be published, wrote in an email. “We will continue to incorporate leading-edge security features to better protect our customers. With today’s addition of full-session SSL encryption to Hotmail, we are delivering even more secure Hotmail sessions.”_

The funny thing is, now they have pushed this out…but only for the web. If you are using software to access your Hotmail account (Outlook or Windows Live Mail) it doesn’t work..I wonder if anyone has tried it with Thunderbird yet? Or any other 3rd party apps.

Gmail works flawlessly with TLS/SSL for all apps I’ve tried, I’m not a Hotmail user so I can’t confirm or deny the above. It does give some modicum of security if the users in question only access their Hotmail via the web interface – but if they are using software..they are still vulnerable.

> _Microsoft’s online services have long played second fiddle to those of Google, and judging from Tuesday’s announcement, security is no exception. Not only is Gmail’s HTTPS encryption turned on by default, it also works flawlessly with a variety of email apps such as Thunderbird, Eudora, and even Microsoft’s Outlook. We asked Microsoft to explain why its own SSL doesn’t work with its own apps, and whether it might work with other email clients, but all we got was the above-quoted marketing fluff._
> 
> _That’s unfortunate, because unsecured email has been the elephant in the room for more than a decade, making Hotmail users who check their email from public Wi-Fi vulnerable to snoops. For most Reg readers this is old news. But for readers of mainstream publications, it only sank in two weeks ago, with the advent of Firesheep, a Firefox plugin that makes stealing authentication cookies from Facebook, Twitter and, yes, Hotmail, a snap._
> 
> _Enter Microsoft with a watered-down solution that’s certainly better than nothing. But given the fanfare with which it was announced, one wonders if it will give Hotmail users a false sense of security. And that’s not much of a selling point, now is it?_

The bad thing is, if it gives users a false sense of security – as in most cases..that is worse than no security at all. And honestly does the average joe user know what SSL or TLS is? Or that they should use https:// when connecting to sites that require authentication?

Really? I don’t think they do, and nor will they care until some kiddy fires up FireSheep in the local Starbucks and steals all their accounts.

_Credit to Darknet.org.uk_