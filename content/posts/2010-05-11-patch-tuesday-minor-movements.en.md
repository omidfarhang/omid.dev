---
title: "Patch Tuesday &#8211; Minor movements…"
date: 2010-05-11T22:43:00+00:00
layout: single
author_profile: true
url: 2010/05/11/patch-tuesday-minor-movements/
tags:
  - Adobe
  - Apple
  - Microsoft
  - Patch Tuesday
  - Updates
  - Windows
lang: en
category: techblog
---
Hey Admins…. It’s that time again. The second Tuesday is upon us and May so far hasn’t been demanding as far as patching goes. 

So far …. this month Microsoft has only issued two security announcements. [MS10-030](http://www.sophos.com/support/knowledgebase/article/110936.html) and [MS10-031](http://www.sophos.com/support/knowledgebase/article/110937.html). Microsoft has rated both as critical &#8211; and both could result in remote code being executed. 

[MS10-030](http://www.sophos.com/support/knowledgebase/article/110936.html) resolves an integer overflow in POP3 & IMAP mail responses to Outlook Express and Windows Mail…. [MS10-031](http://www.sophos.com/support/knowledgebase/article/110937.html) addresses a stack memory corruption related to the way that “Visual Basic for Applications” searches for ActiveX components, when host applications provide specially crafted files to the Visual Basic runtime. 

Adobe and Apple haven’t issued any security updates in May yet. 

Apple’s last security update was on April 15th when they issued [Security Update 2010-003](http://support.apple.com/kb/HT4131) for OSX 10.5 and 10.6. ( 2010-003 addressed an issue with handling embedded fonts that could result in RCE )( see [CVE-2010-1120](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2010-1120) for more details ) 

Adobe’s last update was [APSB10-10](http://www.adobe.com/support/security/bulletins/apsb10-10.html) on April 30th. APSB10-10 resolves issues in Photoshop CS4 (v11.0.0 ) for both Mac and Windows variants.   Issues with Photoshop’s handling of specially crafted .TIFF files could lead to remote code execution ( see [CVE-2010-1279](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2010-1279) for more details ).