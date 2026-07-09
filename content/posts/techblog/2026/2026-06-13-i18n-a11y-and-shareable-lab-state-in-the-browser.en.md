---
title: "i18n, a11y, and Shareable Lab State in the Browser"
date: 2026-06-13T10:00:00+03:30
description: "How Bio-Dynamics supports English, German, and Persian, keeps keyboard and screen-reader paths usable, and encodes lab checkpoints in the URL."
layout: single
author_profile: true
url: 2026/06/13/i18n-a11y-and-shareable-lab-state-in-the-browser/
shortlink: https://g.omid.dev/x2HIy7k
x_link: https://x.com/omidfarhang/status/2066274564783673370
mastodon_link: https://mastodon.social/@omidfarhang/116750604375466701
bluesky_link: https://bsky.app/profile/omid.dev/post/3mobqregc4c22
linkedin_link: https://www.linkedin.com/posts/omidfarhang_i18n-a11y-and-shareable-lab-state-in-the-share-7472042703388782592-_F5f/
tags:
  - TypeScript
  - Frontend
  - Web Performance
  - Open Source
categories:
  - TechBlog
series:
  id: bio-dynamics-lab
  title: "Bio-Dynamics Lab"
  order: 4
  label: "i18n, a11y, and shareable lab state in the browser"
  role: part
---
Shipping an educational lab to a global audience means more than translation strings. Bio-Dynamics adds RTL layout for Persian, keyboard region shortcuts, ARIA live announcements, touch gesture hints, and URL-encoded lab checkpoints so teachers can share a mid-simulation state without a backend.

{{< companion
  repo="omidfarhang/example-projects"
  sourceRoot="labs"
  path="microbiome-sandbox"
  title="Bio-Dynamics: Microbiome Sandbox"
  description="Try ?lang=fa or copy a lab link after running a scenario — source for i18n and labState.ts is on GitHub."
  demoUrl="https://playground.omid.dev/labs/microbiome-sandbox/?preset=lifecycle&region=gut&lang=de"
  demoLabel="Open live lab"
  sourceLabel="View source on GitHub"
>}}

## Lightweight i18n without a framework

Locales live in `src/i18n/en.ts`, `de.ts`, and `fa.ts`. A small `t()` helper resolves dot-path keys with parameter interpolation:

```typescript
export function t(path: string, params?: Record<string, string | number>): string
```

Locale selection order:

1. `?lang=en|de|fa` query param
2. `navigator.language` heuristic (`de`, `fa` / `per` prefixes)
3. Default `en`

`applyDocumentLocale()` sets `document.documentElement.lang` and `dir="rtl"` for Persian — the dashboard CSS uses logical properties where needed so RTL does not require a duplicate stylesheet.

Event log lines from the engine are English internally; `translateEvent()` maps known prefixes to localized strings on display.

User guide (sharing and URL params): [docs/user-guide.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/user-guide.md)

## Accessibility choices that survived scope pressure

| Feature | Implementation |
| --- | --- |
| Keyboard region select | Keys `1`–`7` map to region list order; `Esc` returns to macro body |
| Focusable actions | Catalog and trigger buttons carry `aria-label`s |
| Live announcements | `aria-live="polite"` region updates on region change, preset switch, and major sim events |
| Touch hints | Dismissible gesture card on coarse pointers; hidden on fine-pointer desktops |
| Reduced motion respect | Camera fly-to uses short easing; no gratuitous particle bursts |

These are not a full WCAG audit claim — the lab is a canvas-heavy WebGL demo — but they keep the **control surface** operable without a mouse.

## Shareable lab state without a server

`labState.ts` serializes a mid-simulation checkpoint to:

1. **URL** — `?lab=` plus a compact base64url payload (preset, region, tick, biome scalars, nodes, recent events)
2. **`localStorage`** — autosave on meaningful progress for resume-after-refresh

`Copy lab link` in the dashboard encodes the current snapshot. Opening that URL restores the exact node layout and meter values — useful for classroom demos ("start here after the allergen spike").

Resume banner logic:

- Offer restore when autosaved state exists and is younger than 7 days
- Skip if URL already contains `?lab=`
- Dismiss sets `sessionStorage` so "Start fresh" does not nag in the same session

Source: [`src/state/labState.ts`](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/src/state/labState.ts)

## URL params as product surface

Beyond lab checkpoints, query params drive preset deep links from health articles:

| Param | Example | Effect |
| --- | --- | --- |
| `preset` | `allergy`, `candida`, `lifecycle` | Scenario framing and default env |
| `region` | `nose`, `gut`, `vaginal` | Opens tissue context |
| `context` | `lifestage` | Swaps allergy narrative to life-stage variant |
| `lang` | `de`, `fa` | UI locale |

Health posts on omid.dev already embed companions with these URLs. The lab meets readers where the article left off.

## Why client-only persistence is enough

Bio-Dynamics has no accounts, no database, no sync service. For an educational sandbox that ships on every commit to [playground.omid.dev](https://playground.omid.dev/labs/microbiome-sandbox/), that is a feature:

- Zero backend cost and ops
- Shareable URLs work forever as static links
- Privacy-friendly — no health data leaves the browser

The trade-off is payload size limits in URLs and no cross-device sync. Acceptable for 400 capped nodes with compact tuple encoding.

Full documentation index: [docs/README.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/README.md)
