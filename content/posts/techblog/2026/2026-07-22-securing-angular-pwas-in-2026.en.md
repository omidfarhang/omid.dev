---
title: "Securing Angular PWAs in 2026"
date: 2026-07-22T00:42:00+03:30
description: "Security for Angular Progressive Web Apps: HTTPS and service worker scope, cache strategies that do not leak auth-dependent data, and offline sessions without raising XSS or CSRF risk."
layout: single
author_profile: true
url: 2026/07/22/securing-angular-pwas-in-2026/
shortlink: https://g.omid.dev/oWtGa46
x_link: https://x.com/OmidFarhang/status/2083187408116588732
mastodon_link: https://mastodon.social/@omidfarhang/117014894322830381
bluesky_link: https://bsky.app/profile/omid.dev/post/3mrx3oxdw622b
linkedin_link: https://www.linkedin.com/posts/omidfarhang_securing-angular-pwas-in-2026-activity-7488953307118465024-6UWh
tags:
  - Angular
  - Frontend
  - Security
  - TypeScript
  - Software Architecture
  - PWA
  - Service Workers
categories:
  - TechBlog
seeAlso:
  - /2026/07/31/modern-auth-patterns-for-angular-frontends/
  - /2026/07/15/csp-and-angular-practical-patterns/
  - /2026/07/18/dependency-risk-sboms-and-automated-security-for-angular/
  - /2026/07/29/why-client-side-frameworks-need-security-updates/
---

Progressive Web Apps sell reliability: installable shells, offline reads, background sync when the network returns. Angular’s `@angular/service-worker` makes that easy to turn on. Security does not get the same one-liner. A service worker sits between your app and the network with a long-lived cache — which means it can also sit between an attacker and your users’ private data if you treat “offline” as “store everything.”

Industry checklists already call out [HTTPS everywhere, including service worker scope](https://www.jit.io/resources/app-security/angular-security-8-measures-to-implement-today), and auth guidance keeps warning against patterns that [inflate XSS and CSRF risk when sessions go offline](https://dev.to/kristiyanvelkov/angular-security-best-practices-guide-in3). This post is the Angular-shaped version: enforce TLS and a tight SW scope, cache only what is safe to replay, and keep offline UX without parking bearer tokens in IndexedDB.

## The Short Version

1. **HTTPS only** — service workers require a secure context. Do not carve exceptions for “just staging” or mixed-content APIs inside the SW scope.
2. **Narrow scope** — register the worker at the path you mean; never let it control `/` if the sensitive app lives under `/app/` and marketing lives elsewhere (or the reverse).
3. **Cache public shells, not private payloads** — `ngsw-config` asset groups for static bundles; **never** cache authenticated API responses by default.
4. **Sessions stay cookie-shaped** — prefer HttpOnly BFF cookies over JWTs in storage; offline means *read last-known non-sensitive UI state*, not *replay a stolen bearer token later*.
5. **Logout must clear caches** — uninstalling mental models is not enough; purge runtime caches and sensitive IndexedDB on sign-out.

Pair this with [modern auth patterns](/2026/07/31/modern-auth-patterns-for-angular-frontends/) and [CSP](/2026/07/15/csp-and-angular-practical-patterns/). A PWA without those two is a fast offline XSS delivery vehicle.

## HTTPS and Service Worker Scope

Browsers only register service workers in a [secure context](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts) (HTTPS, or `localhost` for development). That is not a paperwork requirement — it is the control that stops a network attacker from injecting a worker that rewrites every subsequent navigation.

Practical checklist:

- Terminate TLS at the edge (or origin) for every host that serves the Angular app **and** every API origin the worker might proxy or cache.
- Redirect HTTP → HTTPS before the app boots; do not rely on the SW to “upgrade” insecure navigations after the fact.
- Set `Strict-Transport-Security` on the app origin so browsers refuse to fall back.
- Keep third-party scripts and fonts on HTTPS too — mixed content will break installs and confuse cache behavior.

### Scope is a security boundary

The service worker’s **scope** is the URL prefix it can intercept. Angular’s default places `ngsw-worker.js` at the app root, so scope is typically `/`. That is fine for a single-origin SPA. It is dangerous when one origin hosts:

- a marketing site,
- an admin app,
- and a customer PWA

…and a single worker can claim all of them.

Prefer deploying the installable app on its own origin or path. Service worker scope defaults to the directory that contains the worker script — so where you place `ngsw-worker.js` matters as much as how you register it:

```ts
import { isDevMode } from '@angular/core';
import { provideServiceWorker } from '@angular/service-worker';

bootstrapApplication(AppComponent, {
  providers: [
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000',
      // scope follows the worker script’s directory unless you override it
    }),
  ],
});
```

Deploy so `ngsw-worker.js` lives under the path you intend to control (for example `/app/ngsw-worker.js` → scope `/app/`). Do not register a root-scoped worker “for convenience” on a shared host.

Also verify `ngsw.json` / asset hashes after deploy. A stale worker serving an old compromised bundle is a persistence mechanism — treat SW updates like security updates ([framework patches](/2026/07/29/why-client-side-frameworks-need-security-updates/) apply here too).

## Safe Caching: What Must Never Hit the Cache

Angular’s service worker config splits concerns into **asset groups** (versioned app shell) and **data groups** (runtime URL patterns). Security lives mostly in what you put in `dataGroups`.

```json
{
  "assetGroups": [
    {
      "name": "app",
      "installMode": "prefetch",
      "resources": {
        "files": ["/favicon.ico", "/index.html", "/manifest.webmanifest"],
        "versionedFiles": ["/**/*.css", "/**/*.js"]
      }
    },
    {
      "name": "assets",
      "installMode": "lazy",
      "updateMode": "prefetch",
      "resources": {
        "files": ["/assets/**"]
      }
    }
  ],
  "dataGroups": [
    {
      "name": "public-catalog",
      "urls": ["/api/public/**"],
      "cacheConfig": {
        "strategy": "performance",
        "maxSize": 50,
        "maxAge": "6h",
        "timeout": "5s"
      }
    }
  ]
}
```

Rules of thumb:

| Cache this | Do not cache this |
| --- | --- |
| Fingerprinted JS/CSS, icons, public marketing APIs | `/api/me`, invoices, messages, anything behind auth |
| Public catalog GETs with short `maxAge` | Responses that vary by `Cookie` / `Authorization` |
| Offline “empty state” shells | POSTs, GraphQL mutations, anything with side effects |

### Why “cache API for offline” leaks

If the SW caches `GET /api/me/orders` while Alice is logged in, and Bob later uses the same browser profile (shared device, kiosk, family laptop), Bob may see Alice’s cached JSON — even after Alice “logged out” in the SPA — unless you explicitly clear those caches.

Worse: a cache keyed only by URL ignores that the same URL returns different bodies per session. Auth-dependent GETs are **personalized**. Personalized responses and long-lived HTTP caches do not mix.

Prefer:

- **Network-only** for authenticated APIs (default: omit them from `dataGroups`).
- **Explicit offline stores** you control (IndexedDB with a clear schema and wipe-on-logout) for read-only drafts or last-known public content — not for secrets.
- **Freshness over cleverness** — `freshness` strategy with short `maxAge` if you must cache semi-public lists; still avoid per-user endpoints.

Push notifications and background sync deserve the same scrutiny: the payload should be a pointer (“you have a new message”), not the message body with PII, unless the notification channel is encrypted end-to-end and access-controlled.

## Tokens and Sessions Offline Without Raising XSS/CSRF Risk

The tempting offline auth pattern is:

1. Store a long-lived JWT in `localStorage` or IndexedDB.
2. Let the SW attach it when the network returns.
3. Call that “offline-first auth.”

That pattern maximizes blast radius. Any XSS in the origin (or a compromised dependency, or a sanitizer bug) can read storage and exfiltrate the token. A service worker that helpfully retries with that token turns a momentary XSS into automated abuse after the tab closed.

### Prefer the BFF cookie model — even for PWAs

The same conclusion as [Modern Auth Patterns for Angular Frontends](/2026/07/31/modern-auth-patterns-for-angular-frontends/) applies harder when a SW is present:

- Keep access/refresh tokens **server-side** (BFF or reverse-proxy session).
- Give the browser an **HttpOnly, Secure, SameSite** session cookie.
- Let Angular call same-origin APIs with `withCredentials`; do not put bearer tokens in JS-readable storage “for offline.”

Offline then means:

- The **app shell** loads from cache.
- **Non-sensitive** last-view state may load from IndexedDB (UI preferences, public content, draft text the user typed).
- **Mutations and private reads** wait for network + a live session cookie.
- On reconnect, the BFF refreshes server-side tokens; the SPA never held them.

If the session cookie expired while offline, show a clear “sign in when you are back online” state. Do not invent a second credential store in IndexedDB to paper over expiry.

### CSRF still exists offline → online

Cookie sessions reintroduce CSRF for state-changing requests. Angular’s built-in XSRF support (cookie + header) still applies when the app comes back online. Ensure:

- mutating requests send the XSRF header,
- the BFF rejects missing/invalid CSRF tokens,
- `SameSite` is at least `Lax` (prefer `Strict` where the UX allows).

A service worker must not strip or rewrite CSRF headers on replayed requests. If you implement custom fetch handling outside `ngsw`, preserve security headers verbatim.

### IndexedDB is not a vault

Anything your JavaScript can read, XSS can read. IndexedDB encryption with a key also stored in JS is theater. Use IndexedDB for:

- offline drafts the user already typed,
- cached public resources,
- feature flags that are not secrets,

…and wipe on logout:

```ts
async function clearClientState(): Promise<void> {
  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(registrations.map((r) => r.unregister()));

  if ('caches' in globalThis) {
    const keys = await caches.keys();
    await Promise.all(keys.map((k) => caches.delete(k)));
  }

  // Delete known IndexedDB databases your app opened
  // indexedDB.deleteDatabase('app-offline');
}
```

Call that from your logout path **and** when you detect an account switch. Leaving a warm cache after logout is the classic shared-device failure mode for PWAs.

## Hardening Checklist for Angular PWAs

| Control | Why |
| --- | --- |
| HTTPS + HSTS on app and API hosts | SW registration and no mixed-content footguns |
| Explicit SW scope | Prevent one worker from owning unrelated paths |
| Asset groups only for static shell | Offline UX without private data |
| No auth APIs in `dataGroups` | Stop cross-user cache leaks |
| HttpOnly session (BFF), not JWTs in storage | Limit XSS exfiltration |
| XSRF header on mutations | Cookie sessions need CSRF defense |
| Logout clears caches + IDB + SW | Shared device / account switch safety |
| CSP on the app origin | Contain XSS that would target storage and SW ([CSP post](/2026/07/15/csp-and-angular-practical-patterns/)) |
| Keep `@angular/service-worker` updated | SW bugs are security bugs |

## What “Good Offline” Looks Like in Practice

A secure Angular PWA in 2026 feels like this to the user:

- Opens instantly from the cached shell.
- Shows **public** or **explicitly consented** offline content.
- Queues **non-sensitive** drafts locally if you choose to.
- Refuses to pretend private dashboards are available without a live, server-validated session.
- On logout or “clear data,” actually clears data.

That is a product constraint as much as a security one. Sell offline for the parts of the product that are safe offline. Do not stretch “installable” into “credentials live forever in the browser.”

## Final Thought

Angular PWAs inherit every SPA threat model and add a privileged, persistent client proxy: the service worker. Secure them by enforcing HTTPS and scope, caching only impersonal assets, and keeping sessions in HttpOnly cookies with CSRF protection — then treat logout as a cache-eviction event, not a UI label. Offline is a feature. Silent persistence of auth-dependent data is an incident waiting for a shared laptop.

## Further Reading & References

- [JIT — Angular security: 8 measures to implement today](https://www.jit.io/resources/app-security/angular-security-8-measures-to-implement-today)
- [Angular security best practices guide (DEV)](https://dev.to/kristiyanvelkov/angular-security-best-practices-guide-in3)
- [Angular service worker / PWA guide](https://angular.dev/ecosystem/service-workers)
- [MDN — Secure contexts](https://developer.mozilla.org/en-US/docs/Web/Security/Secure_Contexts)
- [MDN — Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- Related: [Modern Auth Patterns for Angular Frontends](/2026/07/31/modern-auth-patterns-for-angular-frontends/), [CSP and Angular](/2026/07/15/csp-and-angular-practical-patterns/), [Why Client-Side Frameworks Need Security Updates](/2026/07/29/why-client-side-frameworks-need-security-updates/)
