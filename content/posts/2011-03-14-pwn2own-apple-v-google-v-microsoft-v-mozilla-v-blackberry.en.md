---
title: "PWN2OWN – Apple v. Google v. Microsoft v. Mozilla v. BlackBerry!"
date: 2011-03-14T13:06:00+00:00
layout: single
author_profile: true
url: 2011/03/14/pwn2own-apple-v-google-v-microsoft-v-mozilla-v-blackberry/
tags:
  - Apple
  - BlackBerry
  - Browser
  - Firefox
  - Google
  - Google Chrome
  - Internet Explorer
  - Microsoft
  - Mozilla
  - Pwn2Own
  - Safari
  - security
lang: en
category: techblog
---
**[<img title="cansecwest-175" border="0" alt="cansecwest-175" align="right" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TX4LojAPK9I/AAAAAAAADsM/LIhu4ATfeaE/cansecwest-175_thumb%5B2%5D.png?imgmax=800" width="175" height="189" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TX4LmF8ULRI/AAAAAAAADsI/QIKCdwDWQ9Y/s1600-h/cansecwest-175%5B4%5D.png)Sophos Labs Blog:** If you're interested in computer security, you've probably heard of PWN2OWN. It's a competition which has become an annual fixture at the annual [CanSecWest conference](http://cansecwest.com/) in Vancouver, British Columbia.

The competition gets its name because, as the CanSecWest organizers explain, “If you can execute arbitrary code (PWN) on these [laptops or mobile phones] through a previously undisclosed browser (Firefox, IE, Safari) exploit, you can go home with one (OWN).”

The browsers under fire this year were: Microsoft Internet Explorer, Apple Safari, Mozilla Firefox and Google Chrome.

The mobile phones up for bombardment were: Dell Venue Pro running Windows 7, iPhone 4 running iOS, Blackberry Torch 9800 running Blackberry 6 OS and Nexus S running Android.

Whether you think the buying of vulnerabilities and exploits (through cash payments or prizes) is morally acceptable or not, it's a mainstream practice in the security industry these days.

Indeed, the pwn2own competition is run by none other than HP, owners of the TippingPoint Zero Day Initiative (ZDI) brand. ZDI is a programme which pays for vulnerabilities, thus rewarding bug-hunters for results which are fed back into the security community rather than sold to cybercrooks. Pwn2own adds some overt competitiveness into the business of bug-finding!

HP promised to publish the names of the winners “[as they (presumably) succeed](http://dvlabs.tippingpoint.com/blog/2011/02/02/pwn2own-2011)“, but though the contest ended on Friday last week, no official announcement has yet been made.

But that doesn't matter – thanks to social networks, the results hit the internet in near-real time, so we already know that the following were pwned:

* Safari  
* Internet Explorer  
* iPhone 4  
* BlackBerry Torch 9800

Firefox, Chrome, Android and Windows Mobile 7 all remained unpwned.

Apparently, even the most recent version of Safari, 5.0.4, [released](http://nakedsecurity.sophos.com/2011/03/10/apple-issues-mammoth-security-update-for-safari-browser/) just a day before the competition, is still vulnerable to the attack.

On the other hand, the most recent iOS upgrade for the iPhone, [iOS 4.3](http://nakedsecurity.sophos.com/2011/03/10/update-your-apple-devices-to-ios-4-3-or-risk-malicious-code-attacks/), heads off the exploit used at pwn2own. That's good news for iPhone 4 and 3GS users, who can upgrade, but bad news for earlier Apple devices, which can't be upgraded.

Technically speaking, Google Chrome didn't actually survive an attack – the contestant who was due to take it on didn't turn up. Nevertheless, the rules are the rules, so Chrome wasn't pwned.

[<img title="torch9800-175" border="0" alt="torch9800-175" align="right" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TX4LsN6PkWI/AAAAAAAADsU/kQBcIRN7CxQ/torch9800-175_thumb%5B2%5D.jpg?imgmax=800" width="175" height="268" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TX4LqPlbmSI/AAAAAAAADsQ/dt_9mE7NMlI/s1600-h/torch9800-175%5B4%5D.jpg)However, the software flaw used in successfully attacking the BlackBerry was present in Google's Chrome browser, which is based around the same Webkit codebase. In a laudably quick response, Google almost immediately [patched](http://googlechromereleases.blogspot.com/2011/03/stable-and-beta-channel-updates.html) the offending code in Chrome.

By the way, we often hear that software is getting worse, because ever more vulnerabilities are being found. But that's not surprising, now that companies like HP openly pay researchers for finding vulnerabilities and revealing them under controlled conditions.

There's much more motivation for security researchers to spend several weeks working through from a theoretical vulnerability to a practicable exploit when there is potential revenue at the end of it. That alone is a reasonable explanation for the increase in reported vulnerabilities over the past few years – and since known holes can be fixed, that's not a bad thing.

So I'd like to think that the outcome of this year's pwn2own is a [Curate's Egg](http://en.wikipedia.org/wiki/Curate%27s_egg) – good in parts. Half of the browsers and half of the mobile devices went unpwned.

There's also a potential silver lining in the pwn2own failures: with Apple's software falling to attackers on both laptop and smartphone devices, perhaps those Apple users who are still in denial about the possibility of malware infections on their beloved MacBooks and iHardware will think again!