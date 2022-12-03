---
title: Icelandic Volcano Erupts, Fake Antivirus Spews Forth
date: 2010-03-22T23:43:00+00:00
layout: single
author_profile: true
url: 2010/03/22/icelandic-volcano-erupts-fake-antivirus-spews-forth/
tags:
  - ipad
  - malware
  - phishing
  - review
  - rogue software
lang: en
category: techblog
---
Yesterday there was a [volcanic eruption in Iceland](http://news.bbc.co.uk/2/hi/europe/8578576.stm), near the Eyjafjallajoekull glacier, that has led the Icelandic authorities to declare a state of emergency in southern Iceland. People living nearby have been evacuated in case of glacial melt water flooding and the airspace near the now active volcano is effectively closed off.  As you have probably already guessed, any event which commands a high level of public interest will be pounced on quickly by the makers of fake antivirus software in order to make a quick buck. This incident is no exception.

Web searches for subjects relating to this eruption, such as &#8220;Iceland Volcanic Eruption&#8221; or &#8220;Iceland Volcano&#8221;, will return results that may include dozens of hacked Web sites. It is not that difficult to spot the hacked sites with the fake antivirus redirection in the search results. Generally you should look for a pattern like this:

[LEGITIMATE DOMAIN]/[RANDOM STRING].php?[RANDOM PARAMETERS]

A reasonable rule of thumb I use in conjunction with this pattern is to look for domain names that suggest content unrelated to the news being searched for. For example, if you find a Web site whose domain name suggests it is about a painter or British castles, yet it appears in the search results for a story about the volcanic eruption, it is likely that the link is bogus and should be avoided.

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S6f4EiO3UeI/AAAAAAAABXk/f5W8F6V0_9w/s1600-h/search_results.png" imageanchor="1"><img border="0" height="263" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S6f4EiO3UeI/AAAAAAAABXk/f5W8F6V0_9w/s400/search_results.png" width="400" /></a>
</div>

On the subject of hacked Web sites, it appears that the crew behind this campaign has a back catalogue of hacked sites they can call up and use at very short notice. On looking closer at the hacked sites, you will find that it looks like each of them has had a few hundred randomly named PHP pages added to them. Each of these pages redirects to a single server that is changed periodically. The following is a short list of the example PHP files that have been added to the hacked servers:



  * amvud.php
  * anbzj.php
  * bvaff.php
  * ccxkn.php
  * cidnu.php
  * cwpwb.php
  * czws.php
  * dplov.php
  * ekjoo.php
  * fghja.php
  * hkopl.php
  * hnzjw.php
  * ibuhh.php
  * ihqro.php
  * jczws.php
  * jlmw.php
  * jqcah.php
  * mkfvl.php
  * ngunu.php
  * nzjnl.php
  * ptrfv.php
  * pyowm.php
  * qbtmn.php
  * qucud.php
  * socmw.php
  * teqgl.php
  * thgpf.php
  * tkxgk.php
  * tvxyj.php
  * urgle.php
  * wfnfv.php
  * wlclk.php
  * wqeoe.php
  * xngus.php

<div>
  <div>
    The pages at the time of writing were redirecting to <b>wxb0tr.xorg.pl</b>, which in turn redirects to <b>www1.nemocure-forthispc.in</b> and <b>www1.bidat-safezonefor-all.in</b>. Sometimes, probably when the crew is performing maintenance, the site redirects to a legitimate Web site.
  </div>
  
  <div>
  </div>
  
  <div>
    Note the Indian top-level domain—is India the new China? After the recent crack down on Chinese domain registrations and talk of tightening up in Russia, malware makers are probably looking to other TLDs that are less stringent in their application process.
  </div>
  
  <div>
  </div>
  
  <div>
    When the end of the redirection chain is reached, you will see a &#8220;Green Ring of Death&#8221; that indicates that a fake online antivirus scan is about to begin.
  </div>
</div>

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S6f4E3ujwDI/AAAAAAAABXo/LRB889y4nGQ/s1600-h/green_ring_of_death.PNG" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S6f4E3ujwDI/AAAAAAAABXo/LRB889y4nGQ/s1600/green_ring_of_death.PNG" /></a>
</div>

The sites have a series of fake scan pages, which it can display at random. The fake scan pages are designed to look like application windows in various versions of Microsoft Windows and include Windows XP and Windows Vista.

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S6f4FB-PM2I/AAAAAAAABXs/_myLWJZXIVI/s1600-h/xp_scan1.article%20thumbnail.PNG" imageanchor="1"><img border="0" height="296" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S6f4FB-PM2I/AAAAAAAABXs/_myLWJZXIVI/s400/xp_scan1.article%20thumbnail.PNG" width="400" /></a>
</div>



<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S6f4FYuynmI/AAAAAAAABXw/O5Zkf-mg_f8/s1600-h/vista_scan1.article%20thumbnail.png" imageanchor="1"><img border="0" height="280" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S6f4FYuynmI/AAAAAAAABXw/O5Zkf-mg_f8/s400/vista_scan1.article%20thumbnail.png" width="400" /></a>
</div>

After the fake scan is completed, or if you try to navigate away, you will be offered a download of a file named packupdate\_build[RANDOM NUMBER]\_195.exe. This familiar-looking campaign is the handiwork of the same gang who brought you fake antivirus during the Chilean earthquake and the iPad release campaign, as well as many other times in the past.