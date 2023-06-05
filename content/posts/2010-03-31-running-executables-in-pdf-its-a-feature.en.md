---
title: "Running executables in PDF: it’s a feature"
date: 2010-03-31T19:38:00+00:00
layout: single
author_profile: true
url: 2010/03/31/running-executables-in-pdf-its-a-feature/
tags:
  - Adobe
  - Foxit
  - malware
  - PDF
  - Vulnerability
lang: en
categories: 
  - techblog
---
Didier Stevens, security professional and blogger, has found a “feature” in the PDF file format that makes it possible to package an executable in a PDF file which will run in Foxit PDF reader or run in Adobe Reader with a bit of social engineering.

“With Adobe Reader, the only thing preventing execution is a warning. Disabling JavaScript will not prevent this (I don’t use JavaScript in my PoC PDF), and patching Adobe Reader isn’t possible (I’m not exploiting a vulnerability, just being creative with the PDF language specs).”

“…preventing Adobe Reader from creating new processes blocks this trick,” he said.

“In this case, Foxit Reader is probably worse than Adobe Reader, because no warning gets displayed to prevent the launch action. My PoC PDF requires some changes for Foxit Reader, because ultimately, the executable doesn’t run. But that’s probably due to some variation in the PDF language supported by Foxit Reader.”

Stevens has made available a proof-of-concept sample and said he notified Adobe’s product security incident response team.

Until this is solved, it would be a good idea to READ any notification that pops up when you open a PDF file and DO NOT let yourself be social engineered into disregarding warnings about launching executables.

Stevens' blog piece [here](http://blog.didierstevens.com/2010/03/29/escape-from-pdf/).