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
  - malware
  - Search
  - Yahoo
lang: en
category: techblog
---
<div dir="ltr" trbidi="on">
  <b>GFI Labs Blog:</b> We've noted this before, but Microsoft needs to get a handle on ad placements on Bing. Ok, so Bing isn't the most widely used search engine, but remember that Yahoo plays a part here as well.</p> 
  
  <p>
    In this case, we're talking Sirefef (ZeroAccess aka Max++), probably the nastiest piece of malware circulating on the &#8216;net right now. Sirefef kills any attempt to remove it, and is nearly impossible to clean (short of booting onto a rescue disk and performing cleanup actions, or reformatting).
  </p>
  
  <p>
    So just search for &#8220;adobe flash&#8221;, and you might see this ad:
  </p>
  
  <table align="center" cellpadding="0" cellspacing="0">
    <tr>
      <td>
        <a href="http://2.bp.blogspot.com/-LAmzXqz3E6w/TqRS5ubfO2I/AAAAAAAAEKM/1SbuNzfHTeg/s1600/bing2382348888.png" imageanchor="1"><img border="0" height="275" src="http://2.bp.blogspot.com/-LAmzXqz3E6w/TqRS5ubfO2I/AAAAAAAAEKM/1SbuNzfHTeg/s400/bing2382348888.png" width="400" /></a>
      </td>
    </tr>
    
    <tr>
      <td>
        (That same search term will look identical on Yahoo, since Yahoo displays Bing ads and search results.)
      </td>
    </tr>
  </table>
  
  <p>
    Which leads to an innocent-looking &#8220;download flash&#8221; page:
  </p>
  
  <div>
    <a href="http://4.bp.blogspot.com/-p4X9uBi42xo/TqRTV5iIlII/AAAAAAAAEKU/Rn7B1kgk0rE/s1600/bing2382348888a.png" imageanchor="1"><img border="0" height="275" src="http://4.bp.blogspot.com/-p4X9uBi42xo/TqRTV5iIlII/AAAAAAAAEKU/Rn7B1kgk0rE/s400/bing2382348888a.png" width="400" /></a>
  </div>
  
  <p>
    Note that the page isn't actually &#8220;GetAdobeFlash.com&#8221;. Instead, it redirects to a directory on a compromised trucking site (arulbrothers.com), downloading a file from torreandaluz (dot) com/flash/Flash Player 10 Setup.exe
  </p>
  
  <p>
    So let's download that Flash Player and run it through <a href="http://www.virustotal.com/file-scan/report.html?id=9a94bbce912c9d03b58be5c411d85a49f809e297fe6eee41a54122e0bbe2fac0-1318507455">VirusTotal</a>, and no surprise: It's Sirefef.</div>