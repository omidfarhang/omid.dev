---
title: 'Micro Frontends: Working Example'
date: 2024-05-11T17:52:46+03:30
layout: single
author_profile: true
url: 2024/05/11/micro-frontends-working-example/
shortlink: https://g.omid.dev/c6nubDQ
tags:
  - Frontend
  - development
  - Angular
  - qwik
  - react
  - Micro Frontends

categories:
  - TechBlog
---
We already talked about [Why using Micro Frontend](/2024/05/09/micro-frontends-why/) and [How to use it](/2024/05/09/micro-frontends-how/). Now let's explore a working example to understand it better.

**Full source code:** [github.com/omidfarhang/example-projects/tree/main/qwik-angular-react-rust](https://github.com/omidfarhang/example-projects/tree/main/qwik-angular-react-rust)

## Building a Micro Frontend Architecture with Qwik, Angular, and React

Micro frontend architecture is a practical way to develop scalable and modular web applications. By breaking down a monolithic frontend into smaller, independently deployable modules, teams can work more efficiently and scale their applications with ease.

In this example, Qwik acts as the shell application. Angular and React are built as separate micro frontends, exposed as Web Components, and loaded into the shell at runtime. The shell owns shared state and passes it down through custom element attributes. Micro frontends can send messages back to the shell through a small DOM event contract.

### Project Structure

```bash
qwik-angular-react-rust/
├── qwik-micro-frontend/   # Qwik shell application
├── angular-app/           # Angular micro frontend
├── react-app/             # React micro frontend
├── rust-wasm/             # Optional Rust WebAssembly module
└── scripts/               # Shared build helpers
```

Each micro frontend builds into `qwik-micro-frontend/public/mfes/`. The shell serves those bundles and composes them on one page.

### Angular Micro Frontend

In the Angular project, register the root component as a custom element:

```typescript
// angular-app/src/app/app.module.ts
import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { createCustomElement } from '@angular/elements';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule],
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    if (!customElements.get('angular-microfrontend')) {
      const appElement = createCustomElement(AppComponent, {
        injector: this.injector,
      });

      customElements.define('angular-microfrontend', appElement);
    }
  }
}
```

The Angular component accepts input from the shell through a standard `@Input()`:

```typescript
// angular-app/src/app/app.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  @Input() message = '';

  sendMessage() {
    window.dispatchEvent(
      new CustomEvent('microfrontend:message', {
        detail: {
          source: 'Angular',
          message: 'Angular handled the shared contract',
        },
      }),
    );
  }
}
```

Build the Angular bundle into the shell's public assets:

```bash
cd angular-app
npm install
npm run build
```

### React Micro Frontend

In the React project, wrap the UI in a custom element and react to attribute changes:

```jsx
// react-app/src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactMicroFrontend } from './ReactMicroFrontend.jsx';

class ReactMicroFrontendElement extends HTMLElement {
  static get observedAttributes() {
    return ['message'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.root ??= createRoot(this);
    this.root.render(
      <ReactMicroFrontend message={this.getAttribute('message') ?? ''} />,
    );
  }
}

customElements.define('react-microfrontend', ReactMicroFrontendElement);
```

Build the React bundle into the shell's public assets:

```bash
cd react-app
npm install
npm run build
```

### Shared Contract in the Qwik Shell

The shell loads the micro frontend bundles and keeps the shared message in Qwik state:

```tsx
// qwik-micro-frontend/src/routes/index.tsx
import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

export default component$(() => {
  const assetsReady = useSignal(false);
  const message = useSignal('Hello from the Qwik shell');

  useVisibleTask$(({ cleanup }) => {
    const handleMicroFrontendMessage = (event: Event) => {
      const { source, message: nextMessage } = (event as CustomEvent).detail;
      message.value = `${source}: ${nextMessage}`;
    };

    window.addEventListener('microfrontend:message', handleMicroFrontendMessage);

    Promise.all([
      loadScript('/mfes/angular/polyfills.js'),
      loadScript('/mfes/angular/main.js'),
      loadScript('/mfes/react/react-microfrontend.js'),
    ]).then(() => {
      assetsReady.value = true;
    });

    cleanup(() => {
      window.removeEventListener('microfrontend:message', handleMicroFrontendMessage);
    });
  });

  const updateFromShell = $(() => {
    message.value = 'Qwik updated the contract for every micro frontend';
  });

  return (
    <main>
      <button type="button" onClick$={updateFromShell}>
        Update shared message from Qwik
      </button>

      {assetsReady.value ? (
        <>
          <angular-microfrontend message={message.value}></angular-microfrontend>
          <react-microfrontend message={message.value}></react-microfrontend>
        </>
      ) : (
        <p>Loading micro frontend bundles...</p>
      )}
    </main>
  );
});
```

This keeps the integration simple:

- **Shell to micro frontend:** pass data through custom element attributes
- **Micro frontend to shell:** dispatch a `microfrontend:message` DOM event

That is enough for a small demo and keeps each app loosely coupled.

### Running the Application

From the project root:

```bash
npm install --prefix qwik-micro-frontend
npm install --prefix angular-app
npm install --prefix react-app
npm run dev
```

Visit `http://localhost:5173`. You should see the Qwik shell with Angular and React micro frontends on the same page. Click the shell button to push a new message to both micro frontends, then click a button inside Angular or React to send a message back to the shell.

To build everything for production:

```bash
npm run build
```

### Optional Rust WebAssembly Module

The sample also includes a small Rust WASM helper. When `wasm-pack` is installed, the shell can import it from `/mfes/rust-wasm/rust_wasm.js` and display a formatted message from Rust.

### Conclusion

In this example, we built a micro frontend architecture using Qwik as the shell and integrated Angular and React through Web Components. Instead of forcing every framework into one shared Redux store, the shell and micro frontends communicate through a small, explicit contract.

That keeps each micro frontend independently buildable and deployable while still giving users one cohesive page.
