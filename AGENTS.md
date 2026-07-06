# AGENTS.md

Instructions for AI coding agents working on [omid.dev](https://omid.dev/) — a multilingual Hugo static site with a custom theme.

## Project overview

- **Stack:** [Hugo](https://gohugo.io/) (extended, v0.163+), custom theme `themes/omid-dev`, Python 3 maintenance scripts
- **Languages:** English (`en`, default), Persian (`fa`, RTL), German (`de`)
- **Content:** Long-form posts, short notes, static pages (about, resume, contact, etc.)
- **Config:** `hugo.yaml` (production), `hugo.development.yaml` (auto-loaded by `hugo server`)

There is no Node/npm build step. Hugo is the only required build tool.

## Repository layout

| Path | Purpose |
|------|---------|
| `content/` | Markdown content (posts, notes, pages) |
| `content/posts/{section}/{year}/` | Blog posts by section (`techblog`, `health`, `electronics`, `cozy-corner`) |
| `content/notes/` | Short-form notes (separate RSS/search index) |
| `themes/omid-dev/` | Custom Hugo theme (layouts, assets, i18n) |
| `layouts/` | Root-level layout overrides (if any) |
| `static/` | Static assets copied as-is |
| `assets/` | Hugo Pipes assets (processed at build) |
| `data/` | Hugo data files |
| `scripts/` | Python maintenance scripts |
| `docs/` | Editorial reference (curated content inventory, tag strategy) |
| `archetypes/` | Hugo content templates |
| `public/`, `resources/` | Build output — **do not commit** |

## Build and dev commands

```bash
# Local dev server (uses hugo.development.yaml automatically)
hugo server

# Include drafts
hugo server -D

# Production build
hugo --minify

# Clean build artifacts
rm -rf public resources
```

VS Code tasks in `.vscode/tasks.json` mirror these commands.

After theme or layout changes, run `hugo --minify` and fix any template errors before finishing.

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
- **`tags`:** Controlled vocabulary — follow `docs/tag-strategy.md` (do not copy legacy tags from existing posts)
- **`series`:** Optional ordered series metadata — see [Series](#series-machine-readable)
- **`seeAlso`:** Optional related-post links — see [seeAlso](#seealso-cross-links)
- **`shortlink`:** Existing short links — do not change unless asked

Notes use the `notes` section and a minimal archetype in `archetypes/notes.md`.

### Tags

Follow **`docs/tag-strategy.md`** — the controlled vocabulary is the source of truth, not tags on existing posts.

1. Pick tags only from the vocabulary tables (Primary + Secondary for TechBlog; section lists for other categories).
2. Evergreen TechBlog: 1–2 Primary + 1–4 Secondary, 3–6 tags total.
3. Archive/news posts: `News` + 0–2 subject tags; strip noise tags when migrating.
4. Run `python3 scripts/fix-post-tags.py scan` after bulk retagging.
5. New tags require updating `docs/tag-strategy.md` first.

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
| `linux-desktop-lab` | Systems & Linux |
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
- [ ] `hugo --minify` builds without `seeAlso path not found` warnings

### Shortcodes

Theme shortcodes live in `themes/omid-dev/layouts/shortcodes/`. Common ones:

- `{{< youtube ID >}}`
- `{{< companion repo="..." path="..." >}}`
- `{{< alert >}}`, `{{< figure >}}`, `{{< ltr >}}`, `{{< rtl >}}`

Use existing shortcodes rather than raw HTML when possible.

## Theme development

- Theme path: `themes/omid-dev/`
- Layouts: `layouts/` (Go templates)
- Styles: `assets/css/` (modular CSS, imported via Hugo Pipes)
- Scripts: `assets/js/`
- i18n strings: `i18n/*.yaml`

Match existing naming and structure. Prefer extending partials over duplicating markup. Keep RTL (`fa`) behavior in mind for layout and CSS changes.

## Maintenance scripts

```bash
# Audit tags (duplicates, typos, curated mismatches)
python3 scripts/fix-post-tags.py scan

# Apply tag fixes from scripts/tag-fixes.yaml
python3 scripts/fix-post-tags.py apply --dry-run
python3 scripts/fix-post-tags.py apply

# Note URL helper
python3 scripts/note-url.py
```

Tag rules: `docs/tag-strategy.md` (vocabulary + reuse rules), `scripts/tag-fixes.yaml` (automated renames). Curated homepage tags in `hugo.yaml` are protected — do not rename them casually.

Requires Python 3 with PyYAML (`pip install pyyaml`).

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
- `public/`, `resources/`, `.aider*`, and `node_modules/` are gitignored.

## What to verify

| Change type | Check |
|-------------|-------|
| Content / front matter | `hugo --minify` builds without errors |
| Series / seeAlso | No `seeAlso path not found` warnings in build output |
| Reading path edits | Path page renders with correct link order |
| Theme / layouts | `hugo server` renders affected pages |
| Tag changes | `python3 scripts/fix-post-tags.py scan` |
| Multilingual edits | Spot-check `en`, `fa` (RTL), and `de` variants if applicable |
