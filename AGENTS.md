# AGENTS.md

Instructions for AI coding agents working on [omid.dev](https://omid.dev/) — a multilingual Hugo static site with a custom theme.

## Project overview

- **Stack:** [Hugo](https://gohugo.io/) (extended, v0.163+), custom theme `themes/omid-dev`, Python 3 maintenance scripts, [Pagefind](https://pagefind.app/) for site search (post-build via `npx`)
- **Languages:** English (`en`, default), Persian (`fa`, RTL), German (`de`)
- **Content:** Long-form posts, short notes, Tools catalog (installable scripts), static pages (about, resume, contact, etc.), Playground catalog
- **Config:** `hugo.yaml`

Hugo is the primary build tool. Pagefind runs after Hugo to generate the search index (`public/pagefind/`).

## Repository layout

| Path | Purpose |
|------|---------|
| `content/` | Markdown content (posts, notes, pages) |
| `content/posts/{section}/{year}/` | Blog posts by section (`techblog`, `health`, `electronics`, `cozy-corner`) |
| `content/notes/` | Short-form notes (separate RSS; Pagefind `scope:notes`) |
| `content/tools/` | Installable-script docs (catalog + README pages); see [Tools](#tools-installable-scripts) |
| `themes/omid-dev/` | Custom Hugo theme (layouts, assets, i18n) |
| `layouts/` | Root-level layout overrides (if any) |
| `static/` | Static assets copied as-is (`static/pagefind/` is generated — do not commit) |
| `static/scripts/` | Published curl-install scripts → stable URLs `/scripts/*.sh` |
| `assets/` | Hugo Pipes assets (processed at build) |
| `data/` | Hugo data files (`playground.yaml` mirrors example-projects `manifest.json`; `tools.yaml` is an optional thin mirror of tool front matter) |
| `scripts/` | Python/shell maintenance scripts |
| `docs/` | Editorial reference (curated content inventory, tag strategy) |
| `archetypes/` | Hugo content templates |
| `public/`, `resources/` | Build output — **do not commit** |

## Build and dev commands

The site owner runs a personal live server via `./scripts/hugo-server-dev.sh` (writes to `.tmp/hugo-server`, listens on **:1314**). Agents must **not** use that script. When building or serving to verify work, use the defaults below (`public/`, **:1313**) so you do not collide with the owner's session.

```bash
# Agent / default local server
hugo server
hugo server -D

# Owner-only: parallel serve that leaves public/ and :1313 alone — do not use in agent workflows
# ./scripts/hugo-server-dev.sh
# ./scripts/hugo-server-dev.sh -D

# Production build (Hugo + Pagefind search index)
hugo --minify
./scripts/pagefind-index.sh

# Index only (after an existing public/ build); also mirrors to static/pagefind for hugo server
./scripts/pagefind-index.sh

# Clean build artifacts (do not remove .tmp/ — that is the owner's serve output)
rm -rf public resources static/pagefind
```

VS Code tasks in `.vscode/tasks.json` mirror these commands.

After theme or layout changes, run `hugo --minify` and fix any template errors before finishing. For search to work locally, run `./scripts/pagefind-index.sh` after the Hugo build (or use the “hugo build + pagefind” task).

## Content conventions

### File naming

Posts live under `content/posts/{section}/{year}/` with dated slugs:

```
YYYY-MM-DD-slug.en.md
YYYY-MM-DD-slug.fa.md
YYYY-MM-DD-slug.de.md
```

Language is encoded in the filename suffix (`.en.md`, `.fa.md`, `.de.md`), not a front-matter field.

### Post front matter

Typical fields for blog posts:

```yaml
---
title: "Post Title"
date: 2026-06-09T01:50:00+03:30
description: "Optional SEO summary"
layout: single
author_profile: true
url: 2026/06/09/post-slug/
tags:
  - Angular
  - Frontend
categories:
  - TechBlog
---
```

- **`url`:** Permalink path relative to site root (matches `permalinks.posts` in `hugo.yaml`)
- **`categories`:** One of `TechBlog`, `Health`, `Electronics`, `Cozy Corner`
- **`tags`:** Topic labels for discovery; match spelling of curated homepage tags in `hugo.yaml` when you use them
- **`series`:** Optional ordered series metadata — see [Series](#series-machine-readable)
- **`seeAlso`:** Optional related-post links — see [seeAlso](#seealso-cross-links)
- **`shortlink`:** Existing short links — do not change unless asked

Notes use the `notes` section and a minimal archetype in `archetypes/notes.md`.

### Tags

Full rules: [`docs/tag-strategy.md`](./docs/tag-strategy.md). Do not hard-code tag names to keep or drop; resolve from live lists and tests.

- Tags are **subject facets** (“what kind of post is this?”), not an index of nouns mentioned in the body.
- Every tag must pass the gate in that doc (subject + browse + reuse first + introduction bar + budget of 2–4, max 5).
- Prefer curated homepage tags from `hugo.yaml` (`homeTechTags*`) — **exact spelling required** when a post should appear under those topics. Read the config; do not copy the list elsewhere.
- **Curated tags** may also be applied when the post has **substantial dedicated treatment** of that topic (keeps homepage indexes useful).
- **Named entities** (well-known tools, apps, libraries, IDEs, OSes) may be kept when the post gives them dedicated treatment **and** the archive already has roughly ≥ 3 unique posts with that tag. Fold near-duplicates; distinct clustered products may both stay inside the budget.
- **Platform-shaped** how-tos also keep the matching curated parent when one exists (`homeTechTags*`).
- Do not introduce format/genre labels or one-off product nouns that fail the cluster / introduction bar.
- Use the same English tag strings across `.en`, `.fa`, and `.de` variants of a post.
- Keep existing tags on legacy posts unless you are deliberately retagging.

## Reading paths and series

Evergreen TechBlog posts are organized two ways:

| Mechanism | How it works | Where to edit |
|-----------|--------------|---------------|
| **Series** | Front matter groups posts; Hugo renders in-post prev/next nav and the `/series/` index | Post front matter |
| **Reading paths** | Manually curated ordered lists for a role/audience | `content/posts/techblog/paths/*.en.md` |

Consult `docs/curated-content-inventory.md` for the editorial map (which posts belong where). Update it when adding a new series or placing a post on a path.

A post can be in a **series** and also listed on one or more **reading paths**. Series handle in-post navigation; reading paths provide the higher-level journey.

### Series (machine-readable)

Add a `series` block to post front matter. Posts with the same `series.id` and language are grouped and sorted by `series.order`.

```yaml
series:
  id: modern-angular          # stable slug — reuse across all parts
  title: "Modern Angular"     # display name on /series/ and nav
  order: 4                    # 0-based position in the series
  label: "Short nav label"    # shown in prev/next links (defaults to title)
  role: part                  # anchor | part (default: part)
```

**Roles:**

- **`anchor`** — overview / entry post. Exactly one per series per language. Usually `order: 0`.
- **`part`** — deep-dive follow-up. Listed under the anchor in series nav.

**Existing series IDs** (see inventory for full post lists):

| ID | Reading path(s) |
|----|-----------------|
| `modern-angular` | Angular Platform |
| `frontend-testing` | Frontend Quality |
| `chaos-engineering` | Frontend Quality (related: Systems & Linux) |
| `bio-dynamics-lab` | AI & Data Tools |
| `jupyter-copilot` | AI & Data Tools |
| `split-ai-workflow` | AI & Data Tools, Systems & Linux |
| `micro-frontends` | Frontend Architecture (related: Angular Platform) |
| `legacy-and-modernization` | Engineering Leadership, Frontend Architecture |
| `essential-skills` | Engineering Leadership |
| `team-communication` | Engineering Leadership |
| `observability` | Systems & Linux |
| `linux-networking` | Systems & Linux |
| `ecosystem-blind-spot` | Engineering Leadership (Zoom-Out cluster) |

Series are **per language** — German `jupyter-copilot` posts group separately from English ones. When translating a series post, copy the `series` block and adjust `label`/`title` for that language.

**Adding a post to an existing series:**

1. Pick the next `order` value (check sibling posts with the same `series.id`).
2. Set `role: part` unless this is a new overview post (`role: anchor`, `order: 0`).
3. Reuse the same `id` and `title` as sibling posts.
4. Add `seeAlso` links to the anchor and adjacent parts.
5. If the post belongs on a reading path, add it to the path file (below).
6. Update `docs/curated-content-inventory.md` if the editorial map changes.

**Starting a new series:**

1. Choose a new kebab-case `id`.
2. Publish the anchor post first (`role: anchor`, `order: 0`).
3. Add follow-ups with incrementing `order`.
4. Register the series in `docs/curated-content-inventory.md`.
5. Add the series to the relevant reading path file(s).

### Reading paths (manual curation)

Six curated paths live in `content/posts/techblog/paths/`:

| File | URL slug | Audience |
|------|----------|----------|
| `angular-platform.en.md` | `/posts/techblog/paths/angular-platform/` | Senior Angular / platform leads |
| `engineering-leadership.en.md` | `/posts/techblog/paths/engineering-leadership/` | Tech leads, architects |
| `systems-and-linux.en.md` | `/posts/techblog/paths/systems-and-linux/` | Infra-curious frontend leads |
| `frontend-quality.en.md` | `/posts/techblog/paths/frontend-quality/` | QA-minded seniors |
| `ai-data-tools.en.md` | `/posts/techblog/paths/ai-data-tools/` | Notebooks, LLMs, interactive data |
| `frontend-architecture.en.md` | `/posts/techblog/paths/frontend-architecture/` | Architects at scale |

Path pages use `layout: reading-path` and list posts as numbered markdown links:

```markdown
1. **[Post Title](/2026/06/09/post-slug/)** — One-line reason to read it.
```

Link targets use the post's `url` front matter (e.g. `/2026/06/09/post-slug/`), not the file path.

**Adding a post to a reading path:**

1. Decide which path(s) fit (check `docs/curated-content-inventory.md`).
2. Edit the path `.en.md` file — add a numbered entry in the right section.
3. For series posts, reference the anchor and note "follow in-post series navigation".
4. Add a "Related paths" cross-link at the bottom if useful.
5. Standalone posts (no `series` block) go on paths as individual entries only.

Path index: `content/posts/techblog/paths/_index.en.md`. Path cards on the TechBlog hub are wired in `layouts/partials/reading_path_cards.html`.

### seeAlso cross-links

Optional front-matter list of related posts, rendered as a "See also" block:

```yaml
seeAlso:
  - /2025/12/24/angular-signals-control-theory/
  - /2026/05/25/signal-forms-model-ui-state/
```

Paths must match a post's `url` value (site-relative, no language prefix). Hugo warns at build time if a path cannot be resolved — fix broken `seeAlso` entries before finishing.

### Curation checklist

When publishing or updating an evergreen TechBlog post:

- [ ] `series` front matter added if part of a multi-part cluster
- [ ] `order` and `role` correct; only one `anchor` per series per language
- [ ] `seeAlso` links to anchor, siblings, or related standalone posts
- [ ] Post added to relevant reading path file(s) in `content/posts/techblog/paths/`
- [ ] `docs/curated-content-inventory.md` updated for new series or path membership
- [ ] If the post has a playground demo: update example-projects `playground/manifest.json`, then `python3 scripts/sync-playground-data.py` (refreshes `data/playground.yaml`)
- [ ] `hugo --minify` builds without `seeAlso path not found` warnings

### Shortcodes

Theme shortcodes live in `themes/omid-dev/layouts/shortcodes/`. Common ones:

- `{{< youtube ID >}}`
- `{{< companion repo="..." path="..." >}}` — playground companion / lab card in posts
- `{{< tool id="update-nvm" >}}` — installable-tool card (docs + source + raw script); see [Tools](#tools-installable-scripts)
- `{{< alert >}}`, `{{< figure >}}`, `{{< ltr >}}`, `{{< rtl >}}`
- Mermaid diagrams: fenced `mermaid` code blocks (optional `{caption="…"}`) or `{{< mermaid caption="…" >}}`

Use existing shortcodes rather than raw HTML when possible.

## Tools (installable scripts)

Playground-shaped catalog for curl-installable scripts the site publishes. **Not** a third content stream next to Posts/Notes: narrative stays in posts/notes; Tools pages are the canonical README for each script.

| Piece | Location |
|-------|----------|
| Catalog index | `content/tools/_index.{en,fa,de}.md` → `/tools/` (`layout: tools`) |
| Per-script docs | `content/tools/{id}.{en,fa,de}.md` → `/tools/{id}/` (`layout: tool`, `ShowToc: true`) |
| Downloadable scripts | `static/scripts/{id}.sh` → **stable** `https://omid.dev/scripts/{id}.sh` (self-update URLs; do not rename lightly) |
| Optional mirror | `data/tools.yaml` — thin `id` / `version` / `scriptPath` / `docUrl` list; pages are source of truth |
| Nav | `quick_links` in `hugo.yaml` (beside Playground); not main nav |
| Sitemap | Included in **pages** sitemaps (`SitemapPagesLang`): section index + `Section == "tools"` pages — see `themes/omid-dev/layouts/_default/single.sitemappageslang.xml` and `partials/sitemap/lang-pages.html` |

### Tool page front matter

```yaml
---
title: update-nvm
description: "Short summary for cards and SEO"
layout: tool
hidemeta: true
ShowToc: true
url: /tools/update-nvm/
tool:
  id: update-nvm           # stable slug; matches filename and {{< tool id >}}
  version: "1.2.1"         # keep in sync with SCRIPT_VERSION in static/scripts/{id}.sh
  scriptPath: /scripts/update-nvm.sh
  installName: update-nvm  # binary name under ~/.local/bin
  sourceUrl: https://github.com/omidfarhang/omid.dev/blob/master/static/scripts/update-nvm.sh
  platform: Linux
  tags:
    - nvm
    - Node.js
---
```

Docs body should read like a README: Install, Quick start, What it does, Commands/options table, Environment, Self-update, Related. Ship `en` / `fa` / `de` variants (commands stay English).

### Linking from posts and notes

Prefer the companion-style card shortcode over bare markdown links:

```markdown
{{< tool id="update-nvm" >}}
{{< tool id="update-cursor" >}}
```

Resolves the matching page under `content/tools/`, renders docs / source / raw-script actions. Optional overrides: `title`, `description`, `docsLabel`, `sourceLabel`, `sourceUrl`, `icon`.

### Adding a new tool

1. Add `static/scripts/{id}.sh` with `SCRIPT_VERSION` and a self-update URL pointing at `https://omid.dev/scripts/{id}.sh`.
2. Add README pages `content/tools/{id}.{en,fa,de}.md` with `tool` front matter (`version` matches the script).
3. Update `data/tools.yaml` mirror if you keep it in sync.
4. Link from the announcing note/post with `{{< tool id="{id}" >}}`.
5. `hugo --minify` — confirm `/tools/`, `/tools/{id}/`, and that new URLs appear in `/en/sitemap-pages.xml` (and fa/de).

Do **not** break existing `/scripts/*.sh` URLs when editing scripts.

## Theme development

Design system reference: [`DESIGN.md`](./DESIGN.md) (tokens, layers, primitives, do/don’t). CSS remains the source of truth.

- Theme path: `themes/omid-dev/`
- Layouts: `layouts/` (Go templates)
- Styles: `assets/css/` (modular CSS, imported via Hugo Pipes)
- Scripts: `assets/js/`
- i18n strings: `i18n/*.yaml`

Match existing naming and structure. Prefer extending partials over duplicating markup. Keep RTL (`fa`) behavior in mind for layout and CSS changes.

## Maintenance scripts

```bash
# Note URL helper
python3 scripts/note-url.py

# List posts missing shortlink, create via YOURLS, or dump SQL for yourls_url
python3 scripts/shortlink.py                  # list missing
python3 scripts/shortlink.py --apply --missing --limit 20
python3 scripts/shortlink.py --dump           # INSERT missing keywords; UPDATE url if keyword exists

# After a production deploy: notify IndexNow, WebSub, and Ping-o-Matic
python3 scripts/notify-search.py              # dry-run (git diff HEAD~1 + homepages)
python3 scripts/notify-search.py --apply
python3 scripts/notify-search.py --urls https://omid.dev/2026/08/23/hdmi-port-keeping-nvidia-awake/

# Tag manager (unique posts; language variants count as one). Mutations print a plan; --apply writes.
python3 scripts/tag-manager.py                      # tags with ≥ 3 unique posts
python3 scripts/tag-manager.py count --eq 1         # tags with exactly 1 unique post
python3 scripts/tag-manager.py count --eq 2         # tags with exactly 2 unique posts
python3 scripts/tag-manager.py count --curated      # homepage lists from hugo.yaml
python3 scripts/tag-manager.py count 'Exact Tag'    # specific candidates
python3 scripts/tag-manager.py untagged             # posts with no tags
python3 scripts/tag-manager.py dedupe               # duplicate tags within a post
python3 scripts/tag-manager.py remove 'Exact Tag'
python3 scripts/tag-manager.py replace 'Old Tag' 'New Tag'
python3 scripts/tag-manager.py merge 'Tag A' 'Tag B' --into 'Tag C' --apply

# Sync playground catalog data from sibling example-projects manifest
python3 scripts/sync-playground-data.py
# EXAMPLE_PROJECTS_ROOT=/path/to/example-projects python3 scripts/sync-playground-data.py

# Resume PDFs from resume-print layout (headless Chromium → static/resume/)
python3 scripts/resume-pdf.py                       # hugo --minify + all langs
python3 scripts/resume-pdf.py --lang en             # one language
python3 scripts/resume-pdf.py --no-build            # reuse existing public/
python3 scripts/resume-pdf.py --base-url http://127.0.0.1:1313
```

`shortlink.py` auth (env): `YOURLS_SIGNATURE` (preferred; sent as a time-limited `sha256(timestamp + secret)` token), or `YOURLS_USERNAME` + `YOURLS_PASSWORD`. Optional: `YOURLS_API_URL`, `YOURLS_SITE_URL`. `--dump` writes `yourls-restore.sql`: missing keywords are inserted; existing keywords only replace `url` (clicks/timestamp/ip/title stay).

`notify-search.py` reads the public IndexNow key from `params.indexNow.key` in `hugo.yaml` (override with `INDEXNOW_KEY`). The matching key file is `static/{key}.txt`. Do not use Google's deprecated sitemap ping.

`resume-pdf.py` needs Chromium or Chrome on `PATH` (or `--browser`). Writes `OmidFarhang-Resume{,-De,-Fa}.pdf` under `static/resume/`.

Requires Python 3.

## Code style

- **Scope:** Make the smallest correct change. Do not refactor unrelated code.
- **Markdown:** Preserve existing tone and formatting in migrated/legacy posts unless explicitly editing content.
- **Templates:** Follow Hugo/Go template conventions already in the theme.
- **CSS:** Use existing design tokens in `assets/css/core/` and component files; avoid inline styles in templates.
- **Comments:** Only for non-obvious logic.
- **Docs:** Do not add README or markdown docs unless requested.

## Security and secrets

Never commit or expose:

- `.aws-credentials.json`, `.awspublish*`
- `.htpasswd`
- Turnstile keys or other credentials in `hugo.yaml` — treat them as sensitive

## Git workflow

- Only create commits when explicitly asked.
- Do not push unless explicitly asked.
- `public/`, `resources/`, `.aider*`, `node_modules/`, and `static/pagefind/` are gitignored.

## What to verify

| Change type | Check |
|-------------|-------|
| Content / front matter | `hugo --minify` builds without errors |
| Series / seeAlso | No `seeAlso path not found` warnings in build output |
| Reading path edits | Path page renders with correct link order |
| Tools (new/updated script) | `/tools/` and `/tools/{id}/` render; `SCRIPT_VERSION` matches front matter; `/scripts/{id}.sh` still serves; URLs in `sitemap-pages` |
| Theme / layouts | `hugo server` renders affected pages |
| Search UI / indexing | `hugo --minify && ./scripts/pagefind-index.sh`; `/search/` returns results |
| Multilingual edits | Spot-check `en`, `fa` (RTL), and `de` variants if applicable |
