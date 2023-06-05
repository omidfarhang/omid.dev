---
title: "FAQ: Flame, the &quot;super spy&quot;"
date: 2012-05-31T12:51:00+00:00
layout: single
author_profile: true
url: 2012/05/31/faq-flame-the-super-spy/
tags:
  - Flame
  - malware
  - review
  - Stuxnet
lang: en
category: 
  - techblog
---
Copied from H-Online: <a href="http://www.h-online.com/security/features/FAQ-Flame-the-super-spy-1587063.html" target="_blank">Source</a>

**[<img title="FAQ_flame_kicker" border="0" alt="FAQ_flame_kicker" align="right" src="http://lh6.ggpht.com/-iSvtBbZ6D7E/T8diC1WvPAI/AAAAAAAAGKU/ztNk_M_At_I/FAQ_flame_kicker_thumb.png?imgmax=800" width="220" height="80" />](http://lh3.ggpht.com/-QpyIQWVm1c0/T8diAgxhefI/AAAAAAAAGKM/9IpyOe4KSgU/s1600-h/FAQ_flame_kicker%25255B2%25255D.png)The spyware worm Flame is being billed as a “deadly cyber weapon”, but a calmer analysis reveals it to be a tool by professionals for professionals that doesn't actually have that many new features compared to, say, the widespread online-banking trojan Zeus.** 

**What is Flame?**

Flame is the code name for a spyware program that is built to be very modular and which is also known as Flamer and sKyWIper. Flame was just recently discovered, and it will be some time before all of its components are analyzed. Anti-virus software companies estimate that Flame has infected about 1,000 computers, mostly in the Middle East. 

**What does Flame do?**

The spyware specializes in getting hold of many different types of information. Not only can it steal files and emails from infected computers, but it can also turn them into bugging and surveillance devices using connected microphones and webcams. It is also able to record screenshots, keystrokes, and network traffic. 

**But all of that is already standard for a lot of malware. Does it have anything new?**

One unusual feature is that Flame is able to connect with Bluetooth devices in the area. It's not clear yet what exactly happens in this case, but it's possible that headsets could be used for spying or that photos could be stolen from smartphones. Machines infected with Flame seem to also be able to broadcast as Bluetooth devices that offer services. More analysis is necessary to uncover further details. 

Another unique feature is the LUA interpreter that is included, which can be used to easily extend the functionality of the spyware with scripts. 

**A modular concept, sophisticated spying features – we've already seen that with Zeus and SpyEye. How is Flame different from those online-banking trojan kits?**

[<img title="flame-infection" border="0" alt="flame-infection" align="right" src="http://lh4.ggpht.com/-LCVcoPpN0x8/T8diKRUbb_I/AAAAAAAAGKk/jIPZzjwELCA/flame-infection_thumb%25255B1%25255D.png?imgmax=800" width="240" height="223" />](http://lh3.ggpht.com/-WpSXMytdxik/T8diGoilLsI/AAAAAAAAGKc/-3EbdLVZvNE/s1600-h/flame-infection%25255B3%25255D.png)Unlike with banking trojans, the individuals behind this program are not interested in spreading it as far and fast as possible – quite the opposite, in fact. As far as we know at this time, the worm didn't try to spread itself at all at first, and if an initial analysis did not come up with anything useful on a system, Flame would even be deleted. Only when it received orders to do so – if the information it found looked promising – did Flame try to infect other systems using local networks, USB sticks, or other methods. And this would typically only infect up to a dozen computers. The final total of about 1,000 infected systems over the course of several years is minimal compared to Zeus and SpyEye, which each worked their way into millions of machines. 

**And how did Flame get onto the infected computers in the first place?**

We do not know that yet, but we assume that the typical method for targeted attacks was used. In these cases, the perpetrators identify a group of people who have access to interesting information or can at least provide such access. These targets are then infected with the spyware, via specially crafted emails or USB sticks that someone has purposefully “lost” – or even by breaking into the victim's apartment, where the software is manually installed on the targeted computer. 

**Who's responsible for Flame? Israeli intelligence?**

We don't know – and we doubt we ever will. We do know that the software was developed by professionals, most likely by a whole team. In addition, it seems to have been repeatedly used in certain situations, mostly in the Middle East, with a particular focus on Iran. Conclusions could be drawn about the responsible parties, but it is important to keep in mind that we often only see what we are supposed to see in these situations. 

**Flame is often mentioned in the same breath as Stuxnet. Is there a connection there?**

Both programs were used in a way that tends to suggest intelligence involvement, but technically they have very little in common. Stuxnet was a sabotage program that was very targeted and minimal, despite its wide range of functions; Flame, on the other hand, is a spyware program that is very powerful, universal and, at 20MB, somewhat bloated. The virus experts who analyzed the spyware could not find any significant similarities in the code, and there are many potential explanations for why the two programs were spread in part using similar vulnerabilities. 

**Is Flame a prototype for a modern “cyber weapon”?**

Flame's assignment has more to do with spying than with destruction. The spyware should therefore be labeled a “cyber wiretap” rather than a weapon. 

**What is actually special about Flame?**

The spyware program seems to have been used for many years without being discovered, and until that happened, not a single anti-virus program recognized the malware. This situation shows once again how unsuitable anti-virus software is for protecting systems against targeted attacks. Anti-virus software focuses on defending machines against widespread, indiscriminate malware and is, for the most part, powerless against specialized software like Flame.