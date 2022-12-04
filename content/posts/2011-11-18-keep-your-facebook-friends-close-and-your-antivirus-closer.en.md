---
title: Keep your Facebook friends close and your antivirus closer
date: 2011-11-18T16:53:00+00:00
layout: single
author_profile: true
url: 2011/11/18/keep-your-facebook-friends-close-and-your-antivirus-closer/
tags:
  - advice
  - alert
  - Facebook
  - malware
lang: en
category: techblog
---
**[Microsoft Malware Protection Center](http://blogs.technet.com/b/mmpc/archive/2011/11/17/keep-your-facebook-friends-close-and-your-antivirus-closer.aspx):** Facebook malware attacks are not new. Scams spreading via status updates have been around for a long time, but in recent weeks one threat has been getting creative in terms of social engineering. [Backdoor:Win32/Caphaw.A](http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?Name=Backdoor:Win32/Caphaw.A) can intercept URL requests in both Firefox and Internet Explorer and it has been observed to post very personable updates on friends' walls in Facebook, gaining access if the user is logged in.

![](http://4.bp.blogspot.com/-YfzOZqAMMmk/TsaJWaskTWI/AAAAAAAAETk/Kj6BPI1_8ro/s1600/BID056-FB-Backdoor-001.png)

The message links to a video posted on a Youtube-like website, which suggests that the user update the browser with a bogus ActiveX object. The malware's authors also went one step further in making sure the video landing page looks as legitimate as possible:

![](http://2.bp.blogspot.com/-x5uc2rKCnQc/TsaJlkVwMcI/AAAAAAAAETs/2Ik6EXnBlwM/s1600/BID056-FB-Backdoor-002.png)

This download is actually Backdoor:Win32/Caphaw.A, a sophisticated firewall-bypassing backdoor armed with almost everything. It installs an FTP server, a proxy server, and a keylogger on the computer. It also has built-in remote desktop functionality based on the open source VNC project. We received a report that a user found this in his computer and also discovered that money had been transferred from his bank account by an unknown party. The keylogging component, coupled with the remote desktop functionality, makes it entirely possible for this to have happened.

The backdoor “calls home” to domains such as commonworld\[removed\].cc or web\[removed\]es.cc to get the data that it posts on the friends' Facebook walls. Its main module, in the meantime, is hosted on \[removed\]youtube.com.

![](http://2.bp.blogspot.com/-0EbT7SK4vo4/TsaJo54aoCI/AAAAAAAAET0/TwXEMshDPnw/s1600/BID056-FB-Backdoor-003.png)

The good thing to do when spotting such fishy wall posts is to warn your friends whose accounts have been compromised. You can mark the message as spam to help prevent others from downloading the backdoor; Facebook is quite diligent about filtering these posts once they have been reported.

The presence of this threat on your computer threatens your whole online identity, so we recommend that you change the passwords to all of your sensitive accounts – email, online shopping, and online banking, for example. And while you're at it, remind your affected friends to change their Facebook passwords, too.

Finally, scan your machine with an up-to-date antivirus solution to remove this malware from your computer.  
Here are some SHA1s of files detected by our products as [Backdoor:Win32/Caphaw.A](http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?Name=Backdoor:Win32/Caphaw.A):

* c10ad13419ea44ba85cd8e83e2cd7ac8313e91de
* 54d9f40156cc4a2561252f8ad30b4afdcc5e93b4
* ebbd8790eab8a9822a80c2afaa575a4b2c2f3b55
