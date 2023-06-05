---
title: Thrice Bitten, Not Shy
date: 2010-01-06T13:54:00+00:00
layout: single
author_profile: true
url: 2010/01/06/thrice-bitten-not-shy/
tags:
  - malware
  - report
lang: en
category: 
  - techblog
---
The one subset of malware which does not immediately seem motivated by financial incentives is the autorun worm. In fact the raison d’etre for this class of malware seems lodged in the annals of yesteryear; summarised in three words it could be “naive script-kiddy kudos”.

Unlike the propagators of other classes of malware, ie professional criminals, the writers of autorun worms are amateurish upstarts. Ample evidence for this assertion may be found in a recent sample of Sohana, a family of autorun worms, which was cloaked in three layers of known virus infections: the ancient W32/Flcss over W32/Scribble-B over W32/Impair-A.

The presence of known virus infections around the autorun worm component implies the following:

  1. The sample is detected even before it leaves the author’s computer. Not ideal for spreading purposes.
  2. The author is blissfully unaware that his computer is infected with more than his own creation. Oh dear! That will teach him to access disreputable sites. Perhaps he ought to invest in anti-virus software.

The above example has been replicated, pardon the pun, several times in the past with infections of W32/Parite-B over other malware.

It is likely that the professional criminals include an anti-virus scan as part of their “malware release checklist” to, inter alia, avoid the semblance of negligent incompetence described above.

Malware authors, if you are reading this, get a proper job. This could be your new year’s resolution.