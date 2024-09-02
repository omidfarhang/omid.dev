---
title: Dorkbot worm lurks on Skype and MSN Messenger again
date: 2013-02-11T19:04:00+00:00
layout: single
author_profile: true
url: 2013/02/11/dorkbot-worm-lurks-on-skype-and-msn-messenger-again/
tags:
  - alert
  - malware
  - Messenger
  - Microsoft
  - MSN
  - Skype
lang: en
categories: 
  - techblog
---
The Dorkbot/Rodpicom worm, which spreads via messaging applications and leads to additional malware infections, is currently doing rounds on Skype and MSN Messenger, [warns](http://blog.fortinet.com/rodpicom-botnet-upping-the-ante-of-chat-malware/) Fortinet. 

<a href="http://lh6.ggpht.com/-FNia7b_O5Vc/URk5q2ZBxAI/AAAAAAAAHtY/LG67i8tt5lU/s1600-h/skype-msn%25255B5%25255D.png" target="_blank"><img title="skype-msn" border="0" alt="skype-msn" align="right" src="http://lh6.ggpht.com/-Lm8iXofdV7o/URk5uTTP7mI/AAAAAAAAHtg/YsL4oNgUrDY/skype-msn_thumb%25255B1%25255D.png?imgmax=800" width="259" height="234" /></a>The vicious circle starts with potential victims receiving a direct message from a contact, asking “LOL is this your new profile pic? **http://goo.gl/[removed]**”. Those who follow the link land on a malicious site and are infected with the worm.  
Apart from being able to send out the aforementioned message to further potential victims, the malware is also capable of opening a backdoor into the infected system, downloading more malicious software, spamming, reaching out to its C&C server, downloading a new version of itself, and other malicious activities. The computer is essentially enslaved into a botnet and is ready to do the botnet master's bidding.  
It's interesting to note that the worm waits until the victims log into the chat app they use and then send out the messages. It is also able of changing the language of the message to be consistent with the language of the installed Windows operating system, making it more believable that the message has been sent by the user.  
According to FortiGuard Labs researcher Raul Alvarez, the malware is also equipped with a number of evasive and obfuscation techniques aimed at hiding its existence both from AV software and researchers. 

_Credit: Net-Security.org_