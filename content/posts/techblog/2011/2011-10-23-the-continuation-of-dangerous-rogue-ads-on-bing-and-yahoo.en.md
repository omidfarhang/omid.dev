---
title: The continuation of dangerous rogue ads on Bing (and Yahoo)
date: 2011-10-23T18:19:00+00:00
layout: single
author_profile: true
url: 2011/10/23/the-continuation-of-dangerous-rogue-ads-on-bing-and-yahoo/
tags:
  - advice
  - alert
  - Bing
  - Malware
  - Search
  - Yahoo
  - Security

categories:
  - TechBlog
---
**GFI Labs Blog:** We've noted this before, but Microsoft needs to get a handle on ad placements on Bing. Ok, so Bing isn't the most widely used search engine, but remember that Yahoo plays a part here as well.

In this case, we're talking Sirefef (ZeroAccess aka Max++), probably the nastiest piece of malware circulating on the ‘net right now. Sirefef kills any attempt to remove it, and is nearly impossible to clean (short of booting onto a rescue disk and performing cleanup actions, or reformatting).

So just search for “adobe flash”, and you might see this ad:

[![](/images/2011/10/bing2382348888.png)](/images/2011/10/bing2382348888-dee9250a.png)

(That same search term will look identical on Yahoo, since Yahoo displays Bing ads and search results.)

Which leads to an innocent-looking “download flash” page:

[![](/images/2011/10/bing2382348888a.png)](/images/2011/10/bing2382348888a-daa339aa.png)

Note that the page isn't actually “GetAdobeFlash.com”. Instead, it redirects to a directory on a compromised trucking site (arulbrothers.com), downloading a file from torreandaluz (dot) com/flash/Flash Player 10 Setup.exe

So let's download that Flash Player and run it through [VirusTotal](http://www.virustotal.com/file-scan/report.html?id=9a94bbce912c9d03b58be5c411d85a49f809e297fe6eee41a54122e0bbe2fac0-1318507455), and no surprise: It's Sirefef.