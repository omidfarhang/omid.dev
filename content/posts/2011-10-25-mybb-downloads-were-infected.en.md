---
title: MyBB downloads were infected
date: 2011-10-25T17:33:00+00:00
layout: single
author_profile: true
url: 2011/10/25/mybb-downloads-were-infected/
tags:
  - advice
  - alert
  - forum
  - malware
  - report
lang: en
category: techblog
---
[![](http://3.bp.blogspot.com/-A3rWc1eyZhU/TqbranNHc3I/AAAAAAAAEK4/eKHtIWE4ow0/s1600/MyBB_logo_200.png)](http://3.bp.blogspot.com/-A3rWc1eyZhU/TqbranNHc3I/AAAAAAAAEK4/eKHtIWE4ow0/s1600/MyBB_logo_200.png)

**[The H-Security](http://www.h-online.com/)**: In a blog posting, the MyBB [development team has confirmed](http://blog.mybb.com/2011/10/25/some-closure-on-the-1-6-4-security-vulnerability/) that the download package for version 1.6.4 of MyBB had been modified to include malicious code. Unknown attackers were able to exploit a vulnerability in the MyBB web site's CMS (content management system) to inject and execute PHP code.

The attackers placed a contaminated version of MyBB, containing a backdoor, on the server. It is unclear exactly when the hack took place, meaning that all downloads of 1.6.4 prior to 6 October could be affected. Users with MyBB systems are advised to check their installations and apply a patch. For rapid disinfection, the [developers are advising](http://blog.mybb.com/2011/10/06/1-6-4-security-vulnerabilit/) users to replace the /index.php file with a clean version and to delete the /install/ directory.

The MyBB development team is currently mulling over what conclusions can be drawn from the successful attack. One countermeasure they intend to take is to publish checksums to enable users to check that their downloads are genuine; however, this would not be particularly effective if the attackers have control of the server on which the checksums are store. A better solution would be digital signatures, since these cannot be faked without the secret key – though the problem with digital signatures is that, unless the update system does so automatically, almost no-one ever checks them.