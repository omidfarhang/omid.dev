---
title: "Angular Router Resources: Route Data on the Same Graph as the Screen"
date: 2026-09-22T23:40:00+03:30
description: "Router Resources (Angular 22.2, developer preview) load independent route data as a parallel resource graph. Blocking routes hand over finished values; non-blocking routes hand over Resource inputs the template can render."
layout: single
author_profile: true
url: 2026/09/22/angular-router-resources-route-data-as-a-graph/
shortlink: https://g.omid.dev/aDS5o7R
x_link: https://x.com/OmidFarhang/status/2102495150056567166
mastodon_link: https://mastodon.social/@omidfarhang/117316579421118327
bluesky_link: https://bsky.app/profile/omid.dev/post/3mw52upfx5226
linkedin_link: https://lnkd.in/p/guCZfci8
tags:
  - Angular
  - Frontend
  - TypeScript
  - Signals
  - Software Architecture
categories:
  - TechBlog
series:
  id: modern-angular
  title: "Modern Angular"
  order: 6
  label: "Router Resources"
  role: part
seeAlso:
  - /2025/12/24/angular-signals-control-theory/
  - /2026/05/25/signal-forms-model-ui-state/
  - /2026/05/26/angular-template-syntax-hidden-cost/
  - /2026/06/02/stop-modeling-angular-screens-with-five-booleans/
---
A trip detail screen needs three things that do not depend on each other: the trip, the passenger, and the seat map. Each call takes about a second. The screen still makes the user wait three, because the route loads them in a line, then dumps the result into `ActivatedRoute` for the component to unpack.

That loader sits next to a codebase that already moved. Screen state is a signal. Forms are heading toward Signal Forms. Async reads go through `resource`. The route is the part that still speaks resolver.

Angular 22.2 adds Router Resources as a developer preview so route data can join that same graph. The companion below is a small Trip Desk: same three payloads, three ways of waiting.

{{< companion
  repo="omidfarhang/example-projects"
  path="angular-router-resources"
  demoSlug="angular-router-resources"
  title="Trip Desk — Router Resources"
  description="Waterfall resolvers (~3s), parallel blocking resources (~1s), and a non-blocking route whose template renders Resource loading and error."
>}}

{{< alert type="warning" title="Developer preview" >}}
This post and the companion pin `@angular/*` to `22.2.0-rc.0`. `withRouterResources` and `nonBlocking` are public exports there. Early `22.2.0-next` builds exposed the same symbols only as `ɵ` private exports, and the `Route.resources` shape can still change before it leaves preview. Treat it as something to try on a fan-out route, and keep production resolvers until the contract settles.
{{< /alert >}}

## The route became its own island

A resolver is a function the router runs before activation. It returns a promise or an observable. The component reads `ActivatedRoute.snapshot.data`, or — with `withComponentInputBinding()` — receives the resolved value as an input. For one record the next screen cannot render without, that contract is still a good one. The page appears complete.

The island shows up when the route fans out.

The usual shape is one resolver that waits on each call before starting the next:

```ts
export const deskResolver: ResolveFn<Desk> = async (route) => {
  const id = route.paramMap.get('id') ?? 'demo';
  const trip = await loadTrip(id);
  const passenger = await loadPassenger(id);
  const seats = await loadSeatMap(id);
  return { trip, passenger, seats };
};
```

Trip, passenger, and seats do not depend on each other. The function invents a dependency by the order of the `await`s. Three one-second calls become a three-second navigation. The component then receives a bag and spreads it into fields, often beside its own `loading` and `error` flags for the next request the resolver did not cover.

There is a second, quieter waterfall. Resolvers on the **same** route already settle together. Resolvers along the **route tree** do not. The router finishes the parent before it runs the child. A shell that resolves "the account" and a child that resolves "the invoice" pay both latencies back to back, even when the invoice id was already in the URL.

After that, the data is a snapshot. Change the `:id` on a reused component and you are back in `runGuardsAndResolvers`, `onSameUrlNavigation`, and another full pass through guards. Query params do not rerun resolvers unless you opted in. The screen's `resource` would have followed a signal. The route will not, until you ask it to navigate again.

Signal Forms pulled form state onto the same graph as the rest of the screen. Router Resources are the same move for the data the URL already names.

## Route data as a parallel graph

Opt in when you configure the router. Without `withRouterResources()`, a `resources` map on a route is ignored.

```ts
provideRouter(routes, withComponentInputBinding(), withRouterResources());
```

A route then declares its data as ordinary resources. The function runs in an injection context and receives a `ResourceContext`: `params`, `queryParams`, `fragment`, and `data`, each a signal.

```ts
{
  path: 'resources/:id',
  component: ResourcesDetail,
  resources: (ctx) => ({
    trip: createTripResource(ctx.params, ctx.queryParams),
    passenger: createPassengerResource(ctx.params, ctx.queryParams),
    seats: createSeatMapResource(ctx.params, ctx.queryParams),
  }),
}
```

Each factory is a normal `resource`. Nothing here is router-specific except that the router owns the lifecycle:

```ts
export function createTripResource(params: Signal<Params>, queryParams: Signal<Params>) {
  return resource({
    params: () => ({
      id: String(params()['id'] ?? 'demo'),
      fail: parseFail(queryParams()),
    }),
    loader: ({ params: { id, fail } }) => loadTrip(id, fail),
  });
}
```

The router starts every resource in that map, and resources elsewhere on the same navigation, together. Blocking is the default. Navigation waits until each blocking resource leaves `loading`, then activates. The wait is the slowest call, which is what you wanted when the calls are independent. A parent resource and a child resource no longer stand in a queue just because one route config is nested under the other.

Two modes fall out of that, and they hand the component different things:

| Mode | How you mark it | When the route activates | What the input is |
| --- | --- | --- | --- |
| Blocking | ordinary `resource(...)` | after the slowest blocking resource settles | the unwrapped value |
| Non-blocking | `nonBlocking(resource(...))` | immediately | the `Resource<T>` itself |

Blocking is the resolver replacement: the next screen is complete, and the input type stays `Trip`. Non-blocking is the case where the shell should paint now and a panel can show its own loading and error. `nonBlocking` only tags the resource. The router then skips it in the wait, and `withComponentInputBinding()` passes the resource object through instead of `value()`.

If a blocking resource errors, the navigation fails and the user stays on the page they came from. A blocking loader can throw a `RedirectCommand` when "missing" should be a different URL, the same way a guard redirects. A non-blocking error does not cancel the navigation. It lands on `error()` for the template to render. That split is the design decision, and it should be intentional per payload.

## Three routes, one desk

The [Trip Desk](https://playground.omid.dev/examples/angular-router-resources/) loads trip, passenger, and seat map. Each fake call waits one second. There is no API. The only variable is how the route schedules the work. A readout on the shell records how long the navigation took.

**Waterfall** (`/waterfall/:id`) is three classic `ResolveFn`s, nested so the hierarchy is the bottleneck:

```ts
{
  path: 'waterfall/:id',
  resolve: { trip: tripResolver },
  children: [
    {
      path: '',
      resolve: { passenger: passengerResolver },
      children: [
        {
          path: '',
          resolve: { seats: seatsResolver },
          component: WaterfallDetail,
        },
      ],
    },
  ],
}
```

`trip` starts, then `passenger`, then `seats`. The leaf component mounts around three seconds later, with unwrapped inputs. The readout lists the order `trip → passenger → seats`. That nesting is the demo's way of making a hierarchy waterfall obvious. In an app, the same cost usually hides in one resolver that `await`s three independent calls, or in a parent resolve plus a child resolve that did not need to wait.

**Resources** (`/resources/:id`) is the map above, all blocking. The three loaders start together. The route activates after the slowest one, about one second. `ResourcesDetail` still sees plain values:

```ts
export class ResourcesDetail {
  readonly trip = input.required<Trip>();
  readonly passenger = input.required<Passenger>();
  readonly seats = input.required<SeatMap>();
}
```

From the template's point of view this is the resolver screen. `trip().code` is already there. The difference is entirely in the route: a graph of resources, started together, keyed by the same names the inputs use.

**Live** (`/resources-live/:id`) wraps each resource:

```ts
resources: (ctx) => ({
  trip: nonBlocking(createTripResource(ctx.params, ctx.queryParams)),
  passenger: nonBlocking(createPassengerResource(ctx.params, ctx.queryParams)),
  seats: nonBlocking(createSeatMapResource(ctx.params, ctx.queryParams)),
}),
```

The shell renders immediately. The inputs are resources, and the template branches on the resource:

```ts
readonly trip = input.required<Resource<Trip>>();
```

```html
@let tripRes = trip();
@if (tripRes.isLoading()) {
  <p>Loading trip…</p>
} @else if (tripRes.error()) {
  <p>{{ errorText(tripRes.error()) }}</p>
} @else if (tripRes.value(); as t) {
  <p>{{ t.code }} · {{ t.origin }} → {{ t.destination }}</p>
}
```

Try `?fail=seat` on both resource routes. **Fail (block)** rejects the navigation; the detail screen never becomes current. **Fail (live)** activates, and only the seat card shows the error. Trip and passenger still resolve. That is the reason to split modes inside one map: the seat map can be non-blocking while the trip stays blocking, if the page is nonsense without a trip and perfectly usable without a seat.

Because `params` and `queryParams` are signals, a later change to `:id` or `fail` flows into `resource.params` and the loader runs again. You do not re-activate the route to refresh one payload. On a blocking resource the component only holds the value, so a manual reload goes through the route's resource handle (`ActivatedRoute.resources`) and the binding effect pushes the next `value()` into the input. The demo does not ship a reload button; the param signal is the path it actually exercises.

## The screen model you already argued for

Blocking inputs are the boring success case, and that is the point. The router resolved the screen state before the component existed. The component stays a function of inputs. You do not grow a second loading flag "because the route might still be in flight." It is not in flight. If you later need a refresh spinner, that is a new phase of the screen, and it belongs in one model — the same discipline as [modeling the screen as one state](/2026/06/02/stop-modeling-angular-screens-with-five-booleans/) instead of `loading`, `error`, and a stale `data` field that can all be true together.

Non-blocking inputs are that post applied at the route boundary. A `Resource<T>` already has a status, a value, and an error. The template above is a small phase switch: loading, error, value. Copying those into `isLoadingTrip`, `tripError`, and `trip` recreates the five booleans one level up, with the resource as a second source of truth. Read the resource. If the panel's product states are richer than loading / error / value — an empty seat map that is a successful response, for example — derive one union from the resource and switch on that. Do not invent a parallel set of flags beside it.

This also lines up with [Signal Forms](/2026/05/25/signal-forms-model-ui-state/). A blocking passenger input can be the source model for the form. A non-blocking one cannot, until `value()` exists; binding the form during `isLoading()` is how you edit a placeholder and then watch the server copy overwrite it. Wait for the phase, then project the value into the form once.

[Template syntax](/2026/05/26/angular-template-syntax-hidden-cost/) will happily express the wrong model. `@if (tripRes.isLoading())` three times, once per card, is fine in the demo because each card is one resource. A single screen that mixes three resources, a form, and a submit flag needs a named state per region, or the template becomes the place where impossible combinations are negotiated. The route can deliver a clean `Resource`. It cannot stop a template from unpacking it into flags.

One boundary is worth stating. Router Resources answer "what does this URL need, and must navigation wait?" They are a weak place for a client cache shared by three routes, and a noisy place for a store that already loads when its id signal changes. If the store is the source of truth and the page should paint immediately, start the store from the route and let the component read the store. A blocking resource wrapped around a store that was already going to load is a second waiter on a job that has a waiter. Use that wrapper when the router truly must hold the navigation. Otherwise you have two graphs pretending to be one.

## What I would migrate

Leave the trivial resolver. A route that loads one document and must not render without it is already doing the right thing. Rewriting it onto a preview API buys a newer import and the same user-visible wait.

Migrate the fan-out. If you can point at a resolver that `await`s independent calls, or a parent and child that each wait on data the URL already contains, that route is the candidate. Replace the chain with a `resources` map of blocking resources, keep `input.required<T>()` on the component, and check the timing. The companion's drop from about three seconds to about one second is the whole argument, with the delays exaggerated so you can see it without a network panel.

Use `nonBlocking` for the panel that is allowed to be late: recommendations under a product, a seat map beside a trip that is already on screen, a secondary card. Keep the payload the page cannot show without on the blocking side. Add `?fail=` behavior on purpose. Blocking failure cancels navigation; non-blocking failure is UI. Teams get surprised when they flip a resource to `nonBlocking` and their "redirect on 404" stops running, because the router is no longer waiting to hear about the error.

Two preview details are easy to copy wrong.

On `22.2.0-next.5`, a resource that already had a `defaultValue` did not block. The router treated "a value is present" as "navigation may proceed," so `httpResource`'s default placeholder skipped the wait. The release candidate this companion pins waits on `isLoading()` and on error, so a placeholder no longer short-circuits that wait. I would still omit `defaultValue` on anything you need the router to block on. Preview means that check can move again, and a placeholder value is a bad reason to activate a page.

Early next builds required `ɵwithRouterResources as withRouterResources` and a module augmentation because `resources` was not on the public `Route` type yet. `22.2.0-rc.0` exports `withRouterResources` and `nonBlocking` directly, and `Route.resources` is in the public types. The developer-preview tag is still on the API. Pin the version you tried, and expect to revisit the import when 22.2 stabilizes.

## The question the route should answer

The useful question is the one the rest of this series keeps asking of screens and forms.

Is this data in the same reactive model as the screen?

If the URL names it, the route can own the read: a resource per payload, started together, blocking only where the next page is a lie without the value. The component then receives either a finished input or a `Resource` whose status is the phase. Both are one model. A resolver bag plus a handful of booleans is two, and they drift.

Open the Trip Desk, hit Waterfall, then Resources, then Live. The numbers on the readout are the schedule. The input types are the model. Pick the schedule on purpose.

## Further reading

- [Router Resources: Loading Data with the Angular Router](https://www.angulararchitects.io/en/blog/router-resources-loading-data-with-the-angular-router/) — Manfred Steyer's write-up against `22.2.0-next.5` (Flights42, the `ɵ` imports, and the `defaultValue` blocking quirk on that build).
- [Async reactivity with resources](https://angular.dev/guide/signals/resource) — the `resource` the route is now allowed to hold.
- [Angular Signals and Control Theory](/2025/12/24/angular-signals-control-theory/) — the series anchor.
- [Signal Forms and UI State Modeling](/2026/05/25/signal-forms-model-ui-state/).
- [Stop Modeling Angular Screens with Five Booleans](/2026/06/02/stop-modeling-angular-screens-with-five-booleans/).
- Trip Desk source: [`examples/angular-router-resources`](https://github.com/omidfarhang/example-projects/tree/master/examples/angular-router-resources).
