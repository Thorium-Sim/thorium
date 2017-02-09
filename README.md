# Thorium Server

[![Slack Status](https://slack.ralexanderson.com/badge.svg)](https://slack.ralexanderson.com)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/alexanderson1993/thorium)

A GraphQL endpoint server for Thorium. Built with [Apollo-Server](http://www.apollodata.com/) and ❤ by [Alex Anderson](http://ralexanderson.com).

## Getting Started

```sh
npm install
npm run start
```

Then open [http://localhost:3001/graphiql](http://localhost:3001/graphiql)

## Event Sourcing

Thorium Server is built on an event sourcing model coupled with CQRS. GraphQL serves this purpose well. Queries are normal GraphQL queries. Commands are mutations which return an empty string. When a command is fired, it dispatches an event which is stored in an event store. Event consumers detect the new event and trigger based on that event.

If the event store is accessible, the consumers don't even have to be on this server - they can be any number of microprocesses across any number of computers and environments. 

```
               +------------+
               |            |
               |   Client   |
               |            |
               +-----+------+
                     |
                     |
                     |
              +------+-----+
              |            |
              |  Mutation  |
              |            |
              +-----+------+
                    |
                    |
                    |
              +-----v------+
              |            |
              |  Event     |
              |  Emitter   |
        +-----+------+-----+--------+
        |            |              |
        |            |              |
+-------v---+ +------v-----+  +-----v------+
|           | |            |  |            |
| Event     ^ |  Event     |  |  Event     |
| Consumers | |  Consumers |  |  Consumers |
+-----+-----+ +-----+------+  +------+-----+
      |             |                |
      |             |                |
+-----v-----+ +-----v------+  +------v-----+
| Update    | |               |  Trigger   |
| Database  | |Fire        |  |  Effect    |
|           | |Subscription|  |            |
+-----------+ +------------+  +------------+
```

## Folder Structure

```
.
├── Dockerfile // Dockerized and ready to run in the cloud
├── README.md
├── app.js // Where the magic happens. This is where the event store lives
├── data
│   ├── classes // Object classes for all of the major parts of the simulator. Systems have their own class. When writing classes, be sure to include a 'class' propterty so the snapshot restore knows what class to instantiate data with
│   ├── data.js //Brings the schema and resovlers together
│   ├── resolvers //Resolver functions, split out. A template is available. Be sure to combine any new resolvers in the 'index.js' file
│   └── schema //GraphQL schema, split out.
│       ├── index.js //Combine any schemata together here
│       ├── mutations //Mutations schema. Mutations should follow a command structure, in that they only return an empty string.
│       ├── queries //Queries schema
│       ├── subscriptions //Subscription schema
│       └── types //Types schema
├── docker-compose.yml // Compose this together someday?
├── helpers // Helper functions and files
├── package.json
├── processes // Recurrently running processes
├── secrets.js // Secrets file, not checked into git
├── server.js // Sets up and runs the server based on the schema supplied by 'data.js'
├── snapshots // File stored snapshots here
└── yarn.lock
```
