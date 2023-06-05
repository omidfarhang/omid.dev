---
title: Test of China Internet connections reveals heavy filtering
date: 2010-03-30T17:55:00+00:00
layout: single
author_profile: true
url: 2010/03/30/test-of-china-internet-connections-reveals-heavy-filtering/
tags:
  - Firefox
  - report
  - review
lang: en
categories: 
  - techblog
---
Using a Firefox 3.0 add-on created by developers in Hong Kong, Betanews was able to briefly establish a connection with the Internet via a proxy based in mainland China. With that proxy, we were able to confirm that searches performed using Google's Hong Kong-based page were effectively blocked.

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7IzNEd8wXI/AAAAAAAABag/4h_SosNCF5U/s400/4761.jpg)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7IzNEd8wXI/AAAAAAAABag/4h_SosNCF5U/s1600-h/4761.jpg)

Firefox 3.0 reported the blockage with this message: “The connection to the server was reset while the page was loading” — a message from the browser, not from an ISP. We used version 3.0.16 of Firefox (an older edition) because it is the only version compatible with China Channel, a tool made for the express purpose of testing China's filtering ability. It has not been upgraded for version 3.6.

Further tests using the same proxy connection revealed that filtering may not be limited to Google. Searches for innocuous topics using Baidu, the country's leading search service known to employ its own filtering, were also blocked. We confirmed that the failed Baidu attempts were on account of blockage rather than just a dropped connection by browsing immediately to Xinhuanet, the country's state-run news service.

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S7IzOlbdHUI/AAAAAAAABak/nEtrhgLIHJw/s400/4762.jpg)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S7IzOlbdHUI/AAAAAAAABak/nEtrhgLIHJw/s1600-h/4762.jpg)

Our proxy connection lasted for approximately eight minutes before all requests began timing out. During that period, we saw some evidence that, rather than just blocking Google specifically, China ISPs may be using a much broader form of blocking of .com addresses in general, at least with the range of IP addresses under which our successful proxy connection falls.

For example, we could not connect to Baidu's home page using **baidu.com**. However, we were successful using baidu.cn, an address which, for clients outside China, is redirected to **baidu.com** anyway. Other **.cn** addresses were accessible, but **betanews.com** was not — and I doubt we draw the attention of Chinese authorities enough to earn a spot on its blacklist.

The proxy IP address from which we were successfully able to establish the connection, should you wish to try this test for yourself, was: **218.14.227.197:3128**, which traces to Beijing. Port 3128 is normally associated with proxy servers.