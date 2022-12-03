---
title: What does PHP stand for? Probable Hacked Page?
date: 2010-05-11T13:45:00+00:00
layout: single
author_profile: true
url: 2010/05/11/what-does-php-stand-for-probable-hacked-page/
tags:
  - hack
  - malware
  - PHP
  - report
  - review
lang: en
category: techblog
---
Late last week, the wires were buzzing over news that the official site of PHP-Nuke _“**Professional Content Management System**“_ was serving malware. I am frankly amazed to see the site still infected 4 days later.

<img title="crawler" border="0" alt="crawler" src="http://lh6.ggpht.com/_vaUVXcmC3OI/S-lYcegzZ6I/AAAAAAAACGw/IJbeSETNPi8/crawler%5B6%5D.jpg?imgmax=800" width="449" height="346" /> 

We see hacked sites everyday and the majority are running PHP-driven applications such as Content Management Systems (CMS). The PHP-Nuke site is currently running PHP v. 5.2.9. 

> Server: Apache/2.2.11 (Unix) mod\_ssl/2.2.11 OpenSSL/0.9.8e-fips-rhel5 mod\_auth\_passthrough/2.1 mod\_bwlimited/1.4 FrontPage/5.0.2.2635 PHP/5.2.9

The current version is 5.3.2. I wonder though has the web admin updated their own version of PHP-Nuke? 

[<img title="nuke81" border="0" alt="nuke81" src="http://lh4.ggpht.com/_vaUVXcmC3OI/S-lYgLUKhAI/AAAAAAAACG4/Np-xRWt8ZAs/nuke81_thumb%5B4%5D.jpg?imgmax=800" width="500" height="134" />](http://lh5.ggpht.com/_vaUVXcmC3OI/S-lYeF7f80I/AAAAAAAACG0/cqYoG39g5Qs/s1600-h/nuke81%5B7%5D.jpg) 

We often tell web admins after an infection to: 

  * Delete or restore from backup infected files. 
  * Patch/Update all software on the box. 
  * Change all password especially FTP ones (and restrict FTP access to a minimum). 
  * Review logs and policies to prevent another breach.

 

The failure to adhere to the second of these rules Patch/Update is the most likely route for infection in this case.

Note: While writing this post the site has been cleaned up.