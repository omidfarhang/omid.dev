---
title: "New social engineering technique: use Microsoft support to sell rogues"
date: 2009-12-09T00:34:00+00:00
layout: single
author_profile: true
url: 2009/12/09/new-social-engineering-technique-use-microsoft-support-to-sell-rogues/
shortlink: https://g.omid.dev/1RQWPF5
tags:
  - alert
  - rogue software
  - Security

categories:
  - TechBlog
---
Sunbelt analyst Adam Thomas came across this ugly new social engineering technique when he analyzed the DefenceLab rogue security product. It does the usual scare-ware stuff: a fake scan and fake “Windows Security Center” alert:

![](/images/2009/12/DlabGUI.jpg)

![](/images/2009/12/FakeAlert.jpg)

Then it directs the potential victim to a Microsoft Support page, but injects html code into the page in his or her browser to make it appear as though Microsoft is suggesting the purchase of the rogue. This is the real Microsoft page:

![](/images/2009/12/Modified_page.jpg)

This is what it looks after DefenseLab changes it:

![](/images/2009/12/Real-MS-page.png)
