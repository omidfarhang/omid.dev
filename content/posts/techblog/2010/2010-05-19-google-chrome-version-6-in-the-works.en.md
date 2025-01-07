---
title: Google Chrome Version 6 in the Works
date: 2010-05-19T20:59:00+00:00
layout: single
author_profile: true
url: 2010/05/19/google-chrome-version-6-in-the-works/
tags:
  - Browser
  - Google
  - Google Chrome
  - news
lang: en
categories: 
  - TechBlog
---
[![chrome-6-260](http://lh5.ggpht.com/_vaUVXcmC3OI/S_RKGGMIBGI/AAAAAAAACQ0/cG2lWFS3JW8/chrome-6-260_thumb%5B1%5D.jpg?imgmax=800 "chrome-6-260")](http://lh6.ggpht.com/_vaUVXcmC3OI/S_RKDfvY5gI/AAAAAAAACQw/b7eLipqVPgw/s1600-h/chrome-6-260%5B3%5D.jpg) Not one to rest on its laurels, the Google Chrome team is [hard at work on Chrome 6](http://news.cnet.com/8301-30685_3-20005224-264.html?part=rss&subj=news&tag=2547-1_3-0-20). The official move to the 6.0 designation in the [Chromium developer builds](http://build.chromium.org/buildbot/snapshots/) officially started a few days ago. 

The move to a Chrome 6 branch for Chromium means that the final tweaks and polishes on Chrome 5 are almost complete. Chrome 5 is a big release — not only is it blazingly fast, it’s also going to be the first stable release for Mac and Linux users. 

So what can we expect in Chrome 6? Well, not [too much right now](http://googlechromereleases.blogspot.com/2010/05/dev-channel-update_14.html). However, [Download Squad](http://www.downloadsquad.com/2010/05/18/dns-pre-resolution-is-weak-chrome-goes-one-step-further-and-pre/) found a new addition to the latest Chromium developer nightly build: [predictive pre-connections](http://src.chromium.org/viewvc/chrome?view=rev&revision=47479). The inclusion of predictive pre-connections means that as soon as you type in a search query in the browser, it goes ahead and opens up a connection to a search engine. Thus your data will transmit faster when you press enter. 

The second area of this patch is equally cool. It “involves subresources, such as images,” the developer who submitted the patch explained. “When a navigation takes place, and we’ve seen navigations to that domain/port before, and the history-based probability that we’ll need to make a connection to a second site (host/port) is sufficiently large, then we preconnect to that second site while we are still connecting to the primary site (and before we’ve gotten content from the primary site.” 

In other words, if you are searching for an image or something else that Chrome thinks you are likely to click on based on your searching history, the browser will go ahead and open up connections to the ports where the image resides. When you click on the image, the entire site will load more quickly. 

You can keep an eye out on the [Google Chrome Releases](http://googlechromereleases.blogspot.com/) blog and at the [Chromium project page](http://www.chromium.org/Home) for more information on Chrome version 6.