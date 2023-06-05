---
title: Google Chrome and Multiple Profiles
date: 2010-11-27T17:07:00+00:00
layout: single
author_profile: true
url: 2010/11/27/google-chrome-and-multiple-profiles/
tags:
  - Google
  - Google Chrome
  - Tricks
lang: en
category: 
  - techblog
---
Google Chrome has always supported multiple profiles, but you had to use a command-line flag (–user-data-dir=”c:\path\to\the\profile”) to associate a profile with a folder where the browser will save its state.  
At some point, Google added an option that allowed you to open a new window and use a separate profile, but it was quickly removed. According to [a design document from Chromium's site](http://www.chromium.org/user-experience/multi-profiles), this feature be available again.  
“The multiple profiles feature will allow the user to associate a profile with a specific set of browser windows, rather than with an entire running instance of Chrome. Allowing different windows to run as different Chrome identities means that a user can have different open windows associated with different Google accounts, and correspondingly different sets of preferences, apps, bookmarks, and so on — all those elements which are bound to a specific user's identity.”

[<img title="chrome-multiple-profiles" border="0" alt="chrome-multiple-profiles" src="http://lh6.ggpht.com/_vaUVXcmC3OI/TPEzujG6GOI/AAAAAAAADOk/JAesLBkXKdw/chrome-multiple-profiles_thumb%5B1%5D.png?imgmax=800" width="500" height="199" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TPEztLa8pzI/AAAAAAAADOg/Nas_KxZnwbc/s1600-h/chrome-multiple-profiles%5B3%5D.png)

Users will be able to associate a profile with a Google account and log in at the browser level. This is a great feature for Chrome OS, but it will also work in Google Chrome.  
Google will associate each Chrome window with an identity. “On Windows (and Linux), this is accomplished with a colored and labeled menu-enabled tag at the top of the browser frame, next to the window controls. On Mac OS X, the window frame is too small to accommodate a tag; instead, we add an item to the menu bar, with a special colored background, in the same way the Windows tab is specially colored.”

[<img title="chrome-multiple-profiles-2" border="0" alt="chrome-multiple-profiles-2" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TPEzzOcVgDI/AAAAAAAADOs/NyI_qOu6EbU/chrome-multiple-profiles-2_thumb%5B1%5D.png?imgmax=800" width="500" height="228" />](http://lh4.ggpht.com/_vaUVXcmC3OI/TPEzw7OTAKI/AAAAAAAADOo/vQ4R5laCUX8/s1600-h/chrome-multiple-profiles-2%5B3%5D.png)

_Taken from Google Operation System Blog_