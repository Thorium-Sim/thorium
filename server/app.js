import fs from "fs";
import jsonfile from "jsonfile";
import { EventEmitter } from "events";
import util from "util";
import * as Classes from "./classes";
import paths from "./helpers/paths";

let snapshotDir = "./snapshots/";
if (process.env.NODE_ENV === "production") {
  snapshotDir = paths.userData + "/";
}

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
    this.isochips = [];
    this.dockingPorts = [];
    this.coreLayouts = [];
    this.coreFeed = [];
    this.assetFolders = [];
    this.assetContainers = [];
    this.assetObjects = [];
    this.viewscreens = [];
    this.messages = [];
    this.tacticalMaps = [];
    this.officerLogs = [];
    this.exocomps = [];
    this.libraryDatabase = [];
    this.softwarePanels = [];
    this.surveyForms = [];
    this.objectives = [];
    this.keyboards = [];
    this.sounds = [];
    this.universes = [];
    this.autoUpdate = true;
    this.events = [];
    this.replaying = false;
    this.snapshotVersion = 0;
    this.version = 0;
    this.timestamp = Date.now();
  }
  init() {
    this.loadSnapshot(process.env.NODE_ENV !== "production");
    if (process.env.NODE_ENV === "production") {
      setTimeout(() => this.autoSave(), 5000);
    }
  }
  loadSnapshot(dev) {
    const snapshot = jsonfile.readFileSync(
      snapshotDir + (dev ? "snapshot-dev.json" : "snapshot.json")
    );
    this.merge(snapshot);
    if (process.env.NODE_ENV === "production") {
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
      ) {
        return;
      }
      if (snapshot[key] instanceof Array) {
        snapshot[key].forEach(obj => {
          if (Object.keys(obj).length !== 0) {
            try {
              this[key].push(new Classes[obj.class](obj));
            } catch (err) {
              console.error(err);
              throw new Error(
                JSON.stringify({ message: "Undefined key in class", key, obj })
              );
            }
          }
        });
      }
    });
  }
  snapshot() {
    const dev =
      !process.env.NODE_ENV && fs.existsSync(snapshotDir + "snapshot-dev.json");
    this.snapshotVersion = this.version;
    const snap = { ...this };
    const snapshot = JSON.stringify(this.trimSnapshot(snap), null, "\t") + "\n";
    fs.writeFile(snapshotDir + "snapshot-save.json", snapshot, () => {
      //Copy the current snapshot to a restore file
      fs.copyFile(
        snapshotDir + (dev ? "snapshot-dev.json" : "snapshot.json"),
        snapshotDir + "snapshot-restore.json",
        () => {
          // Move the save into place
          fs.unlink(
            snapshotDir + (dev ? "snapshot-dev.json" : "snapshot.json"),
            () => {
              fs.copyFile(
                snapshotDir + "snapshot-save.json",
                snapshotDir + (dev ? "snapshot-dev.json" : "snapshot.json"),
                () => {}
              );
            }
          );
        }
      );
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
    if (process.env.DEBUG) {
      eventCount += 1;
      if (Date().toString() !== date) {
        console.log("Event Count:", eventCount);
        eventCount = 0;
        date = Date().toString();
      }
    }
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
    /*const keys = [
      "stationSets",
      "systems",
      "decks",
      "rooms",
      "crew",
      "teams",
      "inventory",
      "isochips",
      "coreFeed",
      "viewscreens",
      "messages"
    ];
    keys.forEach(
      k =>
        (App[k] = App[k].filter(s =>
          App.simulators.find(sim => sim.id === s.simulatorId)
        ))
    );
    App.systems = App.systems.map(s => {
      s.damage.report = null;
      return s;
    });*/
    //this.handleEvent(param, 'test', 'tested');
  }
  // TODO: This is JANKY! Make this better by using actual event sourcing.
  autoSave() {
    const self = this;
    this.snapshot();
    setTimeout(() => self.autoSave(), 10 * 1000);
  }
}

let eventCount = 0;
let date = Date().toString();

const App = new Events();

// Handle events for App
App.on("error", function(err) {
  console.log("here's an error!");
  console.error(err);
});
export default App;
