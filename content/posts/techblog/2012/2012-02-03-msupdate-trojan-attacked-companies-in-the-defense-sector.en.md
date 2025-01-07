---
title: MSUpdate Trojan attacked companies in the defense sector
date: 2012-02-03T14:11:00+00:00
layout: single
author_profile: true
url: 2012/02/03/msupdate-trojan-attacked-companies-in-the-defense-sector/
tags:
  - alert
  - malware
  - Microsoft
  - spam
  - trojan
  - VirusTotal
lang: en
categories: 
  - TechBlog
---
**[<img title="ISSNIP-2cc2f9030a6a5034" border="0" alt="ISSNIP-2cc2f9030a6a5034" align="right" src="http://lh6.ggpht.com/-9qBDYBZmsdA/Tyvj61rvRJI/AAAAAAAAEdo/Q27nI3-TZeU/ISSNIP-2cc2f9030a6a5034_thumb.png?imgmax=800" width="175" height="244" />](http://lh6.ggpht.com/-Fs3dVEQ-l8Y/TyvjLvSM_GI/AAAAAAAAEdg/RNQKL1AtxLk/s1600-h/ISSNIP-2cc2f9030a6a50342.png)The H-Security:** Unknown attackers have tried to use an invitation to a prestigious conference to inject a Trojan into companies in the defense sector. The security firms [Seculert and Zscaler](http://blog.seculert.com/2012/01/msupdater-trojan-and-conference-invite.html) report that opening an attached PDF flyer caused recipients' computers to be infected with spyware via a previously undisclosed hole in Acrobat Reader. 

According to the report, the attack mainly targeted government-related organizations, including military and aerospace contractors, in Europe and in the US. The security firms said that the attacks started back in 2009 and peaked in autumn 2010. Talking to The H's associates at heise Security, Seculert CTO Aviv Raff added that compromised computers, some of which had been infected for two years, were only discovered a few weeks ago. 

A zero day hole in Adobe Reader was exploited to inject the msupdater.exe Trojan into systems; once injected, the Trojan did its best to look like a regular update process – for example, it used URLs in the `http://domain.com/microsoftupdate/getupdate/default.aspx?ID=...` format. The malware also contained a “remote administration toolkit” that allowed the attackers to remotely monitor and control victims' computers. 

At the time of the attacks, these Trojans went undetected by most AV products, although signatures for [exploits](https://www.virustotal.com/file/daac83fc4af5c53068c4e5a29dadfdc5200e3b3fc2b491eebe0a4bc19ec9e3f2/analysis/1309613508/) and spyware programs such as [msupdater.exe](https://www.virustotal.com/file/043935374ce39637a4816d0a484d30bed1d3054bbe89625fbc22f83ef4cb3e04/analysis/1294546860/) have since become available. However, whether AV products will detect current spyware tools is doubtful.