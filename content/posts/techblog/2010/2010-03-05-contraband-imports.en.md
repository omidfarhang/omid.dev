---
title: Contraband Imports
date: 2010-03-05T01:18:00+00:00
layout: single
author_profile: true
url: 2010/03/05/contraband-imports/
tags:
  - malware
  - review
lang: en
categories: 
  - techblog
---
One of the issues malware writers deal with is having their programs load and execute on a victim’s computer. An unwary victim may click on an email attachment and have the malware run once. But in order to continue to be of value to the author, that piece of malware has to arrange for itself to be run after the computer inevitably gets rebooted.

There are several well known ways to accomplish this task. The problem here is these methods are well known and security software know where to look. Which brings us to the topic of this blog entry. We recently came across a hacked copy of imm32.dll which is Microsoft’s Input Method Manager library. The authors inserted an extra imported library into the file’s import directory. The extra library name starts with “net” and the imported function name is randomized.

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S5BUwjgZPaI/AAAAAAAABKM/0lt5sBAKjOY/s640/imports1.jpg)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S5BUwjgZPaI/AAAAAAAABKM/0lt5sBAKjOY/s1600-h/imports1.jpg)

Oh no, nothing suspicious here

When imm32.dll is used, this additional malicious library is also loaded and all its functionality is contained in its initialization code.