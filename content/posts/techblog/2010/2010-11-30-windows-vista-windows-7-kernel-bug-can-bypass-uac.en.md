---
title: "Windows Vista &amp; Windows 7 Kernel Bug Can Bypass UAC"
date: 2010-11-30T22:38:00+00:00
layout: single
author_profile: true
url: 2010/11/30/windows-vista-windows-7-kernel-bug-can-bypass-uac/
tags:
  - 0-Day
  - alert
  - Hijack
  - security
  - Vulnerability
  - Windows
  - Windows 7
  - windows vista
lang: en
categories: 
  - TechBlog
---
Now this is not the first time Windows UAC has hit the news for being flawed, back in February 2009 it was discovered that Windows 7 UAC Vulnerable – User Mode Program Can Disable User Access Control and after that in November 2009 it was demonstrated that Windows 7 UAC (User Access Control) Ineffective Against Malware.

A zero-day for Windows 7 back in July of this year also bypassed Windows UAC.

Once again a serious zero-day has hit Windows, this time an unpatched vulnerability in the Kernel. So far it only seems to be a local exploit, for full devastating effect hackers will need to combine this with a remote zero-day to get access to the machine and then elevate their permissions and bypass UAC with this.

> Microsoft is investigating reports of an unpatched vulnerability in the Windows kernel that could be used by attackers to sidestep an important operating system security measure.
> 
> One security firm dubbed the bug a potential “nightmare,” but Microsoft downplayed the threat by reminding users that hackers would need a second exploit to launch remote attacks.
> 
> The exploit was disclosed Wednesday — the same day proof-of-concept code went public — and lets attackers bypass the User Account Control (UAC) feature in Windows Vista and Windows 7. UAC, which was frequently panned when Vista debuted in 2007, displays prompts that users must read and react to. It was designed to make silent malware installation impossible, or at least more difficult.
> 
> “Microsoft is aware of the public posting of details of an elevation of privilege vulnerability that may reside in the Windows kernel,” said Jerry Bryant, a group manager with the Microsoft Security Response Center, in an e-mail. “We will continue to investigate the issue and, when done, we will take appropriate action.”
> 
> The bug is in the “win32k.sys” file, a part of the kernel, and exists in all versions of Windows, including XP, Vista, Server 2003, Windows 7 and Server 2008, said Sophos researcher Chet Wisniewski in a Thursday blog post.

Microsoft is aware of the flaw but has not yet issued a statement as to when they will be patching this, I’d imagine given their past that will wait for the next Patch Tuesday before pushing the patch out. And plus the fact it’s a kernel bug it, it may take a little more time to fix.

The security companies seem to be taking this one quite seriously as the publicly-released code is confirmed working across multiple versions of Windows.

There is a very slight chance that Microsoft might push an Out-of-band-patch for this, but I find it unlikely as it’s not a remote vulnerability.

> Several security companies, including Sophos and Vupen, have confirmed the vulnerability and reported that the publicly-released attack code works on systems running Vista, Windows 7 and Server 2008.
> 
> Hackers cannot use the exploit to remotely compromise a PC, however, as it requires local access, a fact that Microsoft stressed. “Because this is a local elevation-of-privilege issue, it requires attackers to be already able to execute code on a targeted machine,” said Bryant.
> 
> “On its own, this bug does not allow remote code execution, but does enable non-administrator accounts to execute code as if they were an administrator,” added Wisniewski.
> 
> Although many Windows XP users, especially consumers and those in very small businesses, run the OS via administrator accounts, Microsoft added UAC to Vista and later operating systems as one way to limit user privileges, and thus malware’s access to the PC.
> 
> Attackers would have to combine the exploit with other malicious code that takes advantage of another vulnerability on the machine — not necessarily one in Windows, but in any commonly-installed application, such as Adobe Reader, for example — to hijack a PC and bypass UAC.
> 
> “This exploit allows malware that has already been dropped on the system to bypass [UAC] and get the full control of the system,” said Prevx researcher Marco Giuliani in an entry on that security company’s blog Thursday.
> 
> Prevx reported the vulnerability to Microsoft earlier in the week.

Microsoft has changed the way UAC functions before when it was demonstrated that it could be easily bypassed. The next patch cycle is due on Tuesday, Dec. 14 – which thankfully isn’t too long. I’d be expecting a kernel patch for this issue by then.

There is more info about the issue here:

Sophos – [New Windows zero-day flaw bypasses UAC](http://nakedsecurity.sophos.com/2010/11/25/new-windows-zero-day-flaw-bypasses-uac/)  
Prevx – [Windows 0-day exploit: Q&A session](http://www.prevx.com/blog/162/Windows-day-exploit-QA-session.html)

Source: [Network World](http://www.networkworld.com/news/2010/112710-nightmare-kernel-bug-lets-attackers.html?source=nww_rss)