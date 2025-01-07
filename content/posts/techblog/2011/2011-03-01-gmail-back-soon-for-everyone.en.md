---
title: Gmail back soon for everyone
date: 2011-03-01T12:20:00+00:00
layout: single
author_profile: true
url: 2011/03/01/gmail-back-soon-for-everyone/
tags:
  - gmail
  - Google
  - Google Mail
  - report
lang: en
categories: 
  - TechBlog
---
Gmail Blog posted:

[<img title="Gmail_logo" border="0" alt="Gmail_logo" align="right" src="http://lh5.ggpht.com/_vaUVXcmC3OI/TWzdcwKx_fI/AAAAAAAADk8/MuiJov5tynI/Gmail_logo_thumb.png?imgmax=800" width="143" height="59" />](http://lh3.ggpht.com/_vaUVXcmC3OI/TWzdbngYTdI/AAAAAAAADk4/wZWGC7jqIWI/s1600-h/Gmail_logo%5B2%5D.png)Posted by Ben Treynor, VP Engineering and Site Reliability Czar (24&#215;7)

Imagine the sinking feeling of logging in to your Gmail account and finding it empty. That’s what happened to 0.02% of Gmail users yesterday, and we’re very sorry. The good news is that email was never lost and we’ve restored access for many of those affected. Though it may take longer than we originally expected, we're making good progress and things should be back to normal for everyone soon.

I know what some of you are thinking: how could this happen if we have [multiple copies of your data, in multiple data centers](http://googleenterprise.blogspot.com/2010/03/disaster-recovery-by-google.html)? Well, in some rare instances software bugs can affect several copies of the data. That’s what happened here. Some copies of mail were deleted, and we’ve been hard at work over the last 30 hours getting it back for the people affected by this issue.

To protect your information from these unusual bugs, we also back it up to tape. Since the tapes are offline, they’re protected from such software bugs. But restoring data from them also takes longer than transferring your requests to another data center, which is why it’s taken us hours to get the email back instead of milliseconds.

So what caused this problem? We released a storage software update that introduced the unexpected bug, which caused 0.02% of Gmail users to temporarily lose access to their email. When we discovered the problem, we immediately stopped the deployment of the new software and reverted to the old version.

As always, we’ll post a detailed incident report outlining what happened to the [Apps Status Dashboard](http://www.google.com/appsstatus#hl=en), as well as the corrective actions we’re taking to help prevent it from occurring again. If you were affected by this issue, it’s important to note that email sent to you between 6:00 PM PST on February 27 and 2:00 PM PST on February 28 was likely not delivered to your mailbox, and the senders would have received a notification that their messages weren’t delivered.

Thanks for bearing with us as we fix this, and sorry again for the scare.