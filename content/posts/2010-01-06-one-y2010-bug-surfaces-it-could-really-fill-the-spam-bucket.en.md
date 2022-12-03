---
title: One Y2010 bug surfaces – it could really fill the spam bucket
date: 2010-01-06T14:06:00+00:00
layout: single
author_profile: true
url: 2010/01/06/one-y2010-bug-surfaces-it-could-really-fill-the-spam-bucket/
tags:
  - news
  - report
lang: en
category: techblog
---
Mike Cardwell, an IT consultant in Nottingham, UK, reported on his [blog](https://secure.grepular.com/blog/index.php/2010/01/01/spamassassin-2010-bug/) finding a Y2010 bug in Spam Assassin. He found an error in a rule that Spam Assassin folks thought they fixed.

“I think a lot of systems will be experiencing false positives on their ham because of this at the moment. It is a particularly high scoring rule considering that the default threshold is 5.0,” he wrote.

For further information see: [SpamAssassin Rule: FH\_DATE\_PAST_20XX](http://wiki.apache.org/spamassassin/Rules/FH_DATE_PAST_20XX)