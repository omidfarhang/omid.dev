---
title: Comment on Stuxnet and more Windows 0-days
date: 2010-11-28T20:35:00+00:00
layout: single
author_profile: true
url: 2010/11/28/comment-on-stuxnet-and-more-windows-0-days/
tags:
  - 0-Day
  - report
  - Vulnerability
  - Windows
lang: en
category: 
  - techblog
---
Over the last few days, some news organizations have been saying that Stuxnet source code is available on the black market, and that clearly therefor there is an impending Internet Armageddon.

This is patently silly, on a number of levels, but silly none-the-less.

First thing is that I flat-out don't believe Stuxnet source is available for sale on the black market or anywhere. Remember how often I say that if something sounds too good to be true, it's not true? Well, the opposite applies too. If something sounds too bad to be true, it's not true either. We really don't know who built Stuxnet, or who the intended target was, be we may rest assured that whoever put that much work into it, isn't selling it, at any price. It's actually more probable that some no-honor-among-thieves bad guy is scamming fellow bad guys. “Sure, this is Stuxnet source code. Prove otherwise.”

Second thing is that even if it was for sale, it would require a huge amount of expertise to make it work on something other than the original target. We can be comfortable that all process controllers work differently enough that one bit of malicious code simply won't work on all systems.

Thirdly, all AVs now detect Stuxnet, so it would have to be changed significantly to evade anyone, something that again requires a large amount of expertise.

I could go on and on, but you get the idea. The fundamental concept exposed by Stuxnet can't be ignored, but selling Stuxnet source, and bringing the world to it's knees ain't gonna happen.

The other item deserving of a comment is the current Windows 0-day, which involves an Elevation of Privilege. EoP is much less dangerous than Remote Code Execution. You still have to get the malicious code executing on this system to take advantage of the EoP.

Yes, it's a problem, but it's easily correct, and I'd expect it corrected in the next patch rollout.

Relax, and enjoy your weekend.