---
title: Critical Adobe Flaw without Patch
date: 2011-03-15T09:23:00+00:00
layout: single
author_profile: true
url: 2011/03/15/critical-adobe-flaw-without-patch/
tags:
  - Adobe
  - Vulnerability
lang: en
categories: 
  - techblog
---
[<img title="logo-flashplayer" border="0" alt="logo-flashplayer" align="right" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TX8pCoPGK0I/AAAAAAAADs0/C_EPdTJcAkU/logo-flashplayer_thumb%5B2%5D.jpg?imgmax=800" width="45" height="45" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TX8pBaVIWrI/AAAAAAAADsw/Yb8UJLB5OfQ/s1600-h/logo-flashplayer%5B4%5D.jpg)**Avira TechBlog:** A vulnerability within the current versions of Adobe Flash Player on all supported platforms has been found, [warns the company](http://www.adobe.com/support/security/advisories/apsa11-01.html). Affected are not only the Flash Player installations, but also Adobe Reader and Acrobat via the “authplay.dll” Flash Player integration. Currently there is no mitigation which will help against the exploitation – so only opening expected documents from trusted sources for the time being is a good advice.

Adobe explains that they found an Excel sheet with malicious SWF content exploiting the vulnerability as an email attachment in a very limited, targeted attack. The reason for this is simple – one wouldn’t expect such malicious content in an Excel sheet; not opening unrequested documents thus is a way to mitigate the risk. Adobe plans to ready an update until next week aorund the 21st of March and will ship it immediately then. For Adobe Reader X the patch will take a little longer as the integrated sandbox prevents a successful exploit.