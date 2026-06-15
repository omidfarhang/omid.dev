---
title: "Catalog-Driven Dashboard: Strains, Stressors, and Action Impact"
date: 2026-06-12T10:00:00+03:30
description: "How Bio-Dynamics keeps 82 stressors, 20 strains, and four catalog tabs maintainable — and previews biome deltas before you click."
layout: single
author_profile: true
url: 2026/06/12/catalog-driven-dashboard-strains-stressors-and-action-impact/
shortlink: https://g.omid.dev/uHLGE6i
x_link: https://x.com/OmidFarhangEn/status/2066273935193465196
mastodon_link: https://mastodon.social/@omidfarhang/116750603779667832
bluesky_link: https://bsky.app/profile/omid.dev/post/3mobqqz75wc22
linkedin_link: https://www.linkedin.com/posts/omidfarhang_catalog-driven-dashboard-strains-stressors-share-7472037294288416769-UYbv/
tags:
  - TypeScript
  - Frontend
  - Open Source
categories:
  - TechBlog
series:
  id: bio-dynamics-lab
  title: "Bio-Dynamics Lab"
  order: 3
  label: "Catalog-driven dashboard: strains, stressors, and action impact"
  role: part
---
The Bio-Dynamics dashboard exposes a lot of buttons: regional stressors, inoculations, environment sliders, and four catalog tabs for strains, prebiotics, postbiotics, and products. The trick is not rendering HTML — it is keeping the catalog honest as content grows.

This post explains the data-first layout and the action impact preview panel.

{{< companion
  repo="omidfarhang/example-projects"
  sourceRoot="labs"
  path="microbiome-sandbox"
  title="Bio-Dynamics: Microbiome Sandbox"
  description="Hover strains and products in the live lab to see impact preview, or browse the catalog TypeScript files on GitHub."
  demoUrl="https://playground.omid.dev/labs/microbiome-sandbox/?preset=candida&region=vaginal"
  demoLabel="Open live lab"
  sourceLabel="View source on GitHub"
>}}

## Data catalogs, not hard-coded panels

Almost every control maps to a typed catalog under `src/data/`:

| Catalog | File | Scale |
| --- | --- | --- |
| Body regions | `regions.ts` | 7 regions with baselines, triggers, inoculations |
| Stressors | `stressors.ts` | 82 triggers with biome deltas and event log strings |
| Strains | `strains.ts` | 20 strains with spawn counts, competition radii, biome effects |
| Prebiotics / postbiotics | `strains.ts`, `postbiotics.ts` | Fiber substrates and SCFA metabolites |
| Products | `products.ts` | 10 supplements and fermented foods |
| Environment | `envVars.ts` | 9 sliders with per-region subsets |

`Dashboard.ts` iterates these catalogs to build buttons. Adding a strain means extending `STRAINS` and `STRAIN_LIST` — not duplicating markup in three places.

Domain reference: [domain/actions-reference.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/domain/actions-reference.md)

## Region gating in one place

The same L. rhamnosus strain behaves differently on ear vs nose because **region config** gates which catalog entries appear:

- Regional triggers and inoculations come from `RegionDef` in `regions.ts`
- Strain panel entries filter by `StrainDef.regions`
- Products multiply dose by `productRegionMultiplier()`
- Environment sliders respect `REGION_ENV_CONTROLS`

The dashboard asks "what is valid here?" from data; `SimEngine` asks "what happens when applied?" from the same IDs.

## Vanilla DOM, callback boundary

The dashboard is plain HTML/CSS — no component framework. `renderDashboardShell()` injects the layout; `Dashboard` binds listeners and pushes DOM updates each frame from `SimEngine` state.

`App.ts` implements `DashboardCallbacks`:

```typescript
onApplyStrain: (id) => engine.applyStrain(id),
onTrigger: (id) => engine.applyStressor(id),
onInoculate: (id) => engine.applyInoculation(id),
// ...
```

That boundary kept the UI refactorable while the simulation grew. UI architecture: [architecture/ui-dashboard.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/architecture/ui-dashboard.md)

## Action impact preview

The impact panel (`actionImpact.ts`) answers a question educators kept asking: *"What will this button do before I press it?"*

Hover or focus a catalog item and the panel shows:

- **Adds** — spawn counts and microbe types
- **Deltas** — integrity, inflammation, pH, biofilm, and other meters with direction hints
- **Efficacy** — region multiplier as a percentage
- **Why** — plain-language causal text (antibiotic spectra, acidification, competition radius)
- **Article link** — when a strain has `articleKey` / `articleClaim` tied to omid.dev health posts

Preview logic reuses the same `BiomeEffect` merge helpers as the engine, so the panel and simulation stay aligned.

## Conditional UI without template spaghetti

Several dashboard regions appear only when relevant:

- Prebiotic substrate stats on the **lifecycle** preset
- Tryptophan support meter on **gut** tissue
- Advanced mode pH reference bands (with cited disclaimer)
- Day-meal controls for gut and oral regions

Preset and region IDs drive visibility — not one-off `if` blocks scattered through templates.

## Keeping catalog IDs honest

`actionIds.test.ts` syncs stressor and inoculation IDs across `stressors.ts`, `regions.ts`, and test fixtures. When you add a trigger in data, the test nags you if the engine or region config misses it.

That matters at 82 stressors. Without it, a button would render but no-op silently.

## Extending the lab

Adding a new region or action is documented step-by-step: [development/extending.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/development/extending.md)

The pattern is always: **catalog entry → engine handler → dashboard iteration → optional impact builder → golden test checkpoint if behavior is critical**.
