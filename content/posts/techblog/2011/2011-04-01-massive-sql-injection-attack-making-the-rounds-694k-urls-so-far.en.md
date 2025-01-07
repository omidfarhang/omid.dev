---
title: Massive SQL injection attack making the rounds—694K URLs so far
date: 2011-04-01T22:23:00+00:00
layout: single
author_profile: true
url: 2011/04/01/massive-sql-injection-attack-making-the-rounds-694k-urls-so-far/
tags:
  - attack
  - hack
  - news
  - report
  - review
  - security
  - SQL
lang: en
categories: 
  - TechBlog
---
**[<img title="sql_img" border="0" alt="sql_img" align="right" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TZZJNEblu0I/AAAAAAAADzc/DKiO3KiMlvs/sql_img_thumb%5B2%5D.jpg?imgmax=800" width="154" height="116" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TZZJJOzqeiI/AAAAAAAADzY/FcnGCJKWL3Y/s1600-h/sql_img%5B4%5D.jpg)**

**Thanks to my friend, Pondus!**

**Ars Technica:** Hundreds of thousands of URLs have been compromised—at the time of writing, 694,000 (it’s over millions of site when you are reading this)—in an enormous and indiscriminate SQL injection attack. The attack has modified text stored in databases, with the result that pages served up by the attacked systems include within each page one or more references to a particular JavaScript file.

The attack appears to be indiscriminate in its targets, with compromised machines running ASP, ASP.NET, ColdFusion, JSP, and PHP, and no doubt others. SQL injection attacks, which exploit badly-written Web applications to directly perform actions against databases, are largely independent of the technology used to develop the applications themselves: the programming errors that allow SQL injection can be made in virtually any language. The underlying cause is a programmer trusting input that comes from a Web page—either a value from a form, or a parameter in a URL—and passing this input directly into the database. If the input is malformed in a particular way, the result is that the database will run code of the attacker's choosing.

In this case, the injected SQL is simply updating text fields within the database, to make them include an extra fragment of HTML. This HTML in turn loads a JavaScript from a remote server, typically “http://lizamoon.com/ur.php” or more recently, “http://alisa-carter.com/ur.php.” Both domain names resolve to the same IP address, and presently that server is not functional, leaving browsers unable to load the malicious script when they visit infected pages. Previously, it contained a simple script to redirect users to a fake anti-virus site.

The massive scale of these attacks (and the rapidly growing number of affected URLs) was first noticed by [Websense Security Labs](http://community.websense.com/blogs/securitylabs/archive/2011/03/29/lizamoon-mass-injection-28000-urls-including-itunes.aspx). On Tuesday, around 28,000 URLs were compromised; now more than 20 times more URLs are infected, and the numbers are still growing.

The injected code is also found on a number of product pages on Apple's iTunes Store. Apple fetches RSS feeds from podcasters that broadcast using iTunes, and in a number of cases these broadcasters have been compromised by the SQL injection attack. As a result, the malicious code has made its way into Apple's system. However, due to the way Apple processes the RSS feeds, there appears to be no exploitation vector; the injected HTML is safely nullified.

SQL injections following this pattern appear to have been happening off and on for six or more months now. The domain name hosting the JavaScript changes each time, but the file name—ur.php—and the style of injection remain consistent. The actions of the scripts have been similar too; pop-up windows and malware downloads. Previous efforts were on a much smaller scale, however: hundreds of compromised URLs instead of hundreds of thousands. In these earlier cases, the attacks originated from IP addresses in eastern Europe and Russia.

It's been a busy week for SQL injection; at the weekend, MySQL.com, the website of Oracle-owned open source database MySQL, [was hacked](http://seclists.org/fulldisclosure/2011/Mar/309), again using SQL injection. A little embarrassing for a database vendor to be unable to use its own database securely.