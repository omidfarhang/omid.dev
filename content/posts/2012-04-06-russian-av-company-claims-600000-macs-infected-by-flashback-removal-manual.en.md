---
title: "Russian AV company claims 600,000 Macs infected by Flashback [Removal Manual]"
date: 2012-04-06T20:39:00+00:00
layout: single
author_profile: true
url: 2012/04/06/russian-av-company-claims-600000-macs-infected-by-flashback-removal-manual/
tags:
  - Apple
  - Mac OS X
  - malware
  - news
  - solution
lang: en
category: 
  - techblog
---
[<img title="map2" border="0" alt="map2" align="right" src="http://lh5.ggpht.com/-whN3krUtbU8/T39NZ3AC0mI/AAAAAAAAFbk/Kt51a3MaCjQ/map2_thumb.png?imgmax=800" width="244" height="142" />](http://lh4.ggpht.com/-SJ_qv3xu3aI/T39NU0XdvhI/AAAAAAAAFbc/K1SgrJv-AFo/s1600-h/map2%25255B2%25255D.png)The H-Online: A Russian AV company, Dr. Web, says it has [conducted research](http://news.drweb.com/show/?i=2341) to determine the spread of the Flashback trojan on systems running Mac OS X and says that 550,000 systems are infected, mostly in the US and Canada. A later [update](https://twitter.com/#!/hexminer/status/187623741273026562) raised that number to 600,000 and claimed 274 infected systems in Cupertino, California. 

Dr. Web says it employed a sinkhole technique to intercept the bot installed by the newest Flashback trojan, and directed the bots to its own servers where it could analyse the traffic. Each bot includes a unique ID of the machine it has infected in the query string it sends to the command and control server; it is these unique IDs that Dr. Web has used to calculate the infection count. According to its estimates, of the original 550,000 estimate, 56.6% of the systems were in the United States, 19.8% in Canada, 12.8% in the United Kingdom and 6.1% in Australia. 

The latest generations of Flashback are different from previous Flashback trojans. According to an F-Secure [advisory](http://www.f-secure.com/v-descs/trojan-downloader_osx_flashback_i.shtml) the newest version attempts to use old vulnerabilities in the Java implementation on Mac OS X to install its payload silently unless it detects security applications such as Little Snitch, VirusBarrier X6, iAntiVirus, ClamXav, HTTPScoop and Packet Peeper, or XCode, the Mac OS X development environment, in which case it deletes itself. If the Java vulnerabilities fail to allow installation it will then prompt for an administrator password and, if it gets a valid administrator password, inject malware into the system's installation of Safari or Firefox. If it doesn't get a valid administrator password, it attempts to use a different infection technique, but checks for Microsoft Word and Skype first and deletes itself if they are present, as it is known that this alternative infection method causes those applications to crash. 

Users are recommended to install the recent [Apple Java update](http://www.h-online.com/news/item/Apple-and-Mozilla-take-on-Java-vulnerabilities-1500931.html) to close the hole which allows malicious web pages to drop the trojan onto a system and to always check which application is actually asking for your password when requested. 

To detect if a system is infected with Flashback, run each of the following commands in the Mac OS X Terminal:

```shell
defaults read ~/.MacOSX/environment DYLD_INSERT_LIBRARIES<br />defaults read /Applications/Safari.app/Contents/Info LSEnvironment<br />defaults read /Applications/Firefox.app/Contents/Info LSEnvironment
```



If all these commands respond with “The domain/default pair of … does not exist”, then there is no Flashback infection. Otherwise consult the F-Secure [advisory](http://www.f-secure.com/v-descs/trojan-downloader_osx_flashback_i.shtml) for manual removal instructions.