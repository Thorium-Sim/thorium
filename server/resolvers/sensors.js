import App from '../../app.js';
import moveSensorContact from '../processes/sensorContacts.js';
import getAsset from '../helpers/getAsset';

export const SensorsQueries = {
  sensors(root, { simulatorId, domain }) {
    let returnVal = App.systems.filter(s => s.type === 'Sensors');
    if (domain) {
      returnVal = returnVal.filter(s => s.domain === domain);
    }
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  },
  sensorContacts(root, { sensorsId }) {
    const sensors = App.systems.find(system => {
      return system.type === 'Sensors' && system.id === sensorsId;
    });
    return sensors ? sensors.contacts : [];
  },
};

export const SensorsMutations = {
  addSensorsArray(root, { simulatorId, domain }) {
    App.handleEvent({ simulatorId, domain }, 'addSensorsArray');
    return '';
  },
  removeSensorsArray(root, { id }) {
    App.handleEvent({ id }, 'removeSensorsArray');
    return '';
  },
  sensorScanRequest(root, { id, request }) {
    App.handleEvent({ id, request }, 'sensorScanRequest');
    return '';
  },
  sensorScanResult(root, { id, result }) {
    App.handleEvent({ id, result }, 'sensorScanResult');
    return '';
  },
  processedData(root, { id, data }) {
    App.handleEvent({ id, data }, 'processedData');
    return '';
  },
  sensorScanCancel(root, { id }) {
    App.handleEvent({ id }, 'sensorScanCancel');
    return '';
  },
  createSensorContact(root, { id, contact }) {
    App.handleEvent({ id, contact }, 'createSensorContact');
    return '';
  },
  moveSensorContact(root, { id, contact }) {
    App.handleEvent({ id, contact }, 'moveSensorContact');
    return '';
  },
  removeSensorContact(root, { id, contact }) {
    App.handleEvent({ id, contact }, 'removeSensorContact');
    return '';
  },
  removeAllSensorContacts(root, {id}) {
    App.handleEvent({id}, 'removeAllSensorContacts');
    return '';
  },
  stopAllSensorContacts(root, {id}) {
    App.handleEvent({id}, 'stopAllSensorContacts');
    return '';
  },
  destroySensorContact(root, { id, contact }) {
    App.handleEvent({ id, contact }, 'destroyeSensorContact');
    return '';
  },
  updateSensorContact(root, { id, contact }) {
    App.handleEvent({ id, contact }, 'updateSensorContact');
    return '';
  },
  createSensorArmyContact(root, { id, contact }) {
    App.handleEvent({ id, contact }, 'createSensorArmyContact');
    return '';
  },
  removeSensorArmyContact(root, { id, contact }) {
    App.handleEvent({ id, contact }, 'removeSensorArmyContact');
    return '';
  },
  updateSensorArmyContact(root, { id, contact }) {
    App.handleEvent({ id, contact }, 'updateSensorArmyContact');
    return '';
  },
  animateSensorContacact() {
    moveSensorContact();
  },
};

export const SensorsSubscriptions = {
  sensorsUpdate(root, {simulatorId, domain}) {
    let returnRes = root;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    if (domain) returnRes = returnRes.filter(s => s.domain === domain);
    return returnRes;
  },
  sensorContactUpdate(root, { sensorId }) {
    return root.filter(contact => contact.sensorId === sensorId);
  },
};

export const SensorsTypes = {
  SensorContact: {
    iconUrl({ icon: assetKey, simulatorId }) {
      return getAsset(assetKey, simulatorId);
    },
    pictureUrl({ picture: assetKey, simulatorId }) {
      return getAsset(assetKey, simulatorId);
    },
  },
};
