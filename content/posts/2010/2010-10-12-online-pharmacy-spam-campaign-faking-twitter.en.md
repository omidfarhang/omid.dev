---
title: Online pharmacy spam campaign faking Twitter
date: 2010-10-12T12:49:00+00:00
layout: single
author_profile: true
url: 2010/10/12/online-pharmacy-spam-campaign-faking-twitter/
tags:
  - alert
  - phishing
  - scam
  - spam
  - Twitter
  - Yahoo
lang: en
categories: 
  - techblog
---
During the weekend our spamtraps received large amounts of emails pretending to come from Twitter. This time, the social engineering twist lies within the subject of the email: It is “You have 2 urgent messages from Twitter!”, creating psychological pressure by some kind of emergency within in the social surroundings of Twitter users. This way the spammers try to increase the rate of the users that are opening the email and click on the links.

[<img title="meds-new" border="0" alt="meds-new" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TLRSJHw-BjI/AAAAAAAACoA/C1Aq6Kbbypc/meds-new_thumb%5B1%5D.png?imgmax=800" width="304" height="247" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TLRSGKlfRxI/AAAAAAAACn8/nSwPZPg_cv8/s1600-h/meds-new%5B3%5D.png)

In the email there are actually two different links pointing to two different domains. The targets do nothing else than to redirect the browser to the final website, hosting a fake Canadian Pharma website.

From the source html:

[<img title="code" border="0" alt="code" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TLRSNUcrqfI/AAAAAAAACoI/N59g1lzDpyA/code_thumb%5B2%5D.jpg?imgmax=800" width="304" height="37" />](http://lh5.ggpht.com/_vaUVXcmC3OI/TLRSLXAf9SI/AAAAAAAACoE/FHcXdqB_4G8/s1600-h/code%5B4%5D.jpg)

The spam filter bypassing technique is even more interesting. Written with white font color on white background, we see some domain names at the beginning of the email. Not any domain names, but the most popular websites on the Internet: google.com, yahoo.com, amazon.com and aol.com.

[<img title="meds-new-selected" border="0" alt="meds-new-selected" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TLRSSR_tnhI/AAAAAAAACoQ/HRN2jfv_WO4/meds-new-selected_thumb%5B1%5D.png?imgmax=800" width="304" height="182" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TLRSPnnoR5I/AAAAAAAACoM/C-evU_0HCk4/s1600-h/meds-new-selected%5B3%5D.png)

We can observe that between the characters which make up the readable text there are extra characters inserted. The green cross is also created using HTML tables.