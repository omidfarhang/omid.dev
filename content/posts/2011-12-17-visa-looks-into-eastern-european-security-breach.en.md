---
title: Visa looks into Eastern European security breach
date: 2011-12-17T18:41:00+00:00
layout: single
author_profile: true
url: 2011/12/17/visa-looks-into-eastern-european-security-breach/
tags:
  - review
  - security
  - visa
lang: en
category: 
  - techblog
---
![](http://4.bp.blogspot.com/--mLrPg7ykgg/TuzZoYu_FuI/AAAAAAAAEV4/z15bKOp0pXg/s1600/visa-170.jpg)

[SophosLabs:](http://nakedsecurity.sophos.com/) Visa is investigating a potential security breach that may have compromised payment cards of Eastern Europeans.

Although Visa hasn't disclosed which countries were hit, the Romanian state-owned CEC Bank has blocked and reissued 17,000 cards on suspicion that they had been compromised.

CEC Bank said in a statement that “a number” of cards issued by banks both in Romania and abroad might have been compromised via an international database.

![](http://1.bp.blogspot.com/-5mTT9jPRSis/TuzZ3zL_J-I/AAAAAAAAEWA/GdMmunrRMV0/s1600/cec-statement.jpg)

Here's an excerpt from [the statement](https://www.cec.ro/3577/section.aspx/2957), translated into English from Romanian by [v3.co.uk](http://www.v3.co.uk/v3-uk/news/2133413/visa-investigates-european-card-breach):

> The bank has been informed that a number of cards issued by banks in Romania and abroad have been potentially compromised through an international database. CEC Bank has decided to block the cards and reissue a new card and PIN, at no cost, for a number of cards in its portfolio

> This attack did not target CEC Bank's cards alone and was not due to any bank vulnerability. Our clients' money is safe.

Visa pinned the problem on a European payment processor and issued this statement:

> Visa Europe has been informed of a potential data security breach at a European processor and an investigation is underway. We are working closely with our member banks to ensure cardholders are protected.

In his report on this incident, v3's Phil Muncaster pointed to a warning earlier this month from Trend Micro regarding a [basic design flaw](http://www.v3.co.uk/v3-uk/news/2129718/trend-micro-warns-verified-visa-3ds-password-reset-flaw) in some implementations of the 3D Secure protocol – aka “Verified by Visa” and “MasterCard SecureCode” – that could allow crooks to conduct ID fraud on some Visa cards.

The potential security hole in 3DS is a result in a weakness in the password reset process of some system versions, Trend Micro's Rik Ferguson explained the flaw on his [CounterMeasures blog](http://countermeasures.trendmicro.eu/verified-by-visa/):

> If you are making a purchase through a merchant that is subscribed to the program, you will be redirected, during the payment phase, to a 3DS verification page. On this page you confirm the details of the transaction, enter your password and hey presto, the transaction is complete. So far so good, the merchant never sees my password, no transaction with that merchant can be completed without it and I’m protected, but…

He then goes on to describe the password reset link, finding that three of four pieces of information used to verify identity – cardholder name, expiration date and signature panel code – are all contained in the card itself, either embossed or printed and contained in the magnetic stripe data.

![](http://2.bp.blogspot.com/-Q7RC7F2Yec4/TuzaidT11WI/AAAAAAAAEWI/BwB1MVbwKX4/s1600/verified-visa-password-reminder.jpg)

The fourth piece of information, cardholder date of birth, would be drop-dead easy to track down, he says:

> _Trouble is, it’s information that is not only widely shared on social networks, surveys, sign-up forms and a myriad of other places, but also freely available in public records. We cannot and should not consider our date of birth to be a secret._

The Eastern Europe breach and the 3DS flaw are spelling one headache-y month for Visa so far. Yikes, now all the company needs is for the EU to contemplate carving away at its profits with big fines for privacy breaches or something like that.

But wait, that's exactly what the [EU is mulling!](http://www.ft.com/intl/cms/s/2/bf962998-1d01-11e1-a26a-00144feabdc0.html#axzz1fbMYiUzk)

The way the Financial Times reads it, the proposed rule, slated to be introduced in January, will impact social media most sharply, serving as a significant tool to boost the EU's powers when it comes to combating data protection breaches.

But it will be interesting to see what happens (if in fact the rule doesn't get watered down to pointlessness, that is) in cases such as credit card payment breaches like the one Visa is now investigating, if it turns out that Visa or its payment processor was treating customer data with anything less than kid gloves.