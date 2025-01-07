---
title: Looks familiar? Yes! From Alureon!
date: 2010-12-07T13:24:00+00:00
layout: single
author_profile: true
url: 2010/12/07/looks-familiar-yes-from-alureon/
tags:
  - advice
  - malware
  - Offer
  - review
lang: en
categories: 
  - TechBlog
---
It's a normal day to us. We receive a new Bamital virus sample report from a customer, and we provide an analysis. Suddenly, something interesting bursts into my eyes:  

[![Img_1](http://lh6.ggpht.com/_vaUVXcmC3OI/TP4ubOef1DI/AAAAAAAADZ8/41n6UoorOr0/Img_1_thumb%5B1%5D.jpg?imgmax=800 "Img_1")](http://lh3.ggpht.com/_vaUVXcmC3OI/TP4uY9cpAxI/AAAAAAAADZ4/on8-7bJgFEs/s1600-h/Img_1%5B3%5D.jpg)

What's your thought on this code fragment? At the first glance, this piece of code looks like a non-malicious call to manipulate the Windows Printer SubSystem. But if you've analyzed Alureon before, it may look familiar to you. Yes, Alureon also takes advantage of the Windows Print Subsystem to install its payload.

Now let's recall Alureon's nasty stuff:

The older Alureon installs its payload by using Windows Print Manager. It drops its malicious payload to the Print Processor directory and then calls a winspool API AddPrintProcessorA() to issue an RPC request to the Printing SubSystem, which is hosted by spoolsv.exe; the spoolsv.exe then loads the Alureon payload from the Print Processor directory:

[![Img_2](http://lh3.ggpht.com/_vaUVXcmC3OI/TP4ueEqktqI/AAAAAAAADaE/77iE1GAYHKE/Img_2_thumb%5B1%5D.jpg?imgmax=800 "Img_2")](http://lh4.ggpht.com/_vaUVXcmC3OI/TP4ucuNX6xI/AAAAAAAADaA/GM7ikpMLJuk/s1600-h/Img_2%5B3%5D.jpg)

Since the spoolsv.exe is a trusted system process, it makes Alureon difficult to detect by HIOS/Anti-virus behavior monitoring tools. Today, this nasty AddPrintProcessorA() trick has finally been overcome by lots of anti-virus products. However, Alureon is now employing another Print Subsystem API AddPrintProvidorA() to continue its nasty business:

[![Img_3](http://lh6.ggpht.com/_vaUVXcmC3OI/TP4ug9sgNPI/AAAAAAAADaM/oOhDa5gbwMs/Img_3_thumb%5B1%5D.jpg?imgmax=800 "Img_3")](http://lh5.ggpht.com/_vaUVXcmC3OI/TP4ufuoQ33I/AAAAAAAADaI/-6mhA_fBp-Y/s1600-h/Img_3%5B3%5D.jpg)

We often see parallels in the application of &#8216;new' techniques by malware authors, seeking to evade detection.

So, a technique pioneered by Alureon is now being used by Bamital – does this mean that can we expect to see more of Alureon's particular brand of nastiness in other malware families in the wild?

I hope not.

Bamital is a virus family which infects the system files “explorer.exe” and “winlogon.exe”. If you experience slow system response, or find unexpected files such as “hlp.dat” under _system folder_, we suggest that you scan your system for malware using a credible scanner such as [Avira AntiVir](/computer/recommended-programs/windows/avira-premium-security-suite).