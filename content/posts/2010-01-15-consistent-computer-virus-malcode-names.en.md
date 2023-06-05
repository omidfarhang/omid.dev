---
title: Consistent Computer Virus Malcode names
date: 2010-01-15T23:52:00+00:00
layout: single
author_profile: true
url: 2010/01/15/consistent-computer-virus-malcode-names/
tags:
  - report
  - VirusTotal
lang: en
category: 
  - techblog
---
InfoSecurity, a great site for computer security news, just put up a [story](http://www.infosecurity-us.com/view/6314/malware-threat-reports-fail-to-add-up/) asking the very old question: “Why don’t AV vendors name malcode consistently.”

The lead on the piece was: “…Fortinet, Sunbelt Software, and Kaspersky all published their lists of the most prevalent malware strains for the last month of 2009, but they didn't match up, leading to an admission that users will inevitably be confused by the results.”

Great observation, sort of.

Aside from the fact that the mentioned companies are competitors, pulling in-the-wild malicious code from different continents, the answer(s) to that question:

1. The process of finding and analyzing malicious code and writing detections for it (and NOT writing false positives) moves very fast. Although AV companies have been trying to use consistent names since they drew up the 1991 Computer AntiVirus Researcher Organization’s New Virus Naming Convention, there simply isn’t enough manpower to do it 100 percent because:

2. There has been a vast explosion in the amount of malcode that is in circulation. Possibly more than 20 million new variants just last year.

InfoSecurity ran a story immediately before the story we’re discussing here, reporting PandaLabs figures for 2009. PandaLabs estimated that 55,000 new pieces of malcode were detected **each day** of 2009. That’s 20 million in the year — more new malcode in one year than all the preceding 20 years. ([story here](http://www.infosecurity-us.com/view/6280/2009-was-a-record-year-for-malware/).)

3. One might also ask why “users” need consistent names at all. If they want to look for information on a piece of malcode their scanner has found, well, the scanner found it and has probably given it a name, however generic. If they're infected and their scanner hasn't spotted the malcode, that means it's probably new and doesn't HAVE a name. In that case, they're going to have to send a sample to their AV company to have it put in detections. If they want to compare the detections of different AV companies, the way to do it is get a sample or an MD5 hash of the suspect file and run it in [VirusTotal](http://www.virustotal.com/).

4. In the face of the onslaught of malicious code, many anti-malware companies have begun moving to behavior based detection: detecting malicious code by scanning for malicious sections of code or running it in a virtual environment to detect malicious activity. This has resulted in “generic” or “batch” names for detections.

If a piece of code under test is trying to shut down anti-malcode scanners, find other computers through directory shares, put an auto-start line in the Windows Registry and phone home the fact that it has installed itself on a specific computer – well, it probably isn’t JUST a cute little animation of a kitten. If it walks like a duck and quacks like a duck…