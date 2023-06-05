---
title: Chrome may get a password generator
date: 2012-02-21T15:54:00+00:00
layout: single
author_profile: true
url: 2012/02/21/chrome-may-get-a-password-generator/
tags:
  - Browser
  - Google
  - Google Chrome
  - Password
  - rumor
lang: en
category: 
  - techblog
---
[<img title="ChromePassword" border="0" alt="ChromePassword" align="right" src="http://lh3.ggpht.com/-oK2iESuzwiY/T0O3Fvbx__I/AAAAAAAAE5Y/Pw1dHxo4UME/ChromePassword_thumb.png?imgmax=800" width="244" height="104" />](http://lh5.ggpht.com/-Hunk8GBv7O8/T0O23sJbzzI/AAAAAAAAE5Q/VLtiTtFTa9k/s1600-h/ChromePassword%25255B2%25255D.png)**The H-Online:** Google's solution for the problem of getting better passwords on the net – a combination of browser sign-in and[OpenID](http://openid.net/) – will take some time to implement as it involves persuading sites to switch to using OpenID. The developers on the Chrome project think that they can at least improve the security of passwords on sites, by generating passwords for the user. A new [Password Generation](https://sites.google.com/a/chromium.org/dev/developers/design-documents/password-generation) proposal for the Chromium and Chrome browsers attempts to address that by assuming that once the user is signed into the browser, it can take over the handling of password creation. 

When a user is prompted by a web site for a username and two password fields, or some other heuristic for detecting when passwords will need to be generated, the extension will suggest an appropriate password in a pop-up from the first password field. It will not automatically enter that new password for them because sites often have particular requirements in password formatting, but the designers hope that, in future, they could parse the HTML5 attribute `pattern` for the password field and make a more appropriate random password. If the user accepts the new password, it is entered into both fields and is stored, encrypted in the browser. 

If the system is implemented then it would see Google compete with a number of commercial products that generate browser-neutral passwords and manage and sync them over cloud services. It would also make the Chrome browser a much higher value target for hackers to take control of. The feature is currently listed among the [design documents](https://sites.google.com/a/chromium.org/dev/developers/design-documents) of the Chromium browser, but it is unclear when it would appear in a future edition of the browser.