---
title: Beware of Skype Phishing
date: 2010-02-01T23:11:00+00:00
layout: single
author_profile: true
url: 2010/02/01/beware-of-skype-phishing/
tags:
  - Bing
  - Google Chrome
  - phishing
  - scam
  - Skype
  - spam
lang: en
category: techblog
---
We were made aware that phishing for Skype credentials is currently taking place. The link the phishing mails direct to are dangerous – they aren’t detected by any phishing filter of the popular browsers yet.

One thing caught my attention. Modern browsers should support domain highlighting so that the real domain is visible when someone surfs the Internet. Like Internet Explorer 8 properly does:

<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S2dXyyziTII/AAAAAAAAAxI/fdH5Gi3EHpQ/s1600-h/01-IE8-URL_Highlight1.png" imageanchor="1"><img border="0" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S2dXyyziTII/AAAAAAAAAxI/fdH5Gi3EHpQ/s640/01-IE8-URL_Highlight1.png" /></a>
</div>

There you can clearly see that you are not on the Skype website, but on another domain.

Firefox does not highlight that URL:

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S2dXz68LJ5I/AAAAAAAAAxQ/aTH91bB4L18/s1600-h/02-FF-3.6-No_URL_Highlight1.png" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S2dXz68LJ5I/AAAAAAAAAxQ/aTH91bB4L18/s640/02-FF-3.6-No_URL_Highlight1.png" /></a>
</div>

Neither does Google Chrome:

<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S2dX1EivMaI/AAAAAAAAAxY/F0YfD1Jlhmw/s1600-h/03-Chrome-No_URL_Highlight1.png" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S2dX1EivMaI/AAAAAAAAAxY/F0YfD1Jlhmw/s640/03-Chrome-No_URL_Highlight1.png" /></a>
</div>

Chrome grays out the “disturbing” parts of that URL, like the URI, the path and parameters of the link. Still it may fool the user to think it is the Skype website.

Once a user gives away her/his credentials, the website redirects to the real Skype download page.

<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/S2dX2vMxwsI/AAAAAAAAAxg/PuZkX6gBPSo/s1600-h/04-Redirects_To_Skype.png" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/S2dX2vMxwsI/AAAAAAAAAxg/PuZkX6gBPSo/s640/04-Redirects_To_Skype.png" /></a>
</div>

users are well advised to properly check the links they are visiting before entering any personal data like login credentials.