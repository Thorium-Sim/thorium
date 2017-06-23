![Thorium](github-banner.png)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/53c3c34f0752473383ba4341fa69cb55)](https://www.codacy.com/app/alexanderson1993/thorium?utm_source=github.com&utm_medium=referral&utm_content=Thorium-Sim/thorium&utm_campaign=badger)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/53c3c34f0752473383ba4341fa69cb55)](https://www.codacy.com/app/alexanderson1993/thorium?utm_source=github.com&utm_medium=referral&utm_content=Thorium-Sim/thorium&utm_campaign=Badge_Coverage)
[![Build Status](https://travis-ci.org/Thorium-Sim/thorium.svg?branch=master)](https://travis-ci.org/Thorium-Sim/thorium)
[![Slack Status](https://slack.ralexanderson.com/badge.svg)](https://slack.ralexanderson.com)

# Thorium

## A simulator controls platform

*New here? Check out the [contributing document](CONTRIBUTING.md)*

Thorium is built with the following technologies:
* [React](https://facebook.github.io/react/) for the frontend
* [Apollo Client](http://www.apollostack.com/) for the data layer
* [GraphQL](http://graphql.org) for the transmission layer

## What is Thorium

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
npm run build-server
```

Builds the app for production and bundles it into an electron app.

## Event Sourcing

Thorium Server is built on an event sourcing model coupled with CQRS. GraphQL serves this purpose well. Queries are normal GraphQL queries. Commands are mutations which return an empty string. When a command is fired, it dispatches an event which is stored in an event store. Event consumers detect the new event and trigger based on that event.

If the event store is accessible, the consumers don't even have to be on this server - they can be any number of microprocesses across any number of computers and environments.


## Folder Structure

A list of the most important folders. (You can pretty much ignore everything else for the time being)

```
├── README.md
├── app.js // Where the magic happens. This is where the event store lives
├── server // any server-side code
│   ├── classes // Object classes for all of the major parts of the simulator. Systems have their own class. When writing classes, be sure to include a 'class' propterty so the snapshot restore knows what class to instantiate data with.
│   ├── data.js //Brings the schema and resovlers together
│   ├── resolvers //Resolver functions, split out. A template is available. Be sure to combine any new resolvers in the 'index.js' file. Resolvers typically fire events
│   ├── events // Any event handlers. This is where the events actually trigger.
│   ├── processes // Any recurring processes that happen on the server side.
│   └── schema //GraphQL schema, split out.
│       ├── index.js //Combine any schemata together here
│       ├── mutations //Mutations schema. Mutations should follow a command structure, in that they only return an empty string.
│       ├── queries //Queries schema
│       ├── subscriptions //Subscription schema
│       └── types //Types schema
├── src // Front end code
│   ├── components
│   │   ├── layouts // Frames for the cards
│   │   ├── views // All of the cards
│   │   │   └── index.js & list.js // Be sure to update these with the cards that you create
│   ├── containers // The behind-the-scenes screens
│   ├── App.js // The entry-point for the front-end
│   └── index.js // The renderer for App.js
├── test // Unit tests
├── package.json
├── server.js // Sets up and runs the server based on the schema supplied by 'data.js'
├── snapshots // File stored snapshots here
└── yarn.lock
```
