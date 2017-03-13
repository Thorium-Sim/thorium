import query from './database';
import config from './config';
import fs from 'fs';

const db = config.db;

// Run the necessary queries to get the database set up.
// Delete the current database if it exists.
console.log(`This command will only work if you have installed Postgres on a server and configured ./database.js to point to it.
  You also need to set up a database user. If an error occurs, make sure you've configured it right.`);

console.log(`This drops the schema, which will erase all tables on the database. I hope you know what you're doing.`);

query(`DROP SCHEMA IF EXISTS ${db.database} CASCADE`)
.catch(e => console.error(e))
.then(() => query(`CREATE SCHEMA ${db.database}`))
.catch(e => console.error(e))
.then(() => query(`GRANT ALL ON SCHEMA ${db.database} TO ${db.user}`))
.catch(e => console.error(e))
//Now create the tables that we need.
.then(() => query(`CREATE TABLE snapshots (
  data json)`))
.catch(e => console.error(e))
.then(() => query(`CREATE TABLE events(
  id integer CONSTRAINT event_key PRIMARY KEY,
  method varchar(40) NOT NULL,
  data json,
  timestamp date,
  version integer
  )`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE stationSets(
  data json)`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE missions(
  data json)`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE assetObject(
  id integer CONSTRAINT assetObject_key PRIMARY KEY,
  containerPath varchar(127),
  conatinerId varchar(127),
  fullPath varchar(127),
  url varchar(127),
  simulatorId varchar(127)
  )`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE assetFolder(
  id integer CONSTRAINT assetFolder_key PRIMARY KEY,
  folderPath varchar(127),
  fullPath varchar(127),
  name varchar(127)
  )`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE assetContainer(
  id integer CONSTRAINT assetContainer_key PRIMARY KEY,
  folderPath varchar(127),
  folderId varchar(127),
  fullPath varchar(127),
  name varchar(127),
  simulatorId varchar(127)
  )`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE templateSimulator(
  id integer CONSTRAINT templateSimulator_key PRIMARY KEY,
  name varchar(127),
  layout varchar(127),
  alertlevel varchar(1),
  systems json,
  decks json,
  rooms json,
  crew json
  )`))
.catch(e => console.error(e))


