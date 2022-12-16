---
title: Cross-platform botnet targets SSH-enabled devices
date: 2022-12-12T23:37:43+03:30
layout: single
author_profile: true
url: 2022/12/16/cross-platform-botnet-targets-ssh-enabled-devices/
shortlink: https://g.omid.dev/DlE9qP9
tags:
  - health
  - Iran
  - minerals
  - Good Reads
lang: en
category: medical
---
Microsoft researchers found a cross-platform botnet that originates from malicious software downloads on Windows devices & succeeds in propagating to a variety of Linux-based devices by enumerating default credentials on internet-exposed SSH-enabled devices.

> Microsoft researchers observed that the initial infection points related to the botnet were devices infected through the installation of malicious cracking tools that purport to acquire illegal Windows licenses. The cracking tools contain additional code that downloads and launches a fake version of svchost.exe through a PowerShell command. In some cases, the downloaded file is named svchosts.exe.

{{< figure src="/images/2022/12/cracking-tools-used-to-spread-the-botnet.png" caption="Cracking tools used to spread the botnet." attr="rmicrosoft.com" attrlink="https://www.microsoft.com/en-us/security/blog/2022/12/15/mccrash-cross-platform-ddos-botnet-targets-private-minecraft-servers/" >}}

Continue Reading at [Microsoft Security Blog](https://www.microsoft.com/en-us/security/blog/2022/12/15/mccrash-cross-platform-ddos-botnet-targets-private-minecraft-servers/)

Thanks to [@VirusBulletin](https://infosec.exchange/@VirusBulletin) for sharing.
