---
title: Benign Feature, Malicious Use
date: 2010-04-09T17:05:00+00:00
layout: single
author_profile: true
url: 2010/04/09/benign-feature-malicious-use/
tags:
  - Browser
  - Firefox
  - Malware
  - review
  - Security

categories:
  - TechBlog
---
An interesting and unknown feature used by sysadmins around the world in some large corporate networks is the use of proxy-auto config (pac) files. This benign feature is accepted by all modern browsers and is described in detail [here](http://homepage.ntlworld.com./jonathan.deboynepollard/FGA/web-browser-auto-proxy-configuration.html). It contains a function to redirect your connection to a specific proxy server.

Unfortunately this simple and smart proxy technique are being largely used by brazilian malware writers to redirect infected users to malicious hosts serving phishing pages of financial institutions. A .pac script URL is configured in the browser, in the field “Use automatic configuration script”:

[![](/images/2010/04/2107.jpg)](/images/2010/04/2107-b8920cb9.jpg)

Here an example of a malicious .pac file in the wild:

[![](/images/2010/04/2108.jpg)](/images/2010/04/2108-500277a0.jpg)

After being infected by a Trojan banker, if a user tries to access some of the websites listed in the script, they will be redirected to a phishing domain hosted at the malicious proxy server. 

A lot of the Brazilian malware is using this trick nowadays. Not only Internet Explorer users are affected, but also users of Firefox and Chrome. The malware changes the file prefs.js, inserting the malicious proxy in it: 

[![](/images/2010/04/2109.jpg)](/images/2010/04/2109-91b374c0.jpg)

And finally to make sure the malicious proxy will be not removed by the user, a malicious DLL is inserted on initialization by rundll32.exe to always rewrite the proxy, if removed. 

This particular family of malware is detected and removed by our products with names such as Trojan.Bat.Proxy.
