---
title: 7-Zip version 9 is out
date: 2010-11-22T00:29:00+00:00
layout: single
author_profile: true
url: 2010/11/22/7-zip-version-9-is-out/
tags:
  - software
  - Updates
lang: en
categories: 
  - techblog
---
For those who missed this update on Nov 18:

[<img title="7ziplogo" border="0" alt="7ziplogo" align="right" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TOmyR3JjWNI/AAAAAAAADMY/7bD0gUEQdUo/7ziplogo_thumb%5B1%5D.png?imgmax=800" width="110" height="63" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TOmyO7vKyrI/AAAAAAAADMU/vdhHUycKUqs/s1600-h/7ziplogo%5B3%5D.png)7-Zip 9.20 was released.

7-Zip for 32-bit Windows:  
<http://downloads.sourceforge.net/sevenzip/7z920.exe>  
Mirror: [http://www.filehippo.com/download\_7zip\_32/](http://www.filehippo.com/download_7zip_32/ "http://www.filehippo.com/download_7zip_32/")

7-Zip for 64-bit Windows x64:  
<http://downloads.sourceforge.net/sevenzip/7z920-x64.msi>  
Mirror: [http://www.filehippo.com/download\_7-zip\_64/](http://www.filehippo.com/download_7-zip_64/ "http://www.filehippo.com/download_7-zip_64/")

What's new after 7-Zip 4.65 (2009-02-03): 

  * 7-Zip now supports LZMA2 compression method.
  * 7-Zip now can update solid .7z archives.
  * 7-Zip now supports XZ archives.
  * 7-Zip now supports PPMd compression in ZIP archives.
  * 7-Zip now can unpack NTFS, FAT, VHD, MBR, APM, SquashFS, CramFS, MSLZ archives.
  * 7-Zip now can unpack GZip, BZip2, LZMA, XZ and TAR archives from stdin.
  * 7-Zip now can unpack some TAR and ISO archives with incorrect headers.
  * 7-Zip now supports files that are larger than 8 GB in TAR archives.
  * NSIS and WIM support was improved.
  * Partial parsing for EXE resources, SWF and FLV.
  * The support for archives in installers was improved.
  * 7-Zip now stores NTFS file timestamps to ZIP archives.
  * Speed optimizations in PPMd codec.
  * Speed optimizations in AES code for Intel's 32nm CPUs.
  * Speed optimizations in CRC calculation code for Intel's Atom CPUs.
  * New -scc{WIN|DOS|UTF-8} switch to specify charset for console input/output (default = DOS).
  * New -scrc switch to calculate total CRC-32 during extracting / testing.
  * New additional “Open archive >” item in context menu allows to select archive type for some files.
  * It's possible to specify Diff program in options (7-Zip File Manager).
  * 7-Zip now can open/copy/compress disk images (like \\.\c:) from \\.\ folder.
  * 7-Zip File Manager now doesn't use temp files to open nested archives stored without compression.
  * The console version now doesn't show entered password.
  * New small SFX module for installers (in Extra package).
  * Disk fragmentation problem for ZIP archives created by 7-Zip was fixed.
  * Some bugs were fixed.
  * New localizations: Hindi, Gujarati, Sanskrit, Tatar, Uyghur, Kazakh.