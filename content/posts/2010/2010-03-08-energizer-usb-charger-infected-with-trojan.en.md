---
title: Energizer USB charger infected with Trojan
date: 2010-03-08T23:01:00+00:00
layout: single
author_profile: true
url: 2010/03/08/energizer-usb-charger-infected-with-trojan/
tags:
  - malware
  - report
  - review
lang: en
categories: 
  - techblog
---
Hmmm. A new vector for malware: USB battery chargers. Wonderful.

The U.S. Computer Emergency Response Team (CERT) is warning that Energizer DUO USB battery chargers have been found infected with a Trojan that loads backdoor malware on a victim PC along with its battery monitoring software.

The charger copies a .dll file named UsbCharger.dll in the application's directory and another named Arucer.dll in the Windows system32 directory. USBCharger sets a registry entry to autoexecute Arucer.dll when Windows starts.

Arucer.dll is a backdoor that communicates through TCP port 7777.

The charger has been sold worldwide for three years.

CERT notes that the Trojan contains Chinese language text.

Sunbelt detects it as Trojan.Arugizer.

CERT Vulnerability Note VU#154421 [here](http://www.kb.cert.org/vuls/id/154421).

PCWorld news story [here](http://www.computerworld.com/s/article/9166978/Energizer_Bunny_s_software_infects_PCs).
