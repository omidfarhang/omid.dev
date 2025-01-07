---
title: EXEs in word docs
date: 2010-03-30T18:15:00+00:00
layout: single
author_profile: true
url: 2010/03/30/exes-in-word-docs/
tags:
  - malware
  - review
  - spam
lang: en
categories: 
  - TechBlog
---
Today, our friends at Trend Micro blogged about a new attack vector using Microsoft Word documents. We saw this as well last week, and have written a detection for the dropped trojan.

It’s not just a “lawsuit” that’s being spammed, we also picked up another form of this attack in our honeypots over the weekend:

![](/images/2010/03/wordvector182312388.png)

When you open the Word document, you see a “PDF”, but it’s actually not. It’s a JPG, which links to an executable.

![](/images/2010/03/document12381231231238.png)

In Word 2007, it’s kind of like the Amish virus: The user has to really want to get infected.

![](/images/2010/03/openpackage12388.png)

Latest VirusTotal detection [here](http://www.virustotal.com/analisis/3a3e521cdf84c32035f64821be844599253d5f3567199e2acced7178267a3252-1269903650).

|        File COMPLA_1.EXE received on 2010.03.29 23:00:50 (UTC)      |                          |                         |                                                   |
|---------------------------------------------------------------------|--------------------------|-------------------------|---------------------------------------------------|
|        Antivirus                                                    |        Version           |        Last Update      |        Result                                     |
|        AntiVir                                                      |        7.10.5.248        |        2010.03.29       |        TR/Dropper.Gen                             |
|        Avast                                                        |        4.8.1351.0        |        2010.03.29       |        Win32:Malware-gen                          |
|        Avast5                                                       |        5.0.332.0         |        2010.03.29       |        Win32:Malware-gen                          |
|        BitDefender                                                  |        7.2               |        2010.03.29       |        Trojan.Downloader.JMZC                     |
|        F-Secure                                                     |        9.0.15370.0       |        2010.03.30       |        Trojan-Downloader:W32/Lapurd.E             |
|        GData                                                        |        19                |        2010.03.29       |        Trojan.Downloader.JMZC                     |
|        McAfee+Artemis                                               |        5935              |        2010.03.29       |        Artemis!60DF604563A1                       |
|        McAfee-GW-Edition                                            |        6.8.5             |        2010.03.29       |        Trojan.Dropper.Gen                         |
|        Microsoft                                                    |        1.5605            |        2010.03.30       |        Trojan:Win32/Meredrop                      |
|        Prevx                                                        |        3.0               |        2010.03.30       |        High Risk Fraudulent Security Program      |
|        Sophos                                                       |        4.52.0            |        2010.03.30       |        Sus/UnkPack-C                              |
|        Sunbelt                                                      |        6114              |        2010.03.30       |        Trojan-Downloader                          |
|        Symantec                                                     |        20091.2.0.41      |        2010.03.30       |        Backdoor.Trojan                            |