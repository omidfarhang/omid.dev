---
title: VirusTotal online scanner adds behavior analysis
date: 2012-07-25T14:16:00+00:00
layout: single
author_profile: true
url: 2012/07/25/virustotal-online-scanner-adds-behavior-analysis/
tags:
  - Announcement
  - antivirus
  - news
  - VirusTotal
lang: en
category: 
  - techblog
---
<a href="http://lh5.ggpht.com/-JN7a_qRtjw8/UA_4uoKn_zI/AAAAAAAAGl0/751-1KLyXu0/s1600-h/VirusTotal-logo%25255B2%25255D.png" target="_blank"><img title="VirusTotal-logo" border="0" alt="VirusTotal-logo" align="right" src="http://lh4.ggpht.com/-_OC-wz-iq2Y/UA_4wrKiZyI/AAAAAAAAGl8/Rb3JEynawXw/VirusTotal-logo_thumb.png?imgmax=800" width="252" height="107" /></a>h-Online: The developers of the [VirusTotal](https://www.virustotal.com/) online virus scanner service are currently testing a new sandbox feature to provide users with more meaningful scan results. In a [post](http://blog.virustotal.com/2012/07/virustotal-behavioural-information.html) on the company's blog, software architect and developer Emiliano Martinez says that, for this purpose, samples uploaded to the service are executed in a controlled sandbox environment where their actions can be “recorded in order to give the analyst a high level overview of what the sample is doing”. 

An analysis of the uploaded file's behavior is then displayed in a new “Behavioral information” tab as part of the scan results. VirusTotal logs file and registry activities as well as new processes and code injections. The scanner also issues a notification when a file directly sends commands to certain device drivers. 

With the free online service, users can submit URLs and files to be analyzed by various antivirus engines and scanners for malicious content such as viruses, worms and Trojans. However, it is often only the heuristics that flag up issues – which can be identified by result descriptions that contain keywords such as “Heur”, “Suspicious” or “Generic”. Occasionally, this causes legitimate files to be regarded as suspected viruses without giving users the option to establish whether there is an actual threat. 

Even a sandbox analysis carries a residual risk as some Trojans quietly check whether they are being executed in a virtual environment when they're launching. If this is the case, they will act inconspicuously, only launching their malicious payload on a real Windows system. 

The behavior analysis is currently being carried out by the scan engines at a different time than the virus analysis. It only scans executable files that are less than 8 MB in size and were previously unknown to VirusTotal. Therefore, it makes sense to keep the results page open and reload it occasionally to check whether a new data has been added. 

Martinez notes that the behavior analysis is still in its early days, and that there is no guarantee that uploaded files will undergo the added analysis. The company uses Claudio Guarnieri's open source [Cuckoo sandbox](http://www.cuckoosandbox.org/). Incidentally, VirusTotal is far from being the only online tool to use a sandbox: [Anubis](http://anubis.iseclab.org/?action=advanced_form), [MWAnalysis CWSandbox](http://mwanalysis.org/?site=1&page=submit) and [ThreatExpert](http://www.threatexpert.com/submit.aspx) have offered similar services for quite some time. 

[http://h-online.com/-1651766](http://h-online.com/-1651766 "http://h-online.com/-1651766")