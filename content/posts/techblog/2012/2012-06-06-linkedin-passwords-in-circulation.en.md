---
title: LinkedIn passwords in circulation
date: 2012-06-06T16:42:00+00:00
layout: single
author_profile: true
url: 2012/06/06/linkedin-passwords-in-circulation/
tags:
  - advice
  - alert
  - hack
  - LinkedIn
  - Password
  - report
lang: en
categories: 
  - techblog
---
<img class="alignright size-thumbnail wp-image-7238" src="/images/2012/02/LinkedIn_logo_initials-150x150.png" alt="LinkedIn_logo_initials" width="150" height="150" srcset="/images/2012/02/LinkedIn_logo_initials-150x150.png 150w, /images/2012/02/LinkedIn_logo_initials-300x300.png 300w, /images/2012/02/LinkedIn_logo_initials.png 768w" sizes="(max-width: 150px) 100vw, 150px" />H-Online: Internet forums are currently circulating a list containing over six million password hashes which allegedly originate from [LinkedIn](https://www.linkedin.com/). The passwords are being cracked collaboratively with about 300,000 passwords already published as plaintext.

The list contains pure SHA1 hashes with no name or email addresses. If decrypted, the passwords will not easily give access to an appropriate account. However, it is probable that the person who captured the hashes also has the corresponding email addresses. In an initial sampling, **The H**&#8216;s associates at heise Security didn't find any known LinkedIn passwords in the list, but with over 160 million members that doesn't mean a lot. The already cracked passwords often contain “linked” or even “linkedin” in the form, for example, of “lawrencelinkedin”. This suggests that the passwords actually come from the LinkedIn social network. However, this has not yet been confirmed.

The shocking reality is that even passwords “parikh093760239”, “a06v1203n08” and “376417miata?” have already been cracked. This is due to the fact that the hashes were obviously generated without salt. This makes them easy targets for attacks using rainbow tables, which makes it possible to crack even passwords that are believed to be strong in just a few hours. For a view of what a server administrator needs to do to prevent this, read the article _[Storing passwords in uncrackable form](http://www.h-online.com/security/features/Storing-passwords-in-uncrackable-form-1255576.html)_ at **The H Security**.

Whatever the case, you cannot rely on your own password to remain uncracked and so, if you have a LinkedIn account, you should change the password as soon as possible. You should also do the same for all other services where you used the same password or password root as on LinkedIn.

Learn more about this and how to change your LinkedIn password: [http://techblog.avira.com/2012/06/06/change-your-linkedin-password/en/](http://techblog.avira.com/2012/06/06/change-your-linkedin-password/en/ "http://techblog.avira.com/2012/06/06/change-your-linkedin-password/en/")

Find out how to create a strong password and take care of them: [/en/knowledge-base/security/passwords](/en/knowledge-base/security/passwords "/en/knowledge-base/security/passwords")