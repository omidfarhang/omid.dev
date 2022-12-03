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
category: techblog
---
<div dir="ltr" trbidi="on">
  Read it yourself&#8230;<span></span></p> 
  
  <ol>
    <li>
      <div>
        &#8212;&#8212;&#8212;- Forwarded message &#8212;&#8212;&#8212;-
      </div>
    </li>
    
    <li>
      <div>
        From: J.H. <warthog9@kernel.org>
      </div>
    </li>
    
    <li>
      <div>
        Date: 2011/8/29
      </div>
    </li>
    
    <li>
      <div>
        Subject: [kernel.org users] [KORG] Master back-end break-in
      </div>
    </li>
    
    <li>
      <div>
        To: users@kernel.org
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8212;&#8211;BEGIN PGP SIGNED MESSAGE&#8212;&#8211;
      </div>
    </li>
    
    <li>
      <div>
        Hash: SHA1
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        Afternoon Everyone,
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        As you can guess from the subject line, I've not had what many would
      </div>
    </li>
    
    <li>
      <div>
        consider a &#8220;good&#8221; day.  Earlier today discovered a trojan existing on
      </div>
    </li>
    
    <li>
      <div>
        HPA's personal colo machine, as well as hera.  Upon some investigation
      </div>
    </li>
    
    <li>
      <div>
        there are a couple of kernel.org boxes, specifically hera and odin1,
      </div>
    </li>
    
    <li>
      <div>
        with potential pre-cursors on demeter2, zeus1 and zeus2, that have been
      </div>
    </li>
    
    <li>
      <div>
        hit by this.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        As it stands right now, HPA is working on cleaning his box, and
      </div>
    </li>
    
    <li>
      <div>
        I'm working on hera (odin1 and zeus1 are out of rotation still for other
      </div>
    </li>
    
    <li>
      <div>
        reasons), mainly so that if one of us finds something of interest, we
      </div>
    </li>
    
    <li>
      <div>
        can deal with it and compare notes on the other box.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        Points of interest:
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; Break-in seems to have initially occurred no later than August 12th
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; Files belonging to ssh (openssh, openssh-server and openssh-clients)
      </div>
    </li>
    
    <li>
      <div>
        were modified and running live.  These have been uninstalled and
      </div>
    </li>
    
    <li>
      <div>
        removed, all processes were killed and known good copies were
      </div>
    </li>
    
    <li>
      <div>
        reinstalled.  That said all users may wish to consider taking this
      </div>
    </li>
    
    <li>
      <div>
        opportunity to change their passwords and update ssh keys (particularly
      </div>
    </li>
    
    <li>
      <div>
        if you had an ssh private key on hera).  This seems to have occurred on
      </div>
    </li>
    
    <li>
      <div>
        or around August 19th.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; A trojan startup file was added to rc3.d
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; User interactions were logged, as well as some exploit code.  We have
      </div>
    </li>
    
    <li>
      <div>
        retained this for now.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; Trojan initially discovered due to the Xnest /dev/mem error message
      </div>
    </li>
    
    <li>
      <div>
        w/o Xnest installed; have been seen on other systems.  It is unclear if
      </div>
    </li>
    
    <li>
      <div>
        systems that exhibit this message are susceptible, compromised or not.
      </div>
    </li>
    
    <li>
      <div>
        If you see this, and you don't have Xnest installed, please investigate.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; It *appears* that 3.1-rc2 might have blocked the exploit injector, we
      </div>
    </li>
    
    <li>
      <div>
        don't know if this is intentional or a side affect of another bugfix or
      </div>
    </li>
    
    <li>
      <div>
        change.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; System is being verified from backups, signatures, etc.  As of right
      </div>
    </li>
    
    <li>
      <div>
        now things look correct, however we may take the system down soon to do
      </div>
    </li>
    
    <li>
      <div>
        a full reinstall and for more invasive checking.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; As a precaution a number of packages have been removed from the
      </div>
    </li>
    
    <li>
      <div>
        system, if something was removed that you were using please let us know
      </div>
    </li>
    
    <li>
      <div>
        so we can put it back.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; At this time we do not know the vector that was used to get into the
      </div>
    </li>
    
    <li>
      <div>
        systems, but the attackers had gained root access level privileges.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        That's what we know right now, some of the recent instabilities may have
      </div>
    </li>
    
    <li>
      <div>
        been caused by these intrusions, and we are looking into everything.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        If you are on the box, keep an eye out, and if you see something please
      </div>
    </li>
    
    <li>
      <div>
        let us know immediately.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        Beyond that, verify your git trees and make sure things are correct.
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        &#8211; &#8211; John &#8216;Warthog9' Hawley
      </div>
    </li>
    
    <li>
      <div>
        Chief Kernel.org Administrator
      </div>
    </li>
    
    <li>
      <div>
        &#8212;&#8211;BEGIN PGP SIGNATURE&#8212;&#8211;
      </div>
    </li>
    
    <li>
      <div>
        Version: GnuPG v1.4.11 (GNU/Linux)
      </div>
    </li>
    
    <li>
      <div>
        Comment: Using GnuPG with Fedora &#8211; http://enigmail.mozdev.org/
      </div>
    </li>
    
    <li>
      <div>
      </div>
    </li>
    
    <li>
      <div>
        iEYEARECAAYFAk5a5U0ACgkQ/E3kyWU9dif+1ACfYPlgq/keFrFO77AmQVduKGwx
      </div>
    </li>
    
    <li>
      <div>
        TAcAnRAu6nHt74+5aC+fPeb8aT0hcy2K
      </div>
    </li>
    
    <li>
      <div>
        =Semd
      </div>
    </li>
    
    <li>
      <div>
        &#8212;&#8211;END PGP SIGNATURE&#8212;&#8211;
      </div>
    </li>
  </ol>
</div>