---
title: "Chrome security update and researchers' bonuses"
date: 2012-03-05T17:54:00+00:00
layout: single
author_profile: true
url: 2012/03/05/chrome-security-update-and-researchers-bonuses/
tags:
  - Google
  - Google Chrome
  - security
  - software
  - Updates
lang: en
category: 
  - techblog
---
**[<img title="new-chrome-logo" border="0" alt="new-chrome-logo" align="right" src="http://lh5.ggpht.com/-ZM7GqRvyKHE/T1T24ZjLcGI/AAAAAAAAFD4/cDXR1rr2t4M/new-chrome-logo_thumb%25255B1%25255D.png?imgmax=800" width="128" height="125" />](http://lh3.ggpht.com/-9UXZfT-QBPo/T1T2199zrGI/AAAAAAAAFDw/2dZAhGNqn4s/s1600-h/new-chrome-logo%25255B3%25255D.png)The H-Security:** Google has [released](http://googlechromereleases.blogspot.com/2012/03/chrome-stable-update.html) a new stable version of its Chrome browser. The update fixes seventeen high severity vulnerabilities and updates the bundled Flash player. Google referred users to Adobe for details of the Flash Player update, and as usual, revealed few details about the seventeen holes that it closed in the release. It did, though, say that the researchers earned between $500 and $3000 for their vulnerability disclosures. 

One researcher, Michel Aubizzierre, working under the name _miaubiz_, found four bad casting flaws, three of which were related and listed under [CVE-2011-3037](http://www.vupen.com/english/Reference-CVE-2011-3037.php), and five use-after-free errors. Aubizzierre recently [presented](http://immunityinc.com/infiltrate/speakers.html#aubizzierre) a [lecture](https://docs.google.com/viewer?a=v&pid=explorer&chrome=true&srcid=0BxZoFCCxl7lfNGVkZjhmZWMtZTNkOS00MzIzLWIzMDctYTM0YTUwMTExZWZh&hl=en_US&pli=1) on “Unearthing the world's best WebKit bugs” at the Infiltrate conference. The lecture discusses how machine learning techniques help him identify safety-related source code changes. 

Aubizzierre was one of three researchers who had “special rewards” from Google. Logged under bugs [116661](https://code.google.com/p/chromium/issues/detail?id=116661) (status Rockstar), [116662](https://code.google.com/p/chromium/issues/detail?id=116662) (status Legend) and [116663](https://code.google.com/p/chromium/issues/detail?id=116663) (status Superhero), Aubizzierre, Aki Helin of OUSPG and Arthur Gerkis were awarded $10000 each for their “sustained, extraordinary contributions” to tracking down vulnerabilities in Chrome. Helin was noted for the “Awesome variety of fuzz targets” reported on and Gerkis for the “Significant pain inflicted upon SVG”. All three bug reports were also listed as CVE-1337-d00d1, CVE-1337-d00d2 and CVE-1337-d00d3, apparently labelling each researcher as a leet dude. 

The Google Chrome update also addressed a number of non-security issues such as cursors and backgrounds not loading, plugins not loading on some pages, stopping text paste including trailing spaces, and issues with touch controls on some sites. The fixed version of Chrome will be automatically downloaded by Chrome's auto-update mechanism.