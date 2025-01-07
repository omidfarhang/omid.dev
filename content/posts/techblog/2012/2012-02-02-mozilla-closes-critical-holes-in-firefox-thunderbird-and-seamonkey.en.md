---
title: Mozilla closes critical holes in Firefox, Thunderbird and SeaMonkey
date: 2012-02-02T12:45:00+00:00
layout: single
author_profile: true
url: 2012/02/02/mozilla-closes-critical-holes-in-firefox-thunderbird-and-seamonkey/
tags:
  - Firefox
  - Mozilla
  - SeaMoney
  - software
  - Thunderbird
  - Updates
lang: en
categories: 
  - TechBlog
---
**[<img title="mozillatrio" border="0" alt="mozillatrio" align="right" src="http://lh6.ggpht.com/-6q8NDxBhKmo/Typ-PkBF0tI/AAAAAAAAEco/KAfwQKkidtY/mozillatrio_thumb%25255B1%25255D.png?imgmax=800" width="170" height="80" />](http://lh3.ggpht.com/-1W3dNfWF0Hs/Typ98ucqdQI/AAAAAAAAEcg/rnPUk7BLSu4/s1600-h/mozillatrio%25255B3%25255D.png)The H-Security:** Following the release of new versions of its open source Firefox web browser, Thunderbird email client and SeaMonkey suite, [Mozilla](http://www.mozilla.org/) has detailed the security fixes included in each of the updates. According to the project's [Security Center page for Firefox](http://www.mozilla.org/security/known-vulnerabilities/firefox.html#firefox10), version 10.0 closes a total of 8 security holes in the browser, 5 of which are rated as “Critical” by Mozilla. 

The critical issues include an exploitable crash when processing a malformed embedded XSLT stylesheet, potential memory corruption when decoding Ogg Vorbis files, [XPConnect](https://developer.mozilla.org/en/XPConnect) security checks being bypassed by frame scripts, a use after free error in child nodes from nsDOMAttribute and various memory safety hazards. These vulnerabilities could be exploited remotely by an attacker to, for example, execute arbitrary code on a victim's system. 

Additionally, Firefox 10 closes two “High” impact issues that could lead to information disclosure or an attacker violating the HTML5 frame navigation policy by replacing a sub-frame for phishing attacks. A moderate severity bug when exporting a user's Firefox Sync key to a “Firefox Recovery Key.html” file that caused it to be saved with incorrect permissions was also fixed. 

Based on the same Mozilla Gecko platform as Firefox 10, [version 2.7](http://www.seamonkey-project.org/releases/seamonkey2.7/) of the SeaMonkey “all-in-one internet application suite” [fixes all of the same vulnerabilities](http://www.mozilla.org/security/known-vulnerabilities/seamonkey.html#seamonkey2.7), while Thunderbird 10 [addresses all but one](http://www.mozilla.org/security/known-vulnerabilities/thunderbird.html#thunderbird10) as it is not affected by the moderate incorrect permissions bug because it does not use [Firefox Sync](http://www.mozilla.org/en-US/mobile/sync/). 

An update to the 3.6.x legacy branch of Firefox, version 3.6.23, [fixes](http://www.mozilla.org/security/known-vulnerabilities/firefox36.html#firefox3.6.26) four of the above critical issues and a low impact bug related to an overly permissive IPv6 literal syntax which was previously repaired in Firefox 7.0, Thunderbird 7.0 and SeaMonkey 2.4. The developers note that Firefox 3.6.26 “now enforces RFC 3986 IPv6 literal syntax”, adding that the change “may break links written using the non-standard Firefox-only forms that were previously accepted”. The 3.1.18 update to the 3.1.x branch of Thunderbird also [corrects these issues](http://www.mozilla.org/security/known-vulnerabilities/thunderbird31.html#thunderbird3.1.18). 

All users are advised to upgrade to the current stable versions.