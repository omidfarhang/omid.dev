---
title: "It's not dead yet: Microsoft's out-of-band IE6 fix impacts IE8"
date: 2010-03-30T14:27:00+00:00
layout: single
author_profile: true
url: 2010/03/30/its-not-dead-yet-microsofts-out-of-band-ie6-fix-impacts-ie8/
tags:
  - Internet Explorer
  - Microsoft
  - Patch Tuesday
  - Updates
  - Vulnerability
lang: en
category: techblog
---
Last month, Microsoft sent flowers to a mock funeral for Internet Explorer 6, in a show of support for the ideal that the old browser should be declared defunct worldwide. But for a few years yet, the company is still bound to support the product for those users (generally businesses) who refuse to upgrade it. That's why new exploits that continue to target old browsers, such as IE6 and IE7, continue to get attention even a full year after the proper security fix — IE8 — has been deployed.

One of the libraries that, among other functions, helps IE to print is the target of an exploit released to the wild earlier this month. The exploit creatively overloads the system with JavaScript variables, then places function calls to IEPEERS.DLL. Once the library is effectively crashed, its used memory isn't cleaned up, enabling binary code seeded into that memory to be executed — a classic use-after-free scenario.

Although various IE8 and Vista-era architectures protect Windows users from this scenario, Microsoft's security team said today it will take the unusual step of issuing an out-of-band update tomorrow, two weeks ahead of the usual Patch Tuesday. The update will also serve as a “cumulative roll-up,” adding nine other fixes that had been planned for April 13.

Microsoft has said that Data Execution Prevention in IE8 is one of the effective workarounds for this exploit, at least until tomorrow. But [the US Homeland Security Dept.'s US-CERT agency warns](http://www.kb.cert.org/vuls/id/744549) that DEP is only a partial fix, saying, “DEP should not be treated as a complete workaround, but DEP can mitigate the execution of attacker-supplied code in some cases.” US-CERT suggests that users instead disable Active Scripting, one of the perennially sensitive elements of the old ActiveX system.