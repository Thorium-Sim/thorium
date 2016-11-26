import Shield from './data/classes/shield';
import Simulator from './data/classes/simulator';
import Engine from './data/classes/engine';
import Thrusters from './data/classes/thruster';
import Client from './data/classes/client';
import jsonfile from 'jsonfile';
import { writeFile } from './helpers/json-format';
import { Entity } from 'sourced';
import { pubsub } from './helpers/subscriptionManager.js';
import { AssetObject, AssetFolder, AssetContainer } from './data/classes/assets';

const Classes = {
  Client,
  Shield,
  Engine,
  Thrusters,
  Simulator,
  AssetObject,
  AssetFolder,
  AssetContainer,
};

class Repo extends Entity {
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
}
class Events extends Repo {
  constructor(params) {
    super(params);
    this.simulators = [];
    this.clients = [];
    this.systems = [];
    this.assetFolders = [];
    this.assetContainers = [];
    this.assetObjects = [];
  }
  test(param) {
    console.log(this);
    this.digest('test', param);
    this.emit('tested', param, this);
  }
  addSimulator(param) {
    this.digest('addSimulator', param);
    this.emit('addedSimulator', param, this);
  }
  addSystem(param) {
    this.digest('addSystem', param);
    this.emit('addedSystem', param, this);
  }
  speedChange(param) {
    this.digest('speedChange', param);
    this.emit('speedChanged', param, this);
  }
  addHeat(param) {
    this.digest('addHeat', param);
    this.emit('addedHeat', param, this);
  }
  addAssetFolder(param) {
    this.digest('addAssetFolder', param);
    this.emit('addedAssetFolder', param, this);
  }
  addAssetContainer(param) {
    this.digest('addAssetContainer', param);
    this.emit('addedAssetContainer', param, this);
  }
  addAssetObject(param) {
    this.digest('addAssetObject', param);
    this.emit('addedAssetObject', param, this);
  }
  removeAssetFolder(param) {
    this.digest('removeAssetFolder', param);
    this.emit('removedAssetFolder', param, this);
  }
  removeAssetContainer(param) {
    this.digest('removeAssetContainer', param);
    this.emit('removedAssetContainer', param, this);
  }
  removeAssetObject(param) {
    this.digest('removeAssetObject', param);
    this.emit('removedAssetObject', param, this);
  }
}

const App = new Events();

export default App;

App.on('addedSimulator', (param) => {
  // TODO: Check to make sure the simulator doesn't exist
  App.simulators.push(new Simulator(param));
});

App.on('addedSystem', (param) => {
  // TODO: Check to make sure the system doesn't exist
  App.systems.push(new Classes[param.type](param));
});
App.on('speedChanged', (param) => {
  const system = App.systems.find((sys) => sys.id === param.id);
  const engineIndex = App.systems.findIndex((sys) => sys.id === param.id) || -1;
  system.setSpeed(param.speed, param.on);
  pubsub.publish('speedChange', system);
  // Now stop the other engines
  // If speed is -1 (full stop), stop them all
  App.systems.forEach((engine, index) => {
    if (engine.simulatorId === App.systems[engineIndex].simulatorId && engine.type === 'Engine') {
      if (index < engineIndex) {
        if (param.speed === -1) {
          engine.setSpeed(-1, false);
        } else {
          engine.setSpeed(engine.speeds.length, false);
        }
        pubsub.publish('speedChange', engine);
      }
      if (index > engineIndex) {
        engine.setSpeed(-1, false);
        pubsub.publish('speedChange', engine);
      }
    }
  });
});
App.on('addedHeat', ({ id, heat }) => {
  App.systems.forEach((system) => {
    if (system.id === id) {
      system.addHeat(heat);
      pubsub.publish('heatChange', system);
    }
  });
});
App.on('addedAssetFolder', (params) => {
  App.assetFolders.push(new AssetFolder(params));
  pubsub.publish('assetFolderChange', App.assetFolders);
});
App.on('removedAssetFolder', (params) => {
  App.assetFolders = App.assetFolders.filter((folder) => {
    return (folder.id !== params.id);
  });
  pubsub.publish('assetFolderChange', App.assetFolders);
});
App.on('addedAssetContainer', (params) => {
  App.assetContainers.push(new AssetContainer(params));
  pubsub.publish('assetFolderChange', App.assetFolders);
});
App.on('removedAssetContainer', (params) => {
  App.assetContainers = App.assetContainers.filter((container) => {
    return (container.id !== params.id);
  });
  pubsub.publish('assetFolderChange', App.assetFolders);
});
App.on('addedAssetObject', (params) => {
  App.assetObjects.push(new AssetObject(params));
  pubsub.publish('assetFolderChange', App.assetFolders);
});
App.on('removedAssetObject', (params) => {
  App.assetObjects = App.assetObjects.filter((object) => {
    return (object.id !== params.id);
  });
  pubsub.publish('assetFolderChange', App.assetFolders);
});
