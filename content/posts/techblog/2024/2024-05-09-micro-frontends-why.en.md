---
title: 'Micro Frontends: Why?'
date: 2024-05-09T13:55:01+03:30
lastmod: 2026-09-13T01:05:00+03:30
description: "A micro frontend is a slice of UI one team can ship without waiting on the rest of the page. That independence is the reason to do it — and the tax, once you own the shared page, the contract, and the failure modes that come with both."
layout: single
author_profile: true
url: 2024/05/09/micro-frontends-why/
shortlink: https://g.omid.dev/V8PGKKr
tags:
  - Frontend
  - Micro Frontends
  - Software Architecture
categories:
  - TechBlog
series:
  id: micro-frontends
  title: "Micro Frontends"
  order: 0
  label: "Micro Frontends: Why?"
  role: anchor
seeAlso:
  - /2024/05/09/micro-frontends-how/
  - /2024/05/11/micro-frontends-working-example/
  - /2024/05/12/micro-frontends-vs-monorepo-vs-reusable-shared-module/
---
A micro frontend is a slice of a web UI that one team can build, test, and ship without waiting on the rest of the page. Picture two teams and two pipelines on one checkout: catalog can go out on Tuesday while payments is still in review.

That independence is the whole reason to do this. It is also the cost. Someone still has to own the page those slices land on, and someone has to keep the agreement between them from rotting.

This post is the judgment: when that trade is worth it, what you are actually buying, and how the pattern fails. [How](/2024/05/09/micro-frontends-how/) is the composition method. The [working example](/2024/05/11/micro-frontends-working-example/) is the repo. Start here if you are still deciding *whether*.

## The page is the hard part

A monolith frontend has one deploy, one design system, one router, one auth cookie. Coordination happens in pull requests. For a long time that is the correct architecture. Most products never outgrow it.

The pain that shows up later is usually not "too many files." It is a shared release train. Catalog wants to ship weekly. Checkout ships monthly because payments review is slow. A design-system tweak sits in a branch for two weeks because the next monolith deploy is already packed. A hotfix for one team waits on another team's failing test. The merge queue becomes the product manager.

That is an *organizational* bottleneck wearing a technical costume. [Martin Fowler's write-up](https://martinfowler.com/articles/micro-frontends.html) named the pattern that tries to buy you out of it. The useful question is not whether the definition is tidy. It is whether your org actually has deploy boundaries that a shared repository cannot absorb.

Micro frontends buy you out of the train. Each slice has its own build and its own release. The trade is that you now have a **shell** — the host application that loads those slices — and a **contract** — the small, explicit interface they are allowed to use.

If those two things are vague, you have not split a frontend. You have distributed a monolith and added network hops.

## Do you actually have a boundary?

Before you cut the UI, ask questions you can answer with names and calendars, not with adjectives.

Who can ship without asking whom? If the honest answer is "everyone still waits on the Friday train," you do not have a boundary yet. You have a wish.

What breaks if catalog ships a bad build on Tuesday? In a real split, checkout still takes payments. In a fake split, the host is a shared bundle and both go down together.

Who owns the session, the URL, and the header? If three teams all say "we kind of do," the shell will become a junk drawer of globals.

What is the cadence mismatch, in days? "We want more autonomy" is not a number. "Checkout is blocked eight days per month by catalog's release" is.

If you cannot point at two teams, two pipelines, and one page — or at a legacy island you refuse to rewrite — stop. A monorepo with clear package boundaries, or a versioned library, will hurt less. I wrote that choice out as a standalone piece, not as the next chapter of this series: [Micro Frontends vs Monorepo vs Shared Module](/2024/05/12/micro-frontends-vs-monorepo-vs-reusable-shared-module/).

## When the cut is right

The cut is right when the pain is *release ownership*, not file count.

**Different cadences on one product.** Catalog and checkout share a customer and a domain name. They do not share a review process. A shell that can load last week's checkout next to this week's catalog is cheaper than forcing both onto one calendar.

**A legacy island you will not rewrite.** The old AngularJS catalog still prints money. The new checkout is Angular, or React, or whatever this year hired for. You are not migrating the catalog. You are hanging a new slice off the same page and letting the old one die on its own schedule. That is a strangler, not a rewrite.

**A platform surface other apps must host.** Search, chat, payments, a help widget: one team ships it, many hosts render it. The host must not take a library version bump in lockstep every time the platform team fixes a bug. A remote they load at runtime is a different relationship than an npm package they pin.

**An acquired product that has to look like one company.** You bought a dashboard. Legal wants it on your domain next quarter. Nobody is merging two five-year codebases by then. A shell plus a remote is an integration strategy. A rewrite is a fantasy schedule.

In those cases the extra shell is cheaper than the meeting. Independence is real: catalog can break its own deploy without taking checkout down with it — if the contract holds.

## When it is not

Most "we should do micro frontends" conversations are actually about sharing code.

One team, one product, one cadence: you want a monorepo or a well-versioned library, not a runtime composition layer. Shared buttons, shared auth helpers, and shared types do not become more independent because you loaded them from a second origin. They become a distributed design-system problem with worse debugging.

If the domain is one checkout with three tabs, splitting those tabs into separately deployed apps usually costs more than it saves. You still share the cart, the user, the error reporting, and the visual language. You have added three build systems to protect a boundary that is not there.

Technology diversity as a goal is a hobby. It is useful when a legacy island or a specialist team already exists. It is expensive when one squad picks four frameworks to prove they can. The companion in this series happens to host Angular and React from Qwik. That is a *demo of an interface*, not a recommendation to staff three framework guilds.

A "shared module" you load as a micro frontend is still a library. Call it a library and version it. [The Angular walkthrough](/2024/05/12/reusable-shared-module-in-angular/) is that path.

## The tax you pay even when you are right

Independence is not free. Even a justified split writes a bill you will pay every quarter.

**Two frameworks on one page.** The companion does this on purpose. In production it means two runtimes, two change-detection loops, two copies of whatever you failed to share. Time to interactive gets worse unless someone owns a performance budget for the *page*, not for each remote.

**A design system with no runtime owner.** Tokens, icons, and button states drift the first time two remotes ship a week apart. Shadow DOM on one remote and light DOM on another — which the companion also does — makes the drift visible. You will need a versioned contract for look, not only for events.

**Observability that stops at the bundle.** A user says checkout is broken. Which deploy? Which remote? If logs and error reports are per-repo and the session is per-page, you will debug by Slack. The shell needs a correlation id that remotes are required to send.

**Auth that leaked into three cookies.** Nobody wanted to own the session, so each remote grew a workaround. That is not autonomy. That is three security reviews and a logout button that lies.

**SEO and first paint, if the shell is a client-only compose.** Search and first contentful paint see whatever the host sent. Remotes that appear after JavaScript runs are invisible to the first response. That may be fine for a logged-in dashboard. It is not fine for a public catalog.

You pay this tax only if the org boundary is real. If it is not, keep the code together and split libraries instead.

## What independence actually means

People list modularity, technology diversity, team autonomy, and scalability as if they were four benefits. They are one claim with a bill attached.

Independence means three things you can point at:

1. **Build.** Each slice compiles on its own. A React change does not wait for an Angular compile, and the other way around. A red CI on catalog does not block checkout's pipeline.
2. **Deploy.** Each slice can go to production without a coordinated release of the others. If you still have one pipeline that publishes everything, you have independent folders, not independent frontends. Folders are a monorepo. Call them that.
3. **Contract.** The only things the slices share on purpose are a small interface: a custom-element tag, a handful of attributes, a named DOM event, maybe a URL scheme. Everything else — CSS, global stores, implicit `window` globals — is a leak.

If you have (1) and not (2), you have a nicer monolith. If you have (1) and (2) and a sloppy (3), you have distributed coupling: the worst properties of both sides.

## How the pattern fails

The failure modes are predictable. They are worth naming before you cut, because each one is a decision you can make on purpose instead.

The shell becomes a dumping ground for "shared" state. Two remotes both implement a cart because the contract never said who owns it. A design-system change requires a flag day across five deploys because nobody versioned the visual contract. A CSS rule in the host breaks a button in a child. Auth lives in three cookies. A remote throws on boot and takes the whole page with it because the host did not isolate the mount.

A quieter failure: the split exists only in the org chart. Five "micro frontends" still ship through one pipeline, still share one Redux store, still import each other's internals. The architecture slide says independent. The git log says otherwise.

Another quiet one: you never stop. Every new feature becomes a new remote because that is the hammer you have. You now have a distributed monolith *and* twelve repositories. The meeting you bought out of came back as a weekly "contract review."

None of this means the pattern is wrong. It means the pattern is a tool for a specific org shape. Used elsewhere, it is an expensive way to avoid saying no.

## A short checklist

You have a reason if most of these are true:

- Two or more teams already ship the same product on different clocks, or you have a legacy island you will not rewrite this year.
- You can name the shell owner and the contract owner. They might be the same person. They must be *someone*.
- You can describe what still works when one remote is down.
- You are willing to pay the tax: duplicate runtimes, design-system versioning, page-level performance, correlated errors.
- You are not doing this to share a button.

If fewer than that are true, do not start a series of remotes. Start a conversation about the release train, or about a library.

## Next

The next post is not another list of benefits. It is the composition method I actually used: a host page that loads Angular and React as custom elements, with a tiny attribute-and-event contract. An optional Rust WebAssembly helper runs *inside* the host. It is not a fourth micro frontend.

[Micro Frontends: How?](/2024/05/09/micro-frontends-how/) walks through that choice — what the browser does, what the contract includes, and what this method refuses to pretend. [The working example](/2024/05/11/micro-frontends-working-example/) is the repo and the live demo.
