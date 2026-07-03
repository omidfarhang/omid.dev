---
title: Java Applet Attack Targets XBox Gamers
date: 2010-04-07T21:45:00+00:00
layout: single
author_profile: true
url: 2010/04/07/java-applet-attack-targets-xbox-gamers/
tags:
  - Apple
  - Firefox
  - Malware
  - review
  - scam
  - Security

categories:
  - TechBlog
---
If you like downloading or installing programs on your PC related to XBox gaming, you might want to take heed of this writeup. There’s a fake application kit in circulation that allows an attacker to create a website claiming to be an XBox Live application that takes the form of a Java install.

Upon visiting a site related to this scam, the end-user will see a blank webpage with nothing other than a Java notice and a fake Softpedia award at the bottom of the screen:

[![](/images/2010/04/xboxapplet1.gif)](/images/2010/04/xboxapplet1-7e8cf92f.gif)

After a second or two, the page becomes a little more lively with the promise of XBox related action to come:

[![](/images/2010/04/xboxapplet2.gif)](/images/2010/04/xboxapplet2-e9b6540a.gif)

At this stage, the end-user will be presented with the following Java prompt:

[![](/images/2010/04/xboxapplet3.gif)](/images/2010/04/xboxapplet3-cccef176.gif)

Note that they list the publisher as “Microsoft”, which is always going to make potential victims a little bit easier to trick into hitting the Run button. In this particular attack, the end-user installs a file that looks a little bit like an art program.

[![](/images/2010/04/xboxapplet4.gif)](/images/2010/04/xboxapplet4-6c081a77.gif)

[It isn’t an art program](http://www.virustotal.com/analisis/f9461cfa24b658a98525cd19e75297764db84aaed7d99bf908f7ba249fe41864-1270652660). The end-user will find a file called Crypted.exe in their Temp folder, which is another way of saying Trojan-PWS.Win32.Fignotok.A, a password stealing program that attacks applications such as Firefox, Steam and IM clients. VirusTotal [here](http://www.virustotal.com/analisis/2dfa0a26df07ed6abae0c33d55712d5073983ec5b2e0ed1b43a7ef6db3fdb142-1270660607).
