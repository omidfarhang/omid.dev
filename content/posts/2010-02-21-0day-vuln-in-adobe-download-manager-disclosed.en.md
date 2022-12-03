---
title: 0day vuln in Adobe Download Manager disclosed
date: 2010-02-21T19:18:00+00:00
layout: single
author_profile: true
url: 2010/02/21/0day-vuln-in-adobe-download-manager-disclosed/
tags:
  - 0-Day
  - Adobe
  - news
  - Vulnerability
lang: en
category: techblog
---
<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S4F_NCZJZOI/AAAAAAAAA-Q/Em4Z8gqPkFI/s1600-h/calc.png" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S4F_NCZJZOI/AAAAAAAAA-Q/Em4Z8gqPkFI/s640/calc.png" /></a>
</div>

First, make a note: after Adobe updates, restart your machine immediately to remove the Adobe Download Manger – it can be a vector for malcode.

Now, back to our story.

Aviv Raff has discovered a vulnerability with Adobe’s web site in combination with its Download Manager, an ActiveX script that is used to download updates for Reader and Flash. After a Reader or Flash update the download manager remains running on a user’s machine until it is rebooted. Malicious operators could exploit it to download their code of choice.

Raff demonstrated the flaw by using the download manager to download a copy of Windows calculator.

He has notified Adobe of the problem but not publically disclosed the finer details vulnerability.

Raff’s blog post <a href="http://aviv.raffon.net/2010/02/18/SkeletonsInAdobesSecurityCloset.aspx" target="_blank">here</a>.

News story <a href="http://www.ecommerce-journal.com/node/27022" target="_blank">here</a>.