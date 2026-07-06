---
title: "From Laravel and AngularJS to Spring Boot and Angular: A Full-Stack Migration Field Report"
date: 2017-05-22T10:00:00+00:00
description: "First weeks with Java and Spring Boot 1.5 after years of Laravel APIs and an AngularJS frontend — what felt familiar, what felt alien, and side-by-side code from a money-exchange project."
layout: single
author_profile: true
url: 2017/05/22/laravel-and-angularjs-to-spring-boot-and-angular/
shortlink: https://g.omid.dev/neNEXWC
tags:
  - Angular
  - AngularJS
  - Java
  - Spring Boot
  - Laravel
  - PHP
  - Migration
  - Backend

categories:
  - TechBlog
seeAlso:
  - /2017/01/18/six-months-with-angular-2-after-years-of-angularjs/
  - /2016/02/12/laravel-from-old-school-developer-eyes/
  - /2024/07/24/code-archaeology-exploring-and-modernizing-legacy-systems/
  - /2024/05/17/essential-skills-for-a-successful-senior-fullstack-developer/
---
In January I wrote about moving our frontend from AngularJS to Angular. That migration is still running — we are on **Angular 4** now, which shipped in March and turned out to be a painless bump from 2.4. The bigger shift landed on the backend: our APIs used to live in **Laravel**, and we are rewriting them in **Java** with **Spring Boot 1.5.3**.

This is my first real Java project. I have years of PHP — mostly Laravel — and a few months of TypeScript from the Angular work. I also wrote C# in college, which turns out to matter more than I expected. Java does not feel like learning a foreign language. It feels like meeting someone who speaks a dialect you half understand.

The project is a money-exchange platform: rates, quotes, orders, settlement windows, audit trails. Not toy CRUD. When you move money, every decimal place and every timestamp is someone’s problem later.

This is not a tutorial. It is a field report from someone who still reaches for `Route::get()` muscle memory in IntelliJ.

## Why we left Laravel (and did not just “add Java”)

Laravel was good to us. Eloquent made the first version fast. Middleware, queues, and the ecosystem got us to production. But the exchange grew: more concurrent quote requests, stricter audit requirements, and a compliance team that wanted stack traces they could grep without wading through PHP-FPM worker logs.

We did not flip a switch. The Angular frontend already talks to REST. We stood up Spring services behind the same URL shapes where we could, ported feature by feature, and kept Laravel running for admin tools until the last module moved. Same playbook as the frontend rewrite — not `ngUpgrade`, not a strangler fig on paper only. Actual parallel systems with a cutover date per module.

Expensive. Correct.

## IntelliJ is the first thing that feels “serious”

I used PhpStorm for Laravel and VS Code for Angular. For Java the team standardized on **IntelliJ IDEA**. I expected vanity. I got dependency.

Refactoring a class name updates imports across the project. “Find usages” on a repository method shows every controller that calls it. Ctrl-click jumps from a controller to an interface to an entity. PhpStorm could do some of this for PHP, but Java’s static typing gives the IDE teeth. When you come from `$user->something` that might exist, having the compiler agree with the IDE is a relief.

The flip side: IntelliJ generates boilerplate for you, and at first I did not notice how much it was compensating for. More on that below.

## Java feels familiar until it does not

**What clicked fast:**

- Types. Angular’s `User[]` and interfaces map cleanly to Java classes and generics.
- Dependency injection. Laravel’s constructor injection and Angular’s `constructor(private userService: UserService)` rhyme with Spring’s `@Autowired` — except Spring prefers constructor injection without the annotation when there is a single constructor, which I learned from a senior who stopped me mid-commit.
- Packages as boundaries. Laravel namespaces and Angular modules finally make sense in a language that enforces them at compile time.
- Annotations everywhere. `@RestController` is not `@Route`, but the mental slot is the same.

**What jarred me:**

- **Getters and setters.** Every entity field is private; you expose `getAmount()` and `setAmount()`. IntelliJ generates them in three keystrokes. I still stare at the file and ask *why*. PHP let me use `$order->amount`. TypeScript let me use `order.amount`. Java wants a ceremony. The answer, repeated patiently: encapsulation, bean conventions for frameworks, serialization contracts. I accept it. I do not love it. Lombok exists; our team said no until everyone reads generated code fluently. Fair.
- **Verbosity.** `public List<ExchangeRate> findByCurrencyPairAndValidAt(...)` is a sentence. Laravel would hide half of that behind Eloquent magic.
- **Null as a design problem.** `Optional` shows up in service layers. PHP’s null coalescing habits die hard.

C# flashbacks helped with `List<T>`, interfaces, and the general “everything is a class” energy. PHP habits helped with pragmatism — when to write a helper vs when to inline. Angular habits helped with immutability arguments in code review, which surprised the Java folks until they saw fewer shared-state bugs in the ported quote cache.

## Laravel → Spring Boot: the mental map I wish I had on day one

| Laravel | Spring Boot 1.5 |
|---------|-----------------|
| `Route::get('/api/rates', ...)` | `@GetMapping("/api/rates")` on a `@RestController` |
| Controller returning `response()->json()` | Return object; Jackson serializes |
| Eloquent `Rate::where(...)->get()` | Spring Data `RateRepository` + method names or `@Query` |
| Form requests / validation | `@Valid` + javax.validation annotations |
| Middleware | `Filter`, `HandlerInterceptor`, or Spring Security |
| `config/app.php`, `.env` | `application.properties` / `application.yml` |
| Artisan `make:model` | IntelliJ / Spring Initializr / your own templates |
| Service providers | `@Configuration` + `@Bean` |
| Queues (Redis) | `@Async`, Spring Integration, or external broker later |

Spring Boot’s pitch — “opinionated defaults, escape hatches when you need them” — is Laravel’s pitch. I should have trusted that sooner.

## Before and after: the parts that actually matter

### A rate endpoint

**Laravel:**

```php
Route::get('/api/rates/{pair}', function ($pair) {
    $rates = Rate::where('pair', $pair)
        ->where('valid_from', '<=', now())
        ->orderBy('valid_from', 'desc')
        ->limit(10)
        ->get();

    return response()->json($rates);
});
```

**Spring Boot:**

```java
@RestController
@RequestMapping("/api/rates")
public class RateController {

    private final RateRepository rateRepository;

    public RateController(RateRepository rateRepository) {
        this.rateRepository = rateRepository;
    }

    @GetMapping("/{pair}")
    public List<Rate> latestForPair(@PathVariable String pair) {
        return rateRepository.findTop10ByPairOrderByValidFromDesc(pair);
    }
}
```

The repository:

```java
public interface RateRepository extends JpaRepository<Rate, Long> {
    List<Rate> findTop10ByPairOrderByValidFromDesc(String pair);
}
```

No SQL for the happy path. Spring Data parses the method name — like Eloquent scopes spelled in camelCase. When the name gets ridiculous, `@Query` is there. I have written three `@Query` annotations and regretted none.

### The entity (and the getter/setter moment)

**Laravel model (conceptually):**

```php
class Rate extends Model {
    protected $fillable = ['pair', 'bid', 'ask', 'valid_from'];
}
```

**JPA entity:**

```java
@Entity
@Table(name = "rates")
public class Rate {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String pair;
    private BigDecimal bid;
    private BigDecimal ask;
    private Instant validFrom;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getPair() { return pair; }
    public void setPair(String pair) { this.pair = pair; }

    // ... bid, ask, validFrom getters and setters
}
```

`BigDecimal` for money was non-negotiable from day one — float horror stories from the legacy PHP module that used doubles “temporarily.” Java made the right type the obvious type.

The getters and setters are the price of admission. IntelliJ collapses them. Git diffs do not.

### Validation: form requests vs annotations

**Laravel:**

```php
public function store(Request $request) {
    $validated = $request->validate([
        'pair' => 'required|string',
        'amount' => 'required|numeric|min:0.01',
    ]);
    // ...
}
```

**Spring:**

```java
public class QuoteRequest {
    @NotBlank
    private String pair;

    @NotNull
    @DecimalMin("0.01")
    private BigDecimal amount;

    // getters / setters
}

@PostMapping("/quotes")
public Quote createQuote(@Valid @RequestBody QuoteRequest request) {
    // ...
}
```

Different syntax, same instinct: validate at the boundary, keep services clean.

### Transactions and “did this actually save?”

Laravel’s `DB::transaction()` was muscle memory for order creation — debit source, credit destination, write audit row, or roll back everything.

Spring’s `@Transactional` on a service method does the same job. The first time I forgot it on a multi-table order write, IntelliJ did not save me; a integration test failed with partial data. I added TestNG/JUnit tests faster than I ever did in PHP.

## Spring Data JPA vs Eloquent: what I miss and what I do not

**Miss:**

- Eloquent’s lazy readable chains for ad-hoc queries in controllers. We are stricter now — repositories and services — and that is healthier, but slower to type.
- Tinker. Spring Boot DevTools restarts are fine; a REPL for poking the database is not the same.

**Do not miss:**

- N+1 queries from accidental lazy loading in loops. JPA still n+1s if you are careless, but `@EntityGraph` and fetch joins are explicit. We log slow queries; Laravel Debugbar nostalgia is real but fading.
- “Magic” column names. JPA mappings are verbose but grep-able.

For the exchange domain, relationships matter: `Order` to `Quote`, `Quote` to `Rate`, `Settlement` to `Order`. Laravel migrations and Eloquent relationships were quick to prototype. JPA annotations on fields (`@ManyToOne`, `@JoinColumn`) feel like documentation that compiles. Migration tooling is Flyway — SQL files, versioned, no going back. More ceremony than Laravel migrations, better audit story for compliance.

## How the frontend and backend migrations rhyme

PHP and AngularJS did not quite rhyme. `$scope` and Blade templates lived in different worlds. **Angular and Java rhyme.**

- Components and controllers both push logic into classes with explicit dependencies.
- TypeScript interfaces and Java DTOs both say “this is the shape on the wire.”
- Module boundaries in Angular and package boundaries in Spring both punish careless imports — eventually, in your favor.
- RxJS Observables on the client and `Future`/reactive experiments on the server (we are mostly synchronous REST still) share vocabulary in standups.

When we ported the quote screen, the Angular `Quote` interface and the Java `Quote` entity started from the same JSON sample. We diff them when the API changes. That workflow did not exist between AngularJS and Laravel — too much was implicit.

Angular 4’s smaller bundles helped the exchange UI feel snappier on rate refresh; we are still migrating off `@angular/http`. Backend latency dropped too once quotes were served from tuned JPA queries instead of the old Eloquent path that loaded relations we did not need. Full-stack migration wins show up in demos, not slide decks.

## Spring Boot 1.5.3 in production shoes

Specifics that stuck:

- **Actuator** endpoints for health checks — ops replaced a custom Laravel ping route.
- **spring-boot-starter-data-jpa** + Hibernate — know your `ddl-auto` settings; we use `validate` in prod and Flyway for schema.
- **Embedded Tomcat** — jar deployment confused everyone who expected PHP deploy rituals. `java -jar exchange-api.jar` is genuinely simple once CI does it.
- **1.5.x** still uses Spring 4.x patterns; Java 8. Lambdas help. Streams help. I use them in services and feel modern; entity classes still look like 2005.

Configuration in `application.yml` with profiles (`dev`, `staging`, `prod`) maps cleanly to Laravel’s `.env` — except secrets are env vars injected at runtime, not committed, same as always.

## What I am not happy about (yet)

**Build tool learning curve.** Maven’s `pom.xml` is XML I did not ask for. Dependencies make sense after a week; plugin configuration still sends me to Stack Overflow.

**Exception culture.** Checked vs unchecked, wrapping `DataAccessException`, HTTP status mapping in `@ExceptionHandler` classes — Laravel’s single `Handler.php` was simpler. Spring is more granular once you invest.

**Boilerplate DTOs.** Entity on the database, DTO on the wire, mapper in between. Laravel often returned models directly (sometimes with `$hidden`). We are stricter now. Correct for a financial API. Tedious.

**Two languages, two migrations, one team.** Frontend Angular 4 work and backend Spring work do not block each other, but context switching in one day is brutal. I am jealous of full-stack Laravel days where one person could trace a bug from Blade to controller to query.

## Where I land

I am glad we moved. I am tired from the move — again.

Java is not PHP with braces. It is a language that expects you to say what you mean before the request hits the server. That fits money exchange better than I expected. Spring Boot is the closest thing to “Laravel for Java” I have found — not in syntax, in *productivity shape*: start fast, structure grows with you, ecosystem is enormous.

The getter/setter noise is real. The IntelliJ + types + tests combo is real too. I trust refactors on the rate engine now in a way I never fully trusted our oldest Laravel module.

I will not pretend one post can carry the whole migration. This is the **backend and full-stack framing** chapter. Still on the shelf:

- **Spring Security** vs Laravel Passport and our old token middleware — different post, still being written.
- **Angular 4 frontend cutover** specifics beyond my January Angular 2 notes — especially leaving `@angular/http`, lazy routes, and quote-screen performance.
- **Money-domain modeling** — decimals, rounding policies, idempotent order submission, audit tables.
- **Running both stacks in parallel** — feature flags, dual writes, the week we almost shipped the wrong settlement batch.

If you are mid-migration from Laravel to Spring, the mental map table above is the cheat sheet I wanted in week one. If you are mid-migration from AngularJS to Angular, read [the January post](/2017/01/18/six-months-with-angular-2-after-years-of-angularjs/) — the frontend half of this story.

If you feel slow, you are not alone. Types help. IntelliJ helps. The learning curve is still steep. The exchange rate API is faster, and that is enough for this sprint.
