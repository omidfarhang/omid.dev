---
title: "Twitter goes secure – say goodbye to Firesheep with \"Always use HTTPS\" option"
date: 2011-03-17T22:30:00+00:00
layout: single
author_profile: true
url: 2011/03/17/twitter-goes-secure-say-goodbye-to-firesheep-with-always-use-https-option/
tags:
  - Security
  - Twitter

categories:
  - TechBlog
---
**![twitter_logo_header](http://lh3.ggpht.com/_vaUVXcmC3OI/TYKD8UdLAnI/AAAAAAAADuw/oKZ76FR9okY/s1600-h/twitter_logo_header%5B4%5D.png)Sophos Labs:** Good news on the social networking security front is that Twitter has finally got its act together to offer an **Always use HTTPS** option.

If you turn on this option, all of your personalized interaction with Twitter will be encrypted – not only while you are logging in, but also while you are posting tweets.

A lot of people fail to recognize the value of using HTTPS on Twitter. As long as your username and password are sent over HTTPS, so no-one can sniff them out of the ether, who cares if your tweets go over plain HTTP? After all, a tweet is meant to be public.

The problem is that once you have logged in, Twitter sends your browser a session cookie. This is a one-time secret. It is unique to your account and the current session.

Because your browser retransmits this session cookie in all future requests to the Twitter site, Twitter can see that it's you coming back for more. So you don't need to put in your username and password for every single tweet you send. You login once, and the session cookie identifies you for the rest of the current session.

Unfortunately, if you login to Twitter over unencrypted Wi-Fi – e.g. at a coffee shop or an airport lounge – then anyone who can sniff your session cookie can pretend to be you. That means they can post tweets as you. And you don't want that. (It happened to Mr. Demi Moore, a.k.a. Ashton Kutcher, recently, no doubt to his considerable embarrassment.)

Turning on full-time Twitter HTTPS keeps your session cookie encrypted throughout your login session. This is definitely what you want.

![twitter-settings-170](http://lh5.ggpht.com/_vaUVXcmC3OI/TYKEFtlMAJI/AAAAAAAADu4/QSHC4DUQQK4/s1600-h/twitter-settings-170%5B4%5D.png)

Don't forget that it's not just experienced hackers who can sniff Twitter cookies and use them to impersonate you.

The infamous Firesheep plugin to Firefox automates this cookie-stealing process – known as “sidejacking” – so that anyone who can use a browser can do it.

To enable this new Twitter option, go to your **Settings** page.

At the bottom is the new **Always use HTTPS** option. Turn it on and click**[Save]**, and then **[Save changes]**.

Do it today.

(Note: as a commentator below points out, it's not clear if, or how, non-web-browser Twitter clients will support this new option. If in doubt, please ask the vendor of your Twitter client, or follow the Simplicity Principle and stick to using your browser when tweeting.)

![twitter-settings-account-500](http://lh4.ggpht.com/_vaUVXcmC3OI/TYKEQMBpuXI/AAAAAAAADvA/hmVitY7MU8w/s1600-h/twitter-settings-account-500%5B4%5D.png)