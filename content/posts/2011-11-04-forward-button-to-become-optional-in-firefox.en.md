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
lang: en
category: 
  - techblog
---
[![](http://1.bp.blogspot.com/-RM2IJZjla-c/TrPI7AIPzNI/AAAAAAAAEOI/3FuYNo19rFc/s200/logo-only.png)](http://1.bp.blogspot.com/-RM2IJZjla-c/TrPI7AIPzNI/AAAAAAAAEOI/3FuYNo19rFc/s1600/logo-only.png)

**mozillalinks.org:** Do you need the forward button? Most likely yes, but it is rarely used compared to the back button, which is the single most used widget in any browser user interface. So it doesn’t make sense to keep it present at all times, stealing focus from its helpful neighbor.

To address this, current Firefox nightlies feature the forward button as optional. If there is nowhere to go further, the button is hidden instead of just disabled as shown in the screenshot below.

[![](http://2.bp.blogspot.com/-xHO3pjNSY9M/TrO_oqxjDLI/AAAAAAAAEOA/LEk_yc5XCI8/s320/optional_forward_button.png)](http://2.bp.blogspot.com/-xHO3pjNSY9M/TrO_oqxjDLI/AAAAAAAAEOA/LEk_yc5XCI8/s1600/optional_forward_button.png)

Since it is only in nightlies at this time, Firefox 10 (expected for early 2012) is the earliest we will see this change in a final Firefox release.

If you want this behavior and remove some clutter today, add these lines to your _userChrome.css_ file located in your profile folder*:

```shell
<code>/* Conditionally hide the Forward button */&lt;br>#forward-button[disabled="true"] {  display: none; } </code>
```

Note that the back button won’t integrate with the location bar as in the nightlies.

* To open your profile folder, go to _about:support_ and push the **Open Containing Folder** button. If _userChrome.css_ is not present, just copy or rename _userChrome-example.css_ and add the lines below.
