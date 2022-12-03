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
category: techblog
---
We have a tool available to do just that. [Click Here](http://sunbelt-software.com/support/dd2010_decrypter.rar).<span><a href="http://sunbelt-software.com/support/dd2010_decrypter.rar" target="_blank"></a></span>

<div>
</div>

<div>
  <div>
    <b>How to use dd2010_decrypter.exe to do batch processing:</b>
  </div>
  
  <div>
  </div>
  
  <div>
    1. Place the encrypted files in a directory (i.e. c:\encrypted_files\)
  </div>
  
  <div>
  </div>
  
  <div>
    2. Copy dd2010_decrypter.exe into another directory and FROM THAT DIRECTORY, run the following command:
  </div>
  
  <div>
  </div>
  
  <div>
    for %f in (&#8220;c:\encrypted_files\*.*&#8221;) do dd2010_decrypter.exe %f %f.decrypted
  </div>
  
  <div>
  </div>
  
  <div>
    All files in the encrypted_files folder will be processed and the new decrypted files will have the same name but their extension will be “.decrypted.”
  </div>
  
  <div>
  </div>
  
  <div>
    CAUTION: be sure you put ONLY files that are to be decrypted into the target directory before you run dd2010_decrypter.exe
  </div>
  
  <p>
    My Dec. 19 blog post <a href="http://boelectronic.blogspot.com/2009/12/data-doctor-2010-will-make-you-sick.html">Data Doctor 2010 will make you sick</a> </div>