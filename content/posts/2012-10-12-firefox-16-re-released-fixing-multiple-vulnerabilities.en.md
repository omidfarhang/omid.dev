---
title: Firefox 16 re-released fixing multiple vulnerabilities
date: 2012-10-12T11:39:00+00:00
layout: single
author_profile: true
url: 2012/10/12/firefox-16-re-released-fixing-multiple-vulnerabilities/
tags:
  - Firefox
  - Mozilla
  - security
  - Thunderbird
  - Updates
lang: en
category: techblog
---
<a href="http://lh4.ggpht.com/-Mi-4Pbjkj04/UHf6TXOfveI/AAAAAAAAHfg/9S8mO5R2x9Y/s1600-h/Mozilla_Firefox_cracked_bandaid_120%25255B2%25255D.png" target="_blank"><img title="Mozilla_Firefox_cracked_bandaid_120" border="0" alt="Mozilla_Firefox_cracked_bandaid_120" align="right" src="http://lh3.ggpht.com/-Z8ssS5vSqH0/UHf6WfCGeqI/AAAAAAAAHfo/rWgWRa7vx0g/Mozilla_Firefox_cracked_bandaid_120_thumb.png?imgmax=800" width="120" height="120" /></a>The H-Online: The latest version of Firefox, version 16, has returned to Mozilla's servers with the release of Firefox 16.0.1 after the discovery of vulnerabilities caused the organization to remove the just-released open source web browser from circulation. Mozilla's security [blog post](https://blog.mozilla.org/security/2012/10/10/security-vulnerability-in-firefox-16/) described the problem as just that of a malicious web site being able to potentially determine the URLs and parameters used and suggested downgrading to Firefox 15.0.1, despite the <a href="/2012/10/mozilla-closes-numerous-critical-holes.html" target="_blank">numerous critical bugs fixed</a> in Firefox 16.

But on Wednesday, Gareth Heyes, an independent security researcher, [posted](http://www.thespanner.co.uk/2012/10/10/firefox-knows-what-your-friends-did-last-summer/) a proof of concept (PoC) which demonstrated that Firefox 16 was somewhat insecure with its Windows location variables, allowing an attacker to open a window pointing at some part of another site (in the PoC, twitter.com), wait for that site to redirect the window to a “logged in” page (a twitter.com profile page) and then retrieve the new location and any associated data (in the PoC, the user's twitter handle). Accessing the location information should normally be prevented by the browser's “Same Origin” policy. 

According to Mozilla's [advisory](http://www.mozilla.org/security/announce/2012/mfsa2012-89.html) though, a similar but separate critical flaw had been found in Firefox 16, Firefox ESR 10.0.8, SeaMonkey 2.13, Thunderbird 16 and Thunderbird ESR 10.0.8 and earlier, which not only disclosed the location object, but, in Firefox 15 and earlier, had the potential for arbitrary code execution. Firefox 16.0.1 closes both these holes. The presence of the flaw in Firefox 15 does, though, raise questions over the previous advice given by Mozilla to downgrade from 16 to 15. 

But these were not the only holes fixed in 16.0.1; another [security advisory](http://www.mozilla.org/security/announce/2012/mfsa2012-88.html) says developers also identified two of the top crashing bugs in the browser engine and that these bugs showed signs of having corrupted memory. Mozilla concludes that it could be possible to exploit these holes to execute code. One of the bugs only affected FreeType on mobile devices and is therefore fixed in Firefox 16.0.1 for Android, while the other is a WebSockets bug in Firefox 16 only and is not present in [Firefox ESR](https://www.mozilla.org/en-US/firefox/organizations/). 

Firefox 16.0.1 is now being pushed out to the Firefox browser's [auto update system](https://support.mozilla.org/en-US/kb/update-firefox-latest-version) and is also available to download via [auto-version-detected download](http://getfirefox.com/) or from the [all systems and languages page](http://www.mozilla.org/en-US/firefox/all.html). Firefox 16.0.1 for Android is available in the [Google Play](https://play.google.com/store/apps/details?id=org.mozilla.firefox) store. Thunderbird 16.0.1 is also available for [download](http://www.mozilla.org/en-US/thunderbird/all.html). Firefox ESR 10.0.9 and Thunderbird ESR 10.0.9 are currently being quality assured and are expected to be released soon. SeaMonkey 2.13.1 has yet to appear on the project's [releases](http://www.seamonkey-project.org/releases/) page. 

<http://h-online.com/-1728382>