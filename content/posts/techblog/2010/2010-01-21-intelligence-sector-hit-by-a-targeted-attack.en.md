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
  - Security

categories:
  - TechBlog
---
We just blogged about a highly targeted attack against military contractors.

Now we saw one against the intelligence sector.

This attack was done with a PDF file. Again.

It was targetting the [CVE-2009-4324](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2009-4324) vulnerability. Again.

When opened, the PDF file (md5: c3079303562d4672d6c3810f91235d9b) looked like this:

[![](/images/2010/01/ncsi1.png)](/images/2010/01/ncsi1-8df623c5.png)

What really happens in the background? Just like last time, the exploit code drops a backdoor in a file called **Updater.exe** (md5: 02420bb8fd8258f8afd4e01029b7a2b0).

Now, what is the document talking about? President's day? DNI Information Sharing Environment? We don't know, but a quick web search tells us that apparently there is going to be an Intelligence fair & expo in Germany next month.

[![](/images/2010/01/ncsi2.png)](/images/2010/01/ncsi2-e7b29ede.png)

Hmm. The Agenda looks awfully familiar.