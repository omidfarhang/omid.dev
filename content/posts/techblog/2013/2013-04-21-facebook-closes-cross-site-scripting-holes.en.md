---
title: Facebook closes cross-site scripting holes
date: 2013-04-21T14:25:44+00:00
layout: single
author_profile: true
url: 2013/04/21/facebook-closes-cross-site-scripting-holes/
image: /images/2013/04/facebook-xss-1.png
tags:
  - Facebook
  - XSS
lang: en
categories: 
  - TechBlog
---
[![facebook-xss-1](/images/2013/04/facebook-xss-1-300x277.png)](/images/2013/04/facebook-xss-1.png)
Code could be injected through (fake) custom locations

Facebook has closed various cross-site scripting (XSS) holes that were discovered by security firm [Break Security](http://www.breaksec.com/) and which have now been [described](http://www.breaksec.com/?p=6129) in greater detail. Break Security's CEO, Nir Goldshlager, explains that the social network was vulnerable to attacks through its Chat feature as well as its “Check in” and Messenger for Windows components.

In the Chat window, for example, attackers were able to share links that weren't adequately checked by Facebook. This enabled attackers to add disguised JavaScript commands to links that were then automatically inserted into href parameters by the Chat client. When users clicked on these specially crafted messages, the injected code was executed on their systems.

[![facebook-xss-2](/images/2013/04/facebook-xss-2-300x108.png)](/images/2013/04/facebook-xss-2.png)

Page names can contain JavaScript

The “Check in” service could be manipulated by creating custom locations into which attackers were then able to inject JavaScript code through their settings. That client-side XSS code was executed when users checked in at such a location.

Messenger for Windows could be compromised by creating a Facebook page. Pages can send messages to all users. If JavaScript code was entered as part of the page name, and the page sent out messages to users, the script would be executed on users' machines as soon as they logged into Messenger.

_Cross-Posted from Heise-Security_