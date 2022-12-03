---
title: "Microsoft's record Patch Tuesday"
date: 2011-04-13T11:55:00+00:00
layout: single
author_profile: true
url: 2011/04/13/microsofts-record-patch-tuesday/
tags:
  - Microsoft Office
  - news
  - security
  - Updates
  - Windows
lang: en
category: techblog
---
<div dir="ltr" trbidi="on">
  <div>
    <a href="http://1.bp.blogspot.com/-pyjVS2sbwzo/TaWIDgAvIzI/AAAAAAAAD1E/ePtruraFe4o/s1600/windows+update.jpg" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/-pyjVS2sbwzo/TaWIDgAvIzI/AAAAAAAAD1E/ePtruraFe4o/s1600/windows+update.jpg" /></a>
  </div>
  
  <p>
    <b>H-Online:</b> It's a record for Microsoft: 9 critical and 8 important updates close a total of 64 security holes. In the worst case, a number of the vulnerabilities allow for remote code execution; in other words, arbitrary code can be injected and executed, such as from specially crafted documents and websites. Microsoft put 44 of them in the category Exploitability Index 1, meaning that the code that exploits the flaw will probably go into circulation soon.
  </p>
  
  <p>
    The software affected ranges from Windows to Internet Explorer, Office, Visual Studio, .NET, and GDI+. For an overview, see the <a href="http://www.microsoft.com/technet/security/bulletin/ms11-apr.mspx">Microsoft Security Bulletin Summary for April 2011</a>. At the top of Microsoft's <a href="http://blogs.technet.com/cfs-filesystemfile.ashx/__key/CommunityServer-Blogs-Components-WeblogFiles/00-00-00-45-71/0245.Bulletin-Deployment-Priority.png">to-do list</a> are updates for Internet Explorer (MS11-018) and the client/server file shares (SMB, MS11-019/MS11-020), followed by the new kill bits for vulnerable ActiveX components (MS11-027) and the .NET update in MS11-028.
  </p>
  
  <p>
    Monster update MS11-034 is truly remarkable; it patches 30 security holes in Windows kernel drivers in one fell swoop. Two recurring bugs in internal memory management can apparently allow users to escalate their system rights.
  </p>
  
  <p>
    In a <a href="http://blogs.technet.com/b/msrc/archive/2011/04/12/april-2011-security-bulletin-release.aspx">blog post</a>, Microsoft's security team underscores two new security functions that are reportedly available with the update. First, Microsoft now also offers extended security checks of Office files for Office 2003 and 2007 (<a href="http://www.microsoft.com/technet/security/advisory/2501584.mspx">Office File Validation</a>). Because the Office sandbox called &#8220;Protected View&#8221; is only available in Office 2010, users of older versions now at least receive a warning notice if a file seems suspicious. The blog post does not, however, say whether the alarm also works with the flash exploits in <a href="http://www.h-online.com/news/item/Adobe-warns-of-zero-day-vulnerability-in-Flash-and-Reader-1208184.html">Excel</a> and <a href="http://www.h-online.com/news/item/New-zero-day-for-Flash-Player-1226267.html">Word files</a>.
  </p>
  
  <p>
    The second new security function is a direct reaction to the Alureon/TDL rootkit, which managed to <a href="http://www.h-online.com/news/item/Rootkit-able-to-bypass-kernel-protection-and-driver-signing-in-64-bit-Windows-1137225.html">out-smart</a> 64-bit Windows and launch Windows in a maintenance mode that also accepts unsigned drivers. Redmond has now provided an <a href="http://www.microsoft.com/technet/security/advisory/2506014.mspx">improved loader</a> to remedy the situation. Microsoft says Alureon is the most common rootkit in Germany.</div>