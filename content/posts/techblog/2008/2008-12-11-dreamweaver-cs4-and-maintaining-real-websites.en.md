---
title: Dreamweaver CS4 and Maintaining Real Websites
date: 2008-12-11T14:00:00+00:00
description: Adobe Dreamweaver CS4 in 2008 sat between visual editing and standards-based web development — practical tips for keeping sites maintainable.
layout: single
author_profile: true
url: 2008/12/11/dreamweaver-cs4-and-maintaining-real-websites/
tags:
  - Dreamweaver
  - Web Development
  - HTML
  - CSS
  - Adobe

categories:
  - TechBlog
---
After Adobe absorbed **Macromedia**, **Dreamweaver** remained the default tool for many small teams building corporate sites, portfolios, and internal portals. **Dreamweaver CS4** adds better CSS tooling, **Live View** powered by WebKit, and closer ties to the Adobe stack — but the hard part is still the same: **keeping sites maintainable after launch.**

## What CS4 Improved

- **Live View** renders pages with a WebKit engine — closer to Safari and Chrome than the old Design view approximation
- Stronger **CSS panel** workflows for designers who do not want to hand-write every rule
- Better **code hinting** for PHP and JavaScript
- Integration hooks for **Photoshop** comps and **Bridge** asset management
- **Spry** framework widgets for menus and form validation — use sparingly
- **Subversion integration** for teams finally moving off shared folders

Live View reduces "upload and pray" cycles. You still need to test in IE7 and Firefox 3 — WebKit is not the whole audience.

## What Still Hurts Projects

- **Template spaghetti** when non-developers edit freely across locked and unlocked regions
- **Table layouts** lingering from sites built in 2003
- **Inline styles** multiplying during rush deadlines
- **FTP publish** without version control — one wrong sync overwrites production
- **Spry dependency** on pages that only needed a simple dropdown

The tool did not create these problems. Deadlines and skill gaps did. CS4 makes good habits easier and bad habits faster.

## Habits That Save Projects

1. **Templates with editable regions only** — lock header, footer, navigation
2. **External CSS** — one `screen.css`, not forty inline font tags
3. **Validate HTML** before every major release — W3C validator still catches real bugs
4. **Version control** — Subversion beats `final2_real.zip` on a USB stick
5. **Separate dev/staging** — Dreamweaver can upload to the wrong folder in one click
6. **Document FTP credentials** in a password manager, not in the site definition on a shared PC

## Pair Visual Tools with Standards

Dreamweaver is fastest when developers:

- Write **semantic HTML** by hand for structure — `h1`, `p`, `ul`, not nested layout tables
- Use Design view and Live View for **spacing tweaks**, not architecture decisions
- Test in **Firefox 3, IE7, and Chrome** — the three-engine matrix in 2008
- Plan **fixed-width layouts** that degrade gracefully; true responsive design is still rare

IE6 has not disappeared yet. Many corporate clients still require it. CS4's WebKit preview does not replace an IE test pass.

## Adobe AIR and the Bigger Stack

CS4 ships in the context of **Adobe AIR** — desktop apps built with web technologies. Some teams confuse "we have Dreamweaver" with "we should build an AIR app." Most brochure sites do not need that complexity. Stick to HTML, CSS, and the minimum JavaScript required.

## Keep the Source Clean

Dreamweaver CS4 is still how many real sites ship in 2008. That is fine. The tool is not the problem; unmanaged source is.

Use Dreamweaver for speed, but keep the HTML readable, the CSS external, and the header in one place. The next contractor will know immediately whether you cared about the site after launch.
