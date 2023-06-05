---
title: How to rescue files encrypted by Data Doctor 2010?
date: 2010-01-06T23:19:00+00:00
layout: single
author_profile: true
url: 2010/01/06/how-to-rescue-files-encrypted-by-data-doctor-2010/
tags:
  - phishing
  - rogue software
  - scam
  - solution
lang: en
category: 
  - techblog
---
We have a tool available to do just that. [Click Here](http://sunbelt-software.com/support/dd2010_decrypter.rar).

**How to use dd2010_decrypter.exe to do batch processing:**

1. Place the encrypted files in a directory (i.e. c:\\encrypted_files\\)

2. Copy dd2010_decrypter.exe into another directory and FROM THAT DIRECTORY, run the following command:

for %f in (“c:\\encrypted\_files\\*.*”) do dd2010\_decrypter.exe %f %f.decrypted

All files in the encrypted_files folder will be processed and the new decrypted files will have the same name but their extension will be “.decrypted.”

CAUTION: be sure you put ONLY files that are to be decrypted into the target directory before you run dd2010_decrypter.exe

My Dec. 19 blog post [Data Doctor 2010 will make you sick](http://boelectronic.blogspot.com/2009/12/data-doctor-2010-will-make-you-sick.html)
