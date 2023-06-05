---
title: Microsoft revises its certificate management
date: 2012-06-14T08:34:00+00:00
layout: single
author_profile: true
url: 2012/06/14/microsoft-revises-its-certificate-management/
tags:
  - certified
  - Microsoft
  - report
lang: en
categories: 
  - techblog
---
[![Microsoft_Logo200](http://lh3.ggpht.com/-ubCpZ4EA9_o/T9ma-tyjMUI/AAAAAAAAGPw/zRu94EhWTfw/Microsoft_Logo200_thumb.png?imgmax=800 "Microsoft_Logo200")](http://lh3.ggpht.com/-1ZH9zPX4DfU/T9ma82gKVDI/AAAAAAAAGPo/U_9rm-ivXxs/s1600-h/Microsoft_Logo200%25255B2%25255D.png)

The H-Online: In response to the [Flame worst-case scenario](http://www.h-online.com/news/item/Flame-oversights-and-expertise-made-for-Windows-Update-worst-case-scenario-1614234.html), Microsoft has now integrated a custom block list feature for its certificate store under Windows. The feature was deployed as part of [this month's Patch Tuesday](/2012/06/14/critical-holes-closed-in-microsofts-june-patch-tuesday/). The [Flame](http://www.h-online.com/security/features/FAQ-Flame-the-super-spy-1587063.html) worm had [spread via Windows Update](http://www.h-online.com/news/item/Windows-Update-compromised-1612246.html) feature by manipulating the certificates that were intended to protect Windows updates from tampering. 

As described in a Microsoft Security Response Center (MSRC) [blog post](http://blogs.technet.com/b/msrc/archive/2012/06/12/certificate-trust-list-update-and-the-june-2012-bulletins.aspx), the latest modification automatically causes compromised certificates to be regarded as untrusted. To achieve this, the certificate store checks a Microsoft-maintained list on a daily basis for certificates that are no longer trustworthy. Certificate Authorities are required to inform the company of any revoked certificates, which will then be added to the list. According to a [Windows PKI blog post](http://blogs.technet.com/b/pki/archive/2012/06/12/announcing-the-automated-updater-of-untrustworthy-certificates-and-keys.aspx), this method is considerably faster than the deployment of [Certificate Revocation Lists](http://en.wikipedia.org/wiki/Revocation_list) (CRLs). 

Microsoft has also [announced](http://blogs.technet.com/b/pki/archive/2012/06/12/rsa-keys-under-1024-bits-are-blocked.aspx) that RSA keys of less than 1,024 bits in length will no longer be accepted by Windows once the forthcoming software update for August has been installed. This affects the SSL certificates of web sites: browsers will respond with an error message when a connection attempt to an affected site is made. Also, users will no longer be able to install Active X controls and applications that were signed using short keys. 

[http://h-online.com/-1617202](http://h-online.com/-1617202 "http://h-online.com/-1617202")