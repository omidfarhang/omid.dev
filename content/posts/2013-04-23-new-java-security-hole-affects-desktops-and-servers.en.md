---
title: New Java security hole affects desktops and servers
date: 2013-04-23T20:23:35+00:00
layout: single
author_profile: true
url: 2013/04/23/new-java-security-hole-affects-desktops-and-servers/
image: /images/sites/3/2013/04/Java.jpg
tags:
  - Java
  - Oracle
  - Security Hole
lang: en
category: techblog
---
[![Java](/images/2013/04/Java-300x300.jpg)](/images/2013/04/Java.jpg)Adam Gowdiak, who has made a name for himself by finding flaws in Java, has [reported](http://seclists.org/fulldisclosure/2013/Apr/194) a new vulnerability. Security issue 61, according to Gowdiak's tally, affects current versions of Java SE 7, including the very latest release version 1.7.0_21-b11.

The hole is once again present in the [Reflection API](http://docs.oracle.com/javase/tutorial/reflect/) and allows attackers to completely bypass the language's sandbox to access the underlying system. Gowdiak has not published any further details about the vulnerability in order to give Oracle time to patch the problem. This means that there are now three vulnerabilities discovered by Gowdiak that still require fixes: problems 54, 56 and 61 as numbered by him.

For an attack that exploits this vulnerability to be successful, users will have to acknowledge Java's [now obligatory](http://www.h-online.com/news/item/Java-7-Update-21-closes-security-holes-and-restricts-applets-1843558.html " Java 7 Update 21 closes security holes and restricts applets – 17 April 2013, 11:07") security warning that an applet is being executed on a web site. This makes fully automatic drive-by attacks currently infeasible. Interestingly, the server version of JRE 7 is also vulnerable, according to the researcher. However, Gowdiak addresses the question of how the attack code can be introduced in the Java VM on the server only by pointing at [Oracle's guidelines on how to protect against code injection in Java](http://www.oracle.com/technetwork/java/seccodeguide-139067.html#3).