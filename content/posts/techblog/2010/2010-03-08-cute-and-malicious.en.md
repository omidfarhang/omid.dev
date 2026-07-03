---
title: Cute (and malicious)
date: 2010-03-08T22:33:00+00:00
layout: single
author_profile: true
url: 2010/03/08/cute-and-malicious/
tags:
  - Facebook
  - Hijack
  - Malware
  - review
  - social networking
  - spam
  - Security

categories:
  - TechBlog
---
There’s an angelically tinged infection doing the rounds at the moment that has more than a whiff of sulphur about it.

We can't say for definite, but it looks like the point of this little angel is to turn your PC into a file storage area for an IRC channel since it dumps you into #music IRC channels and makes sure you can accept various media files.

Our tale begins with an Email, claiming you have a “funny picture from Facebook friends” waiting for you at Oast(dot)com:

[![](/images/2010/03/oast1.jpg)](/images/2010/03/oast1-e74be40a.jpg)

This is what the end-user will download onto their system – an executable claiming to be a .gif:

[![](/images/2010/03/oast2.jpg)](/images/2010/03/oast2-d70c1870.jpg)

Should they run the file, two things will happen. The first is that a rather charming image will appear on their desktop (courtesy of a hidden file called “Out.exe” which is dropped into the User Account Temp folder) – all part of the general ruse to make them think that yes, they really have been sent a “funny picture”:

[![](/images/2010/03/oast4.jpg)](/images/2010/03/oast4-d7b9e378.jpg)

The second is a little more sinister – an entire hidden directory (called tmp0000729b, dropped into the Windows Temp folder) arrives unannounced, laying the groundwork for an IRC invasion:

[![](/images/2010/03/oast3.jpg)](/images/2010/03/oast3-ea074a09.jpg)

Yes, anyone blessed with the “vision” of those little angels is now part of a collection of IRC drones. If the end-user should hover their mouse over the seemingly empty system tray, they’ll actually discover the mIRC Daemon running in a hidden state:

[![](/images/2010/03/oast5.jpg)](/images/2010/03/oast5-ff441d37.jpg)

As is typical for an IRC related hijack, everything is hidden away to keep the end-user from suspecting anything is wrong. Hidden mIRC tools, and seemingly deserted IRC channels are the order of the day. Shall we open up the mIRC client and play a little game of “Now you see it, now you don’t” in reverse?

[![](/images/2010/03/oast6.jpg)](/images/2010/03/oast6-a04f2320.jpg)

Taken at face value, the above screenshots shows the victim sitting in an empty IRC channel. However, a quick highlight and…

[![](/images/2010/03/oast7.jpg)](/images/2010/03/oast7-6453af78.jpg)

…there they are, sitting beneath a pair of Admins in a #Music room.  You can set mIRC to accept and ignore certain types of files by default, and here the client is indeed set to disallow .exes, .dlls .bat and .scr files but allow normal files such as .wavs, .jpegs, .gifs and MP3s. The victim is placed into numerous #Music rooms like the one above on various IRC servers, so it’s a possibility the intention here is media sharing by way of compromised PCs.

Detections aren’t great at the moment (11/42 in VirusTotal)  
<http://www.virustotal.com/analisis/9618c83546c16ae1dab70ca0d2e594c2dd41f622820d92e7bc9e22f2b3bc9f38-1267769547>