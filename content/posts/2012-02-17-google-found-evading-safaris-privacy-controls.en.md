---
title: "Google found evading Safari's privacy controls"
date: 2012-02-17T17:31:00+00:00
layout: single
author_profile: true
url: 2012/02/17/google-found-evading-safaris-privacy-controls/
tags:
  - Apple
  - Google
  - privacy
  - Safari
lang: en
category: techblog
---
**[<img title="Google-logo-istock-600-275x171" border="0" alt="Google-logo-istock-600-275x171" align="right" src="http://lh6.ggpht.com/-uGPJBet4Xs4/Tz6HmbSG2sI/AAAAAAAAE3M/WbJGAqeYoqE/Google-logo-istock-600-275x171_thumb.jpg?imgmax=800" width="244" height="153" />](http://lh5.ggpht.com/-oycvxAFSDuE/Tz6HcPpOJQI/AAAAAAAAE3E/_gV9HGsLgDo/s1600-h/Google-logo-istock-600-275x171%25255B2%25255D.jpg)The H-Online:** Google and other advertising companies have been found to be deliberately evading the privacy controls of Apple's Safari browser. The evasion was revealed in a report in the _[Wall Street Journal](http://online.wsj.com/article_email/SB10001424052970204880404577225380456599176-lMyQjAxMTAyMDEwNjExNDYyWj.html?mod=wsj_share_email#articleTabs%3Darticle)_ and was based on work by Stanford researcher [Jonathan Mayer](https://www.stanford.edu/~jmayer/). He found that the “+1” button code added to DoubleClick advertisements also allowed a Google DoubleClick tracking code to be installed on desktop Safari on 22 of the top 100 web sites. The same happened with 23 of those 100 sites when using Safari on the iPhone. 

Google says the _Wall Street Journal_ “mischaracterizes what happened and why”. According to the _WSJ_ though, Google disabled the code after being contacted by them. While other companies found to be using the evasion technique such as Vibrant Media called it a “workaround” to make Safari “work like all the other browsers”. 

By default, Apple's Safari browser, on the desktop and on the iPhone, does not allow third-party cookies from sites the user hasn't interacted with to be stored. This blocks much “passive tracking” of users where widgets on a page may be making note of the user's presence, sometimes innocuously, to display information such as which of your social network friends liked something on the page being viewed. 

In this case, it was Google that wanted to add “+1” buttons to advertisements on its DoubleClick advertising network. Because of the cookie blocking on Safari though, Google couldn't check if the user was logged in to its Google+ network. To get around this, the DoubleClick network sent code, specifically to users of Safari, to add a hidden iFrame with a form on it which it then automatically submitted to the DoubleClick servers. 

This technique fools Safari into thinking the user has interacted with DoubleClick and lets DoubleClick place cookies in the user's browser. The cookie that Google were trying to create had a “time to live” of 12 to 24 hours and most likely wasn't a tracking cookie, but because the technique had now added DoubleClick's domain to the list of sites the browser had interacted with, it was now possible for DoubleClick to set other cookies in the user's browser, including the “id” tracking cookie the company uses. 

The revelation has led the EFF to [call](https://www.eff.org/deeplinks/2012/02/time-make-amends-google-circumvents-privacy-settings-safari-users) for Google to respect and implement Do Not Track support. The civil rights organization noted that “While the Do Not Track specification is not yet final, there's no reason to wait. Google has repeatedly led the way on web security by implementing features long before they were standardized. Google should do the same with web privacy”.