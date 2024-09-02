---
title: "Worth Reading: Escape from Adobe's sandbox"
date: 2012-06-25T16:35:00+00:00
layout: single
author_profile: true
url: 2012/06/25/worth-reading-escape-from-adobes-sandbox/
tags:
  - Adobe
  - sandbox
  - security
lang: en
categories: 
  - techblog
---
<a href="http://lh4.ggpht.com/-aybwqy1UQcQ/T-iMWjfZ89I/AAAAAAAAGXc/Rf9hKbePy6w/s1600-h/adobe%252520reader%25255B5%25255D.jpg" target="_blank"><img title="adobe reader" border="0" alt="adobe reader" align="right" src="http://lh4.ggpht.com/-_vwlEK3JFds/T-iMYTsGZaI/AAAAAAAAGXk/xhtZ1_T5FuA/adobe%252520reader_thumb%25255B3%25255D.jpg?imgmax=800" width="160" height="165" /></a>Adobe Reader X runs in a sandbox at a very restricted privilege level. Important system calls are supposed to be handled by a special broker process that will subject them to extensive testing. However, a small design flaw allows attackers to escape from this sandbox and execute arbitrary code – despite having both [ASLR](http://en.wikipedia.org/wiki/Address_space_layout_randomization) (Address Space Layout Randomisation) and [DEP](http://en.wikipedia.org/wiki/Data_Execution_Prevention) (Data Execution Prevention). 

As described by Guillaume Delugré, the broker process is at the heart of the exploit as it uses a memory page allocated via `VirtualAllocEx` to store the overwritten code of system calls which have been redirected to the broker. Despite having ASLR, however, the memory address returned by `VirtualAllocEx` is not randomised. This means that the Windows system function call will end up in a predictable, “nearly constant” location which the exploit can then access directly. 

In a blog post, Delugré goes on to further detail, providing an interesting and informative account of the rest of the exploit's path up to the execution of the code, which is injected via a specially crafted PDF file. The author also provides some proof-of-concept code and various scripts that helped him assemble the exploit. 

  * [Bypassing ASLR and DEP on Adobe Reader X](http://esec-lab.sogeti.com/post/Bypassing-ASLR-and-DEP-on-Adobe-Reader-X), blog post by Guillaume Delugré from Sogeti ESEC Lab.











[http://h-online.com/-1625545](http://h-online.com/-1625545 "http://h-online.com/-1625545")