![Thorium](github-banner.png)
[![All Contributors](https://img.shields.io/badge/all_contributors-7-orange.svg?style=flat-square)](#contributors)

[![Codacy Badge](https://api.codacy.com/project/badge/Grade/53c3c34f0752473383ba4341fa69cb55)](https://www.codacy.com/app/alexanderson1993/thorium?utm_source=github.com&utm_medium=referral&utm_content=Thorium-Sim/thorium&utm_campaign=badger)
[![Codacy Badge](https://api.codacy.com/project/badge/Coverage/53c3c34f0752473383ba4341fa69cb55)](https://www.codacy.com/app/alexanderson1993/thorium?utm_source=github.com&utm_medium=referral&utm_content=Thorium-Sim/thorium&utm_campaign=Badge_Coverage)
[![Build Status](https://travis-ci.org/Thorium-Sim/thorium.svg?branch=master)](https://travis-ci.org/Thorium-Sim/thorium)
[![Slack Status](https://slack.ralexanderson.com/badge.svg)](https://slack.ralexanderson.com)

# Thorium

## A simulator controls platform

*New here? Check out the [contributing document](CONTRIBUTING.md)*

Want something to work on? Here's where [we need help](https://github.com/Thorium-Sim/thorium/labels/help%20wanted).
Not sure how to work with Thorium? Guides are in the [wiki](https://github.com/Thorium-Sim/thorium/wiki)
Thorium accepts [donations](https://thoriumsim.com/download/)

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

Thorium is flexible enough to provide a system for creating an integrated, distributed, fault-tolerant show-control system that can power lights, sound, video, and take input and provide output to a wide variety of devices.

Created with ❤ by [Alex Anderson](http://ralexanderson.com) and [Fyreworks](https://fyreworks.us).

Thorium is built with the following technologies:
* [React](https://facebook.github.io/react/) for the frontend
* [Apollo Client](http://www.apollostack.com/) for the data layer
* [GraphQL](http://graphql.org) for the transmission layer

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

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars1.githubusercontent.com/u/6558157?v=4" width="100px;"/><br /><sub>Alex</sub>](http://ralexanderson.com)<br />[💻](https://github.com/Fyreworks/Thorium/commits?author=alexanderson1993 "Code") [📖](https://github.com/Fyreworks/Thorium/commits?author=alexanderson1993 "Documentation") [🎨](#design-alexanderson1993 "Design") | [<img src="https://avatars0.githubusercontent.com/u/1387836?v=4" width="100px;"/><br /><sub>Emrix</sub>](https://github.com/Emrix)<br />[💻](https://github.com/Fyreworks/Thorium/commits?author=Emrix "Code") [👀](#review-Emrix "Reviewed Pull Requests") [🤔](#ideas-Emrix "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/30132958?v=4" width="100px;"/><br /><sub>ctolley6</sub>](https://github.com/ctolley6)<br />[🤔](#ideas-ctolley6 "Ideas, Planning, & Feedback") [✅](#tutorial-ctolley6 "Tutorials") | [<img src="https://avatars0.githubusercontent.com/u/22157796?v=4" width="100px;"/><br /><sub>Todd Rasband</sub>](https://github.com/Rasbandit)<br />[🎨](#design-Rasbandit "Design") | [<img src="https://avatars0.githubusercontent.com/u/45031?v=4" width="100px;"/><br /><sub>Brent Anderson</sub>](http://www.brentjanderson.com)<br />[🤔](#ideas-brentjanderson "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/4927395?v=4" width="100px;"/><br /><sub>Farpoint</sub>](http://www.farpointStation.org)<br />[🐛](https://github.com/Fyreworks/Thorium/issues?q=author%3Afarpoint "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/30113240?v=4" width="100px;"/><br /><sub>Isaac Ostler</sub>](https://github.com/isaacOstler)<br />[🐛](https://github.com/Fyreworks/Thorium/issues?q=author%3AisaacOstler "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
