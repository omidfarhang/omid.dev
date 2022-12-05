---
title: "Microsoft Patch Tuesday – March 2010"
date: 2010-03-10T10:19:00+00:00
layout: single
author_profile: true
url: 2010/03/10/microsoft-patch-tuesday-march-2010/
tags:
  - Microsoft
  - Patch Tuesday
  - Updates
lang: en
category: techblog
---
Hello and welcome to this month’s blog on the Microsoft patch releases. This is a fairly quiet month—the vendor is releasing two bulletins covering a total of eight vulnerabilities.

All of the issues are rated “Important” this month: seven affecting Office/Excel and one affecting Movie Maker and Producer. All of the issues are file-based remote code-execution vulnerabilities in the context of the currently logged-in user.

Microsoft also released a security advisory (<a href="http://www.microsoft.com/technet/security/advisory/981374.mspx" target="_blank">981374</a>) today regarding a publicly disclosed vulnerability affecting Internet Explorer 6 and 7. Limited, targeted attacks exploiting this issue have been detected in the wild.

As always, customers are advised to follow these security best practices:

  * Install vendor patches as soon as they are available.
  * Run all software with the least privileges required while still maintaining functionality.
  * Avoid handling files from unknown or questionable sources.
  * Never visit sites of unknown or questionable integrity.
  * Block external access at the network perimeter to all key systems unless specific access is required.

Microsoft’s summary of the March releases can be found here:  
 <a href="http://www.microsoft.com/technet/security/bulletin/ms10-mar.mspx" target="_blank">http://www.microsoft.com/technet/security/bulletin/ms10-mar.mspx</a>

The following is a breakdown of the issues being addressed this month:  
**  
**  
**1. <a href="http://www.microsoft.com/technet/security/Bulletin/MS10-016.mspx" target="_blank">MS10-016</a> Vulnerabilities in Microsoft Office Excel Could Allow Remote Code Execution (980150)**  
**  
**  
**CVE-2010-0257** Microsoft Excel Document Parsing (**CVE-2010-0257**) Remote Code Execution Vulnerability (MS Rating: Important)

A remote code-execution vulnerability affects Excel when handling specially crafted Excel files. An attacker can exploit this issue by tricking an unsuspecting victim into opening a malicious file. A successful exploit will result in the execution of arbitrary attacker-supplied code in the context of the currently logged-in user.

_Affects: Microsoft Office Excel 2002 SP3_

**CVE-2010-0258** Microsoft Excel Object Type Confusion Remote Code Execution Vulnerability (MS Rating: Important)

A remote code-execution vulnerability affects Excel due to a type confusion when handling specially crafted Excel files. An attacker can exploit this issue by tricking an unsuspecting victim into opening a malicious file. A successful exploit will result in the execution of arbitrary attacker-supplied code in the context of the currently logged-in user.

_Affects: Microsoft Office Excel 2002 SP3, Microsoft Office Excel 2003 SP3, Microsoft Office Excel 2007 SP1 and SP2, Microsoft Office 2004 for Mac, Microsoft Office 2008 for Mac, Open XML File Format Converter for Mac, Microsoft Office Excel Viewer SP1 and SP2, and Microsoft Office Compatibility Pack for Word, Excel, and PowerPoint 2007 File Formats SP1 and SP2_

**CVE-2010-0260** Microsoft Excel MDXTUPLE Record Remote Heap Buffer Overflow Vulnerability (MS Rating: Important)

A remote code-execution vulnerability affects Excel due to an heap overflow when handling specially crafted Excel files. An attacker can exploit this issue by tricking an unsuspecting victim into opening a malicious file. A successful exploit will result in the execution of arbitrary attacker-supplied code in the context of the currently logged-in user.

_Affects: Microsoft Office Excel 2007 SP1 and SP2, Microsoft Office Excel Viewer SP1 and SP2, Microsoft Office Compatibility Pack for Word, Excel, and PowerPoint 2007 File Formats SP1 and SP2_

**CVE-2010-0261** Microsoft Excel MDXSET Record Remote Heap Buffer Overflow Vulnerability (MS Rating: Important)

A remote code-execution vulnerability affects Excel due to a heap overflow when handling specially crafted Excel files. An attacker can exploit this issue by tricking an unsuspecting victim into opening a malicious file. A successful exploit will result in the execution of arbitrary attacker-supplied code in the context of the currently logged-in user.

_Affects: Microsoft Office Excel 2007 SP1 and SP2, and Microsoft Office Compatibility Pack for Word, Excel, and PowerPoint 2007 File Formats SP1 and SP2_

**CVE-2010-0262** Microsoft Excel FNGROUPNAME Record Remote Code Execution Vulnerability (MS Rating: Important)

A remote code-execution vulnerability affects Excel due to the handling of uninitialized memory when opening a specially crafted Excel file. An attacker can exploit this issue by tricking an unsuspecting victim into opening a malicious file. A successful exploit will result in the execution of arbitrary attacker-supplied code in the context of the currently logged-in user.

_Affects: Microsoft Office Excel 2007 SP1 and SP2, and Microsoft Office 2004 for Mac_

**CVE-2010-0263** Microsoft Excel XLSX File Parsing Remote Code Execution Vulnerability (MS Rating: Important)

A remote code-execution vulnerability affects Excel when parsing a specially crafted Excel file. An attacker can exploit this issue by tricking an unsuspecting victim into opening a malicious file. A successful exploit will result in the execution of arbitrary attacker-supplied code in the context of the currently logged-in user.

_Affects: Microsoft Office Excel 2007 SP1 and SP2, Microsoft Office 2008 for Mac, Open XML File Format Converter for Mac, Microsoft Office Excel Viewer SP1 and SP2, Microsoft Office Compatibility Pack for Word, Excel, and PowerPoint 2007 File Formats SP1 and SP2, Microsoft Office SharePoint Server 2007 SP1 and SP2 (32-bit editions) and Microsoft Office SharePoint Server 2007 SP1 and SP2 (64-bit editions)_

**CVE-2010-0264** Microsoft Excel DbOrParamQry Record Remote Code Execution Vulnerability (MS Rating: Important)

A remote-code execution vulnerability affects Excel when parsing records in a specially crafted Excel file. An attacker can exploit this issue by tricking an unsuspecting victim into opening a malicious file. A successful exploit will result in the execution of arbitrary attacker-supplied code in the context of the currently logged-in user.

_Affects: Microsoft Office Excel 2002 SP3, Microsoft Office 2004 for Mac, Microsoft Office 2008 for Mac, and Open XML File Format Converter for Mac_

**2. <a href="http://www.microsoft.com/technet/security/Bulletin/MS10-017.mspx" target="_blank">MS10-017</a> Vulnerability in Microsoft Movie Maker Could Allow Remote Code Execution (975561)**  
**  
**  
**CVE-2010-0265**  Microsoft Windows Movie Maker and Producer &#8216;.mswmm' Buffer Overflow Vulnerability (MS Rating: Important)

A remote code-execution vulnerability affects Movie Maker and Microsoft Producer when processing specially crafted Movie Maker project files (‘.mswmm’). An attacker can exploit this issue by tricking an unsuspecting victim into opening a malicious Movie Maker project file with the affected application. A successful exploit will result in the execution of arbitrary attacker-supplied code in the context of the currently logged-in user.

_Affects: Microsoft Movie Maker 2.1, 2.6 and 6.0, and Microsoft Producer 2003_