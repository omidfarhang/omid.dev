---
title: "Not Traffic from aocr.org: a Forged-Referrer Crawler"
date: 2026-11-07T19:05:00+03:30
description: "Matomo has been showing daily visits from www.aocr.org for about a month. The referrer is forged. Fingerprint from this site, how it fits the wider campaign, what not to do, and why I am leaving the traffic alone."
layout: single
author_profile: true
url: 2026/11/07/aocr-org-referrer-crawler/
shortlink: https://g.omid.dev/ifCSCh5
keywords:
  - aocr.org referrer spam
  - forged referrer crawler
  - Matomo fake referral traffic
  - Bytespider fingerprint
  - referral spam analytics
tags:
  - Security
  - SEO
categories:
  - TechBlog
---

For about a month, Matomo has shown a steady stream of visits that claim they came from `https://www.aocr.org/`. Not a one-day spike. Everyday noise in the Live panel and acquisition reports.

A recent window of 100 visits makes the skew obvious: 98 carried that exact referrer. The other two were a normal hop from `playground.omid.dev` and one odd referrer from `orb-cna.xaminim.com`. When this crawler is active, it can dominate the visitor stream for hours.

## What it looks like in Matomo

This is client-side tracking, not raw access logs. The fingerprint is still clear.

| Field | Recent sample (98 aocr visits) |
| --- | --- |
| Referrer | `https://www.aocr.org/` every time |
| Referrer type | Website (not search, not campaign) |
| Browser / OS | Chrome 146.0 on Windows 10 (96); two outliers (Chrome 122/Mac, Chrome 93/Windows) |
| Screen | 800×600 for all 98 |
| Language | `en-us` for all 98 |
| Plugins | `cookie, pdf` only |
| Device | Desktop |
| Actions / duration | 1 pageview, 0s visit duration |
| Visitor type | All new; visit count 1; 98 distinct visitor IDs and fingerprints |
| Geography (via anonymized IP) | 71 of 98 in the United States; cities cluster on Santa Clara, Dallas, Chicago, Orem, and similar; long tail across Colombia, India, Canada, and others |
| Landings | 47 distinct URLs across posts, notes, tags, playground, and FA tag `index.xml` paths, including 10 that rendered as 404 titles |

Hits are spread across many hours of the day, not a single burst, which matches the daily pattern. Matomo’s IP anonymization collapses addresses to shapes like `192.177.0.0` / `9.232.0.0`, so those are not precise hosts. They only show a rotating pool across many /16s.

Nobody linked me from a radiology college. A crawler is walking a wide set of URLs, one page per session, with a fixed fake referrer and a fixed fake desktop profile.

### Crawl shape, not a hotlink

The landing distribution looks like a sitemap walk, not a hotlink or a mention of one popular article.

Evergreen Linux posts show up often (`how-to-upgrade-ubuntu`, kernel upgrade, Manjaro desktop). So do playground labs, notes, English and Persian tag pages, and some `index.xml` tag feeds that 404. One playground URL arrived with a mangled query string: `preset=allergy®ion=nose`. That is almost certainly `&region=` after an HTML entity decode turned `&reg` into `®`. Whatever built the URL list was not careful about markup.

Two visits in the sample used a different Chrome version (122 on Mac, 93 on Windows) but kept the same referrer, screen size, language, and one-hit behavior. Treat the Chrome 146 / Windows string as the common disguise, not a perfect constant.

## What aocr.org is (and is not)

[www.aocr.org](https://www.aocr.org/) is the American Osteopathic College of Radiology. A real institution. There is no reason for it to deep-link into Ubuntu upgrade posts, Persian tag feeds, or playground labs on this site, and nobody has shown that AOCR’s servers are involved.

The `Referer` header is client-controlled. Analytics tools mostly trust it. A bot can write any domain there. Older referral-spam campaigns used obvious junk domains. This one borrows a legitimate institutional name so the acquisition report looks plausible at a glance. That is a forged label on a request, not a backlink, a partnership, or a compromise of AOCR.

Several writeups also note `Sec-Fetch-Site: none` on these requests. A browser sends that for a typed URL or a programmatic open, not for a real click from another site (which would typically be `cross-site`). The referrer is stamped on. It is not earned by navigation. Do not email AOCR about this. They are not sending the traffic.

## How this fits the wider picture

Since late September 2026, a lot of site operators have seen the same signature. That lines up with when I started noticing it here. Reports cover personal sites, forums (thousands of sessions in a day in at least one case), documentation, GitHub, and larger company properties.

The best public writeup I have read is Ege Demir’s on [tin.computer](https://tin.computer/blog/aocr-org-referrer-bot) (also covered in [Rubric’s 2026-11-01 edition](https://rubric.hrih.si/editions/2026-11-01/33/)). Separate from what Matomo shows on this site, that investigation adds request-level and browser-level detail Matomo does not capture:

- Same Chrome 146 / Windows disguise, same `https://www.aocr.org/` referrer, same 800×600 screen, Asia/Shanghai timezone in richer client telemetry.
- Typical user agent: `Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36`.
- `Accept` includes `image/heif` (stock Chrome 146 to 157 does not). No `Sec-CH-UA` client hints. HTTP/2 priority weight 256 exclusive (real Chrome tends to use 16). TLS ClientHello lengths sit on a set that overlaps Bytespider more than ordinary browsers.
- That TLS / HTTP/2 / `Accept` trio lined up with declared Bytespider and TikTokSpider far more often than with other traffic in their dataset. The aocr crawler does not name itself as Bytespider in the user agent.
- Session timing fields include ByteDance-internal names (`extensionTiming` / `forestResFrom` / `forestResLoadStart`, `htmlPredictorHit`) that stock Chrome, Edge, Safari, Firefox, and several Chinese browsers did not show in their comparison set. Forest is ByteDance’s internal resource-loader name; Lynx docs mention a customized loader “like forest.”
- Visible client IPs look like commercial or residential proxy pools (often a new address per page; open ports such as 1180, 40000, or 60000 on many of those hosts). On one monitored site, WebRTC-style checks pointed at China Mobile AS132510 in Shanxi: Linux x86_64 boxes with Chinese system fonts, claiming to be Windows with a Mac graphics card.
- Who operates it is still unproven. Sharing a stack with Bytespider does not prove a ByteDance product team runs this undeclared crawler. It could also be a customer of ByteDance infrastructure (for example Volcano Engine) that reuses the same browser. Rubric’s judges flagged that the tin.computer headline overclaims certainty; the measurement work still holds.

[blackmoreops](https://www.blackmoreops.com/aocr-org-referrer-spam-google-analytics/) treats it as classic referrer spam in analytics and access logs: flat distribution across many URLs, identical UA, rotating IPs, zero engagement. That matches the Matomo pattern here, even though their stack was nginx and GA rather than Matomo.

Two context points from the same research are worth keeping in mind:

1. **Why the referrer showed up.** Undeclared crawlers with related stacks were already around. Earlier ones often sent no referrer and blended into “direct.” Stamping `www.aocr.org` made the traffic obvious in acquisition reports. The domain choice itself looks arbitrary and fixed; there is no evidence AOCR was hacked to make it happen.
2. **robots.txt is the wrong lever.** Declared Bytespider may honour a Bytespider rule. This client does not identify as Bytespider, so a robots rule aimed at that name does not apply. CDN or analytics filters are the practical controls if you want any.

SEO forum threads asking whether AOCR was “hacked” keep landing on the same conclusion: forged header, not a medical-college link campaign, and not a sign your own site was compromised. There is also a broader precedent for undeclared crawlers that wear a generic Chrome user agent and rotate networks; Cloudflare documented a Perplexity case along those lines in 2025.

## Security and SEO

Nothing in this traffic pattern looks like an intrusion. Published pages and some stale or 404 tag URLs get a single GET-shaped visit. No login probing, no comment spam, no write paths. A forged `Referer` is not a forged session.

It also does not create a backlink you need to disavow. There is no hyperlink on aocr.org to remove. Ranking systems do not see your Matomo referrer report. The practical damage is polluted acquisition charts, a brief “who is linking me?” distraction, and whatever crawl cost hits the origin if you are uncached.

On a cached static Hugo site, that cost is usually noise. Junk traffic that repeatedly hits uncached or missing URLs is more expensive than junk traffic that hits warm pages. The Persian tag `index.xml` 404s in this sample are the part I care about slightly more than the successful HTML fetches, and only as ordinary crawl hygiene.

## What I am doing (and not doing)

I am not going to rate-limit, challenge, or IP-ban this traffic. The pool rotates. Blocking by address is a treadmill. Blocking on the Chrome 146 user agent alone would be worse: that string is meant to look ordinary. For a static Hugo site, the marginal cost of these hits is noise. If they want to fetch public HTML with a silly referrer stamp, fine.

I may later exclude `aocr.org` from Matomo reports so human channels stay readable. That is report hygiene, not a block. In Matomo, the useful moves are a segment or referrer exclusion for `aocr.org` / `www.aocr.org`, not a firewall rule. If the referrer string changes tomorrow, the stabler signals are still there: Chrome 146, Windows, 800×600, one action, zero duration, and a wide URL fan-out. Sites with richer client telemetry also use timezone `Asia/Shanghai` plus screen width 800 as a backup filter after the referrer changes.

If you *do* want to challenge the requests at a CDN, others have had success matching on `Accept` containing `image/heif,image/avif` without `Sec-CH-UA`, or on `Referer` containing `aocr.org`. Run new rules in log mode first. That is optional. It is not what I am doing here.

If you are seeing the same pattern, check your own analytics against that fingerprint before emailing a radiology college or calling it a traffic win.
