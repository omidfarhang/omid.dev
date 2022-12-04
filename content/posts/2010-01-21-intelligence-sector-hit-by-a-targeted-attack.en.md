---
title: Intelligence sector hit by a targeted attack
date: 2010-01-21T19:48:00+00:00
layout: single
author_profile: true
url: 2010/01/21/intelligence-sector-hit-by-a-targeted-attack/
tags:
  - Adobe
  - alert
  - Vulnerability
lang: en
category: techblog
---
We just blogged about a highly targeted attack against military contractors.

Now we saw one against the intelligence sector.

This attack was done with a PDF file. Again.

It was targetting the [CVE-2009-4324](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-4324) vulnerability. Again.

When opened, the PDF file (md5: c3079303562d4672d6c3810f91235d9b) looked like this:

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S1ins0wpC0I/AAAAAAAAArc/1bMPhGLZdvY/s640/ncsi1.png)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S1ins0wpC0I/AAAAAAAAArc/1bMPhGLZdvY/s1600-h/ncsi1.png)

What really happens in the background? Just like last time, the exploit code drops a backdoor in a file called **Updater.exe** (md5: 02420bb8fd8258f8afd4e01029b7a2b0).

Now, what is the document talking about? President's day? DNI Information Sharing Environment? We don't know, but a quick web search tells us that apparently there is going to be an Intelligence fair & expo in Germany next month.

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S1ioarxiwZI/AAAAAAAAArk/vzo_k9wRpyg/s640/ncsi2.png)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S1ioarxiwZI/AAAAAAAAArk/vzo_k9wRpyg/s1600-h/ncsi2.png)

Hmm. The Agenda looks awfully familiar.