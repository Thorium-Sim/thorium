import Shield from './data/classes/shield';
import Simulator from './data/classes/simulator';
import Engine from './data/classes/engine';
import Thrusters from './data/classes/thruster';
import Client from './data/classes/client';
import Transporters from './data/classes/transporters';
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
  Transporters,
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
  handleEvent(param, pres, past) {
    this.digest(pres, param);
    this.emit(past, param, this);
  }
  test(param) {
    console.log(this);
    this.handleEvent(param, 'test', 'tested');
  }

  // Generic
  addSimulator(param) {
    this.handleEvent(param, 'addSimulator', 'addedSimulator');
  }
  addSystem(param) {
    this.handleEvent(param, 'addSystem', 'addedSystem');
  }

  // Engines
  speedChange(param) {
    this.handleEvent(param, 'speedChange', 'speedChanged');
  }
  addHeat(param) {
    this.handleEvent(param, 'addHeat', 'addedHeat');
  }

  // Transporters
  // I know Setted isn't a word. Deal with it.
  createTransporter(param) {
    this.handleEvent(param, 'createTransporter', 'createdTransporter');
  }
  setTransportDestination(param) {
    this.handleEvent(param, 'setTransportDestination', 'settedTransportDestination');
  }
  setTransportTarget(param) {
    this.handleEvent(param, 'setTransportTarget', 'settedTransportTarget');
  }
  beginTransportScan(param) {
    this.handleEvent(param, 'beginTransportScan', 'beganTransportScan');
  }
  cancelTransportScan(param) {
    this.handleEvent(param, 'cancelTransportScan', 'canceledTransportScan');
  }
  clearTransportTargets(param) {
    this.handleEvent(param, 'clearTransportTargets', 'clearedTransportTargets');
  }
  setTransportCharge(param) {
    this.handleEvent(param, 'setTransportCharge', 'settedTransportCharge');
  }
  completeTransport(param) {
    this.handleEvent(param, 'completeTransport', 'completedTransport');
  }
  setTransporterTargets(param) {
    this.handleEvent(param, 'setTransporterTargets', 'settedTransporterTargets');
  }

  // Assets
  addAssetFolder(param) {
    this.handleEvent(param, 'addAssetFolder', 'addedAssetFolder');
  }
  addAssetContainer(param) {
    this.handleEvent(param, 'addAssetContainer', 'addedAssetContainer');
  }
  addAssetObject(param) {
    this.handleEvent(param, 'addAssetObject', 'addedAssetObject');
  }
  removeAssetFolder(param) {
    this.handleEvent(param, 'removeAssetFolder', 'removedAssetFolder');
  }
  removeAssetContainer(param) {
    this.handleEvent(param, 'removeAssetContainer', 'removedAssetContainer');
  }
  removeAssetObject(param) {
    this.handleEvent(param, 'removeAssetObject', 'removedAssetObject');
  }
}

const App = new Events();

export default App;

// Generic
App.on('addedSimulator', (param) => {
  // TODO: Check to make sure the simulator doesn't exist
  App.simulators.push(new Simulator(param));
});
App.on('addedSystem', (param) => {
  // TODO: Check to make sure the system doesn't exist
  App.systems.push(new Classes[param.type](param));
});

// Engines
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

// Transporters
App.on('createdTransporter', (params) => {
  const transporter = new Transporters(params);
  App.systems.push(transporter);
  console.log(transporter);
});
App.on('removedTransporter', (params) => {
  
});
App.on('settedTransportDestination', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.setDestination(params.destination);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('settedTransportTarget', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.setRequestedTarget(params.target);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('beganTransportScan', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.beginScan();
  pubsub.publish('transporterUpdate', transporter);
});
App.on('canceledTransportScan', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.cancelScan();
  transporter.clearTargets();
  pubsub.publish('transporterUpdate', transporter);
});
App.on('clearedTransportTargets', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.clearTargets();
  pubsub.publish('transporterUpdate', transporter);
});
App.on('settedTransportCharge', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.setCharge(params.charge);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('completedTransport', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.completeTransport(params.target);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('settedTransporterTargets', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  if (transporter.targets.length < params.targets) {
    transporter.addTargets(params.targets - transporter.targets.length);
  }
  if (transporter.targets.length > params.targets) {
    transporter.removeTargets(transporter.targets.length - params.targets);
  }
  pubsub.publish('transporterUpdate', transporter);
});

// Assets
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
