---
title: phpMyAdmin updates close XSS hole
date: 2011-08-25T18:29:00+00:00
layout: single
author_profile: true
url: 2011/08/25/phpmyadmin-updates-close-xss-hole/
tags:
  - PHP
  - security
  - Updates
lang: en
category: techblog
---
[![](http://1.bp.blogspot.com/-3VBBUJPC5KU/TlaNKEe56zI/AAAAAAAAD_Q/5_ZZYpeogYk/s1600/PhpMyAdmin_logo.png)](http://1.bp.blogspot.com/-3VBBUJPC5KU/TlaNKEe56zI/AAAAAAAAD_Q/5_ZZYpeogYk/s1600/PhpMyAdmin_logo.png)

**H-Online:** The [phpMyAdmin](http://www.phpmyadmin.net/) developers have [announced](http://www.phpmyadmin.net/home_page/news.php#phpMyAdmin_3.4.4_and_3.3.10.4_are_released) the release of [versions 3.4.4 and 3.3.10.4](http://sourceforge.net/mailarchive/message.php?msg_id=27992790) of their open source database administration tool. According to the security advisory, these maintenance and security updates close a hole ([CVE-2011-3181](http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2011-3181)) in the Tracking feature that leads to multiple cross-site scripting (XSS) vulnerabilities.

The exploit was discovered by Norman Hippert and is caused due to improper sanitisation when input is passed to the table, column and index names. For an attack to be successful, an attacker must be logged in via phpMyAdmin. Versions 3.3.0 to 3.4.3.2 are affected and the developers consider the problem to be serious. Updating to phpMyAdmin 3.3.10.4 or 3.4.4 fixes the problem. Alternatively, users can apply the provided patches.

Further information about the updates can be found in the [3.4.4](http://sourceforge.net/projects/phpmyadmin/files%2FphpMyAdmin%2F3.4.4%2FphpMyAdmin-3.4.4.html/view) and [3.3.10.4](http://sourceforge.net/projects/phpmyadmin/files%2FphpMyAdmin%2F3.3.10.4%2FphpMyAdmin-3.3.10.4.html/view) release announcements and in the project's security advisories. Versions 3.4.4 and 3.3.10.4 of phpMyAdmin are available to [download](http://www.phpmyadmin.net/home_page/downloads.php) from the project's site. Hosted on [SourceForge](http://sourceforge.net/projects/phpmyadmin/), phpMyAdmin is [licensed under the GPLv2](http://www.phpmyadmin.net/home_page/license.php).