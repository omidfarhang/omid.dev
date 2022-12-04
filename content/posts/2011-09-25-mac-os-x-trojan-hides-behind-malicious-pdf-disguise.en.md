---
title: Mac OS X Trojan hides behind malicious PDF disguise
date: 2011-09-25T20:59:00+00:00
layout: single
author_profile: true
url: 2011/09/25/mac-os-x-trojan-hides-behind-malicious-pdf-disguise/
tags:
  - Apple
  - Mac OS X
  - malware
  - PDF
lang: en
category: techblog
---
**SophosLabs:** A fascinating new example of Mac malware has been discovered, that appears to be adopting an old Windows-style disguise to fool users into running it.

Despite the numerous times that cybercriminals have created boobytrapped PDF files that exploit vulnerabilities to infect unsuspecting users, many people still think that PDF files are somehow magically safer to open than conventional programs.

The OSX/Revir-B Trojan plays on this by posing as a PDF file.

When the malicious Macintosh application file is run it tries to drop a PDF embedded inside it onto the user's hard drive. The Chinese language PDF file displayed is about a controversial topic, “Do the Diaoyu Islands belong to Japan?”

The Diaoyu Islands (known as the Senkaku islands in Japan) are the subject of a [long-running dispute](http://www.bbc.co.uk/news/world-asia-pacific-11341139) between the two countries, with both claiming sovereignty.

Because the document is opened, users may believe that they have opened a harmless PDF rather than run a program.

[![](http://1.bp.blogspot.com/-WXwdCYfuu3M/Tn-Ow1rwt9I/AAAAAAAAECc/zmMDSxCQYYg/s400/mac-malware-pdf.jpg)](http://1.bp.blogspot.com/-WXwdCYfuu3M/Tn-Ow1rwt9I/AAAAAAAAECc/zmMDSxCQYYg/s1600/mac-malware-pdf.jpg)

When we tested the malware inside our labs, we couldn't manage to get it to execute as the author probably intended – however, strings embedded deep inside its code make it clear that it was written with malicious intent.

[![](http://4.bp.blogspot.com/-0962DWjitOw/Tn-O_E7mNsI/AAAAAAAAECg/kCNY2kHrHdk/s400/malware-code.jpg)](http://4.bp.blogspot.com/-0962DWjitOw/Tn-O_E7mNsI/AAAAAAAAECg/kCNY2kHrHdk/s1600/malware-code.jpg)

The malware attempts to install a backdoor Trojan horse (detected by Sophos as OSX/Imuler-A) which would give malicious hackers remote access to your Apple Mac computer.

As our friends at F-Secure [point out](http://www.f-secure.com/weblog/archives/00002241.html), we have seen plenty of Windows malware in the past which has pretended to be a PDF rather than an EXE – sometimes using techniques such as the double-extension trick (for instance, filename.PDF.EXE).

It's quite possible that this is evidence that Mac malware authors are attempting something similar, moving on from the fake anti-virus alerts that blighted many Mac users earlier this year.