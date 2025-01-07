---
title: FakeAV, now for Windows 7!
date: 2010-03-04T23:07:00+00:00
layout: single
author_profile: true
url: 2010/03/04/fakeav-now-for-windows-7/
tags:
  - malware
  - phishing
  - report
  - review
  - rogue software
  - scam
lang: en
categories: 
  - TechBlog
---
It’s been over a year since we first started seeing the familiar Windows XP My Computer page where it appears your drives are being scanned and it reports a bunch of non-existent malware on your computer. Yesterday I was investigating the latest hot news item where there was a FAMU (Florida Agricultural and Mechanical University) sex tape released on the internet and sure enough I found many SEO poisoned links claiming to have the video. Imagine my surprise when I saw the following.

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S5A1mD8b3PI/AAAAAAAABI0/S8vdokHUKwc/s640/popup1.jpg)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S5A1mD8b3PI/AAAAAAAABI0/S8vdokHUKwc/s1600-h/popup1.jpg)

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S5A1oJXmhDI/AAAAAAAABI8/XXFRVEjfiZo/s640/windows71.jpg)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S5A1oJXmhDI/AAAAAAAABI8/XXFRVEjfiZo/s1600-h/windows71.jpg)

It seems the malware folks have upgraded their look to the latest Windows 7! They have to assume people visiting their pages have upgraded to the latest Windows. After all, it seems less likely people will fall for a Windows XP My Computer looking page claiming they have malware when they’re running Windows 7. It will be interesting to see if all of these pages slowly convert to Windows 7, if this is just a one-off, or if they keep a mix of the two in the wild and just hope to get lucky.

Also for those curious as to why Google indexes these pages so highly, from the perspective of the Googlebot that indexes the web, this is what the pages looks like.

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S5A1kYHBLqI/AAAAAAAABIs/0v7UFoFysbQ/s640/colors1.jpg)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S5A1kYHBLqI/AAAAAAAABIs/0v7UFoFysbQ/s1600-h/colors1.jpg)

There are plenty of key words mentioning the topics they’re trying to poison, and in many cases it links to many other pages in a big network of sites that are very similar to this one. That in turn raises the Google search ranking even further so that when users like us come searching for these terms we see them near the top of the results. Unfortunately for people searching Google, instead of serving us the colorful pages they can detect that we aren’t the Google crawler and so instead they opt to redirect to the FakeAV pages.

As always be careful of links you click on when searching for the latest news on Google. Stick to sites you’re familiar with and just enter the URL manually in the address bar rather than searching for it on Google when you can.