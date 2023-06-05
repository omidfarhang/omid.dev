---
title: New phishing-spam waves using Facebook as bait
date: 2010-09-17T11:16:00+00:00
layout: single
author_profile: true
url: 2010/09/17/new-phishing-spam-waves-using-facebook-as-bait/
tags:
  - Facebook
  - facebook phishing
  - phishing
  - social networking
  - spam
lang: en
category: 
  - techblog
---
We have started to see again a large increase in the amount of emails pretending to come from Facebook. There are two types of emails which are being sent in large amounts currently. Both of them use classical types of social engineering techniques.

The first type is using the old trick with “the photos”. The final target is a website where SMSes can be sent for “free” (note the quotes). I would like to emphasize again that there is nothing out there for free. Even if you don’t pay for it, those who offer the service (or whatever is given for “free”) do get something in exchange. It might be your telephone number, your email address or something similar which is worth a lot on the Internet.

[![01-fb-sms](http://lh3.ggpht.com/_vaUVXcmC3OI/TJNG6kK5njI/AAAAAAAACdc/7MbC1ntSrds/01-fb-sms_thumb%5B1%5D.png?imgmax=800 "01-fb-sms")](http://lh6.ggpht.com/_vaUVXcmC3OI/TJNG39uTiOI/AAAAAAAACdY/5ylDv4GGTwI/s1600-h/01-fb-sms%5B3%5D.png)

The second email wave uses the old trick with “notifications” from Facebook. The target website is a Canadian Pharmacy website in a new design.

[![02-fb-can](http://lh5.ggpht.com/_vaUVXcmC3OI/TJNHBUssubI/AAAAAAAACdk/-dmFIr57cLA/02-fb-can_thumb%5B1%5D.png?imgmax=800 "02-fb-can")](http://lh3.ggpht.com/_vaUVXcmC3OI/TJNG_vWZUPI/AAAAAAAACdg/14PBmRcQ8js/s1600-h/02-fb-can%5B3%5D.png)

By analyzing the headers of the two messages, we find already known techniques, which were used in the previous outbreaks using some known names as bait. The email headers are very well constructed by adding a lot of entries which make the email look as close as possible to the original Facebook mails.

**Fake headers**

```md
Received: from [10.18.255.135] ([10.18.255.135:59076])
by mta016.snc1.facebook.com (envelope-from <update+dtymgjriqknv@facebookmail.com>)
(ecelerity 2.2.2.45 r(34067)) with ECSTREAM
id DE/6C-10257-74CA947F; Thu, 16 Sep 2010 23:15:00 -0700
X-Facebook: from zuckmail ([MTI3LjAuMC4x])
by www.facebook.com with HTTP (ZuckMail);
Date: Thu, 16 Sep 2010 23:15:00 -0700
To:
From: Facebook <update+dtymgjriqknv@facebookmail.com>
Reply-to: Facebook <update+dtymgjriqknv@facebookmail.com>
Subject: [Definitely Spam?] You have notifications pending
Message-ID: <53365abd632d6d52eed06318304b59c1@www.facebook.com>
X-Priority: 3
X-Mailer: ZuckMail [version 1.00]
X-Facebook-Camp: stale_email
X-Facebook-Notify: stale_email; mailid=d2005b860446af88a804a830f15e92
Errors-To: update+dtymgjriqknv@facebookmail.com
X-FACEBOOK-PRIORITY: 1
MIME-Version: 1.0
Content-Type: multipart/alternative;
boundary=”b1_53365abd632d6d52eed06318304b59c1″
```

 

**Real headers**

```md
Received: from [10.18.255.138] ([10.18.255.138:61673])
by mta015.snc1.facebook.com (envelope-from <notification+o9=o_tfc@facebookmail.com>)
(ecelerity 2.2.2.45 r(34067)) with ECSTREAM
id B3/E5-13534-B62629C4; Thu, 16 Sep 2010 11:31:07 -0700
X-Facebook: from zuckmail ([MTI3LjAuMC4x])
by www.facebook.com with HTTP (ZuckMail);
Date: Thu, 16 Sep 2010 11:31:07 -0700
To: Sorin Mustaca <sorin.mustaca@gmail.com>
From: Facebook <notification+o9=o_tfc@facebookmail.com>
Reply-to: noreply <noreply@facebookmail.com>
Subject: ??? wants to be friends on Facebook.
Message-ID: 96b769da5595cef276c6b4ee6b9aed11@www.facebook.com
X-Priority: 3
X-Mailer: ZuckMail [version 1.00]
X-Facebook-Notify: friend; from=1659283218; mailid=2fc5f99G2738aab8Gca41707G2
Errors-To: notification+o9=o_tfc@facebookmail.com
X-FACEBOOK-PRIORITY: 0
MIME-Version: 1.0
Content-Type: multipart/alternative;
boundary=”b1_96b769da5595cef276c6b4ee6b9aed11″
```

These are the bottom headers. Looking at the top received headers, it is clear that the messages were sent by botnet drones (infected computers). The mails have almost always the same headers as described in the table (left row), and then always different servers which have nothing to do with Facebook.

This technique shows clearly that the messages are send using a botnet. We have seen senders from Australia, Turkey and USA, but there are definitely senders from other countries as well. As usual, the target domains are owned by a Chinese person and the nameservers are all located in Russia.