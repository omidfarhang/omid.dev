---
title: PHP 5.4.1 and PHP 5.3.11 released
date: 2012-04-27T10:52:00+00:00
layout: single
author_profile: true
url: 2012/04/27/php-5-4-1-and-php-5-3-11-released/
tags:
  - PHP
  - software
  - Updates
lang: en
category: techblog
---
[<img title="PHP_Logo_200" border="0" alt="PHP_Logo_200" align="right" src="http://lh5.ggpht.com/-BGgB46bmln0/T5pzV-u3PbI/AAAAAAAAFvc/j3TNx6PVVSE/PHP_Logo_200_thumb.png?imgmax=800" width="200" height="105" />](http://lh6.ggpht.com/-F7Z2TjPDwGA/T5pzTjiFWEI/AAAAAAAAFvU/VcvhjJCofcI/s1600-h/PHP_Logo_200%25255B2%25255D.png)The H-Online: The [PHP](http://www.php.net/) developers have [released](http://www.php.net/index.php#id2012-04-26-1) the first update for PHP 5.4, the latest version of their popular scripting language, and an update to PHP 5.3, the older stable branch of the language. The developers say “All users of PHP are strongly encouraged to upgrade” to the new releases. 

PHP 5.4.1 has more than 20 bug fixes, including some related to security. One security bug concerned insufficient validating of the an upload name, which then led to corrupted `$_FILES` indices. Another notable change was `open_basedir` checks being added to `readline_write_history` and `readline_read_history`. 

The PHP 5.3.11 update fixes nearly 60 bugs including correcting a regression in a previously applied security fix for the `magic_quotes_gpc` directive. A new debug info handler was also added to DOM objects, and the developers have added support for version 2.4 of the Apache web server. 

A full list of improvements and bug fixes for both versions can be found in the [PHP 5 change log](http://www.php.net/ChangeLog-5.php). PHP 5.4.1 and 5.3.11 are available to download as [source](http://www.php.net/downloads.php#v5) or as [Windows binaries](http://windows.php.net/download/) from the project's site. PHP is distributed under the terms of the [PHP License v3.01](http://php.net/license/index.php).