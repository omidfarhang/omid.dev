---
title: Security issues on Android
date: 2010-09-20T11:03:00+00:00
layout: single
author_profile: true
url: 2010/09/20/security-issues-on-android/
tags:
  - 4G
  - advice
  - Android
  - malware
  - security
  - Vulnerability
lang: en
categories: 
  - techblog
---
<img title="Android-logo-Robot" border="0" alt="Android-logo-Robot" align="left" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TJc4gvC1jnI/AAAAAAAACd4/vlOO_3c0Aps/Android-logo-Robot%5B4%5D.png?imgmax=800" width="43" height="50" />One unique security feature of Android is the permission check when installing 3rd party apps. The system lists all permissions that an app requires and asks the user to check if that’s alright. Such permissions are the ability to receive your location, send or receive text messages, internet access, phone calls and many more. The user can be sure that the app is not doing any of such activities without the appropriate permission. In case the developer forgets to add a particular permission then the operating system will simply block the corresponding function which leads to a “Force Close”, which means the app will be terminated.

Not too long ago the [first Android Trojan](http://techblog.avira.com/2010/08/11/android-trojan-targets-russian-android-users/en/) got some media attention. The first variant of the malware (which was detected by Avira as “TR/SMS.AndroidOS.A”) pretended to be a Movie player. Instead of playing movies the malware was sending messages to premium numbers in Russia. Suspiciously for the user it had to ask for the permission to send SMS. In this case it should be obvious that a movie player should not be able to send text messages. But what if a Trojan hides in a fancy messaging app instead?

One of the biggest security issues however are security exploits. One example was the HTC EVO 4G released earlier this year. There were two exploitable binaries (“skyagent” and “hstools”) that allowed access to the root of the file system. Potentially there could be new exploitable binaries in any new phone. Not only in the operating system but also in additional components installed by the phone manufactures and network providers. Some communities also exploit such vulnerabilities to gain root access to their phones in order to install custom ROMs. Recently so called 1-click root tools are very popular. The risk here is that most of the times these security holes are never fixed until the next OS update and therefore the vulnerabilities are also a worthwhile target for malware writers! With root access a malicious app could easily install itself as system application or even load into the Linux kernel directly as a loadable kernel module. The user probably wouldn’t even recognize the malware, and even if he does, he will have a hard time to get rid of it. Even after a factory reset the malware is still active because during the wipe the system partition is not touched at all. Sure you can flash a new custom ROM to remove the malware but then you also void the warranty of your phone.

Another recent example for exploits is Adobe Flash Player. Unfortunately the tradition of zero days exploits known from Windows might also catch on more platforms in the future. There’s already a critical vulnerability in Flash for Android 10.1.92.10 which could allow an attacker to take control of the system. Currently Flash is only working on Android 2.2 which is not very widespread yet, but for the end of 2012 Adobe expects to have Flash up and running on 250 million Smartphones. Besides that, Flash will not only run on Android but is supposed to run on BlackBerry OS, Symbian, web OS and Windows Phone 7 as well.

After all Android’s popularity is still in an early stage. However due to the aggressive growth (currently 200.000 new Android devices are activated every day) the platform gains more and more popularity. It does not only compete with iPhone and Symbian OS but due to the introduction of Android tablet PCs, netbooks and Google TV there will also be some competition for desktop PCs. These are clear signs that in the longer run Android will become a potential target for malware attacks.

Currently there is no critically dangerous malware in the field but it’s still very important that people use their phone just as carefully as they use their desktop PC because technically an attack is always possible. Think twice what apps you are installing, avoid visiting dubious websites and don’t open suspicious links you receive through text messages, emails and social media platforms.