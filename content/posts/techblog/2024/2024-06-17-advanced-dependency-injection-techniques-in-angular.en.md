---
title: 'Advanced Dependency Injection Techniques in Angular: Tree-Shakable Providers and Injection Tokens'
date: 2024-06-17T02:16:21+03:30
layout: single
author_profile: true
url: 2024/06/17/advanced-dependency-injection-techniques-in-angular-tree-shakable-providers-and-injection-tokens/
shortlink: https://g.omid.dev/pKkSzB8
tags:
  - Angular
  - Frontend Development
  - Angular Providers
lang: en
categories: 
  - TechBlog
---
Dependency Injection (DI) is a fundamental design pattern in Angular that allows for the efficient management of dependencies within an application. By using DI, Angular promotes the principle of Inversion of Control (IoC), where the control of creating and managing dependencies is inverted from the component itself to an external framework. This results in more modular, testable, and maintainable code. In this post, we will explore two advanced DI techniques in Angular: Tree-Shakable Providers and Injection Tokens.

## Introduction to Dependency Injection in Angular

Angular's DI framework is a key feature that helps manage how components and services are instantiated and used. Instead of a class creating its dependencies, Angular's DI system injects these dependencies at runtime, promoting loose coupling and enhancing testability.

### Basic DI Example

Here’s a simple example of DI in Angular:

```typescript
@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor() { }

  getData() {
    return ['Data1', 'Data2', 'Data3'];
  }
}

@Component({
  selector: 'app-my-component',
  template: `<ul><li *ngFor="let item of data">{{ item }}</li></ul>`,
})
export class MyComponent implements OnInit {
  data: string[];

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.data = this.dataService.getData();
  }
}
```

In this example, the `DataService` is injected into `MyComponent`, allowing the component to use the service’s `getData` method.

## Tree-Shakable Providers

### What are Tree-Shakable Providers?

Tree-shakable providers are a mechanism to ensure that only the necessary parts of your application are included in the final build. Tree shaking is a process that removes unused code, thus optimizing the bundle size and improving load times.

### Benefits of Tree-Shakable Providers

1. **Reduced Bundle Size**: Only the providers that are actually used are included in the final bundle, reducing the overall size of the application.
2. **Optimized Performance**: Smaller bundle sizes lead to faster load times and better runtime performance.
3. **Better Maintainability**: It is easier to manage services and dependencies as unused services are automatically excluded from the final build.

### Implementing Tree-Shakable Providers

To create a tree-shakable provider, you can use the `providedIn` property within the `@Injectable` decorator. This property can be set to `'root'`, a specific module, or a platform.

```typescript
@Injectable({
  providedIn: 'root',
})
export class TreeShakableService {
  constructor() { }

  getFeature() {
    return 'This is a tree-shakable service';
  }
}
```

In this example, `TreeShakableService` is provided in the root injector, making it available application-wide. If the service is not used anywhere, it will be tree-shaken from the final bundle.

### Conditional Providers

Sometimes, you may want to provide a service conditionally based on certain criteria, such as the environment. This can be done using `providedIn` with a factory function.

```typescript
@Injectable({
  providedIn: () => (environment.production ? 'root' : null),
})
export class ConditionalService {
  constructor() { }

  getEnvironment() {
    return environment.production ? 'Production' : 'Development';
  }
}
```

In this example, `ConditionalService` is only provided in the production environment. If the application is running in development mode, this service will be excluded from the bundle.

## Injection Tokens

### What are Injection Tokens?

Injection Tokens in Angular are a mechanism to create and manage non-class dependencies in the DI system. They are especially useful when you need to inject a value that is not a class, such as a configuration object, or when you have multiple services with the same interface.

### Use Cases for Injection Tokens

1. **Configuration Objects**: Inject configuration settings or constants.
2. **Multi-Providers**: Provide multiple instances of a service.
3. **Opaque Tokens**: Avoid naming collisions for providers.

### Creating and Using Injection Tokens

To create an injection token, use the `InjectionToken` class. Here’s an example of using an injection token for a configuration object:

```typescript
// config.ts
export interface AppConfig {
  apiEndpoint: string;
  title: string;
}

export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

// app.module.ts
import { APP_CONFIG, AppConfig } from './config';

const CONFIG: AppConfig = {
  apiEndpoint: 'https://api.example.com',
  title: 'My Angular App',
};

@NgModule({
  providers: [
    { provide: APP_CONFIG, useValue: CONFIG },
  ],
})
export class AppModule { }

// some.component.ts
import { APP_CONFIG, AppConfig } from './config';

@Component({
  selector: 'app-some',
  template: `<h1>{{ config.title }}</h1>`,
})
export class SomeComponent {
  constructor(@Inject(APP_CONFIG) public config: AppConfig) { }
}
```

In this example, `APP_CONFIG` is an injection token used to provide configuration settings to `SomeComponent`.

### Multi-Providers

Angular allows multiple providers to be associated with a single token using multi-providers. This is useful when you need to provide multiple values for a single dependency.

```typescript
export const MULTI_TOKEN = new InjectionToken<string[]>('multi.token');

@NgModule({
  providers: [
    { provide: MULTI_TOKEN, useValue: 'First Value', multi: true },
    { provide: MULTI_TOKEN, useValue: 'Second Value', multi: true },
  ],
})
export class AppModule { }

// multi.component.ts
@Component({
  selector: 'app-multi',
  template: `<div *ngFor="let value of values">{{ value }}</div>`,
})
export class MultiComponent {
  values: string[];

  constructor(@Inject(MULTI_TOKEN) values: string[]) {
    this.values = values;
  }
}
```

In this example, `MULTI_TOKEN` is used to inject multiple string values into `MultiComponent`.

## Combining Tree-Shakable Providers and Injection Tokens

Combining tree-shakable providers and injection tokens can create a highly flexible and maintainable DI system. Here’s an example:

```typescript
export const FEATURE_CONFIG = new InjectionToken<AppConfig>('feature.config');

@Injectable({
  providedIn: 'root',
})
export class FeatureService {
  constructor(@Inject(FEATURE_CONFIG) private config: AppConfig) { }

  getFeatureEndpoint() {
    return this.config.apiEndpoint;
  }
}

@NgModule({
  providers: [
    { provide: FEATURE_CONFIG, useValue: { apiEndpoint: 'https://feature.example.com', title: 'Feature Module' } },
  ],
})
export class FeatureModule { }

// feature.component.ts
@Component({
  selector: 'app-feature',
  template: `<p>{{ featureService.getFeatureEndpoint() }}</p>`,
})
export class FeatureComponent {
  constructor(public featureService: FeatureService) { }
}
```

In this example, `FeatureService` is tree-shakable and uses the `FEATURE_CONFIG` injection token to get its configuration.

## Advanced Use Cases

### Lazy Loading Modules

Angular’s lazy loading feature allows modules to be loaded on demand. This can be combined with tree-shakable providers and injection tokens to optimize performance further.

```typescript
const FEATURE_ROUTES: Routes = [
  {
    path: 'feature',
    loadChildren: () => import('./feature/feature.module').then(m => m.FeatureModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(FEATURE_ROUTES)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
```

With lazy loading, the `FeatureModule` and its providers are only loaded when the feature route is accessed.

### Environment-Specific Services

Using tree-shakable providers and injection tokens, you can configure services that behave differently based on the environment.

```typescript
export const ENV_CONFIG = new InjectionToken<AppConfig>('env.config');

@NgModule({
  providers: [
    { provide: ENV_CONFIG, useValue: environment.production ? prodConfig : devConfig },
  ],
})
export class AppModule { }

// env.service.ts
@Injectable({
  providedIn: 'root',
})
export class EnvService {
  constructor(@Inject(ENV_CONFIG) private config: AppConfig) { }

  getConfig() {
    return this.config;
  }
}
```

This setup ensures that `EnvService` uses different configurations based on the environment.

### Dynamic Module Loading

Dynamic module loading allows for modules to be loaded at runtime based on certain conditions.

```typescript
// dynamic.service.ts
@Injectable({
  providedIn: 'root',
})
export class DynamicService {
  loadModule(modulePath: string) {
    return import(modulePath).then(m => m.default);
  }
}

// app.component.ts
@Component({
  selector: 'app-root',
  template: `<button (click)="loadFeature()">Load Feature</button>`,
})
export class AppComponent {
 

 constructor(private dynamicService: DynamicService) { }

  loadFeature() {
    this.dynamicService.loadModule('./feature/feature.module').then(module => {
      // Use the dynamically loaded module
    });
  }
}
```

In this example, `DynamicService` dynamically loads a module at runtime.

## Additional Resources

- [Angular Dependency Injection](https://angular.io/guide/dependency-injection)
- [Tree-Shakable Providers](https://angular.io/guide/providers#tree-shakable-providers)
- [Injection Tokens](https://angular.io/guide/dependency-injection-in-action#using-injectiontoken-objects)
- [Lazy Loading Feature Modules](https://angular.io/guide/lazy-loading-ngmodules)

## Conclusion

Advanced dependency injection techniques in Angular, such as tree-shakable providers and injection tokens, provide powerful tools for creating flexible and maintainable applications. By leveraging these techniques, you can optimize your Angular applications for better performance and maintainability.
