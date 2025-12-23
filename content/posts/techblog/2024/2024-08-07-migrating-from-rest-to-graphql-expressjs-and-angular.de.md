---
title: "Migration von REST zu GraphQL: Ein Schritt-für-Schritt-Leitfaden für Express.js und Angular"
date: 2024-08-07T02:20:56+03:30
layout: single
author_profile: true
url: 2024/08/07/migrating-from-rest-to-graphql-a-step-by-step-guide-for-expressjs-and-angular/
shortlink: https://g.omid.dev/1OPJS9o
tags:
  - GraphQL
  - API-Migration
  - ExpressJs
  - Angular
  - Apollo Server
  - Webentwicklung
  - Frontend-Entwicklung
lang: de
categories: 
  - TechBlog
---
In der sich heute rasant entwickelnden Webentwicklungslandschaft hat sich GraphQL als leistungsstarke Alternative zu traditionellen REST-APIs herauskristallisiert. Dieser Blogbeitrag führt Sie durch den Prozess der Migration Ihres Express.js-Backends und Angular-Frontends von REST zu GraphQL und erschließt die Vorteile einer flexibleren und effizienteren API-Architektur.

## 1. Einleitung

REST (Representational State Transfer) ist seit vielen Jahren der Standard-Architekturstil für den Aufbau von Web-APIs. GraphQL, entwickelt von Facebook, bietet jedoch mehrere Vorteile:

- Reduziertes Over-Fetching und Under-Fetching von Daten
- Starke Typisierung und Introspektion
- Ein einziger Endpunkt für alle Operationen
- Verbesserte Performance und Flexibilität

Durch die Migration zu GraphQL können Sie eine effizientere und wartbarere API erstellen, die die Anforderungen Ihres Frontends besser erfüllt.

## 2. Backend-Migration (Express.js zu GraphQL)

Beginnen wir mit der Umwandlung unserer Express.js REST-API in einen GraphQL-Server.

### Notwendige Pakete installieren

Installieren Sie zunächst die erforderlichen Pakete:

```bash
npm install apollo-server-express graphql
```

### GraphQL-Schema definieren

Erstellen Sie eine neue Datei namens `schema.js` und definieren Sie Ihr GraphQL-Schema:

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

### Resolver erstellen

Erstellen Sie als Nächstes eine Datei `resolvers.js`, um die Logik für Ihre GraphQL-Operationen zu implementieren:

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

### Apollo Server einrichten

Erstellen Sie eine neue Datei namens `apolloServer.js`:

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

### Apollo Server in Express.js integrieren

Aktualisieren Sie Ihre Hauptdatei `app.js`:

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
  console.log(`Server läuft auf Port ${PORT}`);
});
```

## 3. Frontend-Migration (Angular zu Apollo Angular)

Aktualisieren wir nun unser Angular-Frontend für die Nutzung von GraphQL.

### Apollo Angular Pakete installieren

```bash
ng add apollo-angular
```

### Apollo Client in Angular einrichten

Aktualisieren Sie `app.module.ts`:

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

### HTTP-Services durch Apollo-Queries und -Mutationen ersetzen

Erstellen Sie eine neue Service-Datei `user.service.ts`:

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

### Komponenten für die Nutzung von Apollo aktualisieren

Aktualisieren Sie Ihre Komponentendateien für die Nutzung des neuen `UserService`:

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

## 4. Testen und Validierung

Nach Abschluss der Migration ist es entscheidend, Ihre neue GraphQL-API gründlich zu testen:

1. Nutzen Sie Tools wie GraphQL Playground oder Apollo Studio, um Ihre GraphQL-Endpunkte zu testen.
2. Überprüfen Sie, ob alle Frontend-Funktionalitäten wie erwartet mit den neuen GraphQL-Queries und -Mutationen funktionieren.
3. Schreiben Sie Unit- und Integrationstests sowohl für die Backend-Resolver als auch für die Frontend-Services.

## 5. Performance-Optimierung

Um eine optimale Performance Ihrer GraphQL-API zu gewährleisten:

1. Implementieren Sie Data Loader, um Datenbankabfragen zu bündeln und zu cachen:

    ```javascript
    const DataLoader = require('dataloader');

    const userLoader = new DataLoader(async (ids) => {
      const users = await UserModel.find({ _id: { $in: ids } });
      return ids.map(id => users.find(user => user.id === id));
    });
    ```

2. Nutzen Sie Caching-Strategien, wie den InMemoryCache von Apollo Client, um Netzwerkanfragen zu reduzieren.

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

## 6. Best Practices und Überlegungen

Behalten Sie zum Abschluss Ihrer Migration diese Best Practices im Hinterkopf:

1. Implementieren Sie eine ordnungsgemäße Fehlerbehandlung in Ihren GraphQL-Resolvern.
2. Richten Sie Authentifizierung und Autorisierung für Ihre GraphQL-API ein.
3. Entwerfen Sie Ihr Schema sorgfältig und berücksichtigen Sie zukünftige Skalierbarkeit und Performance.
4. Nutzen Sie Fragmente und Query-Komposition, um Ihre Frontend-Queries DRY (Don't Repeat Yourself) und wartbar zu halten.

## 7. Fazit

Die Migration von REST zu GraphQL kann die Effizienz und Flexibilität Ihrer API erheblich verbessern. Durch das Befolgen dieses Leitfadens haben Sie Ihr Express.js-Backend und Angular-Frontend erfolgreich auf GraphQL umgestellt und damit neue Möglichkeiten für die Architektur Ihrer Anwendung eröffnet.

Nächste Schritte, die Sie in Betracht ziehen sollten:

- Erkunden Sie fortgeschrittene GraphQL-Features wie Subscriptions für Echtzeit-Updates.
- Implementieren Sie eine umfassende Monitoring- und Logging-Strategie für Ihre GraphQL-API.
- Verfeinern Sie Ihr Schema kontinuierlich basierend auf tatsächlichen Nutzungsmustern und Performance-Metriken.

Denken Sie daran, dass der Weg zu einer vollständig optimierten GraphQL-API ein fortlaufender Prozess ist. Lernen und iterieren Sie ständig, um das Beste aus dieser leistungsstarken Technologie herauszuholen.
