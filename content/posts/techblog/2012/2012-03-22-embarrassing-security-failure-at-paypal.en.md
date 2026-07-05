---
title: Embarrassing security failure at PayPal
date: 2012-03-22T12:56:00+00:00
layout: single
author_profile: true
url: 2012/03/22/embarrassing-security-failure-at-paypal/
tags:
  - News
  - PayPal
  - Security

categories:
  - TechBlog
---
![paypal-logo](http://lh4.ggpht.com/-uvjzqLuN3sw/T2saX7jZffI/AAAAAAAAFRk/u6aq2SUsCSQ/s1600-h/paypal-logo%25255B3%25255D.jpg)

The H-Security: Until just a few days ago, web sites belonging to the world's largest online payment service contained a security vulnerability in a key component that could have been exploited by fraudsters to steal information from customers. PayPal fixed the vulnerability shortly after being notified of its presence by The H's associates at heise Security. The eBay subsidiary was, however, unable to give any information on how such a serious security problem could have remained undetected. 

A heise Security reader noticed that the search function on PayPal web pages was not filtering user input correctly, making it a simple matter to inject code into PayPal pages via a crafted URL. The problem affected pages at `https://www.paypal.com` which use SSL security. Customers log in to the site from these pages and also use them to make payments. For more information on why cross-site scripting vulnerabilities are a very real security problem, see the article [Password stealing for dummies](http://www.h-online.com/security/features/Password-stealing-for-dummies-747145.html) on The H. 

![paypal1](http://lh3.ggpht.com/-5dZtiATgX2o/T2saec3GgTI/AAAAAAAAFR0/YWDnEg0kEtY/s1600-h/paypal1%25255B3%25255D.png) 

PayPal emphasises its security credentials in its advertising and presents itself as a certified payment system, in part based on a [certificate issued by TÜV Saarland](https://www.paypal-deutschland.de/external/Tuev-Zertifikat-2011.pdf) _(PDF in German)_ in Europe. Reinhold Scheffel, managing director of tekit Consult, which certified PayPal, could only offer the following explanation for the problem, “When the inspection was carried out, the flaw described by … was not necessarily present”. PayPal did not consider itself able to answer specific questions on the incident. 

The prevalence of cross-site scripting (XSS) problems is no secret. Even bank web sites have been repeatedly afflicted by this type of vulnerability. Just last year, a school pupil discovered XSS vulnerabilities on 17 German bank web sites. That the market leader in online payments should be harbouring such an easily detected vulnerability at such a high profile location is nonetheless still pretty startling.