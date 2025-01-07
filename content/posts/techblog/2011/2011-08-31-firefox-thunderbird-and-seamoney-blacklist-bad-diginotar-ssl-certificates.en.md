---
title: Firefox, Thunderbird and SeaMoney blacklist bad DigiNotar SSL certificates
date: 2011-08-31T15:54:00+00:00
layout: single
author_profile: true
url: 2011/08/31/firefox-thunderbird-and-seamoney-blacklist-bad-diginotar-ssl-certificates/
tags:
  - Firefox
  - Google
  - Mozilla
  - SeaMoney
  - security
  - Thunderbird
  - Updates
lang: en
categories: 
  - TechBlog
---
[![](http://4.bp.blogspot.com/-Zwp8qtOYnck/Tl5R13-a_GI/AAAAAAAAEAA/FjeHZsZ7Rzc/s1600/logo_footer.png)](http://4.bp.blogspot.com/-Zwp8qtOYnck/Tl5R13-a_GI/AAAAAAAAEAA/FjeHZsZ7Rzc/s1600/logo_footer.png)

**Mozilla Security Blog:** Mozilla just released an update to Firefox for Desktop, Thunderbird and SeaMonkey. Updates are now available for:

*   Firefox for Windows, Mac and Linux (final release)
*   Firefox for Windows, Mac and Linux (3.6.21 final release)
*   Firefox Aurora for Windows, Mac and Linux
*   Firefox Nightly for Windows, Mac and Linux
*   SeaMonkey (2.3.2)
*   Thunderbird (6.0.1)

We strongly recommend that all users upgrade to these releases.

If you already have Firefox, you will receive an automated update notification within 24 to 48 hours. Users can also [manually check for updates](http://support.mozilla.com/kb/Updating%20Firefox?s=manual+update&as=s#w_how-do-i-manually-check-for-updates) if they do not want to wait for the automatic update.

New versions of Firefox for Mobile (final release and Beta), Firefox Beta for Desktop and Thunderbird will be released shortly.

Issue  
Mozilla was informed today about the issuance of at least one fraudulent SSL certificate for public websites belonging to Google, Inc. This is not a Firefox-specific issue, and the certificate has now been revoked by its issuer, DigiNotar. This should protect most users.

Impact to users  
Users on a compromised network could be directed to sites using a fraudulent certificate and mistake them for the legitimate sites. This could deceive them into revealing personal information such as usernames and passwords. It may also deceive users into downloading malware if they believe it’s coming from a trusted site. We have received reports of these certificates being used in the wild.

Status  
Because the extent of the mis-issuance is not clear, we are releasing new versions of Firefox for desktop (3.6.21, 6.0.1, 7, 8, and 9) and mobile (6.0.1, 7, 8, and 9), Thunderbird (3.1.13, and 6.0.1) and SeaMonkey (2.3.2) shortly that will revoke trust in the DigiNotar root and protect users from this attack. We encourage all users to keep their software up-to-date by regularly applying security updates. Users can also [manually disable the DigiNotar root through the Firefox preferences.](http://support.mozilla.com/en-US/kb/deleting-diginotar-ca-cert)

Credit  
This issue was reported to us by Google, Inc.