# omid.dev

Personal site of [Omid Farhang](https://omid.dev/) — frontend architect and engineering lead. Long-form writing on architecture, Angular, Linux, and the habits that make technical work last, plus short notes and a few other sections.

**Live:** [omid.dev](https://omid.dev/) · [Persian](https://omid.dev/fa/) · [German](https://omid.dev/de/)

Runnable companions for posts live in [example-projects](https://github.com/omidfarhang/example-projects); browser demos at [playground.omid.dev](https://playground.omid.dev/).

## Stack

- [Hugo](https://gohugo.io/) extended **v0.163+** (no Node/npm build)
- Custom theme `themes/omid-dev`
- Python 3 maintenance scripts
- English (`en`, default), Persian (`fa`, RTL), German (`de`)

Production config is `hugo.yaml`. `hugo server` also loads `hugo.development.yaml`.

## Requirements

- [Hugo extended](https://gohugo.io/installation/) ≥ 0.163
- Python 3 (optional; only for scripts under `scripts/`)

Verify the Hugo build:

```bash
hugo version   # should include "extended"
```

## Local development

```bash
hugo server      # http://localhost:1313 — uses hugo.development.yaml
hugo server -D   # include drafts
```

Production build:

```bash
hugo --minify
```

Output goes to `public/` (and `resources/` for processed assets). Both are gitignored — do not commit them.

```bash
rm -rf public resources   # clean build artifacts
```

VS Code / Cursor tasks in `.vscode/tasks.json` wrap the same commands.

## Repository layout

| Path | Purpose |
|------|---------|
| `content/` | Markdown: posts, notes, pages |
| `content/posts/{section}/{year}/` | Posts by section and year |
| `content/notes/` | Short-form notes (own RSS and search index) |
| `themes/omid-dev/` | Custom theme (layouts, CSS, JS, i18n) |
| `layouts/` | Site-level layout overrides |
| `assets/` | Hugo Pipes assets |
| `static/` | Copied as-is |
| `data/` | Hugo data files |
| `scripts/` | Python maintenance helpers |
| `docs/` | Editorial reference |
| `archetypes/` | Content templates |
| `design.md` | Design system (tokens, layers, primitives) |
| `AGENTS.md` | Conventions for contributors and coding agents |

## Content

### Posts

Files live under `content/posts/{section}/{year}/` with language in the filename:

```
YYYY-MM-DD-slug.en.md
YYYY-MM-DD-slug.fa.md
YYYY-MM-DD-slug.de.md
```

Sections (Hugo `categories`): **TechBlog**, **Health**, **Electronics**, **Cozy Corner**.

Typical front matter:

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

- Language is the filename suffix, not a front-matter field.
- `url` is the permalink relative to the site root (no language prefix).
- Use the same English tag strings on `.en`, `.fa`, and `.de` variants.
- Prefer curated homepage tags from `hugo.yaml` (`homeTechTags*`) when a post should appear under those topics. Full rules: [`docs/tag-strategy.md`](docs/tag-strategy.md).

Evergreen TechBlog posts may also belong to a **series** (in-post prev/next, `/series/` index) and/or a **reading path** (curated journey under `content/posts/techblog/paths/`). See [`docs/curated-content-inventory.md`](docs/curated-content-inventory.md) and `AGENTS.md`.

### Notes

Short posts in `content/notes/`. They have a separate RSS feed and search index. Assign a stable URL with:

```bash
python3 scripts/note-url.py --missing
```

### Pages

Standalone pages (about, resume, contact, uses, …) live at the root of `content/`.

### Shortcodes

Theme shortcodes in `themes/omid-dev/layouts/shortcodes/`. Common ones: `youtube`, `companion`, `alert`, `figure`, `ltr`, `rtl`. Prefer these over raw HTML.

## Theme

The site uses a custom theme at `themes/omid-dev/`: Go templates, modular CSS via Hugo Pipes, and i18n YAML.

- Design tokens and do/don’t: [`design.md`](design.md)
- After template or CSS changes, run `hugo --minify` and fix errors before committing
- Persian is RTL — check `fa` when changing layout or navigation

## Maintenance scripts

Inspect-only by default; pass `--apply` where a script mutates files or talks to the network.

```bash
python3 scripts/note-url.py              # assign /notes/<id>/ URLs
python3 scripts/shortlink.py             # list posts missing g.omid.dev shortlinks
python3 scripts/shortlink.py --apply --missing --limit 20
python3 scripts/notify-search.py         # dry-run IndexNow / WebSub / Ping-o-Matic
python3 scripts/notify-search.py --apply
python3 scripts/tag-manager.py           # tag clusters, curated lists, merge/replace
python3 scripts/build-stack-icons.py     # resume stack-icon font from SVGs
```

`shortlink.py` auth: `YOURLS_SIGNATURE`, or `YOURLS_USERNAME` + `YOURLS_PASSWORD`. Optional: `YOURLS_API_URL`, `YOURLS_SITE_URL`.

`notify-search.py` reads the public IndexNow key from `params.indexNow.key` in `hugo.yaml` (override with `INDEXNOW_KEY`).

Do not commit credentials, `.aws-credentials.json`, `.htpasswd`, or Turnstile secrets.

## Related

| | |
|---|---|
| Site | [omid.dev](https://omid.dev/) |
| Playground | [playground.omid.dev](https://playground.omid.dev/) |
| Companion repos | [example-projects](https://github.com/omidfarhang/example-projects) |
| Short links | [g.omid.dev](https://g.omid.dev/) |
| Contact | [hi@omid.dev](mailto:hi@omid.dev) |

## License

Site content and the custom theme are © Omid Farhang. All rights reserved unless a file says otherwise.
