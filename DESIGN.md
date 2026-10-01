# Design system — omid.dev

Living reference for the visual and interaction language of [omid.dev](https://omid.dev/). **CSS tokens and classes are the source of truth**; keep this file in sync when you change them.

Theme: `themes/omid-dev/`  
Stack: Hugo (no npm/Node build). Styles via Hugo Pipes.

---

## Principles

1. **Token-first.** Colors, type, spacing, motion, and radii live as CSS custom properties. Prefer tokens over raw values.
2. **Compose, don’t duplicate.** Build pages from `system/` primitives + `components/` blocks; put one-off polish in `pages/`.
3. **Mono editorial, small bold marks.** Neutral (untinted) greys, black and white. The accent *is* ink — black in light mode, white in dark — so buttons, active states, and links read monochrome. Color appears only as small, deliberate marks: a yellow highlighter (`--highlight*`) and four category colors (`--cat-*`) used as dots and underlines. No blue-tinted neutrals, no second full accent family.
4. **Flat surfaces, one level of boxes.** Surfaces are solid (`--theme` / `--entry`) — no tinted gradients, glows, or washes. Cards sit directly on the page; never put bordered cards inside a bordered panel. Sections are separated by spacing and hairlines, not wrappers. Shadows are for hover only.
5. **Multilingual by default.** English/German LTR; Persian (`fa`) RTL with Vazirmatn. Prefer logical properties (`margin-inline-*`, `inset-inline-*`) and `[dir="rtl"]` overrides where needed.
6. **Dark mode as a first-class theme.** Tokens flip under `.dark` on `body`; avoid hard-coded light-only colors.
7. **Reduced motion.** Honor `prefers-reduced-motion` (see `core/zmedia.css`).

---

## CSS architecture

Documented in `layouts/partials/head.html`. Load order matters.

| Layer | Path | Role |
|-------|------|------|
| **vendor/** | `assets/css/vendor/` | Fonts (IBM Plex Sans, Atkinson Hyperlegible, Vazirmatn), Font Awesome |
| **core/** | `assets/css/core/` | Tokens, reset, brand colors, motion, responsive overrides |
| **system/** | `assets/css/system/` | Opt-in primitives (btn, card, chip, panel, form, prose, …) |
| **layout/** | `assets/css/layout/` | Site shell (`.main`, `.page-content`) + layout utilities |
| **components/** | `assets/css/components/` | Shared UI blocks (header, footer, post cards, heroes, …) |
| **pages/** | `assets/css/pages/` | Page-scoped overrides only |
| **includes/** | `assets/css/includes/` | Scrollbar, Chroma syntax highlighting |

**Promotion rule:** move a pattern from `components/` → `system/` when it has explicit class usage in 2+ templates **and** a variant API (not tied to one page wrapper).

---

## Layout & shell

| Token | Value | Use |
|-------|-------|-----|
| `--nav-width` / `--main-width` | `1200px` | Header nav + content max width |
| `--header-height` | `40px` | Layout math |
| `--footer-height` | `60px` | Layout math |
| `--gap` | `--space-8` (desktop), `--space-4` (≤768px) | Main padding / rhythm |
| `--radius` | `8px` | Default corners |
| `--radius-lg` | `12px` | Cards / panels |
| `--radius-xl` | `16px` | Large panels |
| `--radius-pill` | `999px` | Circular icon wells / true circles only — not buttons or chips |

**Page shell**

- `body` uses `--page-bg` (neutral off-white `#f4f4f2` light / near-black `#0a0a0a` dark); white `--theme` surfaces sit on it.
- `.main` is centered, max-width `main-width + 2×gap`, min-height fills viewport minus header/footer.
- `.page-content` is the boxed content surface: `--theme` background, `--radius`, `--shadow-md`, light border, generous padding (`--space-11`; tighter on mobile).

**Header**

- Sticky; transparent until `.scrolled` → frosted glass (`backdrop-filter`), soft shadow.
- Grid: logo | menu | actions (`max-width: --nav-width`).
- Logo: extrabold, slight hover scale; mark rotates slightly on hover.

**Footer**

- Full-bleed band (content constrained to `--main-width` via inline padding), one flat surface — no nested panels or column cards, no decorative top bar.
- Light mode: inverted ink band (`#0c0c0c`). Implemented by re-scoping tokens on `body:not(.dark) .footer`, so every footer rule follows automatically — add new footer styles with tokens, not raw colors.
- Dark mode: raised band on `--entry`, one step above `--page-bg`, with a hairline top border.
- Inside: three bands — identity + actions (actions end-aligned), feed (recent posts | notes), links (categories, explore, more, contact) — then the bottom bar. Bands are separated by generous block padding (`--space-10`) and one hairline each; columns share a `--space-12` gutter so feed columns line up with link columns. Status dot uses `--status-success`.
- Hierarchy through type, not lines: headings are small uppercase `--secondary`, links are plain `--content` (post/note titles `--primary`), counts are muted numbers. No per-item hairlines, pills, or boxed email — list items are separated by spacing only.
- Responsive: ≤1024px feed stacks and links go 2-up; ≤480px links stack.

**Breakpoints (primary)**

- `768px` — mobile shell (gap, boxed padding, share buttons, archive stack).
- `900px` — list / top-link adjustments.
- Additional layout breakpoints live in component/page CSS as needed.

---

## Color

Defined in `assets/css/core/theme-vars.css`. Semantic roles, not raw palette names in templates.

### Light (`:root`)

| Role | Token | Hex / notes |
|------|-------|-------------|
| Page | `--page-bg` | `#f4f4f2` |
| Surface | `--theme` | `#ffffff` |
| Raised / entry | `--entry` | `#ffffff` |
| Text / headings | `--primary` | `#0c0c0c` |
| Muted UI | `--secondary` | `#6a6a6a` |
| Borders / rules | `--tertiary` | `#d4d4d4` |
| Soft fill | `--quaternary` | `#f5f5f4` |
| Body copy | `--content` | `#3a3a3a` |
| Border | `--border` | `#e2e1de` |
| Accent | `--accent` | Ink `#0c0c0c` |
| Accent hover | `--accent-hover` | `#3a3a3a` |
| Accent soft | `--accent-light` | Near-neutral fill (`color-mix` with `--quaternary`) |
| Code | `--code-bg`, `--code-block-bg` | `#f5f5f4` / `#1c1c1c` |

Accent derivatives (`--accent-ring`, `--accent-border*`, `--surface-tint*`) are rgba mixes from `--accent-rgb` — use them for focus rings and hover fills only. `--hero-glow*` are `transparent`, and `--surface-gradient-*` / `--surface-panel` resolve to flat `--theme`; they remain as tokens so existing rules stay valid.

### Dark (`.dark`)

Same token names, neutral near-black (no navy): `--page-bg` `#0a0a0a`, `--theme` `#121212`, `--entry` `#171717`, `--border` `#2a2a2a`, text `#f5f5f4` / `#d4d4d4` / `#a3a3a3`. Accent is white (`#fafafa`), so primary buttons and active states invert to white-on-black. Surfaces are flat, like light mode.

### Marks: highlighter & categories

The only non-neutral colors in the UI chrome. Use them as small marks — dots, underlines, short rules — never as fills for large surfaces or borders on cards.

| Token | Light | Dark | Use |
|-------|-------|------|-----|
| `--highlight` | `#ffe36e` | `rgba(255, 214, 10, 0.32)` | Marker band behind key phrases (hero tagline `em`) and link hover fill |
| `--highlight-strong` | `#ffc400` | `#ffd60a` | Kicker rule (`.section-eyebrow::before`) |
| `--link-mark` / `--link-mark-hover` | inset yellow underline / full marker fill | same, dimmer | `.post-content a:not([class])` box-shadow — plain text links only, never buttons/cards/chips |
| `--cat-techblog` | `#2f5bff` | `#7b9bff` | Category marks |
| `--cat-health` | `#00a86b` | `#34d399` | 〃 |
| `--cat-electronics` | `#ffb000` | `#fbbf24` | 〃 |
| `--cat-cozy-corner` | `#ff3d7f` | `#fb7fa8` | 〃 |

`[data-category="…"]` sets `--cat-color` (fallback `--accent`). Templates get the slug from `partials/post_category.html` (the `posts/<section>/` folder, so it is language-independent). Current uses: post-card label dot (`.entry-category`), hover title underline on post cards, section-nav chip dots, and tinted icon wells on category cards (`.card--life[data-category]`).

The hero tagline highlight is authored in data: wrap the phrase in `*…*` in `data/{lang}/home.yaml` (`heroTagline` is rendered with `markdownify`).

### Status (alerts / feedback)

| Intent | Color token | BG token |
|--------|-------------|----------|
| Info | `--status-info` | `--status-info-bg` |
| Success | `--status-success` | `--status-success-bg` |
| Warning | `--status-warning` | `--status-warning-bg` |
| Error | `--status-error` | `--status-error-bg` |
| Tip | `--status-tip` (accent) | `--status-tip-bg` |

### Third-party brands

`assets/css/core/brand-colors.css` — `--brand-*` tokens + `[data-brand="…"]` → `--brand-color` for social/dev icons. Icons rest in `--secondary` and show the brand color on hover. Dark mode (and the inverted light-mode footer) lightens black marks (GitHub, X, etc.).

### Theme switching

User cycles **system → light → dark → system** via `#theme-toggle`. Preference stored client-side; `.dark` on `body` drives tokens. Inline FOUC guard in `head.html` respects `defaultTheme` / `prefers-color-scheme`.

---

## Typography

Source: `assets/css/core/typography.css` (tokens) + `system/typography.css` (utilities) + `system/prose.css` (article body).

### Families

| Token | Stack |
|-------|--------|
| `--font-sans` | **IBM Plex Sans** (`IBMPlexSans`), system UI, **Vazirmatn** (fallback) |
| `--font-heading` | **IBM Plex Sans** (`IBMPlexSans`) — UI chrome, titles |
| `--font-body` | **Atkinson Hyperlegible** (`AtkinsonHyperlegible`) — article prose |
| `--font-sans-fa` / `--font-heading-fa` / `--font-body-fa` | **Vazirmatn** first |

`body:lang(fa)` switches to the `-fa` stacks. Self-hosted under `static/fonts/` / `vendor/fonts.css` with `font-display: swap`. Latin + latin-ext subsets only for LTR type.

### Closed modular ladder

Numeric scale assumes `1rem = 16px`. **Do not invent new rem sizes** — map new UI to a ladder step or a semantic role that already aliases to one.

| Token | Size | px |
|-------|------|-----|
| `--text-2xs` | `0.75rem` | 12 — UI floor |
| `--text-sm` | `0.875rem` | 14 |
| `--text-base` | `1rem` | 16 |
| `--text-lg` | `1.125rem` | 18 |
| `--text-xl` | `1.25rem` | 20 |
| `--text-3xl` | `1.5rem` | 24 |
| `--text-4xl` | `1.75rem` | 28 |
| `--text-5xl` | `2.25rem` | 36 |
| `--text-6xl` | `3rem` | 48 |

Ladder aliases (legacy names): `--text-xs` → `sm`, `--text-md` → `lg`, `--text-2xl` → `3xl`.

### Role → step map

| Role token(s) | Maps to |
|---------------|---------|
| `--text-ui-xs`, `--text-ui-sm`, `--text-caption-sm/xs`, `--text-kicker*`, `--text-badge`, `--text-compact`, `--text-micro`, `--text-3xs` | `--text-2xs` |
| `--text-ui`, `--text-ui-md`, `--text-caption`, `--text-body-sm` | `--text-sm` |
| `--text-ui-lg`, `--text-input`, `--text-body-md`, `--text-base-sm`, `--text-prose-body`, `--text-prose-h4` | `--text-base` |
| `--text-lead`, `--text-subtitle*`, `--text-title-sm`, `--text-prose-h3` | `--text-lg` |
| `--text-title-md`, `--text-section-md`, `--text-prose-h3-lg`, `--text-icon-lg`, `--text-nav-icon` | `--text-xl` |
| `--text-prose-h1`, `--text-prose-h2`, `--text-headline-sm`, `--text-logo`, `--text-icon-xl` | `--text-3xl` |
| `--text-headline-md` | `--text-4xl` |
| `--text-headline-lg/xl/2xl`, `--text-logo-lg`, `--text-entry-featured` | `--text-5xl` |
| `--text-prose-h5`, `--text-prose-h6` | `--text-sm` |

Fluid display (`--text-display-*` with `clamp`) and specials (`--text-display-name`, `--text-display-404*`) sit outside the discrete ladder.

Weights: `--font-normal` (400) … `--font-black` (900). Headings often use semibold–extrabold.

### Line height

Short set: `--leading-none`, `--leading-display` (oversized glyphs only), `--leading-tight`, `--leading-snug`, `--leading-normal`, `--leading-relaxed`, `--leading-body`, `--leading-loose`, `--leading-prose`. Legacy names (`--leading-medium`, `--leading-body-plus`, `--leading-snug-plus`, …) alias onto this set.

Tracking: prefer `--tracking-*` (display titles use tighter tracking, e.g. `--tracking-display` / `--tracking-heading`).

### Prose

`.post-content` — `--content` color, `--text-prose-body`, `--leading-prose`. Article-specific heading polish lives in `components/post-single.css`.

---

## Spacing

Source: `assets/css/core/spacing.css` (4px base).

| Token | Rem | px |
|-------|-----|----|
| `--space-1` … `--space-12` | 0.25 → 4 | 4 → 64 |

Semantic aliases: `--gap`, `--content-gap`, `--space-page`, `--space-hero-y` / `--space-hero-x`, `--space-inline`.

---

## Elevation & surfaces

| Token | Use |
|-------|-----|
| `--shadow-sm` / `md` / `lg` | Default depth ladder |
| `--shadow-accent` | Soft neutral lift on featured cards (hover) |
| `--lift-hover` | `-2px` — `.effect-lift` on hover/focus-within |
| `--surface-gradient-tinted` | Flat `--theme` (legacy name for "tinted" panels/cards) |
| `--surface-gradient-hero` | Flat `--theme` (legacy name for hero surfaces) |
| `--surface-panel` / `--surface-raised` | `--theme` / `--entry` |
| `--focus-ring` | `0 0 0 3px var(--accent-ring)` |

Heroes (home, page-hero) are flat surfaces. Hierarchy comes from type, the highlighter, and spacing — no washes, glows, or corner orbs.

---

## Motion

Source: `assets/css/core/motion.css`.

| Token | Typical use |
|-------|-------------|
| `--duration-instant` / `fast` / `normal` / `slow` / `menu` | 0.1s → 0.5s |
| `--ease-default` / `out` / `standard` | Curves |
| `--transition-interactive` | Buttons, chips, links |
| `--transition-lift` | Cards / images that rise |
| `--transition-header` | Sticky header glass |
| `--transition-form` / `form-focus` | Inputs |

Keep motion purposeful (hover lift, header blur, menu). Don’t add decorative animation noise.

---

## System primitives

Opt-in BEM-style classes under `assets/css/system/`. Compose in templates.

### Buttons (`.btn`)

- Shape: rounded rectangle (`--radius-lg`), min-height 42px (36px for `--sm`).
- Variants: `--primary` (ink fill; white fill in dark mode and in the light-mode footer), `--secondary` (outlined), `--accent` (accent fill).
- Pair one `--primary` with `--secondary` for the rest; don't render two filled buttons side by side. `profile_mode_buttons.html` makes the first profile button primary and the others secondary (`btn_primary.html` accepts a `variant`).
- Modifiers: `--sm`, `--block`, groups via `.btn-group` / `--column`.
- Focus: `--focus-ring`.

### Cards (`.card`)

- Base: theme fill, hairline border, `--radius-lg` — no resting shadow.
- Interactive: `--shadow-md` on hover only.
- Variants: `--interactive`, `--accent`, `--featured`, `--tinted`, `--dashed`, `--horizontal`, `--topic` (+ `.topics-grid`; `.topics-grid--list` turns topic cards into hairline rows inside `.tech-topics-section--list`), `--fill`.
- **Equal-height grids:** add `--fill` so the card stretches to the grid cell. Put content in `.card__body` (flex column); `.card__cta` pins to the bottom via `margin-top: auto`, so CTAs stay aligned across a row even when titles wrap.

### Panels (`.panel`)

Surfaces for sidebars and section boxes: `--tinted`, `--hero-gradient`, `--hero` (elevated; keeps `--shadow-md`), `--accent`, `--sidebar` (sticky), `--section`, `--xl`, `--flush`.

Base panel: flat `--theme` fill, hairline border, no resting shadow. **Nesting:** never put a panel or bordered card inside another panel — one level of boxes. If a section needs grouping, use spacing and hairlines (see Home, Footer).

### Chips (`.chip`)

Tags, filters, stats: `--default`, `--pill`, `--stat`, `--tag` (hash prefix), etc. Soft corners (`--radius`); bold/semibold UI sizes.

### Icons (`.icon-circle`)

Neutral circular icon wells (accent fill on interactive hover; `--cat-color` tint on category cards); sizes from `--icon-xs` … `--icon-lg` via modifiers (`--2xs`, `--compact`, `--sm`, …).

### Feedback

- `.alert` (+ status modifiers using `--status-*`)
- `.toast-message`
- Spinner / skeleton utilities in `feedback.css`

### Other system files

Forms, tables, tabs, disclosure, menus/dropdowns, modal, tooltip, avatars, prose, mermaid, typography utilities.

---

## Shared components

Notable blocks in `assets/css/components/`:

| Component | Role |
|-----------|------|
| **header** | Sticky nav, theme toggle, mobile menu |
| **footer** | CTA, columns, social, theme control |
| **page-hero** | Flat hero shell; contained vs split layouts |
| **section-heading** | Eyebrows (omit / context / mark), underline accent bar, centered titles, kickers |
| **post-entry** | List/featured cards, entry links |
| **post-single** | Article chrome, TOC, meta, series nav polish |
| **timeline** | Resume / uses-style tracks (RTL-aware) |
| **breadcrumbs**, **pagination**, **search**, **archive**, **recommendations**, **social-icons** | Discovery & chrome |

Page CSS (`home`, `about-me`, `resume`, `contact`, `notes`, `reading-path`, …) should only adjust spacing and page-unique layout — reuse system + component classes first.

---

## Page patterns

### Eyebrows (omit / context / mark)

Small labels above titles are **not** a default section rhythm. Three roles:

| Role | When | Treatment |
|------|------|-----------|
| **Omit** | Label repeats the title or adds no context | No eyebrow — title (+ underline) carries the section |
| **Context** | Label names a *category* the title doesn’t | `.section-eyebrow` / `.section-kicker`: ink text, short `--highlight-strong` rule, sentence case, calm tracking |
| **Mark** | Rare brand/category stamp (e.g. footer identity kicker) | `.section-eyebrow--caps` / `.section-kicker--caps` or `.footer-eyebrow`: uppercase OK |

Do not put an uppercase tracked eyebrow on every section. Resume document uppercase stays a print convention, separate from this system.

### Home

- Flat hero band (`--theme`) with a hairline bottom border.
- Grid: profile visual | statement (yellow kicker rule, tagline `--text-display-home` with highlighted phrase, lead, primary + secondary CTA).
- Sections: open bands directly on `--page-bg` — the section `.panel` wrappers lose fill, border, and radius and get a hairline top rule + `--space-11` top padding. Cards inside (now, series, reading paths, posts) are the only boxes.
- Tech topics: Core Stack stays as featured cards; the long professional/technical groups render as a borderless link list (icon · name · count, hairline rows), not a wall of boxes. Same list variant on the TechBlog hub (`tech_topics_grid.html` with `"list" true`).
- CTA sections (playground, contact) are content + button, no inner card.
- Headings: shared `home_section_heading` — title-led `section-title--underline` on every band, no section eyebrows.

### Post cards

- Category label above the title: small uppercase `--secondary` text with a `--cat-color` dot (`.entry-category`, links to the section).
- Hover: title gets a 2px `--cat-color` underline. No colored side borders.

### Content pages

- Often `.page-hero` (lead) → boxed `.page-content` or article shell. Page heroes are title-led — no redundant page-name eyebrow.
- Split layouts: `.layout-split` (+ sidebar width modifiers) in `layout/main.css`.

### Articles

- Prose in `.post-content`; code blocks with Chroma; copy button on hover.
- Mermaid diagrams (```mermaid` fences or `mermaid` shortcode) render as `.mermaid-figure` panels; library loads only on pages that include one.
- **Post-end discovery** (series, see also, related) and **Join the Conversation** are open hairline bands — numbered/linked rows and platform chips, not bordered cards or nested panels. Order: series → see also → tags → related → discussion. Reading paths keep their own page CSS.
- **Post meta:** flat typography row (author · date · reading time) under a hairline — not nested chips in a panel. Share/Translations triggers stay chips; open menus are a flat list inside one panel (no chips-inside-chips).

---

## Icons & imagery

- **UI icons:** Font Awesome (vendor CSS).
- **Brand marks:** `data-brand` + `--brand-color`.
- **Avatars / profile:** circular crops, light ring (`border` on `--theme`), soft shadow; gentle scale on hover where interactive.
- Prefer real photos (bio, posts) over abstract decoration as the main visual idea.

---

## Accessibility & i18n

- Visible focus via `--focus-ring` on interactive controls.
- Screen-reader utility: `.screen-reader-text`.
- RTL: `[dir="rtl"]` overrides for breadcrumbs, timelines, section underlines, buttons with trailing icons, etc. Test `fa` when changing nav, flex/grid, or prose chrome.
- `code` / highlights force `direction: ltr`.
- i18n copy lives in `themes/omid-dev/i18n/*.yaml` — add all three languages (`en`, `fa`, `de`) for new UI strings.

---

## Do / don’t

**Do**

- Use existing tokens and system classes before inventing new ones.
- Extend partials rather than copying markup.
- Match light/dark token pairs when introducing a new color role.
- Keep heroes flat; carry hierarchy with type, the highlighter, and spacing.
- Keep color to small marks (highlighter, category dots/underlines, status).

**Don’t**

- Hard-code hex/px that already have tokens.
- Introduce a second accent family (blue, purple, …), blue-tinted neutrals, or a warm-cream editorial skin.
- Use tinted gradients, glows, or washes on surfaces.
- Nest boxes: panels in panels, cards in panels, footer columns as cards.
- Add decorative top bars or gradient hairlines on panels, cards, or the footer.
- Put page-only one-offs into `system/` without a variant API and multi-template use.
- Rely on physical `left`/`right` when logical properties work (breaks RTL).
- Use colored side borders (`border-inline-start` / `border-left` accents) on cards or callouts, rounded or not — companion cards lean on icon + surface, series nav uses a short section underline, blockquotes use typographic quote marks, categories use dots.
- Commit `public/` or `resources/`.

---

## File map (quick)

```
themes/omid-dev/assets/css/
  core/theme-vars.css      # color, radius, shadow, surfaces, status
  core/typography.css      # type scale + roles
  core/spacing.css         # space scale
  core/motion.css          # durations, easings, transitions
  core/brand-colors.css    # third-party brand tokens
  core/reset.css           # base element defaults
  core/zmedia.css          # shared breakpoints + reduced motion
  system/*.css             # primitives
  layout/*.css             # shell + utilities
  components/*.css         # shared blocks
  pages/*.css              # page overrides
  vendor/                  # fonts, fontawesome
  includes/                # chroma, scrollbar
```

After theme or layout changes: `hugo --minify` and fix errors before finishing.
