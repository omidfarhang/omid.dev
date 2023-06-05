---
title: "Rimecud and Hamweq – birds of a feather"
date: 2010-01-13T12:36:00+00:00
layout: single
author_profile: true
url: 2010/01/13/rimecud-and-hamweq-birds-of-a-feather/
tags:
  - alert
  - malware
  - report
lang: en
categories: 
  - techblog
---
Following the addition of Win32/Hamweq to the MSRT last month, MMPC will continue cleaning PCs in 2010 by adding another prevalent worm, Win32/Rimecud, to this month's removal tool.

This is due not only to Win32/Rimecud's high detection numbers, which immediately follow those of Win32/Hamweq, but also to the similarities the two families share with each other.

In fact, as part of its payload, Win32/Hamweq may download Win32/Rimecud, contributing to Rimecud's suitability as the next target for MSRT.

Win32/Rimecud is a family of worms that spreads via fixed and removable drives, instant messaging programs, and P2P networks. Similar to Hamweq, it also contains backdoor functionality that allows unauthorized access to affected machines. However, compared to Hamweq, Win32/Rimecud's backdoor supports a more diverse and sophisticated set of commands, giving the remote attacker greater control of the compromised machine.

Win32/Rimecud uses a variety of obfuscators to hinder detection. These are written in C/C++/Delphi/Visual Basic and usually have virtual environment detection and anti-emulation tricks to make the malware harder to detect.

Other similarities to Win32/Hamweq's behavior include using the Recycle Bin as the target drop folder for copies of itself, injecting code into the explorer.exe process and the capability to spread via removable drives.

By looking at the similarities between the two threats we could speculate that they were created by the same author(s). Like they say: “Birds of a feather”.