---
title: New Trojan Virus Attacks Mac Computers Via Social Networking Sites
date: 2010-10-28T13:40:00+00:00
layout: single
author_profile: true
url: 2010/10/28/new-trojan-virus-attacks-mac-computers-via-social-networking-sites/
tags:
  - advice
  - alert
  - Mac OS X
  - malware
  - report
  - security
lang: en
category: 
  - techblog
---
**Mac: Hi PC, I'm not feeling so hot today…  
** **PC: Oh, I know ALL about that. I think you have a virus!**

[<img title="Mac users are now at risky of getting a nasty virus." border="0" alt="Mac users are now at risky of getting a nasty virus." align="right" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TMl2SqcsprI/AAAAAAAAC7o/ABx8I_NybQU/17233_large_Mac_Girl_thumb.png?imgmax=800" width="304" height="178" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TMl2OjMn0xI/AAAAAAAAC7k/jqNgFZSzRik/s1600-h/17233_large_Mac_Girl%5B2%5D.png)Security experts by and large agree that security via obscurity is not a wise model for protecting customers over the long term.  That's exactly the model Apple has employed successfully for some time now.  However, its luck finally appears to be running short.

Hot on the heels of a newly discovered iOS exploit that allows access to locked iPhones, new reports [[1]](http://www.securemac.com/boonana-bulletin.php) [[2]](http://blog.intego.com/2010/10/27/intego-security-memo-trojan-horse-osxkoobface-a-affects-mac-os-x-mac-koobface-variant-spreads-via-facebook-twitter-and-more/) from security research firms _SecureFirm_ and _Intego_ reveals that a new Trojan is targeting Mac users using a vulnerability in OS X's Java player.

According to the _Intego_ report the new malware, Trojan.osx.boonana.a, is really a reworked version of the Koobface malware, which has attacked Windows in the past.  The malware acts as a worm when it spreads and as a Trojan when it is infecting your computer.

Users may encounter the worm via links posted on Facebook, MySpace, Twitter, and other websites.  When clicking the link, the applet attempts to run.  Users can stop the infection before it starts by denying the applet permission to run when OS X's Java player pops up a dialogue.

[<img title="If it you approve, you are a sad noob, and your Mac is infected." border="0" alt="If it you approve, you are a sad noob, and your Mac is infected." align="right" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TMl2W9wYC8I/AAAAAAAAC78/g8biJhoNzHQ/17235_large_koobface_approve_thumb%5B1%5D.jpg?imgmax=800" width="300" height="219" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TMl2UkJDvlI/AAAAAAAAC70/oHpVedIBaSA/s1600-h/17235_large_koobface_approve%5B4%5D.jpg)If they allow the applet to run, they may get another warning if they have a Mac antispyware program like VirusBarrier X6’s Anti-Spyware installed.  If they don't get the warning, or choose to disregard it, the applet will attempt to make a connection with a remote server and installs a rootkit, backdoor, command and control, and other elements.  These files are copied to an invisible folder — .jnana — in the user's home directory.

If the virus is allowed to carry out its infection process, the unsuspecting Mac user may find themselves part of a botnet.  When they log on social networks, the virus will post links to spread the infection.  It may also send spam e-mail via their logged-in accounts

Other variants of this virus target Windows and Linux, making it a rare true cross-platform virus.  All these viruses share the fact that they use the Java player as a route of attack.  According to _Intego_, other OS X-specific versions of the virus have shown up, but most are broken or try to connect to offline servers.  
The malware could become potentially more dangerous in the future if it is able to eliminate the warnings from the Java player and/or change the name/location of the infection directory, making it hard for virus removal software to find it.

While it does not appear that this virus takes advantage of any unique flaws in Apple's version of Java, some security experts say that Apple's Java player may have more vulnerabilities than Window's.  That's because Apple makes its own Java player, which according to [an e-mail](http://www.flickr.com/photos/frasers/5104179782/) reportedly attributed to Apple Chief Executive Steve Jobs, is always a version behind the official Linux/Windows builds from Sun and Oracle.

Apple is reportedly considering ditching its Java player in future versions of OS X, such as OS X 10.7 “Lion”.  Similarly it's considering rejecting Flash, another multimedia web technology.  Ultimately these efforts may eliminate some routes of attack, but now that Apple is being targeted it must realize — there is _always_ a back door.

Taken from DailyTech.com