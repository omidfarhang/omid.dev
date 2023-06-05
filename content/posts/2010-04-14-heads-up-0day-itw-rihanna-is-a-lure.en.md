---
title: "Heads up – 0day ITW – Rihanna is a lure"
date: 2010-04-14T18:26:00+00:00
layout: single
author_profile: true
url: 2010/04/14/heads-up-0day-itw-rihanna-is-a-lure/
tags:
  - 0-Day
  - advice
  - alert
  - malware
  - scam
lang: en
category: 
  - techblog
---
On April 9th, Tavis Ormandy published a proof of concept about how to use the latest version of Java to compromise a pc. You can read about it [here.](http://seclists.org/fulldisclosure/2010/Apr/119) He notified Sun, but they weren't concerned enough to break their patch cycle, so he published the code.  

The problem is that when Sun released Java 6, update 10 in April 2008, they introduced a new feature (it's not a bug, it's a feature folks) called Java Web Start. In order to make it easier for developers to install software, they created a method to execute a program from a website.  

Duh 

Now, hindsight is always 20-20, but it doesn't take a massive gift of insight to imagine the Bad Guys thinking that was a good idea for them too. 

Because they designed it as a feature, it works, of course, with both IE and Firefox. 

The code involved is really simple, and that makes it easy to copy, so it's not surprising that just five days later, we're detecting that code at an attack server in Russia. 

The main lure so far seems to be a song lyrics publishing site, with Rihanna, Usher, Lady Gaga and Miley Cyrus being used, among others. Who'd have thought that Miley could be dangerous??? As soon as we figure out what's wrong with the lyrics site, we'll let them know so they can fix it. 

Of course, this'll soon likely be everywhere, so Sun will need to issue an out of band patch. 

In the mean time, to stay safe, you can either follow the mitigation strategies outlined by Tavis, or install a [Site Advisor](http://sites.google.com/site/boelectronic/computer/security/site-advisor). 

So far, it's not in any of the exploit kits, as far as we can see, but it's a given that it soon will be. Tick.. tick.. tick…