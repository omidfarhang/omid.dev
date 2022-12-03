---
title: A new security flaw hits VLC
date: 2011-04-12T09:07:00+00:00
layout: single
author_profile: true
url: 2011/04/12/a-new-security-flaw-hits-vlc/
tags:
  - security
  - VLC
  - Vulnerability
lang: en
category: techblog
---
<div dir="ltr" trbidi="on">
  <div>
    <a href="http://3.bp.blogspot.com/-Ajp97NsmkSM/TaQPA351xpI/AAAAAAAAD00/uBfQceRk_BE/s1600/largeVLC.png" imageanchor="1"><img border="0" height="200" src="http://3.bp.blogspot.com/-Ajp97NsmkSM/TaQPA351xpI/AAAAAAAAD00/uBfQceRk_BE/s200/largeVLC.png" width="200" /></a>
  </div>
  
  <p>
    H-Online: Following on from last week's S3M vulnerability in the VLC media player, a <a href="http://www.videolan.org/security/sa1103.html">new advisory</a> warns of a buffer overflow when playing MP4/MPEG-4 files.The bug, reported by Aliz Hammond, requires that a user open a specially crafted MP4 file. According to Secunia, the vulnerability is found in the MP4_ReadBox_skcr()function in the demultiplexer and is rated as &#8220;highly critical&#8221;. All versions from 1.0.0 to 1.1.8 are affected by the problem.
  </p>
  
  <p>
    Corrections have been applied to the source code tree and the issue will be resolved in VLC media player 1.1.9 when it is released. Patches for older versions are also <a href="http://git.videolan.org/?p=vlc.git;a=commit;h=5637ca8141bf39f263ecdb62035d2cb45c740821">available</a> for those who compile their own binaries. The Videolan developers recommend that users refrain from opening files from untrusted third parties and web sites until the patch is applied. As an alternative, they suggest that removing the libmp4_plugin.* files from the VLC plugin installation directory will disable the plug-in.</div>