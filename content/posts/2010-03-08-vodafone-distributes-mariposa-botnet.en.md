---
title: Vodafone distributes Mariposa botnet
date: 2010-03-08T23:14:00+00:00
layout: single
author_profile: true
url: 2010/03/08/vodafone-distributes-mariposa-botnet/
tags:
  - Android
  - malware
  - Mobile
  - report
  - review
lang: en
category: techblog
---
Here is yet another example of a company distributing malware to its userbase. Unfortunately it probably won’t be the last.

Today one of our colleagues received a brand new Vodafone HTC Magic with Google’s Android OS. “Neat” she said. Vodafone distributes this phone to its userbase in some European countries and it seems affordable as you can get it for 0€ or 1€ under certain conditions.

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5V8uZm_kTI/AAAAAAAABPE/-o7ymohKImk/s1600-h/0-pic-htc-magic-vodafone1.jpg" imageanchor="1"><img border="0" height="206" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5V8uZm_kTI/AAAAAAAABPE/-o7ymohKImk/s400/0-pic-htc-magic-vodafone1.jpg" width="400" /></a>
</div>

The interesting thing is that when she plugged the phone to her PC via USB her Antivirus went off, detecting both an autorun.inf and autorun.exe as malicious. A quick look into the phone quickly revealed it was infected and spreading the infection to any and all PCs that the phone would be plugged into.

<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S5V86LgJ6BI/AAAAAAAABPM/2jcGMu3SBYo/s1600-h/1-pic-htc-drive.jpg" imageanchor="1"><img border="0" height="172" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S5V86LgJ6BI/AAAAAAAABPM/2jcGMu3SBYo/s400/1-pic-htc-drive.jpg" width="400" /></a>
</div>



<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S5V861bGkZI/AAAAAAAABPU/DoGDDFPxJS4/s1600-h/2-pic-autorun.jpg" imageanchor="1"><img border="0" height="133" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S5V861bGkZI/AAAAAAAABPU/DoGDDFPxJS4/s400/2-pic-autorun.jpg" width="400" /></a>
</div>

Once infected you can see the malware “phoning home” to receive further instructions, probably to steal all of the user’s credentials and send them to the malware writer.

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5V8-BtqSMI/AAAAAAAABPc/AJgJ_wPrEnA/s1600-h/6-pic-comm-candc1.jpg" imageanchor="1"><img border="0" height="285" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5V8-BtqSMI/AAAAAAAABPc/AJgJ_wPrEnA/s400/6-pic-comm-candc1.jpg" width="400" /></a>
</div>

Interestingly enough, the Mariposa bot is not the only malware I found on the Vodafone HTC Magic phone. There’s also a Confiker and a Lineage password stealing malware. I wonder who’s doing QA at Vodafone and HTC these days.