---
title: LibreOffice vulnerable to multiple buffer overflows
date: 2012-08-02T19:46:00+00:00
layout: single
author_profile: true
url: 2012/08/02/libreoffice-vulnerable-to-multiple-buffer-overflows/
tags:
  - libreOffice
  - report
  - security
  - Vulnerability
lang: en
category: 
  - techblog
---
<a href="http://lh3.ggpht.com/-lwgP4mg1MOI/UBrSFrn6MCI/AAAAAAAAGxg/iOJIdr37MZ0/s1600-h/LibreOffice%25255B2%25255D.png" target="_blank"><img title="LibreOffice" border="0" alt="LibreOffice" align="right" src="http://lh3.ggpht.com/-e6Po0aP7wP4/UBrSHVjjxHI/AAAAAAAAGxo/lFPq4TUx1LQ/LibreOffice_thumb.png?imgmax=800" width="218" height="45" /></a>h-online: Three weeks after [releasing LibreOffice 3.5.5](http://www.h-online.com/news/item/LibreOffice-3-5-5-update-improves-stability-1636972.html), [The Document Foundation](http://www.documentfoundation.org/) has confirmed that security holes in earlier versions of the open source [LibreOffice](http://www.libreoffice.org/) productivity suite can be exploited by attackers to compromise a victim's system. According to the project's [security advisory](http://www.libreoffice.org/advisories/CVE-2012-2665/), these include multiple heap-based buffer overflow vulnerabilities in the XML manifest encryption tag parsing code. 

Successful exploitation of the vulnerabilities could lead to the execution of arbitrary code on a system with the privileges of a local user. For an attack to be successful, a victim must first open a specially crafted Open Document Format (ODF) file. Versions up to and including LibreOffice 3.5.4 are affected; upgrading to version 3.5.5 or later fixes these problems. All users are advised to [upgrade](http://www.libreoffice.org/download/). 

The developers note that the 3.6.0 release of LibreOffice also closes these holes. However, at the time of writing, this version has yet to be released only the [fourth release candidate](http://www.h-online.com/news/item/LibreOffice-skips-to-3-6-0-release-candidate-4-1655370.html) is available. 

[http://h-online.com/-1658328](http://h-online.com/-1658328 "http://h-online.com/-1658328")