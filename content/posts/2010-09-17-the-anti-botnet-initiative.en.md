---
title: The Anti-Botnet Initiative
date: 2010-09-17T07:57:00+00:00
layout: single
author_profile: true
url: 2010/09/17/the-anti-botnet-initiative/
tags:
  - news
lang: en
category: 
  - techblog
---
The [Anti-Botnet Initiative](http://www.botfrei.de/) has now been started. The initiative is a cooperation of [eco](http://www.eco.de/) and The German Federal Bureau for Information Security ([BSI](https://www.bsi.bund.de/)) and has created a telephone hotline for persons which may have their computers infected and seem to be a part of a botnet. In order to be able to detect this, the major ISPs in Germany are also cooperating (1und1, Telekom, Kabel BW, NetCologne, QSC and Versatel). The ISPs monitor suspicious activity on all IP addresses in their pool. As suspicious activity is considered, for example, the sending of huge amounts of data on certain ports like 25 for SMTP (used to send spam emails), incoming HTTP connections (used to serve HTTP connections) and so on. Once the ISP detects this, the customer gets an email notification with information about the suspicious activity and various other information (like the telephone number of the hotline). The user is also instructed to have a look on the [www.botfrei.de](http://www.botfrei.de/) website.

There are also two antivirus solutions offered for free to clean up the infected computers. There is an online scanner from Symantec, called DE-Cleaner and there is the Computer Bild Magazine’s DE-Cleaner Rescue system using the Avira anti-malware Technology.

[<img title="anti-botnet-initiative" border="0" alt="anti-botnet-initiative" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TJMYTWYXhGI/AAAAAAAACdM/uegP5Xrx_Nw/anti-botnet-initiative_thumb%5B1%5D.png?imgmax=800" width="304" height="266" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TJMYPzEQjDI/AAAAAAAACdI/4jQpP9ViG-E/s1600-h/anti-botnet-initiative%5B3%5D.png)

The difference between the two solutions is pretty straight forward: The first one is a windows program which scans the hard drives while Windows is active, while the other one is a bootable Linux CD which allows the user to start a scan and clean all harddisk partitions while Windows is not running. The advantage of the second method is that it offers the possibility to detect for example rootkits that might be running within Windows and hide malware inside the operating system. While running the Linux from the rescue system, Windows is completely inactive (not as in Safe mode) so the rootkits are also not active. This is actually the only reliable possibility to detect rootkits.

The Avira technologies used in this Rescue System comprise the Command Line Scanner ScanCL, which is also available [here](http://www.avira.com/en/support/support_downloads.html). Note that this tool works only when a licensed Avira product (Avira AntiVir Personal suffices) is installed on the computer. The other product used is the Avira Command Line Updater which allows the Rescue System to update the detection engine and the signatures.

By providing its command line scanner for free, Avira continues its strategy to provide a basic antivirus protection for free to everyone.