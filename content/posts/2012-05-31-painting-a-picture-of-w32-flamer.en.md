---
title: Painting a Picture of W32.Flamer
date: 2012-05-31T12:40:00+00:00
layout: single
author_profile: true
url: 2012/05/31/painting-a-picture-of-w32-flamer/
tags:
  - Flame
  - malware
  - review
lang: en
category: 
  - techblog
---
Symantec Connect: The number of different components in [W32.Flamer](http://www.symantec.com/security_response/writeup.jsp?docid=2012-052811-0308-99) is difficult to grasp. The threat is a well designed platform including, among other things, a Web server, a database server, and secure shell communications. It includes a scripting interpreter which allows the attackers to easily deploy updated functionality through various scripts. These scripts are split up into &#8216;apps' and the attackers even appear to have something equivalent to an &#8216;app store' from where they can retrieve new apps containing malicious functionality. 

To get an idea of how all these components fit together, the best place to start is a file called _mssecmgr.ocx_. This is W32.Flamer's main file and it is the first element of the threat executed by an infected computer. The file _mssecmgr.ocx_ contains a large number of sub-components. A breakdown of the various components and how they are stored in this file are shown in Figure 1 below: 

[<img title="fig1" border="0" alt="fig1" src="http://lh6.ggpht.com/-xSxSQvpIQz4/T8dfz7nLYPI/AAAAAAAAGKE/12EUq_Ps7rs/fig1_thumb%25255B1%25255D.png?imgmax=800" width="500" height="292" />](http://lh4.ggpht.com/-k4yJmVosx8A/T8dfwjDegjI/AAAAAAAAGJ8/GIzgptZuVKY/s1600-h/fig1%25255B3%25255D.png) 

Continue Reading at Symantec Connect Blog: [http://www.symantec.com/connect/blogs/painting-picture-w32flamer](http://www.symantec.com/connect/blogs/painting-picture-w32flamer "http://www.symantec.com/connect/blogs/painting-picture-w32flamer")