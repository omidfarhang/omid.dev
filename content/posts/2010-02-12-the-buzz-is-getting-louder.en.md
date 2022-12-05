---
title: The Buzz is getting LOUDER
date: 2010-02-12T21:01:00+00:00
layout: single
author_profile: true
url: 2010/02/12/the-buzz-is-getting-louder/
tags:
  - alert
  - AOL
  - Bing
  - Firefox
  - Google
  - Google Chrome
  - malware
  - Yahoo
lang: en
category: techblog
---
It has been barely two days since Google [announced ](http://googleblog.blogspot.com/2010/02/introducing-google-buzz.html)their new social integration and messaging tool called Google Buzz. Today we saw the first example of malware, W32/Zuggie-A, pretending to be Google Buzz.  
Analysis of W32/Zuggie-A gives the impression of a hastily assembled worm, really a modification of the W32/SillyFDC family of worms but with a twist.  
When W32/Zuggie-A is installed, it creates the following files:

* Program Files\Mozilla Firefox\extensions\{9CE11043-9A15-4207-A565-0C94C42D590D}\chrome\content\timer.xul
* Program Files\Mozilla Firefox\extensions\{9CE11043-9A15-4207-A565-0C94C42D590D}\chrome.manifest
* Program Files\Mozilla Firefox\extensions\{9CE11043-9A15-4207-A565-0C94C42D590D}\install.rdf
* System\googlebuzz.exe – copy of W32/Zuggie-A
* System\GoogleUpte.exe – copy of W32/Zuggie-A

W32/Zuggie-A modifies the registry to autostart GoogleUpte.exe and googlebuzz.exe.  
A quick search shows that the CLSID: 9CE11043-9A15-4207-A565-0C94C42D590D has previously been seen in multiple worms. This supports my theory that this is a hastily assembled worm built from recycled malware. I fired up a copy of Firefox on the infected machine and, as determined from analysis, found an installed Firefox extension called **Firefox security 2.0** – _Internal security options editor_ under the extensions tab of Firefox Add-ons.  
This “security extension” has added a JavaScript (timer.xul), which is triggered when the browser queries: yahoo.com, bing.com, google.com, aol.com/aol/search, ask.com and executes JavaScript hosted on:  
searchrequest1 . com / request . php ? aid = blackout  
which will silently click all Google or Yahoo Ads. displayed on the search results page (hey why not make a few bucks while infecting eh?).  
Google Buzz is new and is garnering quite a bit of interest and adoption among Internet users including myself. Clearly the malware authors view Google Buzz as the fresh big lucrative social fruit to exploit much like they have done with Facebook, MySpace, Hi5 and others. So in the coming weeks and months I predict we will see a host of new malware exploiting or attempting to exploit Google Buzz as the malware authors  figure out its internals. This may have only been an exploratory attempt or a quick response to the latest craze – only time will tell.
