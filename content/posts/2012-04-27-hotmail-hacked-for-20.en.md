---
title: Hotmail hacked for $20
date: 2012-04-27T10:50:00+00:00
layout: single
author_profile: true
url: 2012/04/27/hotmail-hacked-for-20/
tags:
  - hack
  - Hotmail
  - news
  - report
lang: en
category: 
  - techblog
---
[<img title="hotmail-170" border="0" alt="hotmail-170" align="right" src="http://lh5.ggpht.com/-dSrekmxcvSs/T5pzBYeZjmI/AAAAAAAAFvM/pCqns4qh4gs/hotmail-170_thumb%25255B1%25255D.jpg?imgmax=800" width="170" height="128" />](http://lh3.ggpht.com/-FejudWx9FLQ/T5py_Qi7e_I/AAAAAAAAFvE/NuSUi7fgUiY/s1600-h/hotmail-170%25255B3%25255D.jpg)The H-Online: The whitec0de.com blog [reports](http://www.whitec0de.com/new-hotmail-exploit-can-get-any-hotmail-email-account-hacked-for-just-20/) that, for $20, a member of a hacker forum offered to crack any Hotmail account within a minute – and that he kept his word. Apparently, the hacker found out about a critical vulnerability in Microsoft's email service on a security forum, and the hole allowed him to change the passwords of arbitrary Hotmail users. 

The blog says that various users were affected as a result, for example because they used their Hotmail accounts to access services such as PayPal. Allegedly, the vulnerability was also exploited to change the ownership of particularly attractive, short account names such as ab@hotmail.com and xxx@hotmail.com. 

Benjamin Kunz Mejri, a security expert who discovered the hole at around the same time as the incidents described above, has released details about the vulnerability in [an advisory](http://www.vulnerability-lab.com/get_content.php?id=529). According to the expert, the hole was contained in the “password reset” functionality – during one step, the Hotmail server apparently checked the existence of a token but not its value. 

The advisory says that by injecting a token such as “+++)-” into certain requests, attackers were able to take control of any account. Kunz Mejri added that he notified Microsoft on 6 April, and that the company fixed the problem on 21 April.