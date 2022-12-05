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
lang: en
category: techblog
---
[<img title="showip-1701" border="0" alt="showip-1701" align="right" src="http://lh6.ggpht.com/-h9A-oYjfQVk/T6AAusPzbZI/AAAAAAAAFy4/YaysZ2QU59k/showip-1701_thumb.jpg?imgmax=800" width="170" height="170" />](http://lh6.ggpht.com/-Tp1oKYaS4SU/T6AApIwBq2I/AAAAAAAAFyw/6UMRsnkswsY/s1600-h/showip-1701%25255B2%25255D.jpg)<a href="http://nakedsecurity.sophos.com/2012/05/01/privacy-concern-showip-firefox-add-on/" target="_blank">Cross-posted from SophosLabs</a>: A popular Firefox add-on appears to have started leaking private information about every website that users visit to a third-party server, including sensitive data which could identify individuals or reduce their security. 

Naked Security reader Rob Sanders alerted us to the activities of the recently updated [ShowIP add-on](https://addons.mozilla.org/en-US/firefox/addon/showip/) for the Firefox browser. 

According to the description on the Mozilla add-ons website, ShowIP is designed to “show the IP address(es) of the current page in the status bar. It also allows querying custom information services by IP (right click) and hostname (left click), like whois, netcraft, etc. Additionally you can copy the IP address to the clipboard.” 

Currently over 170,000 people are said to be using ShowIP. 

What the add-on's description doesn't say is that since version 1.3 (released on April 19th 2012) it has also sent &#8211; unencrypted &#8211; the full URL of sites visited using HTTPS, and sites viewed in Private Browsing mode, to a site called ip2info.org. 

The user never realises that the data has been shared with a third-party, unless they use special tools to monitor what data is being sent from their computer. 

SophosLabs researcher Xiaochuan Zhang examined the add-on, and observed the potential privacy breach in action. In the following example, he used Wireshark to view the network packets being sent and observed his request to visit a non-existent website “www.thisisapparentlyafakeservice.me” being shared with ip2info.org. 

[<img title="ip2info-wireshark" border="0" alt="ip2info-wireshark" src="http://lh5.ggpht.com/-mAYzpfX8SE4/T6AAyeJXeEI/AAAAAAAAFzI/oycp__D4iG4/ip2info-wireshark_thumb.jpg?imgmax=800" width="498" height="186" />](http://lh6.ggpht.com/-9aV28v7QKeE/T6AAwYJocTI/AAAAAAAAFzA/QhCB90oXQAw/s1600-h/ip2info-wireshark%25255B3%25255D.jpg) 

The full URL of every webpage visited is sent to the Germany-based ip2info.org website, using unencrypted connections. 

In addition, the add-on has no warning that sites you visit might be disclosed, no privacy policy small print explaining its behavior, and no apparent way to opt-out of the data-sharing. 

[<img title="showip-settings" border="0" alt="showip-settings" src="http://lh3.ggpht.com/-j0QfnfDMLR8/T6AA3jiQnDI/AAAAAAAAFzY/lL7cPkhUkLQ/showip-settings_thumb.jpg?imgmax=800" width="498" height="428" />](http://lh5.ggpht.com/-yo-7vDbk-6Q/T6AA0rV6TYI/AAAAAAAAFzQ/_kBaCD3Pk7I/s1600-h/showip-settings%25255B3%25255D.jpg) 

Sanders told Naked Security that the [issue was reported](https://code.google.com/p/firefox-showip/issues/detail?id=72) on the add-on's Google Code project page on 22nd April, but has received no response. Despite the alert, version 1.4 of the ShowIP add-on has since been released &#8211; and still exhibits the same behavior. 

[<img title="showip-privacy" border="0" alt="showip-privacy" src="http://lh5.ggpht.com/-PaLN_Ui4Bdc/T6AA9ON00RI/AAAAAAAAFzo/gAC393Mex_A/showip-privacy_thumb.jpg?imgmax=800" width="498" height="319" />](http://lh4.ggpht.com/-G58W1FJqESE/T6AA6BkHhxI/AAAAAAAAFzg/kRrA5mZFRK0/s1600-h/showip-privacy%25255B3%25255D.jpg) 

Sanders said that he hoped the apparent privacy lapse was the case of naivety rather than a developer with more malicious intentions: 

> <tt>"I suspect it's the work of a very naive developer, but who knows nowadays. What bothers me most is how this code managed to get approved on the Mozilla Addons site (not once, but twice) and how it's still there 12 days later."</tt>

The ip2info.org website itself appears to be very new, having only been registered a month ago. 

[<img title="ip2info-whois" border="0" alt="ip2info-whois" src="http://lh4.ggpht.com/-yssJOJ_E62k/T6ABBbCiAKI/AAAAAAAAFz4/tsVyoY9mc8E/ip2info-whois_thumb.jpg?imgmax=800" width="498" height="308" />](http://lh3.ggpht.com/-oRDxAUc5Gfw/T6AA_PJ6DyI/AAAAAAAAFzw/xT5mno22HhY/s1600-h/ip2info-whois%25255B3%25255D.jpg) 

And who appears to have registered the domain? A Berlin-based link marketing firm. 

[<img title="hats-on-marketing" border="0" alt="hats-on-marketing" src="http://lh5.ggpht.com/-mdKMPBbLWDU/T6ABHEJ0pTI/AAAAAAAAF0I/tO4pb-5uuEk/hats-on-marketing_thumb.jpg?imgmax=800" width="498" height="504" />](http://lh6.ggpht.com/-zxC-7DGzBAs/T6ABEIpdkcI/AAAAAAAAF0A/NFy_IDXZYKU/s1600-h/hats-on-marketing%25255B3%25255D.jpg) 

Hmm. 

We have asked the developers of ShowIP to comment on the apparent privacy issue, and will update this article with any response we receive.