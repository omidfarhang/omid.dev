---
title: Source code for Blackberry and iPhone spyware published
date: 2010-02-12T23:57:00+00:00
layout: single
author_profile: true
url: 2010/02/12/source-code-for-blackberry-and-iphone-spyware-published/
tags:
  - Apple
  - iphone
  - Mobile
  - news
lang: en
category: techblog
---
[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S3Xj4L1AzQI/AAAAAAAAA7g/5GeLHQ5cM-M/s320/bb9700.jpg)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S3Xj4L1AzQI/AAAAAAAAA7g/5GeLHQ5cM-M/s1600-h/bb9700.jpg)

At the [BlackHat DC](http://www.blackhat.com/html/bh-dc-10/bh-dc-10-home.html) conference and [SchmooCon](http://www.shmoocon.org/), Nicolas Seriot, an independent researcher and Tyler Shields of [Veracode](http://www.veracode.com/blog/) have independently presented two very similar papers.

The papers analyse weaknesses in security and application delivery models for iPhone and Blackberry and provide interesting read, especially if you are looking to write the next spyware application or a bot for one of the platforms.

For me, the most interesting part of the papers is the one that shows that regardless of the implemented security mechanisms like data caging, providing applications with its own private storage, a third party application will be able to access a lot of potentially confidential data, like contact lists, sms and email storage and even the Blackberry’s microphone.

It is known for some time that the application security model where the publisher verifies the integrity of the application (like Apple, Symbian or Google) and then publishes the application through an application store is not perfect, especially in a position where thousands of applications are published every month. It is simply not possible to check that all code behaves as the application’s developers claim.

For example, it is very easy to develop a game which sends SMS messages to buy additional game credits but at the same time forwards every received SMS-message to third party effectively creating a spyware application. As soon as the verification is not possible an element of trust kicks in. It is less likely that established developers will risk their own reputation to include a Trojan with their own product. That is why users should be careful when installing new applications from new and untrusted developers.

Once the rogue application is discovered a publishers certificate can be revoked, but it is too easy to enter the market again under a different name with the cost of obtaining a key being so low.

So, spyware for mobile phones of the recent generation, I suppose we can call them smartphones is possible. I am afraid that I fail to grasp the novelty. First malware for phones based on Symbian platform (still the most popular in the world, though the support is dwindling) appeared more than 6 years ago and we have not seen an explosion of malware as we have seen on Windows based personal computers.

I suspect that the reason lies in the lack of one leading mobile platform like on desktop which means that we will not see a deluge of malware for mobile phones before one of the platforms prevails. Of course, that does not mean we will not see an occasional outbreak or targeted attack here and there. We should always be cautious when installing new applications and aware that any new application is a potential security risk.

Gloomy predictions often serve for increasing awareness of one’s research and there is nothing wrong with that, although publishing of the spyware source code is a bit contentious (a point for an entirely different blog post) since the source can be easily changed by script kiddies to create new malware. We can only hope that these gloomy predictions will not become a gloomy reality and if they do SophosLabs will make sure you are protected, as usual.