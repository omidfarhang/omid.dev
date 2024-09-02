---
title: IE9 alleged to be cheating in JavaScript benchmark
date: 2010-11-17T16:52:00+00:00
layout: single
author_profile: true
url: 2010/11/17/ie9-alleged-to-be-cheating-in-javascript-benchmark/
tags:
  - Internet Explorer
  - news
  - report
lang: en
categories: 
  - techblog
---
[<img title="internet-explorer-logo" border="0" alt="internet-explorer-logo" align="right" src="http://lh4.ggpht.com/_vaUVXcmC3OI/TOQBS1NIB-I/AAAAAAAADJo/LgnahCWSlZY/internet-explorer-logo_thumb%5B2%5D.jpg?imgmax=800" width="150" height="150" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TOQBKFZOfII/AAAAAAAADJk/X9q4IqT4BkI/s1600-h/internet-explorer-logo%5B4%5D.jpg)We've all heard of graphics card makers optimizing their drivers for various benchmarks—some of you might recall the [Quack](http://techreport.com/articles.x/3089/1) story as one of the earlier examples. I think this might be the first time I've heard about the same thing happening in the world of web browsers, though. Believe it or not, Digitizor says a Mozilla engineer has found evidence that [Internet Explorer 9 is “cheating”](http://digitizor.com/2010/11/17/internet-explorer-9-caught-cheating-in-sunspider-benchmark/) in the popular SunSpider JavaScript benchmark.

Where's the incriminating evidence? Well, Mozilla's Rob Sayre reportedly discovered that Internet Explorer 9 somehow completed one of the SunSpider sub-tests about ten times quicker than the competition. He went ahead and modified said sub-test, first adding a “true” to the code, then adding a “return,” both useless snippets that should have no impact—and indeed, they reportedly don't in Google Chrome and Opera. In IE9, though, the modified code is said to execute 20 times slower.

Digitizor provides two explanations other than Microsoft cheating. The IE team could also have “unintentionally over-optimized” IE9's JavaScript engine for SunSpider, it says, or this could simply be a bug. The site notes the first possibility is unlikely and the second would raise “a serious question about the robustness of the engine,” however.

The fact that a story like this would even crop up—let alone that IE9 might actually be up to some funny business in SunSpider—goes to show just how heated the browser wars have become. Personally, I'm still scratching my head over the whole thing. Are scores in a synthetic JavaScript test really that important?

_Taken from TechReport_