---
title: Backdoor Uses Evernote as Command-and-Control Server
date: 2013-03-29T00:53:00+00:00
layout: single
author_profile: true
url: 2013/03/29/backdoor-uses-evernote-as-command-and-control-server/
image: /images/2013/03/evernote.jpg
tags:
  - analyze
  - Evernote
  - malware
lang: en
categories: 
  - TechBlog
---
[![Evernote](http://lh5.ggpht.com/-UZupKZ2CBOQ/UVTezUnrQ1I/AAAAAAAAIDQ/u45IOWgX-Ek/Evernote_thumb.png?imgmax=800 "Evernote")](http://lh3.ggpht.com/-V5AGetYXHzk/UVTevh8EfuI/AAAAAAAAIDI/oy6-Q1Yi0zA/s1600-h/Evernote%25255B2%25255D.png)With its rich functionality and accessibility, Evernote is a popular note-taking tool for its many users. Unfortunately, it may also provide the perfect cover for cybercriminals’ tracks.

We recently uncovered a malware that appears to be using Evernote as a communication and control (C&C) server. The malware attempts to connect to Evernote via _https://evernote.com/intl/zh-cn_, which is a legitimate URL.

[![Evernote-backdoor-strings](http://lh5.ggpht.com/-7-_6LRyj-kc/UVTe5TGjyqI/AAAAAAAAIDg/JSGXpFb9Tcs/Evernote-backdoor-strings_thumb%25255B2%25255D.jpg?imgmax=800 "Evernote-backdoor-strings")](http://lh6.ggpht.com/-WlYuO6mkcEE/UVTe2Cd5cTI/AAAAAAAAIDY/DZStZpDf-54/s1600-h/Evernote-backdoor-strings%25255B5%25255D.jpg)

The sample we gathered consists of an executable file, which drops a .DLL file and injects it into a legitimate process. The said .DLL file performs the actual backdoor routines.

Read the rest of story in TrendMicro blog: [http://blog.trendmicro.com/trendlabs-security-intelligence/backdoor-uses-evernote-as-command-and-control-server/](http://blog.trendmicro.com/trendlabs-security-intelligence/backdoor-uses-evernote-as-command-and-control-server/)