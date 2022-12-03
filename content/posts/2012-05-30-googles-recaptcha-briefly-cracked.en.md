---
title: "Google's reCAPTCHA briefly cracked"
date: 2012-05-30T20:11:00+00:00
layout: single
author_profile: true
url: 2012/05/30/googles-recaptcha-briefly-cracked/
tags:
  - Google
  - hack
  - news
lang: en
category: techblog
---
![](http://lh4.ggpht.com/-OAD1xzJSuPI/T8Z3xbxUDUI/AAAAAAAAGJY/3x5jI3--3Kk/s1600-h/recaptcha%25255B2%25255D.png)
H-Online: Hackers [developed a script](http://www.dc949.org/projects/stiltwalker/) which was able to crack Google's [reCAPTCHA](http://recaptcha.net/) system with a success rate of better than 99 per cent. They [presented](http://www.layerone.org/speakers/#stiltwalker) the results of their research at the [LayerOne](http://www.layerone.org/) security conference in Los Angeles last weekend; however, their demonstration was somewhat frustrated as, just an hour before the presentation, Google made improvements to its CAPTCHA system. 

Of the various CAPTCHA (Completely Automated Public Turing test to tell Computers and Humans Apart) systems, Google's reCAPTCHA is considered to be one of the [most reliable](http://www.h-online.com/news/item/CAPTCHA-schemes-still-easy-to-bypass-1371934.html) for differentiating man from machine. By requiring users to enter visually distorted alphanumeric sequences, web service providers can, for example, ensure that their registration forms are not flooded by spam bots. Rather than trying to analyze these distorted characters, the script, code-named &#8220;Stiltwalker&#8221;, analyzed the audio version of the CAPTCHAs, which Google provides for individuals who are visually impaired. 

Stiltwalker makes use of various techniques, including machine learning, but it also exploits the fact that the computer voice has a very limited vocabulary. While text CAPTCHAs are highly complex, relying on a large pool of words in a variety of fonts, Google's audio CAPTCHAs use just 58 different English words.

{{< youtube rfgGNsPPAfU >}}

Slightly frustrated, Defcon Group 949 presented their research results just as Google had fixed the problem

To make automated analysis more difficult, Google adds a background murmur which computers usually have a hard time filtering out. The hackers discovered that the background was composed of a limited number of recordings of radio programmes. The changes that Google made to reCAPTCHA shortly before the presentation render Stiltwalker impotent, but the three-man team of hackers did not let that affect the entertainment value of their presentation.
