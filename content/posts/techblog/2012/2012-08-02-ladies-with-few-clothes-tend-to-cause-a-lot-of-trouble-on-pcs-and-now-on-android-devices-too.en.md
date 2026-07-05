---
title: "Ladies with few clothes tend to cause a lot of trouble on PCs – and now on Android devices too"
date: 2012-08-02T14:21:00+00:00
layout: single
author_profile: true
url: 2012/08/02/ladies-with-few-clothes-tend-to-cause-a-lot-of-trouble-on-pcs-and-now-on-android-devices-too/
tags:
  - advice
  - analyze
  - Android
  - Malware
  - review
  - Sex
  - Security

categories:
  - TechBlog
---
Cross-posted from Surelist 

The appearance of a new Android malware family is not that surprising at all today. Especially when we talk about SMS Trojans which are one of the most popular and oldest type of threats created for extracting money from users. A new family of SMS Trojans named **Vidro** appeared a few days ago but we’ve already collected a lot of APK files with very similar functionality. At the moment all the samples we have found target users only from Poland. 

**Spreading** 

Trojan-SMS.AndroidOS.Vidro is spread via porn sites. The mechanism is very similar to the way the very first Android malware (Trojan-SMS.AndroidOS.FakePlayer) spread. If the user visits a porn site with a desktop browser he will see something similar to this: 

![208193738](/images/2012/08/208193738.png) 

But if the potential victim somehow visits the same website using an Android device, a porn web site will be ‘optimized’ for the smartphone: 

![208193731](/images/2012/08/208193731.png) 

After clicking on the link ‘Watch Now’, the user will be redirected to the web site called ‘Vid4Droid’ (vid4droid.com) which suggests to the victim that they download ‘The new Sexvideo App’: 

![208193732](/images/2012/08/208193732.png) 

A click on the ‘Install’ button will redirect the victim to a page containing an automatic download start which contains instructions on‘how-to-install-our-super-porno-app’ with a reminder to allow an installation of applications from unknown sources: 

![208193733](/images/2012/08/208193733.png) 

**Vidro description** 

After the installation of Vidro the following icon can be found in the main menu: 

![208193734](/images/2012/08/208193734.png) 

If the victim launches malware the first thing he’s going to see is the dialog box which invites him to agree with the terms and conditions. 

![208193735](/images/2012/08/208193735.png) 

But the ‘funny’ fact is that there’s no EULA and/or terms and conditions in the app. In other words, even if those conditions exist, there’s no possibility to read them. After clicking ‘Yes’ an SMS message to will be sent to a premium rate number. The premium rate number is **72908** (Polish) and the SMS text is **PAY {unique sequence of ciphers and letters}**. Each message cost 2 zl (0,5 Euro). We will discuss the SMS text later. Messages will be sent every 24 hours. All the data required for sending the expensive SMS is stored in the configuration file _‘setting.json’_. 

Vidro is also able to hide incoming SMS messages from specific numbers. We’ve seen already such functionality in Trojans like Foncy a Mania. 

Besides sending expensive messages Vidro is able to: 

  * Update the configuration file (which might contain a new premium rate number and SMS text) and update itself. For connecting to remote server the malware uses its own User-Agent string:_“Mozilla/5.0 (Linux; U; {app\_id}; {android\_version}; de-ch; Vid4Droid) AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30”_. 
  * Upload information about itself and the infected device to a remote server.

**Content provider and affiliate network** 

If you google ‘72908’ (the premium rate number from Vidro) you can find a Polish [forum](http://www.jak-zablokowac-platne-sms.waw.pl/?dir=forum&sub=142) which contains some complaints about this number. 

![208193736](/images/2012/08/208193736.png) 

Rough translation: 

_“How to remove ‘carmunity' from 72908 number? Help me.”_ 

 __

“It's probably some kind of virus, this SMS goes out from the phone, it’s better to disable it with your GSM provider, both outgoing and incoming.”
_“I want to disable.”_ 

Let’s take a deeper look at the malicious **vid4droid.com** domain. According to Robtex this domain is controlled by two name servers at **carmunity.de**; and the vid4droid.com mail server is handled at tecmedia.eu. 

![208193737](/images/2012/08/208193737.png) 

There is a number of hosts (like ‘sex-goes-mobile.biz’, ‘sexgoesmobile.biz’, ‘sexgoesmobil.com’ and similar) which share both name servers and mail servers with this domain. And if you visit one of these hosts you will be redirected to the web site **sexgoesmobile.com**. 

_Carmunity_ 

**Carmunity** is a German content and service provider company, whose “portfolio offers an array of creative and technical solutions, enabling businesses to generate and apply their own portals in the mobile internet”. This quote was copied from the English version of their web site (**carmunity.de**). 

![208193739](/images/2012/08/208193739.png) 

_Main page of Carmunity web site_ 

Contact information contains the physical address of this company. According to this, Carmunity is located in Bremen, Mary-Astell-Str. 2. If you google this address you can find that another German company called **Displayboy** has the same physical address. What do we know about this organization? Well, here are some quotes from their web site displayboy.com (no German version, only English): 

_“Welcome to DisplayBoy – the leading provider for adult affiliate marketing in the mobile Internet.”_ 

__ 

_“Right now, between 5%-10% adult website users are surfing sites with mobile phones. With Displayboy you can convert your existing mobile traffic in a snap. It's easy, simple and reliable.”_ 

![208193740](/images/2012/08/208193740.png) 

Do Carmunity and Displayboy have something in common? I think, yes 🙂 At least both companies are specialized in monetization of mobile traffic. 

_SexGoesMobile_ 

As was mentioned above, some host names use the vid4droid.com domain name and mail servers. And if you try to visit one of them you’ll be redirected to **sexgoesmobile.com**. Here is a part of the main page of this web site: 

![208193741](/images/2012/08/208193741.png) 

Yes, it’s an affiliate network created for monetizing mobile adult traffic. And there are some curious things inside. Let’s see what’s going on there. 

Many mobile affiliate networks (Russian ones at least) provide full access to various so-called ‘promotional tools’ to all participants. The SexGoesMobile affiliate network also offers various ‘promotional tools’. For example, you can create a mobile pay site using one of the existing templates: 

![208193742](/images/2012/08/208193742.png) 

Each template has its own domain name. And each affiliate who participates in SexGoesMobile has an ID. After choosing the template this affiliate is able to choose the target audience (‘mobile’ or ‘desktop’): 

![208193743](/images/2012/08/208193743.png) 

And finally an affiliate is able to generate a unique URL with his ID: 

![208193744](/images/2012/08/208193744.png) 

If the potential victim clicks on this unique link he will be redirected to the web site exgftube.mobi that contains fake video thumbnails. By clicking on one of this thumbnails the user will be redirected to the vid4droid.com web site where he will be invited to download vid4droid.apk file (Trojan-SMS.AndroidOS.Vidro). Do you remember the format of the SMS text in this malware? **PAY {unique sequence of ciphers and letters}**. This unique sequence of ciphers and letters will be generated on a remote malicious server based on the referrer (a unique URL with the ID of the affiliate). In other words, each affiliate ‘has’ his own SMS Trojan with unique SMS text. 

**Conclusion** 

The mobile malware industry and mobile malware services continue to evolve. A couple of years ago mobile affiliate networks were mostly Russian. Now we see that these affiliate networks appearing in other countries. Unfortunately, such networks have already become pretty effective and are an easy way to spread mobile malware and earn money illegally. And the ‘migration’ of affiliate networks will lead to new infections and huge money losses not only in Russia but in other countries as well.