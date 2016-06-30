![Thorium](github-banner.png)
# Thorium

[![Join the chat at https://gitter.im/alexanderson1993/thorium](https://badges.gitter.im/alexanderson1993/thorium.svg)](https://gitter.im/alexanderson1993/thorium?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![See the feature roadmap at https://huboard.com/alexanderson1993/thorium/](https://img.shields.io/badge/roadmap-On HuBoard-blue.svg)](https://huboard.com/alexanderson1993/thorium/)

A simulator controls platform

Thorium is built with the following technologies:
* [React](https://facebook.github.io/react/) for the frontend
* [Redux](http://redux.js.org/) for the data layer
* Websockets for the transmission layer
* [Phoenix Framework](http://phoenixframework.org/) for the server
* [RethinkDB](https://www.rethinkdb.com/) for the database


### Useful Links
* [Elixir School](http://elixirschool.com/) - online school for the server language
* [Elixir Koans](https://github.com/elixirkoans/elixir-koans) - Exercizes for Elixir


## Getting Started

### 1. Install Phoenix Framework (with NodeJS, NPM, and Elixir), and RethinkDB
Follow the following instructions

1. Phoenix Framework (http://www.phoenixframework.org/docs/installation

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
# alternatively, you could use a docker container
```

### 5. Start the Phoenix framework
```
mix phoenix.server
```

That should be all you need. Navigate to http://localhost:4000 to see the site. Click the seed button to add some stub simulators and click the graphql button to test it out.

Eventually, Rethink will get started with the Phoenix server, but not yet.

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