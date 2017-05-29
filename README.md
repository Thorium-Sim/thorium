![Thorium](github-banner.png)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/53c3c34f0752473383ba4341fa69cb55)](https://www.codacy.com/app/alexanderson1993/thorium?utm_source=github.com&utm_medium=referral&utm_content=Thorium-Sim/thorium&utm_campaign=badger)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/53c3c34f0752473383ba4341fa69cb55)](https://www.codacy.com/app/alexanderson1993/thorium?utm_source=github.com&utm_medium=referral&utm_content=Thorium-Sim/thorium&utm_campaign=Badge_Coverage)
[![Build Status](https://travis-ci.org/Thorium-Sim/thorium.svg?branch=master)](https://travis-ci.org/Thorium-Sim/thorium)
[![Slack Status](https://slack.ralexanderson.com/badge.svg)](https://slack.ralexanderson.com)
[![StackShare](https://img.shields.io/badge/tech-stack-0690fa.svg?style=flat)](https://stackshare.io/alexanderson1993/thorium)
[![Greenkeeper badge](https://badges.greenkeeper.io/Thorium-Sim/thorium.svg)](https://greenkeeper.io/)

*New here? Check out the [Wiki](https://github.com/alexanderson1993/thorium/wiki) and the [Project](https://github.com/orgs/Thorium-Sim/projects/1)*

# Thorium

#### A simulator controls platform

Thorium is built with the following technologies:
* [React](https://facebook.github.io/react/) for the frontend
* [Apollo Client](http://www.apollostack.com/) for the data layer
* [GraphQL](http://graphql.org) for the transmission layer
* [RethinkDB](https://www.rethinkdb.com/) for the database

## What is Thorium?
Thorium is a simulator controls platform which eventually hopes to encapsulate the following features (and maybe more):
* Multiple simulators in the same framework
* Multiple stations and cards
* Arbitrary card assignments that can update in realtime
* Realtime data sharing across devices
* Federated architecture for supporting satellite devices (e.g. lighting control, Arduino panels, etc.)
* Lighting Control
* Sound Control
* Video Control
* 3D Rendering
* Physics Simulations
* Pre-recorded macros
* Timelines

And more. The above merely scratches the surface.

[Data Model Diagram](https://www.lucidchart.com/invitations/accept/6283bfd5-06ef-4dd5-8668-738ddf3e08ed)

Thorium is flexible enough to provide a system for creating an integrated, distributed, fault-tolerant show-control system that can power lights, sound, video, and take input and provide output to a wide variety of devices.

Created with ❤ by [Alex Anderson](http://ralexanderson.com).

## Getting Started

```sh
npm install
npm run start
```

Then open [the app](http://localhost:3000) or [GraphiQL](http://localhost:3001/graphiql)

## Building the App

```
npm run build
```

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.


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
