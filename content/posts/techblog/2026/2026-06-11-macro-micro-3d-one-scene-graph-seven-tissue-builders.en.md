---
title: "Macro/Micro 3D: One Scene Graph, Seven Tissue Builders"
date: 2026-06-11T10:00:00+03:30
description: "How Bio-Dynamics uses Three.js to fly from a rotatable body map into region-specific tissue cross-sections with instanced microbes and simulation-linked visual effects."
layout: single
author_profile: true
url: 2026/06/11/macro-micro-3d-one-scene-graph-seven-tissue-builders/
shortlink: https://g.omid.dev/IyBb76G
x_link: https://x.com/OmidFarhangEn/status/2066273837151584741
mastodon_link: https://mastodon.social/@omidfarhang/116750602215635340
bluesky_link: https://bsky.app/profile/omid.dev/post/3mobqqkeihs22
linkedin_link: https://www.linkedin.com/posts/omidfarhang_macromicro-3d-one-scene-graph-seven-tissue-share-7472037215007690752-2grq/
tags:
  - TypeScript
  - Frontend
  - Open Source
categories:
  - TechBlog
---
Most microbiome diagrams are flat. Bio-Dynamics tries the opposite: a single Three.js scene that starts as a rotatable body map, then animates into a tissue cross-section when you pick a region — with microbe meshes, SCFA particles, and fog density tied to live simulation state.

This post covers the visualization layer. Companion source and the full architecture write-up are in the repository.

{{< companion
  repo="omidfarhang/example-projects"
  sourceRoot="labs"
  path="microbiome-sandbox"
  title="Bio-Dynamics: Microbiome Sandbox"
  description="Open the live lab, zoom into gut or nasal tissue, then inspect the Three.js scene code on GitHub."
  demoUrl="https://playground.omid.dev/labs/microbiome-sandbox/?preset=lifecycle&region=gut"
  demoLabel="Open live lab"
  sourceLabel="View source on GitHub"
>}}

## One scene, two modes

`SceneManager` owns a single WebGL scene with two interaction modes:

| Mode | What you see | Interaction |
| --- | --- | --- |
| **Macro** | Low-poly `BodyMesh` with per-region hotspot spheres | Click a hotspot → fly into micro view |
| **Micro** | `TissueLayer`: epithelium cross-section + instanced microbes | OrbitControls; Esc returns to body |

`CameraRig` handles the transition — `flyToMicro(geometry)` eases the camera toward tissue-specific focal points; `flyToMacro()` reverses it. OrbitControls stay enabled in both modes so desktop and touch users can inspect geometry.

Visualization spec: [architecture/visualization.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/architecture/visualization.md)

## Body map without a medical mesh pipeline

`BodyMesh.ts` builds a ~8-head clinical hologram from primitives — not a rigged anatomical asset. That keeps the bundle small and the art direction consistent: edge outlines, slow auto-rotation in macro mode, and raycasted hotspots positioned from region config in `regions.ts`.

Hotspot hover scales markers and projects 2D screen positions back to the HTML dashboard for overlay labels. The 3D view and DOM sidebar stay in sync without a UI framework.

## Seven tissue builders, one interface

Each body region has its own epithelium builder under `src/scene/epithelium/tissue/`:

- ear, nose, scalp, skin, oral, gut, vaginal

They share `shared.ts` utilities and `lumenBounds.ts` for chamber sizing, but geometry differs: nasal scrolls, gut villi, vaginal pH bands, oral saliva film, and so on. `tissueModels.ts` maps `RegionId` → builder function so `TissueLayer` does not switch on strings everywhere.

Region anatomy and baselines: [domain/regions.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/domain/regions.md)

## Instanced microbes, not 400 draw calls

`MicrobeMeshes.ts` uses `THREE.InstancedMesh` keyed by microbe type. Each simulation tick, node positions and vitality update instance matrices. Shape language matches the dashboard legend — rods, cocci, yeast blobs, allergen specks — so the 3D view reinforces what the stats panel counts.

Vitality drives opacity and scale. Pruned nodes (vitality ≤ 0.05) drop out of the instance buffer.

## Visual effects wired to simulation output

`TissueLayer` bridges `SimEngine` snapshots into rendering:

- **Epithelium glow** — integrity and postbiotic level tint the tissue overlay
- **`ScfaParticleField`** — instanced teal lumen particles when `postbioticLevel ≥ 0.1`; count scales with SCFA output
- **`ImmuneHaze`** — inflammation-linked haze density
- **`EffectBurst`** — ring pulses on inoculation and trigger events
- **Scene fog** — `FogExp2` density rises with inflammation

The gut lifecycle preset is the clearest demo: apply prebiotics, watch substrate particles convert, see SCFA particles and epithelial glow rise together.

## Touch and performance defaults

- Pixel ratio capped at 2
- sRGB output color space
- `touchGestureHints.ts` shows a dismissible card on coarse-pointer devices (one-finger orbit, pinch zoom, two-finger pan)
- Simulation substeps capped at 4 per frame so rendering stays smooth on mid-range laptops

## Why vanilla Three.js

Bio-Dynamics has no React, no R3F, no scene graph framework. The lab is a Vite + TypeScript app where `App.ts` orchestrates engine, dashboard, and scene in one frame loop. That kept the educational bundle dependency-light — `three` is the only runtime npm dependency.

System overview: [architecture/system-overview.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/architecture/system-overview.md)

## Read next in this series

- [Designing a deterministic microbiome simulation](/2026/06/10/deterministic-microbiome-simulation-without-overclaiming-science/)
- [Catalog-driven dashboard: strains, stressors, and action impact](/2026/06/12/catalog-driven-dashboard-strains-stressors-and-action-impact/)
- [i18n, a11y, and shareable lab state in the browser](/2026/06/13/i18n-a11y-and-shareable-lab-state-in-the-browser/)
