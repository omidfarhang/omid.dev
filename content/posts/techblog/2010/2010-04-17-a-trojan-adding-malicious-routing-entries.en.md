---
title: A Trojan Adding Malicious Routing Entries
date: 2010-04-17T21:32:00+00:00
layout: single
author_profile: true
url: 2010/04/17/a-trojan-adding-malicious-routing-entries/
tags:
  - malware
  - report
  - review
lang: en
categories: 
  - TechBlog
---
Backdoor.Rohimafo is a Trojan that has several back door functions. It not only opens a back door and performs the usual functions but it also can perform some decidedly unusual functions.

It attempts to block users from connecting to remote servers; not only specific servers but also specific network segments by using PersistentRoutes in Windows. PersistentRoutes can be used to add a routing entry to a routing table persistently. The route.exe command can be used to add an entry like the following:

route.exe add -p \[NETWORK ADDRESS\] \[NETMASK\] \[IP ADDRESS OF GATEWAY\] \[METRIC\]

This Trojan can add routing entries using a network address instead of the IP address of the gateway. Therefore, all packets matching the network address and netmask that are specified by the command are included. Usually threats add entries to the hosts file to redirect IP addresses or hook network APIs and let the connecting API fail.

This Trojan also has functionality to steal passwords; it aims to inject malicious code into not only web browsers, such as Internet Explorer and Opera, but also Java applications and isclient.exe and intpro.exe, which are tools used to protect HTTP connections. So not only are major browsers targeted but web security tools as well.

This Trojan attempts to steal web passwords dynamically and statically. Dynamic stealing is to hook network APIs like &#8216;send', and snoop network traffic to get passwords. It has special hooking codes for Java applications and Opera. It tries to hook PR\_Write in nspr4.dll and it tries to hook OpStart in opera.dll for Opera. To steal passwords from IE, most threats, including this Trojan, use the PFXExportCertStore API. This Trojan also uses the PK11\_CheckUserPassword API that is exported by nsr4.dll to steal passwords from FireFox. It attacks by using a predetermined list of passwords.