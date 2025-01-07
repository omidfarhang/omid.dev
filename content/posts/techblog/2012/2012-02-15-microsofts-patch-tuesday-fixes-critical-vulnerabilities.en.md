---
title: "Microsoft's Patch Tuesday fixes critical vulnerabilities"
date: 2012-02-15T17:17:00+00:00
layout: single
author_profile: true
url: 2012/02/15/microsofts-patch-tuesday-fixes-critical-vulnerabilities/
tags:
  - Microsoft
  - Patch Tuesday
  - Updates
lang: en
categories: 
  - TechBlog
---
[<img title="Microsoft" border="0" alt="Microsoft" src="http://lh6.ggpht.com/-jwiqn7tsUbo/TzvhoF3mkcI/AAAAAAAAEyA/7sgA3lghI5k/Microsoft_thumb%25255B2%25255D.jpg?imgmax=800" width="504" height="222" />](http://lh5.ggpht.com/-tyZvt7vnyI4/TzvhhYJAlYI/AAAAAAAAEx4/1eEQDD7t5nY/s1600-h/Microsoft%25255B5%25255D.jpg) 

**The H-Online:** As expected, Microsoft has [released](http://blogs.technet.com/b/msrc/archive/2012/02/14/msrc-looks-back-at-ten-years-and-the-february-2012-bulletins.aspx) nine bulletins to close a total of 21 holes in its products. Four of the bulletins close critical vulnerabilities in Windows, Internet Explorer, .NET and Silverlight, including an issue in the Windows kernel-mode drivers that became publicly known in December of last year. 

The company advises those responsible for prioritizing update deployment to focus on the critical patches for Internet Explorer and the C Runtime Library in Windows, as these could be exploited by an attacker to remotely execute arbitrary code on a victim's system. For an attack to be successful, a user must first visit a malicious web page or open a specially crafted file. The other critical bulletins fix issues in .NET and Silverlight, as well as the Windows kernel. Microsoft notes that it has yet to see any active attacks exploiting these issues in the wild. 

Rated as “important”, the remaining five bulletins correct a number of remote code execution and privilege escalation issues. These include a total of six vulnerabilities in SharePoint and the Ancillary Function Driver in Windows that could be used to allow elevation of privileges. Five holes in the Windows Color Control Panel, an issue in the Indeo Codec included with Windows, and five problems in Visio Viewer – part of Microsoft Office – that could be used to remotely execute code have also been closed. 

An overview of all of these updates, including descriptions about each of the vulnerabilities, can be found [Microsoft Security Bulletin Summary for February 2012](http://technet.microsoft.com/en-us/security/bulletin/ms12-feb). 

[According](http://krebsonsecurity.com/2012/02/microsoft-av-flags-google-com-as-malware/) to [reports](http://isc.sans.org/diary/Problem%2Bwith%2BMicrosoft%2BAntivirus%2Bregarding%2Bmalware%2Bfrom%2Bgoogle%2Bwebsite/12589), the updates to the Microsoft Windows Malicious Software Removal Tool (MSRT) and the company's Forefront security products, which were released at the same time as Microsoft's Patch Tuesday security updates, result in a false positive malware warning on google.com. Following the updates, when visiting google.com in Internet Explorer, users receive a warning that a potential threat has been detected, specifically [Exploit:JS/Blacole.BW](http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?name=Exploit%3AJS%2FBlacole.BW&threatid=2147654043); those using Firefox only [reportedly](http://www.theregister.co.uk/2012/02/15/ms_security_google_false_alarm/) see a warning after a search is initiated, and Chrome and Opera are said to be unaffected.