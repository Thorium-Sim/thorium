import fs from "fs";
import https from "https";
import path from "path";
import jsonfile from "jsonfile";
import { EventEmitter } from "events";
import util from "util";
import cloneDeep from "lodash/cloneDeep";
import { writeFile } from "./helpers/json-format";
import paths from "./helpers/paths";
import importAssets from "./imports/asset/import";
import * as Classes from "./classes";

let snapshotDir = "./snapshots/";
if (process.env.NODE_ENV === "production") {
  snapshotDir = paths.userData + "/";
}

const download = function(url, dest, cb) {
  const file = fs.createWriteStream(dest);
  https
    .get(url, function(response) {
      response.pipe(file);
      file.on("finish", function() {
        file.close(cb); // close() is async, call cb after close completes.
      });
    })
    .on("error", function(err) {
      console.log("Error", err);
      // Handle errors
      fs.unlink(dest); // Delete the file async. (But we don't check the result)
      if (cb) cb(err.message);
    });
};

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
    this.events = [];
    this.replaying = false;
    this.snapshotVersion = 0;
    this.version = 0;
    this.timestamp = Date.now();
    setTimeout(this.init.bind(this), 0);
  }
  init() {
    if (process.env.NODE_ENV) {
      if (fs.existsSync(snapshotDir + "snapshot.json")) {
        this.loadSnapshot();
      }
      if (!fs.existsSync(snapshotDir)) {
        console.log("snapshot doesn't exist!");
        fs.mkdirSync(snapshotDir);
      }
      if (!fs.existsSync(snapshotDir + "snapshot.json")) {
        fs.writeFileSync(
          snapshotDir + "snapshot.json",
          JSON.stringify(require("./helpers/defaultSnapshot.js").default)
        );
        this.merge(require("./helpers/defaultSnapshot.js").default);

        // This was an initial load. We should download and install assets
        console.log("First-time load. Downloading assets...");
        const dest = path.resolve("temp/assets.aset");
        download(
          "https://s3.amazonaws.com/thoriumsim/assets.zip",
          dest,
          err => {
            if (err) {
              console.log(err);
            }
            importAssets(dest, () => {
              fs.unlink(dest, error => {
                if (err) console.log(error);
                console.log("Asset Download Complete");
              });
            });
          }
        );
        setTimeout(() => this.autoSave(), 5000);
      }
    } else {
      if (!fs.existsSync(snapshotDir)) {
        console.log("No snapshots folder found. Creating.");
        fs.mkdirSync(snapshotDir);
        if (fs.existsSync(snapshotDir)) {
          console.log("Done!");
        }
      }
      if (!fs.existsSync(snapshotDir + "snapshot.json")) {
        console.log("No snapshot.json found. Creating.");
        fs.writeFileSync(
          snapshotDir + "snapshot.json",
          JSON.stringify(require("./helpers/defaultSnapshot.js"))
        );
        this.merge(require("./helpers/defaultSnapshot.js").default);
      }
      if (
        !process.env.NODE_ENV &&
        fs.existsSync(snapshotDir + "snapshot-dev.json")
      ) {
        this.loadSnapshot(true);
      } else {
        this.loadSnapshot();
      }
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
    const snap = cloneDeep(this, true);
    const snapshot = this.trimSnapshot(snap);
    writeFile(
      snapshotDir + (dev ? "snapshot-dev.json" : "snapshot.json"),
      snapshot,
      err => {
        err && console.log(err);
      }
    );
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

export default App;
