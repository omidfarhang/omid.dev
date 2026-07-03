---
title: Journey to the Center of the PDF Stream
date: 2010-04-03T19:08:00+00:00
layout: single
author_profile: true
url: 2010/04/03/journey-to-the-center-of-the-pdf-stream/
tags:
  - Adobe
  - advice
  - alert
  - Malware
  - PDF
  - review
  - Security

categories:
  - TechBlog
---
Malware authors use numerous unconventional techniques in their attempts to create malicious code that is not detected by antivirus software. As malicious code analysts, though, it is our job to analyze their creations, and as such we have to be constantly vigilant for the latest tricks that the malware authors employ.

While looking at some PDFs yesterday, something suspicious caught my eye. The PDF file format supports compression and encoding of embedded data, and also allows multiple cascading filters to be specified so that multi-level compression and encoding of that data is possible. The PDF stream filters usually look something like this:

[![](/images/2010/04/Screen-shot-2010-03-27-at-5.43.37-PM.png)](/images/2010/04/Screen-shot-2010-03-27-at-5.43.37-PM-9875d7da.png)

However, in the particular file being analyzed I spotted the use of no fewer than nine JavaScript compression and encoding filters applied to a single stream, which is an unusually large number:

[![](/images/2010/04/Screen-shot-2010-03-27-at-5.43.51-PM.png)](/images/2010/04/Screen-shot-2010-03-27-at-5.43.51-PM-782cc515.png)

Apparently, malware authors figured they could try to use this multi-level compression and encoding to attempt to evade detection. Antivirus software that does not support the complete set of PDF compression and encoding types will not be able to decode the data and scan for malicious code. In fact, they may have been somewhat successful in doing so—VirusTotal results indicate that many vendors did not detect the threat.

Since Symantec products have support for all compression and encoding schemes specified by Adobe, we were able to decompress the data and scan the plaintext for malicious code. Interestingly, the use of such a high number of filters is in itself anomalous, since a non-malicious PDF file wouldn’t need to use that many.

After multiple decompression and decoding operations, attempts to exploit two known vulnerabilities become visible:  
[Adobe Acrobat and Reader Multiple Arbitrary Code Execution and Security Vulnerabilities](http://www.securityfocus.com/bid/27641) (BID 27641)  
[Adobe Acrobat and Reader Collab ‘getIcon()' JavaScript Method Remote Code Execution Vulnerability](http://www.securityfocus.com/bid/34169) (BID 34169)

The JavaScript code is as follows:

[![](/images/2010/04/Screen-shot-2010-03-27-at-5.44.03-PM.png)](/images/2010/04/Screen-shot-2010-03-27-at-5.44.03-PM-4587a091.png)
