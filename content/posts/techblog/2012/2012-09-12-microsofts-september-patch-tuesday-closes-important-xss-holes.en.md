---
title: "Microsoft's September Patch Tuesday closes important XSS holes"
date: 2012-09-12T19:27:00+00:00
layout: single
author_profile: true
url: 2012/09/12/microsofts-september-patch-tuesday-closes-important-xss-holes/
tags:
  - Microsoft
  - Updates
  - Windows
lang: en
categories: 
  - techblog
---
<a href="http://lh5.ggpht.com/-ZMGeRyOvRxA/UFDbAZR71yI/AAAAAAAAHbo/ao_SvXZuY1A/s1600-h/windows%252520update%25255B3%25255D.jpg" target="_blank"><img title="windows update" border="0" alt="windows update" align="right" src="http://lh3.ggpht.com/-q6lLiDU5wLY/UFDbCTI9vsI/AAAAAAAAHbw/WcIc04ez6X8/windows%252520update_thumb%25255B5%25255D.jpg?imgmax=800" width="156" height="209" /></a>h-online: On its September Patch Tuesday, Microsoft [released](http://blogs.technet.com/b/msrc/archive/2012/09/11/update-tuesday-overview-for-september-2012.aspx) [two security updates](http://technet.microsoft.com/en-us/security/bulletin/ms12-sep) that are rated as [important](http://technet.microsoft.com/en-US/security/gg309177) and which close holes in [Visual Studio Team Foundation Server 2010](http://technet.microsoft.com/en-US/security/bulletin/ms12-061) (TFS) and [Systems Management Server 2003 and 2007](http://technet.microsoft.com/en-US/security/bulletin/ms12-062). Both updates fix cross-site scripting (XSS) vulnerabilities in the web interfaces that allow attackers to execute arbitrary code in the victim's browser. 

As the holes enable an attacker to access the web interfaces at the user's privilege level, Microsoft has classified them as privilege escalation vulnerabilities. The company notes that, to its knowledge, neither of the holes is being actively exploited for attacks. 

Microsoft has also published [a number of other patches](http://support.microsoft.com/kb/894199) for Windows, Windows Server and the Malicious Software Removal Tool; it considers these to be non-security-related. The company notes that, unlike its other September updates, users may have to restart their computers after installing these. The updates include a [new set of ActiveX kill bits](http://technet.microsoft.com/en-us/security/advisory/2736233) to prevent [vulnerable Cisco plugins](http://www.h-online.com/news/item/Cisco-closes-holes-in-its-VPN-client-and-security-appliances-1623170.html) running. 

While this Patch Day has turned out to be moderate, the next one may have far-reaching consequences: in October, Microsoft will use Windows Update to deploy a patch that will [invalidate](http://www.h-online.com/news/item/Mini-Patch-Tuesday-coming-from-Microsoft-1702669.html) any certificates with an RSA private key length of less than 1,024 bits. Those who manage infrastructures that use such certificates should, therefore, replace them with certificates whose private key has the required minimum length before then. [NIST currently recommends](http://csrc.nist.gov/publications/nistpubs/800-131A/sp800-131A.pdf) an RSA key length of at least 2,048 bits. 

[http://h-online.com/-1705021](http://h-online.com/-1705021 "http://h-online.com/-1705021")