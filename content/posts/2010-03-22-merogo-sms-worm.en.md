---
title: Merogo SMS worm
date: 2010-03-22T16:54:00+00:00
layout: single
author_profile: true
url: 2010/03/22/merogo-sms-worm/
tags:
  - malware
  - Mobile
  - spam
lang: en
categories: 
  - techblog
---
[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S6eZdvJHcpI/AAAAAAAABWg/hte24M_i8pI/s400/merogo1.png)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S6eZdvJHcpI/AAAAAAAABWg/hte24M_i8pI/s1600-h/merogo1.png)

We're investigating a series of SMS Worms, found in the wild in China. Known as Trojan:SymbOS/MerogoSMS, these worms try to spread on Symbian Series 60 3rd Edition devices. Symbian continues to be by far the most common smartphone operating system in the world.

These worms spread by sending text messages to other phones. These text messages contain variable messages (in Chinese), and a link to a website. If the link is followed, user is prompted to install an application – infecting the phone and restarting the SMS spreading.

In addition of spreading, these worms seem to have the capability of sending messages to expensive premium-rate numbers.

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S6eZsdvByyI/AAAAAAAABWo/BKKgl47_n6w/s320/cserver.png)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S6eZsdvByyI/AAAAAAAABWo/BKKgl47_n6w/s1600-h/cserver.png)

As unsigned software can not be installed on Symbian Series 60 3rd Edition devices by default, the SISX installation packages of this worm have indeed gone through the Symbian Signed process. Apparently they were submitted through the Express Signing mechanism. The signed installation files contain further, unsigned SISX files which the host installer will deploy. Such mechanism makes it hard for certification systems to get a full view of what the program actually does.

Symbian Foundation has already revoked the publisher ID that was used for these packages.

We have no reports of this malware from outside China.
