import jsonfile from 'jsonfile';
import { writeFile } from '../helpers/json-format';
import * as Classes from '../data/classes';

export default (Base) => class extends Base {
  constructor(params = {}) {
    super(params);
    setTimeout(this.init.bind(this), 0);
  }
  init() {
    const snapshot = jsonfile.readFileSync('./snapshots/snapshot.json');
    this.merge(snapshot);
  }
  merge(snapshot) {
    // Initialize the snapshot with the object constructors
    Object.keys(snapshot)
    .forEach(key => {
      if (key === 'snapshotVersion' ||
        key === 'timestamp' ||
        key === 'version' ||
        key === '_eventsCount') return;
        if (snapshot[key] instanceof Array) {
          snapshot[key].forEach(obj => {
            this[key].push(new Classes[obj.class](obj));
          });
        }
      });
  }
  snapshot(save) {
    const snapshot = super.snapshot();
    // Todo: give it a timestamp
    if (save) {
      writeFile('./snapshots/snapshot.json', snapshot, (err) => {console.log(err);});
    }
    return snapshot;
  }
};
