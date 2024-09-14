---
title: "Facebook Virus That Drains Your Bank Accounts: What You Need to Know"
date: 2013-06-06T08:43:10+00:00
layout: single
author_profile: true
url: 2013/06/06/facebook-virus-that-drains-your-bank-accounts-what-you-need-to-know/
image: /images/2013/06/FB.png
tags:
  - alert
  - Facebook
  - Zeus
lang: en
categories: 
  - techblog
---
_This post has been shared originally by [Malwarebytes Blog](http://blog.malwarebytes.org/intelligence/2013/06/facebook-virus-that-drains-your-bank-accounts-what-you-need-to-know/):_

The word about the [Zeus Trojan back on Facebook](http://bits.blogs.nytimes.com/2013/06/03/malware-that-drains-your-bank-account-thriving-on-facebook/) has spread as fast as the malware itself across many news sites.

Awareness and education about online dangers is essential but headlines like “Malware That Drains Your Bank Account Thriving On Facebook” instill fear while at the same time blame Facebook — something that may not be entirely justified.

Malicious links on social networking sites are nothing new (Twitter, Linkedin to name a few). They have been, and continue to be, abused by spammers to peddle fake AV or redirect to exploit sites distributing all sorts of nasties.

So what exactly is all the fuss about? Let’s have a look at this example [reported](http://bits.blogs.nytimes.com/2013/06/03/malware-that-drains-your-bank-account-thriving-on-facebook/) by the New York Times.

[![FB](/images/2013/06/FB.png)](/images/2013/06/FB.png)

&nbsp;

The fraudulent/spammy posts appear to be from either fake Facebook accounts or ones that were hijacked. The links all seem to have a similar pattern, where the country-code top-level domain name (ccTLD) is “tk”. This ccTLD belongs to Tokelau, a small territory part of New Zealand that’s regarded as a hotbed for all sorts of online fraud. Suricata/Emerging Threats even has a detection rule for “.tk” domains: “ET CURRENT_EVENTS DNS Query to a .tk domain – Likely Hostile”, which sums their trustworthiness rather well.

In this particular case, the “.tk” domain seen here is simply used as a redirector to another domain, _2bestmall . com_

[![counterfeit](/images/2013/06/counterfeit-300x148.png)](/images/2013/06/counterfeit.png)

Here we have a classic case of counterfeit merchandise where big brand names are advertised at 78% off of MSRP. Visitors who make a purchase have their payment processing done through another intermediary known as _billingcheckout . com_, which has a rather [poor reputation](http://www.mywot.com/en/scorecard/billingcheckout.com) according to Web of Trust (WOT).

[![checkout](/images/2013/06/checkout-300x78.png)](/images/2013/06/checkout.png)

The domain name billingcheckout.com was registered through TODAYNIC.com, INC, a Chinese registrar with unsurprisingly bogus registrant information. Ordering counterfeit goods may not be the smartest of ideas if the parcel is intercepted at the customs, and trusting a “company” like this with your credit card is definitely not something you want to do.

As far as the Zeus malware connection, the counterfeit website we identified belongs to an interesting hosting company that has many ties to malware activity:

[![safebrowsing](/images/2013/06/safebrowsing-300x174.png)](/images/2013/06/safebrowsing.png)

What’s more, if you dig deeper you will find the [link](https://zeustracker.abuse.ch/monitor.php?as=57858) to Zeus (courtesy of abuse.ch):

[![zeus](/images/2013/06/zeus-300x97.png)](/images/2013/06/zeus.png)

The Zeus Trojan is a rather notorious piece of malware that became extremely popular and inspired offshoots such as the [Citadel Trojan](http://blog.malwarebytes.org/intelligence/2012/11/citadel-a-cyber-criminals-ultimate-weapon/). It sits in the background and waits for the user to log into a sensitive site (such as a banking login screen) so that it can steal the password or even display fake pop-ups requiring the victim to enter additional confidential information.

It’s not the first time and it won’t be the last that links posted to Facebook pages and profiles will contain or redirect to malware. But does Facebook really sit idle while its users get infected? Not quite, as the social media platform has partnered with many security companies to offer a safer experience, including both WebSense and WOT.

[![webs](/images/2013/06/webs-300x125.png)](/images/2013/06/webs.png)

[![wot](/images/2013/06/wot-300x138.png)](/images/2013/06/wot.png)

I also feel this is a bit of a cheap shot because that same spam can be found elsewhere. This same ad has also appeared on Google’s Blogger, a service that I and many other professionals use to maintain their own blogs:

[![blogger](/images/2013/06/blogger-300x239.png)](/images/2013/06/blogger.png)

Facebook happens to be the largest social networking site and as such is one of the most coveted platforms for the bad guys, just like Microsoft’s Windows is for the operating systems.

These kinds of statements made from online news sources on this topic have undermined the incredible amount of work and resources spent on fighting cyber-crime, and fail to show the realities security researchers face every day. Cyber-criminals constantly adapt and up their game to defeat every new security measure put in place. Whether they are financially or politically motivated, cyber attacks will always exist.

End-users need to rely on a layered defense approach to best protect themselves. It is nice to know that Facebook and Google continue to try and protect us from browsing malicious sites, but we cannot expect them to block 100% of attacks. As always, good security software and best practices (such as being careful before clicking links) go a long way towards saving you from all the online dangers out there.