---
title: kernel.org compromised
date: 2011-08-31T22:46:00+00:00
layout: single
author_profile: true
url: 2011/08/31/kernel-org-compromised/
tags:
  - kernel.org
  - report
  - security
lang: en
categories: 
  - TechBlog
---
Read it yourself…

```md
———- Forwarded message ———-
From: J.H.
Date: 2011/8/29
Subject: [kernel.org users] [KORG] Master back-end break-in
To: users@kernel.org

—–BEGIN PGP SIGNED MESSAGE—–
Hash: SHA1

Afternoon Everyone,

As you can guess from the subject line, I've not had what many would
consider a “good” day.  Earlier today discovered a trojan existing on
HPA's personal colo machine, as well as hera.  Upon some investigation
there are a couple of kernel.org boxes, specifically hera and odin1,
with potential pre-cursors on demeter2, zeus1 and zeus2, that have been
hit by this.

As it stands right now, HPA is working on cleaning his box, and
I'm working on hera (odin1 and zeus1 are out of rotation still for other
reasons), mainly so that if one of us finds something of interest, we
can deal with it and compare notes on the other box.

Points of interest:

– – Break-in seems to have initially occurred no later than August 12th

– – Files belonging to ssh (openssh, openssh-server and openssh-clients)
were modified and running live.  These have been uninstalled and
removed, all processes were killed and known good copies were
reinstalled.  That said all users may wish to consider taking this
opportunity to change their passwords and update ssh keys (particularly
if you had an ssh private key on hera).  This seems to have occurred on
or around August 19th.

– – A trojan startup file was added to rc3.d

– – User interactions were logged, as well as some exploit code.  We have
retained this for now.

– – Trojan initially discovered due to the Xnest /dev/mem error message
w/o Xnest installed; have been seen on other systems.  It is unclear if
systems that exhibit this message are susceptible, compromised or not.
If you see this, and you don't have Xnest installed, please investigate.

– – It \*appears\* that 3.1-rc2 might have blocked the exploit injector, we
don't know if this is intentional or a side affect of another bugfix or
change.

– – System is being verified from backups, signatures, etc.  As of right
now things look correct, however we may take the system down soon to do
a full reinstall and for more invasive checking.

– – As a precaution a number of packages have been removed from the
system, if something was removed that you were using please let us know
so we can put it back.

– – At this time we do not know the vector that was used to get into the
systems, but the attackers had gained root access level privileges.

That's what we know right now, some of the recent instabilities may have
been caused by these intrusions, and we are looking into everything.

If you are on the box, keep an eye out, and if you see something please
let us know immediately.

Beyond that, verify your git trees and make sure things are correct.

– – John ‘Warthog9' Hawley
Chief Kernel.org Administrator
—–BEGIN PGP SIGNATURE—–
Version: GnuPG v1.4.11 (GNU/Linux)
Comment: Using GnuPG with Fedora – http://enigmail.mozdev.org/

iEYEARECAAYFAk5a5U0ACgkQ/E3kyWU9dif+1ACfYPlgq/keFrFO77AmQVduKGwx
TAcAnRAu6nHt74+5aC+fPeb8aT0hcy2K
=Semd
—–END PGP SIGNATURE—–
```
