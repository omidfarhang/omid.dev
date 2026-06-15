---
title: "Designing a Deterministic Microbiome Simulation Without Overclaiming Science"
date: 2026-06-10T10:00:00+03:30
description: "How Bio-Dynamics models barrier integrity, emergent inflammation, and microbe competition in a 30 Hz tick engine — with golden tests that keep the educational demo honest."
layout: single
author_profile: true
url: 2026/06/10/deterministic-microbiome-simulation-without-overclaiming-science/
shortlink: https://g.omid.dev/boyAWHy
x_link: https://x.com/OmidFarhangEn/status/2066273726992375825
mastodon_link: https://mastodon.social/@omidfarhang/116750601176826369
bluesky_link: https://bsky.app/profile/omid.dev/post/3mobqqaar3s22
linkedin_link: https://www.linkedin.com/posts/omidfarhang_typescript-threejs-webgl-share-7471936715075559424-rZnW/
tags:
  - TypeScript
  - Frontend
  - Open Source
categories:
  - TechBlog
series:
  id: bio-dynamics-lab
  title: "Bio-Dynamics Lab"
  order: 1
  label: "Designing a deterministic microbiome simulation"
  role: part
---
Bio-Dynamics is an educational 3D lab, not a clinical simulator. That constraint shaped every decision in the simulation layer: reproducible ticks, scalar tissue state, capped agent counts, and inflammation that emerges from pressure instead of jumping on every button press.

This post walks through the engine design.

{{< companion
  repo="omidfarhang/example-projects"
  sourceRoot="labs"
  path="microbiome-sandbox"
  title="Bio-Dynamics: Microbiome Sandbox"
  description="Run the live lab or inspect the simulation source — tick engine, golden tests, and full docs in the repository."
  demoUrl="https://playground.omid.dev/labs/microbiome-sandbox/?preset=allergy&region=nose"
  demoLabel="Open live lab"
  sourceLabel="View source on GitHub"
>}}

## Why deterministic?

Interactive demos fail the educational test when the same button sequence produces different outcomes on refresh. Readers cannot build intuition from noise.

`SimEngine` fixes that with three choices:

1. **Fixed timestep** — `FIXED_DT = 1/30` seconds; the frame loop may render faster, but simulation advances in capped substeps.
2. **Seeded PRNG** — default seed `42` for spawn positions and vitality jitter via a linear congruential generator.
3. **Golden snapshot tests** — scripted action sequences are compared against checked-in JSON fixtures so refactors cannot silently drift behavior.

Full model overview: [simulation/model-overview.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/simulation/model-overview.md)

## Agents plus scalars, not a full ABM framework

The engine keeps two parallel representations:

- **`MicrobeNode` agents** (max 400) — probiotics, pathogens, allergens, commensals, and prebiotic substrate particles with vitality and positions in a unit box.
- **`BiomeState` scalars** — pH, moisture, barrier integrity, biofilm, immune activity, postbiotic level, and region-specific fields like cerumen or oxygen tension.

User actions apply **immediate** biome mutations and spawns. Continuous dynamics run each tick: growth, competition, prebiotic conversion, sugar decay, and emergent inflammation.

Population counts shown in the dashboard are multiplied by `POPULATION_SCALE` (1000) for readable numbers — another explicit simplification documented in [assumptions-and-limits.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/simulation/assumptions-and-limits.md).

## Emergent inflammation instead of flat deltas

Early prototypes bumped `inflammation` directly on every stressor click. That felt game-like and wrong for teaching barrier defense.

The current model in `inflammationDynamics.ts` computes a **target** from pathogen pressure, allergen load, low integrity, biofilm, and immune signaling, then eases `inflammation` toward that target each tick. Stressors like histamine spikes raise **`immuneActivity`** first; inflammation follows.

Dynamics reference: [simulation/dynamics.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/simulation/dynamics.md)

## Gut-brain as an educational proxy

On gut tissue, `gutBrainDynamics.ts` maintains `tryptophanSupport` — a scalar proxy linked to calm mucosa and SCFA output, not mood prediction. The lifecycle preset surfaces it in the dashboard with article links on key strains.

The point is narrative coherence for the pre → pro → postbiotic chain, not serotonin pharmacokinetics.

## Golden tests as a contract

`engine.golden.test.ts` replays two scripted sequences:

- **Allergy / nose** — allergen spike, histamine, L. rhamnosus, saline mist
- **Lifecycle / gut** — prebiotic apply, probiotic conversion, postbiotic rise

Each checkpoint records tick, biome scalars, and population counts. `npm test` in `labs/microbiome-sandbox` fails if behavior drifts.

```typescript
it('matches fixture for allergy/nose action sequence (seed 42)', () => {
  expect(runAllergyNoseSequence()).toEqual(golden.scenarios.allergy_nose);
});
```

Fixture: [`src/sim/fixtures/engine-golden.json`](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/src/sim/fixtures/engine-golden.json)

## What I deliberately did not model

The [assumptions doc](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/simulation/assumptions-and-limits.md) is part of the product. Non-goals include:

- Pharmacokinetics and dosing timelines
- Metagenomic profiles or strain-level genomics
- Anatomically accurate spatial niches
- Postbiotics as individual agents (they stay a scalar `postbioticLevel`)

Saying "educational abstraction" in the UI disclaimer is not modesty — it is architecture.
