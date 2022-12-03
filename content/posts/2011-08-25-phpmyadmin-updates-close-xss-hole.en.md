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
<div dir="ltr" trbidi="on">
  <div>
    <a href="http://1.bp.blogspot.com/-3VBBUJPC5KU/TlaNKEe56zI/AAAAAAAAD_Q/5_ZZYpeogYk/s1600/PhpMyAdmin_logo.png" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/-3VBBUJPC5KU/TlaNKEe56zI/AAAAAAAAD_Q/5_ZZYpeogYk/s1600/PhpMyAdmin_logo.png" /></a>
  </div>
  
  <p>
    <b>H-Online:</b> The <a href="http://www.phpmyadmin.net/">phpMyAdmin</a> developers have <a href="http://www.phpmyadmin.net/home_page/news.php#phpMyAdmin_3.4.4_and_3.3.10.4_are_released">announced</a> the release of <a href="http://sourceforge.net/mailarchive/message.php?msg_id=27992790">versions 3.4.4 and 3.3.10.4</a> of their open source database administration tool. According to the security advisory, these maintenance and security updates close a hole (<a href="http://www.cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2011-3181">CVE-2011-3181</a>) in the Tracking feature that leads to multiple cross-site scripting (XSS) vulnerabilities.
  </p>
  
  <p>
    The exploit was discovered by Norman Hippert and is caused due to improper sanitisation when input is passed to the table, column and index names. For an attack to be successful, an attacker must be logged in via phpMyAdmin. Versions 3.3.0 to 3.4.3.2 are affected and the developers consider the problem to be serious. Updating to phpMyAdmin 3.3.10.4 or 3.4.4 fixes the problem. Alternatively, users can apply the provided patches.
  </p>
  
  <p>
    Further information about the updates can be found in the <a href="http://sourceforge.net/projects/phpmyadmin/files%2FphpMyAdmin%2F3.4.4%2FphpMyAdmin-3.4.4.html/view">3.4.4</a> and <a href="http://sourceforge.net/projects/phpmyadmin/files%2FphpMyAdmin%2F3.3.10.4%2FphpMyAdmin-3.3.10.4.html/view">3.3.10.4</a> release announcements and in the project's security advisories. Versions 3.4.4 and 3.3.10.4 of phpMyAdmin are available to <a href="http://www.phpmyadmin.net/home_page/downloads.php">download</a> from the project's site. Hosted on <a href="http://sourceforge.net/projects/phpmyadmin/">SourceForge</a>, phpMyAdmin is <a href="http://www.phpmyadmin.net/home_page/license.php">licensed under the GPLv2</a>.</div>