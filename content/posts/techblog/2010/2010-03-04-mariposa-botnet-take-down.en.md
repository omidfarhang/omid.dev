---
title: Mariposa botnet take down
date: 2010-03-04T19:53:00+00:00
layout: single
author_profile: true
url: 2010/03/04/mariposa-botnet-take-down/
tags:
  - malware
  - review
lang: en
categories: 
  - TechBlog
---
Readers may well have read some of the news stories posted after yesterday’s news concerning the take down of the “Mariposa” botnet. So what is Mariposa?

Mariposa is the name given to a particular botnet that started getting some attention during the first half of 2009. The botnet was dubbed Mariposa thanks to the name of one of the C&C servers that is used:

> butterfly dot sinip dot es

since Mariposa is the Spanish word for butterfly.

The malware behind the botnet is commonly known as Rimecud or Palevo. The malware is distributed through a variety of mechanisms:

  * copying itself to removable storage devices
  * through instant messages
  * through P2P file-sharing applications

Once running on a victim machine, Rimecud connects to a C&C server in order to receive remote commands. As is typical for today’s botnets, functionality includes the ability for additional files to be downloaded and executed on compromised machines.

The Rimecud family typifies many of the characteristics we associate with today’s threats. A kit was used to facilitate creation of new variants – known as the _Butterfly Bot Kit_. Variants were packed using polymorphic techniques in an attempt to evade detection and obfuscate functionality. This in part explains the large volume of unique variants of Rimecud seen.

After some sterling work by the Mariposa Working Group (a joint effort between Spanish authorities in conjunction with various security firms), the Mariposa botnet was shut down at the end of 2009. At the time, it was reported that the botnet compromised over 12 million systems, which included many Fortune 100 listed companies.