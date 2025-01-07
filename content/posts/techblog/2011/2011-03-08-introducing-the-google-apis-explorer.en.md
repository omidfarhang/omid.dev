---
title: Introducing the Google APIs Explorer
date: 2011-03-08T12:21:00+00:00
layout: single
author_profile: true
url: 2011/03/08/introducing-the-google-apis-explorer/
tags:
  - Announcement
  - API
  - Google
  - Google Code
  - news
lang: en
categories: 
  - TechBlog
---
Google is always looking for new ways to make it easier for developers to get started with our APIs. When you come across a new Google API, you often want to try it out without investing too much time. With that in mind, we are happy to announce the [Google APIs Explorer](https://code.google.com/apis/explorer), an interactive tool that lets you easily try out Google APIs right from your browser. Today, the Explorer supports over a half dozen APIs – and we expect that number to grow rapidly over the coming weeks and months.

[<img title="2011-03-04-google_apis_explorer" border="0" alt="2011-03-04-google_apis_explorer" src="http://lh3.ggpht.com/_vaUVXcmC3OI/TXYYQVrLNtI/AAAAAAAADnM/zC4TcFkG3go/2011-03-04-google_apis_explorer_thumb.png?imgmax=800" width="400" height="202" />](http://lh6.ggpht.com/_vaUVXcmC3OI/TXYYMKqTXII/AAAAAAAADnI/0kIQzE6afq8/s1600-h/2011-03-04-google_apis_explorer%5B2%5D.png)

By selecting an API you want to explore, you can see all the available methods and parameters along with inline documentation. Just fill out the parameters for the method you want to try and click “Execute”. The Explorer composes the request, executes it, and displays the response in real time. For some APIs that access private data you will need to “Switch to Private Access” and authorize the Explorer to do so.

To get you started, here are some sample requests; follow the links and press “Execute”:

  * [Expand a goo.gl URL](https://code.google.com/apis/explorer/#_s=urlshortener&_v=v1&_m=url.get&shortUrl=http://goo.gl/jN3IJ) using the URL Shortener API 
  * [Translate a phrase to French](https://code.google.com/apis/explorer/#_s=translate&_v=v2&_m=translations.list&q=APIs%20explorer%20is%20awesome!&target=fr&source=en) using the Translate API 
  * [List your personal Buzz posts](https://code.google.com/apis/explorer/#_s=buzz&_v=v1&_m=activities.list&scope=@self&userId=@me) using the Buzz API (requires private access)

The Explorer makes it easier for developers to discover what APIs we offer and get started using them within minutes. If you have any questions or comments, visit the [help page](http://code.google.com/apis/explorer-help) or the [support forum](http://code.google.com/apis/explorer-help/forum.html). We’d love to hear your feedback.

Happy exploring!