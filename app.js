import jsonfile from "jsonfile";
import { EventEmitter } from "events";
import { writeFile } from "./server/helpers/json-format";
import "./server/helpers/copyAssets";
import * as Classes from "./server/classes";
import util from "util";
import { cloneDeep } from "lodash";
//import { collections } from "./server/helpers/database";
import electron from "electron";
import fs from "fs";

class Events extends EventEmitter {
  constructor(params) {
    super(params);
    this.simulators = [];
    this.stationSets = [];
    this.flights = [];
    this.missions = [];
    this.systems = [];
    this.clients = [];
    this.sets = [];
    this.decks = [];
    this.rooms = [];
    this.crew = [];
    this.teams = [];
    this.inventory = [];
    this.coreLayouts = [];
    this.assetFolders = [];
    this.assetContainers = [];
    this.assetObjects = [];
    this.viewscreens = [];
    this.events = [];
    this.replaying = false;
    this.snapshotVersion = 0;
    this.version = 0;
    this.timestamp = Date.now();
    setTimeout(this.init.bind(this), 0);
  }
  init() {
    //collections.events.find({}).forEach((doc) => {console.log(doc)})
    let snapshotDir = "./snapshots/";
    if (electron.app) {
      snapshotDir = electron.app.getPath("appData") + "/thorium/";
    }
    if (!fs.existsSync(snapshotDir + "snapshot.json")) {
      if (!fs.existsSync(snapshotDir)) {
        fs.mkdirSync(snapshotDir);
      }
      fs.writeFileSync(snapshotDir + "snapshot.json", "{}");
    }
    const snapshot = jsonfile.readFileSync(snapshotDir + "snapshot.json");
    this.merge(snapshot);
    if (electron.app) {
      // Only auto save in the built version
      setTimeout(() => this.autoSave(), 5000);
    }
  }
  merge(snapshot) {
    // Initialize the snapshot with the object constructors
    Object.keys(snapshot).forEach(key => {
      if (
        key === "events" ||
        key === "snapshotVersion" ||
        key === "timestamp" ||
        key === "version" ||
        key === "_eventsCount"
      )
        return;
      if (snapshot[key] instanceof Array) {
        snapshot[key].forEach(obj => {
          if (Object.keys(obj).length !== 0) {
            this[key].push(new Classes[obj.class](obj));
          }
        });
      }
    });
  }
  snapshot(save) {
    this.snapshotVersion = this.version;
    var snap = cloneDeep(this, true);
    const snapshot = this.trimSnapshot(snap);
    let snapshotDir = "./snapshots/";
    if (electron.app) {
      snapshotDir = electron.app.getPath("appData") + "/thorium/";
    }
    writeFile(snapshotDir + "snapshot.json", snapshot, err => {
      err && console.log(err);
    });
    return snapshot;
  }
  trimSnapshot(snapshot) {
    delete snapshot.eventsToEmit;
    delete snapshot.newEvents;
    delete snapshot.replaying;
    delete snapshot._events;
    delete snapshot._maxListeners;
    delete snapshot.domain;
    // Clear events out of the snapshot.
    delete snapshot.events;
    return snapshot;
  }
  handleEvent(param, pres, context = {}) {
    const { clientId } = context;
    //const { events } = collections;
    // We need to fire the events directly
    // Because the database isn't triggering them
    this.timestamp = new Date();
    this.version = this.version + 1;
    if (clientId) {
      // Get the current flight of the client
      const client = this.clients.find(c => c.id === clientId);
      let flightId = null;
      if (client) {
        flightId = client.flightId;
      }
      const event = {
        event: pres,
        params: param,
        clientId: clientId,
        flightId: flightId,
        timestamp: new Date()
      };
      //events.insert(event);
      this.events.push(event);
    }
    this.emit(pres, param);
  }
  test(param) {
    if (param.key) {
      console.log(util.inspect(this[param.key], false, null));
    } else {
      console.log(util.inspect(this, false, null));
    }
    //this.handleEvent(param, 'test', 'tested');
  }
  // TODO: This is JANKY! Make this better by using actual event sourcing.
  autoSave() {
    this.snapshot();
    setTimeout(() => this.autoSave(), 10 * 1000);
  }
}

const App = new Events();

export default App;
