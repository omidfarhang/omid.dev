---
title: Facebook closes cross-site scripting holes
date: 2013-04-21T14:25:44+00:00
layout: single
author_profile: true
url: 2013/04/21/facebook-closes-cross-site-scripting-holes/
image: /images/sites/3/2013/04/facebook-xss-1.png
tags:
  - Facebook
  - XSS
lang: en
category: techblog
---
<figure id="attachment_6517" aria-describedby="caption-attachment-6517" style="width: 290px" class="wp-caption alignright">[<img class="size-medium wp-image-6517" alt="facebook-xss-1" src="/images/2013/04/facebook-xss-1-300x277.png" width="300" height="277" srcset="/images/sites/3/2013/04/facebook-xss-1-300x277.png 300w, /images/sites/3/2013/04/facebook-xss-1.png 681w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/04/facebook-xss-1.png)<figcaption id="caption-attachment-6517" class="wp-caption-text">Code could be injected through (fake) custom locations</figcaption></figure> 

Facebook has closed various cross-site scripting (XSS) holes that were discovered by security firm <a href="http://www.breaksec.com/" target="_blank" rel="external">Break Security</a> and which have now been <a href="http://www.breaksec.com/?p=6129" target="_blank" rel="external">described</a> in greater detail. Break Security's CEO, Nir Goldshlager, explains that the social network was vulnerable to attacks through its Chat feature as well as its &#8220;Check in&#8221; and Messenger for Windows components.

In the Chat window, for example, attackers were able to share links that weren't adequately checked by Facebook. This enabled attackers to add disguised JavaScript commands to links that were then automatically inserted into href parameters by the Chat client. When users clicked on these specially crafted messages, the injected code was executed on their systems.<figure id="attachment_6518" aria-describedby="caption-attachment-6518" style="width: 290px" class="wp-caption alignleft">

[<img class="size-medium wp-image-6518" alt="facebook-xss-2" src="/images/2013/04/facebook-xss-2-300x108.png" width="300" height="108" srcset="/images/sites/3/2013/04/facebook-xss-2-300x108.png 300w, /images/sites/3/2013/04/facebook-xss-2.png 823w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/04/facebook-xss-2.png)<figcaption id="caption-attachment-6518" class="wp-caption-text">Page names can contain JavaScript</figcaption></figure> 

The &#8220;Check in&#8221; service could be manipulated by creating custom locations into which attackers were then able to inject JavaScript code through their settings. That client-side XSS code was executed when users checked in at such a location.

Messenger for Windows could be compromised by creating a Facebook page. Pages can send messages to all users. If JavaScript code was entered as part of the page name, and the page sent out messages to users, the script would be executed on users' machines as soon as they logged into Messenger.

_Cross-Posted from Heise-Security_