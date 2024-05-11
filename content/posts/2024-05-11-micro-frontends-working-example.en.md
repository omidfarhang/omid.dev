---
title: 'Micro Frontends: Working Example'
date: 2024-05-11T17:52:46+03:30
layout: single
author_profile: true
url: 2024/05/11/micro-frontends-working-example/
shortlink: https://g.omid.dev/oxMfrkW
tags:
  - frontend
  - web
  - development
lang: en
categories: 
  - techblog
---
We already talked about [Why using Micro Frontend](/2024/05/09/micro-frontends-why/) and [How to use it](/2024/05/09/micro-frontends-how/). But now let's explorer a working example to understand it better.

## Building a Micro Frontend Architecture with Qwik, Angular, and React

Micro frontend architecture is gaining popularity as a way to develop scalable and modular web applications. By breaking down a monolithic frontend into smaller, independently deployable modules, teams can work more efficiently and scale their applications with ease. In this tutorial, we'll explore how to build a micro frontend architecture using Qwik as the shell application and integrating Angular and React components as micro frontends. We'll also utilize Redux for communication between the micro frontends.

### Setting Up the Project

First, let's set up the project structure and install the necessary dependencies.

```bash
# Create a new Qwik project
npx create-qwik my-micro-frontend-app
cd my-micro-frontend-app

# Install Redux for state management
npm install redux react-redux @reduxjs/toolkit

# Create Angular and React micro frontend projects
ng new angular-microfrontend
npx create-react-app react-microfrontend
```

### Integrating Angular and React Micro Frontends

Next, let's integrate the Angular and React micro frontends into our Qwik shell application using Web Components.

#### Angular Microfrontend

In the Angular micro frontend project (`angular-microfrontend`), let's create a Web Component to encapsulate the Angular component.

```typescript
// angular-microfrontend/src/app/angular-web-component.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'angular-web-component',
  template: `<h2>Hello from Angular!</h2>`,
})
export class AngularWebComponentComponent {
  @Input() message: string;
}
```

Then, build the Angular project and export the Web Component.

```bash
cd angular-microfrontend
ng build --prod --output-hashing none
```

#### React Microfrontend

In the React micro frontend project (`react-microfrontend`), let's create a Web Component to encapsulate the React component.

```jsx
// react-microfrontend/src/ReactWebComponent.js
import React from 'react';
import ReactDOM from 'react-dom';

const ReactWebComponent = ({ message }) => (
  <div>
    <h2>Hello from React!</h2>
    <p>{message}</p>
  </div>
);

class ReactWebComponentElement extends HTMLElement {
  connectedCallback() {
    const message = this.getAttribute('message');
    ReactDOM.render(<ReactWebComponent message={message} />, this);
  }
}

customElements.define('react-web-component', ReactWebComponentElement);
```

### Integrating Redux for Communication

To enable communication between the micro frontends, let's set up Redux and define actions and reducers.

```javascript
// redux/actions.js
export const setMessage = (message) => ({
  type: 'SET_MESSAGE',
  payload: message,
});

// redux/reducers.js
const initialState = { message: '' };

export const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_MESSAGE':
      return { ...state, message: action.payload };
    default:
      return state;
  }
};
```

### Setting Up Routing in Qwik

Finally, let's set up routing in the Qwik shell application to navigate between the micro frontends.

```typescript
// app.qwik.json
{
  "route": "/",
  "import": "./src/components/Home/HomeComponent",
  "type": "component"
},
{
  "route": "/angular",
  "import": "./src/components/Angular/AngularComponent",
  "type": "component"
},
{
  "route": "/react",
  "import": "./src/components/React/ReactComponent",
  "type": "component"
}
```

### Putting It All Together

Now that we have our micro frontends and Redux set up, we can integrate them into the Qwik shell application.

```typescript
// src/components/Home/HomeComponent.tsx
import { h } from 'qwik';
import { useDispatch } from 'react-redux';
import { setMessage } from '../../../redux/actions';

export default function HomeComponent() {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(setMessage('Message from Qwik Shell'));
  };

  return (
    <div>
      <h1>Welcome to Qwik Shell Application</h1>
      <button onClick={handleClick}>Set Message</button>
      <a href="/angular">Go to Angular Microfrontend</a>
      <a href="/react">Go to React Microfrontend</a>
    </div>
  );
}
```

```typescript
// src/components/Angular/AngularComponent.tsx
import { h } from 'qwik';
import { useSelector } from 'react-redux';

export default function AngularComponent() {
  const message = useSelector((state) => state.message);

  return (
    <div>
      <h1>Angular Microfrontend</h1>
      <angular-web-component message={message}></angular-web-component>
    </div>
  );
}
```

```typescript
// src/components/React/ReactComponent.tsx
import { h } from 'qwik';
import { useSelector } from 'react-redux';

export default function ReactComponent() {
  const message = useSelector((state) => state.message);

  return (
    <div>
      <h1>React Microfrontend</h1>
      <react-web-component message={message}></react-web-component>
    </div>
  );
}
```

### Running the Application

Now, let's run the Qwik shell application along with the Angular and React micro frontends.

```bash
# Start the Qwik shell application
npm start

# Start the Angular micro frontend
cd angular-microfrontend
npm start

# Start the React micro frontend
cd react-microfrontend
npm start
```

Visit `http://localhost:8080` to see the Qwik shell application with integrated Angular and React micro frontends. You can navigate between the micro frontends and observe Redux communication in action.

### Conclusion

In this tutorial, we've learned how to build a micro frontend architecture using Qwik as the shell application and integrating Angular and React components as micro frontends. We've also utilized Redux for communication between the micro frontends. By adopting a micro frontend architecture, teams can work more efficiently, scale their applications with ease, and provide a seamless user experience.
