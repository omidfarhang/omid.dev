---
title: "Stop Modeling Angular Screens with Five Booleans"
date: 2026-06-02T01:15:00+03:30
description: "Most Angular UI bugs come from screens modeled as scattered flags. Replace loading, error, empty, and ready booleans with one explicit state model your templates and reviewers can trust."
layout: single
author_profile: true
url: 2026/06/02/stop-modeling-angular-screens-with-five-booleans/
shortlink: https://g.omid.dev/fv90jQT
# x_link: 
# mastodon_link: 
# bluesky_link: 
# linkedin_link: 
tags:
  - Angular
  - Frontend
  - TypeScript
  - Software Architecture
  - Signals
  - State Management
  - Maintainability

categories:
  - TechBlog
series:
  id: modern-angular
  title: "Modern Angular"
  order: 4
  label: "Stop Modeling Angular Screens with Five Booleans"
  role: part
seeAlso:
  - /2025/12/24/angular-signals-control-theory/
  - /2026/05/25/signal-forms-model-ui-state/
  - /2026/05/26/angular-template-syntax-hidden-cost/
---
Open almost any mature Angular screen and you will find the same shape:

```ts
loading = false;
error: string | null = null;
data: Account[] | null = null;
retrying = false;
submitted = false;
```

The template then becomes a negotiation:

```html
@if (loading) {
  <app-spinner />
} @else if (error) {
  <app-error [message]="error" />
} @else if (!data?.length) {
  <app-empty-state />
} @else {
  <account-table [rows]="data!" />
}
```

This looks fine. It ships. It passes review. And then production teaches you that the screen was never modeled as one thing. It was modeled as five independent switches that sometimes agree and sometimes do not.

That is the post I wish more teams would write before they buy another AI tool or adopt another syntax feature. The problem is usually not the assistant. It is the state model.

## The Real Bug Is an Impossible Screen

Boolean-heavy screens fail quietly. They do not always throw. They often render something plausible while being logically wrong.

Examples I have seen in real apps:

- `loading = false` and `error = null` while stale data from the previous route is still on screen.
- `loading = true` during a background refresh while the old list remains visible, so users edit rows that are about to disappear.
- `error` set while `data` still holds the last successful payload, so the UI shows both a table and a failure banner.
- `submitted = true` on a form that never passed validation, because submit state and validation state live in different places.
- `retrying` added as a third loading flag because the first `loading` was already overloaded.

Each flag is reasonable in isolation. Together they create **impossible states**: combinations your product should never show, but your template allows because nothing owns the whole screen.

This is why templates get defensive. This is why `@if` chains grow. This is why someone adds `!!data && !loading && !error` and calls it a day.

The fix is not a clever template. The fix is to make the screen ask one honest question:

> What state is this UI in right now?

## One Model, Many Names

You can call it a view model, a screen state, a UI phase, or a state machine. The name matters less than the constraint:

**At any moment, the screen is in exactly one primary state.**

For a data screen, a useful union looks like this:

```ts
type AccountListState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; data: Account[] }
  | { status: 'empty' }
  | { status: 'error'; message: string; canRetry: boolean };
```

Notice what disappeared:

- no separate `loading` and `retrying`;
- no `data` hanging around during `error`;
- no guessing whether "empty" means `[]` or `null` or `undefined`.

`empty` is not "ready with zero rows" unless your product truly treats those the same. In many apps they are different experiences: empty search results versus "you have not created anything yet." If the UX differs, the state should differ.

That decision belongs in the model, not in template arithmetic.

## Start From the Mess You Already Have

Here is the familiar component shape:

```ts
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
})
export class AccountListComponent {
  loading = signal(false);
  error = signal<string | null>(null);
  data = signal<Account[] | null>(null);

  private readonly accountService = inject(AccountService);

  constructor() {
    this.load();
  }

  load() {
    this.loading.set(true);
    this.error.set(null);

    this.accountService.list().subscribe({
      next: accounts => {
        this.data.set(accounts);
        this.loading.set(false);
      },
      error: err => {
        this.error.set(err.message);
        this.loading.set(false);
      },
    });
  }
}
```

What state is the screen in before the request starts?

- `loading = false`
- `error = null`
- `data = null`

That is not "idle." That is ambiguous. Some templates will treat it as empty. Some will render nothing. Some will flash the wrong message for one frame.

Now suppose the user navigates away mid-request and back again. Suppose a slow response arrives after a fast retry. Suppose a refresh runs while old data is still shown. The booleans do not tell you which story the UI is telling. They only tell you which flags happen to be true.

## Promote a Single `state` Signal

With Angular signals, the refactor is usually straightforward: one source signal, a few transitions, and computed helpers only where they name real product concepts.

```ts
@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
})
export class AccountListComponent {
  readonly state = signal<AccountListState>({ status: 'idle' });

  private readonly accountService = inject(AccountService);

  constructor() {
    this.reload();
  }

  reload() {
    this.state.set({ status: 'loading' });

    this.accountService.list().subscribe({
      next: accounts => {
        if (!accounts.length) {
          this.state.set({ status: 'empty' });
          return;
        }

        this.state.set({ status: 'ready', data: accounts });
      },
      error: err => {
        this.state.set({
          status: 'error',
          message: err.message ?? 'Could not load accounts.',
          canRetry: true,
        });
      },
    });
  }
}
```

The entire screen now has one place to read during debugging. When someone files a bug with a screenshot, you can ask for one field: `status`.

That sounds small. In practice it changes code review. Instead of debating four flags, reviewers inspect transitions.

## Let the Template Mirror the Model

Once the state is explicit, the template stops being a logic puzzle:

```html
@switch (state().status) {
  @case ('idle') {
    <!-- optional: render nothing or a skeleton policy -->
  }
  @case ('loading') {
    <app-spinner label="Loading accounts" />
  }
  @case ('empty') {
    <app-empty-state
      title="No accounts yet"
      actionLabel="Create account"
    />
  }
  @case ('error') {
    <app-error
      [message]="state().message"
      [showRetry]="state().canRetry"
      (retry)="reload()"
    />
  }
  @case ('ready') {
    <account-table [rows]="state().data" />
  }
}
```

This pairs well with Angular's newer template strictness. If `AccountListState` is a typed union, an exhaustive `@switch` with `@default never` can force you to handle every state when the model grows. That is the good kind of strictness: the compiler helps because the domain model is clear. See [The Hidden Cost of Nice Syntax](/2026/05/26/angular-template-syntax-hidden-cost/) for when template power helps versus when it hides meaning.

The template is still choosing presentation. It is no longer inventing domain state.

## Refresh Without Lying to the User

A common objection is: "If I only have one state, how do I keep showing old data while refreshing?"

You do not solve that with a second hidden `loading` flag. You extend the model until it matches the product behavior.

If stale-while-revalidate is correct, say so:

```ts
type AccountListState =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'ready'; data: Account[]; refreshing?: boolean }
  | { status: 'empty' }
  | { status: 'error'; message: string; canRetry: boolean };
```

Now `refreshing: true` means "show the current data, but indicate activity." That is a real state story. It is not `loading = true` while pretending `ready` is still somehow also true.

If the product should blank the screen during refresh, keep `loading` as the only visible state. That is also a valid model. The point is to choose deliberately, not to accumulate flags until the template needs a truth table.

## Forms Are Screens Too

This pattern is not only for list pages. Forms are where boolean soup often starts.

A typical submit flow spreads state across:

- `submitted`
- `loading`
- `serverError`
- form control validity
- maybe `saved`

The user still sees one flow. The code sees five systems.

If you have not moved the form itself to Signal Forms yet, you can still unify the **screen** state around it. Even a `FormGroup` screen benefits from an explicit envelope:

```ts
type EditorScreenState =
  | { status: 'editing' }
  | { status: 'submitting' }
  | { status: 'success'; message: string }
  | { status: 'failure'; message: string };
```

Then the submit handler does not flip random booleans:

```ts
submit() {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }

  this.screen.set({ status: 'submitting' });

  this.accountService.save(this.form.getRawValue()).subscribe({
    next: () => {
      this.screen.set({
        status: 'success',
        message: 'Account saved.',
      });
    },
    error: err => {
      this.screen.set({
        status: 'failure',
        message: err.message ?? 'Save failed.',
      });
    },
  });
}
```

This connects directly to the forms discussion in [Signal Forms Aren't Just a Forms API Update](/2026/05/25/signal-forms-model-ui-state/). Field values, validation, and submission policy still need good boundaries. But the screen should not ask the template to infer lifecycle from three unrelated booleans.

## Name Product Concepts, Not Combinations

Explicit state does not mean giant unions for every tiny UI detail.

Use the union for **primary** screen phases. Use `computed` signals for product language that spans phases:

```ts
readonly state = signal<AccountListState>({ status: 'idle' });

readonly canExport = computed(() => {
  const current = this.state();
  return current.status === 'ready' && current.data.length > 0;
});

readonly pageTitle = computed(() => {
  switch (this.state().status) {
    case 'ready':
      return `${this.state().data.length} accounts`;
    case 'empty':
      return 'Accounts';
    case 'error':
      return 'Accounts unavailable';
    default:
      return 'Accounts';
  }
});
```

`canExport` is a derived rule. `pageTitle` is presentation metadata. Neither should be a free-floating boolean set from three different methods.

If you find yourself writing `isReadyButNotRefreshingExceptOnFirstLoad`, you do not need another boolean. You need a better primary state or a named computed that expresses the business rule.

## A Small Helper If You Want Consistency

Teams often benefit from one shared helper for async data screens. It does not need to be clever:

```ts
export function toReadyOrEmpty<T>(
  items: T[],
  emptyStatus: 'empty' = 'empty',
): { status: 'ready'; data: T[] } | { status: 'empty' } {
  return items.length
    ? { status: 'ready', data: items }
    : { status: emptyStatus };
}
```

Or a tiny state machine utility if you prefer centralizing transitions. The implementation matters less than the team habit:

> New screens do not get new `isX` fields without justification.

What helps most in code review is a shared vocabulary. When everyone knows that list pages use `idle | loading | ready | empty | error`, onboarding gets easier and bugs get more searchable.

## What to Put in Code Review

Before approving another Angular screen, I look for these smells:

1. **More than one lifecycle boolean** for the same concern (`loading`, `isLoading`, `pending`, `busy`).
2. **Templates that guard the same concept repeatedly** (`data && !loading && !error`).
3. **Nullable data displayed during error states** because the last success was never cleared.
4. **Submit handlers that set flags but do not define a single user-visible phase**.
5. **"Empty" inferred from multiple shapes** (`null`, `[]`, `undefined`) with different meanings.

And I look for these positives:

1. **One primary state owner** per screen or per major panel.
2. **Transitions that replace the whole state**, not patch unrelated fields.
3. **Templates that switch on `status`** instead of evaluating boolean algebra.
4. **Named computeds** for cross-cutting product rules.
5. **Types that make impossible states unrepresentable**, or at least hard to write.

This is also where senior judgment matters. Not every component needs a exported union type. A small dialog with one button and one API call might be fine with a single `submitting` signal. The pattern earns its keep when the screen has multiple async paths, user-visible phases, or bug history.

## The Checklist You Can Actually Use

Copy this into a team doc or pin it in review guidelines:

**Before adding another boolean**

- What are the mutually exclusive UI phases on this screen?
- Which combinations should be impossible?
- Does stale data remain visible during refresh on purpose?
- Is "empty" a technical shape (`[]`) or a product state ("no results")?
- Where is the single function that transitions between phases?

**When refactoring an existing screen**

- Pick one signal or field as the source of truth.
- Map current boolean combinations to named states.
- Replace the template `@if` chain with `@switch (state().status)`.
- Delete flags that become redundant.
- Add one test per state if the screen is business-critical.

**When the model grows**

- Add a new union member instead of a new boolean.
- Update the template exhaustively.
- Rename product-facing states in the type, not in comments.

## The Point Is Not Purity

I am not arguing for state-machine ceremony on every checkbox.

I am arguing against accidental complexity. Most developers already think in states. They say "it's loading" or "we're showing the empty view." The code should say the same thing out loud.

Angular signals make this easier than the old style, but they do not do it for you. A `signal(false)` is still a boolean. A `computed` built from four unrelated flags is still boolean soup with extra steps.

The useful move is small and repeatable:

1. List the real UI phases.
2. Model them as a union.
3. Store one current value.
4. Transition atomically.
5. Let the template present one phase at a time.

Do that and many "mysterious UI bugs" stop being mysterious. They become wrong transitions, which are much easier to fix than wrong templates.

The next time a screen feels hard to reason about, do not reach for a new tool first. Read the booleans. Count the combinations. Ask which ones should never exist.

Then delete them.

## Further Reading & References

- [Angular template control flow](https://angular.dev/guide/templates/control-flow)
- [Angular signals overview](https://angular.dev/guide/signals)
