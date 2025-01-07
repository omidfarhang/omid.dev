---
title: When is a picture not worth 1000 words?
date: 2010-04-03T15:09:00+00:00
layout: single
author_profile: true
url: 2010/04/03/when-is-a-picture-not-worth-1000-words/
tags:
  - malware
  - review
lang: en
categories: 
  - TechBlog
---
When it is not actually a picture but an obfuscated malicious VB script!

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7dSUqBHhII/AAAAAAAABdQ/GB_-vXFjoRw/s640/image-preview.png)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7dSUqBHhII/AAAAAAAABdQ/GB_-vXFjoRw/s1600-h/image-preview.png)

That’s the story with W32/VBSAuto-F — yet another autorun worm that sets a number of self-starting registry entries, spreads via USB drives, and downloads further malware. The worm embeds code in a [JPEG comment field](http://en.wikipedia.org/wiki/JPEG#Syntax_and_structure) of an ambiguously named file “image.jpg” or “imwin.jpg”.

Previewing such files as images remains innocuous, as picture viewers tend not to _execute_ meta data by default. This is unfortunately not the case when the file is run through the VB script engine, which is happy to interpret the same JPEG comment 0xFFFE header bytes to indicate [Little-Endian UTF-16](http://www.ietf.org/rfc/rfc2781.txt) encoded data and execute the remaining portion of the file as code.

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7dST7WGX0I/AAAAAAAABdM/MruZwYM02xs/s400/image-hex.png)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S7dST7WGX0I/AAAAAAAABdM/MruZwYM02xs/s1600-h/image-hex.png)

This malware is certainly not worth 1000 words, as even the deobfuscated malicious script itself weighs in at a mere 391 words total. Though for Sophos customers, there is one word that applies appropriately — protected.
