---
title: Closer look at W32/Ramnit.C
date: 2010-11-28T20:26:00+00:00
layout: single
author_profile: true
url: 2010/11/28/closer-look-at-w32ramnit-c/
tags:
  - AMD
  - malware
  - report
  - review
  - Vulnerability
lang: en
category: techblog
---
Thomas Wegele, Virus Researcher from Avira wrote: In this month’s ITW malware set from the Wildlist organization two new variants of W32/Ramnit appeared. W32/Ramnit is a Worm spreading via infected executable files and infected HTML Files. It is a quite widespread malware – which is why we decided to dig deeper into it.

Upon execution the malware creates a new file in the directory where it was started. This file is named “mgr.exe”. It then gets executed and creates a copy of itself in “C:\%ProgramDir%\Microsoft\WaterMark.exe” which also gets executed after creation and in turn infects the EXE, DLL and HTML files found on the system and tries to connect to a server.

W32/Ramnit.C adds an extra section with the name “.text” to the PE Files (EXE, DLL) found. The file analysed now contains two “.text” sections after the infection.

[<img title="w32_ramnit_section_table_frage" border="0" alt="w32_ramnit_section_table_frage" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TPKz5Bln_YI/AAAAAAAADO8/-dtlQUSuFzo/w32_ramnit_section_table_frage_thumb%5B3%5D.png?imgmax=800" width="469" height="394" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TPKz3QQt4wI/AAAAAAAADO4/hBaIj10WMqg/s1600-h/w32_ramnit_section_table_frage%5B5%5D.png)

The last section marked with a red frame is the new appended one and carries the malicious code. The file infector changes the entry point of the PE-file so that the malicious code is executed before the regular code. Right after execution of such an infected file, the aforementioned “mgr.exe” file will be created and starts infecting the files.

But W32/Ramnit.C is not only spreading via PE-files. The virus is also adding a Visual Basic for Scripting (VBS) script to HTML files on the infected system. The VBS script is concatenated at the end of the HTML file and 86.498 Bytes in size – which is very much compared to a hidden Iframe or something similar.

[<img title="script_begin" border="0" alt="script_begin" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TPKz7ws-BgI/AAAAAAAADPE/23kfEWI9nms/script_begin_thumb%5B2%5D.png?imgmax=800" width="504" height="89" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TPKz6UdpXZI/AAAAAAAADPA/mPG9Z9uGI-U/s1600-h/script_begin%5B4%5D.png)

The VBS script contains a “DropFileName” which is “svchost.exe” and the data which is a PE file compressed using UPX as hex string. And it also has code which is used to transcode that string and write the result to that file to the hard disk.

[<img title="script_end" border="0" alt="script_end" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TPKz_erGiPI/AAAAAAAADPM/g5Gmy5k9PeY/script_end_thumb%5B2%5D.png?imgmax=800" width="504" height="172" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TPKz9jyHUAI/AAAAAAAADPI/CwJgYTI1kKs/s1600-h/script_end%5B4%5D.png)

The newly created “svchost.exe” is written in the temporary folder which is defined in the system. On Windows 7 this is for example “C:\Users\<Username>\AppData\Local\Temp” by default. After creation the script executes the malicious, fake “svchost.exe” using WSHshell.Run.

The connection to a server which W32/Ramnit.C initiates uses TCP port 443. This port is normally used for HTTPS and thus isn’t filtered by many firewall solutions. Another measure to avoid detection by firewalls is that W32/Ramnit.C uses injects itself into a hidden executed Internet Explorer process for the communication to its C&C server.

This malware spreads via web sites, for example, as infected webmasters upload infected web pages and binary files to their servers – unknowingly. Avira anti malware solutions protect users from W32/Ramnit as they detect and block it.