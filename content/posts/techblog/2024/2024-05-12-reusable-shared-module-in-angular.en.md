---
title: 'Creating a Reusable Shared Module in Angular for Cross-Repository Usage'
date: 2024-05-12T00:05:09+03:30
layout: single
author_profile: true
url: 2024/05/12/reusable-shared-module-in-angular/
shortlink: https://g.omid.dev/7PLOaeB
tags:
  - frontend
  - development
  - angular
lang: en
categories: 
  - TechBlog
---
In Angular development, creating reusable shared modules is a powerful way to encapsulate common functionality, UI components, services, and styles that can be used across different projects or repositories. In this guide, we'll walk through the process of creating a reusable shared module from scratch, covering directory structures, component/service/directive creation, shared styles, and both development (`npm link`) and production (`npm publish`) use cases.

## Step 1: Generate a Library

The first step is to generate an Angular library project within your workspace using the Angular CLI:

```bash
ng generate library my-shared-module
```

If you don't have a workspace you may create a new one:

```bash
ng new my-workspace --no-create-application
cd my-workspace
```

This command sets up the basic structure for your library.

## Step 2: Directory Structures

Inside your library's directory (`projects/my-shared-module`), organize your code into logical directories:

- `components`: For Angular components.
- `services`: For Angular services.
- `directives`: For Angular directives.
- `styles`: For shared stylesheets (CSS or SCSS).

## Step 3: Components Creation

### Component

Let's create a sample component called `MyComponent`:

```typescript
// projects/my-shared-module/src/lib/components/my-component/my-component.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `<h1>Hello from MyComponent!</h1>`,
})
export class MyComponent {}
```

### Service

Next, let's create a sample service called `MyService`:

```typescript
// projects/my-shared-module/src/lib/services/my-service.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  getMessage(): string {
    return 'Hello from MyService!';
  }
}
```

### Directive

Create a sample directive called `MyDirective`:

```typescript
// projects/my-shared-module/src/lib/directives/my-directive.directive.ts
import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appMyDirective]',
})
export class MyDirective {
  constructor(private el: ElementRef) {
    this.el.nativeElement.style.backgroundColor = 'yellow';
  }
}
```

### Shared Styles

If you have shared styles, place them in the `styles` directory:

```scss
// projects/my-shared-module/src/lib/styles/shared-styles.scss
.custom-button {
  background-color: blue;
  color: white;
}
```

## Step 4: Export Public APIs

In `public_api.ts`, export all components, services, directives, and styles you want to expose:

```typescript
// projects/my-shared-module/src/public_api.ts
export * from './lib/components/my-component/my-component.component';
export * from './lib/services/my-service.service';
export * from './lib/directives/my-directive.directive';
export * from './lib/styles/shared-styles.scss';
```

## Step 5: Build and Test

Build your library to ensure everything compiles correctly:

```bash
ng build my-shared-module
```

You can test your library locally in a sample Angular project.

## Step 6: Usage Instructions

- For Development (`npm link`):
  - In the library directory, run `npm link`.
  - In the consuming project directory, run `npm link my-shared-module`.
  - Import and use components, services, directives, and styles as needed in the consuming project.
- For Production (`npm publish`):
  - Build your library: `ng build my-shared-module`.
  - Publish your library to npm: `npm publish dist/my-shared-module`.

**Usage Samples:**

1. **Component Usage**:

   ```typescript
   // Import MyComponent
   import { MyComponent } from 'my-shared-module';

   // Use MyComponent in a parent component template
   <app-my-component></app-my-component>
   ```

2. **Service Usage**:

   ```typescript
   // Import MyService
   import { MyService } from 'my-shared-module';

   // Inject MyService into a component
   constructor(private myService: MyService) { }

   // Use MyService method in component logic
   console.log(this.myService.getMessage()); // Output: Hello from MyService!
   ```

3. **Directive Usage**:

   ```typescript
   // Import MyDirective
   import { MyDirective } from 'my-shared-module';

   // Use MyDirective in a parent component template
   <div appMyDirective>Apply yellow background</div>
   ```

4. **Shared Styles Usage**:

   To use shared styles, you can simply import the shared styles file in your component's stylesheets:

   ```scss
   /* Import shared styles */
   @import '~my-shared-module/lib/styles/shared-styles.scss';

   /* Use shared styles in component */
   .custom-button {
     @extend .custom-button;
   }
   ```

## Conclusion

Creating a reusable shared module in Angular involves organizing your code into a library project, defining components, services, directives, and shared styles, and exporting them for use in other projects. By following best practices and leveraging tools like `npm link` for development and `npm publish` for production, you can streamline the process of sharing functionality across different repositories.
