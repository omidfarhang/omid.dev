---
title: Identifying Malicious Blogspot pages used by Koobface
date: 2010-01-06T15:11:00+00:00
layout: single
author_profile: true
url: 2010/01/06/identifying-malicious-blogspot-pages-used-by-koobface/
tags:
  - Facebook
  - phishing
  - scam
lang: en
category: techblog
---
Koobface is still going strong despite not making the headlines so much anymore. Well, the Koobface gang took the time to send a Christmas card and wish security researchers a happy new year. Very nice of them…

For a couple of days now I’ve been looking at their infection method and trying to see any interesting patterns.

The bad guys use bogus blogpost.com blog pages to redirect users to the actual Koobface malware. The redirection consists of several attempts to connect to compromised PCs, through their IP address. Below is a Fiddler log showing those attempted connections (in red are failed connections). Once a host has successfully responded, the users are redirected to a fake page prompting them to install a video codec.

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S0SgS5taGNI/AAAAAAAAAlo/xK9HOi3YrCQ/s640/koob1.png)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S0SgS5taGNI/AAAAAAAAAlo/xK9HOi3YrCQ/s1600-h/koob1.png)

Typical social engineering used to lure the user into installing the malware:

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S0SgUqJQISI/AAAAAAAAAlw/sfe0fMr4svU/s640/xmas.png)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S0SgUqJQISI/AAAAAAAAAlw/sfe0fMr4svU/s1600-h/xmas.png)

The common traits for the Koobface infection process are:

– a malicious / redirect blogspot.com page  
– an infected PC hosting the malware

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S0SgQbSgbPI/AAAAAAAAAlI/d-5W6spHm2Y/s640/blog1.png)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S0SgQbSgbPI/AAAAAAAAAlI/d-5W6spHm2Y/s1600-h/blog1.png)

If you look in more detail at the blogspot.com pages, they reveal some interesting things too:

[![](http://3.bp.blogspot.com/_vaUVXcmC3OI/S0SgQ2sxUoI/AAAAAAAAAlQ/gaQ4SWaMNyA/s640/blog2.png)](http://3.bp.blogspot.com/_vaUVXcmC3OI/S0SgQ2sxUoI/AAAAAAAAAlQ/gaQ4SWaMNyA/s1600-h/blog2.png)

The pages use SEO and social engineering tricks to be ranked high in Google searches. Basically, anything that makes the headlines in the real world is going to generate interest and therefore traffic. That’s exactly what the Koobface gang is after!

Now not all malicious blogspot.com pages use the same titles… But, if you can indentify a new title you can harvest many more malicious pages.

Here is an example: I found yet another string of keywords used by the Koobface gang in one of their blogspot.com pages. (Download the page locally with wget and then take a look at the source code).  
Then do a Google search following that structure:

site:blogspot.com intitle:”XXXXXXXXXXXXXXXXX”

where XXXXXXXXXXXXXXXXX is the catch phrase used by the Koobface criminals.

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S0SgRbuhB-I/AAAAAAAAAlY/pdMLuzbijqg/s640/blog3.png)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S0SgRbuhB-I/AAAAAAAAAlY/pdMLuzbijqg/s1600-h/blog3.png)

What you get are similar pages that will redirect you to more infected PCs:

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S0SgSVLYVfI/AAAAAAAAAlg/s5YmB-7VEpM/s640/blog4.png)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S0SgSVLYVfI/AAAAAAAAAlg/s5YmB-7VEpM/s1600-h/blog4.png)