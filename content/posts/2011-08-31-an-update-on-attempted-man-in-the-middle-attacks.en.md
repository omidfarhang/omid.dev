---
title: An update on attempted man-in-the-middle attacks
date: 2011-08-31T22:19:00+00:00
layout: single
author_profile: true
url: 2011/08/31/an-update-on-attempted-man-in-the-middle-attacks/
tags:
  - attack
  - Google
  - hack
  - Iran
  - report
  - SSL
lang: en
category: techblog
---
<div dir="ltr" trbidi="on">
  <div>
    <a href="http://4.bp.blogspot.com/-pRWbbTDU_xs/Tl6sGz7y_hI/AAAAAAAAEAc/QqyT7jOv5mo/s1600/Google.jpg" imageanchor="1"><img border="0" height="116" src="http://4.bp.blogspot.com/-pRWbbTDU_xs/Tl6sGz7y_hI/AAAAAAAAEAc/QqyT7jOv5mo/s320/Google.jpg" width="320" /></a>
  </div>
  
  <p>
    <b>Google:</b> Today we received reports of attempted SSL man-in-the-middle (MITM) attacks against Google users, whereby someone tried to get between them and encrypted Google services. The people affected were primarily located in Iran. The attacker used a fraudulent SSL certificate issued by DigiNotar, a root certificate authority that should not issue certificates for Google (and has since revoked it).<br />Google Chrome users were protected from this attack because Chrome was able to <a href="http://blog.chromium.org/2011/06/new-chromium-security-features-june.html">detect</a> the fraudulent certificate.
  </p>
  
  <p>
    To further protect the safety and privacy of our users, we plan to disable the DigiNotar certificate authority in Chrome while investigations continue. Mozilla also <a href="http://blog.mozilla.com/security/2011/08/29/fraudulent-google-com-certificate/">moved quickly</a> to protect its users. This means that Chrome and Firefox users will receive alerts if they try to visit websites that use DigiNotar certificates. Microsoft also has <a href="http://blogs.technet.com/b/msrc/archive/2011/08/29/microsoft-releases-security-advisory-2607712.aspx">taken prompt action</a>.
  </p>
  
  <p>
    To help deter unwanted surveillance, we recommend that users, especially those in Iran, keep their web browsers and operating systems up to date and pay attention to web browser security warnings.
  </p>
</div>