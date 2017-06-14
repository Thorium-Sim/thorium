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
  addSensorsArray(root, { simulatorId, domain }, context) {
    App.handleEvent({ simulatorId, domain }, 'addSensorsArray', context.clientId);
    return '';
  },
  removeSensorsArray(root, { id }, context) {
    App.handleEvent({ id }, 'removeSensorsArray', context.clientId);
    return '';
  },
  sensorScanRequest(root, { id, request }, context) {
    App.handleEvent({ id, request }, 'sensorScanRequest', context.clientId);
    return '';
  },
  sensorScanResult(root, { id, result }, context) {
    App.handleEvent({ id, result }, 'sensorScanResult', context.clientId);
    return '';
  },
  processedData(root, { id, data }, context) {
    App.handleEvent({ id, data }, 'processedData', context.clientId);
    return '';
  },
  sensorScanCancel(root, { id }, context) {
    App.handleEvent({ id }, 'sensorScanCancel', context.clientId);
    return '';
  },
  createSensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, 'createSensorContact', context.clientId);
    return '';
  },
  moveSensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, 'moveSensorContact', context.clientId);
    return '';
  },
  removeSensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, 'removeSensorContact', context.clientId);
    return '';
  },
  removeAllSensorContacts(root, {id}, context) {
    App.handleEvent({id}, 'removeAllSensorContacts', context.clientId);
    return '';
  },
  stopAllSensorContacts(root, {id}, context) {
    App.handleEvent({id}, 'stopAllSensorContacts', context.clientId);
    return '';
  },
  destroySensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, 'destroyeSensorContact, context.clientId');
    return '';
  },
  updateSensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, 'updateSensorContact', context.clientId);
    return '';
  },
  createSensorArmyContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, 'createSensorArmyContact', context.clientId);
    return '';
  },
  removeSensorArmyContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, 'removeSensorArmyContact', context.clientId);
    return '';
  },
  updateSensorArmyContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, 'updateSensorArmyContact', context.clientId);
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
