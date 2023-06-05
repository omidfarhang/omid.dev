---
title: Anatomy of a free Starbucks gift card scam
date: 2010-02-04T01:16:00+00:00
layout: single
author_profile: true
url: 2010/02/04/anatomy-of-a-free-starbucks-gift-card-scam/
tags:
  - Facebook
  - malware
  - phishing
  - scam
  - social networking
lang: en
category: 
  - techblog
---
With virus and spam outbreaks, analysts needs to keep their nerves to analyze the situation and proceed to deal with the new threat. So, I wasn’t expected to be surprised by my friends’ actions on facebook this past weekend.

It started innocently enough, as a post about getting a Free $25 Starbucks gift card for joining a particular group. The first person to join the group from my friends list happens to work for a non-profit organization helping young people. So, I expected the young people on his “friends list” to join this group shortly.

[![](http://4.bp.blogspot.com/_vaUVXcmC3OI/S2oXhWVWy5I/AAAAAAAAAyQ/BwZqtu2Z8xI/s640/starbucksscam1.png)](http://4.bp.blogspot.com/_vaUVXcmC3OI/S2oXhWVWy5I/AAAAAAAAAyQ/BwZqtu2Z8xI/s1600-h/starbucksscam1.png)

Looking at the page, my instincts tell me that something is amiss when the description (on the bottom left) says:

“This is not a scam, we are merely trying to get people to go to Starbucks. We are trying to see what coffee people purchase” (my emphasis added). The words “This is not a scam” rings loudly in my head. Isn’t the same phrase used in many Nigerian/419 scams? Usually, the only people who have to assure others that they’re not scamming are actual scammers.

Moving on to the “News” portion where the instructions are posted. It is a little horrifying to know that someone actually went through the steps below:

[![](http://1.bp.blogspot.com/_vaUVXcmC3OI/S2oX0o_KlAI/AAAAAAAAAyY/2c2w-9cEUhE/s640/starbucksscam2.png)](http://1.bp.blogspot.com/_vaUVXcmC3OI/S2oX0o_KlAI/AAAAAAAAAyY/2c2w-9cEUhE/s1600-h/starbucksscam2.png)

To paraphrase Step 4, it says: “Erase everything in your address bar, copy and paste the code below, and press enter”. Now, this is not just any url, it’s full-fledged javascript code. The code on the page did what it claim, which is “simply highlight all your friends for the ‘invitation’”. However, given the number of bad javascripts out there, such as the prevalent Troj/JSRedir-AR and Troj/JSRedir-AK, it is disconcerting to know that there are people out there willing to enter Javascripts of unknown origin in their browser. Imagine what would happen if the script starts installing a FakeAV or do other nasty deeds to their computer?

This comes to objective lesson #1 in this case:

**One should not execute unknown Javascripts**

As if running a Javascript is not bad enough, the group owner is not done yet! Step 6 asks the users to go to the “official site” and follow the instructions. The site happens to be like this:

[![](http://2.bp.blogspot.com/_vaUVXcmC3OI/S2oYLpYryXI/AAAAAAAAAyg/FwAtJtqRf_I/s640/starbucksscam3.png)](http://2.bp.blogspot.com/_vaUVXcmC3OI/S2oYLpYryXI/AAAAAAAAAyg/FwAtJtqRf_I/s1600-h/starbucksscam3.png)

The “last step” is to enter Personally Identifiable Information (PII) such as Name and Full Address. Some of my friends started to question the scheme by this time, yet others happily gave their info away, which gets us the objective lesson #2:

**Do not give away your Personal Identifiable Information online**

Now, what does the group/site owner have to gain from this scheme? By clicking submit, the PII is sent to a marketing company call cpalead, which we have seen before. The group/site owner gets a few cent every time someone gives up their personal information. So clearly the owner is profiting from this.

As for the poor users (and my poor friends) who submitted their information? They probably will never see a Starbucks card arriving in their mail. What’s more likely, however, is that their information will be sold off to the highest bidder for more “marketing” in the future.