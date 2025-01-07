---
title: Fake Stuxnet cleaner literally cleans up your computer
date: 2010-10-15T15:12:00+00:00
layout: single
author_profile: true
url: 2010/10/15/fake-stuxnet-cleaner-literally-cleans-up-your-computer/
tags:
  - advice
  - alert
  - malware
  - scam
  - Stuxnet
lang: en
categories: 
  - TechBlog
---
W32.Stuxnet has been a subject of much discussion amongst security researchers and media, and we posted a series of blogs on the subject. As you may already be aware, Stuxnet is hot topic as the threat targets industrial control systems in order to take control of industrial facilities and systems, such as manufacturing assembly lines and even power plants.

Because Stuxnet is such major news, the miscreants who like to spread malware are not wasting much time taking advantage of this for their malicious activities. In our investigations we have discovered that various forums are discussing a free Stuxnet removal tool but unfortunately the tool is actually a piece of malware. We successfully obtained a sample of this tool and our analysis supported our sense of danger: Bottom line is, **do NOT run the tool**.

When you view the properties of the file you can clearly see that the tool claims to be provided by Microsoft with fields such as the following:

**Description:** Microsoft Stuxnet Cleaner

**Copyright:** Microsoft Corporation

That said, we can reassure you that the tool was not developed by Microsoft.

If you happen to run the tool, it first changes some registry keys to have files with extension of .exe, .mp3, .jpg, .bmp, and .gif are treated as invalid, preventing those types of files from opening. Second, it terminates various processes.  The worst of all, the tool deletes all files on the C drive. The tool will certainly remove Stuxnet if it was on the C drive but it will also take with it any other content including your valuable data. If one of your company’s a critical systems relies on software targeted by Stuxnet and is infected, why take a chance with a removal tool from an unknown or unreliable source?