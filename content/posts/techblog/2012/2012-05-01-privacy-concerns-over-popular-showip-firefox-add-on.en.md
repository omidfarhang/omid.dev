---
title: Privacy concerns over popular ShowIP Firefox add-on
date: 2012-05-01T15:58:00+00:00
layout: single
author_profile: true
url: 2012/05/01/privacy-concerns-over-popular-showip-firefox-add-on/
tags:
  - Firefox
  - Firefox Addon
  - Mozilla
  - privacy
  - review

categories:
  - TechBlog
---
![showip-1701](http://lh6.ggpht.com/-Tp1oKYaS4SU/T6AApIwBq2I/AAAAAAAAFyw/6UMRsnkswsY/s1600-h/showip-1701%25255B2%25255D.jpg)

[Cross-posted from SophosLabs](http://nakedsecurity.sophos.com/2012/05/01/privacy-concern-showip-firefox-add-on/): A popular Firefox add-on appears to have started leaking private information about every website that users visit to a third-party server, including sensitive data which could identify individuals or reduce their security. 

Naked Security reader Rob Sanders alerted us to the activities of the recently updated [ShowIP add-on](https://addons.mozilla.org/en-US/firefox/addon/showip/) for the Firefox browser. 

According to the description on the Mozilla add-ons website, ShowIP is designed to “show the IP address(es) of the current page in the status bar. It also allows querying custom information services by IP (right click) and hostname (left click), like whois, netcraft, etc. Additionally you can copy the IP address to the clipboard.” 

Currently over 170,000 people are said to be using ShowIP. 

What the add-on's description doesn't say is that since version 1.3 (released on April 19th 2012) it has also sent – unencrypted – the full URL of sites visited using HTTPS, and sites viewed in Private Browsing mode, to a site called ip2info.org. 

The user never realises that the data has been shared with a third-party, unless they use special tools to monitor what data is being sent from their computer. 

SophosLabs researcher Xiaochuan Zhang examined the add-on, and observed the potential privacy breach in action. In the following example, he used Wireshark to view the network packets being sent and observed his request to visit a non-existent website “www.thisisapparentlyafakeservice.me” being shared with ip2info.org. 

![ip2info-wireshark](http://lh6.ggpht.com/-9aV28v7QKeE/T6AAwYJocTI/AAAAAAAAFzA/QhCB90oXQAw/s1600-h/ip2info-wireshark%25255B3%25255D.jpg) 

The full URL of every webpage visited is sent to the Germany-based ip2info.org website, using unencrypted connections. 

In addition, the add-on has no warning that sites you visit might be disclosed, no privacy policy small print explaining its behavior, and no apparent way to opt-out of the data-sharing. 

![showip-settings](http://lh5.ggpht.com/-yo-7vDbk-6Q/T6AA0rV6TYI/AAAAAAAAFzQ/_kBaCD3Pk7I/s1600-h/showip-settings%25255B3%25255D.jpg) 

Sanders told Naked Security that the [issue was reported](https://code.google.com/p/firefox-showip/issues/detail?id=72) on the add-on's Google Code project page on 22nd April, but has received no response. Despite the alert, version 1.4 of the ShowIP add-on has since been released – and still exhibits the same behavior. 

![showip-privacy](http://lh4.ggpht.com/-G58W1FJqESE/T6AA6BkHhxI/AAAAAAAAFzg/kRrA5mZFRK0/s1600-h/showip-privacy%25255B3%25255D.jpg) 

Sanders said that he hoped the apparent privacy lapse was the case of naivety rather than a developer with more malicious intentions: 

> `"I suspect it's the work of a very naive developer, but who knows nowadays. What bothers me most is how this code managed to get approved on the Mozilla Addons site (not once, but twice) and how it's still there 12 days later."`

The ip2info.org website itself appears to be very new, having only been registered a month ago. 

![ip2info-whois](http://lh3.ggpht.com/-oRDxAUc5Gfw/T6AA_PJ6DyI/AAAAAAAAFzw/xT5mno22HhY/s1600-h/ip2info-whois%25255B3%25255D.jpg) 

And who appears to have registered the domain? A Berlin-based link marketing firm. 

![hats-on-marketing](http://lh6.ggpht.com/-zxC-7DGzBAs/T6ABEIpdkcI/AAAAAAAAF0A/NFy_IDXZYKU/s1600-h/hats-on-marketing%25255B3%25255D.jpg) 

Hmm. 

We have asked the developers of ShowIP to comment on the apparent privacy issue, and will update this article with any response we receive.