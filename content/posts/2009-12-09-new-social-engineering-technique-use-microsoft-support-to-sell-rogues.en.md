---
title: "New social engineering technique: use Microsoft support to sell rogues"
date: 2009-12-09T00:34:00+00:00
layout: single
author_profile: true
url: 2009/12/09/new-social-engineering-technique-use-microsoft-support-to-sell-rogues/
shortlink: https://g.omid.dev/1RQWPF5
tags:
  - alert
  - rogue software
  - security
lang: en
category: techblog
---
Sunbelt analyst Adam Thomas came across this ugly new social engineering technique when he analyzed the DefenceLab rogue security product.

It does the usual scare-ware stuff: a fake scan and fake “Windows Security Center” alert:

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/Sx7oVxjauqI/AAAAAAAAAQw/sXfHGKyaXcI/s1600-h/DlabGUI.jpg" imageanchor="1"><img border="0" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/Sx7oVxjauqI/AAAAAAAAAQw/sXfHGKyaXcI/s320/DlabGUI.jpg" /></a>
</div>

<div>
  <a href="http://3.bp.blogspot.com/_vaUVXcmC3OI/Sx7oZdqpduI/AAAAAAAAAQ4/n_zP2tXInt0/s1600-h/FakeAlert.jpg" imageanchor="1"><img border="0" src="http://3.bp.blogspot.com/_vaUVXcmC3OI/Sx7oZdqpduI/AAAAAAAAAQ4/n_zP2tXInt0/s320/FakeAlert.jpg" /></a>
</div>

Then it directs the potential victim to a Microsoft Support page, but injects html code into the page in his or her browser to make it appear as though Microsoft is suggesting the purchase of the rogue.

This is the real Microsoft page:

<div>
  <a href="http://2.bp.blogspot.com/_vaUVXcmC3OI/Sx7oecisneI/AAAAAAAAARA/9RrqUCpf04g/s1600-h/Modified_page.jpg" imageanchor="1"><img border="0" src="http://2.bp.blogspot.com/_vaUVXcmC3OI/Sx7oecisneI/AAAAAAAAARA/9RrqUCpf04g/s320/Modified_page.jpg" /></a>
</div>

This is what it looks after DefenseLab changes it:

<div>
  <a href="http://1.bp.blogspot.com/_vaUVXcmC3OI/Sx7ogYwDj6I/AAAAAAAAARI/7oA30xFnInM/s1600-h/Real+MS+page.png" imageanchor="1"><img border="0" height="230" src="http://1.bp.blogspot.com/_vaUVXcmC3OI/Sx7ogYwDj6I/AAAAAAAAARI/7oA30xFnInM/s320/Real+MS+page.png" width="320" /></a>
</div>