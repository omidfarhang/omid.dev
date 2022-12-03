---
title: "Facebook Virus That Drains Your Bank Accounts: What You Need to Know"
date: 2013-06-06T08:43:10+00:00
layout: single
author_profile: true
url: 2013/06/06/facebook-virus-that-drains-your-bank-accounts-what-you-need-to-know/
image: /images/sites/3/2013/06/FB.png
tags:
  - alert
  - Facebook
  - Zeus
lang: en
category: techblog
---
_This post has been shared originally by <a href="http://blog.malwarebytes.org/intelligence/2013/06/facebook-virus-that-drains-your-bank-accounts-what-you-need-to-know/" target="_blank">Malwarebytes Blog</a>:_

The word about the [Zeus Trojan back on Facebook](http://bits.blogs.nytimes.com/2013/06/03/malware-that-drains-your-bank-account-thriving-on-facebook/) has spread as fast as the malware itself across many news sites.

Awareness and education about online dangers is essential but headlines like “Malware That Drains Your Bank Account Thriving On Facebook” instill fear while at the same time blame Facebook — something that may not be entirely justified.

Malicious links on social networking sites are nothing new (Twitter, Linkedin to name a few). They have been, and continue to be, abused by spammers to peddle fake AV or redirect to exploit sites distributing all sorts of nasties.

So what exactly is all the fuss about? Let’s have a look at this example [reported](http://bits.blogs.nytimes.com/2013/06/03/malware-that-drains-your-bank-account-thriving-on-facebook/) by the New York Times.

[<img class="alignnone size-full wp-image-6642" alt="FB" src="/images/2013/06/FB.png" width="558" height="291" srcset="/images/sites/3/2013/06/FB.png 558w, /images/sites/3/2013/06/FB-300x156.png 300w" sizes="(max-width: 558px) 100vw, 558px" />](/images/2013/06/FB.png)

&nbsp;

The fraudulent/spammy posts appear to be from either fake Facebook accounts or ones that were hijacked. The links all seem to have a similar pattern, where the country-code top-level domain name (ccTLD) is “tk”. This ccTLD belongs to Tokelau, a small territory part of New Zealand that’s regarded as a hotbed for all sorts of online fraud. Suricata/Emerging Threats even has a detection rule for “.tk” domains: “ET CURRENT_EVENTS DNS Query to a .tk domain – Likely Hostile”, which sums their trustworthiness rather well.

In this particular case, the “.tk” domain seen here is simply used as a redirector to another domain, _2bestmall . com_

[<img class="alignnone size-medium wp-image-6643" alt="counterfeit" src="/images/2013/06/counterfeit-300x148.png" width="300" height="148" srcset="/images/sites/3/2013/06/counterfeit-300x148.png 300w, /images/sites/3/2013/06/counterfeit.png 900w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/06/counterfeit.png)

Here we have a classic case of counterfeit merchandise where big brand names are advertised at 78% off of MSRP. Visitors who make a purchase have their payment processing done through another intermediary known as _billingcheckout . com_, which has a rather [poor reputation](http://www.mywot.com/en/scorecard/billingcheckout.com) according to Web of Trust (WOT).

[<img class="alignnone size-medium wp-image-6644" alt="checkout" src="/images/2013/06/checkout-300x78.png" width="300" height="78" srcset="/images/sites/3/2013/06/checkout-300x78.png 300w, /images/sites/3/2013/06/checkout.png 912w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/06/checkout.png)

The domain name billingcheckout.com was registered through TODAYNIC.com, INC, a Chinese registrar with unsurprisingly bogus registrant information. Ordering counterfeit goods may not be the smartest of ideas if the parcel is intercepted at the customs, and trusting a “company” like this with your credit card is definitely not something you want to do.

As far as the Zeus malware connection, the counterfeit website we identified belongs to an interesting hosting company that has many ties to malware activity:

[<img class="alignnone size-medium wp-image-6645" alt="safebrowsing" src="/images/2013/06/safebrowsing-300x174.png" width="300" height="174" srcset="/images/sites/3/2013/06/safebrowsing-300x174.png 300w, /images/sites/3/2013/06/safebrowsing.png 655w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/06/safebrowsing.png)

What’s more, if you dig deeper you will find the [link](https://zeustracker.abuse.ch/monitor.php?as=57858) to Zeus (courtesy of abuse.ch):

[<img class="alignnone size-medium wp-image-6646" alt="zeus" src="/images/2013/06/zeus-300x97.png" width="300" height="97" srcset="/images/sites/3/2013/06/zeus-300x97.png 300w, /images/sites/3/2013/06/zeus.png 909w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/06/zeus.png)

The Zeus Trojan is a rather notorious piece of malware that became extremely popular and inspired offshoots such as the [Citadel Trojan](http://blog.malwarebytes.org/intelligence/2012/11/citadel-a-cyber-criminals-ultimate-weapon/). It sits in the background and waits for the user to log into a sensitive site (such as a banking login screen) so that it can steal the password or even display fake pop-ups requiring the victim to enter additional confidential information.

It’s not the first time and it won’t be the last that links posted to Facebook pages and profiles will contain or redirect to malware. But does Facebook really sit idle while its users get infected? Not quite, as the social media platform has partnered with many security companies to offer a safer experience, including both WebSense and WOT.

[<img class="alignnone size-medium wp-image-6647" alt="webs" src="/images/2013/06/webs-300x125.png" width="300" height="125" srcset="/images/sites/3/2013/06/webs-300x125.png 300w, /images/sites/3/2013/06/webs.png 566w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/06/webs.png)

[<img class="alignnone size-medium wp-image-6648" alt="wot" src="/images/2013/06/wot-300x138.png" width="300" height="138" srcset="/images/sites/3/2013/06/wot-300x138.png 300w, /images/sites/3/2013/06/wot.png 608w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/06/wot.png)

I also feel this is a bit of a cheap shot because that same spam can be found elsewhere. This same ad has also appeared on Google’s Blogger, a service that I and many other professionals use to maintain their own blogs:

[<img class="alignnone size-medium wp-image-6649" alt="blogger" src="/images/2013/06/blogger-300x239.png" width="300" height="239" srcset="/images/sites/3/2013/06/blogger-300x239.png 300w, /images/sites/3/2013/06/blogger.png 512w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/06/blogger.png)

Facebook happens to be the largest social networking site and as such is one of the most coveted platforms for the bad guys, just like Microsoft’s Windows is for the operating systems.

These kinds of statements made from online news sources on this topic have undermined the incredible amount of work and resources spent on fighting cyber-crime, and fail to show the realities security researchers face every day. Cyber-criminals constantly adapt and up their game to defeat every new security measure put in place. Whether they are financially or politically motivated, cyber attacks will always exist.

End-users need to rely on a layered defense approach to best protect themselves. It is nice to know that Facebook and Google continue to try and protect us from browsing malicious sites, but we cannot expect them to block 100% of attacks. As always, good security software and best practices (such as being careful before clicking links) go a long way towards saving you from all the online dangers out there.