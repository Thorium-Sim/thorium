import { Entity } from 'sourced';
import jsonfile from 'jsonfile';
import { writeFile } from './helpers/json-format';
import * as Classes from './data/classes';

class Events extends Entity {
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
    this.coreLayouts = [];
    this.assetFolders = [];
    this.assetContainers = [];
    this.assetObjects = [];
    setTimeout(this.init.bind(this), 0);
  }
  init() {
    const snapshot = jsonfile.readFileSync('./snapshots/snapshot.json');
    this.merge(snapshot);
  }
  merge(snapshot) {
    // Initialize the snapshot with the object constructors
    Object.keys(snapshot)
    .forEach((key) => {
      if (key === 'snapshotVersion' ||
        key === 'timestamp' ||
        key === 'version' ||
        key === '_eventsCount') return;
        if (snapshot[key] instanceof Array) {
          snapshot[key].forEach((obj) => {
            console.log(obj);
            this[key].push(new Classes[obj.class](obj));
          });
        }
      });
  }
  snapshot(save) {
    const snapshot = super.snapshot();
    // Todo: give it a timestamp
    if (save) {
      writeFile('./snapshots/snapshot.json', snapshot, (err) => { console.log(err); });
    }
    return snapshot;
  }
  handleEvent(param, pres, past) {
    this.digest(pres, param);
    this.emit(past, param, this);
  }
  test(param) {
    console.log(this);
    this.handleEvent(param, 'test', 'tested');
  }
}


const App = new Events();

export default App;
