---
title: Spam Carrying WikiLeaks Worm
date: 2010-12-07T23:55:00+00:00
layout: single
author_profile: true
url: 2010/12/07/spam-carrying-wikileaks-worm/
tags:
  - advice
  - alert
  - malware
  - report
  - spam
  - WikiLeaks
lang: en
categories: 
  - techblog
---
**Symantec Connect:** WikiLeaks.org is in the news after their recent publications linked to leaked government documents. Spammers are now leveraging the current level of interest with social engineering techniques to infect users’ computers. Symantec is observing a wave of spam spoofing WikiLeaks to lure users into becoming infected with a new threat.

The spam email has subject line “IRAN Nuclear BOMB!” and spoofed headers. The “From” header purports to originate from WikiLeaks.org, although this is not in fact the case, and the message body contains a URL. This URL downloads and runs WikiLeaks.jar which has a downloader ‘WikiLeaks.class’ file. The downloader pulls the threat from http://ugo.file[removed].com/226.exe. Symantec detects this threat as [W32.Spyrat](http://www.symantec.com/security_response/writeup.jsp?docid=2010-011211-1602-99&tabid=2).

Below is screenshot of the email and website that downloads the threat:

[<img title="WikiLeaks" border="0" alt="WikiLeaks" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TP7CZ-4_yrI/AAAAAAAADcE/hxAO98LFWPU/WikiLeaks_thumb%5B2%5D.jpg?imgmax=800" width="500" height="493" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TP7CWkbUIaI/AAAAAAAADcA/CA_CViCY1ps/s1600-h/WikiLeaks%5B4%5D.jpg)

W32.Spyrat opens a backdoor using a predetermined port and IP address, allowing an attacker to perform the following actions on the compromised computer:

  * Read, write, and execute files 
  * Steal stored passwords 
  * Issue commands 
  * Activate and view a webcam, if present 
  * Log keystrokes 
  * Create an HTTP proxy to route traffic through the compromised computer

We caution users not to open or click on the links or attachments of emails such as these. Symantec recommends having anti-spam and antivirus solutions installed and up to date to prevent the compromise of personal machines or networks. We are closely monitoring this threat and update our readers.