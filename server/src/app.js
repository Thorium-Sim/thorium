import { EventEmitter } from "events";
import util from "util";
import randomWords from "random-words";
import * as Classes from "./classes";
import paths from "./helpers/paths";
import Store from "./helpers/data-store";
import heap from "./helpers/heap";
import handleTrigger from "./helpers/handleTrigger";

let snapshotDir = "./snapshots/";

if (process.env.NODE_ENV === "production") {
  snapshotDir = paths.userData + "/";
}
const snapshotName =
  process.env.NODE_ENV === "production"
    ? "snapshot.json"
    : process.env.NODE_ENV === "test"
      ? "snapshot-test.json"
      : "snapshot-dev.json";

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
    this.taskTemplates = [];
    this.taskReports = [];
    this.tasks = [];
    this.commandLine = [];
    this.triggerGroups = [];
    this.autoUpdate = true;
    this.migrations = { assets: true };
    this.thoriumId = randomWords(5).join("-");
    this.doTrack = false;
    this.askedToTrack = false;
    this.addedTaskTemplates = false;
    this.events = [];
    this.replaying = false;
    this.snapshotVersion = 0;
    this.version = 0;
    this.timestamp = Date.now();
  }

  init() {
    this.merge(store.data);
    if (!this.doTrack) heap.stubbed = true;
    heap.track("thorium-started", this.thoriumId);
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
      if (key === "sounds") return;
      if (
        key === "autoUpdate" ||
        key === "migrations" ||
        key === "thoriumId" ||
        key === "doTrack" ||
        key === "askedToTrack"
      ) {
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
    // Handle any triggers before the event so we can capture data that
    // the event might remove
    handleTrigger(eventName, param, context);
    this.emit(eventName, { ...param, context });
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
