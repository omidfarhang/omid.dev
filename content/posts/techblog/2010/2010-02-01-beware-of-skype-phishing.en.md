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
  - Security

categories:
  - TechBlog
---
We were made aware that phishing for Skype credentials is currently taking place. The link the phishing mails direct to are dangerous – they aren’t detected by any phishing filter of the popular browsers yet.

One thing caught my attention. Modern browsers should support domain highlighting so that the real domain is visible when someone surfs the Internet. Like Internet Explorer 8 properly does:

[![](/images/2010/02/01-IE8-URL_Highlight1.png)](/images/2010/02/01-IE8-URL_Highlight1-910e5c69.png)

There you can clearly see that you are not on the Skype website, but on another domain.

Firefox does not highlight that URL:

[![](/images/2010/02/02-FF-3.6-No_URL_Highlight1.png)](/images/2010/02/02-FF-3.6-No_URL_Highlight1-698a9efe.png)

Neither does Google Chrome:

[![](/images/2010/02/03-Chrome-No_URL_Highlight1.png)](/images/2010/02/03-Chrome-No_URL_Highlight1-224795f3.png)

Chrome grays out the “disturbing” parts of that URL, like the URI, the path and parameters of the link. Still it may fool the user to think it is the Skype website.

Once a user gives away her/his credentials, the website redirects to the real Skype download page.

[![](/images/2010/02/04-Redirects_To_Skype.png)](/images/2010/02/04-Redirects_To_Skype-f4bdf9c2.png)
users are well advised to properly check the links they are visiting before entering any personal data like login credentials.