# Design system — omid.dev

Living reference for the visual and interaction language of [omid.dev](https://omid.dev/). **CSS tokens and classes are the source of truth**; keep this file in sync when you change them.

Theme: `themes/omid-dev/`  
Stack: Hugo (no npm/Node build). Styles via Hugo Pipes.

---

## Principles

1. **Token-first.** Colors, type, spacing, motion, and radii live as CSS custom properties. Prefer tokens over raw values.
2. **Compose, don’t duplicate.** Build pages from `system/` primitives + `components/` blocks; put one-off polish in `pages/`.
3. **Steel editorial.** Cool slate neutrals with a faint blue page wash (`--page-bg`), ink text (`--primary`), and a steel-blue accent (`--accent`: `#3574b8`) for links, hovers, eyebrows, and CTAs — clearly blue but calmer than bright SaaS `#2563eb`, not gray `#334e68` slate.
4. **Soft depth.** Resting surfaces use hairline borders or tint — not stacked boxes with soft shadows. Shadows are for hover lift and elevated exceptions (hero cards, page shell). Tinted gradients and a single faint hero wash — no heavy glow stacks, corner orbs, or tri-color chrome.
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

- `body` uses `--page-bg` (cool blue-gray wash).
- `.main` is centered, max-width `main-width + 2×gap`, min-height fills viewport minus header/footer.
- `.page-content` is the boxed content surface: `--theme` background, `--radius`, `--shadow-md`, light border, generous padding (`--space-11`; tighter on mobile).

**Header**

- Sticky; transparent until `.scrolled` → frosted glass (`backdrop-filter`), soft shadow.
- Grid: logo | menu | actions (`max-width: --nav-width`).
- Logo: extrabold, slight hover scale; mark rotates slightly on hover.

**Footer**

- Contained, rounded top, accent gradient hairline, soft tinted surface.
- Identity + CTA panel, link columns, social / theme toggle.

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
| Page wash | `--page-bg` | `#eef3f9` |
| Surface | `--theme` | `#ffffff` |
| Raised / entry | `--entry` | `#ffffff` |
| Text / headings | `--primary` | `#0f172a` (slate-900) |
| Muted UI | `--secondary` | `#64748b` |
| Borders / rules | `--tertiary` | `#cbd5e1` |
| Soft fill | `--quaternary` | `#eff6ff` |
| Body copy | `--content` | `#334155` |
| Border | `--border` | `#dbe4f0` |
| Accent | `--accent` | Steel blue `#3574b8` (light); `#6eb4f0` (dark) |
| Accent hover | `--accent-hover` | `#2a6299` (light); `#8ac4f5` (dark) |
| Accent soft | `--accent-light` | Subtle neutral fill (`color-mix` with `--quaternary`) |
| Code | `--code-bg`, `--code-block-bg` | `#f1f5f9` / `#1e293b` |

Accent derivatives (`--accent-ring`, `--accent-border*`, `--hero-glow*`, `--surface-tint*`) are rgba mixes from `--accent-rgb`. Prefer these for focus rings, hovers, and light surface tints — not ambient backgrounds.

### Dark (`.dark`)

Same token names; surfaces invert to slate (`--theme` `#0f172a`, `--entry` `#1e293b`, `--page-bg` `#020617`). Accent shifts lighter (`#60a5fa`) for contrast. Article shell/body may diverge (`--surface-article-shell` / `--surface-article-body`).

### Status (alerts / feedback)

| Intent | Color token | BG token |
|--------|-------------|----------|
| Info | `--status-info` | `--status-info-bg` |
| Success | `--status-success` | `--status-success-bg` |
| Warning | `--status-warning` | `--status-warning-bg` |
| Error | `--status-error` | `--status-error-bg` |
| Tip | `--status-tip` (accent) | `--status-tip-bg` |

### Third-party brands

`assets/css/core/brand-colors.css` — `--brand-*` tokens + `[data-brand="…"]` → `--brand-color` for social/dev icons. Dark mode lightens black marks (GitHub, X, etc.).

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

### Scale (selected)

Numeric scale assumes `1rem = 16px`.

| Token | Size |
|-------|------|
| `--text-2xs` … `--text-6xl` | 12px → 48px main steps |
| `--text-ui` / `--text-ui-sm` | Recurring UI chrome |
| `--text-lead` | Leads / intros |
| `--text-prose-body` | Article body (~1.02rem) |
| `--text-prose-h1` … `h6` | Markdown headings |
| `--text-display-*` | Fluid hero/archive titles (`clamp`) |
| `--text-display-home` | Homepage tagline |

Weights: `--font-normal` (400) … `--font-black` (900). Headings often use semibold–extrabold.

Line height / tracking: prefer `--leading-*` and `--tracking-*` (display titles use tighter tracking, e.g. `--tracking-display` / `--tracking-heading`).

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
| `--shadow-accent` | Accent-tinted lift (CTAs, featured) |
| `--lift-hover` | `-2px` — `.effect-lift` on hover/focus-within |
| `--surface-gradient-tinted` | Soft tinted panels |
| `--surface-gradient-hero` | Hero washes |
| `--surface-panel` / `--surface-raised` | Mixed accent surfaces |
| `--focus-ring` | `0 0 0 3px var(--accent-ring)` |

Heroes (home, page-hero) use a single top-center wash (`--surface-gradient-hero`) over a theme → page-bg fade — atmosphere, not corner orbs or overlay badges.

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
- Variants: `--primary` (ink fill → accent on hover), `--secondary` (outlined → accent on hover), `--accent` (accent fill for prominent CTAs).
- Modifiers: `--sm`, `--block`, groups via `.btn-group` / `--column`.
- Focus: `--focus-ring`.

### Cards (`.card`)

- Base: theme fill, hairline border, `--radius-lg` — no resting shadow.
- Interactive: `--shadow-md` on hover only.
- Variants: `--interactive`, `--accent`, `--featured`, `--tinted`, `--dashed`, `--horizontal`, `--topic` (+ `.topics-grid`), `--fill`.
- **Equal-height grids:** add `--fill` so the card stretches to the grid cell. Put content in `.card__body` (flex column); `.card__cta` pins to the bottom via `margin-top: auto`, so CTAs stay aligned across a row even when titles wrap.

### Panels (`.panel`)

Surfaces for sidebars and section boxes: `--tinted`, `--hero-gradient`, `--hero` (elevated; keeps `--shadow-md`), `--accent`, `--sidebar` (sticky), `--section`, `--xl`, `--flush`.

Base panel: hairline border, no resting shadow. **Nesting:** do not wrap bordered cards in a bordered section panel — section wraps use tint/spacing only (see Home).

### Chips (`.chip`)

Tags, filters, stats: `--default`, `--pill`, `--stat`, `--tag` (hash prefix), etc. Soft corners (`--radius`); bold/semibold UI sizes.

### Icons (`.icon-circle`)

Accent-tinted circular icon wells; sizes from `--icon-xs` … `--icon-lg` via modifiers (`--2xs`, `--compact`, `--sm`, …).

### Feedback

- `.alert` (+ status modifiers using `--status-*`)
- `.toast-message`
- Spinner / skeleton utilities in `feedback.css`

### Other system files

Forms, tables, tabs, disclosure, menus/dropdowns, modal, tooltip, avatars, prose, typography utilities.

---

## Shared components

Notable blocks in `assets/css/components/`:

| Component | Role |
|-----------|------|
| **header** | Sticky nav, theme toggle, mobile menu |
| **footer** | CTA, columns, social, theme control |
| **page-hero** | Gradient hero shell; contained vs split layouts |
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
| **Context** | Label names a *category* the title doesn’t | `.section-eyebrow` / `.section-kicker`: accent, hairline, sentence case, calm tracking |
| **Mark** | Rare brand/category stamp (e.g. footer identity kicker) | `.section-eyebrow--caps` / `.section-kicker--caps` or `.footer-eyebrow`: uppercase OK |

Do not put an uppercase tracked eyebrow on every section. Resume document uppercase stays a print convention, separate from this system.

### Home

- Full-bleed-feel hero with a single faint top wash + gradient into `--page-bg`.
- Grid: profile visual | statement (tagline `--text-display-home`, lead, CTAs).
- Sections: unboxed tinted bands (no border/shadow on section `.panel` wrappers); interactive cards inside carry the chrome; title-led (context eyebrow only when it adds category).

### Content pages

- Often `.page-hero` (lead) → boxed `.page-content` or article shell. Page heroes are title-led — no redundant page-name eyebrow.
- Split layouts: `.layout-split` (+ sidebar width modifiers) in `layout/main.css`.

### Articles

- Prose in `.post-content`; code blocks with Chroma; copy button on hover.
- Series / seeAlso / reading paths are content features — style via post-single + reading-path page CSS.

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
- Keep heroes atmospheric (gradients/glows) and typography hierarchy clear.

**Don’t**

- Hard-code hex/px that already have tokens.
- Introduce a second accent family (e.g. purple system) or warm-cream editorial skin.
- Put page-only one-offs into `system/` without a variant API and multi-template use.
- Rely on physical `left`/`right` when logical properties work (breaks RTL).
- Use thick accent left borders as generic callout chrome — companion cards lean on icon + tinted surface, series nav uses a short section underline, blockquotes use typographic quote marks.
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
