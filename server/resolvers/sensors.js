import App from "../../app.js";
import moveSensorContact from "../processes/sensorContacts.js";
import getAsset from "../helpers/getAsset";

export const SensorsQueries = {
  sensors(root, { simulatorId, domain }) {
    let returnVal = App.systems.filter(s => s.type === "Sensors");
    if (domain) {
      returnVal = returnVal.filter(s => s.domain === domain);
    }
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  },
  sensorContacts(root, { sensorsId }) {
    const sensors = App.systems.find(system => {
      return system.type === "Sensors" && system.id === sensorsId;
    });
    return sensors ? sensors.contacts : [];
  }
};

export const SensorsMutations = {
  sensorScanRequest(root, { id, request }, context) {
    App.handleEvent({ id, request }, "sensorScanRequest", context);
    return "";
  },
  sensorScanResult(root, { id, result }, context) {
    App.handleEvent({ id, result }, "sensorScanResult", context);
    return "";
  },
  processedData(root, { id, data }, context) {
    App.handleEvent({ id, data }, "processedData", context);
    return "";
  },
  sensorScanCancel(root, { id }, context) {
    App.handleEvent({ id }, "sensorScanCancel", context);
    return "";
  },
  setPresetAnswers(root, params, context) {
    App.handleEvent(params, "setPresetAnswers", context);
  },
  createSensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, "createSensorContact", context);
    return "";
  },
  moveSensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, "moveSensorContact", context);
    return "";
  },
  removeSensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, "removeSensorContact", context);
    return "";
  },
  removeAllSensorContacts(root, { id }, context) {
    App.handleEvent({ id }, "removeAllSensorContacts", context);
    return "";
  },
  stopAllSensorContacts(root, { id }, context) {
    App.handleEvent({ id }, "stopAllSensorContacts", context);
    return "";
  },
  destroySensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, "destroyeSensorContact, context");
    return "";
  },
  updateSensorContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, "updateSensorContact", context);
    return "";
  },
  setArmyContacts(root, params, context) {
    App.handleEvent(params, "setArmyContacts", context);
  },
  createSensorArmyContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, "createSensorArmyContact", context);
    return "";
  },
  removeSensorArmyContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, "removeSensorArmyContact", context);
    return "";
  },
  updateSensorArmyContact(root, { id, contact }, context) {
    App.handleEvent({ id, contact }, "updateSensorArmyContact", context);
    return "";
  },
  nudgeSensorContacts(root, args, context) {
    App.handleEvent(args, "nudgeSensorContacts", context);
  },
  setSensorPingMode(root, args, context) {
    App.handleEvent(args, "setSensorPingMode", context);
  },
  pingSensors(root, args, context) {
    App.handleEvent(args, "pingSensors", context);
  },
  animateSensorContacact() {
    moveSensorContact();
  }
};

export const SensorsSubscriptions = {
  sensorsUpdate(root, { simulatorId, domain }) {
    let returnRes = root;
    if (simulatorId)
      returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    if (domain) returnRes = returnRes.filter(s => s.domain === domain);
    return returnRes;
  },
  sensorContactUpdate(root, { sensorId }) {
    return root.filter(contact => contact.sensorId === sensorId);
  },
  sensorsPing(root, args) {
    return root;
  }
};

export const SensorsTypes = {
  SensorContact: {
    iconUrl({ icon: assetKey, simulatorId }) {
      return getAsset(assetKey, simulatorId);
    },
    pictureUrl({ picture: assetKey, simulatorId }) {
      return getAsset(assetKey, simulatorId);
    }
  }
};
