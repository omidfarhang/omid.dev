---
title: 'Migrating an Existing Project from Pure CSS and Bootstrap to Tailwind CSS: A Comprehensive Guide'
date: 2024-05-22T20:07:46+03:30
layout: single
author_profile: true
url: 2024/05/22/migrate-css-bootstrap-to-tailwind/
shortlink: https://g.omid.dev/NAYZx0q
tags:
  - Frontend
  - development
  - css
  - tailwind
  - migrate

categories:
  - TechBlog
---
Migrating from Bootstrap and custom CSS to Tailwind is not just a search-and-replace exercise. The hard part is preserving product intent: spacing, responsive behavior, states, brand colors, shadows, and the little overrides that accumulated while the application was evolving.

The companion demo for this post now uses a small CRM dashboard and pricing page instead of a single button or card. That gives us a more realistic migration surface: navigation, hero content, metric cards, status badges, a pipeline list, pricing cards, responsive layout, and custom brand styling.

{{< companion
  repo="omidfarhang/example-projects"
  path="bootstrap-to-tailwind-migration"
  demoSlug="bootstrap-to-tailwind-migration"
>}}

## When the Migration Is Worth It

Bootstrap is excellent when you want a reliable component system quickly. The tradeoff appears later, when product design starts diverging from Bootstrap defaults and the codebase grows a second styling layer of overrides:

- `btn-primary`, `card`, `badge`, `container`, and grid classes define the base structure.
- Local CSS changes colors, border radius, shadows, spacing, and special states.
- Components become hard to reason about because the final design is split across framework classes and custom selectors.

Tailwind is useful when you want those design decisions to be explicit at the point of use, or when your team is building a product-specific design system rather than a Bootstrap-themed application.

It is not automatically better. Tailwind can make markup noisy, and teams still need conventions for repeated patterns. The goal is not to eliminate every abstraction. The goal is to move from implicit framework defaults plus scattered overrides to a clearer design vocabulary.

## The Demo Scenario

The `before-bootstrap` page represents a common starting point:

- Bootstrap handles the navbar, grid, cards, badges, buttons, progress bar, spacing helpers, and responsive columns.
- A local `<style>` block adds product-specific tokens such as brand color, rounded cards, soft shadows, hero background, status dots, and custom buttons.
- The page works, but the real visual language lives partly in Bootstrap and partly in custom CSS.

The `after-tailwind` page keeps the same UI and rewrites the styling with Tailwind:

- Bootstrap component classes are replaced with utilities.
- Repeated brand values move into a small Tailwind theme extension.
- Responsive behavior is expressed with prefixes such as `md:` and `lg:`.
- The local CSS layer mostly disappears.

That is the important comparison: not "Bootstrap button vs Tailwind button", but "same product screen, different styling architecture".

## Migration Workflow

### 1. Audit Before Rewriting

Start by listing the Bootstrap surfaces in the page or component. In the demo, those surfaces include:

- Layout: `container`, `row`, `col-*`, `d-flex`, `gap-*`, `align-items-*`
- Components: `navbar`, `card`, `badge`, `btn`, `progress`
- Utilities: `py-*`, `mb-*`, `text-*`, `fw-*`, `rounded-*`, `shadow-*`
- Custom selectors: `.hero-card`, `.metric-card`, `.btn-brand`, `.pipeline-row`

This audit prevents a common migration mistake: changing the visual design while changing the styling system. First preserve behavior and appearance, then improve the design if needed.

### 2. Install Tailwind

For a production app, install Tailwind through your build pipeline:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Configure the files Tailwind should scan:

```js
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          600: '#4f46e5',
          800: '#3730a3',
        },
      },
      boxShadow: {
        soft: '0 1.25rem 3rem rgba(15, 23, 42, 0.08)',
      },
    },
  },
  plugins: [],
};
```

The demo uses the Tailwind CDN so it can run as a plain static example, but the production setup should use the compiled Tailwind output.

### 3. Move Design Tokens First

Before converting every class, identify the values that carry product identity:

- Brand colors
- Border radius
- Shadows
- Font scale
- Container widths
- Repeated state colors

In the Bootstrap version, the custom `--brand` color and soft card shadow appear in CSS. In Tailwind, repeated values belong in `tailwind.config.js`; one-off values can stay as utilities.

For example, the Bootstrap version has a custom brand button:

```html
<button class="btn btn-brand text-white">
  Start trial
</button>
```

The Tailwind version makes the same states explicit:

```html
<a class="rounded-full bg-brand-600 px-5 py-2.5 text-white hover:bg-brand-800">
  Start trial
</a>
```

### 4. Migrate One Surface at a Time

Do not migrate the whole app in one pass. Pick stable UI surfaces and convert them in slices:

1. Navigation and shell layout
2. Hero section and primary calls to action
3. Cards and metric summaries
4. Tables, lists, and badges
5. Forms and interactive states
6. Modals, dropdowns, and JavaScript-driven components

This order keeps visual regressions easier to review. It also lets you decide where Tailwind utility strings are acceptable and where your framework components should hide repetition.

### 5. Translate Layout Carefully

Bootstrap's grid is often the most mechanical part of the migration, but it is still worth checking behavior at each breakpoint.

Bootstrap:

```html
<section class="row align-items-center g-4 g-lg-5">
  <div class="col-lg-6">...</div>
  <div class="col-lg-6">...</div>
</section>
```

Tailwind:

```html
<section class="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
  <div>...</div>
  <div>...</div>
</section>
```

Both are valid. The Tailwind version makes the breakpoint and spacing decisions more visible, while Bootstrap gives you a familiar grid vocabulary.

### 6. Replace Components With Intent, Not Just Classes

Some Bootstrap classes map cleanly:

- `card` becomes `rounded-* bg-white shadow-*`
- `badge` becomes `rounded-full px-* py-* text-* bg-*`
- `btn` becomes `rounded-* px-* py-* font-*`
- `text-secondary` becomes `text-slate-500` or `text-slate-600`

But not every conversion should stay inline forever. If the same card shell appears everywhere, create a component in your framework:

```jsx
function Panel({ children }) {
  return <section className="rounded-[1.5rem] bg-white p-6 shadow-soft lg:p-10">{children}</section>;
}
```

That keeps Tailwind expressive without forcing every page to repeat long class strings.

### 7. Replace JavaScript-Driven Bootstrap Components

Tailwind does not ship JavaScript behavior for dropdowns, modals, tabs, or collapsible navbars. If your Bootstrap app depends on `bootstrap.bundle.js`, plan replacements before deleting it.

Good options:

- Use your framework's state management for simple interactions.
- Use Headless UI, Radix UI, React Aria, or similar libraries for accessible primitives.
- Keep Bootstrap JavaScript temporarily only for components that have not migrated yet.

The demo avoids complex JavaScript so the styling comparison stays focused, but a production migration should inventory Bootstrap JS usage early.

## Review Checklist

Before removing Bootstrap from a real app, verify:

- The migrated page matches the original at mobile, tablet, and desktop breakpoints.
- Hover, focus, active, disabled, loading, and error states still exist.
- The compiled CSS size is measured after Tailwind content scanning is configured.
- Repeated utility patterns have been promoted into components or theme tokens where appropriate.
- Bootstrap JavaScript dependencies have replacements.
- Visual regression screenshots or Storybook stories cover the high-traffic surfaces.

## Useful Tools

- **Tailwind CSS IntelliSense** for autocomplete and class linting in the editor.
- **Prettier Plugin for Tailwind CSS** to keep class order consistent.
- **Storybook or Ladle** to review migrated components in isolation.
- **Playwright or Cypress screenshots** to catch layout regressions across breakpoints.
- **Bundle analyzer tools** to confirm Bootstrap CSS and JavaScript are actually gone.

## Conclusion

A meaningful Bootstrap-to-Tailwind migration is less about syntax and more about ownership of design decisions. Bootstrap gives you productive defaults; Tailwind gives you a lower-level vocabulary for building your own system.

Use the companion demo as a small checklist: migrate layout, components, custom CSS, responsive behavior, and repeated brand values while keeping the product screen the same. Once the Tailwind version reaches parity, you can remove Bootstrap with much more confidence.
