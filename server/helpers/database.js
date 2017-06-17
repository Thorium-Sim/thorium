import * as RxDB from 'rxdb';
RxDB.plugin(require('pouchdb-adapter-leveldb'));
RxDB.plugin(require('pouchdb-adapter-node-websql'));
let collections = {};
let db;
// Create the collection
RxDB.create({name:'thorium', adapter: 'websql'})
.then((database) => {
  db = database;
  db.collection({
    name: 'events'
  }).then(events => {
    collections.events = events; 
  });
  db.collection({
    name: 'snapshots'
  }).then(snapshots => {
    collections.snapshots = snapshots; 
  });
})

export const database = db;
export const events = collections.events;
export const snapshots = collections.snapshots;