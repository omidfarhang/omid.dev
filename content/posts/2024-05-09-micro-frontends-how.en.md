---
title: 'Micro Frontends: How?'
date: 2024-05-09T14:09:02+03:30
layout: single
author_profile: true
url: 2024/05/09/micro-frontends-how/
shortlink: https://g.omid.dev/oxMfrkW
tags:
  - frontend
  - development
  - angular
  - qwik
  - react
lang: en
categories: 
  - techblog
---
We already talked about [Micro Frontends: Why?](/2024/05/09/micro-frontends-why/)

In This post we used Qwik, Angular and React as example. But you can mix any other JS frameworks of your choice.

Here's a simplified example demonstrating how you can integrate Qwik, Angular, and React together in a micro frontend architecture:

1. **Setup**:
   - Create a shell application using Qwik as the main container.
   - Develop micro frontends using Angular and React for different parts of the application.

2. **Integration**:
   - Embed Angular and React micro frontends within Qwik components using Iframes, Web Components, or any other suitable integration method.

3. **Communication**:
   - Establish communication channels between Qwik, Angular, and React micro frontends using custom events, shared state management libraries, or other mechanisms.

4. **Routing**:
   - Define routing within the shell application (Qwik) and coordinate routing between Qwik, Angular, and React micro frontends to ensure a seamless user experience.

## How does it look likes?

```bash
project/
│
├── shell-app/               # Qwik Shell Application
│   ├── src/
│   │   ├── components/      # Qwik Components
│   │   ├── services/        # Shared Services
│   │   └── ...
│   └── ...
│
├── angular-microfrontend/   # Angular Microfrontend
│   ├── src/
│   │   ├── app/             # Angular Components
│   │   ├── services/        # Shared Services (if any)
│   │   └── ...
│   └── ...
│
├── react-microfrontend/     # React Microfrontend
│   ├── src/
│   │   ├── components/      # React Components
│   │   ├── services/        # Shared Services (if any)
│   │   └── ...
│   └── ...
│
└── ...
```

In this setup, the Qwik shell application acts as the main container, while the Angular and React micro frontends represent different parts of the application.

## Integrate

### via Iframe

Here's a basic example of how you might integrate an Angular micro frontend into a Qwik component using an Iframe:

```javascript
// Qwik Component
import { h, Fragment } from 'qwik';

export default function MyApp() {
  return (
    <Fragment>
      <h1>Qwik Shell Application</h1>
      <iframe src="http://localhost:4200" frameborder="0" width="100%" height="500px"></iframe>
    </Fragment>
  );
}
```

Similarly, you can integrate the React micro frontend into a Qwik component using an Iframe or any other suitable method.

### via Web Components

There are alternative options to Iframes for integrating Qwik, Angular, and React micro frontends within a shell application. One such option is using Web Components.

Web Components provide a native browser solution for encapsulating custom elements, making them a great choice for integrating disparate frontend frameworks within a single application. With Web Components, you can create reusable UI components that can be used across different frameworks, including Qwik, Angular, and React.

Here's how you might integrate Qwik, Angular, and React micro frontends using Web Components:

1. **Create Web Components**: 
   - Develop custom Web Components for each micro frontend using vanilla JavaScript or a framework/library like LitElement or Stencil.js. These components encapsulate the functionality and UI of each micro frontend.

2. **Register Web Components**: 
   - Register the Web Components within your shell application (Qwik) so that they can be used like native HTML elements.

3. **Use Web Components in Qwik Components**: 
   - Embed the Web Components representing Angular and React micro frontends directly within Qwik components, without the need for Iframes.

Here's a basic example of how you might use a Web Component representing an Angular micro frontend within a Qwik component:

```javascript
// Qwik Component
import { h, Fragment } from 'qwik';

export default function MyApp() {
  return (
    <Fragment>
      <h1>Qwik Shell Application</h1>
      <angular-microfrontend></angular-microfrontend>
    </Fragment>
  );
}
```

In this example, `angular-microfrontend` is a custom Web Component representing the Angular micro frontend, which can be used directly within the Qwik component without the need for Iframes.

Similarly, you can create and use Web Components representing React micro frontends within your Qwik components.

Using Web Components provides a more seamless integration compared to Iframes, as it allows the micro frontends to share the same DOM context and interact more closely with each other. Additionally, Web Components offer better performance and accessibility compared to Iframes.

## Define Communication Mechanism

To allow communication between micro frontends and the shell, consider using a shared state management library like Redux, Mobx, or a custom event bus. This enables micro frontends to interact with each other and share data.

