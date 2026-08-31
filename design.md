# Design system — omid.dev

Living reference for the visual and interaction language of [omid.dev](https://omid.dev/). **CSS tokens and classes are the source of truth**; keep this file in sync when you change them.

Theme: `themes/omid-dev/`  
Stack: Hugo (no npm/Node build). Styles via Hugo Pipes.

---

## Principles

1. **Token-first.** Colors, type, spacing, motion, and radii live as CSS custom properties. Prefer tokens over raw values.
2. **Compose, don’t duplicate.** Build pages from `system/` primitives + `components/` blocks; put one-off polish in `pages/`.
3. **Light slate + blue accent.** Cool neutrals (Slate), page wash (`--page-bg`), and a clear blue accent — not purple-on-white or warm cream themes.
4. **Soft depth.** Subtle shadows, tinted gradients, and soft accent glows on heroes/panels — no heavy glow stacks or multi-layer chrome.
5. **Multilingual by default.** English/German LTR; Persian (`fa`) RTL with Vazirmatn. Prefer logical properties (`margin-inline-*`, `inset-inline-*`) and `[dir="rtl"]` overrides where needed.
6. **Dark mode as a first-class theme.** Tokens flip under `.dark` on `body`; avoid hard-coded light-only colors.
7. **Reduced motion.** Honor `prefers-reduced-motion` (see `core/zmedia.css`).

---

## CSS architecture

Documented in `layouts/partials/head.html`. Load order matters.

| Layer | Path | Role |
|-------|------|------|
| **vendor/** | `assets/css/vendor/` | Fonts (Inter, Vazirmatn), Font Awesome |
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
| `--radius-pill` | `999px` | Buttons, chips |

**Page shell**

- `body` uses `--page-bg` (cool blue-gray wash).
- `.main` is centered, max-width `main-width + 2×gap`, min-height fills viewport minus header/footer.
- `.page-content` is the boxed content surface: `--theme` background, `--radius`, `--shadow-md`, light border, generous padding (`--space-11`; tighter on mobile).

**Header**

- Sticky; transparent until `.scrolled` → frosted glass (`backdrop-filter`), soft shadow.
- Grid: logo | menu | actions (`max-width: --nav-width`).
- Logo: extrabold, slight hover scale; mark rotates slightly on hover.

**Footer**

- Contained, rounded top, accent gradient hairline, soft hero glows.
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
| Page wash | `--page-bg` | `#f0f4fc` |
| Surface | `--theme` | `#ffffff` |
| Raised / entry | `--entry` | `#ffffff` |
| Text / headings | `--primary` | `#0f172a` (slate-900) |
| Muted UI | `--secondary` | `#64748b` |
| Borders / rules | `--tertiary` | `#cbd5e1` |
| Soft fill | `--quaternary` | `#eff6ff` |
| Body copy | `--content` | `#334155` |
| Border | `--border` | `#dbe4f0` |
| Accent | `--accent` | `#2563eb` |
| Accent hover | `--accent-hover` | `#1d4ed8` |
| Accent soft | `--accent-light` | `#dbeafe` |
| Accent 2 / 3 | `--accent-2`, `--accent-3` | Indigo `#4f46e5`, cyan `#0891b2` (glows / accents) |
| Code | `--code-bg`, `--code-block-bg` | `#f1f5f9` / `#1e293b` |

Accent derivatives (`--accent-ring`, `--accent-border*`, `--hero-glow*`, `--surface-tint*`) are rgba mixes from `--accent-rgb` (and secondary accents). Prefer these for focus rings, panel borders, and hero atmosphere.

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
| `--font-sans` | Inter, system UI, Open Sans, **Vazirmatn** (fallback) |
| `--font-sans-fa` | **Vazirmatn**, Inter, Open Sans |

`body:lang(fa)` switches to `--font-sans-fa`. Self-hosted under `static/fonts/` / `vendor/fonts.css` with `font-display: swap`.

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

Heroes (home, page-hero, footer) layer soft radial glows (`--hero-glow*`) over gradient washes — atmosphere, not stickers or overlay badges.

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

- Shape: pill (`--radius-pill`), min-height 42px (36px for `--sm`).
- Variants: `--primary` (ink fill → accent on hover), `--secondary` (outlined), `--accent` (accent fill).
- Modifiers: `--sm`, `--block`, groups via `.btn-group` / `--column`.
- Focus: `--focus-ring`.

### Cards (`.card`)

- Base: theme fill, border, `--radius-lg`, `--shadow-sm`.
- Variants: `--interactive`, `--accent`, `--featured`, `--tinted`, `--dashed`, `--horizontal`, `--topic` (+ `.topics-grid`).

### Panels (`.panel`)

Surfaces for sidebars and section boxes: `--tinted`, `--hero-gradient`, `--hero` (glass), `--accent`, `--sidebar` (sticky), `--section`, `--xl`, `--flush`.

### Chips (`.chip`)

Tags, filters, stats: `--default`, `--pill`, `--stat`, `--tag` (hash prefix), etc. Pill radius; bold/semibold UI sizes.

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
| **section-heading** | Eyebrows, underline accent bar, centered titles, kickers |
| **post-entry** | List/featured cards, entry links |
| **post-single** | Article chrome, TOC, meta, series nav polish |
| **timeline** | Resume / uses-style tracks (RTL-aware) |
| **breadcrumbs**, **pagination**, **search**, **archive**, **recommendations**, **social-icons** | Discovery & chrome |

Page CSS (`home`, `about-me`, `resume`, `contact`, `notes`, `reading-path`, …) should only adjust spacing and page-unique layout — reuse system + component classes first.

---

## Page patterns

### Home

- Full-bleed-feel hero with multi-stop radial glows + gradient into `--page-bg`.
- Grid: profile visual | statement (tagline `--text-display-home`, lead, CTAs).
- Sections: eyebrow + underlined section title; topic cards; recent posts; discovery panels.

### Content pages

- Often `.page-hero` (glows + lead) → boxed `.page-content` or article shell.
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
