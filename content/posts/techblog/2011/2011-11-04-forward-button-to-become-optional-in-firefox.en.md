---
title: Forward button to become optional in Firefox
date: 2011-11-04T11:48:00+00:00
layout: single
author_profile: true
url: 2011/11/04/forward-button-to-become-optional-in-firefox/
tags:
  - Browser
  - Firefox
  - Mozilla

categories:
  - TechBlog
---
[![](/images/2011/11/logo-only.png)](/images/2011/11/logo-only-18d1419d.png)

**mozillalinks.org:** Do you need the forward button? Most likely yes, but it is rarely used compared to the back button, which is the single most used widget in any browser user interface. So it doesn’t make sense to keep it present at all times, stealing focus from its helpful neighbor.

To address this, current Firefox nightlies feature the forward button as optional. If there is nowhere to go further, the button is hidden instead of just disabled as shown in the screenshot below.

[![](/images/2011/11/optional_forward_button.png)](/images/2011/11/optional_forward_button-578cf464.png)

Since it is only in nightlies at this time, Firefox 10 (expected for early 2012) is the earliest we will see this change in a final Firefox release.

If you want this behavior and remove some clutter today, add these lines to your _userChrome.css_ file located in your profile folder*:

```shell
<code>/* Conditionally hide the Forward button */&lt;br>#forward-button[disabled="true"] {  display: none; } </code>
```

Note that the back button won’t integrate with the location bar as in the nightlies.

* To open your profile folder, go to _about:support_ and push the **Open Containing Folder** button. If _userChrome.css_ is not present, just copy or rename _userChrome-example.css_ and add the lines below.
