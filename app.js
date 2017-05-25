import jsonfile from 'jsonfile';
import {EventEmitter} from 'events';
import { writeFile } from './server/helpers/json-format';
import * as Classes from './server/classes';
//import query from './server/helpers/database';
import config from './config';
import util from 'util';
import { cloneDeep } from 'lodash';
import electron from 'electron';
var fs = require('fs');

class Events extends EventEmitter {
  constructor(params) {
    super(params);
    this.simulators = [];
    this.stationSets = [];
    this.flights = [];
    this.missions = [];
    this.systems = [];
    this.clients = [];
    this.decks = [];
    this.rooms = [];
    this.crew = [];
    this.inventory = [];
    this.coreLayouts = [];
    this.assetFolders = [];
    this.assetContainers = [];
    this.assetObjects = [];
    this.replaying = false;
    this.snapshotVersion = 0;
    this.version = 0;
    this.timestamp = Date.now();
    setTimeout(this.init.bind(this), 0);
  }
  init() {
    if (!config.db){
      let snapshotDir = './snapshots/';
      if (electron.app) {
        snapshotDir = electron.app.getPath('appData') + "/thorium/";
      }
      if (!fs.existsSync(snapshotDir + 'snapshot.json')){
        if (!fs.existsSync(snapshotDir)){
          fs.mkdirSync(snapshotDir);
        }
        fs.writeFileSync(snapshotDir + "snapshot.json", "{}"); 
      }
      const snapshot = jsonfile.readFileSync(snapshotDir + 'snapshot.json');
      this.merge(snapshot);
    } else {
     /* query(`SELECT id, method, data, timestamp, version FROM events`)
      .then(({rows}) => {
        rows.forEach(r => {
          this.emit(r.method, r.data);
          this.version = r.version;
          this.timestamp = r.timestamp;
        })
      })
      .catch(e => console.error(e));*/
    }
  }
  merge(snapshot) {
    // Initialize the snapshot with the object constructors
    Object
    .keys(snapshot)
    .forEach((key) => {
      if (key === 'snapshotVersion' || key === 'timestamp' || key === 'version' || key === '_eventsCount')
        return;
      if (snapshot[key] instanceof Array) {
        snapshot[key].forEach((obj) => {
          this[key].push(new Classes[obj.class](obj));
        });
      }
    });
  }
  snapshot(save) {
    this.snapshotVersion = this.version;
    var snap = cloneDeep(this, true);
    const snapshot = this.trimSnapshot(snap);
    let snapshotDir = './snapshots/';
    if (electron.app) {
      snapshotDir = electron.app.getPath('appData') + "/thorium/";
    }
    if (!config.db){
      writeFile(snapshotDir + 'snapshot.json', snapshot, (err) => {
        console.log(err);
      });
    }
    return snapshot;
  }
  trimSnapshot (snapshot) {
    delete snapshot.eventsToEmit;
    delete snapshot.newEvents;
    delete snapshot.replaying;
    delete snapshot._events;
    delete snapshot._maxListeners;
    delete snapshot.domain;
    return snapshot;
  }
  handleEvent(param, pres) {
    /*if (config.db){
      this.timestamp = new Date();
      this.version = this.version + 1;
      query(`INSERT INTO events (method, data, timestamp, version)
        VALUES ($1, $2, $3, $4)`, [pres, param, this.timestamp, this.version])
      .catch(err => {
        console.log(err);
      })
    }*/
    if (!config.db) { 
      // We need to fire the events directly
      // Because the database isn't triggering them
      this.timestamp = new Date();
      this.version = this.version + 1;
      this.emit(pres, param);
    }
  }
  test(param) {
    console.log(util.inspect(this, false, null));
    //this.handleEvent(param, 'test', 'tested');
  }
}

const App = new Events();

export default App;