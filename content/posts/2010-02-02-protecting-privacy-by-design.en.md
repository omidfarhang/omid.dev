---
title: Protecting Privacy by Design
date: 2010-02-02T21:52:00+00:00
layout: single
author_profile: true
url: 2010/02/02/protecting-privacy-by-design/
tags:
  - advice
  - Google
  - review
lang: en
categories: 
  - techblog
---
Last week I [revealed troubling transmissions](http://boelectronic.blogspot.com/2010/01/google-toolbar-tracks-searches-after.html) by the Google Toolbar: Even when a user specifically “disable[s]” the Google Toolbar, and even when the Toolbar disappears from view, the Toolbar continues tracking users online behavior—including specific web pages visited and specific searches run on other search engines. To Google’s credit, after I posted my article Google promptly fixed these nonconsensual transmissions—but big questions remain. How did this bug slip through Google’s internal testing? What happens to the data Google collected without user consent? And why was Google collecting this data in the first place?

**Rethinking Disclosure**  
I’ve recently begun talking to all the Google Toolbar users I can find. Checking their PCs, I see that they usually have Google’s “Enhanced Features” turned on—meaning Google is tracking their every page view and every search. But they usually don’t know about that tracking. Why not? They were told—but not in a way they understood or remembered.

For one, Google discloses its tracking in a “bubble” pop-up that appears immediately after Toolbar installation. By all indications, the installation is complete, and users just want to get back to work—not answer more questions or make more decisions. This suggests a first principle: _Seek consent when users are inclined to make an informed decision_. This should be an integral part of an installation, not an afterthought.

Beyond the timing of disclosure, the substance of disclosure is also crucial. Google’s [current installation says](http://www.benedelman.org/news/012610-1.html#discl) Enhanced Features will “tell us [Google] what site you’re visiting by sending Google the URL.” What exactly does that mean? Will Google track “sites” (such as “nytimes.com” for the New York Times) or “URLs” (referencing specific articles and searches)? Remarkably, Google’s disclosure is internally inconsistent: Google uses the terms sites and URLs interchangeably, when in fact the concepts are quite different. Certainly that’s improper. _Disclosures should be clear, precise, and entirely accurate_.

Communications professionals have expertise to offer. To make a disclosure clear, it should appear in a dedicated screen with a title, layout, and format that emphasize what’s important. Headings, topic sentences, and sentence structure can help users understand. How does Google stack up on these fronts? Unfortunately, Google seeks permission for Enhanced Features in a screen entitled “Introducing Sidewiki”—a marketing pitch for a new feature, hardly alerting users to the serious privacy matters that follow. Better alternatives would be “Important Privacy Decision” or “Set Your Privacy Preferences”—identifying the crux of the question and introducing the material that follows. This crucial screen should _seek to inform, not to persuade_. Most of all, it should be designed by policy professionals and communication professionals—not marketers.

A user seeking more information should be able to review a further document with appropriate details. Here, too, accuracy and precision are crucial, and Google’s current approach falls crucially short. Google’s statement [makes no mention](http://www.benedelman.org/news/012610-1.html#discl) of these Toolbar transmissions until Page Five. Even there, Google’s text contradicts itself, both explicitly and through unavoidable interpretation of Google’s statements and omissions [(details)](http://www.benedelman.org/news/012610-1.html#discl). Equally striking is Google’s defective formatting: Google loads its privacy notice in a browser window with no menu or toolbar—hence no ability for users to copy, search, save, or print these important materials. These design decisions are ill advised. _Disclosures should be user friendly and should encourage users to take the time to understand them_.

For these sensitive transmissions, which continue every time a user runs a web browser, disclosure need not occur just once. When a program has such important privacy consequences, it should r_emind users of its effects from time to time_, employing an alert or message to make sure users are still onboard. A periodic reminder—perhaps once per quarter, or whenever Google Toolbar auto-upgrades to a new version—would help users remember what’s installed.

**Improving the Substance of Privacy Protection**  
Good privacy means more than disclosure. Through sensible adjustment of data collection and retention practices, software developers can dramatically reduce the privacy implications of their services.

For one, companies should reexamine what data they collect in the first place. Do many users actually want the features purportedly justifying detailed tracking? When it comes to Google Toolbar, I have my doubts: I don’t think many users want to know page-level PageRanks. Nor does Google Sidewiki feature a quantity or quality of comments sufficient to justify the significant privacy intrusion. My guiding principles: Provide genuine value, and put users’ interests first. _Collect data only when there is a compelling immediate reason, in the user’s personal interest, to do so_. An amorphous benefit, such as improving service or building a community, is not good enough.

Systems should _transmit as little information as possible to satisfy a user’s request_. Consider two alternative approaches to tell a user the PageRank popularity of a site. In a first system, the user’s computer sends a server the full URL of the user’s request, and the server returns the PageRank of that specific page. Alternatively, the user could send just the domain name at issue, and the server could return a list of popular URLs and PageRanks on that domain. With the right system of wildcards and aggregation, the latter approach need not use much more bandwidth, and it’s a modest and reasonable increase in complexity. But the privacy benefits are dramatic: In the first system, the server learns each user’s every page view, whereas the second keeps specific page views confidential.

Finally, companies should _limit data storage and its use with specific, firm commitments_. Key questions: How long will data be retained? Who will have access and for what purposes? Although these questions sound obvious, they’re easy to overlook. Tellingly, you won’t find answers in [Google’s Toolbar Privacy Policy](http://www.google.com/support/toolbar/bin/static.py?page=privacy.html), and even Google’s main [Privacy Policy](http://www.google.com/privacypolicy.html) is silent on key details.

**The Big Picture**  
My basic goal: Build privacy into the system. Collect less data, and collect data only when it’s actually in the users’ interest. Make sure users truly know what they’re accepting and why. Treat privacy protection as a valuable objective in its own right, not merely a hurdle standing between a company and a desired business opportunity. This may be tough medicine for those who seek to profit from tracking users in ever-greater detail, but it’s the right thing to do.