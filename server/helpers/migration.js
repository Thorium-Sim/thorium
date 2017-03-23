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
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  timestamp timestamptz,
  data json)`))
.catch(e => console.error(e))
.then(() => query(`CREATE TABLE events(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  method varchar(40) NOT NULL,
  data json,
  timestamp timestamptz,
  version integer
  )`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE stationSets(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data json)`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE missions(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  data json)`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE assetObject(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  containerPath varchar(127),
  conatinerId varchar(127),
  fullPath varchar(127),
  url varchar(127),
  simulatorId varchar(127)
  )`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE assetFolder(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folderPath varchar(127),
  fullPath varchar(127),
  name varchar(127)
  )`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE assetContainer(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  folderPath varchar(127),
  folderId varchar(127),
  fullPath varchar(127),
  name varchar(127),
  simulatorId varchar(127)
  )`))
.catch(e => console.error(e))
.then(() => query(`
  CREATE TABLE templateSimulator(
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name varchar(127),
  layout varchar(127),
  alertlevel varchar(1),
  systems json,
  decks json,
  rooms json,
  crew json
  )`))
.catch(e => console.error(e))
// Create notifications for the table updates.
.then(() => query(`
  CREATE OR REPLACE FUNCTION table_update_notify() RETURNS trigger AS $$
  DECLARE
  id UUID;
  BEGIN
  IF TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN
  id = NEW.id;
  ELSE
  id = OLD.id;
  END IF;
  PERFORM pg_notify('table_update', json_build_object('table', TG_TABLE_NAME, 'id', id, 'type', TG_OP)::text);
  RETURN NEW;
  END;
  $$ LANGUAGE plpgsql;

  CREATE TRIGGER stationsets_notify_update AFTER UPDATE ON stationsets FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER stationsets_notify_insert AFTER INSERT ON stationsets FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER stationsets_notify_delete AFTER DELETE ON stationsets FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER events_notify_update AFTER UPDATE ON events FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER events_notify_insert AFTER INSERT ON events FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER events_notify_delete AFTER DELETE ON events FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER missions_notify_update AFTER UPDATE ON missions FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER missions_notify_insert AFTER INSERT ON missions FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER missions_notify_delete AFTER DELETE ON missions FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER assetObject_notify_update AFTER UPDATE ON assetObject FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER assetObject_notify_insert AFTER INSERT ON assetObject FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER assetObject_notify_delete AFTER DELETE ON assetObject FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER assetFolder_notify_update AFTER UPDATE ON assetFolder FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER assetFolder_notify_insert AFTER INSERT ON assetFolder FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER assetFolder_notify_delete AFTER DELETE ON assetFolder FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER assetContainer_notify_update AFTER UPDATE ON assetContainer FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER assetContainer_notify_insert AFTER INSERT ON assetContainer FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER assetContainer_notify_delete AFTER DELETE ON assetContainer FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER templateSimulator_notify_update AFTER UPDATE ON templateSimulator FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER templateSimulator_notify_insert AFTER INSERT ON templateSimulator FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  CREATE TRIGGER templateSimulator_notify_delete AFTER DELETE ON templateSimulator FOR EACH ROW EXECUTE PROCEDURE table_update_notify();
  `))
.catch(e => console.error(e))
.then(() => console.log('Done'))



