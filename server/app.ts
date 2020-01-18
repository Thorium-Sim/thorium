import {EventEmitter} from "events";
import util from "util";
import randomWords from "random-words";
import * as ClassesImport from "./classes";
import paths from "./helpers/paths";
import Store from "./helpers/data-store";
import heap from "./helpers/heap";
import handleTrigger from "./helpers/handleTrigger";
import Motu from "motu-control";

const Classes: {[index: string]: any} = {
  ...ClassesImport,
};
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
  debounce: 1000 * 30,
});
class Events extends EventEmitter {
  simulators: ClassesImport.Simulator[] = [];
  stationSets: ClassesImport.StationSet[] = [];
  flights: ClassesImport.Flight[] = [];
  missions: ClassesImport.Mission[] = [];
  systems: any[] = [];
  clients: ClassesImport.Client[] = [];
  sets: ClassesImport.Set[] = [];
  decks: ClassesImport.Deck[] = [];
  rooms: ClassesImport.Room[] = [];
  crew: ClassesImport.Crew[] = [];
  teams: ClassesImport.Team[] = [];
  inventory: ClassesImport.InventoryItem[] = [];
  isochips: ClassesImport.Isochip[] = [];
  dockingPorts: ClassesImport.DockingPort[] = [];
  coreLayouts: ClassesImport.CoreLayout[] = [];
  coreFeed: ClassesImport.CoreFeed[] = [];
  viewscreens: ClassesImport.Viewscreen[] = [];
  messages: ClassesImport.Message[] = [];
  tacticalMaps: ClassesImport.TacticalMap[] = [];
  officerLogs: ClassesImport.OfficerLog[] = [];
  exocomps: ClassesImport.Exocomp[] = [];
  libraryDatabase: ClassesImport.Library[] = [];
  softwarePanels: ClassesImport.SoftwarePanel[] = [];
  surveyForms: ClassesImport.SurveyForm[] = [];
  objectives: ClassesImport.Objective[] = [];
  keyboards: ClassesImport.Keyboard[] = [];
  sounds: any[] = [];
  taskTemplates: ClassesImport.TaskTemplate[] = [];
  taskReports: ClassesImport.TaskReport[] = [];
  tasks: ClassesImport.Task[] = [];
  commandLine: ClassesImport.CommandLine[] = [];
  triggerGroups: ClassesImport.Trigger[] = [];
  interfaces: ClassesImport.Interface[] = [];
  interfaceDevices: ClassesImport.InterfaceDevice[] = [];
  macros: ClassesImport.Macro[] = [];
  macroButtonConfigs: ClassesImport.MacroButtonConfig[] = [];
  recordTemplates: any[] = [];
  midiSets: ClassesImport.MidiSet[] = [];
  motus: Motu[] = [];
  autoUpdate = true;
  migrations: any = {assets: true};
  thoriumId: string = randomWords(5).join("-");
  doTrack: boolean = false;
  askedToTrack: boolean = false;
  addedTaskTemplates: boolean = false;
  spaceEdventuresToken?: string = null;
  googleSheetsTokens: any = {};
  httpOnly: boolean = false;
  port: number = process.env.NODE_ENV === "production" ? 443 : 3001;

  events: any[] = [];
  replaying = false;
  snapshotVersion = 0;
  version = 0;
  timestamp: Date = new Date();
  [index: string]: any;

  init() {
    this.merge(store.data);
    if (!this.doTrack) heap.stubbed = true;
    heap.track("thorium-started", this.thoriumId);
    if (process.env.PORT && !isNaN(parseInt(process.env.PORT, 10)))
      this.port = parseInt(process.env.PORT, 10);
    if (process.env.HTTP_ONLY === "true") this.httpOnly = true;
  }
  merge(snapshot: any) {
    // Initialize the snapshot with the object constructors
    Object.entries(snapshot).forEach(([key, value]) => {
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
        key === "doTrack" ||
        key === "askedToTrack" ||
        key === "addedTaskTemplates" ||
        key === "httpOnly"
      ) {
        this[key] = Boolean(value);
      }
      if (
        key === "migrations" ||
        key === "thoriumId" ||
        key === "spaceEdventuresToken" ||
        key === "googleSheetsTokens"
      ) {
        this[key] = value;
      }
      if (key === "port") {
        if (process.env.NODE_ENV === "production") {
          this.port = Number(value);
        } else {
          this.port = 3001;
        }
      }
      if (key === "motus" && snapshot.motus) {
        this.motus = snapshot.motus.map((m: any) => {
          const motu = new Motu(m);
          motu.on("changed", () => {
            App.handleEvent(motu, "motuChange");
          });
          return motu;
        });
        return;
      }
      if (snapshot[key] instanceof Array) {
        snapshot[key].forEach((obj: any) => {
          if (Object.keys(obj).length !== 0) {
            try {
              this[key].push(new Classes[obj.class](obj));
            } catch (err) {
              console.log(err);
              console.log({
                message: "Undefined key in class",
                key,
                class: obj.class,
              });
            }
          }
        });
      }
    });
  }
  snapshot() {
    this.snapshotVersion = this.version;
    const snap = this.trimSnapshot({...this});
    store.set(snap, null);
  }
  trimSnapshot({
    eventsToEmit = null,
    newEvents = null,
    replaying = null,
    _events = null,
    _maxListeners = null,
    domain = null,
    events = null,
    flights = [],
    motus = [],
    ...snapshot
  }: Events) {
    const newFlights = flights.map(({timeouts, ...f}) => f);
    const newMotus = motus.map(m => m.address);
    return {...snapshot, flights: newFlights, motus: newMotus};
  }
  // TODO: Add a proper context type
  handleEvent(param: any, eventName: string, context: any = {}) {
    const {clientId} = context;
    this.timestamp = new Date();
    this.version = this.version + 1;
    const client = this.clients.find(c => c.id === clientId);
    // Handle any triggers before the event so we can capture data that
    // the event might remove
    const flight = this.flights.find(
      f =>
        f.id === (client && client.flightId) ||
        (param.simulatorId && f.simulators.includes(param.simulatorId)),
    );
    const simulator = this.simulators.find(
      s =>
        s.id === (client && client.simulatorId) ||
        (param.simulatorId && s.id === param.simulatorId),
    );
    context = {
      ...context,
      flight: flight || context.flight,
      simulator: simulator || context.simulator,
      client,
    };
    handleTrigger(eventName, param, context);
    heap.track(eventName, this.thoriumId, param, context);
    this.emit(eventName, {...param, context});
    process.env.NODE_ENV === "production" && this.snapshot();
  }
  test(param: any) {
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
