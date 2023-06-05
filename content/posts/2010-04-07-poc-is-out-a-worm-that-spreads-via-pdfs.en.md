---
title: "POC is out: a worm that spreads via PDFs"
date: 2010-04-07T23:00:00+00:00
layout: single
author_profile: true
url: 2010/04/07/poc-is-out-a-worm-that-spreads-via-pdfs/
tags:
  - advice
  - alert
  - Firefox
  - Foxit
  - malware
  - PDF
  - review
lang: en
category: 
  - techblog
---
A blog contributor who goes by the name of “jeremy” has continued to research the possibilities inherent in the recently discovered .pdf-file weakness that could enable the execution of code. Jeremy posted earlier this week that he had created a proof of concept .pdf file that could spread to other .pdf files on a system or network (which makes it a worm).

> “Within the proof of concept I infected a single benign PDF file from another PDF file, but this proof of concept could easily be modified to recursively traverse a users computer directories to find and infect all PDF files on that users computer and/or accessible to that user at the time of execution with any payload of my choosing.”
He wrote on the [SudoSecure.net site.](http://www.sudosecure.net/archives/644)

He also wrote: “This should really make you think twice even before you open up PDF files that have resided on your computer for years, as they could soon be utilized against you if an attacker chose to do so.”

Stevens chose the responsible disclosure route after he found the “feature” of .pdf that allowed running executables. Foxit pushed out Foxit Reader 3.2.1 to patch the problem Sunday. Adobe Reader pops up a warning, so, at least the process is visible.

When we  [blogged about it last week](http://boelectronic.blogspot.com/2010/03/running-executables-in-pdf-its-feature.html) we suggested: “It would be a good idea to READ any notification that pops up when you open a PDF file and DO NOT let yourself be social engineered into disregarding warnings about launching executables.”

Jeremy wrote about some other malicious possibilities: “Well I can think of some really nasty phishing attacks this style of attack could be utilized for. Just think if you landed on one of the oh so common web exploit packs or if the PDF was crafted to look like an official banking document that provided instructions to verify your information by entering it into the targeted URL. Hmm since arguments can be passed here is another thought. The PDF document itself could be an official looking banking document with a form embedded that allowed a user to fill out his or her information within the PDF document itself. At the bottom of the form a submit button calling the Launch action to execute Firefox or Internet Explorer while passing the information via URL arguments to an attackers happy to receive, parse, and store server. ”

The .pdf weakness was publicized by Didier Stevens [on his blog last week.](http://blog.didierstevens.com/2010/03/29/escape-from-pdf/)