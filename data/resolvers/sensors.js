import App from '../../app.js';

export const SensorsQueries = {
  sensors(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === 'Sensors' && system.simulatorId === simulatorId;
    });
  },
};

export const SensorsMutations = {
  addSensorsArray(root, { simulatorId }) {
    App.addSensorsArray({ simulatorId });
    return '';
  },
  removeSensorsArray(root, { id }) {
    App.removeSensorsArray({ id });
    return '';
  },
  sensorScanRequest(root, { id, request }) {
    App.sensorScanRequest({ id, request });
    return '';
  },
  sensorScanResult(root, { id, result }) {
    App.sensorScanResult({ id, result });
    return '';
  },
  processedData(root, { id, data }) {
    App.processedData({ id, data });
    return '';
  },
  createSensorContact(root, { id, contact }) {
    App.createSensorContact({ id, contact });
    return '';
  },
  moveSensorContact(root, { id, contact }) {
    App.moveSensorContact({ id, contact });
    return '';
  },
  removeSensorContact(root, { id, contact }) {
    App.removeSensorContact({ id, contact });
    return '';
  },
  destroySensorContact(root, { id, contact }) {
    App.destroySensorContact({ id, contact });
    return '';
  },
  updateSensorContact(root, { id, contact }) {
    App.updateSensorContact({ id, contact });
    return '';
  },
  createSensorArmyContact(root, { id, contact }) {
    App.createSensorArmyContact({ id, contact });
    return '';
  },
  removeSensorArmyContact(root, { id, contact }) {
    App.removeSensorArmyContact({ id, contact });
    return '';
  },
  updateSensorArmyContact(root, { id, contact }) {
    App.updateSensorArmyContact({ id, contact });
    return '';
  },
};

export const SensorsSubscriptions = {
  sensorsUpdate(root) {
    return root;
  },
  sensorContactUpdate(root, { sensorId }) {
    return root.filter(contact => contact.sensorId === sensorId);
  },
};

function getAsset(assetKey, simulatorId) {
  let returnObj = App.assetObjects.find(obj => {
    return (obj.simulatorId === simulatorId && obj.fullPath === assetKey);
  });
  if (returnObj) {
    return returnObj.url;
  }
  returnObj = App.assetObjects.find(obj => {
    return (obj.simulatorId === 'default' && obj.fullPath === assetKey);
  });
  if (returnObj) {
    return returnObj.url;
  }
  return '';
}
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
