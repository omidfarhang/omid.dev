---
title: WordPress hardened with XSS, DoS and SSRF fixes
date: 2013-06-25T10:57:44+00:00
layout: single
author_profile: true
url: 2013/06/25/wordpress-hardened-with-xss-dos-and-ssrf-fixes/
shortlink: https://g.omid.dev/15DocrF
image: /images/2013/06/WordPress_grey_120.png
tags:
  - News
  - security
  - Updates
  - WordPress
lang: en
categories: 
  - TechBlog
---
[![WordPress](/images/2013/06/WordPress_grey_120.png)](/images/2013/06/WordPress_grey_120.png)With the second security and maintenance release of WordPress 3.5, the developers of the popular open source blogging software have closed [12 bugs](http://core.trac.wordpress.org/query?status=closed&group=resolution&milestone=3.5.2), seven of them security issues. In their [announcement](http://wordpress.org/news/2013/06/wordpress-3-5-2/), the developers “strongly encourage” all users to update all their installations of the software to version 3.5.2 immediately. In addition to the fixed vulnerabilities, the new release also includes some proactive changes intended to harden the platform against attacks.

Security fixes in this release include measures to prevent server-side request forgery (SSRF) attacks. The TinyMCE editor, the external SWFUpload library and other components have been updated to fix cross-site scripting (XSS) holes; WordPress's own SWFUpload fork is used by the blogging platform to transfer files to the server, while TinyMCE is used as the software's content editor. A problem that could be exploited by attackers to perform denial-of-service (DoS) attacks on sites that use WordPress's password protection for posts has also been fixed.

WordPress 3.5.2 is available for [download](http://wordpress.org/download/) from the project's web site. Alternatively, existing users can update automatically via _Dashboard_ → _Updates_ in the WordPress admin interface. The [source code](http://wordpress.org/download/source/) for WordPress is licensed under the GPLv2 or later.

_Cross-posted from Heise-Security._