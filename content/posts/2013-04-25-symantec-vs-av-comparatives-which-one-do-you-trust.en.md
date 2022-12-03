---
title: Symantec vs AV-Comparatives, Which one do you trust?
date: 2013-04-25T18:42:01+00:00
layout: single
author_profile: true
url: 2013/04/25/symantec-vs-av-comparatives-which-one-do-you-trust/
image: /images/sites/3/2013/04/symantec-calls-test-misleading.jpg
tags:
  - av-comparatives
  - security
  - symantec
  - News
lang: en
category: techblog
---
Cross-posted from PCMag SecurityWatch:

[<img class="alignright size-medium wp-image-6547" alt="symantec-calls-test-misleading" src="/images/2013/04/symantec-calls-test-misleading-300x236.jpg" width="300" height="236" srcset="/images/sites/3/2013/04/symantec-calls-test-misleading-300x236.jpg 300w, /images/sites/3/2013/04/symantec-calls-test-misleading.jpg 450w" sizes="(max-width: 300px) 100vw, 300px" />](/images/2013/04/symantec-calls-test-misleading.jpg)Last week independent antivirus lab AV-Comparatives released the results of an on-demand antivirus detection test. The fact that Microsoft came in near the bottom wasn't big news; the fact that [Symantec scored even lower](http://securitywatch.pcmag.com/security-software/310201-microsoft-outperforms-symantec-in-antivirus-test) was surprising indeed. In a <a href="http://community.norton.com/t5/Norton-Protection-Blog/Beyond-the-Headlines-Don-t-be-fooled-by-misleading-security/ba-p/943843" target="_blank">blog post</a> released today, Symantec decried the entire practice of performing on-demand malware scanning tests, calling it &#8220;misleading.&#8221;

In the early years of antivirus testing, every test was an on-demand scanning test. Researchers would assemble a collection of known malware, run a full scan, and record the percentage of samples detected. Modern labs work hard to devise tests that more closely reflect a user's real-world experience, taking into account the fact that the vast majority of infections enter the computer from the Internet. Symantec contends that only the real-world sort of test is valid; I don't entirely agree.

**Crippled Protection?**  
Alejandro Borgia, senior director of product management for Symantec Corporation, stated categorically in his blog post that &#8220;the cited detection rates are misleading and not representative of real-world product efficacy.&#8221; Borgia said, &#8220;These types of file scanning tests are run in artificial environments that cripple all modern protection features.&#8221;

It's true that AV-Comparatives made sure the test systems had Internet access, thereby giving the Symantec installation access to the powerful cloud-based Norton Insight reputation system. When I asked my Symantec contacts about this, they explained that for full power Norton Insight relies on full information, &#8220;how the file was obtained, when it was obtained, or from where it was obtained (e.g. URL and IP address).&#8221; An on-demand file scanner test on files whose arrival Symantec's antivirus did not observe is not the same as when the user actually downloads files. That's true, but it _is_ the same as when a user installs antivirus to clean up an existing malware problem.

The network intrusion prevention components also got no chance to help out, since the file samples were downloaded before installation of antivirus software. Once again, you'd be in a similar situation when installing antivirus for the first time on an infested system. And of course behavior-based detection never kicks in until a program actually begins to execute.

In response to a query about behavior-based protection taking action only after a malicious file is launched, my Symantec contacts pointed out that &#8220;behavior&#8221; includes more than actions taken by the program. &#8220;Our behavioral technology takes into account a program’s location, how it is registered on the system (e.g., what registry keys refer to it), and many other factors,&#8221; they explained. &#8220;In most cases, the program will be stopped prior to it causing any harm.&#8221;

**Is It Misleading?  
** As to the claim that the test is misleading, AV-Comparatives doesn't agree. The introduction to the report itself that &#8220;the file detection rate of a product is only one aspect,&#8221; and points to &#8220;other test reports which cover different aspects.&#8221;

&#8220;It is clearly stated, that only one feature of the product is tested,&#8221; said Peter Stelzhammer, co-founder of AV-Comparatives. &#8220;If Symantec is thinking the file detection feature is worthless, why is it still included in the product?&#8221; Stelzhammer pointed out that file detection is needed for initial cleanup, and that PCs don't always have an Internet connection. Even so, &#8220;the test was run with full internet connection and Symantec cloud features have been granted access to their cloud.&#8221;

Borgia likens testing file detection alone to testing a car's safety systems by first disabling everything but the lap belt, stating that such a test would be &#8220;entirely flawed.&#8221; And yet, a test like that might well identify problems with a weak lap belt, so &#8220;entirely flawed&#8221; seems an overstatement.

**Real World Tests Only?  
** Borgia notes that Symantec strongly supports real-world tests, tests &#8220;that most closely represent the threat environment and utilize all of the proactive technologies provided with a product.&#8221; I can hardly disagree, but such tests require a huge amount of time and effort. The blog post holds up the testing performed by [Dennis Labs](http://securitywatch.pcmag.com/security-software/307816-microsoft-security-essentials-tanks-another-antivirus-test) as one shining example. Dennis Labs records the process of infection from real-world URLs and then uses a Web replay system to repeat the exact same process under each antivirus product's protection. Admirable indeed, but it takes a lot of time and effort.

AV-Comparatives itself runs real-world tests every day, challenging a collection of antivirus products installed in identical test rigs to defend against malware from hundreds of very new real-world malicious URLs. Every month they summarize the data, and every quarter they release a full <a href="http://www.av-comparatives.org/images/docs/avc_prot_2012b_en.pdf" target="_blank">Real World Protection report</a>. The process is labor-intensive enough that they rely on help from the University of Innsbruck and on partial funding by the Austrian government.

You'd expect Symantec to shine in this real-world test by AV-Comparatives. &#8220;Unfortunately,&#8221; noted Stelzhammer, &#8220;Symantec did not want to join our main test series.&#8221; Symantec chose not to participate, they said, because &#8220;AV-Comparatives does not offer vendors a subscription focused solely on real-world tests, while opting out of the file scan test.&#8221; However, this strategy seems to have backfired. Even though the company didn't subscribe, AV-Comparatives put Symantec into the on-demand test &#8220;as the results have been highly demanded by our readers and the press.&#8221;

**Multiple Tests Have Value  
** Symantec's blog post concludes, &#8220;We look forward to the day when all published tests are real-world tests. In the meantime, readers need to beware of artificial tests that show misleading product comparisons.&#8221; I, too, would be thrilled to see more tests that match a user's real-world experience, but I don't think we can discard file-detection tests.

Consider this. If you purchase antivirus software for a system that never had protection, you'll expect it to clean up any and all malware, without griping that it wasn't given a chance to use its network intrusion prevention. In a case like that you'll probably look for high scores in a test like the AV-Comparatives on-demand test, a test that fairly closely matches your situation.

For ongoing protection, yes, you'll want a product that earns top scores in real world tests also. So choose a product that scores high in both areas, and in tests from multiple labs. That way you'll get protection that can take care of any problems existing at installation and also fend off future malware attacks.