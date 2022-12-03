---
title: "WinXP users: hold off on installing MS010–15 [BSOD]"
date: 2010-02-12T22:19:00+00:00
layout: single
author_profile: true
url: 2010/02/12/winxp-users-hold-off-on-installing-ms010-15-bsod/
tags:
  - advice
  - alert
  - Microsoft
  - news
  - Patch Tuesday
  - Updates
lang: en
category: techblog
---
<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S3XMfr_sDcI/AAAAAAAAA7A/FDl9fMhi3yk/s1600-h/bsod.png" imageanchor="1"><img border="0" height="452" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S3XMfr_sDcI/AAAAAAAAA7A/FDl9fMhi3yk/s640/bsod.png" width="640" /></a>
</div>

Security blogger Brian Krebs is reporting that some Windows XP users are reporting blue screen of death on reboot after installing Microsoft’s Tuesday patch KB977165 (MS010–15: “Vulnerabilities in Windows kernel could allow elevation of privilege.”)

_“Turns out, a non-trivial number of XP users are reporting that their systems suffer from the dreaded Blue Screen of Death (BSoD) and fall into an interminable reboot loop after installing the latest batch of patches from Redmond,”_ he wrote.

Brian Krebs’ blog <a href="http://www.krebsonsecurity.com/2010/02/new-patches-cause-bsod-for-some-windows-xp-users/#more-1003" target="_blank">here.</a>

Those trying to maintain Microsoft systems are caught in the cross-currents of the patching process: some patches might be buggy (think “delay”) but the dark side will be reverse engineering the patches as fast as they can (do it now.)

It almost seems like it would be a good idea for the users of Microsoft products to hold off about two days before installing the Patch Tuesday updates. That seems to be how long it takes for the word to get out – like this problem – that there are glitches in the updates.

The overwhelming number of Microsoft fixes are straightforward and urgently needed security measures. However, the massive complexity presented by the older flavors of the Windows operating system and service pack levels almost guarantees that there are going to be problems like this.

Possibly a good strategy would be phased updates especially for enterprise systems:

&#8212; Immediately install just the patches that fix vulnerabilities with in-the-wild exploits if you are running the vulnerable applications, modules, plug-ins, etc.

&#8212; Wait three days for all others

&#8212; Wait a week for non-critical (no reported exploits) updates to less-used flavors of Windows and less-used applications.

Meanwhile, have someone keep an eye on the security news sources to spot problems like this one.

Krebs’ blog carries some good, detailed advice for those whose machines have been disabled already by the glitch.

Computer World carried a<a href="http://www.computerworld.com/s/article/9155419/Windows_patch_cripples_XP_with_blue_screen_users_claim?taxonomyId=89" target="_blank"> story about the problem</a> and noted:

 _“This was not the first time that a Microsoft update has incapacitated Windows PCs. Two years ago, a set of updates for Vista sent an unknown number of machines into an endless series of reboots. Similar problems stymied users who tried to upgrade to Windows XP Service Pack 3 (SP3) in May 2008, and others attempting to upgrade from Vista to Windows 7 last October.”_

Today <a href="http://news.softpedia.com/news/Windows-Blue-Screens-of-Death-after-Patch-for-17-Year-Old-Vulnerability-Is-Applied-134808.shtml" target="_blank">Softpedia carried a statement</a> from Jerry Bryant, Microsoft's senior security communications manager lead:  
_“We are aware that after installing the February security updates a limited number of users are experiencing issues restarting their computers. Our initial analysis suggests that the issue occurs after installing MS10-015 (KB977165). However, we have not confirmed that the issue is specific to MS10-015 or if it is an interoperability problem with another component or third-party software. Our teams are working to resolve this as quickly as possible. We also stopped offering this update through Windows Update as soon as we discovered the restart issues. However, those using enterprise deployment systems such as SMS or WSUS will still see and be able to deploy these packages.” _