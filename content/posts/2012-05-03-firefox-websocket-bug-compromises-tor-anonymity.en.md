---
title: Firefox WebSocket bug compromises Tor anonymity
date: 2012-05-03T14:27:00+00:00
layout: single
author_profile: true
url: 2012/05/03/firefox-websocket-bug-compromises-tor-anonymity/
tags:
  - Firefox
  - Mozilla
  - Tor Project
  - Vulnerability
lang: en
category: techblog
---
The current versions of the [Tor Browser Bundle](https://www.torproject.org/projects/torbrowser.html.en) (TBB) include [a bug](https://blog.torproject.org/blog/firefox-security-bug-proxy-bypass-current-tbbs) that makes it possible for information about visited web sites to leak out of the anonymising layer. On version 2.2.35-9 of TBB for Windows and version 2.2.35-10 for Mac OS X and Linux, the included version of Firefox does not send DNS requests over the [Tor](https://www.torproject.org/) network if the browser is using the [WebSocket](https://en.wikipedia.org/wiki/WebSocket) protocol. This means that an attacker listening in on the connection will be able to identify the servers the user is visiting. 

[<img title="ff-disable-websockets" border="0" alt="ff-disable-websockets" src="http://lh4.ggpht.com/-XJRuy4wq-gY/T6KOvMQFaPI/AAAAAAAAF3I/4Ad6Qd26Rp0/ff-disable-websockets_thumb%25255B1%25255D.png?imgmax=800" width="500" height="246" />](http://lh6.ggpht.com/-NJ68KMUisnk/T6KOsiHtmCI/AAAAAAAAF3A/C4FhgvY0gmM/s1600-h/ff-disable-websockets%25255B3%25255D.png) 

The only workaround for the problem currently is to completely disable the use of WebSocket in the browser. Users can do this by accessing Firefox's advanced configuration options by entering `about:config` in the address bar and changing the network.websocket.enabled option to “false”. 

The Tor developers are currently working on a fix for the security hole and will be releasing a new TBB version soon. More information on the issue can be found in the [bug report](https://trac.torproject.org/projects/tor/ticket/5741) on the Tor project's issue tracking system.