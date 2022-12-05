---
title: Smutty Searches Scuppered
date: 2010-01-22T18:22:00+00:00
layout: single
author_profile: true
url: 2010/01/22/smutty-searches-scuppered/
tags:
  - malware
  - phishing
  - YouTube
lang: en
category: techblog
---
Symantec Security Response has repeatedly warned that looking for free movies and videos online often results in malware infection, and here we go again with yet another example. We recently became aware of a campaign, centered around the YouTube Web site, to trick users into following malicious links.

YouTube is one of the most popular video sharing sites and therefore is often picked by online criminals hoping for an easy catch. Performing a search using a (generally female) celebrity’s name followed by “sex tape” or a recent movie name yields results such as the following:

![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S1nkuLiRtbI/AAAAAAAAAu4/_CEg2wTRuio/s640/searchres.jpg)

![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S1nkpe9YolI/AAAAAAAAAuo/HtucRG3DPWg/s640/Demons%26Angels.JPG)

Unfortunately, clicking the links highlighted in red in the above screenshots will not lead to the desired footage of Ms. Hudgens or the movie Angels and Demons. In place of what would have been the video is a message from the poster stating that they cannot upload the video because it would be deleted by YouTube, it is too big to host on YouTube, or other such excuses. However, the poster kindly places a bit.ly link on the page and claims that the full video is only a single click away:

![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S1pDkNhNucI/AAAAAAAAAvQ/5EOCyEL__mQ/s640/Vanessa_Hudgens_Sex_Tape.jpg)

There is some variation in the bit.ly links but they all point to a single malicious Web site that attempts to hoist malware onto the user’s computer. Youtube.com is aware of such attacks and is constantly battling to ensure that the videos and accounts being used are quickly taken offline. But with 20 hours of video being uploaded to Youtube.com every minute this is no easy task and some may slip through the cracks. This attack is well orchestrated, with numerous new videos with different search terms being uploaded on a daily basis to replace accounts and videos being taken offline.

For users of Symantec products with IPS capabilities, this is as far as the attempted attack goes. The IPS signature HTTP Misleading Application Download Request blocks access to the malicious site and the threat never hits the computer.

Those who do not have IPS-enabled products will be asked to download and execute a file in order to watch the video:

![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S1nkqnnn-lI/AAAAAAAAAuw/vAtWqp5j1zg/s640/New_Video_Addon_45240_exe_1_0.jpg)

Symantec products currently detect the downloaded file as Trojan.FakeAV, although further analysis of the file is underway. As ever, we urge users to keep their virus definitions up-to-date to stay abreast of these attacks.
