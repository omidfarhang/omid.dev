---
title: 'Teaching with Bio-Dynamics: 15-Minute Lab Sessions'
date: 2026-06-14T10:00:00+03:30
description: 'Step-by-step classroom paths for the Bio-Dynamics microbiome sandbox — allergy barrier defense, Candida pH balance, and the pre/pro/postbiotic lifecycle.'
layout: single
author_profile: true
url: 2026/06/14/teaching-with-bio-dynamics-15-minute-lab-sessions/
shortlink: https://g.omid.dev/W1MKU4S
tags:
  - Probiotics
  - Prebiotics
  - Postbiotics
  - Allergies
  - Health Education

categories:
  - Health
seeAlso:
  - /2026/06/09/building-bio-dynamics-educational-3d-microbiome-lab-in-the-browser/
---
Use this guide when you want to **run a short session** with [Bio-Dynamics](https://playground.omid.dev/labs/microbiome-sandbox/) — a browser-only 3D lab linked from the probiotic articles on omid.dev. Each path below takes about **5 minutes**; all three presets together fill a **15-minute** workshop.

> **Educational model — not medical advice.** Population counts, strain effects, and biome shifts are illustrative. Do not use this lab for diagnosis or treatment decisions.

{{< companion
  title="Bio-Dynamics: Microbiome Sandbox"
  description="Open the live lab before your session. No install required — works in a modern desktop or tablet browser."
  eyebrow="Interactive lab"
  demoUrl="https://playground.omid.dev/labs/microbiome-sandbox/"
  demoLabel="Open interactive lab"
>}}

## Before you start

1. Open the lab on a projector or share your screen.
2. Leave the **macro view** (rotatable body) visible at first.
3. Point out the **dashboard** on the right: integrity and inflammation meters, event log, stressor buttons, and catalog tabs (Strains, Prebiotics, and so on).
4. Click a **tissue hotspot** on the body (or pick a region in the sidebar) to enter the **micro view** — zoomed tissue with moving microbes.
5. Press **Esc** to return to the full body map.

**Tip:** Hover catalog items before clicking — the **action impact** panel previews what will change.

Full UI reference: [user guide on GitHub](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/user-guide.md)

---

## Session 1 — Allergy & barrier defense (~5 min) {#allergy}

**Tied to:** [How Probiotics Help with Allergies](/2024/09/10/how-probiotics-help-with-allergies/)

**Open:** [playground.omid.dev/…/?preset=allergy&region=nose](https://playground.omid.dev/labs/microbiome-sandbox/?preset=allergy&region=nose)

| Step | What to do | What to point out |
| --- | --- | --- |
| 1 | Select **Nose / Sinus** (if not already active) | Baseline integrity and low inflammation |
| 2 | Click **TRIGGER ALLERGEN SPIKE** | Allergen count rises; integrity drops; event log narrates epithelial stress |
| 3 | Click **HISTAMINE SURGE** | Immune activity rises; inflammation follows over a few seconds (not instant) |
| 4 | Open **Strains** → apply **L. rhamnosus** | Probiotics spawn; pathogen pressure eases; inflammation drifts down as pressure falls |
| 5 | Click **SALINE MIST** (regional care) | Moisture restored; allergen adhesion reduced |
| 6 *(optional)* | Lower the **moisture** slider, then **DRY AIR EXPOSURE** | Mucus-layer thinning — secondary exploration |

**Ask students:** What recovered first — integrity, inflammation, or allergen count? Why might inflammation lag behind immune signaling?

**Expected takeaway:** Barrier stress and immune signaling build pressure; probiotics and moisture support competition and recovery.

---

## Life-stage variant (~5 min) {#lifestage}

**Tied to:** [Probiotics Through the Ages](/2024/09/10/probiotics-through-the-ages/)

**Open:** [playground.omid.dev/…/?preset=allergy&context=lifestage&region=nose](https://playground.omid.dev/labs/microbiome-sandbox/?preset=allergy&context=lifestage&region=nose)

Follow the same nose sequence as Session 1. The scenario text switches to **early-life microbiome training** framing. Highlight **B. infantis** and other life-stage strains in the catalog when discussing infant vs adult barriers.

---

## Session 2 — Candida & pH balance (~5 min) {#candida}

**Tied to:** [How Probiotics Help with Candidiasis](/2024/09/10/how-probiotics-help-with-candidiasis/)

### Vaginal path (default)

**Open:** [playground.omid.dev/…/?preset=candida&region=vaginal](https://playground.omid.dev/labs/microbiome-sandbox/?preset=candida&region=vaginal)

| Step | What to do | What to point out |
| --- | --- | --- |
| 1 | Select **Vaginal** | Baseline pH ~4.2 (acidic, healthy) |
| 2 | Click **ALKALINE FLUSH (pH DISRUPTION)** | pH rises; yeast and Gardnerella spawn; integrity drops |
| 3 | Watch **biofilm** and pathogen meters | Correlated rise with alkaline shift |
| 4 | **Strains** → apply **L. acidophilus** | pH drops; biofilm eases; acidifying lactobacilli appear |
| 5 | Click **pH RESTORING SERUM** | Further acidity restoration |

### Oral path (alternate)

**Open:** [playground.omid.dev/…/?preset=candida&region=oral](https://playground.omid.dev/labs/microbiome-sandbox/?preset=candida&region=oral)

1. **ORAL THRUSH BLOOM** — Candida patches; biofilm rises  
2. **Strains** → **S. boulardii** — yeast competitor; inflammation eases as yeast load falls  
3. **DRY MOUTH (XEROSTOMIA)** then **Strains** → **L. salivarius** — saliva niche restoration  

**Ask students:** Why does alkaline pH favor yeast? What does acidification change in the dashboard?

**Expected takeaway:** pH and moisture shape who thrives; acidifying probiotics counter Candida-favoring conditions.

---

## Session 3 — Biotic lifecycle (~5 min) {#lifecycle}

**Tied to:** [Unlocking Prebiotics, Probiotics, and Postbiotics](/2024/09/10/prebiotics-probiotics-postbiotics/)

**Open:** [playground.omid.dev/…/?preset=lifecycle&region=gut](https://playground.omid.dev/labs/microbiome-sandbox/?preset=lifecycle&region=gut)

| Step | What to do | What to point out |
| --- | --- | --- |
| 1 | Select **Gut** | Baseline prebiotic particles and L. plantarum already seeded |
| 2 | Watch **SCFA / Postbiotic** and **Prebiotic substrate** stats | Conversion loop — fiber particles drop as SCFA rises |
| 3 | Click **PSYCHOSOCIAL STRESS (CORTISOL)** or **SLEEP DEPRIVATION** | Inflammation and immune signal rise; **tryptophan support** falls on gut |
| 4 | Click **ANTIBIOTIC DISRUPTION** | Commensals depleted; postbiotic level drops |
| 5 | **Prebiotics** tab → add **inulin** | More substrate particles in the lumen |
| 6 | **Strains** → **L. plantarum** or **B. lactis** | Additional fermenters seed the gut |
| 7 | Wait ~10–20 sim seconds | postbioticLevel climbs; integrity and tryptophan support recover when inflammation stays low |
| 8 *(optional)* | Click **RELEASE SCFA BOOST** (regional care) | Immediate postbiotic surge — barrier recovery |

**Ask students:** What is the order of the chain — prebiotic, probiotic, postbiotic? How does the event log describe conversion?

**Expected takeaway:** Fiber feeds fermenters; SCFA output supports barrier recovery — an educational proxy for the pre → pro → postbiotic story.

---

## Share a mid-session snapshot

After step 4 in any session, click **Copy lab link** in the dashboard. Send the URL so students open the **same tick, region, and biome state** on their devices.

---

## Related reading

| Article | Lab preset |
| --- | --- |
| [How Probiotics Help with Allergies](/2024/09/10/how-probiotics-help-with-allergies/) | `?preset=allergy&region=nose` |
| [Probiotics Through the Ages](/2024/09/10/probiotics-through-the-ages/) | `?preset=allergy&context=lifestage&region=nose` |
| [How Probiotics Help with Candidiasis](/2024/09/10/how-probiotics-help-with-candidiasis/) | `?preset=candida&region=vaginal` |
| [Prebiotics, Probiotics, and Postbiotics](/2024/09/10/prebiotics-probiotics-postbiotics/) | `?preset=lifecycle&region=gut` |

Developer documentation: [docs/README.md](https://github.com/omidfarhang/example-projects/blob/master/labs/microbiome-sandbox/docs/README.md) · Technical series starts with [Building Bio-Dynamics](/2026/06/09/building-bio-dynamics-educational-3d-microbiome-lab-in-the-browser/)
