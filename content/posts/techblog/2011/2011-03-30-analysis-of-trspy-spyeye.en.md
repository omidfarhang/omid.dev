---
title: Analysis of TR/Spy.SpyEye
date: 2011-03-30T14:48:00+00:00
layout: single
author_profile: true
url: 2011/03/30/analysis-of-trspy-spyeye/
tags:
  - analyze
  - Avira
  - Malware
  - review
  - Security

categories:
  - TechBlog
---
**![avira_logo_red_rgb (2)](http://lh6.ggpht.com/_vaUVXcmC3OI/TZM7yPvanvI/AAAAAAAADyk/MnvbNy90n7E/s1600-h/avira_logo_red_rgb%20%282%29%5B7%5D.jpg)Avira TechBlog:** SpyEye is a malware family which we are monitoring for some time. Today we are analyzing a sample which is detected as TR/Spy.SpyEye.flh by [Avira](https://www.avira.com/en/free-antivirus-windows).

The Trojan is able to inject code in running processes and can perform the following functions:

  * Capture network traffic 
  * Send and receive network packets in order to bypass application firewalls 
  * Hide and prevent access to the startup registry entry 
  * Hide and prevent access to the binary code 
  * Hide the own process on injected processes 
  * Steal information from Internet Explorer and Mozilla Firefox

A detailed analysis of this malware by Liviu Serban, Virus Researcher at Avira.

You can read this useful article here: <http://techblog.avira.com/2011/03/30/analysis-of-trspy-spyeye/en/>

****

This analysis is also available as [download here (PDF)](http://techblog.avira.com/images/2011/03/Analysis-of-TR.Spy_.SpyEye.pdf).