---
title: Bots, bots, and again bots
date: 2010-03-22T13:48:00+00:00
layout: single
author_profile: true
url: 2010/03/22/bots-bots-and-again-bots/
tags:
  - malware
  - review
  - YouTube
lang: en
categories: 
  - TechBlog
---
Today we are going to take a closer look at bots and botnets. On the black market, selling bots and botnets is quite profitable, which makes creating them a popular activity for criminals. It helps that bot sources and creation kits are available on the Internet, allowing even script kiddies to create their own botnets. Another reason bots get created is that some people who get bored in their daily lives tend to do things that in their opinion might earn them respect or admiration in front of their peers or in various Internet chat rooms.

Let's just clarify briefly what we mean when we say “bot” and “botnets”. A “botnet” is a set of computers controlled by a “command –and-control” (C&C) computer to execute commands as directed. The C&C computer can issue commands directly or by using a decentralized mechanism. Computers in the botnet are often called “bots” or “zombies”. A “bot herder” or “bot master” is the person who controls the botnet.

One common way botnets spread is through [torrents](http://en.wikipedia.org/wiki/BitTorrent_(protocol)). Even though it might not seem too productive in terms of bots per day, it's one of the easiest. In this context there are two categories of bot herders:  the newcomers and those that have been in the field for quite some time. Those that are new to this activity just seed an infected torrent, which the webmaster will take out. This means that in a very short time the infected torrent is removed and their account is banned. The guys that know what they're doing seed several clean torrents and from time to time they seed an infected one. Basically they're trying to imitate what a normal uploader does. By building and having a good reputation as an uploader/seeder, their account won't be banned so easily. Other popular ways of spreading are through YouTube, various chat rooms, and social networks. Functionality can be added to bots so they spread faster through instant messenger programs and [USB sticks (removable drives)](http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?Name=Worm:Win32/Autorun). These methods are more efficient in terms of how many computers get infected per day.

In order to control all those infected computers some criminals may buy offshore virtual private server (VPS) systems. They can get these for as little as 10 USD per month (most probably paid with stolen credit cards or PayPal accounts) and with full root access. Once the IP from their VPS is reported and banned (for botnet activity), the criminals can buy another one. That's also one of the reasons that they use dynamic DNS, so if one IP gets banned, in a matter of seconds they can have another system up and running and linked to the domain name. After that, it's trivial to set up a Web interface with PHP and SQL server on the VPS. For example, some versions of Zbot come with a multi-language Web panel that allows the herder to easily view and control the zombies. The bot master has at his or her disposal information about the infected systems (OS version, OS language, country, IP, latency, online time, etc.) and is able to send various commands (download and execute files, execute local files, block URLs, reboot/shutdown the system, etc.).

Another way to control all those zombies is through password-protected IRC channels. In some cases this method might be preferred because there is no need to buy anything and it allows for the same degree of control, although it doesn't offer the same good-looking interface. Using an IRC client, an attacker might be able to easily control several botnets at once, just by switching from one window to another.

After creating a bot army, the bot master can sell or rent the bots for as cheap as 10c/bot. Most of those guys usually have tens or possibly hundreds of infected computers at their disposal, but there are people who control thousands or [tens of thousands](http://www.msnbc.msn.com/id/35456838/) of computers and possibly even more.

It's not that easy to get such high numbers. Most bots are quickly detected and removed from the infected systems. That's why there is a continuous struggle in the criminal's world to develop and use obfuscators to make the bots harder to detect by antivirus programs. Another way to fight botnets is by taking down their ISPs or those ISPs that are protecting these criminals. Exactly [this](http://www.msnbc.msn.com/id/35814770/ns/technology_and_science-security/) happened to the Troyak ISP last week, and even though those command-and-control servers are most likely going to be back online, it will take some time until they will regain “their strength.” That's why we recommend installing an antivirus solution to stay protected from such pests.