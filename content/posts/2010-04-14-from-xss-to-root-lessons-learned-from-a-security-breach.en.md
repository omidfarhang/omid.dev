---
title: "From XSS to root: Lessons Learned From a Security Breach"
date: 2010-04-14T23:13:00+00:00
layout: single
author_profile: true
url: 2010/04/14/from-xss-to-root-lessons-learned-from-a-security-breach/
tags:
  - advice
  - alert
  - malware
  - phishing
  - scam
lang: en
category: techblog
---
In an excellent [blog,](http://blogs.apache.org/infra/entry/apache_org_04_09_2010) the people from Apache did a very good job analyzing and documenting how a security breach happened–going through all the stages of the attack and drawing conclusions. Should you ever become the unfortunate victim of an attack, this blog offers an example of how to document it! 

I quote:”If you are a user of the Apache-hosted JIRA, Bugzilla, or Confluence, a hashed copy of your password has been compromised.” So if you are a user, please act accordingly after reading this blog 😉 

But let’s take a look at the early stages of the attack; I feel there are some important conclusions missing: 

Apache reports two simultaneous attacks that were launched. A brute-force attack against the JIRA login and an attempt to exploit a (previously unknown) cross-site scripting attack. They later say that just one of the attacks was successful, but not which one. From their blog: 

_The attackers via a compromised Slicehost server opened a new issue, INFRA-2591. This issue contained the following text:_ 

> _ive got this error while browsing some projects in jira http://tinyurl.com/XXXXXXXXX [obscured]_

_Tinyurl is a URL redirection and shortening tool. This specific URL redirected back to the Apache instance of JIRA, at a special URL containing a_ [_cross-site scripting (XSS) attack_](http://en.wikipedia.org/wiki/Cross-site_scripting)_. The attack was crafted to steal the session cookie from the user logged-in to JIRA. When this issue was opened against the Infrastructure team, several of our administrators clicked on the link. This compromised their sessions, including their JIRA administrator rights._ 

So administrators–knowledgeable and security-minded users–with elevated privileges opened an unverified link that was supplied by an external (anonymous?) source. And worse: The link was clearly obfuscated. This is where all technical security measures fail. Users worldwide are told again and again to be very careful with links in email and social networks, especially when they come from an untrusted source. Well, the fact that Koobface is alive and spreading makes it obvious that users still are too happy to click on any link they get. That experienced administrators fall for this makes the future look gloomy indeed. 🙁 

And another word about the URL obfuscators: A link shortened with tinyurl is one of very few that I would open, simply because it has got a [preview feature](http://tinyurl.com/preview.php) you can enable, showing you the actual link before it takes you there. If at least one of the targeted users in this incident would have enabled that feature, the XSS attack would have become obvious and would have been discovered immediately. 

So folks, please enable such functionality before you fall victim to an attack through obfuscated links, and stay clear of unknown URL shorteners or those without a preview feature.