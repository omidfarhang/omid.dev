---
title: Free FakeAV at Virus-Total (That’s not VirusTotal)
date: 2010-03-01T23:06:00+00:00
layout: single
author_profile: true
url: 2010/03/01/free-fakeav-at-virus-total-thats-not-virustotal/
tags:
  - malware
  - phishing
  - rogue software
  - scam
  - spam
  - VirusTotal
lang: en
categories: 
  - TechBlog
---
[VirusTotal](http://www.virustotal.com/) has been well known to most readers of the blog. It’s a free virus and malware online scan service which allows submitters to test a particular file against a multitude of malware scanners. So, it’s not highly surprising that malware authors would try to use that name to further their gain.  
Today we came across such a sample arriving at one of our spamtraps through a car-related forum. The message looks like this:

> Subject: Warning!  
> DO NOT REPLY TO THIS EMAIL!  
> \***\***\***\***\***\***\***\***\***  
> Dear [Redacted forum user name],  
> You have received a new private message at [Redacted] Forum from [Redacted], entitled “Warning!”.  
> To read the original version, respond to, or delete this message, you must log in here:  
> http://[Redacted] 

> This is the message that was sent:  
> \***\***\***\***\***  
> Dear, [Redacted forum user names]  
> There are viruses’ activities from your computer! Highly recommend you to scan your computer for malicious and potentially unwanted software. If you do not follow this, I will have to make a complaint to your Internet Service Provider with attached log file (your IP address, etc.). If you want to find a report about your computer’s security and solve every problem with it, please click here: http://www.virus-total.[TLD removed]/detected/[Redacted] This is an online service that you can use for free spyware removal. Use it to scan your computer to help protect, clean, and keep your computer running at its best. Use the free scan to check for and remove viruses, spyware, and other potentially malicious software and to find vulnerabilities or shortcomings in your Internet security.  
> Thank you. Yours truly, [Redacted].  
> \***\***\***\***\***

That’s right – the malware authors registered a domain called virus-total.TLD. (The suffix is purposely removed here so that the curious won’t get themselves in trouble). This is in contrast to the legitimate site which is at virustotal.com with no dashes in the name.  
The link in the forum message would bring an unsuspecting user to a page which says:

> “We detected viruses activity from your computer. If that is really so, we highly recommend you to install our security tool and keep your computer running at its best.. Please, wait for a moment. You’ll be redirected to perform scanning…”

This page will then redirect to page /scanning/ at the same website which generates the following popup:

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S4xAQEQ7Y6I/AAAAAAAABDk/puEOHeU9A70/s640/virustotalfakeav1.png)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S4xAQEQ7Y6I/AAAAAAAABDk/puEOHeU9A70/s1600-h/virustotalfakeav1.png)

The above popup would follow by the loading of a fake scanning page inside the browser:

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S4xATUQcSKI/AAAAAAAABDs/IQM-0x_zcvQ/s640/virustotalfakeav2.png)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S4xATUQcSKI/AAAAAAAABDs/IQM-0x_zcvQ/s1600-h/virustotalfakeav2.png)

One of the interesting parts of this fake page is that the “Windows Security Alert” pop-up is actually a time-delayed object inside the page. Even though the box looks like a window box from Windows XP, it is not moveable at all.

When the fake scanning completes, another pop-up will be generated asking the user to download a file called security\_tool\_setup.exe. Needless to say, this file is malicious and is yet another one of the Fake Antiviruses.

The moral of the story is even though there are helpful people out there trying to warn others about malware, this technique is also abused by malware authors for their own gain. So, no matter if a link comes from a friend, family, or a close acquaintance, one has to be careful what link you access.