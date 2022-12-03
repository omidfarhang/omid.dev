---
title: Firesheep author takes backhanded pot-shot at free speech
date: 2010-11-07T15:23:00+00:00
layout: single
author_profile: true
url: 2010/11/07/firesheep-author-takes-backhanded-pot-shot-at-free-speech/
tags:
  - Firefox
  - Firefox Addon
  - Hijack
  - privacy
  - report
  - social networking
lang: en
category: techblog
---
[<img title="sheep-on-fire" border="0" alt="sheep-on-fire" align="right" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TNa9d4EShQI/AAAAAAAADG0/Ahzie2qZpno/sheep-on-fire_thumb%5B1%5D.jpg?imgmax=800" width="170" height="170" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TNa9baB2g5I/AAAAAAAADGw/brAF7wJeFT4/s1600-h/sheep-on-fire%5B3%5D.jpg)**Sophos Labs**: Two weeks ago, an automatic session-hijacking plugin was released for Firefox. It was named <a href="http://boelectronic.blogspot.com/2010/10/firesheep-who-is-eating-my-cookies.html" target="_blank">Firesheep</a>, and it's been downloaded over 600,000 times so far.

The decision to release Firesheep publicly is a <a href="http://news.ycombinator.com/item?id=1827928" target="_blank">controversial</a> one. On the good side, it's reminded people that some of their common web surfing habits are dangerously insecure.

Many websites use HTTPS (secure HTTP) for login, which protects your password. But they revert to insecure HTTP for the rest of the session. After you have logged in, security relies on the browser sending a session cookie &#8211; a secret authentication token &#8211; in every request.

Websites which send session cookies in unencrypted HTTP requests are exposing your login credentials &#8211; albeit only for one session &#8211; to anyone else nearby on the network. If you're on an unencrypted WiFi connection, for example at a local coffee bar, then anyone within range of the WiFi access point can hijack your login.

Since Firesheep proves just how dangerous it is to send session cookies in insecure network packets, it is likely to push businesses such as Facebook and Twitter to adopt HTTPS as an all-session default much sooner than they might otherwise have done.

That's good.

On the bad side, those 600,000 downloads of Firesheep are 599,999 more than were strictly needed for the software to prove its point.

The author of Firesheep, Eric Butler, is unrepentant about releasing the tool. He's publicly commented that, &#8220;like any tool, Firesheep can be used for many things. In addition to raising awareness, it has already proven very useful for people who want to test their own security as well as the security of their (consenting) friends.&#8221;

He's also [aghast](http://codebutler.com/firesheep-a-week-later-ethics-and-legality) that Microsoft has started [detecting](http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?Name=HackTool%3AJS%2FFiresheep) his software as a potential threat, ranting that &#8220;by installing anti-virus, you grant a third party the ability to remove files from your system trusting that only malicious code will be targeted. Microsoft and other anti-virus vendors abuse this trust and assert what they think you should or should not be doing with your computer.&#8221;

Butler wants to have his cake and eat it.

He's suggesting that anyone who consents to install his tool &#8211; even though its primary function is to hijack other people's accounts &#8211; should be free to do so. Indeed, in his own blog, he offers the viewpoint that &#8220;code is a form of speech, and the freedom of speech must remain protected.&#8221; (As it happens, I don't disagree.)

But he vigorously denies the right to Microsoft &#8211; and all other security companies &#8211; to [express an opinion](http://www.microsoft.com/security/portal/Threat/Encyclopedia/Entry.aspx?Name=HackTool%3AJS%2FFiresheep) about his software when they come across it. That, opines Butler, is tantamount to censorship.

In Butler's world, a network administrator who decided to scan his network for potentially unwanted software, including tools that can be used for hacking purposes (the category in which Microsoft, rather reasonably, has placed Firesheep), would have to accept that his security tools could not report openly on what they find, because that would be censorship.

Seems that Butler has a rather one-sided view of free speech.

Moral of the story:

* Just because you can write code to prove a point doesn't mean you have to release it.

* If you do release it, you don't have to package it with a one-click install and a use-it-without-understanding-it GUI.

* If you download code which makes anti-social (and probably also illegal) online behavior easy, don't be anti-social with it.