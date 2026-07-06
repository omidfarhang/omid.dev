# Tag strategy

Controlled vocabulary for all posts. **Tags must come from the lists below** — not from whatever happens to exist in the repo today. Historical posts will be migrated to match; do not preserve legacy spellings or noise tags because they are already in use.

**Tools:** `docs/tag-strategy.md` (this file) · `hugo.yaml` (`params.homeTechTags*`) · `scripts/tag-fixes.yaml` · `python3 scripts/fix-post-tags.py`

## Principles

1. **Controlled vocabulary** — pick tags from the lists in this document. Do not invent labels outside them unless you extend the vocabulary here first.
2. **Title Case** — `Angular`, `Web Development`, `Women's Health` (not `angular`, `medical`, `how to`).
3. **English everywhere** — same tag strings in `.en.md`, `.fa.md`, and `.de.md`. Non-English tag literals → map via `scripts/tag-fixes.yaml` `replacements`.
4. **3–6 tags per post** — enough for discovery, never a keyword dump. Omit tags that repeat the title, category, or series name.
5. **One tag per concept** — no near-duplicates on the same post (`Career` + `Career Development`, `Software Engineering` + `Software Development`).
6. **Topic tags, not sentences** — `State Management` yes; `How I Fixed Flaky Tests` no.
7. **Hugo slug uniqueness** — `Web Development` and `web-development` are the same tag; use the canonical spelling from this doc.

## How to tag a post

```
1. Set category: TechBlog | Health | Electronics | Cozy Corner
2. Pick tags only from that section's vocabulary below
3. TechBlog evergreen: 1–2 Primary tags + 1–4 Secondary tags
4. TechBlog archive (historical news): News + 0–2 subject tags from Primary/Secondary
5. Non-TechBlog: 2–5 tags from the section vocabulary
6. Run python3 scripts/fix-post-tags.py scan after bulk edits
```

---

## TechBlog vocabulary

### Primary tags

Homepage curated tags in `hugo.yaml` — **exact spelling required**. Use 1–2 per evergreen post when they fit.

**Professional**

| Tag | Use when |
|-----|----------|
| Engineering Leadership | Teams, process, culture, mentorship, decision-making |
| Software Architecture | System design, patterns, trade-offs, platform structure |
| Career | Growth, job satisfaction, career moves, professional development |
| Case Study | Field reports, migration write-ups, real-project narratives |

**Technical**

| Tag | Use when |
|-----|----------|
| Angular | Angular framework, platform, tooling |
| Frontend | General frontend craft not specific to one framework |
| TypeScript | TS language, types, tooling |
| React | React ecosystem |
| Signals | Signal-based reactivity (Angular or general) |
| Design Systems | Tokens, components, consistency at scale |
| Web Components | Custom elements, shadow DOM, interop |
| CSS | Styling, layout, responsive design |
| Web Performance | Loading, rendering, bundle size, Core Web Vitals |
| API Design | REST/GraphQL API shape, contracts, versioning |
| Event-Driven Architecture | Events, messaging, async boundaries |
| Web Workers | Background threads, off-main-thread work |
| WebRTC | Real-time peer media/data |
| DevOps | CI/CD, pipelines, infra workflow |
| Security | AppSec, vulnerabilities, hardening (evergreen or archive) |
| Docker | Containers, images, compose |
| Kubernetes | K8s orchestration, clusters |
| Cloud Computing | Cloud platforms and services |
| OpenTelemetry | Tracing, metrics, observability tooling |
| Database | SQL/NoSQL, schema, queries |
| Data & AI | ML, LLMs, data pipelines, notebooks (broad) |
| Linux | Linux desktop, shell, distros, kernel topics |
| Python | Python language and ecosystem |
| Rust | Rust language and ecosystem |
| gRPC | gRPC services and protobuf |
| GraphQL | GraphQL APIs and clients |
| Micro Frontends | MFE architecture and integration |
| WebAssembly | WASM modules and performance |
| Jupyter | Notebooks, interactive data workflows |
| AutoIt | AutoIt scripting (legacy niche content) |
| Web3 | Blockchain, decentralized web (when genuinely on-topic) |

### Secondary tags

Add 1–4 for specificity. **Do not use if a Primary tag already covers it.**

| Cluster | Tags |
|---------|------|
| **Testing & quality** | Testing, Component Testing, E2E Testing, Test Automation, Chaos Engineering, Debugging |
| **Frontend craft** | State Management, Design Patterns, Maintainability, Code Quality, Refactoring, UI/UX, Responsive Design, JavaScript, ViewChild, Sample Code |
| **Architecture & migration** | Microservices, Migration, Legacy Systems, Technical Debt, Scalability, Performance, API Migration, System Design |
| **Linux & desktop** | Manjaro, Ubuntu, Arch Linux, Desktop Linux, Cursor IDE, VS Code, Open Source |
| **AI workflow** | AI Tools, Ollama, ChatGPT, Copilot |
| **Leadership & teams** | Mentorship, Team Collaboration, Soft Skills, Startup, Work-Life Balance, Engineering Culture |
| **Data** | Data Science, Data Analysis |
| **Archive subjects** | Phishing, Malware, Vulnerability |

`Migration` covers framework/stack moves (`React to Angular`, `REST to GraphQL`). Prefer it over one-off tags like `System Migration` or `API Migration`.

### Archive posts (historical news commentary)

Pre-2024 security/tech news roundups and similar time-sensitive posts:

- **Required:** `News`
- **Optional:** up to 2 Primary or Archive-subject tags (`Security`, `Phishing`, `Malware`, `Vulnerability`, …)
- **Remove** noise tags during migration: `report`, `review`, `alert`, `advice`, `scam`, `interesting`, `link`, `announcement`, `hack`, `spam`, vendor names used alone, etc.

Target **2–4 tags total** for archive posts after cleanup.

### TechBlog examples

```yaml
# Evergreen Angular post
tags:
  - Angular
  - Signals
  - Frontend
  - State Management
  - Maintainability

# Leadership essay
tags:
  - Engineering Leadership
  - Career
  - Team Collaboration

# 2010 security news roundup
tags:
  - News
  - Security
  - Phishing
```

---

## Health vocabulary

Use 2–5 tags. First tag should be `Health` unless the post is clearly `Good Reads` only.

| Tag | Use when |
|-----|----------|
| Health | General health topics (default) |
| Good Reads | Summaries, links, lighter reading |
| Prebiotics | Prebiotic nutrition |
| Probiotics | Probiotic nutrition |
| Postbiotics | Postbiotic nutrition |
| Nutrition | Diet, appetite, food behavior |
| Allergies | Allergies and intolerances |
| Medical | Clinical or medical topics |
| Biology | Biological mechanisms |
| Supplements | Vitamins, minerals, supplementation |
| Nutrient Depletion | Medication-induced depletion |
| Developer Wellness | Health topics aimed at developers |
| Productivity | Productivity tied to health/wellness |
| Personal Story | First-person health narrative |
| Women's Health | Women's-specific health |
| Diabetes | Diabetes-related |
| Hypertension | Blood pressure topics |
| Mental Health | Psychological wellbeing |
| Sleep | Sleep hygiene and disorders |
| Iran | Iran-specific health context (when relevant) |

---

## Electronics vocabulary

Use 2–5 tags. Default first tag: `Electronics` or `Troubleshooting`.

| Tag | Use when |
|-----|----------|
| Electronics | General electronics |
| Troubleshooting | Debugging, fault-finding |
| Vintage Electronics | Restoring classic devices |
| Electronics Restoration | Repair and rebuild projects |
| DIY Tech | Hands-on maker projects |
| Retro Gadgets | Vintage consumer devices |
| IoT Integration | Modern connectivity added to vintage gear |
| Circuit Debugging | Board-level diagnosis |
| Component Testing | Testing individual parts |
| PCB Repair | Trace and pad repair |
| Power Supply | PSU faults and repair |
| Engineering Mindset | Approach and methodology posts |

---

## Cozy Corner vocabulary

Use 2–4 tags. Personal, music, and life content — keep tags broad.

| Tag | Use when |
|-----|----------|
| My Life | Personal reflections |
| Music | Artists, albums, concerts |
| Video | Music videos, visual media |
| Good Reads | Recommendations, links |
| Events | Concerts, gatherings, milestones |
| History | Historical context |
| Food | Food and dining |
| Quote | Quotations and excerpts |

---

## Canonical forms (merge rules)

When migrating or tagging, **replace the left column with the right**:

| Do not use | Use instead |
|------------|-------------|
| `Career Development`, `Professional Growth`, `Tech Industry` | `Career` |
| `Software Development`, `development`, `Development` | `Software Engineering` or `Web Development` (by context) |
| `Software Engineering` + `Software Architecture` on same post | pick the one that fits better |
| `Microservices Architecture` | `Microservices` |
| `Cursor` | `Cursor IDE` |
| `Chaos Testing` | `Chaos Engineering` |
| `UI/UX Design` | `UI/UX` |
| `medical` | `Medical` |
| `Womens health` | `Women's Health` |
| `Troubleshooting Electronics` | `Troubleshooting` |
| `Engineering Mentality` | `Engineering Mindset` |
| `System Migration`, `Refactoring Code`, `Code Archaeology`, `Software Modernization` | `Migration` or `Legacy Systems` (by context) |
| `Mentoring In Tech`, `Tech Mentorship`, `Mentee Tips`, `Mentor Guidelines` | `Mentorship` |
| `Ecosystem Blind Spot` | `Career` or `Engineering Leadership` (by context) |
| Bare vendor names (`Google`, `Microsoft`, `Apple`, …) | remove unless the post is a Case Study about that vendor |
| Lowercase or sentence tags (`how to`, `business`, `interesting`) | remove or map to nearest controlled tag |

Automated mappings live in `scripts/tag-fixes.yaml` (`replacements`, `canonical_groups`, `remove`).

---

## Adding a new tag

Rare. Only when several future posts need the same concept and nothing in the vocabulary fits:

1. Add the tag to the appropriate table in this document with a "use when" note.
2. If homepage-worthy, add to `hugo.yaml` `homeTechTagsProfessional` or `homeTechTagsTechnical`.
3. If it replaces messy variants, add `canonical_groups` in `tag-fixes.yaml` — do not create parallel spellings.
4. Run `python3 scripts/fix-post-tags.py scan`.

---

## Migrating existing posts

Old posts are **not** the source of truth. When retagging:

1. Read the post; ignore its current tags.
2. Apply the [How to tag a post](#how-to-tag-a-post) workflow for its category and era (evergreen vs archive).
3. Run `python3 scripts/fix-post-tags.py apply --dry-run` to preview automated merges/removals.
4. Run `python3 scripts/fix-post-tags.py apply` for bulk canonicalization.
5. Manually fix posts that need judgment (archive vs evergreen, vendor-heavy news posts).
6. Re-run `scan` until curated spellings match and suggestions are minimal.

**Evergreen posts (2024+ TechBlog, series posts, reading-path posts):** full Primary + Secondary vocabulary; no `News` tag.

**Archive posts (historical news roundups):** `News` + minimal subjects; strip noise.

**Translations:** after retagging `.en.md`, copy the same tag list to `.fa.md` / `.de.md`.

---

## Multilingual posts

- Identical English tags across all language variants of the same post.
- Persian/German literals in front matter → add to `replacements` in `tag-fixes.yaml`, then apply.

---

## Maintenance

```bash
python3 scripts/fix-post-tags.py scan          # audit vocabulary drift
python3 scripts/fix-post-tags.py apply --dry-run
python3 scripts/fix-post-tags.py apply         # apply tag-fixes.yaml
```

Curated homepage tags in `hugo.yaml` are protected — `apply` refuses configs that would rename them.
