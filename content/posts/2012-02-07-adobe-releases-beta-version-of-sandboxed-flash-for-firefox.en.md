---
title: Adobe releases beta version of sandboxed Flash for Firefox
date: 2012-02-07T14:15:00+00:00
layout: single
author_profile: true
url: 2012/02/07/adobe-releases-beta-version-of-sandboxed-flash-for-firefox/
tags:
  - Adobe
  - Browser
  - Firefox
  - flash player
  - plugins
  - security
lang: en
category: techblog
---
[![Adobe_Flash_120](http://lh3.ggpht.com/-GBVR3YLElU4/TzErDkhfxBI/AAAAAAAAEiQ/aUXRPvy1-rk/Adobe_Flash_120_thumb%25255B2%25255D.png?imgmax=800 "Adobe_Flash_120")](http://lh5.ggpht.com/-6wed3iMag6s/TzEq1fZmB9I/AAAAAAAAEiI/QCs-64BydCU/s1600-h/Adobe_Flash_120%25255B4%25255D.png)

**The H-Online:** Adobe [has released](http://blogs.adobe.com/asset/2012/02/flash-player-sandboxing-is-coming-to-firefox.html) a public beta of a sandboxed version of its Flash plugin for Firefox in an effort to improve its security. The new “Protected Mode” for Flash, which has been in development for at least a year according to Adobe engineer Peleus Uhley, runs with restricted privileges and, to further limit its access to the system, can only access system resources through a broker. This should help intercept attackers trying to gain access to a system through malicious Flash files. 

The implementation is similar, says Uhley, to how Adobe Reader X's sandbox works and he points out that “since its launch in November 2010, we have not seen a single successful exploit in the wild against Adobe Reader X”. Development of the plugin has been assisted by Mozilla developers who have helped with “some of the more challenging browser integration bugs”. Uhley calls the plugin the “next evolutionary step in protecting our customers”. 

Google's Chrome browser has included a sandboxed version of Flash for a while, although that implementation was developed by Google themselves. The effectiveness of that sandbox and other security mechanisms in Chrome is why the browser [was recently recommended by the German government](/2012/02/06/german-government-makes-recommendations-for-secure-windows-pcs/) as part of securing a Windows PC. 

Firefox developers had also been working on Electrolysis. This was a more general, sandboxing solution, but work on that project [was suspended](http://lawrencemandel.com/2011/11/15/update-on-multi-process-firefox-electrolysis-development/) in November of last year. The Protected Mode plugin can be downloaded for Firefox 4.0 or later on Windows Vista and 7 [from the Adobe Labs site](http://labs.adobe.com/technologies/flashplatformruntimes/incubator/).