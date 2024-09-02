---
title: "Migrating from REST to GraphQL: A Step-by-Step Guide for Express.js and Angular"
date: 2024-08-07T02:20:56+03:30
layout: single
author_profile: true
url: 2024/08/07/migrating-from-rest-to-graphql-a-step-by-step-guide-for-expressjs-and-angular/
shortlink: https://g.omid.dev/1OPJS9o
tags:
  - GraphQL
  - API Migration
  - ExpressJs
  - Angular
  - Apollo Server
  - Web Development
  - Frontend Development
lang: en
categories: 
  - techblog
---
In today's rapidly evolving web development landscape, GraphQL has emerged as a powerful alternative to traditional REST APIs. This blog post will guide you through the process of migrating your Express.js backend and Angular frontend from REST to GraphQL, unlocking the benefits of a more flexible and efficient API architecture.

## 1. Introduction

REST (Representational State Transfer) has been the go-to architectural style for building web APIs for many years. However, GraphQL, developed by Facebook, offers several advantages:

- Reduced over-fetching and under-fetching of data
- Strong typing and introspection
- A single endpoint for all operations
- Improved performance and flexibility

By migrating to GraphQL, you can create a more efficient and maintainable API that better serves your frontend needs.

## 2. Backend Migration (Express.js to GraphQL)

Let's start by converting our Express.js REST API to a GraphQL server.

### Install necessary packages

First, install the required packages:

```bash
npm install apollo-server-express graphql
```

### Define GraphQL schema

Create a new file called `schema.js` and define your GraphQL schema:

```javascript
const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }

  type Mutation {
    createUser(name: String!, email: String!): User
    updateUser(id: ID!, name: String, email: String): User
    deleteUser(id: ID!): Boolean
  }
`;

module.exports = typeDefs;
```

### Create resolvers

Next, create a `resolvers.js` file to implement the logic for your GraphQL operations:

```javascript
const resolvers = {
  Query: {
    users: async (_, __, { dataSources }) => {
      return dataSources.userAPI.getUsers();
    },
    user: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.getUser(id);
    },
  },
  Mutation: {
    createUser: async (_, { name, email }, { dataSources }) => {
      return dataSources.userAPI.createUser({ name, email });
    },
    updateUser: async (_, { id, name, email }, { dataSources }) => {
      return dataSources.userAPI.updateUser(id, { name, email });
    },
    deleteUser: async (_, { id }, { dataSources }) => {
      return dataSources.userAPI.deleteUser(id);
    },
  },
};

module.exports = resolvers;
```

### Set up Apollo Server

Create a new file called `apolloServer.js`:

```javascript
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const UserAPI = require('./dataSources/userAPI');

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    userAPI: new UserAPI(),
  }),
});

module.exports = server;
```

### Integrate Apollo Server with Express.js

Update your main `app.js` file:

```javascript
const express = require('express');
const apolloServer = require('./apolloServer');

const app = express();

async function startServer() {
  await apolloServer.start();
  apolloServer.applyMiddleware({ app });
}

startServer();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

## 3. Frontend Migration (Angular to Apollo Angular)

Now, let's update our Angular frontend to use GraphQL.

### Install Apollo Angular packages

```bash
ng add apollo-angular
```

### Set up Apollo Client in Angular

Update `app.module.ts`:

```typescript
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, APOLLO_OPTIONS } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  imports: [HttpClientModule, ApolloModule],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: (httpLink: HttpLink) => {
        return {
          cache: new InMemoryCache(),
          link: httpLink.create({
            uri: 'http://localhost:3000/graphql',
          }),
        };
      },
      deps: [HttpLink],
    },
  ],
})
export class AppModule {}
```

### Replace HTTP services with Apollo queries and mutations

Create a new service file, `user.service.ts`:

```typescript
import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private apollo: Apollo) {}

  getUsers(): Observable<any[]> {
    return this.apollo
      .watchQuery({
        query: gql`
          query GetUsers {
            users {
              id
              name
              email
            }
          }
        `,
      })
      .valueChanges.pipe(map((result: any) => result.data.users));
  }

  createUser(name: string, email: string): Observable<any> {
    return this.apollo
      .mutate({
        mutation: gql`
          mutation CreateUser($name: String!, $email: String!) {
            createUser(name: $name, email: $email) {
              id
              name
              email
            }
          }
        `,
        variables: { name, email },
      })
      .pipe(map((result: any) => result.data.createUser));
  }
}
```

### Update components to use Apollo

Update your component files to use the new `UserService`:

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-list',
  template: `
    <ul>
      <li *ngFor="let user of users">{{ user.name }} ({{ user.email }})</li>
    </ul>
  `,
})
export class UserListComponent implements OnInit {
  users: any[] = [];

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
```

## 4. Testing and Validation

After completing the migration, it's crucial to thoroughly test your new GraphQL API:

1. Use tools like GraphQL Playground or Apollo Studio to test your GraphQL endpoints.
2. Verify that all frontend functionality works as expected with the new GraphQL queries and mutations.
3. Write unit and integration tests for both backend resolvers and frontend services.

## 5. Performance Optimization

To ensure optimal performance of your GraphQL API:

1. Implement data loaders to batch and cache database queries:

    ```javascript
    const DataLoader = require('dataloader');

    const userLoader = new DataLoader(async (ids) => {
      const users = await UserModel.find({ _id: { $in: ids } });
      return ids.map(id => users.find(user => user.id === id));
    });
    ```

2. Use caching strategies, such as Apollo Client's InMemoryCache, to reduce network requests.

    ```javascript
    import { InMemoryCache } from '@apollo/client/core';
    
    const cache = new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            users: {
              merge(existing = [], incoming: any[]) {
                return incoming;
              },
            },
          },
        },
      },
    });
    ```

## 6. Best Practices and Considerations

As you complete your migration, keep these best practices in mind:

1. Implement proper error handling in your GraphQL resolvers.
2. Set up authentication and authorization for your GraphQL API.
3. Design your schema carefully, considering future scalability and performance.
4. Use fragments and query composition to keep your frontend queries DRY and maintainable.

## 7. Conclusion

Migrating from REST to GraphQL can significantly improve the efficiency and flexibility of your API. By following this guide, you've successfully converted your Express.js backend and Angular frontend to use GraphQL, opening up new possibilities for your application's architecture.

Next steps to consider:

- Explore advanced GraphQL features like subscriptions for real-time updates.
- Implement a comprehensive monitoring and logging strategy for your GraphQL API.
- Continuously refine your schema based on actual usage patterns and performance metrics.

Remember, the journey to a fully optimized GraphQL API is ongoing. Keep learning and iterating to make the most of this powerful technology.
