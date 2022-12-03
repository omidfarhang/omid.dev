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
category: techblog
---
{% include video id="waEeJJVZ5P8" provider="youtube" %}

A couple days ago, NBC News ran a report pegged to the Sochi Olympics about Russian hacking. In it, correspondent Richard Engel uses a &#8220;brand new&#8221; smartphone to test out the Russian internet while hanging out in a Moscow cafe. &#8220;Almost immediately,&#8221; he says in the segment, &#8220;we were hacked.&#8221; Naturally, as the security consultant NBC hired for the segment explained today, it's not true.

The consultant, Kyle Wilhoit, a senior threat researcher at Trend Micro, set the record straight today in <a href="http://blog.trendmicro.com/russia-experience-part-2/" target="_blank">a blog post on the Trend Micro site</a> and <a href="http://www.trendmicro.com/cloud-content/us/pdfs/security-intelligence/white-papers/wp-from-russia-with-love.pdf" target="_blank">an accompanying white paper</a>. He explained that Engel's report, while not completely inaccurate, was edited in a misleading way and the implications were overblown.

It was the perfect amalgamation of Russian stereotypes and fears: The subtext is that low-grade security infrastructure, built probably by the same bribe-laden goons that <a href="http://www.theguardian.com/sport/shortcuts/2014/feb/04/sochi-double-toilets-winter-olympics-2014" target="_blank">put two toilets together in Sochi</a>, has been completely overrun by evil Russian hackers all to prey on the poor visitors to the backwards country.

&#8220;Malicious software hijacked our phone before we even finished our coffee, stealing my information and giving hackers the ability to record my phone calls,&#8221; says Engel in the segment, incredulous. The implied follow-up to the report is obvious: Not only is Russia so inept that it hosted the Winter Olympics at a beach, you can't even walk into the country without getting spied on!

The irresistible mix of the &#8220;Russia is sketchy&#8221; storyline with Sochi and the specter of Cold War-era spycraft (how about those <a href="http://www.slate.com/blogs/the_slatest/2014/02/06/russia_olympic_shower_cams_hosts_dismiss_hotel_complaints_by_citing_video.html" target="_blank">hotel shower cameras</a>?) sent the report bounding around the internet. &#8220;Report: Nearly all visitors to Sochi Winter Olympics will be hacked,&#8221; reads a <a href="http://www.itproportal.com/2014/02/06/report-nearly-all-visitors-to-sochi-winter-olympics-will-be-hacked/" target="_blank">perfectly representative headline</a>, while <a href="http://www.nbcnews.com/storyline/sochi-olympics/richard-engel-sochi-open-hunting-season-hackers-n22346" target="_blank">NBC's own post</a> about it says Sochi is &#8220;&#8216;open hunting season for hackers.&#8221;

Nevermind the fact that Engel was actually in Moscow, which is about a 1,000 mile drive from the shores of Sochi. And ignore the fact that malware was only downloaded to Engel's devices after deliberately clicking on the same kind of malware-laden crap everyone in the world knows to avoid. It was too good a story to pass up.

But a story it was. Things started to unravel last night when a <a href="http://blog.erratasec.com/2014/02/that-nbc-story-100-fraudulent.html#.UvTxdkKwKlR" target="_blank">post on the Errata Security blog</a> claimed that the story was &#8220;100% fraudulent.&#8221; Instead, argues the writer Robert Graham, the story was simply a reminder not to click on clearly hostile websites, like the fake Olympic sites Engel visited. &#8220;Absolutely 0% of the story was about turning on a computer and connecting to a Sochi network,&#8221; he writes. &#8220;100% of the story was about visiting websites remotely.&#8221;<figure id="attachment_6712" aria-describedby="caption-attachment-6712" style="width: 668px" class="wp-caption alignnone">

[<img class="size-full wp-image-6712" alt="sochi-hack-2014" src="/images/2014/02/sochi-hack-2014.png" width="678" height="411" srcset="/images/sites/3/2014/02/sochi-hack-2014.png 678w, /images/sites/3/2014/02/sochi-hack-2014-300x181.png 300w" sizes="(max-width: 678px) 100vw, 678px" />](/images/2014/02/sochi-hack-2014.png)<figcaption id="caption-attachment-6712" class="wp-caption-text">One of the malicious websites visited in the NBC report. Image: Kyle Wilhoit/Trend Micro</figcaption></figure> 

&nbsp;

Today, Wilhoit explained that every attack involved a user interaction, could have happened anywhere, and happened on brand new devices without OS updates. Rather than a story about visitors being immediately hacked upon visiting Sochi, the story was about using internet best practices and not opening suspicious emails—which is hardly groundbreaking.

How did it happen? Wilhoit lays it out clearly (emphasis mine): &#8220;While all three devices looked like they had been compromised with no user interactions that was just not the case. **Incorrect impressions may have been formed due to the editing process**; no zero-days were used and all infections required plenty of risky behavior to succeed.&#8221;

Wilhoit's white paper has in-depth explanations of the hacks observed on the test equipment—a Galaxy S4, Lenovo ThinkPad, and MacBook Air—but again, the caveat is clear. &#8220;As in most malware attacks, user activity of one form or another is required for an infection to affect devices,&#8221; he wrote. &#8220;The case studies presented in this paper do not differ in that the user has to do something because no compromise automatically occurs.&#8221;

So while Engel's report wasn't 100 percent false—the tested equipment was indeed compromised—the malware attacks were absolutely not immediate, and were absolutely not endemic to Sochi. Such infections could have happened to anyone in the world, and could have come from anywhere in the world, because they involved fooling around on compromised sites on the open web.

How does a tale about internet best practices—a legitimately good thing to remind people of—turn into a Sochi hacking story based in Moscow? After Graham's report dropped, NBC told Business Insider that <a href="http://www.businessinsider.com/nbc-richard-engel-hacking-report-cyber-attack-sochi-olympics-2014-2" target="_blank">nothing was fraudulent about the report</a>, and that it was clear that it happened in Moscow and that it was designed to model what an average user would do. It's as yet not clear how NBC will respond to Wilhoit's report; I'm waiting on a response to an email inquiry, and will update when possible.

However, it does seem pretty apparent that NBC dressed up a hacking story—which I can say from experience are not easy to tell in video form, especially to a broad audience—by pegging it to Sochi. Teaching travelers about internet security is a smart, valuable service. But by focusing so heavily on the Sochi angle, and suggesting that hacks are immediate—an assertion that, beyond the control of NBC, was also amplified and distorted in the media echo chamber—the report ended up missing the mark.

via: <a href="http://motherboard.vice.com/blog/how-nbcs-russian-hack-actually-happened-according-to-the-security-expert-who-set-it-up" target="_blank">vice.com</a>