---
title: ZeroAccess, an advanced kernel mode rootkit
date: 2011-04-11T18:20:00+00:00
layout: single
author_profile: true
url: 2011/04/11/zeroaccess-an-advanced-kernel-mode-rootkit/
tags:
  - malware
  - review
lang: en
category: techblog
---
**Prevx Blog:** In the last couple years there have been three major players who dominated the scene in the field of the kernel mode rootkit development. They are Rustock rootkit – with its latest build discovered in the wild in 2008 – MBR rootkit – firstly discovered in January 2007 – and TDL rootkit, which can be considered the most advanced kernel mode rootkit to date, able to infect both x86 and x64 versions of Windows operating system.

In mid 2009 another player quietly started targetting Windows and its kernel, slowly becoming more than “yet another rootkit”. ZeroAccess rootkit, also known as Max++ rootkit, showed since its beginning a very good code development and interesting features, like exploiting the NTFS file system's feature called junction (a folder symbolic link actually) to create fake folders able to kill most security software when they tried to get access to such folders.

Since 2009 the rootkit evolved until the last release that strongly resembles the TDL3 rootkit in many features, like the implementation of a hidden volume where it stores its configuration data and other infection files. TDL3 creates an hidden drive by formatting last sectors of the hard drive with its own TDL file system and then encoding it using RC4 encryption. ZeroAccess instead creates a new file inside system32\\config folder. This file will be mounted by the rootkit as a hidden volume, it'll be formatted using the NTFS filesystem and encrypted using RC4 encryption as well.

In both situations the system won't be able to directly access to the hidden volumes, so every file stored inside those volumes will be hidden from security software and from the operating system.

We have analyzed the rootkit dropper and published a video on YouTube that shows how to unpack it to better analyze the rootkit code.

The technical analysis of the rootkit can be downloaded from the link below:

[**ZeroAccess – an advanced kernel mode rootkit**](http://pxnow.prevx.com/content/blog/zeroaccess_analysis.pdf)