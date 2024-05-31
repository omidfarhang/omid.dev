---
title: 'Integrating GraphQL with Angular: A Practical Guide'
date: 2024-06-01T00:50:01+03:30
layout: single
author_profile: true
url: 2024/06/01/integrating-graphql-with-angular-a-practical-guide/
shortlink: https://g.omid.dev/DueHz4c
tags:
  - Frontend
  - Angular
  - GraphQL
  - Apollo Client
  - Angular Integrations
lang: en
categories: 
  - techblog
---
GraphQL is a powerful query language for APIs, providing a flexible and efficient alternative to REST. Combining it with Angular, a robust front-end framework, can lead to highly dynamic and responsive web applications. In this guide, we'll explore how to integrate GraphQL with Angular, leveraging the Apollo Client for seamless data management.

## 1. Introduction to GraphQL and Angular

### What is GraphQL?

GraphQL is an open-source data query language developed by Facebook. It allows clients to request exactly the data they need, making APIs more flexible and efficient.

### Why Use Angular?

Angular is a popular front-end framework maintained by Google. It offers a rich set of features for building single-page applications, including powerful data binding, dependency injection, and component-based architecture.

### Benefits of Integrating GraphQL with Angular

- **Efficiency**: Retrieve only the data you need.
- **Flexibility**: Easily adapt to changing requirements.
- **Real-time Updates**: Support for subscriptions allows real-time data updates.

## 2. Setting Up an Angular Project

First, ensure you have Node.js and npm installed. Then, create a new Angular project using the Angular CLI:

```bash
npm install -g @angular/cli
ng new angular-graphql-app
cd angular-graphql-app
```

## 3. Installing Apollo Client for Angular

Apollo Client is a popular GraphQL client that works seamlessly with Angular. Install the necessary packages:

```bash
npm install @apollo/client graphql
npm install apollo-angular
```

## 4. Configuring Apollo Client

To configure Apollo Client, you'll need to set up an Apollo module in your Angular application.

Create a file `src/app/graphql.module.ts` and add the following code:

```typescript
import { NgModule } from '@angular/core';
import { ApolloClient, InMemoryCache } from '@apollo/client/core';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';

const uri = 'https://your-graphql-endpoint.com/graphql';

export function createApollo(httpLink: HttpLink) {
  return {
    link: httpLink.create({ uri }),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  imports: [ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
})
export class GraphQLModule {}
```

Next, import this module into your `AppModule`:

```typescript
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, GraphQLModule, HttpClientModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

## 5. Making GraphQL Queries

Now, let's make a simple query. Create a service `src/app/graphql.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  constructor(private apollo: Apollo) {}

  getItems() {
    return this.apollo.query({
      query: gql`
        query {
          items {
            id
            name
          }
        }
      `,
    });
  }
}
```

Then, use this service in a component to fetch and display data:

```typescript
import { Component, OnInit } from '@angular/core';
import { GraphQLService } from './graphql.service';

@Component({
  selector: 'app-root',
  template: `
    <div *ngIf="items">
      <div *ngFor="let item of items">{{ item.name }}</div>
    </div>
  `,
})
export class AppComponent implements OnInit {
  items: any[];

  constructor(private graphqlService: GraphQLService) {}

  ngOnInit() {
    this.graphqlService.getItems().subscribe((result: any) => {
      this.items = result.data.items;
    });
  }
}
```

## 6. Handling Mutations

To perform mutations (create, update, delete operations), extend the `GraphQLService`:

```typescript
@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  // ...

  addItem(name: string) {
    return this.apollo.mutate({
      mutation: gql`
        mutation($name: String!) {
          addItem(name: $name) {
            id
            name
          }
        }
      `,
      variables: {
        name,
      },
    });
  }
}
```

## 7. Subscriptions with GraphQL

For real-time updates, Apollo Client supports subscriptions. You need a WebSocket link:

Install the WebSocket link package:

```bash
npm install @apollo/client @apollo/client/link/ws
```

Update the `graphql.module.ts`:

```typescript
import { ApolloClient, InMemoryCache, split } from '@apollo/client/core';
import { WebSocketLink } from '@apollo/client/link/ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { HttpLink } from 'apollo-angular/http';

const httpUri = 'https://your-graphql-endpoint.com/graphql';
const wsUri = 'ws://your-graphql-endpoint.com/graphql';

export function createApollo(httpLink: HttpLink) {
  const http = httpLink.create({ uri: httpUri });

  const ws = new WebSocketLink({
    uri: wsUri,
    options: {
      reconnect: true,
    },
  });

  const link = split(
    ({ query }) => {
      const definition = getMainDefinition(query);
      return (
        definition.kind === 'OperationDefinition' &&
        definition.operation === 'subscription'
      );
    },
    ws,
    http
  );

  return {
    link,
    cache: new InMemoryCache(),
  };
}
```

Add a subscription in your service:

```typescript
@Injectable({
  providedIn: 'root',
})
export class GraphQLService {
  // ...

  onItemAdded() {
    return this.apollo.subscribe({
      query: gql`
        subscription {
          itemAdded {
            id
            name
          }
        }
      `,
    });
  }
}
```

Use this subscription in your component:

```typescript
ngOnInit() {
  this.graphqlService.getItems().subscribe((result: any) => {
    this.items = result.data.items;
  });

  this.graphqlService.onItemAdded().subscribe((result: any) => {
    this.items.push(result.data.itemAdded);
  });
}
```

## 8. Conclusion

Integrating GraphQL with Angular using Apollo Client brings numerous benefits, including efficient data fetching, flexibility, and support for real-time updates. By following this guide, you can set up a robust and responsive Angular application that leverages the power of GraphQL.

Happy coding!

---

Feel free to leave any questions or comments below. If you enjoyed this guide, share it with your friends and colleagues!
