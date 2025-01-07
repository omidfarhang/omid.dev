---
title: WordPress fixes file upload security problems
date: 2012-04-23T18:52:00+00:00
layout: single
author_profile: true
url: 2012/04/23/wordpress-fixes-file-upload-security-problems/
tags:
  - security
  - Updates
  - WordPress
lang: en
categories: 
  - TechBlog
---
[<img title="WordPress_200" border="0" alt="WordPress_200" align="right" src="http://lh6.ggpht.com/-GbENj31U-Tc/T5WdyMtkaSI/AAAAAAAAFmw/YtzLKWJgQkI/WordPress_200_thumb%25255B1%25255D.png?imgmax=800" width="200" height="45" />](http://lh3.ggpht.com/-h7QrTlJQ9tk/T5WdwJ55JfI/AAAAAAAAFmo/RxXwo8gHv00/s1600-h/WordPress_200%25255B3%25255D.png)The H-Security: The developers of the popular open source blog engine WordPress have [released](http://wordpress.org/news/2012/04/wordpress-3-3-2/) a security update for the software. WordPress 3.3.2 fixes unspecified bugs in three external file upload libraries used in the software and other security problems with the application. 

The bugs affect both WordPress's current file uploading library Plupload as well as the SWFUpload and SWFObject libraries; these were bundled with older versions of the application and might still be in use by certain plugins on the current versions of WordPress. The developers did not go into detail about the specifics of the security holes but thanked three people from the WordPress community for responsibly disclosing them. Three more fixes address a privilege escalation in the blog engine's multi-site system and two cross-site scripting vulnerabilities in the core components of WordPress. More details on all of these patches and also some additional smaller fixes can be found in the [change log](http://core.trac.wordpress.org/log/branches/3.3?rev=20552&stop_rev=20087). 

WordPress 3.3.2 can be [downloaded](http://wordpress.org/download/) from the project's web site and users can also update their installations of the software automatically from the Update menu in their site's Dashboard.