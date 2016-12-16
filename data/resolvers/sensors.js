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
  updateSensorContactInfrared(root, { id, contact }) {
    App.updateSensorContactInfrared({ id, contact });
    return '';
  },
  updateSensorContactIcon(root, { id, contact }) {
    App.updateSensorContactIcon({ id, contact });
    return '';
  },
  updateSensorContactName(root, { id, contact }) {
    App.updateSensorContactName({ id, contact });
    return '';
  },
  updateSensorContactPicture(root, { id, contact }) {
    App.updateSensorContactPicture({ id, contact });
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
