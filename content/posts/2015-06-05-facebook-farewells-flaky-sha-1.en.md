---
title: Facebook farewells flaky SHA-1
date: 2015-06-05T15:12:10+00:00
layout: single
author_profile: true
url: 2015/06/05/facebook-farewells-flaky-sha-1/
shortlink: https://g.omid.dev/1T3myNN
tags:
  - Facebook
  - SHA-1
  - SSL
  - Update
lang: en
category: techblog
---
<img class="alignright wp-image-6593 size-thumbnail" src="/images/2013/05/Facebook-150x150.png" alt="Facebook" width="150" height="150" srcset="/images/sites/3/2013/05/Facebook-150x150.png 150w, /images/sites/3/2013/05/Facebook.png 300w" sizes="(max-width: 150px) 100vw, 150px" />Facebook has set the date: on September 30, the ancient and creaking SHA-1 hashing algorithm will make its tumbril trip and get the chop.

SHA-1, designed by the NSA in 1995, is a one-way algorithm: a block of data is turned into a message digest. The digest can't be turned back into the original message, but serves as a digital signature confirming the authenticity of (for example) the software you've downloaded.

And it's long been on the end-of-life list, because it's vulnerable to collision attacks – different blocks of data can present the same SHA-1 hash, allowing malware to verify as if it were authentic.

From October 1, The Social Network<sup><small>TM</small></sup> says, third-party apps signed with SHA-1 will no longer be able to connect to Facebook.

As Facebook's <a href="https://developers.facebook.com/blog/post/2015/06/02/SHA-2-Updates-Needed" target="_blank">Adam Gross blogs</a>, the move is in line with the Certificate Authority and Browser Forum's intention to sunset SHA-1 by January 2016.

“We'll be updating our servers to stop accepting SHA-1 based connections before this final date, on October 1, 2015. After that date, we'll require apps and sites that connect to Facebook to support the more secure SHA-2 connections”, Gross wrote.

Facebook recommends that “applications, SDKs, or devices that connect to Facebook” be checked for SHA-2 support, to avoid user irritation.

The migration hasn't been without its detractors. Earlier this year, infosec bods told _The Register_ the shift <a href="http://www.theregister.co.uk/2015/04/30/sha_2_migration_headaches/" target="_blank">poses challenges</a>. If users see disruption – for example, too many “insecure site” warnings – they fear that trust in the Internet will be undermined.

_Cross-posted from <a href="http://www.theregister.co.uk/" target="_blank">TheRegister</a>_