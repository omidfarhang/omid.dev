---
title: "Take Care Before Valentine: Cupid Struck"
date: 2010-02-11T20:01:00+00:00
layout: single
author_profile: true
url: 2010/02/11/take-care-before-valentine-cupid-struck/
tags:
  - malware
  - scam
lang: en
category: techblog
---
It's just a few more days before Valentine's Day. As most people now are already preparing their celebration, malware authors are also getting ready to use this popular event to target users with their malicious intent.

Here's one example of a malicious file (2077ed17f0ad92dafb8fb7601570e06580e4b7f1) we've seen recently:

Upon execution, it drops the following picture file greeting:

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S3RanJIf1rI/AAAAAAAAA4Q/-nMB5ZXAFUo/s640/valentine_thumb.jpg)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S3RanJIf1rI/AAAAAAAAA4Q/-nMB5ZXAFUo/s1600-h/valentine_thumb.jpg)

Note: It seems that the malware writers are using valid images from legitimate Web sites.

Cute isn’t it? However, it does not just drop that Valentine related greeting, it also drops and executes the following file:

82.exe – detected as Backdoor:Win32/Bifrose.AE

Backdoor:Win32/Bifrose is a family of backdoor Trojans that allows a remote attacker to access a compromised computer. It usually drops a copy of the backdoor on the following folder:

<system folder="">\bifrost\</system>

and it also creates the following registry entries:  
HKLM\SOFTWARE\Bifrost  
HKCU\SOFTWARE\Bifrost

You can get more infromation about Backdoor:Win32/Bifrose.AE in our encylopedia entry here.

Please be very cautious in searching for those Valentine greetings from the Internet or opening greeting cards even from your loved ones.

You would want Cupid to strike your heart and not your computer.

Advanced Happy Valentines Day Everyone!!!