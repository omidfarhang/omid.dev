---
title: "Critical holes closed in Microsoft's June Patch Tuesday"
date: 2012-06-14T08:00:00+00:00
layout: single
author_profile: true
url: 2012/06/14/critical-holes-closed-in-microsofts-june-patch-tuesday/
tags:
  - Internet Explorer
  - Microsoft
  - security
  - Updates
  - Windows
lang: en
categories: 
  - techblog
---
[![windows update](http://lh5.ggpht.com/-zXJ_UM1aHHU/T9mTArtZl8I/AAAAAAAAGPY/BnkdZZWXK_Q/windows%252520update_thumb%25255B4%25255D.jpg?imgmax=800 "windows update")](http://lh6.ggpht.com/-MoakJsM8f4k/T9mS-bqfopI/AAAAAAAAGPQ/7FWpN6XWKSw/s1600-h/windows%252520update%25255B3%25255D.jpg)

The H-Online: Microsoft has [released](http://blogs.technet.com/b/msrc/archive/2012/06/12/certificate-trust-list-update-and-the-june-2012-bulletins.aspx) seven security bulletins fixing a total of 27 security holes, 13 of them in Internet Explorer. The rest of the patches affect all currently supported Windows versions, the .NET Framework, Remote Desktop, Lync and Dynamics AX. A patch that had been announced for Visual Basic for Applications has yet to be released. 

The most important updates are bundled in the cumulative Internet Explorer patch ([MS12-037](http://technet.microsoft.com/en-us/security/bulletin/ms12-037)), which includes fixes for the holes that were targeted by [Pwn2Own](http://www.h-online.com/news/item/Pwn2Own-ends-with-three-browsers-felled-Update-1469096.html) exploits. Microsoft is the last of the companies to close the exposed holes that were targeted during the Pwn2Own competition; [Google](http://www.h-online.com/news/item/Google-fixes-Pwnium-security-issue-in-Chrome-1467780.html) and [Mozilla](http://www.h-online.com/news/item/Firefox-Thunderbird-and-SeaMonkey-updates-fix-critical-vulnerabilities-1471708.html) fixed their browsers in March. [According to](http://blogs.technet.com/b/michaelkranawetter/archive/2012/06/12/sicherheitsupdates-juni-2012.aspx) Michael Kranawetter, Microsoft's Chief Security Advisor in Germany, the IE patch also affects the Windows 8 Consumer Preview, and therefore Internet Explorer 10. 

Another urgent update is [MS12-036](http://technet.microsoft.com/en-us/security/bulletin/ms12-036), which concerns denial of service and remote code execution vulnerabilities in the Remote Desktop features built into all supported versions of Windows. The third critical update affects the .NET Framework ([MS12-038](http://technet.microsoft.com/en-us/security/bulletin/ms12-038)). The remaining 4 updates are rated “important” by Microsoft and close code execution bugs in Lync and privilege escalation holes in Dynamics AX and Windows. 

No patch has so far been released for the critical hole in Microsoft's XML Core Services that can be targeted via Internet Explorer and Office documents. The vulnerability affects all versions of Windows. Microsoft has released a [security advisory](http://technet.microsoft.com/en-us/security/advisory/2719615) and recommends that users apply a “[Fix it](http://support.microsoft.com/kb/2719615)” solution until a proper patch has been made available. Google [says](http://googleonlinesecurity.blogspot.com/2012/06/microsoft-xml-vulnerability-under.html) that, on 30 May, it informed Microsoft that this hole is actively being exploited to target Windows systems. 

[http://h-online.com/-1616622](http://h-online.com/-1616622 "http://h-online.com/-1616622")