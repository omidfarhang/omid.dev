---
title: Merogo SMS worm
date: 2010-03-22T16:54:00+00:00
layout: single
author_profile: true
url: 2010/03/22/merogo-sms-worm/
tags:
  - Malware
  - Mobile
  - spam
  - Security

categories:
  - TechBlog
---
[![](/images/2010/03/merogo1.png)](/images/2010/03/merogo1-6d926756.png)

We're investigating a series of SMS Worms, found in the wild in China. Known as Trojan:SymbOS/MerogoSMS, these worms try to spread on Symbian Series 60 3rd Edition devices. Symbian continues to be by far the most common smartphone operating system in the world.

These worms spread by sending text messages to other phones. These text messages contain variable messages (in Chinese), and a link to a website. If the link is followed, user is prompted to install an application – infecting the phone and restarting the SMS spreading.

In addition of spreading, these worms seem to have the capability of sending messages to expensive premium-rate numbers.

[![](/images/2010/03/cserver.png)](/images/2010/03/cserver-24ae555f.png)

As unsigned software can not be installed on Symbian Series 60 3rd Edition devices by default, the SISX installation packages of this worm have indeed gone through the Symbian Signed process. Apparently they were submitted through the Express Signing mechanism. The signed installation files contain further, unsigned SISX files which the host installer will deploy. Such mechanism makes it hard for certification systems to get a full view of what the program actually does.

Symbian Foundation has already revoked the publisher ID that was used for these packages.

We have no reports of this malware from outside China.
