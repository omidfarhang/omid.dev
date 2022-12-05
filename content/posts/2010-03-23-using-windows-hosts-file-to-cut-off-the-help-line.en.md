---
title: Using Windows “hosts” file to cut off the help line
date: 2010-03-23T18:25:00+00:00
layout: single
author_profile: true
url: 2010/03/23/using-windows-hosts-file-to-cut-off-the-help-line/
tags:
  - malware
  - review
lang: en
category: techblog
---
We found this interesting and malicious little mechanism.

The hosts file on a machine under investigation was modified to redirect the victim’s browser to a well known legitimate site (in this case google.com) whenever he attempted to contact a list of nearly 400 sites. The list was a “Who’s Who” of the anti-malware world – most places where someone with an infected machine would go to get help.

The altered hosts file he found contained many lines beginning with ‘#’ followed by gibberish. These would be seen as comments by any browser and ignored. Concealed among the commented lines are lines containing the domain name redirections. When the commented lines are stripped, we find all the listed security related websites being redirected to “209.85.129.99” which is the IP address for google.com.

Some of the sites were:

```
209.85.129.99 lexikon.ikarus.at  
209.85.129.99 www.virusdoctor.jp  
209.85.129.99 www.spybotupdates.com  
209.85.129.99 securityresponse.symantec.com  
209.85.129.99 www.mcafee.com  
209.85.129.99 es.trendmicro-europe.com  
209.85.129.99 www.quickheal.co.in  
209.85.129.99 www.offensivecomputing.net  
209.85.129.99 research.sunbelt-software.com  
209.85.129.99 www.sunbeltsoftware.com  
209.85.129.99 www.sunbeltsecurity.com  
209.85.129.99 www.cwsandbox.org
```

The “hosts” file is in the Windows\system32\drivers\etc directory in Win XP, Win7 and Win08 Server – and probably all incarnations of Windows, since browsers are going to look there.

Learn more about [Hosts Here](http://sites.google.com/site/boelectronic/computer/security/hosts-file).

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S6kBWQ6aYqI/AAAAAAAABYw/hDyaLRPYpVM/s400/hosts_20file.png)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S6kBWQ6aYqI/AAAAAAAABYw/hDyaLRPYpVM/s1600-h/hosts_20file.png)