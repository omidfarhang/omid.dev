---
title: Don’t press F1
date: 2010-03-02T22:50:00+00:00
layout: single
author_profile: true
url: 2010/03/02/dont-press-f1/
tags:
  - advice
  - Internet Explorer
  - malware
  - Microsoft
  - Vulnerability
lang: en
categories: 
  - techblog
---
[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S42LF_LCfVI/AAAAAAAABFE/wkzDVeitV10/s640/careful_20with_20F1.png)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S42LF_LCfVI/AAAAAAAABFE/wkzDVeitV10/s1600-h/careful_20with_20F1.png)

Here’s a new vector: exploiting a Windows vulnerability through an Internet Explorer help menu Visual Basic script: “get ‘em to hit F1 and you own ‘em.”

Microsoft is warning of a VBScript vulnerability in Internet Explorer (on Win2K, XP and Server03) that could be used to run malicious code. A malicious operator could create a web site that displays a specially crafted dialog box and prompts a victim to press the F1 key (help menu.) The exploit could then execute malicious code on a victim machine. (Windows versions that are not vulnerable are: Vista, Win7, Server08 R2 and Server08.)

Proof of concept code has been circulated, but Microsoft has said: “We are not aware of attacks that try to use the reported vulnerabilities or of customer impact at this time.”

The company said in its security advisory: _“Microsoft is concerned that this new report of a vulnerability was not responsibly disclosed, potentially putting computer users at risk. We continue to encourage responsible disclosure of vulnerabilities. We believe the commonly accepted practice of reporting vulnerabilities directly to a vendor serves everyone's best interests. This practice helps to ensure that customers receive comprehensive, high-quality updates for security vulnerabilities without exposure to malicious attackers while the update is being developed.”_

[Microsoft Security Advisory 981169 here](http://www.microsoft.com/technet/security/advisory/981169.mspx).