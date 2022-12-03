---
title: Firefox, Thunderbird and SeaMonkey updates fix critical vulnerabilities
date: 2012-03-15T20:56:00+00:00
layout: single
author_profile: true
url: 2012/03/15/firefox-thunderbird-and-seamonkey-updates-fix-critical-vulnerabilities/
tags:
  - Browser
  - Mail
  - Mozilla
  - Updates
lang: en
category: techblog
---
[<img title="moztrio" border="0" alt="moztrio" align="right" src="http://lh3.ggpht.com/-KDXkokrGjUo/T2JQajrSXMI/AAAAAAAAFLU/nJLE5x1hkQM/moztrio_thumb%25255B1%25255D.png?imgmax=800" width="170" height="80" />](http://lh3.ggpht.com/-bzyNXz6GZ9A/T2JQWqrukkI/AAAAAAAAFLM/0LTzTutUM5c/s1600-h/moztrio%25255B3%25255D.png)The H-Online: In the latest round of updates of its suite of internet applications, [Mozilla](http://www.mozilla.org/) has detailed the security fixes in the [Firefox 11](http://www.getfirefox.com/) browser, Thunderbird 11 email and news client and SeaMonkey 2.8 &#8220;all-in-one internet application suite&#8221;. There are also fixes for the &#8220;enterprise&#8221; and legacy versions of Firefox and Thunderbird. These fixes include a correction to a memory error in Array.join() which had been fixed last month, but was exploited during the Pwn2Own contest by Vincenzo Iozzo. 

According to the [Security Advisories for Firefox page](http://www.mozilla.org/security/known-vulnerabilities/firefox.html#firefox11), the Firefox 11.0 update addresses a total of eight vulnerabilities in the browser, five of which are rated as &#8220;Critical&#8221;. The same vulnerabilities have also been fixed in [Thunderbird 11](http://www.mozilla.org/en-US/thunderbird/) ([release notes](http://www.mozilla.org/en-US/thunderbird/11.0/releasenotes/)) and [SeaMonkey 2.8](http://www.seamonkey-project.org/) ([release notes](http://www.seamonkey-project.org/releases/seamonkey2.8/)), as they are based on the same Gecko platform as Firefox 11. 

These critical issues include [memory handling errors](http://www.mozilla.org/security/announce/2012/mfsa2012-19.html) and a [use-after-free problem](http://www.mozilla.org/security/announce/2012/mfsa2012-12.html) that could lead to memory corruption, a [crash when accessing keyframe cssText](http://www.mozilla.org/security/announce/2012/mfsa2012-17.html), and a [privilege escalation](http://www.mozilla.org/security/announce/2012/mfsa2012-16.html) issue when javascript: is used as the user's home page URL. A critical [use-after-free bug in SVG animation](http://www.mozilla.org/security/announce/2012/mfsa2012-14.html) has also been fixed. Some of these vulnerabilities, Mozilla says, could be exploited remotely by an attacker to, for example, execute arbitrary code on a victim's system. Mozilla has also corrected three moderate vulnerabilities, including two cross-site scripting (XSS) holes and an issue that could be used for UI spoofing. 

The same issues are also addressed in the &#8220;enterprise&#8221; extended support releases (ESR) of [Firefox ESR](http://www.mozilla.org/en-US/firefox/organizations/index.html) ([advisory](http://www.mozilla.org/security/known-vulnerabilities/firefoxESR.html#firefox10.0.3)) and [Thunderbird ESR](http://www.mozilla.org/en-US/thunderbird/organizations/index.html) ([advisory](http://www.mozilla.org/security/known-vulnerabilities/thunderbirdESR.html#thunderbird10.0.3)). The legacy versions of the Mozilla applications have also been updated. [Firefox 3.6.28](http://www.mozilla.org/security/known-vulnerabilities/firefox36.html#firefox3.6.28), an update to the 3.6.x legacy branch of the browser, and Thunderbird [3.1.20](http://www.mozilla.org/security/known-vulnerabilities/thunderbird31.html#thunderbird3.1.20), an update to the 3.1.x branch of Thunderbird, both close four of the critical bugs and one moderate problem.