---
title: "Facebook: money mule or credit card"
date: 2009-12-22T11:11:00+00:00
layout: single
author_profile: true
url: 2009/12/22/facebook-money-mule-or-credit-card/
tags:
  - Facebook
  - phishing
  - scam
  - Security

categories:
  - TechBlog
---
I was just looking at Facebook to check for spam and scams when I found this:

![](/images/2009/12/208187965.jpg)

I've blurred out a few things for privacy, and, most crucially, safety. The point of this post is the domain name. The spaces around the dot and the zero in “C0M” are just as they were in the original spam message. If spammers are going to the trouble to obfuscate their messages, it seems to show that Facebook's spam filters are having some effect. Malformed links mean that you have to make an serious effort to actually go and visit the spammer site. And consequently, if someone's going to go through all that trouble, they're more likely to buy into whatever scam is at the other end. Click on the link, and you immediately get redirected, even though you won't notice:

![](/images/2009/12/208187974.jpg)

Some web filtering software would flag this sort of redirect as suspicious, even though it's been designed to evade filters. But probably this redirect has been put in place to generate revenue for an “affiliate program”, i.e. people who are getting money from referrals. Let's take a look at the web site that the redirect leads to:

![](/images/2009/12/208187975.jpg)

“The Massachusetts Financial Journal”. The bad guys are using GeoIP to determine your location and change the name of the Financial Journal according to the state or province your computer is located in. The headline looks like a money mule recruitment scheme: it's talking about working from home, a classic way to attract potential money mules. And there's a nice, personal story below the headline, which uses GeoIP to pull you in further. In other words, wherever you are, the scammers pinpoint your location, and then alter the story to look like it's coming from someone in your area.

![](/images/2009/12/208187967.jpg)

Continuing the page:

![](/images/2009/12/208187966.jpg)

This site is using classic social engineering methods to make the scheme sound legitimate. It mentions Google – and everyone knows you can make money off GoogleAds, right? So why not use Google Profit? What you need to do is very simple:

![](/images/2009/12/208187981.jpg)

And there are a whole lot of comments urging you on:

![](/images/2009/12/208187970.jpg)

Unfortunately, it's a scam. Click on any of the links above and you end up here:

![](/images/2009/12/208187978.jpg)

Even though you've clicked on a link saying “Google Profit” it's not mentioned on this page. There's an affiliate link, and to those in the know, it looks like a classic money mule scheme: it promises the opportunity to make money by working from home, with no experience necessary. Fill out your details, click on “Check availability”, and it doesn't look like a money mule scam any longer.

![](/images/2009/12/208187976.jpg)

You'll have to pay about $2 to get access to “Search Secret Systems”. But a quick look at the fine print reveals a heftier sum:.”On the 7th day my credit card will automatically be charged an easy payment of $89.26 once a month for three months. After the three months you will not be billed again.” So it's not a standard money mule scam, even though it looks like it. A search for this specific domain reveals it's ‘just' a standard credit card fraud scam – get the card details, charge them, and then run with the money…

![](/images/2009/12/208187972.jpg)

What's interesting is that we've seen this scam being used many many times to recruit money mules; now it's being leveraged for classic credit card fraud. There are lots of ways to stay clear of Internet fraud, but one golden rule: if you're given a link to click, but you have to remove spaces, or extra characters, or do anything else so you can click it? Don't!
