---
title: Cute (and malicious)
date: 2010-03-08T22:33:00+00:00
layout: single
author_profile: true
url: 2010/03/08/cute-and-malicious/
tags:
  - Facebook
  - Hijack
  - malware
  - review
  - social networking
  - spam
lang: en
category: techblog
---
There’s an angelically tinged infection doing the rounds at the moment that has more than a whiff of sulphur about it.

We can't say for definite, but it looks like the point of this little angel is to turn your PC into a file storage area for an IRC channel since it dumps you into #music IRC channels and makes sure you can accept various media files.

Our tale begins with an Email, claiming you have a “funny picture from Facebook friends” waiting for you at Oast(dot)com:

<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S5VylbeKfuI/AAAAAAAABOE/Q7MEAZiG2kg/s1600-h/oast1.jpg" imageanchor="1"><img border="0" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S5VylbeKfuI/AAAAAAAABOE/Q7MEAZiG2kg/s640/oast1.jpg" /></a>
</div>

This is what the end-user will download onto their system – an executable claiming to be a .gif:

<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S5VymRKu5qI/AAAAAAAABOM/Rgx7lr80nnI/s1600-h/oast2.jpg" imageanchor="1"><img border="0" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S5VymRKu5qI/AAAAAAAABOM/Rgx7lr80nnI/s640/oast2.jpg" /></a>
</div>

Should they run the file, two things will happen. The first is that a rather charming image will appear on their desktop (courtesy of a hidden file called “Out.exe” which is dropped into the User Account Temp folder) – all part of the general ruse to make them think that yes, they really have been sent a “funny picture”:

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5VypXMfPiI/AAAAAAAABOc/1KBOqgLfiRs/s1600-h/oast4.jpg" imageanchor="1"><img border="0" height="278" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5VypXMfPiI/AAAAAAAABOc/1KBOqgLfiRs/s400/oast4.jpg" width="400" /></a>
</div>

The second is a little more sinister – an entire hidden directory (called tmp0000729b, dropped into the Windows Temp folder) arrives unannounced, laying the groundwork for an IRC invasion:

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5Vyoc-hVEI/AAAAAAAABOU/sogsjHnj22E/s1600-h/oast3.jpg" imageanchor="1"><img border="0" height="400" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5Vyoc-hVEI/AAAAAAAABOU/sogsjHnj22E/s400/oast3.jpg" width="366" /></a>
</div>

Yes, anyone blessed with the “vision” of those little angels is now part of a collection of IRC drones. If the end-user should hover their mouse over the seemingly empty system tray, they’ll actually discover the mIRC Daemon running in a hidden state:

<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S5VyqSrsCwI/AAAAAAAABOk/N15_S4hJHB0/s1600-h/oast5.jpg" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S5VyqSrsCwI/AAAAAAAABOk/N15_S4hJHB0/s640/oast5.jpg" /></a>
</div>

As is typical for an IRC related hijack, everything is hidden away to keep the end-user from suspecting anything is wrong. Hidden mIRC tools, and seemingly deserted IRC channels are the order of the day. Shall we open up the mIRC client and play a little game of “Now you see it, now you don’t” in reverse?

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5Vyq6DZI3I/AAAAAAAABOs/PSZCzHdYT3k/s1600-h/oast6.jpg" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5Vyq6DZI3I/AAAAAAAABOs/PSZCzHdYT3k/s640/oast6.jpg" /></a>
</div>

Taken at face value, the above screenshots shows the victim sitting in an empty IRC channel. However, a quick highlight and&#8230;

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5VysydVgLI/AAAAAAAABO0/5t503nZmXAs/s1600-h/oast7.jpg" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5VysydVgLI/AAAAAAAABO0/5t503nZmXAs/s640/oast7.jpg" /></a>
</div>

&#8230;there they are, sitting beneath a pair of Admins in a #Music room.  You can set mIRC to accept and ignore certain types of files by default, and here the client is indeed set to disallow .exes, .dlls .bat and .scr files but allow normal files such as .wavs, .jpegs, .gifs and MP3s. The victim is placed into numerous #Music rooms like the one above on various IRC servers, so it’s a possibility the intention here is media sharing by way of compromised PCs.

Detections aren’t great at the moment (11/42 in VirusTotal)  
<http://www.virustotal.com/analisis/9618c83546c16ae1dab70ca0d2e594c2dd41f622820d92e7bc9e22f2b3bc9f38-1267769547>