---
title: More Spam with JavaScript redirectors
date: 2010-09-23T12:53:00+00:00
layout: single
author_profile: true
url: 2010/09/23/more-spam-with-javascript-redirectors/
tags:
  - alert
  - malware
  - review
  - spam
lang: en
categories: 
  - techblog
---
We received new spam emails which contain a JavaScript redirector in form of a HTML attachment. The emails we received have the subject “Consultation Appointment”.

[<img title="01-email" border="0" alt="01-email" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TJtGssyi4LI/AAAAAAAACfA/qjlrL6xc5uw/01-email_thumb%5B1%5D.png?imgmax=800" width="304" height="150" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TJtGrSp5TzI/AAAAAAAACe8/VqUWJgK_wbA/s1600-h/01-email%5B3%5D.png)

The decrypted JavaScript consists of new JavaScript code.

[<img title="02-JS-decrypted" border="0" alt="02-JS-decrypted" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TJtGuyPnRyI/AAAAAAAACfI/tEfMAXAszEE/02-JS-decrypted_thumb%5B1%5D.png?imgmax=800" width="329" height="29" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TJtGt6bd-CI/AAAAAAAACfE/jrGGWVESlA0/s1600-h/02-JS-decrypted%5B3%5D.png)

This JavaScript redirector loads yet another JavaScript from the internet. The domain which is hosting the malicious .js is registered to someone from Malaga. Domain tools show that this person has registered about 2.400 other domains.

[<img title="03-redirectedfile" border="0" alt="03-redirectedfile" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TJtGwiBv_dI/AAAAAAAACfQ/J3fJU5DGjdU/03-redirectedfile_thumb%5B2%5D.png?imgmax=800" width="304" height="19" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TJtGvhjAs6I/AAAAAAAACfM/zs9OVKK1qcY/s1600-h/03-redirectedfile%5B4%5D.png)

The downloaded file contains an invisible, hidden iframe which is supposed to download further code from the internet. The target behind that iframe is already offline, luckily.