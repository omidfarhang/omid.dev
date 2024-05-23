---
title: Google updates OAuth 2.0 Playground
date: 2012-03-31T20:51:00+00:00
layout: single
author_profile: true
url: 2012/03/31/google-updates-oauth-2-0-playground/
tags:
  - Announcement
  - Google
  - news
  - security
lang: en
categories: 
  - techblog
---
[<img title="OAuth2" border="0" alt="OAuth2" align="right" src="http://lh4.ggpht.com/-Qkl1PrkZSAs/T3dnVa9fYRI/AAAAAAAAFZE/KbwyCNDj9OU/OAuth2_thumb%25255B1%25255D.png?imgmax=800" width="120" height="120" />](http://lh6.ggpht.com/-2y3Q3SRqTwg/T3dnQVHBr7I/AAAAAAAAFY8/O39cUzRj2KE/s1600-h/OAuth2%25255B3%25255D.png)The H-Security: Google has [added new features](http://googledevelopers.blogspot.co.uk/2012/03/oauth-20-playground-new-features.html) to its [OAuth 2.0 Playground](https://code.google.com/oauthplayground/), which it [launched last November](http://www.h-online.com/news/item/Playground-for-OAuth-2-0-launched-by-Google-1376271.html). Developers can now switch to using [client-side](https://developers.google.com/accounts/docs/OAuth2UserAgent) flow, and the system has added support for APIs that use OAuth 2.0 drafts [10](https://tools.ietf.org/html/draft-ietf-oauth-v2-10) to [25](https://tools.ietf.org/html/draft-ietf-oauth-v2-25). Google has also added a feature that makes it easy to see all available API operations supported by the user's current access token. To make it easier to use the Playground for an extended amount of time, developers now have the ability to refresh their access tokens automatically, and clicking HTTP response links will now populate the request URI field. 

The OAuth 2.0 Playground allows developers to walk through each step of the OAuth 2.0 workflow for server-side web applications. While stepping through process, the Playground displays the full HTTP request and responses for each API to allow developers to debug and experiment with the protocol. This lets developers select the authorisation APIs, exchange authorisation tokens, refresh them and send authorised requests to API endpoints. 

[OAuth](http://www.h-online.com/nettools/rfc/rfcs/rfc5849.shtml) is an open standard for authentication that enables users to authenticate to web sites without sharing their credentials. This allows them to grant a third party site access to their information stored with another service. OAuth 2.0 is not backwards compatible with OAuth 1.0 and is currently in the process of being standardised.