---
title: WordPress 3.4 update closes important security hole
date: 2012-06-29T19:57:00+00:00
layout: single
author_profile: true
url: 2012/06/29/wordpress-3-4-update-closes-important-security-hole/
tags:
  - security
  - Updates
  - WordPress
lang: en
categories: 
  - TechBlog
---
<a href="http://lh3.ggpht.com/-SDHCMFQmafQ/T-4BsKNoSGI/AAAAAAAAGZI/4xH0Efd3_OA/s1600-h/WordPress%25255B2%25255D.png" target="_blank"><img title="WordPress" border="0" alt="WordPress" align="right" src="http://lh6.ggpht.com/-_t-FoAklhV4/T-4Bt9lQFTI/AAAAAAAAGZQ/X6oc-CyVH8Q/WordPress_thumb.png?imgmax=800" width="200" height="45" /></a>The [WordPress](http://wordpress.org/) developers have [released](http://wordpress.org/news/2012/06/wordpress-3-4-1/) version 3.4.1 of their popular open source publishing platform, fixing a number of bugs and closing security holes, one of which is rated as important. WordPress 3.4, which has already been downloaded 3 million times since being released two weeks ago, contains a important privilege escalation flaw that accidentally allowed all administrators and editors on multi-site installations to use [unfiltered_html](http://codex.wordpress.org/Roles_and_Capabilities#unfiltered_html). This could have been exploited by users for cross-site scripting (XSS) attacks by, for example, publishing posts containing malicious code. 

The update also fixes an information disclosure vulnerability which could have allowed some users to bypass certain security restrictions in order to view the contents of posts that they should not be able to see, such as draft and private posts. WordPress 3.4.1 further improves security by adding additional protections against [cross-site request forgery](http://en.wikipedia.org/wiki/Cross-site_request_forgery) (CSRF) attacks in the customizer, and deprecating the [wp\_explain\_nonce()](http://codex.wordpress.org/Function_Reference/wp_explain_nonce) function as it could reveal unnecessary information. Additionally, a child theme can now only be activated along with its intended parent theme. 

Changes unrelated to security include fixes for problems with category permalink structures and an issue that resulted in a theme's page template not being detected. WordPress now better handles plugins and themes that load JavaScript incorrectly, and improves compatibility with servers running certain versions of PHP. Early support for uploading images on iOS 6 devices has also been added. 

A full list of fixes can be found in the [WordPress Trac](http://goo.gl/SDSVx) and on the [Version 3.4.1 Codex page](http://codex.wordpress.org/Version_3.4.1). WordPress 3.4.1 is available to [download](http://wordpress.org/download/) from the project's site; existing users can upgrade using the [built-in update functionality](http://codex.wordpress.org/Updating_WordPress#Automatic_Update). Binaries and [source code](http://wordpress.org/download/source/) are [licensed](http://wordpress.org/about/license/) under the GPLv2 or later. 

[http://h-online.com/-1628769](http://h-online.com/-1628769 "http://h-online.com/-1628769")