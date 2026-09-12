---
title: 'Micro Frontends: Working Example'
date: 2024-05-11T17:52:46+03:30
lastmod: 2026-09-13T00:57:00+03:30
description: "A Qwik shell loads separately built Angular and React bundles as custom elements, with a message attribute down and a DOM event back. This demo proves the contract — not Module Federation, and not four production deploys."
layout: single
author_profile: true
url: 2024/05/11/micro-frontends-working-example/
shortlink: https://g.omid.dev/c6nubDQ
tags:
  - Frontend
  - Micro Frontends
  - Angular
  - Web Components

categories:
  - TechBlog
series:
  id: micro-frontends
  title: "Micro Frontends"
  order: 2
  label: "Micro Frontends: Working Example"
  role: part
seeAlso:
  - /2024/05/09/micro-frontends-why/
  - /2024/05/09/micro-frontends-how/
  - /2024/05/12/micro-frontends-vs-monorepo-vs-reusable-shared-module/
---
This is the companion for [Why](/2024/05/09/micro-frontends-why/) and [How](/2024/05/09/micro-frontends-how/). It proves one thing: a host page can load separately built Angular and React bundles as custom elements, pass a `message` attribute down, and take a `microfrontend:message` event back.

It does not prove Module Federation, independent production deploys, or a shared design system. `npm run dev` builds the remotes, then starts one Qwik server that serves them from `public/mfes/`. Rust WebAssembly is a shell helper for CPU work, not a fourth micro frontend.

{{< companion
  repo="omidfarhang/example-projects"
  path="qwik-angular-react-rust"
  demoSlug="qwik-angular-react-rust"
>}}

## The repo

Qwik is the shell. Angular and React are separate apps, exposed as Web Components, and loaded at runtime. The shell owns shared state, passes it down through custom element attributes, and listens for messages through a small DOM event contract.

### Project Structure

```bash
qwik-angular-react-rust/
├── qwik-micro-frontend/   # Qwik shell application
├── angular-app/           # Angular micro frontend
├── react-app/             # React micro frontend
├── rust-wasm/             # Optional Rust WebAssembly module
└── scripts/               # Shared build helpers
```

Each micro frontend builds into `qwik-micro-frontend/public/mfes/`. The optional Rust WASM package is emitted there too, so the shell can serve every independently built piece from one public asset folder. The root `package.json` orchestrates the build so Angular, React, Rust WASM, and the Qwik shell can be built with one command.

### Angular Micro Frontend

The Angular remote in this repo is still an NgModule app: `ngDoBootstrap` plus `createCustomElement`. That is the 2024 demo API, not a recommendation to stay on NgModule. Register the root component as a custom element:

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
  styleUrl: './app.component.scss',
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

The React remote wraps the UI in a custom element, observes the `message` attribute, and isolates its CSS in an open Shadow DOM. Host styles do not restyle this button; the Angular remote, in the light DOM, is not similarly isolated.

```jsx
// react-app/src/index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactMicroFrontend } from './ReactMicroFrontend.jsx';
import styles from './style.css?inline';

class ReactMicroFrontendElement extends HTMLElement {
  static get observedAttributes() {
    return ['message'];
  }

  connectedCallback() {
    if (!this.shadowRoot) {
      const shadow = this.attachShadow({ mode: 'open' });
      const style = document.createElement('style');
      style.textContent = styles;
      shadow.append(style);
      this.mountPoint = document.createElement('div');
      shadow.append(this.mountPoint);
    }

    this.render();
  }

  attributeChangedCallback() {
    this.render();
  }

  disconnectedCallback() {
    this.root?.unmount();
  }

  render() {
    if (!this.mountPoint) {
      return;
    }

    this.root ??= createRoot(this.mountPoint);
    this.root.render(
      <ReactMicroFrontend message={this.getAttribute('message') ?? ''} />,
    );
  }
}

if (!customElements.get('react-microfrontend')) {
  customElements.define('react-microfrontend', ReactMicroFrontendElement);
}
```

Build the React bundle into the shell's public assets:

```bash
cd react-app
npm install
npm run build
```

### Shared Contract in the Qwik Shell

The shell loads the micro frontend bundles, resolves asset URLs from Vite's configured base path, and keeps the shared message in Qwik state:

```tsx
// qwik-micro-frontend/src/routes/index.tsx
import { $, component$, useSignal, useVisibleTask$ } from '@builder.io/qwik';

const assetBase = import.meta.env.BASE_URL;

const assetUrl = (path: string) => {
  const base = assetBase.endsWith('/') ? assetBase : `${assetBase}/`;
  return `${base}${path.replace(/^\//, '')}`;
};

const scripts = new Map<string, Promise<void>>();

const loadScript = (src: string) => {
  if (scripts.has(src)) {
    return scripts.get(src);
  }

  const promise = new Promise<void>((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.type = 'module';
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Unable to load ${src}`));
    document.head.append(script);
  });

  scripts.set(src, promise);
  return promise;
};

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
      loadScript(assetUrl('mfes/angular/polyfills.js')),
      loadScript(assetUrl('mfes/angular/main.js')),
      loadScript(assetUrl('mfes/react/react-microfrontend.js')),
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
- **Deployment paths:** resolve bundles through `import.meta.env.BASE_URL`, so the same demo works locally and under `/examples/qwik-angular-react-rust/`
- **Repeated navigation:** cache script-load promises and guard custom element registration, so the bundles are not registered twice

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

The sample also includes a small Rust WASM helper. When `wasm-pack` is installed, the root build emits it into `qwik-micro-frontend/public/mfes/rust-wasm`, and the Qwik shell imports it dynamically:

```tsx
const importBrowserModule = new Function(
  'src',
  'return import(src)',
) as <T>(src: string) => Promise<T>;

importBrowserModule<RustWasm>(assetUrl('mfes/rust-wasm/rust_wasm.js'))
  .then(async (rust) => {
    await rust.default();
    window.rustWasmApi = rust;
    rustStats.value = rust.analyze_message(message.value);
  })
  .catch(() => {
    rustStats.value =
      'Run `npm run build:rust` from the project root to enable Rust WASM.';
  });
```

The Rust side exposes two functions:

```rust
#[wasm_bindgen]
pub fn analyze_message(input: &str) -> String {
    let chars = input.chars().count();
    let words = input.split_whitespace().count();
    let checksum = input.bytes().fold(0u32, |acc, byte| acc.wrapping_add(byte as u32));

    format!("{chars} chars - {words} words - checksum {checksum}")
}

#[wasm_bindgen]
pub fn count_primes(limit: u32) -> u32 {
    // Prime sieve implementation used by the shell's benchmark button.
}
```

`analyze_message` updates whenever the shared message changes. `count_primes` powers the "Run prime sieve in Rust WASM" button, which gives the demo a small but real CPU-bound WebAssembly task. If `wasm-pack` is not installed, the Rust build is skipped by default so the JavaScript micro frontends still run.

### Conclusion

The shell is Qwik. Angular and React land as custom elements. Rust WebAssembly stays a helper inside the host. Instead of a shared Redux store, the page talks through a `message` attribute and a `microfrontend:message` event.

That is enough to keep each app independently *buildable* on one cohesive page. Independent *production deploys* are a later infrastructure step — not what this repo ships. If you are still choosing between this pattern, a monorepo, and a shared Angular library, the standalone comparison is [Micro Frontends vs Monorepo vs Shared Module](/2024/05/12/micro-frontends-vs-monorepo-vs-reusable-shared-module/).
