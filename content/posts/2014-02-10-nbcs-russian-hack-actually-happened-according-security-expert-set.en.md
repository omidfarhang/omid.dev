---
title: "How NBC's Russian Hack Actually Happened, According to the Security Expert Who Set It Up"
date: 2014-02-10T23:31:34+00:00
layout: single
author_profile: true
url: 2014/02/10/nbcs-russian-hack-actually-happened-according-security-expert-set/
shortlink: https://g.omid.dev/1n5QxX4
image: /images/sites/3/2014/02/sochi-hack-2014.png
tags:
  - sochi
  - News
lang: en
category: 
  - techblog
---
{{< youtube waEeJJVZ5P8 >}}

A couple days ago, NBC News ran a report pegged to the Sochi Olympics about Russian hacking. In it, correspondent Richard Engel uses a “brand new” smartphone to test out the Russian internet while hanging out in a Moscow cafe. “Almost immediately,” he says in the segment, “we were hacked.” Naturally, as the security consultant NBC hired for the segment explained today, it's not true.

The consultant, Kyle Wilhoit, a senior threat researcher at Trend Micro, set the record straight today in [a blog post on the Trend Micro site](http://blog.trendmicro.com/russia-experience-part-2/) and [an accompanying white paper](http://www.trendmicro.com/cloud-content/us/pdfs/security-intelligence/white-papers/wp-from-russia-with-love.pdf). He explained that Engel's report, while not completely inaccurate, was edited in a misleading way and the implications were overblown.

It was the perfect amalgamation of Russian stereotypes and fears: The subtext is that low-grade security infrastructure, built probably by the same bribe-laden goons that [put two toilets together in Sochi](http://www.theguardian.com/sport/shortcuts/2014/feb/04/sochi-double-toilets-winter-olympics-2014), has been completely overrun by evil Russian hackers all to prey on the poor visitors to the backwards country.

“Malicious software hijacked our phone before we even finished our coffee, stealing my information and giving hackers the ability to record my phone calls,” says Engel in the segment, incredulous. The implied follow-up to the report is obvious: Not only is Russia so inept that it hosted the Winter Olympics at a beach, you can't even walk into the country without getting spied on!

The irresistible mix of the “Russia is sketchy” storyline with Sochi and the specter of Cold War-era spycraft (how about those [hotel shower cameras](http://www.slate.com/blogs/the_slatest/2014/02/06/russia_olympic_shower_cams_hosts_dismiss_hotel_complaints_by_citing_video.html)?) sent the report bounding around the internet. “Report: Nearly all visitors to Sochi Winter Olympics will be hacked,” reads a [perfectly representative headline](http://www.itproportal.com/2014/02/06/report-nearly-all-visitors-to-sochi-winter-olympics-will-be-hacked/), while [NBC's own post](http://www.nbcnews.com/storyline/sochi-olympics/richard-engel-sochi-open-hunting-season-hackers-n22346) about it says Sochi is “&#8216;open hunting season for hackers.”

Nevermind the fact that Engel was actually in Moscow, which is about a 1,000 mile drive from the shores of Sochi. And ignore the fact that malware was only downloaded to Engel's devices after deliberately clicking on the same kind of malware-laden crap everyone in the world knows to avoid. It was too good a story to pass up.

But a story it was. Things started to unravel last night when a [post on the Errata Security blog](http://blog.erratasec.com/2014/02/that-nbc-story-100-fraudulent.html#.UvTxdkKwKlR) claimed that the story was “100% fraudulent.” Instead, argues the writer Robert Graham, the story was simply a reminder not to click on clearly hostile websites, like the fake Olympic sites Engel visited. “Absolutely 0% of the story was about turning on a computer and connecting to a Sochi network,” he writes. “100% of the story was about visiting websites remotely.”

[![sochi-hack-2014](/images/2014/02/sochi-hack-2014.png)\](/images/2014/02/sochi-hack-2014.png)

One of the malicious websites visited in the NBC report. Image: Kyle Wilhoit/Trend Micro 

&nbsp;

Today, Wilhoit explained that every attack involved a user interaction, could have happened anywhere, and happened on brand new devices without OS updates. Rather than a story about visitors being immediately hacked upon visiting Sochi, the story was about using internet best practices and not opening suspicious emails—which is hardly groundbreaking.

How did it happen? Wilhoit lays it out clearly (emphasis mine): “While all three devices looked like they had been compromised with no user interactions that was just not the case. **Incorrect impressions may have been formed due to the editing process**; no zero-days were used and all infections required plenty of risky behavior to succeed.”

Wilhoit's white paper has in-depth explanations of the hacks observed on the test equipment—a Galaxy S4, Lenovo ThinkPad, and MacBook Air—but again, the caveat is clear. “As in most malware attacks, user activity of one form or another is required for an infection to affect devices,” he wrote. “The case studies presented in this paper do not differ in that the user has to do something because no compromise automatically occurs.”

So while Engel's report wasn't 100 percent false—the tested equipment was indeed compromised—the malware attacks were absolutely not immediate, and were absolutely not endemic to Sochi. Such infections could have happened to anyone in the world, and could have come from anywhere in the world, because they involved fooling around on compromised sites on the open web.

How does a tale about internet best practices—a legitimately good thing to remind people of—turn into a Sochi hacking story based in Moscow? After Graham's report dropped, NBC told Business Insider that [nothing was fraudulent about the report](http://www.businessinsider.com/nbc-richard-engel-hacking-report-cyber-attack-sochi-olympics-2014-2), and that it was clear that it happened in Moscow and that it was designed to model what an average user would do. It's as yet not clear how NBC will respond to Wilhoit's report; I'm waiting on a response to an email inquiry, and will update when possible.

However, it does seem pretty apparent that NBC dressed up a hacking story—which I can say from experience are not easy to tell in video form, especially to a broad audience—by pegging it to Sochi. Teaching travelers about internet security is a smart, valuable service. But by focusing so heavily on the Sochi angle, and suggesting that hacks are immediate—an assertion that, beyond the control of NBC, was also amplified and distorted in the media echo chamber—the report ended up missing the mark.

via: [vice.com](http://motherboard.vice.com/blog/how-nbcs-russian-hack-actually-happened-according-to-the-security-expert-who-set-it-up)