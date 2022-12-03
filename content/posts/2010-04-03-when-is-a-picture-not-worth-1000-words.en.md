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
category: techblog
---
When it is not actually a picture but an obfuscated malicious VB script!

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S7dSUqBHhII/AAAAAAAABdQ/GB_-vXFjoRw/s1600-h/image-preview.png" imageanchor="1"><img border="0" height="268" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S7dSUqBHhII/AAAAAAAABdQ/GB_-vXFjoRw/s640/image-preview.png" width="417" /></a>
</div>

That’s the story with W32/VBSAuto-F — yet another autorun worm that sets a number of self-starting registry entries, spreads via USB drives, and downloads further malware. The worm embeds code in a <a href="http://en.wikipedia.org/wiki/JPEG#Syntax_and_structure" target="_blank">JPEG comment field</a> of an ambiguously named file “image.jpg” or “imwin.jpg”.

Previewing such files as images remains innocuous, as picture viewers tend not to _execute_ meta data by default. This is unfortunately not the case when the file is run through the VB script engine, which is happy to interpret the same JPEG comment 0xFFFE header bytes to indicate <a href="http://www.ietf.org/rfc/rfc2781.txt" target="_blank">Little-Endian UTF-16</a> encoded data and execute the remaining portion of the file as code.

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S7dST7WGX0I/AAAAAAAABdM/MruZwYM02xs/s1600-h/image-hex.png" imageanchor="1"><img border="0" height="42" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S7dST7WGX0I/AAAAAAAABdM/MruZwYM02xs/s400/image-hex.png" width="400" /></a>
</div>

This malware is certainly not worth 1000 words, as even the deobfuscated malicious script itself weighs in at a mere 391 words total. Though for Sophos customers, there is one word that applies appropriately — protected.