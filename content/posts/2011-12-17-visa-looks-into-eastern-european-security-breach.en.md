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
category: techblog
---
<div dir="ltr" trbidi="on">
  </p> 
  
  <div>
    <a href="http://4.bp.blogspot.com/--mLrPg7ykgg/TuzZoYu_FuI/AAAAAAAAEV4/z15bKOp0pXg/s1600/visa-170.jpg" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/--mLrPg7ykgg/TuzZoYu_FuI/AAAAAAAAEV4/z15bKOp0pXg/s1600/visa-170.jpg" /></a>
  </div>
  
  <p>
    <a href="http://nakedsecurity.sophos.com/" target="_blank">SophosLabs:</a> Visa is investigating a potential security breach that may have compromised payment cards of Eastern Europeans.
  </p>
  
  <p>
    Although Visa hasn't disclosed which countries were hit, the Romanian state-owned CEC Bank has blocked and reissued 17,000 cards on suspicion that they had been compromised.
  </p>
  
  <p>
    CEC Bank said in a statement that &#8220;a number&#8221; of cards issued by banks both in Romania and abroad might have been compromised via an international database.
  </p>
  
  <div>
    <a href="http://1.bp.blogspot.com/-5mTT9jPRSis/TuzZ3zL_J-I/AAAAAAAAEWA/GdMmunrRMV0/s1600/cec-statement.jpg" imageanchor="1"><img border="0" src="http://1.bp.blogspot.com/-5mTT9jPRSis/TuzZ3zL_J-I/AAAAAAAAEWA/GdMmunrRMV0/s1600/cec-statement.jpg" /></a>
  </div>
  
  <p>
    Here's an excerpt from <a href="https://www.cec.ro/3577/section.aspx/2957" target="_blank">the statement</a>, translated into English from Romanian by <a href="http://www.v3.co.uk/v3-uk/news/2133413/visa-investigates-european-card-breach" target="_blank">v3.co.uk</a>:
  </p>
  
  <blockquote>
    <p>
      <i>The bank has been informed that a number of cards issued by banks in Romania and abroad have been potentially compromised through an international database. CEC Bank has decided to block the cards and reissue a new card and PIN, at no cost, for a number of cards in its portfolio</i> 
    </p>
  </blockquote>
  
  <blockquote>
    <p>
      <i>This attack did not target CEC Bank's cards alone and was not due to any bank vulnerability. Our clients' money is safe.</i>
    </p>
  </blockquote>
  
  <p>
    Visa pinned the problem on a European payment processor and issued this statement:
  </p>
  
  <blockquote>
    <p>
      <i>Visa Europe has been informed of a potential data security breach at a European processor and an investigation is underway. We are working closely with our member banks to ensure cardholders are protected.</i>
    </p>
  </blockquote>
  
  <p>
    In his report on this incident, v3's Phil Muncaster pointed to a warning earlier this month from Trend Micro regarding a <a href="http://www.v3.co.uk/v3-uk/news/2129718/trend-micro-warns-verified-visa-3ds-password-reset-flaw" target="_blank">basic design flaw</a> in some implementations of the 3D Secure protocol &#8211; aka &#8220;Verified by Visa&#8221; and &#8220;MasterCard SecureCode&#8221; &#8211; that could allow crooks to conduct ID fraud on some Visa cards.
  </p>
  
  <p>
    The potential security hole in 3DS is a result in a weakness in the password reset process of some system versions, Trend Micro's Rik Ferguson explained the flaw on his <a href="http://countermeasures.trendmicro.eu/verified-by-visa/" target="_blank">CounterMeasures blog</a>:
  </p>
  
  <blockquote>
    <p>
      <i>If you are making a purchase through a merchant that is subscribed to the program, you will be redirected, during the payment phase, to a 3DS verification page. On this page you confirm the details of the transaction, enter your password and hey presto, the transaction is complete. So far so good, the merchant never sees my password, no transaction with that merchant can be completed without it and I’m protected, but&#8230;</i>
    </p>
  </blockquote>
  
  <p>
    He then goes on to describe the password reset link, finding that three of four pieces of information used to verify identity &#8211; cardholder name, expiration date and signature panel code &#8211; are all contained in the card itself, either embossed or printed and contained in the magnetic stripe data.
  </p>
  
  <div>
    <a href="http://2.bp.blogspot.com/-Q7RC7F2Yec4/TuzaidT11WI/AAAAAAAAEWI/BwB1MVbwKX4/s1600/verified-visa-password-reminder.jpg" imageanchor="1"><img border="0" src="http://2.bp.blogspot.com/-Q7RC7F2Yec4/TuzaidT11WI/AAAAAAAAEWI/BwB1MVbwKX4/s1600/verified-visa-password-reminder.jpg" /></a>
  </div>
  
  <p>
    The fourth piece of information, cardholder date of birth, would be drop-dead easy to track down, he says:
  </p>
  
  <blockquote>
    <p>
      <i>Trouble is, it’s information that is not only widely shared on social networks, surveys, sign-up forms and a myriad of other places, but also freely available in public records. We cannot and should not consider our date of birth to be a secret.</i>
    </p>
  </blockquote>
  
  <p>
    The Eastern Europe breach and the 3DS flaw are spelling one headache-y month for Visa so far. Yikes, now all the company needs is for the EU to contemplate carving away at its profits with big fines for privacy breaches or something like that.
  </p>
  
  <p>
    But wait, that's exactly what the <a href="http://www.ft.com/intl/cms/s/2/bf962998-1d01-11e1-a26a-00144feabdc0.html#axzz1fbMYiUzk" target="_blank">EU is mulling!</a>
  </p>
  
  <p>
    The way the Financial Times reads it, the proposed rule, slated to be introduced in January, will impact social media most sharply, serving as a significant tool to boost the EU's powers when it comes to combating data protection breaches.
  </p>
  
  <p>
    But it will be interesting to see what happens (if in fact the rule doesn't get watered down to pointlessness, that is) in cases such as credit card payment breaches like the one Visa is now investigating, if it turns out that Visa or its payment processor was treating customer data with anything less than kid gloves.
  </p>
</div>