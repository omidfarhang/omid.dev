---
title: Comodo Group Issues Bogus SSL Certificates
date: 2011-04-02T08:43:00+00:00
layout: single
author_profile: true
url: 2011/04/02/comodo-group-issues-bogus-ssl-certificates/
tags:
  - report
  - review
  - security
lang: en
categories: 
  - TechBlog
---
**from** <a href="http://boelectronic.blogspot.com/www.schneier.com" target="_blank"><strong>Schneier on Security</strong></a> **by Schneier:**

[<img title="Comodo_ssl" border="0" alt="Comodo_ssl" align="right" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TZbataFG2ZI/AAAAAAAADzg/n-Zbjz-v6rA/Comodo_ssl%5B5%5D.jpg?imgmax=800" width="152" height="119" />This](http://www.wired.com/threatlevel/2011/03/comodo-compromise/) isn't good:

> The hacker, whose March 15 attack was traced to an IP address in Iran, compromised a partner account at the respected certificate authority Comodo Group, which he used to request eight SSL certificates for six domains: mail.google.com, www.google.com, login.yahoo.com, login.skype.com, addons.mozilla.org and login.live.com. 
> 
> The certificates would have allowed the attacker to craft fake pages that would have been accepted by browsers as the legitimate websites. The certificates would have been most useful as part of an attack that redirected traffic intended for Skype, Google and Yahoo to a machine under the attacker's control. Such an attack can range from small-scale Wi-Fi spoofing at a coffee shop all the way to [global hijacking of internet routes](http://www.wired.com/threatlevel/2008/08/revealed-the-in/).
> 
> At a minimum, the attacker would then be able to steal login credentials from anyone who entered a username and password into the fake page, or perform a “man in the middle” attack to eavesdrop on the user's session.

[More](http://threatpost.com/en_us/blogs/phony-web-certificates-issued-google-yahoo-skype-others-032311#) [news](http://www.bbc.co.uk/news/technology-12847072) [articles](http://www.zdnet.com/blog/security/microsoft-warns-fraudulent-digital-certificates-issued-for-high-value-websites/8488http://www.zdnet.com/blog/security/microsoft-warns-fraudulent-digital-certificates-issued-for-high-value-websites/8488). Comodo [announcement](https://www.comodo.com/Comodo-Fraud-Incident-2011-03-23.html).

Fake certs for Google, Yahoo, and Skype? Wow.

This isn't the first time Comodo has screwed up with certificates. The safest thing for us users to do would be to remove the Comodo root certificate from our browsers so that none of their certificates work, but we don't have the capability to do that. The browser companies — Microsoft, Mozilla, Opera, etc. — could do that, but my guess is they won't. The economic incentives don't work properly. Comodo is likely to sue any browser company that takes this sort of action, and Comodo's customers might as well. So it's smarter for the browser companies to just ignore the issue and pass the problem to us users.