---
title: Benign Feature, Malicious Use
date: 2010-04-09T17:05:00+00:00
layout: single
author_profile: true
url: 2010/04/09/benign-feature-malicious-use/
tags:
  - Browser
  - Firefox
  - malware
  - review
lang: en
category: techblog
---
An interesting and unknown feature used by sysadmins around the world in some large corporate networks is the use of proxy-auto config (pac) files. This benign feature is accepted by all modern browsers and is described in detail <a href="http://homepage.ntlworld.com./jonathan.deboynepollard/FGA/web-browser-auto-proxy-configuration.html" target="_blank">here</a>. It contains a function to redirect your connection to a specific proxy server.

Unfortunately this simple and smart proxy technique are being largely used by brazilian malware writers to redirect infected users to malicious hosts serving phishing pages of financial institutions. A .pac script URL is configured in the browser, in the field &#8220;Use automatic configuration script&#8221;:

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S79WNab_kBI/AAAAAAAAB2c/yXpEkmyW0Rk/s1600/2107.JPG" imageanchor="1"><img border="0" height="332" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S79WNab_kBI/AAAAAAAAB2c/yXpEkmyW0Rk/s400/2107.JPG" width="400" /></a>
</div>

Here an example of a malicious .pac file in the wild:

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S79WQoxXU9I/AAAAAAAAB2g/hN-BkpnQ9Ew/s1600/2108.jpg" imageanchor="1"><img border="0" height="225" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S79WQoxXU9I/AAAAAAAAB2g/hN-BkpnQ9Ew/s400/2108.jpg" width="400" /></a>
</div>

After being infected by a Trojan banker, if a user tries to access some of the websites listed in the script, they will be redirected to a phishing domain hosted at the malicious proxy server. 

A lot of the Brazilian malware is using this trick nowadays. Not only Internet Explorer users are affected, but also users of Firefox and Chrome. The malware changes the file prefs.js, inserting the malicious proxy in it: 

<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S79WTO_iOzI/AAAAAAAAB2k/9kAkhwAbzlc/s1600/2109.jpg" imageanchor="1"><img border="0" height="236" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S79WTO_iOzI/AAAAAAAAB2k/9kAkhwAbzlc/s400/2109.jpg" width="400" /></a>
</div>

And finally to make sure the malicious proxy will be not removed by the user, a malicious DLL is inserted on initialization by rundll32.exe to always rewrite the proxy, if removed. 

This particular family of malware is detected and removed by our products with names such as Trojan.Bat.Proxy.