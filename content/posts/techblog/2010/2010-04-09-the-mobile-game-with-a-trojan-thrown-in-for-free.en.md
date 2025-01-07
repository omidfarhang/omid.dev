---
title: The mobile game with a Trojan thrown in for free
date: 2010-04-09T16:31:00+00:00
layout: single
author_profile: true
url: 2010/04/09/the-mobile-game-with-a-trojan-thrown-in-for-free/
tags:
  - malware
  - Mobile
  - review
lang: en
categories: 
  - TechBlog
---
TSince 27 March a new game called 3D Antiterrorist has been cropping up on quite a few international freeware sites offering downloads for Windows Mobile smartphones. As well as the game itself, the 1.5 MB archive contains the file reg.exe which is actually a Trojan that calls premium rate international numbers and leaves smartphone owners significantly out of pocket. As of 8 April this malicious program has been detected by Kaspersky Lab as Trojan.WinCE.Terdial.a. Let’s take a closer look at what happens.

After the antiterrorist3d.cab installation file is launched, the game is installed in Program Files, while the malicious file reg.exe (5632 bytes) is copied to the system directory under the name smart32.exe.

A closer inspection of the malicious program’s code revealed that:

*   it was created by Russian-speaking virus writers;
*   calls are made to 6 different premium-rate numbers every 50 seconds;
*   it uses the CeRunAppAtTime function to self-launch, and it launches at night when the smartphone owner is most likely to be asleep.

Here is the list of numbers where the calls are made:

*   +882******7 – International Networks
*   +1767******1 – Dominican Republic
*   +882*******4 – International Networks
*   +252*******1 – Somalia
*   +239******1 – Sao Tome and Principe
*   +881********3 – Global Mobile Satellite System

A year ago we wrote about a porno dialer for smartphones running Symbian. The calls were made to international premium rate numbers to get access to adult content and the owner received advanced warning that a call was being made to an international pay-per-call number.

Now we’re dealing with the first malicious program that makes calls to international premium rate numbers, with the writer(s) of this illegal piece of malware getting rich at the expense of unsuspecting smartphone owners.