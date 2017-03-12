import query from './database';
import config from './config';
const db = config.db;

// Run the necessary queries to get the database set up.
// Delete the current database if it exists.
console.log(`This command will only work if you have installed Postgres on a server and configured ./database.js to point to it.
  You also need to set up a database user. If an error occurs, make sure you've configured it right.`);

console.log(`This drops the schema, which will erase all tables on the database. I hope you know what you're doing.`);

query(`DROP SCHEMA IF EXISTS ${db.database} CASCADE`)
.then(() => query(`CREATE SCHEMA ${db.database}`))
.then(() => query(`GRANT ALL ON SCHEMA ${db.database} TO ${db.user}`))
//Now create the tables that we need.
.then(() => query(`CREATE TABLE snapshots (
data TEXT)`))
.then(() => query(`CREATE TABLE events(
  id integer CONSTRAINT firstkey PRIMARY KEY,
  method varchar(40) NOT NULL,
  data TEXT,
  timestamp date,
  version integer
  )`));

// TODO: Add tables for default configuration. 
// These tables are pretty static and don't change very often. 
/*
template simulators
stationSets
missions
assetFolders
assetContainers
assetObjects
*/