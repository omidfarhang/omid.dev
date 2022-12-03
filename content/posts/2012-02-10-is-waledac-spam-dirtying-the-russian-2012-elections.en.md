---
title: Is Waledac spam dirtying the Russian 2012 elections?
date: 2012-02-10T14:11:00+00:00
layout: single
author_profile: true
url: 2012/02/10/is-waledac-spam-dirtying-the-russian-2012-elections/
tags:
  - alert
  - review
  - spam
lang: en
category: techblog
---
**Symantec Connect:** Recently there have been several [reports](http://blogs.technet.com/b/microsoft_blog/archive/2012/02/03/update-on-kelihos-botnet-and-new-related-malware.aspx) about the re-emergence of a botnet variant (Kelihos), which Symantec detects as [W32.Waledac.C](http://www.symantec.com/security_response/writeup.jsp?docid=2012-020814-3639-99&om_rssid=sr-latestthreats30days). The [Waledac](http://www.symantec.com/security_response/writeup.jsp?docid=2008-122308-1429-99&tabid=2) family is a threat that has been monitored by Symantec for many years and was featured in numerous [blogs](http://www.symantec.com/connect/blog-tags/w32waledac) as well as a [white paper](http://www.symantec.com/content/en/us/enterprise/media/security_response/whitepapers/W32_Waledac.pdf). In the past, Waledac gained its infamy as a spamming botnet that utilized compromised systems to send out spam.  The purpose of these spamming campaigns had usually been for self-propagation of the threat through spam emails containing a link, often (but not always) pointing to a Waledac binary file hosted on a malicious website.  The variant W32.Waledac.C is also sending out spam emails, but with a twist. 

In one spam campaign, we observed it sending out the email seen below to only Russian target email addresses. 

[<img title="russian_mail" border="0" alt="russian_mail" src="http://lh4.ggpht.com/-A9_Bw5SkQys/TzUeiA9CraI/AAAAAAAAEp0/6bKVIcTON_Y/russian_mail_thumb%25255B1%25255D.jpg?imgmax=800" width="504" height="361" />](http://lh6.ggpht.com/-kd6UW2UQ4m4/TzUedx01I0I/AAAAAAAAEps/cWqeSHcIbGc/s1600-h/russian_mail%25255B3%25255D.jpg) 

Email translation (Rough translation) 

_This year Rospres celebrates another birthday &#8211; we are now 5 years old._ 

_All these years we were trying our best to bring to you the latest available information in its full integrity. In the nearest future we intend to work even harder for our readers, so they come back to our web portal again and again. We will be very happy to work for all visitors to <http://www.rospres.com/> !_ 

_With best wishes, Ruspres._ 

The Rospres.com link seen in the spam email leads to a slanderous article hosted on the Rospres.com site and can be seen in the picture below. We have found no evidence that the link contained in the spam email is used to propagate the threat. The site Rospres.com seems to contain numerous articles on high profile Russian individuals such as politicians and businessmen that could be considered slanderous. 

[<img title="russian_mail_2" border="0" alt="russian_mail_2" src="http://lh6.ggpht.com/-w4hww9dadtg/TzUem4BtJiI/AAAAAAAAEqE/23VqxSlizNA/russian_mail_2_thumb%25255B1%25255D.jpg?imgmax=800" width="504" height="410" />](http://lh5.ggpht.com/-JCBJ0PIn5yU/TzUekaBedbI/AAAAAAAAEp8/hYWrpWfMcv8/s1600-h/russian_mail_2%25255B3%25255D.jpg) 

The individual in this article is [Mikhail Prokhorov](http://en.wikipedia.org/wiki/Mikhail_Prokhorov) a Russian billionaire [oligarch](http://en.wikipedia.org/wiki/Oligarch) and an independent candidate in the [Russian 2012 elections](http://en.wikipedia.org/wiki/Russian_presidential_election,_2012) this March.  While it is not clear whether the intent of this Waledac spam campaign has been to push the site Rospres.com or to smear the election campaign of any individual, it does question the exact motivation of the malware gang controlling the [W32.Waledac.C](http://www.symantec.com/security_response/writeup.jsp?docid=2012-020814-3639-99&om_rssid=sr-latestthreats30days) variant.