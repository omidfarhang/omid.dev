---
title: Microsoft revokes certificates used to sign the Flame trojan
date: 2012-06-04T13:37:00+00:00
layout: single
author_profile: true
url: 2012/06/04/microsoft-revokes-certificates-used-to-sign-the-flame-trojan/
tags:
  - certified
  - Malware
  - Microsoft
  - software
  - Updates
  - Windows
  - Security

categories:
  - TechBlog
---
![windows update](http://lh3.ggpht.com/-Frl63DpJXr8/T8yzsqawVqI/AAAAAAAAGMw/pKVPaFbzx9s/s1600-h/windows%252520update%25255B7%25255D.jpg)

Avira TechBlog Wrote:

> _Microsoft released_ [_Security Advisory 2718704_](http://technet.microsoft.com/en-us/security/advisory/2718704) _which revokes some certificated which apparently were used to sign the_ _[trojan Flame](/search/label/Flame)__._ 
> 
> _In a_ [_blog post_](http://blogs.technet.com/b/srd/archive/2012/06/03/microsoft-certification-authority-signing-certificates-added-to-the-untrusted-certificate-store.aspx)_, Microsoft explains how they discovered that some components of the malware have been signed by certificates that allow software to appear as if it was produced by Microsoft. The certificates issued by the Terminal Services licensing certification authority, which are intended to only be used for license server verification, were also used to sign code and make it look like as if it was originated from Microsoft._ 
> 
> _…_ 
> 
> _We highly recommend that all users apply this update immediately._

Read the post here: [http://techblog.avira.com/2012/06/04/microsoft-revokes-certificates-used-to-sign-the-flame-trojan/en/](http://techblog.avira.com/2012/06/04/microsoft-revokes-certificates-used-to-sign-the-flame-trojan/en/ "http://techblog.avira.com/2012/06/04/microsoft-revokes-certificates-used-to-sign-the-flame-trojan/en/") 

To Install this update visit [http://update.microsoft.com/microsoftupdate](http://update.microsoft.com/microsoftupdate)