import * as Classes from './data/classes';
import jsonfile from 'jsonfile';
import { writeFile } from './helpers/json-format';
import { Entity } from 'sourced';

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
    this.coreLayouts = [];
  }
  handleEvent(param, pres, past) {
    this.digest(pres, param);
    this.emit(past, param, this);
  }
  test(param) {
    console.log(this);
    this.handleEvent(param, 'test', 'tested');
  }

  // TODO: Improve this section with Mix-ins
  // See https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes#Mix-ins
  // Generic
  addSimulator(param) {
    this.handleEvent(param, 'addSimulator', 'addedSimulator');
  }
  addSystem(param) {
    this.handleEvent(param, 'addSystem', 'addedSystem');
  }

  // Core
  updateCoreLayout(param) {
    this.handleEvent(param, 'updateCoreLayout', 'updatedCoreLayout');
  }
  addCoreLayout(param) {
    this.handleEvent(param, 'addCoreLayout', 'addedCoreLayout');
  }
  removeCoreLayout(param) {
    this.handleEvent(param, 'removeCoreLayout', 'removedCoreLayout');
  }
  // Sensors
  addSensorsArray(param) {
    this.handleEvent(param, 'addSensorsArray', 'addedSensorsArray');
  }
  removeSensorsArray(param) {
    this.handleEvent(param, 'removeSensorsArray', 'removedSensorsArray');
  }
  sensorScanRequest(param) {
    this.handleEvent(param, 'sensorScanRequest', 'sensorScanRequested');
  }
  sensorScanResult(param) {
    this.handleEvent(param, 'sensorScanResult', 'sensorScanResulted');
  }
  processedData(param) {
    this.handleEvent(param, 'processedData', 'processedDatad');
  }
  createSensorContact(param) {
    this.handleEvent(param, 'createSensorContact', 'createdSensorContact');
  }
  moveSensorContact(param) {
    this.handleEvent(param, 'moveSensorContact', 'movedSensorContact');
  }
  removeSensorContact(param) {
    this.handleEvent(param, 'removeSensorContact', 'removedSensorContact');
  }
  destroySensorContact(param) {
    this.handleEvent(param, 'destroyeSensorContact', 'destroyedSensorContact');
  }
  updateSensorContactInfrared(param) {
    this.handleEvent(param, 'updateSensorContactInfrared', 'updatedSensorContactInfrared');
  }
  updateSensorContactIcon(param) {
    this.handleEvent(param, 'updateSensorContactIcon', 'updatedSensorContactIcon');
  }
  updateSensorContactName(param) {
    this.handleEvent(param, 'updateSensorContactName', 'updatedSensorContactName');
  }
  updateSensorContactPicture(param) {
    this.handleEvent(param, 'updateSensorContactPicture', 'updatedSensorContactPicture');
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
