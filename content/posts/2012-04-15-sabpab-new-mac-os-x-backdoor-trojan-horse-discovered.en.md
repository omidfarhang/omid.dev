---
title: Sabpab, new Mac OS X backdoor Trojan horse discovered
date: 2012-04-15T21:24:00+00:00
layout: single
author_profile: true
url: 2012/04/15/sabpab-new-mac-os-x-backdoor-trojan-horse-discovered/
tags:
  - Mac OS X
  - malware
  - news
  - report
lang: en
categories: 
  - techblog
---
SophosLabs: More malware for the Mac OS X platform has been discovered, hot on the heels of the revelation that <a href="/2012/04/russian-av-company-claims-600000-macs.html" target="_blank">some 600,000 Macs had been infected</a> in the Flashback attack.

And just like Flashback, the new Trojan doesn't require any user interaction to infect your Apple Mac. 

The [Sabpab Trojan horse](http://www.sophos.com/en-us/threat-center/threat-analyses/viruses-and-spyware/OSX~Sabpab-A/detailed-analysis.aspx) exploits the [same drive-by Java vulnerability](http://www.sophos.com/en-us/threat-center/threat-analyses/viruses-and-spyware/Exp~20120507-A/detailed-analysis.aspx) used to create the Flashback botnet. 

[<img title="sabpab-1" border="0" alt="sabpab-1" src="http://lh5.ggpht.com/-mEa8hJpRlsw/T4s1RUZsv1I/AAAAAAAAFhE/7eMJIT_NADk/sabpab-1_thumb%25255B2%25255D.jpg?imgmax=800" width="500" height="236" />](http://lh4.ggpht.com/-8fkuAUSH6SU/T4s1OeLTX4I/AAAAAAAAFg8/ILKJd6pP-Ys/s1600-h/sabpab-1%25255B4%25255D.jpg) 

The newly discovered Sabpab malware is in many ways a basic backdoor Trojan horse. It connects to a control server using HTTP, receiving commands from remote hackers as to what it should do. The criminals behind the attack can grab screenshots from infected Macs, upload and download files, and execute commands remotely. 

The Trojan creates the files 

> <tt>/Users/<user>/Library/Preferences/com.apple.PubSabAgent.pfile</tt> 
> 
> <tt>/Users/<user>/Library/LaunchAgents/com.apple.PubSabAGent.plist</tt>

Encrypted logs are sent back to the control server, so the hackers can monitor activity. 

The potential for abuse of compromised Macs should be obvious, given the Trojan's functionality. 

[<img title="sabpab-2" border="0" alt="sabpab-2" src="http://lh6.ggpht.com/-KRuwSEkNJKM/T4s1X0O3ODI/AAAAAAAAFhU/v7HZs2pARd0/sabpab-2_thumb%25255B2%25255D.jpg?imgmax=800" width="498" height="403" />](http://lh5.ggpht.com/-xHS5ziZdWGs/T4s1VhFH0oI/AAAAAAAAFhM/CE1QFu2JXAc/s1600-h/sabpab-2%25255B4%25255D.jpg) 

The Sabpab Trojan is not believed to be anything like as widespread as Flashback, but still underlines the importance of protecting Macs against malware with an up-to-date anti-virus program and security updates. 

It's time for Mac users to wake up and smell the coffee. Mac malware is becoming a genuine issue, and cannot be ignored any longer.