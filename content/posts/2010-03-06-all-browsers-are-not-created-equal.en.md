---
title: All browsers are (not) created equal
date: 2010-03-06T23:51:00+00:00
layout: single
author_profile: true
url: 2010/03/06/all-browsers-are-not-created-equal/
tags:
  - Firefox
  - report
  - review
lang: en
category: techblog
---
My friends often ask me about steps they can take to keep their systems at work and home free from malware. Apart from the usual recommendation to use alternative, less targeted and therefore slightly more secure operating system like Linux or OSX (OpenBSD would also be an interesting alternative) I used to mention that a change of the web browser would also be very helpful.

Internet Explorer is still the most commonly used browser with a [little above 60% market share](http://www.netmarketshare.com/browser-market-share.aspx?qprid=0), but its market share is steadily in decline in the last couple of years. I am fairly sure that one of the main reasons people move to Firefox or Chrome is perceived lack of security. Internet Explorer is the most common target for malware and various exploit packs although the latest versions have proved to be much more resilient to various attacks. With most of the users finally making the switch away from IE6 we hope that the exploits will be even less successful in the future. This of course means that attackers are changing their focus to other products like Adobe Reader of Flash, the most commonly used internet applications after browsers. Exploiting Flash or Adobe Reader allows the attacker to abstract the browser version and often the browser itself. Adobe’s attitude to security also does not help.

It is going to be very interesting to follow the browser race now that Microsoft had to offer an alternative web browser with Windows Update and new Windows installations. So, are we going to see other browser equally used and equally targeted by malware writers? Could we expect a flood of newly discovered vulnerabilities when vulnerability researchers change their focus?

<div>
  <a href="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5Li0fhCXuI/AAAAAAAABM8/bWiBuHcPLoU/s1600-h/browserchoice.jpg" imageanchor="1"><img border="0" src="http://4.bp.blogspot.com/_vaUVXcmC3OI/S5Li0fhCXuI/AAAAAAAABM8/bWiBuHcPLoU/s640/browserchoice.jpg" /></a>
</div>

One of the browsers that could benefit from the new browser equality is Opera whose download numbers [allegedly tripled](http://www.computerworld.com/s/article/9165458/Opera_downloads_triple_after_browser_ballot_screen_debut) since the beginning of the new regime. It is well known that attacks come with the platform popularity and perhaps this is why a new Opera vulnerability with the accompanying proof of concept code was disclosed the day before yesterday.

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5Li6DpR6tI/AAAAAAAABNE/2xqjMeQ4ld4/s1600-h/operacrash.jpg" imageanchor="1"><img border="0" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/S5Li6DpR6tI/AAAAAAAABNE/2xqjMeQ4ld4/s640/operacrash.jpg" /></a>
</div>

The vulnerability is a classic integer overflow in opera.dll which can be triggered if the attacker changes the value of the Content Length header of the HTTP response. The integer overflow eventually causes an access protection exception due to an attempted write to a non-allocated memory page. I had a quick look at the proof of concept exploit, which only causes browser to crash to find if the bug is easily exploitable. Since I could not find anything obvious with my 101 level exploit development skills I decided to leave it to exploit development experts and go back to analysing malware.