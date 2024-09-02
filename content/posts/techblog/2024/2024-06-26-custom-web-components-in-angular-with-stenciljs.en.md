---
title: 'Implementing Custom Web Components in Angular with Stencil.js'
date: 2024-06-26T05:01:11+03:30
layout: single
author_profile: true
url: 2024/06/26/implementing-custom-web-components-in-angular-with-stenciljs/
shortlink: https://g.omid.dev/oVJBMWJ
tags:
  - Angular
  - Frontend Development
  - Web Components
  - StencilJs
lang: en
categories: 
  - techblog
---
In modern web development, the ability to create reusable components that work across different frameworks and libraries is crucial. This is where Web Components come into play. Web Components allow developers to create custom, reusable HTML elements with encapsulated functionality and styling. However, building Web Components from scratch can be complex and time-consuming. Enter Stencil.js, a powerful tool that simplifies the creation of Web Components.

In this guide, we'll explore how to create custom Web Components using Stencil.js and seamlessly integrate them into Angular applications. Whether you're an experienced developer or just getting started, this comprehensive guide will walk you through each step of the process.

## What is Stencil.js?

Stencil.js is a compiler that generates Web Components and builds highly performant, reusable components that can be used with any JavaScript framework or library. Created by the Ionic team, Stencil combines the best features of popular frameworks like Angular, React, and Vue, providing a simple and efficient way to build custom elements.

### Key Features of Stencil.js

1. **TypeScript Support**: Stencil.js is built with TypeScript, providing type safety and modern JavaScript features.
2. **Reactive Data Binding**: Similar to Angular, Stencil.js supports reactive data binding, making it easy to manage component state.
3. **Lazy Loading**: Stencil.js optimizes your components for lazy loading, ensuring faster load times and better performance.
4. **Cross-Framework Compatibility**: Components built with Stencil.js can be used in any framework or no framework at all.

For more detailed information about Stencil.js, visit the [official Stencil documentation](https://stenciljs.com/docs).

## Setting Up Your Development Environment

Before we dive into creating custom Web Components, let's set up our development environment.

### Prerequisites

- Node.js and npm installed on your machine.
- Basic knowledge of TypeScript and Angular.

### Step 1: Install Stencil CLI

First, we need to install the Stencil CLI globally. Open your terminal and run the following command:

```bash
npm install -g @stencil/core
```

### Step 2: Create a New Stencil Project

Next, create a new Stencil project by running:

```bash
npm init stencil
```

You'll be prompted to choose a project type. Select "component" to create a new Web Component project.

### Step 3: Navigate to Your Project Directory

```bash
cd your-stencil-project
```

### Step 4: Install Dependencies

Install the necessary dependencies by running:

```bash
npm install
```

## Creating a Custom Web Component

Now that our environment is set up, let's create a custom Web Component. For this example, we'll create a simple "MyButton" component.

### Step 1: Generate a New Component

In your Stencil project, generate a new component:

```bash
npm run generate
```

You'll be prompted to enter the name of your component. Type "my-button" and press enter.

### Step 2: Define the Component

Open the generated component file (`src/components/my-button/my-button.tsx`) and define your component:

```tsx
import { Component, Prop, h } from '@stencil/core';

@Component({
  tag: 'my-button',
  styleUrl: 'my-button.css',
  shadow: true,
})
export class MyButton {
  @Prop() text: string;

  render() {
    return (
      <button>
        {this.text}
      </button>
    );
  }
}
```

### Step 3: Add Styles

Add some basic styles to your component in the `my-button.css` file:

```css
button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  border-radius: 4px;
}

button:hover {
  background-color: #0056b3;
}
```

### Step 4: Build Your Component

Build your component by running:

```bash
npm run build
```

## Integrating Custom Web Components into Angular

Now that we have our custom Web Component built with Stencil.js, let's integrate it into an Angular application.

### Step 1: Create a New Angular Project

If you don't already have an Angular project, create a new one:

```bash
ng new my-angular-app
```

Navigate to your Angular project directory:

```bash
cd my-angular-app
```

### Step 2: Install the Custom Element Schema

Angular requires custom elements to be registered in the `CUSTOM_ELEMENTS_SCHEMA`. Open the `app.module.ts` file and update it as follows:

```typescript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
```

### Step 3: Import the Custom Web Component

In your Angular project, create a `src/assets` folder if it doesn't exist. Copy the compiled Stencil component files (`my-button.js` and `my-button.css`) into this folder.

Next, update the `angular.json` file to include these files:

```json
"assets": [
  "src/favicon.ico",
  "src/assets"
]
```

Finally, import the custom component in your `main.ts` file:

```typescript
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import 'src/assets/my-button.js';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
```

### Step 4: Use the Custom Web Component in Your Angular Template

Now you can use the custom Web Component in your Angular templates. Open the `app.component.html` file and add the following:

```html
<my-button text="Click Me"></my-button>
```

### Step 5: Serve Your Angular Application

Serve your Angular application to see the custom Web Component in action:

```bash
ng serve
```

Open your browser and navigate to `http://localhost:4200`. You should see the custom button component rendered with the text "Click Me".

## References

- [Stencil.js Documentation](https://stenciljs.com/docs)
- [Angular Documentation](https://angular.dev)

## Conclusion

In this guide, we covered how to create custom Web Components using Stencil.js and integrate them into an Angular application. Stencil.js provides a powerful and flexible way to build reusable components that can work across different frameworks, making it an excellent tool for modern web development.

By leveraging the power of Stencil.js and Angular, you can create highly performant and reusable components that enhance the modularity and maintainability of your codebase. For more information on Stencil.js, visit the [official Stencil documentation](https://stenciljs.com/docs), and for Angular, check out the [official Angular documentation](https://angular.dev).

Feel free to leave any comments or questions below, and I'll be happy to help!
