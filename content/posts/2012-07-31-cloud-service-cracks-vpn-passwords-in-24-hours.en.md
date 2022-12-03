---
title: Cloud service cracks VPN passwords in 24 hours
date: 2012-07-31T16:17:00+00:00
layout: single
author_profile: true
url: 2012/07/31/cloud-service-cracks-vpn-passwords-in-24-hours/
tags:
  - Cloud
  - hack
  - Password
  - report
lang: en
category: techblog
---
<a href="http://lh4.ggpht.com/-BGnuq49K5g0/UBf-JJ6gRpI/AAAAAAAAGpM/A6rrfozM0i8/s1600-h/logotype3%25255B2%25255D.png" target="_blank"><img title="logotype3" border="0" alt="logotype3" align="right" src="http://lh4.ggpht.com/-7thbdKMk1CI/UBf-LAtMwlI/AAAAAAAAGpU/B51HHYmUpk8/logotype3_thumb.png?imgmax=800" width="200" height="41" /></a>h-online: At the [Black Hat](http://www.blackhat.com/) hacker conference in Las Vegas, encryption expert Moxie Marlinspike promised that his [CloudCracker](https://www.cloudcracker.com/) web service was able to crack any VPN or WiFi connection secured using [MS-CHAPv2](http://technet.microsoft.com/en-en/library/cc731462%28v=ws.10%29.aspx) within 24 hours. The cost? Around $200. 

MS-CHAPv2 is based on the eminently crackable encryption algorithm DES. The problem was first [documented](http://www.schneier.com/paper-pptpv2.html) in 1999 by Bruce Schneier working with two other researchers. A large number of processor cores are still required to crack the encryption within a reasonable time – the number of possible keys makes trying to perform a brute force attack on a normal PC a hopeless task. 

With the help of a company called [Picocomputing](http://www.picocomputing.com/), Marlinspike has developed a processing server which is able to test 18 billion keys per second – a feat which would normally require 80,000 CPUs. The server is equipped with 48 programmable processing units known as field programmable gate arrays (FPGA). Each FPGA is programmed to provide 40 parallel processing units, each with a clock speed of 450 MHz, for cracking DES. Users who want to take advantage of the service will first have to extract the client-server handshake from a record of the network traffic. Marlinspike has developed an open source tool called [chapcrack](https://github.com/moxie0/chapcrack) for this purpose. 

Despite its (long) known weaknesses, MS-CHAPv2 is still widely used, especially in company environments, as the authentication protocol is supported out of the box by many operating systems. A PPTP/MS-CHAP2 combination is also in widespread use on smartphones. 

In view of the fact that a highly specialized cracking server is now available to anyone who cares to use it, serious consideration should be given to whether this authentication protocol should continue to be used. Attackers can now access company networks for a mere $200. 

[http://h-online.com/-1656104](http://h-online.com/-1656104 "http://h-online.com/-1656104")