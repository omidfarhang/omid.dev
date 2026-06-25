---
title: "Six Months with Angular 2 After Years of AngularJS"
date: 2017-01-18T10:00:00+00:00
description: "An honest field report on what improved, what hurt, and side-by-side code from the AngularJS apps I am leaving behind."
layout: single
author_profile: true
url: 2017/01/18/six-months-with-angular-2-after-years-of-angularjs/
shortlink: https://g.omid.dev/iBdQdrh
tags:
  - Angular
  - AngularJS
  - TypeScript
  - Migration
  - Frontend

categories:
  - TechBlog
---
Angular 2.0 shipped in September. We are on **2.4** now, and the release train is already moving — Angular 4 is being talked about openly. I have been building with it since October, migrating a medium-sized internal dashboard that lived in AngularJS for three years. This is not a tutorial and not a verdict. It is a field report from someone who still dreams in `$scope` sometimes.

## The context nobody warns you about

If you spent years on AngularJS, you did not "upgrade." You rewrote. Google offers `ngUpgrade` to run both frameworks side by side, and we tried it for two weeks before giving up. Our app had too many directives, too much implicit magic, and too many `$watch`es buried in places nobody remembered. We picked a greenfield module, scaffolded it with the CLI, and started porting feature by feature.

That decision was correct. It was also expensive.

## What I genuinely like

**TypeScript catches stupid mistakes before the browser does.** Missing properties, wrong argument types, refactors that silently break templates — AngularJS let all of that through until QA or a user found it.

**Components are easier to reason about than `$scope` soup.** One class, one template, explicit inputs and outputs. I can hand a component to a junior dev and they know where the boundaries are.

**Unidirectional data flow is a real architectural shift.** AngularJS let parent and child share `$scope` and mutate freely. Angular pushes data down with `@Input()` and events up with `@Output()`. It took discipline to stop reaching for two-way binding everywhere, but our "who changed this?" bugs dropped.

**The CLI is a relief.** `ng generate component user-list` beats copying another controller file and hoping you renamed everything. It also hides most of the bootstrap and build wiring — `main.ts`, `polyfills.ts`, Webpack config — that you would otherwise assemble by hand.

**AOT compilation and tree-shaking matter.** Production builds use Ahead-of-Time compilation: templates are compiled at build time, not parsed in the browser. Combined with tree-shaking, our bundles are smaller than anything we shipped with AngularJS. I do not love every line of the generated Webpack config, but I love the result.

**Performance is real.** Our heaviest list view — hundreds of rows with filters — feels snappier. Zone.js patches async work so change detection can run when it should; when something does not update, someone eventually asks whether the callback ran inside Angular's zone. That is more concrete than our old `$digest` guessing games.

## What I am not happy about (yet)

**The ecosystem has more moving parts than AngularJS ever did.** A hello-world in AngularJS was one script tag and a `ng-app`. Angular 2 still needs modules, bootstrap, polyfills, and a build step — but if you use the CLI, you rarely touch those files day to day. The friction I feel is not typing `platformBrowserDynamic().bootstrapModule()`; it is learning *why* the pieces exist and how they connect when something breaks.

**RxJS is the direction, not an accident.** AngularJS gave me a Promise from `$http`. Angular 2's `Http` service returns an Observable. You are not forced to live in reactive land — `.toPromise()` is supported, and our team uses it on simple CRUD paths while we learn. But the framework and the docs clearly expect you to grow into Observables for cancellation, retries, and composition. Fair enough. I am just not there yet on every call site.

**The documentation still feels like it was written by people who already know the answer.** Stack Overflow from 2016 beta threads is still ranking above official guides for half my searches.

**We lost some ergonomics I took for granted.** Filters are gone — you write Pipes. `ng-repeat` with `track by` became `*ngFor` with `trackBy` functions in TypeScript. Small things, but death by a thousand papercuts during migration.

## Before and after: the parts that actually matter

### A controller becomes a component

AngularJS let you keep logic in a controller and markup in HTML. Simple, until the controller grew to 400 lines.

**AngularJS (1.x):**

```javascript
angular.module('app')
  .controller('UserListCtrl', function($scope, UserService) {
    $scope.users = [];
    $scope.loading = true;

    UserService.getAll().then(function(users) {
      $scope.users = users;
      $scope.loading = false;
    });

    $scope.remove = function(user) {
      UserService.delete(user.id).then(function() {
        $scope.users = $scope.users.filter(function(u) {
          return u.id !== user.id;
        });
      });
    };
  });
```

```html
<div ng-controller="UserListCtrl">
  <p ng-if="loading">Loading…</p>
  <ul ng-if="!loading">
    <li ng-repeat="user in users">
      {{ user.name }}
      <button ng-click="remove(user)">Delete</button>
    </li>
  </ul>
</div>
```

**Angular 2:**

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';
import { User } from './user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html'
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getAll().subscribe(users => {
      this.users = users;
      this.loading = false;
    });
  }

  remove(user: User) {
    this.userService.delete(user.id).subscribe(() => {
      this.users = this.users.filter(u => u.id !== user.id);
    });
  }
}
```

```html
<p *ngIf="loading">Loading…</p>
<ul *ngIf="!loading">
  <li *ngFor="let user of users">
    {{ user.name }}
    <button (click)="remove(user)">Delete</button>
  </li>
</ul>
```

I prefer the Angular 2 version. The template syntax looks alien for the first week. Structural directives like `*ngIf` and `*ngFor` actually change the DOM. Event binding `(click)` is Angular's syntax. Property binding `[disabled]="loading"` sets element properties — including native ones. Do not mix those up with plain HTML attributes; that confused me early on.

What I am still adjusting to: `@NgModule` declares the component, imports `BrowserModule` and `HttpModule`, and registers `UserService` in `providers`. That last part is a *choice*, not a law — you can scope a service to a single component's `providers` array when you want isolation. AngularJS never made me think about module graphs at all; everything shipped in one big bundle. Angular splits forms, HTTP, and routing into separate modules on purpose. More setup, clearer boundaries.

### HTTP: `$http` promises vs `Http` observables

This is the single biggest daily friction point on our team.

**AngularJS:**

```javascript
angular.module('app')
  .factory('UserService', function($http) {
    return {
      getAll: function() {
        return $http.get('/api/users').then(function(res) {
          return res.data;
        });
      },
      delete: function(id) {
        return $http.delete('/api/users/' + id);
      }
    };
  });
```

**Angular 2:**

```typescript
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  getAll(): Observable<User[]> {
    return this.http.get('/api/users')
      .map((res: Response) => res.json() as User[]);
  }

  delete(id: number): Observable<Response> {
    return this.http.delete('/api/users/' + id);
  }
}
```

Yes, Observables are the long-term bet — cancellation and retries matter once you wire up search-as-you-type or polling. For a straight `GET` on an admin panel, I still reach for `.toPromise()` more often than I admit in code review. The team lead keeps saying we will appreciate RxJS later. I believe him.

The other HTTP papercut is `res.json()` on every response. AngularJS gave me parsed JSON in `res.data`. The current `@angular/http` API feels transitional — you can hear it in conference talks that the team wants to simplify response handling. I hope they do. Until then, `.map(res => res.json())` is muscle memory I did not ask for.

### Dependency injection: explicit, verbose, safer

**AngularJS** — string-based injection breaks under minification unless you use `$inject` or ngAnnotate:

```javascript
angular.module('app')
  .controller('DashboardCtrl', function($scope, UserService, OrderService) {
    // ...
  });
```

**Angular 2** — constructor injection with decorators and TypeScript metadata. The types help the IDE; the `@Injectable()` decorator and `emitDecoratorMetadata` in `tsconfig` are what actually wire things up at runtime. Minification-safe without ngAnnotate:

```typescript
@Component({ /* ... */ })
export class DashboardComponent {
  constructor(
    private userService: UserService,
    private orderService: OrderService
  ) {}
}
```

This is one of the wins I will not give back. Refactoring a service rename across the project actually works in the IDE — as long as the decorator metadata is configured correctly, which the CLI sets up for you.

### Routing: flatter, but not simpler on day one

**AngularJS (ngRoute):**

```javascript
angular.module('app', ['ngRoute'])
  .config(function($routeProvider) {
    $routeProvider
      .when('/users', { templateUrl: 'users.html', controller: 'UserListCtrl' })
      .when('/users/:id', { templateUrl: 'user-detail.html', controller: 'UserDetailCtrl' })
      .otherwise({ redirectTo: '/users' });
  });
```

**Angular 2 (RouterModule):**

```typescript
import { Routes, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list.component';
import { UserDetailComponent } from './user-detail.component';

const routes: Routes = [
  { path: 'users', component: UserListComponent },
  { path: 'users/:id', component: UserDetailComponent },
  { path: '', redirectTo: '/users', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
```

The route table itself is fine. What tripped us up: `<router-outlet>` instead of `ng-view`, importing the routing module in the right place, and lazy loading via `loadChildren` — which *exists* and is documented, but the module boundaries are confusing enough that it felt like a second project. Poor docs, not missing features. We shipped with eager-loaded modules and called it a win.

### Two-way binding: still here, more setup

I still reach for two-way binding on forms. It exists, but it is no longer free.

**AngularJS:**

```html
<input ng-model="user.email">
<p>You typed: {{ user.email }}</p>
```

**Angular 2:**

```html
<input [(ngModel)]="user.email">
<p>You typed: {{ user.email }}</p>
```

Same idea — banana in a box `[(ngModel)]` — but you must import `FormsModule` in your `@NgModule`. Forget that once and you get a template error that sends you on a forty-minute detour. AngularJS bundled forms, HTTP, and routing into one framework download. Angular splits them so you only pay for what you import. Reasonable design. Still annoying the first time you hit it.

## The naming mess

Can we acknowledge that calling it "Angular 2" while the ecosystem still says "AngularJS," "Angular 1," and occasionally just "Angular" in blog posts from last month is exhausting? I have explained the difference to our product owner three times. She still says "the new AngularJS."

Internally we say **"A2"** and **"A1"** and move on.

## Where I land

I am glad we moved. I am tired from the move.

For a greenfield app today, I would start in Angular 2 without nostalgia. For a large AngularJS codebase, I would not promise a quick migration — plan for a rewrite with `ngUpgrade` only if your app is unusually clean (yours probably is not; mine was not).

The framework feels like it is aimed at teams building real applications for years, not at prototyping a page over lunch. AngularJS was better at the latter. Angular 2 is better at the former — not because someone added TypeScript syntax, but because of AOT, modular boundaries, unidirectional flow, and a build pipeline that treats the browser as a deployment target, not a runtime compiler. That matches what Google always said they were doing. I just wish they had said it louder before we built so much on `$scope`.

I will post again when we finish the migration — or when we hit whatever the next wall is. Right now the wall is RxJS operators and figuring out when `ChangeDetectionStrategy.OnPush` is worth the debugging pain.

If you are mid-migration and feel slow, you are not alone. The CLI helps. TypeScript helps. The learning curve is still steep.
