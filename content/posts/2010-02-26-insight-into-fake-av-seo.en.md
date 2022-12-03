---
title: Insight into fake AV SEO
date: 2010-02-26T20:25:00+00:00
layout: single
author_profile: true
url: 2010/02/26/insight-into-fake-av-seo/
tags:
  - advice
  - alert
  - malware
  - phishing
  - report
  - review
  - scam
lang: en
category: techblog
---
In this post I want to highlight how SEO attacks are working:

  1. Pages using server side kits to fool search engine bots into ranking them high in results are uploaded to legitimate web sites. If all goes to plan, when a user searches for a popular term, high up in the search engine results are links to these pages. In the example below, the malicious SEO page was the 2nd item in the search results (highlighted in blue).
  2. When the user arrives on such a page (highlighted in green in the example below), the referrer is typically checked to ensure they came from a search engine. If so, there are redirected (302 redirect) to another site (orange below).
  3. There are typically additional levels of redirection from this point. In the example shown below, the user is bounced from the .org to the .in site (purple).
  4. Finally, the user will be redirected to the fake AV distribution site (red). This is where the user receives the usual visual trickery, in order to fool them into installing the rogue application.

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S4gme8XaQcI/AAAAAAAABBk/njEBqA2qxsc/s1600-h/seo_fake2.jpg" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S4gme8XaQcI/AAAAAAAABBk/njEBqA2qxsc/s640/seo_fake2.jpg" /></a>
</div>

<div>
  So how do you protect against these attacks? Of course, detected the fake AV itself is important, and as Graham indicated, <a href="http://www.sophos.com/security/analyses/viruses-and-spyware/malfakeavbw.html" target="_blank">Mal/FakeAV-BW</a> does just that for this spate of attacks. But there are additional layers of protection as well, which are equally important.</p> 
  
  <p>
    The first is URL filtering &#8211; blocking access to the malicious sites used in these attacks. This is highly effective, made ever more challenging with attackers continually using freshly registered domains (<code>.in</code> being a current favourite). On top of this, detection of some of the redirect pages themselves can be really valuable. Earlier this week I added <a href="http://www.sophos.com/security/analyses/viruses-and-spyware/trojjsredirat.html" target="_blank">Troj/JSRedir-AT</a> for this very purpose. Additionally, detection for the scripts used in the fake AV distribution sites themselves provide another tier of protection (blocked as <a href="http://www.sophos.com/security/analyses/viruses-and-spyware/malfakeavjsa.html" target="_blank">Mal/FakeAvJs-A</a>). With this detection in place, when the user clicks on the SEO link in the search engine they simply see a block page and the attack is thwarted.
  </p>
  
  <div>
    <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/S4gmfspawgI/AAAAAAAABBs/vxcDG2naQrw/s1600-h/seo_block.jpg" imageanchor="1"><img border="0" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/S4gmfspawgI/AAAAAAAABBs/vxcDG2naQrw/s640/seo_block.jpg" /></a>
  </div>
  
  <p>
    If I look through some of the URLs on which we have been detecting Troj/JSRedir-AT over the past 24 hours, I can extract the search terms that the user was using. The usual suspects are present: ‘killer whales’, ‘Winter Olympics’, technology, Tiger Woods (sigh) and ‘American Idol’ (bigger sigh).
  </p>
  
  <blockquote>
    <p>
      jagr+hit<br />ovechkin+hit+on+jagr<br />Cheryl+Bernard+swimsuit<br />Dawn+Brancheau<br />hannah+storm+outfit+picture<br />Hannah+Storm<br />olympic+hockey+bracket+2010<br />seaworld+accident<br />shamu+attacks<br />who+did+tim+urban+replace+on+american+idol<br />tiger+woods+apology+video<br />american+idol+judges<br />motorola+backflip+specs<br />Scotty+Largo+Pictures<br />seaworld+trainer+killed<br />shamu+attacks<br />usa+hockey+roster<br />natalee+holloway+latest+news<br />natalie+holloway<br />yu+na+kim<br />whale+kills+trainer+video
    </p>
  </blockquote>
  
  <p>
    As ever, it is the combination of product technologies that provide the best protection against such threats.
  </p>
</div>