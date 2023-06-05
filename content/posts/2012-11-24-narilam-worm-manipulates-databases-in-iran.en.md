---
title: Narilam Worm manipulates databases in Iran
date: 2012-11-24T12:37:00+00:00
layout: single
author_profile: true
url: 2012/11/24/narilam-worm-manipulates-databases-in-iran/
tags:
  - Iran
  - malware
  - Stuxnet
lang: en
categories: 
  - techblog
---
<a href="http://lh3.ggpht.com/-PWZn6EPgNBA/ULC4ZTERsPI/AAAAAAAAHmw/7b0Vu2LvK1s/s1600-h/narilam-iran%25255B5%25255D.png" target="_blank"><img title="narilam-iran" border="0" alt="narilam-iran" align="right" src="http://lh4.ggpht.com/-Yh9UYyqtVKA/ULC4bob5OCI/AAAAAAAAHm4/240JKydkDLU/narilam-iran_thumb%25255B3%25255D.png?imgmax=800" width="244" height="153" /></a>h-Online: Security firm Symantec has discovered a specialised worm called W32.Narilam that can compromise SQL databases. Symantec [reports](http://www.symantec.com/connect/blogs/w32narilam-business-database-sabotage) that the malware “speaks” Persian and Arabic and appears to target mainly companies in Iran. Narilam is, therefore, reminiscent of [Stuxnet](http://www.h-online.com/news/item/Stuxnet-worm-can-control-industrial-systems-1080751.html) and its [variants](http://www.h-online.com/news/item/Kaspersky-says-Stuxnet-and-Flame-are-related-after-all-1615750.html). 

Narilam spreads via [USB flash drives](http://www.h-online.com/news/item/Stuxnet-worm-was-planted-by-inside-man-1525260.html) and network shares. Once inside the system, the worm searches for SQL databases that are accessible via the [Object Linking and Embedding Database](http://en.wikipedia.org/wiki/OLE_DB) (OLEDB) API. Rather than steal found target data for intelligence purposes, the worm proceeds to modify or delete the data and can, says Symantec, cause considerable damage. Stuxnet similarly served no intelligence purpose and was designed to sabotage its target – an uranium enrichment facility in Natanz, Iran. 

<a href="http://lh5.ggpht.com/-cAo6T0aOznk/ULC4dhEykrI/AAAAAAAAHnA/fGZySGSCpFw/s1600-h/nirlam-infection%25255B4%25255D.png" target="_blank"><img title="nirlam-infection" border="0" alt="nirlam-infection" align="right" src="http://lh5.ggpht.com/-72HC58ZIL5U/ULC4fl2W3pI/AAAAAAAAHnI/CC2rNT2kr-w/nirlam-infection_thumb%25255B2%25255D.png?imgmax=800" width="244" height="216" /></a>The purpose of Narilam, or that of the worm's authors, remains unknown. However, Symantec says that its analysis suggest that the saboteurs appear to have targeted corporate data records. Apparently, the worm's translated instructions include object names such as “sale”, “financial bond” and “current account”. Due to the malware's level of specialization, Symantec rates the infection risk as low. The security firm notes that current analysis results indicate “that the vast majority of users impacted by this threat are corporate users.” 

Some of the worm was written in the Delphi programming language. Symantec says that the worm takes its name from its own attributes, because it searches for SQL databases with three specific names: alim, shahd and maliran. 

<a title="http://h-online.com/-1756339" href="http://h-online.com/-1756339" target="_blank">Source</a>