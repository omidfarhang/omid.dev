---
title: Firefox Extension Used in Facebook Scam
date: 2011-03-23T08:18:00+00:00
layout: single
author_profile: true
url: 2011/03/23/firefox-extension-used-in-facebook-scam/
tags:
  - Browser
  - Facebook
  - facebook phishing
  - Firefox
  - Firefox Addon
  - Mozilla
  - phishing
  - scam
lang: en
categories: 
  - TechBlog
---
**Symantec Connect:** Not only Facebook is adding new and interesting features to its toolbox; spammers and scammers in Facebook are, too. Currently there is a scam making rounds using a classic “who is viewing your profile” themed bait.

[<img title="fbspam1" border="0" alt="fbspam1" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TYmllKJ48kI/AAAAAAAADxY/P78cMefkU2w/fbspam1_thumb%5B3%5D.jpg?imgmax=800" width="493" height="85" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TYmli2cbRGI/AAAAAAAADxU/9bdQKrS8k3M/s1600-h/fbspam1%5B5%5D.jpg)

So far – nothing new. After the user grants the application the requested privileges, which of course will send out the above mentioned spam posts to all his or her friends, the user gets redirected to a download instruction site. There he or she is asked to download the Firefox browser and then install a popular Firefox extension which allegedly gets downloaded over 27,000 times per week. This simple tweak should generate a new menu entry in Facebook which would then show user statistics.

[<img title="fbspam2" border="0" alt="fbspam2" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TYmlpUBPE5I/AAAAAAAADxg/2bQylVixNaI/fbspam2_thumb%5B1%5D.jpg?imgmax=800" width="504" height="267" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TYmlnBT6kNI/AAAAAAAADxc/qanQ1cEM8SQ/s1600-h/fbspam2%5B3%5D.jpg)

Of course this “Facebook Connect” Firefox extension is not found on the official Mozilla domain but is hosted on a third-party site. This is not uncommon, so most users might ignore the generic warning displayed to them when installing the extension. Needless to say, the promised feature is not present in it. All the user has installed is a compiled Greasemonkey script which will open a remote site in a pop-up browser window each time the user visits [www.facebook.com](http://www.facebook.com/). Currently, the pop-up window promotes the same profile view feature scam mentioned beforehand, but this time the user has to fill in surveys in order to get through to it. Of course, this content could be changed at any time to something even more dangerous.

[<img title="fbspam3LRG" border="0" alt="fbspam3LRG" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TYmlulr-ZZI/AAAAAAAADxo/LWESDZK-IbI/fbspam3LRG_thumb%5B1%5D.jpg?imgmax=800" width="504" height="397" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TYmlr7JTPcI/AAAAAAAADxk/KSNLq58GPYg/s1600-h/fbspam3LRG%5B3%5D.jpg)

If you accidently installed the Firefox extension you can uninstall it from the browser menu: Tools-> Add-ons. There you can also see that the extension is honest enough and tells you exactly what it intends to do, which is: “automaticly (sic) open popup on facebook”.

[<img title="fbspam4" border="0" alt="fbspam4" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TYmlzLonhRI/AAAAAAAADxw/CFyq__Bzb-A/fbspam4_thumb%5B1%5D.jpg?imgmax=800" width="504" height="248" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TYmlw_NHLbI/AAAAAAAADxs/SUd8bfLGxLI/s1600-h/fbspam4%5B3%5D.jpg)

Facebook’s security team already reacted and removed the offending applications and the corresponding posts from the user space. But as always keep an eye or two open, since where there is one scam, there are more to follow.

We also have seen the same extension being advertised in manual script scams. These are the ones where you get redirected to a Web site that asks to copy/paste some obfuscated javascript into the browser or even better, asks the user directly to post the message at least five times on Facebook.

An easy and good protection step against this variant is to enable the SSL login on Facebook, since the pop-up is only generated when the http version is loaded and not on the https site. In addition, this will help secure your session from sniffer shenanigans like those in the Firesheep extension.