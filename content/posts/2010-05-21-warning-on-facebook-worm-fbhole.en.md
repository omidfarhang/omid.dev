---
title: "Warning on Facebook worm &quot;FBHOLE&quot;"
date: 2010-05-21T14:45:00+00:00
layout: single
author_profile: true
url: 2010/05/21/warning-on-facebook-worm-fbhole/
tags:
  - alert
  - Facebook
  - malware
lang: en
category: 
  - techblog
---
There's a new Facebook worm out there. However, it doesn't seem to be doing anything else than posting a message to people's Facebook walls.

[![try_not_to_laugh](http://lh6.ggpht.com/_vaUVXcmC3OI/S_aVPNTjzBI/AAAAAAAACRU/_sL_Y2ZCKGs/try_not_to_laugh_thumb%5B2%5D.png?imgmax=800 "try_not_to_laugh")](http://lh5.ggpht.com/_vaUVXcmC3OI/S_aVFnBM5yI/AAAAAAAACRQ/dO8YORmiXYU/s1600-h/try_not_to_laugh%5B4%5D.png) 

The message that the worm posts is  
“**try not to laugh xD http://www.fbhole. com/omg/allow.php?s=a&r=[**random number**]**“

If you follow the link, you end up to a page looking like this:

[![fbhole1](http://lh5.ggpht.com/_vaUVXcmC3OI/S_aVZbRNHQI/AAAAAAAACRc/Rw2OmZLh1O0/fbhole1_thumb%5B2%5D.png?imgmax=800 "fbhole1")](http://lh6.ggpht.com/_vaUVXcmC3OI/S_aVT0bkB9I/AAAAAAAACRY/Q6QCsGrraO0/s1600-h/fbhole1%5B4%5D.png) 

The page shows a fake error message. If you click **anywhere on the page**, you will trigger a script that will try to post the same message to **your** Facebook wall. This is done with an invisible iframe that follows your mouse around – causing you to click on an invisible “publish” button. In addition of the wall message post, nothing else happens.

[![fbhole2](http://lh3.ggpht.com/_vaUVXcmC3OI/S_aVcngenKI/AAAAAAAACRk/RnLYVRyD7Aw/fbhole2_thumb%5B1%5D.png?imgmax=800 "fbhole2")](http://lh4.ggpht.com/_vaUVXcmC3OI/S_aVa4bOCWI/AAAAAAAACRg/cB93PJ67kEw/s1600-h/fbhole2%5B3%5D.png) 

The worm is spreading like wildfire. To get some idea, try this [public search via youropenbook.org](http://youropenbook.org/?q=%22try+not+to+laugh+xD%22&x=0&y=0&gender=any).