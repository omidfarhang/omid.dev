---
title: Password leak at meetOne
date: 2012-07-26T14:21:00+00:00
layout: single
author_profile: true
url: 2012/07/26/password-leak-at-meetone/
tags:
  - hack
  - leak
  - Password
  - report
lang: en
category: techblog
---
<a href="http://lh5.ggpht.com/-zKsyHPDHvv0/UBFLPzocjUI/AAAAAAAAGm8/1Jk8ivb-Egg/s1600-h/meetone200%25255B2%25255D.png" target="_blank"><img title="meetone200" border="0" alt="meetone200" align="right" src="http://lh3.ggpht.com/-RbdlT_F7rhI/UBFLWOY99VI/AAAAAAAAGnE/g3dX84g8R5Y/meetone200_thumb.png?imgmax=800" width="200" height="40" /></a>h-online: A data leak at the [meetOne](http://de.meetone.com/) dating site allowed anyone to access private data including the plaintext passwords, email addresses and real names of the site's approximately 900,000 members. To obtain the data, an attacker simply needed to increment a URL parameter. After they were informed by **The H**&#8216;s associates at heise Security, the operators soon closed the hole. 

When news of a data leak in one of the dating portal's custom APIs was disclosed to heise Security, the editors managed to reproduce the problem and access the data of a specially created test profile. The API disclosed information including the email address and password of the test user, which allowed access to the user's profile. 

Once logged in, the editors could have accessed any data, private messages and photos stored with the user profile. However, logging in wasn't actually required to retrieve sensitive information – most of the data was already available through the API. Labels such as &#8220;sexuality&#8221;, &#8220;childrenNumber&#8221;, &#8220;schooling&#8221;, &#8220;yearlyIncome&#8221;, &#8220;relationshipTyp&#8221; or &#8220;searchOneNightStand&#8221; provide some idea of the havoc a malicious data thief could have wreaked with this information. 

After heise Security informed meetOne co-founder Nils Henning, the vulnerability was closed within hours. Henning said that the &#8220;scope of the hole is limited&#8221; because &#8220;no sensitive data such as billing information was retrievable at any time&#8221;. The executive didn't clarify why the company thought that information such as plaintext user passwords was not considered to be &#8220;sensitive data&#8221;. 

The operators cannot guarantee that the hole has not been exploited in the past and say that they have &#8220;reset all passwords&#8221;. However, on checking at 7.30 pm on Wednesday evening, all passwords that were tested by heise Security were still functional. To be safe, users who have previously created a profile with this site should change their password – and, importantly, they should also change passwords on any other services where they may have used the same password. 

Founded in Germany, the dating portal is now operated by US company meetOne International LLC. Nils Henning continues to work for Hamburg-based meetOne GmbH, a company that now regards itself as a service provider to the LLC and &#8220;mainly handles support tasks&#8221;. 

[http://h-online.com/-1652783](http://h-online.com/-1652783 "http://h-online.com/-1652783")