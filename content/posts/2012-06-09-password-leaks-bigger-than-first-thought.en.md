---
title: Password leaks bigger than first thought
date: 2012-06-09T12:48:00+00:00
layout: single
author_profile: true
url: 2012/06/09/password-leaks-bigger-than-first-thought/
tags:
  - advice
  - hack
  - report
  - review
lang: en
category: 
  - techblog
---
![The published password hashes do not contain any email addresses or usernames](/images/2012/06/screenshot-08Jun12.png) The H-Online: There have still been no official statements on the causes and extent of the recent password leaks at [LinkedIn](/2012/06/linkedin-passwords-in-circulation.html), [eHarmony](http://www.h-online.com/news/item/eHarmony-admits-to-leaking-1-5-million-passwords-1612654.html) and [Last.fm](/2012/06/millions-of-lastfm-passwords-leaked.html). A credible source is now reporting that the published 2.5 million Last.fm MD5 hashes, for example, are just the tip of a 17 million hash iceberg. That iceberg has reportedly been circulating since summer 2011.16.4 million of these – 95 per cent – have, the source claims, already been cracked, a claim which, for unsalted hashes, is entirely credible. 

Since the lists do not contain any duplicates, it is likely that the number of affected users is in fact much larger than originally thought. Similarly, at LinkedIn, whose [official statement](http://blog.linkedin.com/2012/06/06/linkedin-member-passwords-compromised/) persists in using the seemingly harmless phrase “some passwords”, several factors suggest that the list of 6.5 million SHA1 hashes posted online may exclude simple passwords that have already been cracked. A blog post entitled [LinkedIn vs password cracking](http://erratasec.blogspot.de/2012/06/linkedin-vs-password-cracking.html) gives an excellent overview of the contemporary tools and techniques used to crack passwords. 

The concrete effects of this particular password leak are not yet clear. The publicly distributed lists do not include user names or email addresses. It would, however, seem reasonable to assume that whoever stole the passwords also has, and is using, this information. Last month Last.fm [admitted](http://www.last.fm/forum/21713/_/2051486/1?setlang=en) to having received several reports of spamming involving user data. Since identical spam is sometimes sent to email addresses from the LinkedIn and Last.fm leaks, it is more than likely that both databases have fallen into the same hands. 

There is also a first indication as to why Last.fm failed to implement rudimentary security measures to protect its users' passwords. According to someone claiming to be a former system architect at the company, design weaknesses in the music service's [mobile API](http://www.last.fm/api/mobileauth?setlang=en) architecture were responsible for the, by today's standards, weak encryption. The technique employed uses the password and client-side user name to calculate an access key. For the server to check this, it needs to store the password, which is secured only with MD5 hashes. The API was developed 9 years ago, and appears not to have been updated since. It's going to be interesting to see what comes to light regarding the reasons for the sloppiness at these companies. 

And one amusing detail – although eHarmony implores its users to use strong passwords including both upper and lower case letters, it saves the passwords in all upper case, thereby weakening its already weak security further. The hypocritical concern expressed by these companies has been covered in an editorial from **The H Security**: “[Comment: LinkedIn and its password problems](http://www.h-online.com/security/features/Comment-LinkedIn-and-its-password-problems-1612877.html)“.
