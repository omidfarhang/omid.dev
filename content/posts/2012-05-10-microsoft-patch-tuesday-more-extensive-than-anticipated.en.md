---
title: Microsoft Patch Tuesday more extensive than anticipated
date: 2012-05-10T09:43:00+00:00
layout: single
author_profile: true
url: 2012/05/10/microsoft-patch-tuesday-more-extensive-than-anticipated/
tags:
  - Microsoft
  - security
  - Updates
  - Vulnerability
  - Windows
lang: en
category: techblog
---
[<img title="windows update" border="0" alt="windows update" align="right" src="http://lh6.ggpht.com/-t62QOakM5Cg/T6uGuwHTgCI/AAAAAAAAF8Q/LsB6loffnKA/windows%252520update_thumb%25255B5%25255D.jpg?imgmax=800" width="170" height="220" />](http://lh3.ggpht.com/-0mWP4hL3s38/T6uGtVCaFzI/AAAAAAAAF8I/azI-mt5ESXs/s1600-h/windows%252520update%25255B3%25255D.jpg)The H-Online: As previously announced, Microsoft has [released](http://technet.microsoft.com/en-us/security/bulletin/ms12-may) seven bulletins to close a total of 23 vulnerabilities on its May Patch Tuesday. The total number of bulletins belies the scope of the patches, however, as the combined update [MS12-034](http://technet.microsoft.com/en-us/security/bulletin/ms12-034) closes various holes in numerous products. 

The reason for this is a critical hole in the code for processing TrueType fonts that was exploited by the Duqu spyware last year. The hole was [closed](http://www.h-online.com/news/item/13-pre-Christmas-patches-from-Microsoft-1394865.html) in the Windows kernel on the December Patch Tuesday; however, Microsoft has since used a code scanner to [track down](http://blogs.technet.com/b/srd/archive/2012/05/08/ms12-034-duqu-ten-cve-s-and-removing-keyboard-layout-file-attack-surface.aspx) the vulnerable code in numerous other components; among them is the gdiplus.dll library, which is used by various browsers to render web fonts. 

Some of the vulnerable files contained further holes that Microsoft also patched within the same bulletin – meaning that this update fixes a number of other flaws in addition to the original vulnerability. It closes holes in all currently supported versions of Windows (from XP SP3 onwards, including Server), Office, the .NET framework and Silverlight. These &#8220;bonus&#8221; holes include three privilege escalation problems in the Windows kernel, including flaws in the code for processing keyboard layouts. 

Bulletin [MS12-029](http://technet.microsoft.com/en-us/security/bulletin/ms12-029) closes a critical hole in the code for processing RTL documents. It affects Office 2003, 2007 as well as Office Compatibility Packs SP2 and 3. The vulnerability has also been closed in Office for Mac 2008 and 2011. Bulletin [MS12-035](http://technet.microsoft.com/en-us/security/bulletin/MS12-035) addresses two critical holes in the .NET framework. 

The remaining four bulletins fix holes that have the second highest threat rating, being classified as &#8220;important&#8221; by Microsoft. These vulnerabilities affect [Office](http://go.microsoft.com/fwlink/?LinkId=238499), [Visio Viewer 2010](http://go.microsoft.com/fwlink/?LinkId=248385), the Windows [partition manager](http://go.microsoft.com/fwlink/?LinkId=247902) and the Windows [firewall and TCP stack](http://technet.microsoft.com/en-us/security/bulletin/ms12-032).