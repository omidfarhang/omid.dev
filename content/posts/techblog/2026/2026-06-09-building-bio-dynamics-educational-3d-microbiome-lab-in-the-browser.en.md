---
title: "Building Bio-Dynamics: An Educational 3D Microbiome Lab in the Browser"
date: 2026-06-09T10:00:00+03:30
description: "Why I built a full-body microbiome sandbox — for education, open development storytelling, and exploring simulation and 3D outside my usual frontend lane."
layout: single
author_profile: true
url: 2026/06/09/building-bio-dynamics-educational-3d-microbiome-lab-in-the-browser/
shortlink: https://g.omid.dev/Efv0PTa
x_link: https://x.com/omidfarhang/status/2066273614178164953
mastodon_link: https://mastodon.social/@omidfarhang/116750600162141618
bluesky_link: https://bsky.app/profile/omid.dev/post/3mobqpup3yk22
linkedin_link: https://www.linkedin.com/posts/omidfarhang_building-bio-dynamics-an-educational-3d-share-7471934125256396800-H9lL/
tags:
  - Case Study
  - Frontend
  - TypeScript
  - Open Source
  - Data & AI
categories:
  - TechBlog
series:
  id: bio-dynamics-lab
  title: "Bio-Dynamics Lab"
  order: 0
  label: "Building Bio-Dynamics: Overview"
  role: anchor
seeAlso:
  - /2026/06/14/teaching-with-bio-dynamics-15-minute-lab-sessions/
---
I write a lot about Angular platforms, monorepos, and production frontends. Bio-Dynamics is different: a browser-only educational lab where you rotate a 3D body map, zoom into tissue, and run deterministic probiotic scenarios tied to health articles on [omid.dev](https://omid.dev).

It started for three reasons — a human one, a developer-story one, and a career one. This post is the anchor for that project. Deeper technical posts follow in a short series linked at the end.

{{< companion
  repo="omidfarhang/example-projects"
  sourceRoot="labs"
  path="microbiome-sandbox"
  title="Bio-Dynamics: Microbiome Sandbox"
  description="Open the live lab on playground.omid.dev or browse the full TypeScript source, simulation docs, and tests on GitHub."
  demoUrl="https://playground.omid.dev/labs/microbiome-sandbox/"
  demoLabel="Open live lab"
  sourceLabel="View source on GitHub"
>}}

> **Educational model — not medical advice.** Strain names, counts, and biome effects are illustrative. Do not use this lab to make health decisions.

## Three reasons I built it

### 1. A useful human cause

Probiotic concepts are abstract: barrier defense, pH balance, pre → pro → postbiotic chains. Text helps, but readers still imagine the mechanics.

Bio-Dynamics is a **visual companion** to five health posts on allergies, candidiasis, life-stage microbiome training, and the biotics lifecycle. Each preset opens the lab at the right tissue with the right scenario framing — for example, nasal barrier stress for allergies or gut lifecycle for SCFA production.

The goal is intuition, not diagnosis. If someone leaves understanding that inflammation can emerge from sustained pressure rather than a single button press, the lab did its job.

### 2. A honest development story

I wanted a project where I could document **how** an app like this is built — simulation choices, Three.js structure, catalog-driven UI, golden tests — without pretending it is a clinical engine.

The repository includes architecture notes, simulation specs, and extension guides: [docs/README.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/README.md). The follow-up posts in this series unpack the layers for developers who want to reuse the patterns.

### 3. Resume signal in newer fields

Most of my public work is enterprise Angular. Bio-Dynamics lets me show **TypeScript + Three.js + deterministic modeling + ed-tech UX** in one shipped artifact — with i18n (en/de/fa), accessibility on the control surface, shareable URL state, and CI that runs golden snapshot tests.

It is tagged [Case Study](/tags/case-study/) on omid.dev the same way as my collaborative editor and production migration posts — one anchor article, not a separate project page type.

## What the lab actually is

| Layer | Role |
| --- | --- |
| **Macro view** | Low-poly body with seven clickable tissue hotspots |
| **Micro view** | Animated zoom into region-specific cross-sections |
| **Simulation** | 30 Hz tick engine — populations, barrier integrity, emergent inflammation, pH, biotics |
| **Dashboard** | Stats, env sliders, 82 stressors, strain/product catalogs, action impact preview |

**Stack:** TypeScript, Vite, Three.js (only runtime npm dependency), Vitest. No React, no backend, no Python in production. The lab deploys on every merge to [playground.omid.dev](https://playground.omid.dev/labs/microbiome-sandbox/).

Overview: [docs/overview.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/overview.md)

## Architecture in one diagram

```text
App.ts
  ├── SimEngine      tick loop, biome state, microbe agents
  ├── Dashboard      vanilla HTML/CSS overlay, catalog-driven controls
  └── SceneManager   Three.js body + tissue + instanced microbes
```

`App.ts` owns the frame loop: advance simulation, push snapshot to scene and dashboard, autosave lab state. Region and preset changes reset or re-seed from typed catalogs in `src/data/`.

System overview: [architecture/system-overview.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/architecture/system-overview.md)

## What I deliberately did not build

The [assumptions and limits](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/simulation/assumptions-and-limits.md) doc is part of the product:

- No pharmacokinetics or personalized medicine
- Postbiotics as a scalar, not individual agents
- Random positions in a unit box, not anatomical niches
- Population display ×1000 for readable dashboard numbers

Saying "educational abstraction" in the UI is an architectural constraint, not fine print.

## Outcomes

- **Live demo** on playground with preset deep links from health articles
- **7 regions**, **3 presets**, **82 stressors**, **20 strains**, golden tests + CI
- **Shareable lab state** via `?lab=` URL encoding and localStorage resume
- **Open source** in [example-projects](https://github.com/omidfarhang/example-projects/tree/master/labs/microbiome-sandbox)

## Health article companions

The lab links back to omid.dev health writing:

- [How Probiotics Help with Allergies](https://omid.dev/2024/09/10/how-probiotics-help-with-allergies/)
- [How Probiotics Help with Candidiasis](https://omid.dev/2024/09/10/how-probiotics-help-with-candidiasis/)
- [Unlocking Prebiotics, Probiotics, and Postbiotics](https://omid.dev/2024/09/10/prebiotics-probiotics-postbiotics/)
- [Probiotics Through the Ages](https://omid.dev/2024/09/10/probiotics-through-the-ages/)

Clone the repo, open the demo, read a health post, then change something in the simulation and watch the event log narrate what happened. That is the loop I wanted readers to have.
