---
title: Vodafone distributes Mariposa botnet
date: 2010-03-08T23:14:00+00:00
layout: single
author_profile: true
url: 2010/03/08/vodafone-distributes-mariposa-botnet/
tags:
  - Android
  - Malware
  - Mobile
  - report
  - review
  - Security

categories:
  - TechBlog
---
Here is yet another example of a company distributing malware to its userbase. Unfortunately it probably won’t be the last.

Today one of our colleagues received a brand new Vodafone HTC Magic with Google’s Android OS. “Neat” she said. Vodafone distributes this phone to its userbase in some European countries and it seems affordable as you can get it for 0€ or 1€ under certain conditions.

[![](/images/2010/03/0-pic-htc-magic-vodafone1.jpg)](/images/2010/03/0-pic-htc-magic-vodafone1-44ccf123.jpg)

The interesting thing is that when she plugged the phone to her PC via USB her Antivirus went off, detecting both an autorun.inf and autorun.exe as malicious. A quick look into the phone quickly revealed it was infected and spreading the infection to any and all PCs that the phone would be plugged into.

[![](/images/2010/03/1-pic-htc-drive.jpg)](/images/2010/03/1-pic-htc-drive-b8a54b72.jpg)

[![](/images/2010/03/2-pic-autorun.jpg)](/images/2010/03/2-pic-autorun-3a3659d4.jpg)

Once infected you can see the malware “phoning home” to receive further instructions, probably to steal all of the user’s credentials and send them to the malware writer.

[![](/images/2010/03/6-pic-comm-candc1.jpg)](/images/2010/03/6-pic-comm-candc1-2823aeb9.jpg)

Interestingly enough, the Mariposa bot is not the only malware I found on the Vodafone HTC Magic phone. There’s also a Confiker and a Lineage password stealing malware. I wonder who’s doing QA at Vodafone and HTC these days.