![Thorium](github-banner.png)

[![Slack Status](https://slack.ralexanderson.com/badge.svg)](https://slack.ralexanderson.com)
[![See the feature roadmap at https://huboard.com/alexanderson1993/thorium/](https://img.shields.io/badge/roadmap-On HuBoard-blue.svg)](https://huboard.com/alexanderson1993/thorium/)

*New here? Check out the [Wiki](https://github.com/alexanderson1993/thorium/wiki) and the [Presentation](http://class.ralexanderson.com/thorium/)*

# Thorium

#### A simulator controls platform

Thorium is built with the following technologies:
* [React](https://facebook.github.io/react/) for the frontend
* [Apollo Client](http://www.apollostack.com/) for the data layer
* [GraphQL](http://graphql.org) for the transmission layer
* [Phoenix Framework](http://phoenixframework.org/) for the server
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

Thorium is flexible enough to provide a system for creating an integrated, distributed, fault-tolerant show-control system that can power lights, sound, video, and take input and provide output to a wide variety of devices.

## Getting Started

### The Semi-Easy Way

### 1. Install Docker [https://www.docker.com](https://www.docker.com) and Docker-Compose [https://docs.docker.com/compose/](https://docs.docker.com/compose/)

### 2. Clone this repository
```
git clone https://github.com/alexanderson1993/thorium.git
cd thorium
```
### 3. Make sure that your database connection is set up to link with the docker container
```
 ### Edit this line in ./lib/thorium.ex so the host is 'rethink'
 # Here you could define other workers and supervisors as children
      worker(DB, [[host: "rethink", port: 28015]]),
      worker(Store, []),
      worker(ClientStore, []),
```

### 4. Run 'docker-compose up'

### 5. Pray that it actually works

### The harder but more reliable method (Only tested on MacOS. Might work on Linux)

### 1. Install Phoenix Framework (with NodeJS, NPM, and Elixir), and RethinkDB
Follow the following instructions

1. Phoenix Framework (http://www.phoenixframework.org/docs/installation)

*Don't worry about installing Postgres. You just need NodeJS, NPM, and Elixir*

2. RethinkDB (https://www.rethinkdb.com/docs/install/)

3. That's it!

### 2. Clone this repository
```
git clone https://github.com/alexanderson1993/thorium.git
cd thorium
```

### 3. Download dependencies
```
mix deps.get
#Grab npm dependencies
npm install
```

### 4. Start RethinkDB from the Thorium folder
```
rethinkdb
# alternatively, you could use a docker container. On MacOS the docker container is faster.
docker run -d -P -p 8080:8080 -p 28015:28015 -p 29015:29015 --name rethink rethinkdb
```

### 5. Start the Phoenix framework
```
mix phoenix.server
```

That should be all you need. Navigate to http://localhost:4000 to see the site. You should be able to access GraphiQL at http://localhost:4000/graphiql

Eventually, Rethink will get started with the Phoenix server, but not yet. (It does get started if you use the Docker method)

## Folder Structure

```
web
├─README.md
│
├─config ── Phoenix configuration files.
│
├─deps ── Elixir dependencies, installed with `mix deps.get`. Don't edit, but useful for referencing specific deps.
│
├─lib ── Base modules for the app, including the endpoint, database setup, and supervisor/worker initialization
│
├─node_modules ── Modules downloaded and installed from NPM with `npm install`. Add new modules from npmjs.com with `npm install --save ***moduleName***` Don't edit, but useful for referencing specific packages
│
├─test ── Elixir tests. I'll eventually implement these, but not yet.
│
├─web ── See folder README
│
├─mix.exs ── Project initialization and information.
│
├─package.json ── NPM package list and information. Don't edit by hand - use `npm install --save ***package***`, unless you are removing a package.
│
└─webpack.config.js ── Client-side module bundler. You probably don't want to mess with this.

```
