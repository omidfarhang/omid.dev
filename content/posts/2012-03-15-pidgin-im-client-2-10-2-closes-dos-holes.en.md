---
title: Pidgin IM client 2.10.2 closes DoS holes
date: 2012-03-15T20:50:00+00:00
layout: single
author_profile: true
url: 2012/03/15/pidgin-im-client-2-10-2-closes-dos-holes/
tags:
  - Messenger
  - security
  - software
  - Updates
lang: en
category: 
  - techblog
---
[<img title="pidgin_logo200" border="0" alt="pidgin_logo200" align="right" src="http://lh3.ggpht.com/-5c4OwKVk6VM/T2JPFLrUE_I/AAAAAAAAFLE/oj96farkQS4/pidgin_logo200_thumb%25255B1%25255D.png?imgmax=800" width="200" height="92" />](http://lh4.ggpht.com/-icxB_nzfGWo/T2JPAe00III/AAAAAAAAFK8/J2efVwuok8Q/s1600-h/pidgin_logo200%25255B3%25255D.png)The H-Online: Version 2.10.2 of the open source [Pidgin](http://pidgin.im/) instant messaging program has been released. According to its developers, the maintenance and security update brings a number of changes and addresses two denial-of-service (DoS) vulnerabilities that could be exploited by an attacker to cause the application to be terminated. 

These remote crashes are caused when the MSN server sends messages that are not [UTF-8](http://en.wikipedia.org/wiki/UTF-8) encoded and also when some types of nickname changes occur in chat rooms using the [XMPP](http://en.wikipedia.org/wiki/Extensible_Messaging_and_Presence_Protocol) protocol. Versions up to and including 2.10.1 are affected. Pidgin 2.10.2 fixes these issues and all users are advised to upgrade. 

Non-security-related changes include support for a new version of the MSN protocol (MSNP18), fixes for the Bonjour protocol plugin on Windows systems, and the addition of support for the GNOME3 Network and Default Application dialog. The [libpurple](http://developer.pidgin.im/wiki/WhatIsLibpurple) library, used by Pidgin and other IM clients such as Adium and Meebo, has also been updated to support new connection states and signals for [NetworkManager](http://developer.pidgin.im/wiki/NetworkManager) 0.9+. 

Further information about the update, including a full list of changes, can be found in the security advisories and in the [change log](http://developer.pidgin.im/wiki/ChangeLog). Pidgin 2.10.2 is available to [download](http://pidgin.im/download/) from the project's site. Hosted on [SourceForge](http://sourceforge.net/projects/pidgin/), Pidgin is licensed under the GPLv2.