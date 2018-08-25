import fs from "fs";
import { EventEmitter } from "events";
import util from "util";
import * as Classes from "./classes";
import paths from "./helpers/paths";
import Store from "./helpers/data-store";

let snapshotDir = "./snapshots/";

if (process.env.NODE_ENV === "production") {
  snapshotDir = paths.userData + "/";
}
const snapshotName =
  !process.env.NODE_ENV && fs.existsSync(snapshotDir + "snapshot-dev.json")
    ? "snapshot-dev.json"
    : "snapshot.json";

const store = new Store({
  name: "Thorium",
  path: `${snapshotDir}${snapshotName}`,
  debounce: 1000 * 2
});

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
    this.autoUpdate = true;
    this.migrations = { assets: true };
    this.events = [];
    this.replaying = false;
    this.snapshotVersion = 0;
    this.version = 0;
    this.timestamp = Date.now();
  }

  init() {
    this.merge(store.data);
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
      if (key.indexOf("asset") > -1) return;
      if (key === "autoUpdate" || key === "migrations") {
        this[key] = snapshot[key];
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
    this.snapshotVersion = this.version;
    const snap = this.trimSnapshot({ ...this });
    store.set(snap);
  }
  trimSnapshot({
    eventsToEmit,
    newEvents,
    replaying,
    _events,
    _maxListeners,
    domain,
    events,
    ...snapshot
  }) {
    return snapshot;
  }
  handleEvent(param, eventName, context = {}) {
    const { clientId } = context;

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
        event: eventName,
        params: param,
        clientId: clientId,
        flightId: flightId,
        timestamp: new Date()
      };
      this.events.push(event);
    }
    this.emit(eventName, param);
    process.env.NODE_ENV === "production" && this.snapshot();
  }
  test(param) {
    if (param.key) {
      console.log(util.inspect(this[param.key], false, null));
    } else {
      console.log(util.inspect(this, false, null));
    }
  }
}

const App = new Events();

// Handle events for App
App.on("error", function(err) {
  console.log("here's an error!");
  console.error(err);
});

export default App;
