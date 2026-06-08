---
title: "Why Your Frontend Tests Flake and How to Fix Them for Good"
date: 2026-06-08T02:00:00+03:30
description: "A practical guide to reducing flaky frontend tests by improving isolation, waiting strategies, deterministic fixtures, test data, clocks, network control, and CI diagnostics."
layout: single
author_profile: true
url: 2026/06/08/why-your-frontend-tests-flake-and-how-to-fix-them-for-good/
# x_link:
# mastodon_link:
# bluesky_link:
# linkedin_link:
tags:
  - Frontend
  - Testing
  - E2E Testing
  - Test Automation
  - CI
  - Playwright
  - Cypress
  - Angular
  - Maintainability

categories:
  - TechBlog
---
Flaky tests are worse than failing tests.

A failing test tells the team something broke. A flaky test teaches the team to negotiate with reality:

- "Run it again."
- "CI is weird today."
- "It passes locally."
- "That test always fails on Mondays."
- "Merge it, the failure is unrelated."

That is how a test suite loses authority. The first few flakes feel harmless. Then people stop reading failures carefully. Then a real regression hides inside the noise.

Frontend tests are especially vulnerable because they sit on top of many moving parts: rendering, routing, animation, browser APIs, network requests, timers, storage, data setup, and CI machines with different performance profiles. But flaky frontend tests are not random magic. They usually come from a small set of causes.

The fix is not to delete every slow test. The fix is to remove uncertainty from the test environment.

## Flaky Means Uncontrolled

A flaky test is a test whose result changes even though the product behavior did not intentionally change.

That usually means the test depends on something it does not control:

- time;
- network speed;
- request order;
- shared data;
- test execution order;
- browser state;
- animation timing;
- random values;
- CPU availability;
- third-party services;
- assumptions about when the UI is "ready."

Once you see flakiness as uncontrolled input, the solution becomes clearer. Do not ask, "Why did CI betray us?" Ask:

> What variable did this test accidentally depend on?

## The Worst Fix: Longer Sleeps

The classic flaky-test patch is this:

```ts
await page.waitForTimeout(3000);
```

Or in Cypress:

```ts
cy.wait(3000);
```

This sometimes makes the failure disappear. It does not make the test reliable. It just changes the probability.

Fixed sleeps are bad because they wait for time, not for truth. If the app is ready after 100 ms, the test wastes almost three seconds. If CI is slow and the app needs four seconds, the test still fails. The sleep knows nothing about the UI, the network, or the state transition that matters.

A better test waits for an observable condition:

```ts
await expect(page.getByRole('heading', { name: 'Invoices' })).toBeVisible();
```

Or:

```ts
cy.findByRole('heading', { name: 'Invoices' }).should('be.visible');
```

The difference is important. A good wait says, "Continue when the user-visible result exists." A bad wait says, "Maybe three seconds is enough."

## Cause 1: Waiting for Implementation Instead of Behavior

Many flaky tests fail because they wait for the wrong thing.

Examples:

- waiting for a spinner to disappear, while a second loading state is still active;
- waiting for a request to finish, while rendering has not completed;
- waiting for DOM existence, while the element is still disabled;
- waiting for navigation, while route data is still loading;
- clicking a button before the app has attached event handlers.

The fix is to wait for the behavior the user actually needs.

Bad:

```ts
await page.waitForLoadState('networkidle');
await page.locator('.save-button').click();
```

Better:

```ts
const saveButton = page.getByRole('button', { name: 'Save changes' });

await expect(saveButton).toBeEnabled();
await saveButton.click();
await expect(page.getByText('Changes saved')).toBeVisible();
```

`networkidle` can be useful in some apps, but it is not a universal readiness signal. Modern frontends often keep connections open, prefetch data, poll APIs, or run analytics requests. The page can be usable before the network is idle, or unusable after it looks idle.

Prefer user-facing readiness:

- button is enabled;
- heading is visible;
- row appears in the table;
- form error is announced;
- URL has changed;
- toast is visible;
- loading skeleton is replaced by content.

## Cause 2: Shared State Between Tests

Tests flake when they inherit state from earlier tests.

Common examples:

- one test logs in and another assumes that session still exists;
- tests reuse the same user account and mutate it;
- local storage is not cleared;
- feature flags leak between tests;
- a test creates a record with a fixed name and another test finds it;
- test order changes in CI.

The rule is simple:

> Every test should be able to run alone.

That means each test owns its setup. It should not depend on the side effect of another test.

For browser tests, reset state deliberately:

```ts
test.beforeEach(async ({ page }) => {
  await page.context().clearCookies();
  await page.goto('/');
});
```

In many apps, logging in through the UI for every test is too slow. That does not mean tests should share one fragile session. Use a controlled authenticated state instead:

```ts
// Playwright example
test.use({ storageState: 'playwright/.auth/user.json' });
```

Or create a fresh user through an API helper before the test starts. The important part is not the exact technique. The important part is ownership: the test should know what state it starts with.

## Cause 3: Test Data That Is Too Real

"Use production-like data" is good advice until it becomes "depend on whatever data happens to exist."

Flaky tests often depend on data that changes:

- "the first product in the list";
- "the newest invoice";
- "the admin user";
- "the account created yesterday";
- "the third row in the table";
- "the current exchange rate";
- "today's date."

That kind of data makes tests sensitive to time, order, and other people's changes.

Use deterministic fixtures for behavior tests:

```ts
await page.route('/api/invoices', async (route) => {
  await route.fulfill({
    json: [
      { id: 'inv_001', customer: 'Acme Corp', status: 'overdue' },
      { id: 'inv_002', customer: 'Globex', status: 'paid' },
    ],
  });
});
```

Then assert against the fixture:

```ts
await expect(page.getByRole('row', { name: /Acme Corp/ })).toContainText('overdue');
```

This does not mean every test should mock the backend. End-to-end tests should still prove important real flows. But most frontend behavior does not need a live database full of changing data. If the purpose is to test rendering, filtering, validation, permissions, or empty states, deterministic fixtures are usually better.

## Cause 4: Real Network Dependencies

Frontend tests become flaky when they rely on services outside the test boundary:

- analytics;
- maps;
- payment providers;
- feature flag services;
- search APIs;
- third-party fonts;
- slow staging backends;
- email or SMS providers.

If the test is not specifically about that external system, control it.

For component and integration tests, use mocked providers or request interception. For E2E tests, mock only the parts that are outside the journey's purpose.

Example:

- A checkout E2E test should probably hit your app's checkout API in a controlled test environment.
- It should not depend on a real card network, real fraud check, real email delivery, or live analytics script.

Replace those boundaries with deterministic test doubles where possible.

The goal is not fake confidence. The goal is to be honest about what the test is proving.

## Cause 5: Time Is Moving

Time makes tests flaky in subtle ways.

Examples:

- "today" changes at midnight;
- time zones differ between local machines and CI;
- a countdown races the assertion;
- a debounce has not fired yet;
- a token expires during a slow run;
- relative labels like "just now" become "1 minute ago."

If time matters, freeze it.

```ts
await page.clock.setFixedTime(new Date('2026-06-08T10:00:00Z'));
```

In unit tests, use fake timers when testing debounce, retry, polling, or timeout behavior:

```ts
vi.useFakeTimers();

searchBox.setValue('angular testing');
vi.advanceTimersByTime(300);

expect(search).toHaveBeenCalledWith('angular testing');
```

Be careful with fake timers in browser tests. They are useful, but they can also affect framework internals, animations, and libraries that expect real time. Use them where time is the behavior under test, not as a blanket setting for the whole suite.

## Cause 6: Random Values Without Names

Random test data feels safe because it avoids collisions:

```ts
const email = `user-${Math.random()}@example.com`;
```

But random values make failures harder to reproduce. If the test fails only for one generated value, you need to know what that value was.

Prefer deterministic uniqueness:

```ts
const email = `checkout-user-${test.info().parallelIndex}@example.test`;
```

Or include the generated value in logs and test output. Better yet, seed the generator:

```ts
const user = makeUser({ seed: 'checkout-happy-path' });
```

Unique data is good. Untraceable data is not.

## Cause 7: Selectors That Follow the CSS

CSS selectors are often the hidden source of flaky tests:

```ts
await page.locator('.card:nth-child(3) .btn-primary').click();
```

This selector knows too much about layout and too little about meaning. It breaks when the design changes, when a new card is added, or when the button order changes.

Prefer selectors that match how users understand the page:

```ts
await page
  .getByRole('row', { name: /Acme Corp/ })
  .getByRole('button', { name: 'Edit' })
  .click();
```

Good selectors are:

- accessible;
- stable;
- meaningful;
- close to the user action;
- independent of visual layout.

Use `data-testid` when accessible queries are not enough, especially for repeated controls, canvas-heavy UI, virtualized lists, or elements with no useful semantic role. But do not use test IDs as an excuse to ignore accessibility. If the user can click it, the test should often be able to find it by role and name.

## Cause 8: Animations and Transitions

Animations can make tests fail because the element exists before it is ready to use.

Symptoms:

- click intercepted by another element;
- element visible but still moving;
- modal exists but focus has not moved;
- dropdown closes before the assertion;
- screenshot tests show tiny visual differences.

For E2E tests, prefer waiting for the final state rather than the animation event:

```ts
await expect(page.getByRole('dialog', { name: 'Delete invoice' })).toBeVisible();
await expect(page.getByRole('button', { name: 'Confirm delete' })).toBeEnabled();
```

For visual regression tests, disable animations in the test environment:

```css
*, *::before, *::after {
  animation-duration: 0s !important;
  transition-duration: 0s !important;
}
```

Do this only in the test environment. You want stable screenshots, not a different product.

## Cause 9: Tests That Are Too Large

The larger the test, the more reasons it can fail.

This does not mean E2E tests are bad. It means E2E tests should protect journeys, not every branch.

Bad E2E suite shape:

- one giant test logs in, creates a customer, creates an invoice, edits it, exports it, deletes it, logs out;
- every form validation rule is tested through the full browser flow;
- every role and permission combination repeats the same setup;
- one failure hides which behavior actually broke.

Better:

- one E2E test proves the critical invoice journey;
- component tests cover form validation states;
- integration tests cover route guards and service wiring;
- unit tests cover pricing and tax rules.

Smaller tests are easier to debug and less likely to flake. They also tell you where the problem lives.

## Cause 10: CI Is Slower Than Your Laptop

Some tests pass locally because your laptop is fast, warm, and familiar. CI is colder:

- fewer CPU resources;
- slower disk;
- parallel jobs competing for resources;
- headless browser differences;
- different fonts;
- different time zone or locale;
- containers with missing dependencies.

Do not solve this with random sleeps. Make CI explicit.

Good CI hygiene includes:

- fixed time zone and locale;
- installed browser dependencies;
- stable test sharding;
- trace, video, screenshot, and console logs on failure;
- controlled environment variables;
- predictable test database reset;
- separate lanes for unit, component, integration, and E2E tests.

When a CI-only failure happens, you need evidence. Playwright traces, Cypress videos, screenshots, browser console logs, and network logs turn "CI is weird" into a concrete debugging session.

## How to Debug a Flake

When a test flakes, do not immediately rerun and forget it. Capture the pattern.

Ask:

- Did the app fail, or did the test click too early?
- Was the element absent, hidden, disabled, or covered?
- Did the backend return different data?
- Did another test mutate shared state?
- Did the test depend on the current date or time zone?
- Did a request fail or arrive in a different order?
- Does the failure happen only in parallel?
- Does it happen only after another specific test?

Then reproduce it aggressively:

```shell
npx playwright test invoice.spec.ts --repeat-each=50 --workers=4
```

Or:

```shell
npx cypress run --spec cypress/e2e/invoice.cy.ts
```

If a test fails 1 out of 50 times, that is still a bug. The fact that it usually passes is the problem.

## A Practical Flake Reduction Checklist

Use this checklist when reviewing a flaky frontend test:

- Replace fixed sleeps with waits for user-visible state.
- Make each test own its setup and cleanup.
- Avoid depending on test order.
- Use deterministic fixtures for frontend behavior.
- Mock external services that are not part of the behavior under test.
- Freeze time when the behavior depends on dates or timers.
- Prefer accessible selectors over CSS structure selectors.
- Disable animations for visual regression tests.
- Split oversized E2E tests into smaller tests at the right layer.
- Store traces, screenshots, videos, logs, and network details on CI failure.
- Quarantine only with an owner and a deadline.

That last point matters. Quarantine is a temporary safety valve, not a retirement home for broken tests.

## Make Flakiness Visible

Large teams should track flaky tests like production bugs.

At minimum, track:

- test name;
- owner;
- failure rate;
- first seen date;
- suspected cause;
- linked issue;
- deadline for fix or deletion.

If a test fails often enough that people recognize its name, it deserves an owner. If nobody owns it, delete it. A test that nobody trusts is not protecting the product.

Some teams also add a simple rule:

> A flaky test cannot block the team forever, but it also cannot disappear silently.

That means you either fix it, quarantine it visibly, or remove it with a clear explanation. What you do not do is let it fail randomly for months.

## The Goal Is Trust

The point of reducing flakes is not a prettier CI dashboard. The point is trust.

When CI fails, the team should assume the failure matters. That assumption is incredibly valuable. It keeps reviews honest, releases calmer, and regressions visible.

Flaky tests destroy that assumption one rerun at a time.

The fix is usually not dramatic. Wait for behavior. Isolate state. Control data. Freeze time. Remove external randomness. Keep browser tests focused. Capture evidence when CI fails.

Frontend tests do not need to be perfect to be useful. But they do need to be trustworthy.
