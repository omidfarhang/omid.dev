---
title: Now you too can mount your own Operation Aurora Attacks!!!
date: 2010-01-22T11:24:00+00:00
layout: single
author_profile: true
url: 2010/01/22/now-you-too-can-mount-your-own-operation-aurora-attacks/
tags:
  - alert
  - Microsoft
  - Updates
lang: en
category: techblog
---
But don’t.  Please don’t!…      just….       don’t!…

Instead, why don’t you apply the out-of-band patch ( [MS10-002](http://www.sophos.com/support/knowledgebase/article/68020.html) ) that Microsoft has just released…?!!!

Patching remote-code-execution vulnerabilities is usually “a good idea” to say the least.  But, considering that:

Microsoft rushed to get this patch out…… ( Thank you Microsoft! )

And that, this patch addresses several Internet Explorer vulnerabilities &#8211; of which includes [CVE-2010-0249](http://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2010-0249) &#8211; the infamous “Aurora attacks” related vulnerability that’s well known to be making the rounds in the wild.

Annnnd that, the Metasploit framework has released an update that can generate attacks based on this….. Which means that every script-kiddy / pentester / disgruntled-monkey-with-a-laptop can mount their own little mini operation Aurora-like attacks.

<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S1mCfVOatwI/AAAAAAAAAuI/46OMc-OEuqg/s1600-h/metasploit.png" imageanchor="1"><img border="0" height="112" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S1mCfVOatwI/AAAAAAAAAuI/46OMc-OEuqg/s400/metasploit.png" width="400" /></a>
</div>

Annnnnnd that, Microsoft has posted an advisory about an unpatched elevation of privilege attack that affects most Windows NT platforms ( from Windows NT 3.1 to, and including, Windows 7 ) &#8211; which there is proof-of-concept code now publicly available for…..

Just Update your windows using [Microsoft Update](http://update.microsoft.com/microsoftupdate)!