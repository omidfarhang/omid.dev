---
title: "Angular Platform"
description: "A curated reading path for senior Angular developers — signals, forms, migration patterns, and platform tooling."
layout: reading-path
url: /posts/techblog/paths/angular-platform/
hidemeta: true
comments: false
build:
  list: never
---

For senior Angular developers and platform leads who want depth on modern reactivity, UI state modeling, and real-world migration — not another “getting started” tutorial.

## Reading order — Modern Angular series

Follow the [Modern Angular](/2025/12/24/angular-signals-control-theory/) series in order (use in-post series navigation between parts):

1. **[Angular Signals and Control Theory](/2025/12/24/angular-signals-control-theory/)** — Start here. Frames signals as a control-theory problem and sets up the rest of the series.
2. **[Signal Forms and UI State Modeling](/2026/05/25/signal-forms-model-ui-state/)** — How to model form and screen state without boolean soup.
3. **[The Hidden Cost of Angular Template Syntax](/2026/05/26/angular-template-syntax-hidden-cost/)** — Why template ergonomics affect performance and team velocity.
4. **[Angular MCP Server and AI Workflows](/2026/05/27/angular-mcp-ai-workflows-real-teams/)** — Practical AI-assisted workflows for real Angular teams.
5. **[Stop Modeling Angular Screens with Five Booleans](/2026/06/02/stop-modeling-angular-screens-with-five-booleans/)** — A concrete pattern for replacing ad-hoc state flags.

## Migration context

Optional background on framework migrations — the rewrite-not-upgrade lesson, told twice from different eras:

6. **[Six Months with Angular 2 After Years of AngularJS](/2017/01/18/six-months-with-angular-2-after-years-of-angularjs/)** — A 2017 field report: what improved, what hurt, and side-by-side code from the AngularJS apps I was leaving behind.
7. **[From Laravel and AngularJS to Spring Boot and Angular](/2017/05/22/laravel-and-angularjs-to-spring-boot-and-angular/)** — The full-stack companion: first weeks with Java and Spring Boot 1.5 after years of Laravel APIs, on the same money-exchange migration.
8. **[Ship of Theseus: React to Angular Migration](/2026/01/01/ship-of-theseus-react-to-angular/)** — The same lesson at production scale: incremental migration without a big-bang rewrite.

## Foundational reads

These posts are not part of the Modern Angular series but ground the platform work above:

9. **[ViewChild Angular: @ViewChild and @ContentChild](/2024/09/08/unlocking-the-power-of-angulars-viewchild-and-contentchild/)** — DOM and component queries — still essential when signals meet the template.
10. **[Design Patterns in Angular](/2024/05/31/design-patterns-in-angular-enhancing-code-quality-and-maintainability/)** — Reusable patterns for maintainable Angular codebases.
11. **[Advanced Dependency Injection in Angular](/2024/06/17/advanced-dependency-injection-techniques-in-angular-tree-shakable-providers-and-injection-tokens/)** — Tree-shakable providers and injection tokens for large apps.
12. **[Advanced Angular Change Detection](/2024/06/19/advanced-angular-change-detection-strategies-for-high-performance-applications/)** — Change detection strategies when performance matters.
13. **[Integrating GraphQL with Angular](/2024/06/01/integrating-graphql-with-angular-a-practical-guide/)** — Practical GraphQL setup in Angular apps.
14. **[Migrating from REST to GraphQL](/2024/08/07/migrating-from-rest-to-graphql-a-step-by-step-guide-for-expressjs-and-angular/)** — Step-by-step backend + frontend migration pair.

## Architecture at scale

15. **[Micro Frontends: Why?](/2024/05/09/micro-frontends-why/)** — Start the Micro Frontends series, then follow in-post navigation through the working example and comparison posts.
16. **[Legacy and Modernization](/2024/07/24/code-archaeology-exploring-and-modernizing-legacy-systems/)** — Code archaeology context for incremental migration (pairs with the migration posts above).

## Companion code

17. **[Why I Started Adding Full Source Code to My Blog Posts](/2026/06/01/why-i-started-adding-full-source-code-to-my-blog-posts/)** — How runnable companion projects tie posts to repos and live demos on [playground.omid.dev](https://playground.omid.dev/).

## Related paths

- **[Frontend Architecture](/posts/techblog/paths/frontend-architecture/)** — Micro Frontends deep dive, schematics, web components, and real-time patterns.
