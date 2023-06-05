---
title: Mitigation for Windows Applications DLL-Search-Path Vulnerabilities
date: 2010-09-04T20:26:00+00:00
layout: single
author_profile: true
url: 2010/09/04/mitigation-for-windows-applications-dll-search-path-vulnerabilities/
tags:
  - advice
  - Microsoft
  - solution
  - Vulnerability
lang: en
category: 
  - techblog
---
A whole bunch of Windows applications is vulnerable to a so-called binary-planting attack which allows for remote code execution. Microsoft released a [security advisory](http://www.microsoft.com/technet/security/advisory/2269637.mspx) about this issue which isn’t easy to fix properly. This issue arises due to the (defined and well documented) behavior of Windows when loading libraries by an application. A .dll to load gets searched in a certain standard path list. This list also includes the current working directory, which is the place a document gets opened from for example. When a file with the name of a DLL which the corresponding application needs to load is placed into the working directory, it will get loaded – this can be a malicious DLL though.

Microsoft [offers a patch](http://support.microsoft.com/kb/2264107) as workaround which adds a registry key influencing this DLL search path. Unfortunately, the changed behavior of DLL loading breaks several Windows programs. Now the company released a [Fix-it tool](http://go.microsoft.com/?linkid=9742148) which can be executed after the patch has been applied. It lessens the [restrictions introduced](http://blogs.technet.com/b/srd/archive/2010/08/31/an-update-on-the-dll-preloading-remote-attack-vector.aspx) by the patch so that most applications do work again. Windows then still blocks loading DLLs from network shares or WebDAV, but if a malicious DLL is located within a local working directory, an attack may still succeed. Anyhow, this may be the only workaround option which is usable.

Administrators and users are well advised to apply the patch (and in most cases, lessen the restrictions with the Fix-it-tool) so the attack surface gets minimized.