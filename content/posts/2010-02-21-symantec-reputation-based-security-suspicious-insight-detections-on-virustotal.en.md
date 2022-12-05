---
title: "Symantec Reputation-based Security: Suspicious.Insight detections on VirusTotal"
date: 2010-02-21T19:36:00+00:00
layout: single
author_profile: true
url: 2010/02/21/symantec-reputation-based-security-suspicious-insight-detections-on-virustotal/
tags:
  - news
  - report
  - review
  - VirusTotal
lang: en
category: techblog
---
Symantec recently upgraded their scanner on [VirusTotal](http://www.virustotal.com/) to include their new reputation-based security engine. That has caused a spike in their detection rates, in particular [Suspicious.Insight](http://www.symantec.com/security_response/writeup.jsp?docid=2010-021223-0550-99) detections, and so I thought I’d take a few minutes to explain some of the background and what is going on.

So what exactly is a [Suspicious.Insight](http://www.symantec.com/security_response/writeup.jsp?docid=2010-021223-0550-99) detection? These detections are derived from Symantec’s new reputation-based security technology. They highlight files that have not yet developed a strong reputation (either good or bad) amongst Symantec’s community of users. their goal is to keep their users’ machines safe, and part of achieving that goal means helping their  users make informed choices about the files they allow on to their systems. Suspicious.Insight detections help shine a spotlight on files that have not yet developed a full reputation.

Why are they doing this, and what’s wrong with the conventional approach to security using traditional antivirus signatures? Unfortunately, traditional antivirus techniques are no longer as strong a defense as they used to be. Over the last few years Symantec has observed a seismic shift in the threat landscape. Consider this: ten years ago, Symantec published little more than a few handfuls of new virus definitions each week. Today that number has grown dramatically and they currently publish, on average, well in excess of fifteen thousand new virus definitions each day. So, why is this? Well, virus writers have realized that that once a virus definition for their malware exists, their game is over. So instead of hoping that a new threat will make its way across the globe to a large number of people and not be blocked by an security product’s latest signature, they are today focusing their efforts on shape-shifting as frequently as possible to avoid the traditional detection methods.

They use techniques such as server side polymorphism, obfuscation, and encryption to cloak their threats in a disguise, and then change that disguise as frequently as possible. So today, the vast majority of malware is generated in real-time on a per-victim basis, which means that each such malicious program will be rated as being entirely new and low-prevalence by a reputation-based system. In contrast, most legitimate software has vastly different characteristics—it often comes from known publishers, has high adoption rates, shares much in common with earlier versions of the software, and so on. The Suspicious.Insight detection, therefore, is meant to inform the user that a given application is unproven and not yet well known to Symantec’s tens of millions of users.

Does this mean that all [Suspicious.Insight](http://www.symantec.com/security_response/writeup.jsp?docid=2010-021223-0550-99) detections will be flagged by Norton and Symantec products? No, and for several reasons:

* This detection looks at many different aspects of a file, including how it arrived on the system, publisher information, when it arrived, etc. Using these attributes, most users do not see Suspicious.Insight detections on clean files. (Note that on an online scanner such as VirusTotal, many of these attributes are absent, hence a Suspicious.Insight detection will be more likely). In effect this means that most users will never encounter a Suspicious.Insight false positive.
* Today, Norton products warn the user about Suspicious.Insight detections, they do not block these files. The file is labeled “unproven,” and the user is allowed to make the final decision. Note that future versions of Symantec's corporate Endpoint Protection products will include reputation and will allow administrators to configure blocking policies based on their specific tolerance for risk.
* Due to the nature of their reputation system, even if a clean file is initially flagged as “unproven” (which is rare), it will typically develop a good reputation very quickly—usually within a day or two.

Ultimately the goal of [Suspicious.Insight](http://www.symantec.com/security_response/writeup.jsp?docid=2010-021223-0550-99) is to empower their users to make better informed choices about the software they allow onto their machines.

For more information, check out the following resources:

Blog: [Norton Internet Security 2010 – Download Insight](http://community.norton.com/t5/Norton-Protection-Blog/New-Feature-for-Norton-Internet-Security-2010-Download-Insight/ba-p/113827)  
Blog: [The New Model of Consumer Protection: Reputation-based Security](http://community.norton.com/t5/Norton-Protection-Blog/The-New-Model-of-Consumer-Protection-Quorum/ba-p/126699)  
Product Tutorial: [How To Use Norton Download Insight](http://www.symantec.com/norton/products/tutorials/tutorials.jsp?pvid=nis2010&tutid=download_insight)