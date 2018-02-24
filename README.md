![Thorium](github-banner.png)
[![All Contributors](https://img.shields.io/badge/all_contributors-8-orange.svg?style=flat-square)](#contributors)

[![Build Status](https://travis-ci.org/Thorium-Sim/thorium.svg?branch=master)](https://travis-ci.org/Thorium-Sim/thorium)
[![Discord](https://img.shields.io/discord/390968011605147648.svg)](https://discord.gg/UvxTQZz)

# Thorium

## A simulator controls platform

*New here? Check out the [contributing document](CONTRIBUTING.md)*

Want something to work on? Here's where [we need help](https://github.com/Thorium-Sim/thorium/labels/help%20wanted).
Not sure how to work with Thorium? Guides are in the [wiki](https://github.com/Thorium-Sim/thorium/wiki).
Thorium accepts [donations](https://thoriumsim.com/en/donate.html).

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

Builds the app for production and bundles it into a packaged terminal app.

## Open-source Assets

You can download open-source licensed assets to be used with Thorium [here](https://drive.google.com/open?id=0B-UK2-Zf7K9ycUJScHJlWW92MjQ).

*Interested in contributing your own images, movies, sounds, and more to this repository? [File an Issue](https://github.com/Thorium-Sim/thorium/issues/new)* and we'll give you access.

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
<!-- prettier-ignore -->
| [<img src="https://avatars1.githubusercontent.com/u/6558157?v=4" width="100px;"/><br /><sub><b>Alex</b></sub>](http://ralexanderson.com)<br />[💻](https://github.com/thorium-sim/Thorium/commits?author=alexanderson1993 "Code") [📖](https://github.com/thorium-sim/Thorium/commits?author=alexanderson1993 "Documentation") [🎨](#design-alexanderson1993 "Design") | [<img src="https://avatars0.githubusercontent.com/u/1387836?v=4" width="100px;"/><br /><sub><b>Emrix</b></sub>](https://github.com/Emrix)<br />[💻](https://github.com/thorium-sim/Thorium/commits?author=Emrix "Code") [👀](#review-Emrix "Reviewed Pull Requests") [🤔](#ideas-Emrix "Ideas, Planning, & Feedback") | [<img src="https://avatars3.githubusercontent.com/u/30132958?v=4" width="100px;"/><br /><sub><b>ctolley6</b></sub>](https://github.com/ctolley6)<br />[🤔](#ideas-ctolley6 "Ideas, Planning, & Feedback") [✅](#tutorial-ctolley6 "Tutorials") | [<img src="https://avatars0.githubusercontent.com/u/22157796?v=4" width="100px;"/><br /><sub><b>Todd Rasband</b></sub>](https://github.com/Rasbandit)<br />[🎨](#design-Rasbandit "Design") | [<img src="https://avatars0.githubusercontent.com/u/45031?v=4" width="100px;"/><br /><sub><b>Brent Anderson</b></sub>](http://www.brentjanderson.com)<br />[🤔](#ideas-brentjanderson "Ideas, Planning, & Feedback") | [<img src="https://avatars1.githubusercontent.com/u/4927395?v=4" width="100px;"/><br /><sub><b>Farpoint</b></sub>](http://www.farpointStation.org)<br />[🐛](https://github.com/thorium-sim/Thorium/issues?q=author%3Afarpoint "Bug reports") | [<img src="https://avatars1.githubusercontent.com/u/30113240?v=4" width="100px;"/><br /><sub><b>Isaac Ostler</b></sub>](https://github.com/isaacOstler)<br />[🐛](https://github.com/thorium-sim/Thorium/issues?q=author%3AisaacOstler "Bug reports") |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| [<img src="https://avatars2.githubusercontent.com/u/25517624?v=4" width="100px;"/><br /><sub><b>Jed Fox</b></sub>](https://j-f1.github.io)<br />[💻](https://github.com/thorium-sim/Thorium/commits?author=j-f1 "Code") |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
