---
title: Twitter Trend Poisoning Cookbook
date: 2010-12-07T13:30:00+00:00
layout: single
author_profile: true
url: 2010/12/07/twitter-trend-poisoning-cookbook/
tags:
  - report
  - review
  - spam
  - Twitter
  - Twitter Trend
lang: en
categories: 
  - techblog
---
**Symantec Connect:** We have become familiar enough with malware creators poisoning popular search engine terms through SEO techniques in order to deliver their malicious files to a greater pool of unsuspecting users. Other popular services such as Twitter have not escaped the watchful eyes of the miscreants. This attack involves pumping out many of the same tweets with different accounts to push them into the Twitter trending list. That way more people are likely to see them even if the individual user accounts being used to send the tweets don't have that many followers. Incidentally many of the accounts used in this attack don't have that many followers and are quite fresh – meaning they are probably fake accounts set up specifically for the purpose of spamming tweets.

To carry out this kind of attack, the miscreants are clearly following a tried-and-tested recipe, borrowed from [SEO-based attacks](http://www.symantec.com/connect/blogs/evolution-seo-poisoning) and tweaked for Twitter.

The recipe goes something like this:

  1. See what's in fashion 
  2. Find a suitable host 
  3. Mask the URLs 
  4. Start spreading the news 
  5. Repeat until cooked

**1. See what's in fashion**  
The miscreants are a pretty smart bunch when it comes to Web marketing. They do the research to know what people are interested in. They typically watch for latest newsworthy events or occasions and then zero in on them as the hook for their campaign. Attackers can watch the latest trending topics on Twitter to see what people are currently most interested in.

[![twitter_trending.article thumbnail](http://lh4.ggpht.com/_vaUVXcmC3OI/TP4vyRDYcQI/AAAAAAAADaU/cPi0eZrIO6s/twitter_trending.article%20thumbnail_thumb%5B1%5D.png?imgmax=800 "twitter_trending.article thumbnail")](http://lh5.ggpht.com/_vaUVXcmC3OI/TP4vv5ozQ6I/AAAAAAAADaQ/RfvQsA5OeOs/s1600-h/twitter_trending.article%20thumbnail%5B3%5D.png)

On December 2nd, one of the hooks used was the Jewish holiday, Hanukkah. As you can imagine, this step is quite fluid and most likely to change daily, making it hard to recognize and defend against. Once they know what hooks to use, they can then set about creating messages that use social engineering techniques to trick users into clicking on them.

Here are some example messages (note the trending Twitter terms planted randomly into the message):

  * Nobody cares about 🙂 **Hanukkah** 
  * Get me sex, woman, por fa vor! (((((( **Advent Calendar** 
  * Check this link and change your mind 'bout :)) Sundance 
  * Get through this viagra store and read a shocking article about F\*****k!!! 
  * What's in this trend OMG **World AIDS** 
  * Damned, I didn't know THAT about 🙁 Morgan Freeman

[![kalypa](http://lh3.ggpht.com/_vaUVXcmC3OI/TP4v3NXMdBI/AAAAAAAADac/mB7TV6iQtr0/kalypa_thumb%5B1%5D.png?imgmax=800 "kalypa")](http://lh6.ggpht.com/_vaUVXcmC3OI/TP4v0u-Z_SI/AAAAAAAADaY/9tPDnclYnNQ/s1600-h/kalypa%5B3%5D.png)

**2. Find a suitable host**  
Like any good parasite, the miscreants need to find a suitable host for their attack. Attackers these days typically choose a number of ways to host malware. They can use their own hosting, with a bullet hosting service. Alternatively they could use a bot under their control, rent a bot, or hack into a third party website. The latter choice is a low cost and quite effective option, especially when you consider the shelf life of these attacks—there little point in investing money in something that will be terminated in a few days.

Once a suitable host server is found, the choice is whether to attach the malcode to existing pages using a redirect or iframe or to create brand new pages specifically to host the malcode. The first option has the bonus of catching unsuspecting visitors to the site, as well as any traffic driven to the site by the attackers themselves. The second option limits the victims to those that the attackers direct to the page, but the advantage here is that the page can stay below the radar (i.e. if the page is not linked into any part of the real web site, nobody is likely to find it unless they went looking for it).

**3. Mask the URL**  
Masking URLs is clearly of great benefit to malware creators. Some URL-shortening services are used by mainstream publications and services like Twitter in order to conserve space. The downside is that the final destination of the link is hidden. Because of this obfuscation, it is more difficult for users to [recognize risky domains](http://www.symantec.com/connect/blogs/tinyurl-tiny-fear) let alone block them. Some URL shortening services are better than others in so far as they offer previewing capabilities. In the case of tiny.cc, it even offers a stats page where anybody can see how many hits were made as well as the destination of the shortened URL. Some services, such as bit.ly, have also integrated link blacklisting services, automatically filtering out attempts to create shortened links to known malware sites.

Based on the click stats of the shortened URLs (tiny.cc) used in this attack, we can see that a very large number of users may have potentially been compromised in this attack:

  * tiny.cc/swkw4 — 42340 clicks 
  * tiny.cc/3cxal — 42527 clicks 
  * tiny.cc/v123p — 42564 clicks 
  * tiny.cc/isuny — 43678 clicks

As far as we can tell, the shortened URLs were only created on December 1st.

[![tiny_url_isuny_stats](http://lh4.ggpht.com/_vaUVXcmC3OI/TP4v6f9o97I/AAAAAAAADak/Ckkdl3qL9TM/tiny_url_isuny_stats_thumb%5B2%5D.png?imgmax=800 "tiny_url_isuny_stats")](http://lh5.ggpht.com/_vaUVXcmC3OI/TP4v4oJIa7I/AAAAAAAADag/I9zEnyXB45g/s1600-h/tiny_url_isuny_stats%5B4%5D.png)

At this time, we have noted that the masked URLs end up at either mybuger.info or ljivore.info (through several levels of redirection). Mybuger.info uses a social engineering trick, asking the user to download a file to view a video (activex.exe – detected as [Trojan.Bamital](http://www.symantec.com/security_response/writeup.jsp?docid=2010-070108-5941-99)). Note that the URL in the browser says bestvideo.has.it but the content is actually from mybuger.info.

[![mybuger.article thumbnail](http://lh6.ggpht.com/_vaUVXcmC3OI/TP4v-LY3vEI/AAAAAAAADas/S0wRR51PbK4/mybuger.article%20thumbnail_thumb%5B1%5D.jpg?imgmax=800 "mybuger.article thumbnail")](http://lh5.ggpht.com/_vaUVXcmC3OI/TP4v8PGqeQI/AAAAAAAADao/pF9oyC0OGZc/s1600-h/mybuger.article%20thumbnail%5B3%5D.jpg)

The ljivore.info site hosts several exploits including:

  * [Adobe Reader &#8216;util.printf()' JavaScript Function Stack Buffer Overflow Vulnerability](http://www.securityfocus.com/bid/30035)
  * [Adobe Acrobat and Reader Multiple Arbitrary Code Execution and Security Vulnerabilities](http://www.securityfocus.com/bid/27641)
  * [Adobe Acrobat and Reader Collab &#8216;getIcon()' JavaScript Method Remote Code Execution Vulnerability](http://www.securityfocus.com/bid/34169)
  * [Adobe Reader and Acrobat &#8216;newplayer()' JavaScript Method Remote Code Execution Vulnerability](http://www.securityfocus.com/bid/37331)
  * [Adobe Reader &#8216;CoolType.dll' TTF Font Remote Code Execution Vulnerability](http://www.securityfocus.com/bid/43057)
  * [Oracle Java SE and Java for Business Unspecified Vulnerabilities](http://www.securityfocus.com/bid/39492)
  * [Oracle Java SE and Java for Business JRE Trusted Method Chaining Remote Code Execution Vulnerability](http://www.securityfocus.com/bid/39065)
  * [Apple QuickTime &#8216;\_Marshaled\_pUnk' Remote Code Execution Vulnerability](http://www.securityfocus.com/bid/42841)

Successful exploitation will result in the download and installation of the same executable file as found on mybuger.info.

**4. Start spreading the news**  
Once the initial ground work is done, the attackers need to get their malicious content to as wide a pool of people as possible. It is likely that the attackers have at their disposal a large collection of accounts from which they can automate the sending of messages. Automation of tweets can be quite easily done by creating bots to periodically and randomly send tweets from a predefined selection of messages created in step one and adding a shortened URL from step three. As the number of accounts used is likely to be quite large and tweets frequent, the likely overall effect is to push these tweets into the live Twitter feeds when users go to check the trending topics. In addition the tweets are also making use of features such as [hash tags](http://www.securityfocus.com/bid/42841) to help it reach an even wider audience.

While many of the accounts used appear to be created for the purpose of the attack, there may be some accounts used that are legitimate accounts that have been hacked. The advantage of tweeting through hacked accounts is that the account may already have a built-in network of followers. By tweeting through such an account you tweet to all its followers. This is indeed a powerful way to spread the news.

**5. Repeat until cooked**  
The last step of the process is to repeat the previous step as necessary until the goal is achieved. It is likely that the goal here is to make money (e.g. affiliate schemes). The final payload downloaded is Trojan.Bamital, which is used for manipulating search results to include links to adverts and so forth.  Because this is a profit-driven exercise, the attacker is likely to have an operational process that continually monitors and adjusts each step of the process to keep it working in a optimal manner, maintaining the flow of money. Despite the section title, this metaphorical goose is never going to be cooked so the process will continue indefinitely until either the money making avenues are closed or these guys are put out of business, neither of which are likely to happen anytime soon.

**Staying safe**  
In the mean time our best advice is to be wary of bizarre-looking messages on Twitter, particularly those found in the trending feeds and avoid following the links. To their credit, Twitter has put in place processes to stem the flow of malicious tweets coming from trend abusers.

Use a URL filtering/rating service such as [Norton Safe Web](http://safeweb.norton.com/) can help to keep you away from malicious sites. As this attack makes extensive use of software vulnerabilities, it is important to keep any installed software up-to-date, applying relevant security patches that are made available. Finally, keeping your antivirus and firewall software active and up-to-date is always a good idea.

The various files used in this attack are detected by Symantec with the following signatures:

  * [Trojan.Pidief](http://www.symantec.com/security_response/writeup.jsp?docid=2009-121708-1022-99)
  * [Trojan.Webkit!html](http://www.symantec.com/security_response/writeup.jsp?docid=2007-100915-0239-99)
  * [Trojan Horse](http://www.symantec.com/security_response/writeup.jsp?docid=2004-021914-2822-99)
  * [Trojan.Bamital](http://www.symantec.com/security_response/writeup.jsp?docid=2010-070108-5941-99)
  * [Bloodhound.Exploit.357](http://www.symantec.com/security_response/writeup.jsp?docid=2010-090901-2159-99)
  * [Bloodhound.Exploit.354](http://www.symantec.com/security_response/writeup.jsp?docid=2010-090107-0426-99)

IPS-enabled products are also capable of blocking the redirections and does so with this signature:  
[HTTP Malicious Toolkit IFrame Injection](http://www.symantec.com/business/security_response/attacksignatures/detail.jsp?asid=23444)

For more information on social networking based attacks and how to avoid them, please see [Candid Wueest's excellent paper](http://www.symantec.com/content/en/us/enterprise/media/security_response/whitepapers/the_risks_of_social_networking.pdf).