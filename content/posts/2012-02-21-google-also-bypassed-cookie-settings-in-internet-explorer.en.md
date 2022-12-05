---
title: Google also bypassed cookie settings in Internet Explorer
date: 2012-02-21T15:49:00+00:00
layout: single
author_profile: true
url: 2012/02/21/google-also-bypassed-cookie-settings-in-internet-explorer/
tags:
  - Google
  - Internet Explorer
  - Microsoft
  - privacy
lang: en
category: techblog
---
**[<img title="mgcookies" border="0" alt="mgcookies" align="right" src="http://lh5.ggpht.com/-V3ZV3KV4htA/T0O2E2DuUGI/AAAAAAAAE5I/GnyDNE9ASnE/mgcookies_thumb%25255B1%25255D.png?imgmax=800" width="100" height="100" />](http://lh6.ggpht.com/-IF6fIjMotxg/T0O2BbEN-hI/AAAAAAAAE5A/-J80BnZLvS4/s1600-h/mgcookies%25255B3%25255D.png)H-Online.com:** Following the [revelation](/2012/02/google-found-evading-safari-privacy.html) that Google and other online marketing companies have been bypassing the mechanism for blocking third-party cookies in Safari, the Internet Explorer development team asked themselves whether Google might be doing the same thing in IE. As they [detail](http://blogs.msdn.com/b/ie/archive/2012/02/20/google-bypassing-user-privacy-settings.aspx) on IEBlog, they discovered that this was the case – Google circumvents Internet Explorer's cookie policy by subverting the browser's P3P-based privacy protection mechanism. 

[P3P](http://wikipedia.org/wiki/P3P) stands for Platform for Privacy Preferences Project and is an open W3C standard. It is intended to help both users and programs determine what sites do with personal data. The cookie management system in Internet Explorer blocks third party cookies from sites that do not supply a P3P policy statement telling it how cookies are used. 

According to Microsoft's analysis, Google exploits a vulnerability in the P3P specification. The specification states that browsers should ignore undefined policies, so that's exactly what Google delivers:

```shell
P3P: CP="This is not a P3P policy!<br />See http://www.google.com/support/accounts/bin/answer.py?<br />hl=en&answer=151657 for more info." 
```



This can be read and understood by human users, but, according to Microsoft, browsers that follow the P3P specification interpret this to mean that the cookie will not be used for tracking purposes. As a result Internet Explorer lets Google cookies pass.

Microsoft is advising users to download a tracking protection list to stop Internet Explorer from forwarding cookies to Google. The blog posting contains a link to the list, which can be installed from within Internet Explorer with a simple mouse click. Microsoft is also planning to look into ways of making Internet Explorer's cookie handling more secure. One possibility would be to ignore the P3P specification and block all cookies with undefined P3P policies.

According to a [2010 study](http://www.cylab.cmu.edu/files/pdfs/tech_reports/CMUCyLab10014.pdf) by Carnegie Mellon University, 11,176 of 33,139 sites examined use an invalid P3P specification. Google has now responded to Microsoft's allegation and, in an email to US media, it [describes](http://parislemon.com/post/17998654387/google-microsoft-is-full-of-shit) the system used by Internet Explorer as obsolete and “widely non-operational”.

Google points out that the link within the P3P policy does point to an [article](http://support.google.com/accounts/bin/answer.py?hl=en&answer=151657) which states their position on P3P. It also notes comments from a [security researcher](https://twitter.com/#!/csoghoian/status/171687280824692737) that “Instead of fixing P3P loophole in IE that FB & Amazon exploited &#8230; MS did nothing. Now they complain after Google uses it”. Facebook, at least, has the same [P3P policy style](http://validator.w3.org/p3p/20020128/p3p.pl?uri=http%3A%2F%2Fwww.facebook.com%2F) as Google, complete with [explanation](http://www.facebook.com/help/?page=219494461411349). At the time of writing, Amazon was returning a [valid P3P policy](http://validator.w3.org/p3p/20020128/p3p.pl?uri=http%3A%2F%2Fwww.amazon.com%2F).