---
title: "Content Security Policy (CSP) and Angular: Practical Patterns"
date: 2026-07-15T00:50:00+03:30
description: "Ship CSP for Angular without breaking the build: report-only first, nonces via autoCsp or ngCspNonce, nginx/Apache/Cloudflare headers, and a small scanner for inline handlers, eval, and other footguns."
layout: single
author_profile: true
url: 2026/07/15/csp-and-angular-practical-patterns/
tags:
  - Angular
  - Frontend
  - Security
  - TypeScript
  - Software Architecture
  - CSP
  - XSS
categories:
  - TechBlog
seeAlso:
  - /2026/07/31/modern-auth-patterns-for-angular-frontends/
  - /2026/07/29/why-client-side-frameworks-need-security-updates/
  - /2024/05/31/design-patterns-in-angular-enhancing-code-quality-and-maintainability/
---

Angular already sanitizes template bindings. That is necessary and still not enough. XSS keeps showing up through supply-chain scripts, sanitizer edge cases, and the occasional `bypassSecurityTrustHtml` that “was only temporary.” Content Security Policy is the browser-level seatbelt: even if a payload reaches the DOM, the browser refuses to execute script the policy does not allow.

CSP is repeatedly listed as a must-have for Angular apps. Many write-ups still skip the Angular-specific parts: dynamic styles the runtime injects, critical CSS inlining, `autoCsp` / `ngCspNonce` / `CSP_NONCE`, and the temptation to “just add `unsafe-inline` and `unsafe-eval` so the build works.”

This post is the practical path: start in **report-only**, teach Angular about nonces, put headers on the reverse proxy or CDN, then tighten until production does not need the unsafe keywords. A small companion scanner helps find the usual code-level footguns before you flip enforcement on.

{{< companion
  repo="omidfarhang/example-projects"
  path="angular-csp-scanner"
  title="angular-csp-scanner"
  description="Dependency-free Node scanner for Angular CSP footguns, plus nginx/Apache/Cloudflare header samples. Source-only CLI."
  label="Open companion on GitHub"
>}}

## The Short Version

1. Emit `Content-Security-Policy-Report-Only` first. Read the reports. Do not enforce a fantasy policy on day one.
2. Give Angular a **per-request nonce** (`autoCsp`, `ngCspNonce`, or `CSP_NONCE`) so framework-injected `<style>` / scripts match your header.
3. Prefer **hashed bundles from `'self'`** over inline script. Kill `onclick=`, `javascript:` URLs, `eval`, and string timers.
4. Put the real header on **nginx / Apache / Cloudflare** (ideally mint the nonce at the edge). Keep HTML short-TTL when nonces are per request.
5. Treat `unsafe-inline` / `unsafe-eval` as temporary scaffolding, not a destination.

CSP does not replace Angular’s sanitizer or server-side auth. It limits what XSS can *do* after something goes wrong — the same defense-in-depth idea as keeping tokens out of `localStorage` in [Modern Auth Patterns for Angular Frontends](/2026/07/31/modern-auth-patterns-for-angular-frontends/).

## Why Angular Needs Extra CSP Care

A brand-new Angular app’s minimum policy, from the [Angular security guide](https://angular.dev/best-practices/security), looks like this:

```
default-src 'self';
style-src 'self' 'nonce-randomNonceGoesHere';
script-src 'self' 'nonce-randomNonceGoesHere';
```

That nonce is not decoration. Angular injects styles (and, with some CLI features, scripts) at runtime. Without a matching nonce on those tags **and** in the CSP header, a strict policy breaks the UI even when your application code is clean.

You can supply the nonce in three supported ways:

| Approach | When to use |
| --- | --- |
| `autoCsp: true` in `angular.json` | Prefer this when the CLI can manage CSP for the build. |
| `ngCspNonce="…"` on `<app-root>` | Server or edge can rewrite `index.html` and the header together. |
| `CSP_NONCE` injection token | You have the nonce at bootstrap and want a cacheable `index.html` — **not** if you also inline critical CSS. |

```ts
import { bootstrapApplication, CSP_NONCE } from '@angular/core';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
  providers: [{ provide: CSP_NONCE, useValue: globalThis.myRandomNonceValue }],
});
```

Nonces must be **unique per request** and unpredictable. If a CDN caches HTML that already contains a fixed nonce, every visitor shares the same “secret” and CSP stops meaning anything. Prefer minting the nonce at the **edge** and rewriting the document on the way out. Origin-generated nonces are only safe when that HTML is never shared across users via cache.

### `unsafe-inline` and `unsafe-eval` — the trap

They make demos green. They also punch a hole in the policy:

- **`unsafe-inline` (scripts)** — classic XSS payloads become executable again.
- **`unsafe-eval`** — `eval`, `new Function`, and string-based `setTimeout` / `setInterval` work again. Strict CSP wants none of that.

For styles, Angular’s docs note that if you truly cannot do nonces, `'unsafe-inline'` on `style-src` is a weaker fallback. Prefer nonces. For scripts, treat `unsafe-inline` / `unsafe-eval` as report-only training wheels you remove before enforce mode.

## From Report-Only to Production

### Week 0 — inventory

Run the companion scanner against your workspace:

```bash
cd examples/angular-csp-scanner
npm start -- /path/to/your/angular/app
```

It walks `angular.json` plus templates and TypeScript and flags patterns that fight CSP: inline handlers, `javascript:` URLs, `eval`-like constructs, missing `autoCsp`, inline `<script>` in `index.html`, and `bypassSecurityTrust*` (relevant once you enable Trusted Types).

Fix the **error** findings first. Warnings tell you where Trusted Types or style policy will get interesting later.

### Week 1 — report-only headers

Ship a deliberately permissive **report-only** policy so nothing breaks:

```
Content-Security-Policy-Report-Only:
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https:;
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self' https:;
  report-uri /csp-report
```

Wire `report-uri` / `report-to` to something you actually read (your own collector, report-uri.com, etc.). Use `ng serve` headers in `angular.json` for local iteration — the fixture app in the companion does exactly that.

### Week 2 — Angular nonces

Enable one of:

```json
{
  "projects": {
    "app": {
      "architect": {
        "build": {
          "options": {
            "autoCsp": true
          }
        }
      }
    }
  }
}
```

or edge-injected:

```html
<app-root ngCspNonce="{{nonce}}"></app-root>
```

If production uses **critical CSS inlining**, prefer `autoCsp` or `ngCspNonce` over `CSP_NONCE` alone — Angular’s docs call this out explicitly.

### Week 3 — tighten script-src

Remove `'unsafe-eval'`. Replace remaining string timers with function forms. Remove inline scripts from `index.html` (move config to JSON endpoints or build-time `environment` files).

Then remove `'unsafe-inline'` from `script-src`, keeping `'nonce-…'` and optionally `'strict-dynamic'` so nonce-trusted scripts may load their children without listing every host.

Expand `connect-src`, `img-src`, and `font-src` only for origins you can name. Third-party analytics and chat widgets are usually where policies stall — either host a subset yourself, load them through a tag manager you accept in the policy, or drop them.

### Week 4 — enforce

Rename the header to `Content-Security-Policy`. Keep reporting on. Watch for a release that reintroduces an inline snippet or a new CDN host.

Optional next layer from the same Angular security guide: Trusted Types (`trusted-types angular; require-trusted-types-for 'script'`), plus `angular#unsafe-bypass` only if you truly need DomSanitizer bypass APIs.

## Headers on the Reverse Proxy / CDN

CSP belongs on the **document** response. Static hashed JS/CSS can be cached hard; HTML that carries a nonce should not be.

### nginx

```nginx
# Illustrative — mint a real random nonce at the edge when you can.
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'nonce-$csp_nonce' 'strict-dynamic'; style-src 'self' 'nonce-$csp_nonce'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self' https://api.example.com; frame-ancestors 'none'; base-uri 'self'; object-src 'none'; report-uri /csp-report" always;
```

Full sample: companion [`samples/nginx-csp.conf`](https://github.com/omidfarhang/example-projects/blob/master/examples/angular-csp-scanner/samples/nginx-csp.conf).

### Apache

Use `Header always set Content-Security-Policy-Report-Only "…"` while learning, then switch the header name. Sample: [`samples/apache-csp.conf`](https://github.com/omidfarhang/example-projects/blob/master/examples/angular-csp-scanner/samples/apache-csp.conf).

### Cloudflare

Prefer a Worker or Response Header Transform that:

1. generates a nonce,
2. sets the CSP header with that nonce,
3. rewrites `ngCspNonce` (and any inline tags you still need) to match,

so the nonce is not frozen inside a cached origin HTML object. Notes: [`samples/cloudflare-csp.md`](https://github.com/omidfarhang/example-projects/blob/master/examples/angular-csp-scanner/samples/cloudflare-csp.md).

## Angular-Side Habits That Keep CSP Happy

```html
<!-- Avoid -->
<button onclick="save()">Save</button>
<a href="javascript:void(0)">Menu</a>

<!-- Prefer -->
<button type="button" (click)="save()">Save</button>
<button type="button" (click)="openMenu()">Menu</button>
```

```ts
// Avoid — needs unsafe-eval
const fn = new Function('return 1');
setTimeout('doWork()', 0);

// Prefer
setTimeout(() => doWork(), 0);
```

Keep third-party scripts off random inline snippets. If a vendor demands `unsafe-inline`, isolate them behind a tighter subdomain or drop the vendor — do not weaken the whole app policy forever because one pixel script is stubborn.

And remember the lesson from [framework security updates](/2026/07/29/why-client-side-frameworks-need-security-updates/): CSP is defense in depth. It does not excuse staying on vulnerable Angular versions or treating template sanitization as optional.

## What the Companion Demonstrates

[`angular-csp-scanner`](https://github.com/omidfarhang/example-projects/tree/master/examples/angular-csp-scanner) is intentionally small:

- a CLI that exits non-zero on error-level findings (CI-friendly),
- a messy `fixtures/sample-app` so you can see every rule fire,
- nginx / Apache / Cloudflare snippets you can copy into a reverse-proxy setup.

It will not prove your production policy is perfect. It will catch the mistakes that make “we tried CSP and Angular broke” stories almost always true.

## Final Thought

CSP for Angular is less about memorizing directive names and more about a delivery pipeline: report-only → nonces the framework understands → headers at the proxy → delete unsafe keywords → enforce. Do that in order, and CSP stops being a mythical header someone pastes into `index.html` and becomes a measurable control you can operate.

## Further Reading & References

- [Angular security — Content Security Policy](https://angular.dev/best-practices/security#content-security-policy)
- [MDN — Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)
- [web.dev — Content Security Policy](https://web.dev/articles/csp)
- Companion: [omidfarhang/example-projects — angular-csp-scanner](https://github.com/omidfarhang/example-projects/tree/master/examples/angular-csp-scanner)
