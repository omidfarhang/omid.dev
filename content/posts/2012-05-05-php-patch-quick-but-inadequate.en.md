---
title: PHP patch quick but inadequate
date: 2012-05-05T19:25:00+00:00
layout: single
author_profile: true
url: 2012/05/05/php-patch-quick-but-inadequate/
tags:
  - PHP
  - security
  - Updates
  - Vulnerability
lang: en
category: techblog
---
[<img title="php" border="0" alt="php" align="right" src="http://lh4.ggpht.com/-AYBT2UispLs/T6V3uFbK68I/AAAAAAAAF58/T13rvx5zFWQ/php_thumb.png?imgmax=800" width="180" height="95" />](http://lh6.ggpht.com/-Cu0J300RYng/T6V3sHhQsrI/AAAAAAAAF50/eNMs7kndTd8/s1600-h/php%25255B2%25255D.png)The H-Online: The [updates](http://www.php.net/archive/2012.php#id2012-05-03-1) to PHP versions 5.3.12 and 5.4.2 released on Thursday do not fully resolve the [vulnerability](http://www.h-online.com/news/item/Critical-open-hole-in-PHP-creates-risks-Update-2-1567532.html) that was accidentally disclosed on Reddit, [according](http://eindbazen.net/2012/05/php-cgi-advisory-cve-2012-1823/) to the discoverer of the flaw. The bug in the way CGI and PHP interact with each other leads to a situation where attackers can execute code on affected servers. The issue remained undiscovered for eight years. 

The best protection at present is offered by setting up filter rules on the web server. However, the RewriteRule workaround described on PHP.net is also, according to security expert Christopher Kunz, inadequate. He suggests a slightly modified form of the rule as an [alternative](http://www.php-security.net/archives/11-Mitigation-for-CVE-2012-1823-CVE-2012-2311.html). 

Because the PHP interpreter for CGI does not comply with the specifications laid out in the CGI standard, URL parameters can, under certain circumstances, be passed to PHP as command line arguments. Servers which run PHP in CGI mode are affected; FastCGI PHP installations are not. The [PHP patch](https://github.com/php/php-src/commit/55869a95ab75c0eb99c57201bfeccaef57e0d36d) is supposed to ensure that parameter strings beginning with a minus sign and which do not contain an equals sign are ignored. According to the discoverer of the vulnerability, this can be bypassed easily. A new, slightly modified [patch](https://bugs.php.net/patch-display.php?patch=cgi.diff-fix-check.patch&bug_id=61910&revision=1336093719) which uses `query_string` instead of `decoded_query_string` for one comparison has already been submitted to the bug tracking system. 

Users can determine whether they are affected by the bug by appending the string `?-s` to a URL. If the server returns PHP source code, rapid action is required. A [Metasploit module](http://www.metasploitminute.com/2012/05/cve-2012-1823-php-cgi-bug.html) which opens a remote shell for executing arbitrary code on vulnerable servers is already available.