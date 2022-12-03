---
title: DLL Hijacking Evolved
date: 2010-08-27T09:00:00+00:00
layout: single
author_profile: true
url: 2010/08/27/dll-hijacking-evolved/
tags:
  - Hijack
  - malware
lang: en
category: techblog
---
Back in November 2007, I’ve seen this technique used by one of the variant of Worm called [W32/Drom](http://www.virustotal.com/file-scan/report.html?id=8384fd416aab0acd0c57b78e5817cd462f93cbde3f2c82712b0c9c98cf5d4431-1282816998). The technique was not to execute the malicious file or component of the worm but to prevent Antivirus Program from running.  The Worm queries the following Antivirus registries to get the Installation Path, once acquired, it creates a folder named _“ws2_32.dll”_ with Hidden and System attributes on that location.

[<img title="regkeys" border="0" alt="regkeys" src="http://lh5.ggpht.com/_vaUVXcmC3OI/THd3iAsh1hI/AAAAAAAACZk/asdQGzpI8YA/regkeys_thumb%5B23%5D.jpg?imgmax=800" width="640" height="195" />](http://lh4.ggpht.com/_vaUVXcmC3OI/THd3fD6E1mI/AAAAAAAACZg/DtJblWb0u7M/s1600-h/regkeys%5B27%5D.jpg)

As I test this technique, it prevented the program from running as it first loads the “_ws2_32.dll”_ folder in the current directory.

The author of this worm may have tested that the aforementioned Antivirus programs call the DLL “_ws2_32.dll”_not using the full path name, but instead it uses only the file name. The [search path used by windows to locate a DLL](http://msdn.microsoft.com/en-us/library/aa297182%28VS.60%29.aspx) has been exploited by the author of this worm to evade certain program from running.

And now 2010, another DLL Hijacking technique was introduced which may have been used by the attacker to infect the system. The technique is to drop file with a vulnerable file type together with the malicious DLL from within a directory controlled by the attacker.

We expect malwares using this technique and detect this malware.