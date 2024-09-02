---
title: "&quot;Please do not take down the Sality botnet&quot;"
date: 2012-03-29T15:12:00+00:00
layout: single
author_profile: true
url: 2012/03/29/please-do-not-take-down-the-sality-botnet/
tags:
  - malware
  - news
  - report
lang: en
categories: 
  - techblog
---
<a href="http://www.h-online.com/security" target="_blank"><strong>The H-Security:</strong></a> On Tuesday, a user who is known as “lawabidingcitizen” posted an [unusual request](http://seclists.org/fulldisclosure/2012/Mar/315) to the Full Disclosure mailing list, a forum that is mainly used by the security community: “Please do not take down the Sality botnet.” The contributor says that he found a way of dramatically reducing the number of infected computers after analysing the botnet. He adds that the required actions are unlawful, however, but proceeds to describe the method in considerable detail and makes special tools for the task available. 

Essentially, the method involves exploiting the botnet update feature to inject a scrubbing tool that causes the trojans to remove themselves from the zombie computers. The author has also released an adapted version of AVG's Sality Removal Tool. In addition, lawabidingcitizen has developed a Python script that produces a list of the URLs that are currently used for updating the bot code. When tested by The H's associates at heise Security, the script did display URLs that deploy malicious code. Virus scanners such as Avast, G Data and Ikarus detected the Win32.Eldorado malware, which has connections to Sality. 

The released material does not explain how the files are replaced on the server, but since it can be assumed that the bot code is deployed via insecure web pages whose operators continue to be unaware, it is likely that the same holes still exist which were exploited to inject the malware – and that they can be used to overwrite the malicious code with the removal tool. 

According to Kaspersky's [2011/2012 security bulletin](http://newsroom.kaspersky.eu/fileadmin/user_upload/de/Downloads/PDFs/Kaspersky_Security_Bulletin_2012_final.pdf), Sality is one of the most wide-spread types of malware. It is thought that the bot has been used to send out spam and steal passwords, and that it can directly interact with other infected systems. 

The discussion around whether it should be legal to beat botnets with their own weapons isn't new. How far away we are from doing so is demonstrated by the German DNS Changer case: although the authorities can control the infected computers' data traffic, they can't take advantage of the possibility to redirect victims to an information page that explains the virus infection.