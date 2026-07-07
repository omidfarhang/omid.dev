---
title: Passwords used by the Conficker worm
date: 2009-01-15T23:55:43+03:30
lastmod: 2026-07-07T15:10:00+03:30
description: A historical look at the weak passwords Conficker brute-forced — still a reminder to avoid dictionary words and defaults on any network share.
layout: single
author_profile: true
url: 2009/01/15/passwords-used-by-the-conficker-worm/
shortlink: https://g.omid.dev/475fR5G
tags:
  - Safety Tips
  - Password
  - Malware
  - conficker
  - Security

categories:
  - TechBlog
---
It's not possible to emphasise enough the importance of using sensible passwords on your network.

Not just on the areas of your network that you don't want your users to traipse through, but also on the default network shares that are present on installations of commonly used operating systems. The Windows versions Conficker targeted — NT, 2000, XP, and 2003 — are all **end of life** and no longer receive security updates. The lesson still applies to any machine with open shares today.

One of the ways in which the Conficker worm (also known as Confick or Downadup) used to spread was to try and batter its way into ADMIN$ shares using a long list of different passwords.

As you can see in the list below, it relied upon computers using poorly chosen passwords such as dictionary words, "password", "qwerty", or sequences of letters or repeated numbers:

![confick-passwords](/images/2009/01/confick-passwords.gif)

One way to make it harder for password-cracking malware from spreading across your network is to ensure that no-one is using a poorly-chosen password. Use a password manager to generate unique, random passwords, disable default admin accounts, and require strong authentication on any network share that is still exposed.
