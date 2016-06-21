# Thorium
A simulator controls platform

Thorium is built with the following technologies:
* [React](https://facebook.github.io/react/) for the frontend
* [Apollo Stack](http://www.apollostack.com/) for the data layer
* [GraphQL](http://graphql.org/) for the transmission layer
* [Phoenix Framework](http://phoenixframework.org/) for the server
* [RethinkDB](https://www.rethinkdb.com/) for the database

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
#Grab npm dependencies just in case
npm install
```

### 4. Start RethinkDB from the Thorium folder
```
rethinkdb
```

### 5. Start the Phoenix framework
```
mix phoenix.server
```

That should be all you need. Navigate to http://localhost:4000 to see the site. Click the seed button to add some stub simulators and click the graphql button to test it out.

Eventually, rethink will get started with the phoenix server, but not yet.
