---
title: Oficla downloads MBR Ransomware
date: 2010-12-01T17:32:00+00:00
layout: single
author_profile: true
url: 2010/12/01/oficla-downloads-mbr-ransomware/
tags:
  - advice
  - alert
  - Hardware
  - malware
  - news
  - report
  - review
lang: en
categories: 
  - techblog
---
**Avira TechBlog:** We discovered a new ransomware threat which is downloaded by a Trojan of the Oficla family. This downloaded threat replaces the MBR (master boot record) of the hard disk with its own MBR which asks the user for a password and thus blocks the loading of the operating system.

Upon starting the Oficla Trojan and successive execution of the downloaded payload the system will be rebooted and the user will be presented the ransom notice.

[<img title="screenshot" border="0" alt="screenshot" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TPZ_fGIQdzI/AAAAAAAADUY/rXxx0KTJ8TY/screenshot_thumb.png?imgmax=800" width="500" height="90" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TPZ_dLUtZ5I/AAAAAAAADUU/PjsySorD2CY/s1600-h/screenshot%5B2%5D.png)

The notice of the manipulated boot sector claims that all the hard drives were encrypted – this is a lie though; all the files are still intact and can be accessed as usual.

It is interesting that the malicious binary is not crypted or obfuscated at all, even the message which will be placed into the MBR is available in plain-text. This is quite unusual nowadays.

[<img title="binary" border="0" alt="binary" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TPZ_jofhLoI/AAAAAAAADUg/Y0qWbL6tEyk/binary_thumb.png?imgmax=800" width="500" height="79" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TPZ_hVnx_3I/AAAAAAAADUc/D1-0s_nbxF4/s1600-h/binary%5B2%5D.png)

As you can see, the “ID” is not generated in a random way, it’s the same for each infection. Therefore the victims which are infected can use the password “aaaaaaciip” which will restore the original MBR and Windows will start again.

Avira detects the malware as TR/Ransom.Seftad.A. The malicious boot sector is detected as “BOO/Seftad.A”.