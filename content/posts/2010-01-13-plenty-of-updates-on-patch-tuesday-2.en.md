---
title: Plenty of Updates on Patch Tuesday
date: 2010-01-13T12:11:00+00:00
layout: single
author_profile: true
url: 2010/01/13/plenty-of-updates-on-patch-tuesday-2/
tags:
  - Adobe
  - alert
  - Microsoft
  - Patch Tuesday
  - Updates
lang: en
category: techblog
---
This Black Tuesday was different as anticipated – Microsoft releases only one security bulletin, but other companies “jumped in” and deliver updates now as well.

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S02wkwYFxyI/AAAAAAAAApE/YJMAZD2NREU/s1600-h/microsoft_logo.jpg" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S02wkwYFxyI/AAAAAAAAApE/YJMAZD2NREU/s640/microsoft_logo.jpg" /></a>
</div>

For the windows operating systems, only [one Security Bulletin](http://www.microsoft.com/technet/security/Bulletin/MS10-jan.mspx) was released. [MS10-001](http://www.microsoft.com/technet/security/Bulletin/MS10-001.mspx) deals with a vulnerability in the decompression routines of the Embeded OpenType Font Engine. This means that especially in Windows 2000, programs like Internet Explorer, Word or PowerPoint for example which render EOT fonts can put the system at risk when viewing manipulated contents. In newer operating systems the flawed code is used differently so that Microsoft assumes that it isn’t exploitable there.

The company released another [Security Advidory](http://www.microsoft.com/technet/security/advisory/979267.mspx) on the Adobe FlashPlayer that is installed by default on Windows XP. Due to security vulnerabilities in that version attackers may inject malicious code and compromise the computers. Microsoft advises users and administrators to either uninstall or update the software. Current versions are available on [Adobes web site](http://get.adobe.com/flashplayer/).

<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S02wmIk1MsI/AAAAAAAAApM/KzSTgY9ch-Y/s1600-h/logo-flashplayer.jpg" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S02wmIk1MsI/AAAAAAAAApM/KzSTgY9ch-Y/s640/logo-flashplayer.jpg" /></a>
</div>

Adobe also released updated versions of Reader and Acrobat. They close [security holes](http://www.adobe.com/support/security/bulletins/apsb10-02.html) in the popular software which is already publicly exploited. The updated Reader software is available [here](http://get.adobe.com/reader), while for Acrobat updates are available [here](http://www.adobe.com/support/downloads/product.jsp?product=1&platform=Windows).

On a side note, also Oracle released [Critical Patch Updates](http://www.oracle.com/technology/deploy/security/critical-patch-updates/cpujan2010.html) (CPU) for several of it’s database products.

As all updates deal with critical security vulnerabilities, users are advised to install them as soon as possible. Administrators should start their tests immediately so they can roll out the fixed software ASAP, too, as some of those vulnerabilities already get exploited by cyber criminals.