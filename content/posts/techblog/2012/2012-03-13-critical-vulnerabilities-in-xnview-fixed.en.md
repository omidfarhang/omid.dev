---
title: Critical vulnerabilities in XnView fixed
date: 2012-03-13T14:03:00+00:00
layout: single
author_profile: true
url: 2012/03/13/critical-vulnerabilities-in-xnview-fixed/
tags:
  - Updates
lang: en
categories: 
  - TechBlog
---
**[<img title="XnView_logo_200_b" border="0" alt="XnView_logo_200_b" align="right" src="http://lh5.ggpht.com/-Y_NJ_SEAJug/T19Mqmnrc8I/AAAAAAAAFJU/7mozpWFBozE/XnView_logo_200_b_thumb%25255B1%25255D.png?imgmax=800" width="200" height="189" />](http://lh5.ggpht.com/-wpI1llNwDF0/T19Mk2lStvI/AAAAAAAAFJM/bzIBmAL6aGY/s1600-h/XnView_logo_200_b%25255B3%25255D.png)The H-Online:** Version 1.98.8 of the popular [XnView](http://www.xnview.com/en/index.html) image viewer and converter has been released to close security holes in the software. According to an [advisory](http://secunia.com/advisories/47388/) from security service provider Secunia, the update addresses three “highly critical” vulnerabilities that could be exploited by an attacker to execute arbitrary code and compromise a victim's system. 

These include a stack-based buffer overflow caused by a boundary error when parsing a directory name while browsing folders such as those from an extracted archive file, and, a heap-based buffer overflow when processing image content using the FlashPix plugin (Xfpx.dll). A second heap-based buffer overflow caused when processing image data in Personal Computer eXchange (PCX) files has also been fixed. For an attack to be successful, a user must first open a specially crafted file. 

The problems are confirmed to affect XnView 1.98.5, however, other versions may also be vulnerable. Upgrading to 1.98.8 – available to [download](http://www.xnview.com/en/downloadwin32.html) for 32-bit versions of Windows – corrects the problems.