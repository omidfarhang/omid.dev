---
title: Microsoft warns of Facebook-hijacking extensions
date: 2013-05-13T18:57:08+00:00
layout: single
author_profile: true
url: 2013/05/13/microsoft-warns-of-facebook-hijacking-extensions/
image: /images/sites/3/2013/05/Facebook.png
tags:
  - Microsoft
lang: en
category: techblog
---
[![Facebook](/images/2013/05/Facebook-300x300.png)](/images/2013/05/Facebook.png)Malicious browser extensions are trying to hijack Facebook profiles, according to a [warning](http://blogs.technet.com/b/mmpc/archive/2013/05/10/browser-extension-hijacks-facebook-profiles.aspx) from Microsoft's Malware Protection Center. The extensions, first discovered in Brazil and dubbed [JS/Febipos.A](http://www.microsoft.com/security/portal/threat/encyclopedia/Entry.aspx?Name=Trojan%3aJS/Febipos.A) by Microsoft, are targeted at Chrome and Mozilla Firefox and appear to be installed by a custom [trojan dropper](http://www.microsoft.com/security/portal/threat/encyclopedia/Entry.aspx?Name=TrojanDropper%3aWin32%2fFebipos.A). Microsoft first reported on the trojans in April, but it seems that a recent update to the trojans warrants bringing further attention to them.

The trojan extensions themselves monitor users' browser activity to see if they are logged into Facebook and then retrieve a configuration file from a site, disguised as a .php file, which contains commands for the extension. The extension is able to like pages, share pages, post, join groups, invite friends to groups, chat to friends or comment on posts. The Microsoft researchers have witnessed the extension posting messages (in Portuguese) about teen suicides with a video link that sends users to a malicious site, liking and commenting on a Facebook page apparently belonging to a car company, and sending out a variety of messages via chat, posts or comments. Links to other Facebook profiles are also posted by the extension in messages.

Microsoft recommends that users review their installed extensions. The extensions are detected by Microsoft's security software, providing the latest definitions are installed.