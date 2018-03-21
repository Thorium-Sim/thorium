import App from "../app.js";
import moveSensorContact from "../processes/sensorContacts.js";
import getAsset from "../helpers/getAsset";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

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
  setSensorsHistory(root, args, context) {
    App.handleEvent(args, "setSensorsHistory", context);
  },
  newSensorScan(root, args, context) {
    App.handleEvent(args, "newSensorScan", context);
  },
  updateSensorScan(root, args, context) {
    App.handleEvent(args, "updateSensorScan", context);
  },
  cancelSensorScan(root, args, context) {
    App.handleEvent(args, "cancelSensorScan", context);
  },
  toggleSensorsAutoTarget(root, args, context) {
    App.handleEvent(args, "toggleSensorsAutoTarget", context);
  },
  setSensorsSegment(root, args, context) {
    App.handleEvent(args, "setSensorsSegment", context);
  },
  toggleSensorsAutoThrusters(root, args, context) {
    App.handleEvent(args, "toggleSensorsAutoThrusters", context);
  },
  setSensorsInterference(root, args, context) {
    App.handleEvent(args, "setSensorsInterference", context);
  },
  setAutoMovement(root, args, context) {
    App.handleEvent(args, "setAutoMovement", context);
  },
  updateSensorContacts(root, args, context) {
    App.handleEvent(args, "updateSensorContacts", context);
  }
};

export const SensorsSubscriptions = {
  sensorsUpdate: {
    resolve(root, { simulatorId, domain }) {
      let returnRes = root;
      if (simulatorId)
        returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
      if (domain) returnRes = returnRes.filter(s => s.domain === domain);
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("sensorsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  },
  sensorContactUpdate: {
    resolve(root, { sensorId }) {
      if (root.id !== sensorId) return null;
      return root.contacts.filter(contact => contact.sensorId === sensorId);
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("sensorContactUpdate"),
      (rootValue, { sensorId }) => rootValue.id === sensorId
    )
  },
  sensorsPing: {
    resolve(root, args) {
      return root;
    },
    subscribe: () => pubsub.asyncIterator("sensorsPing")
  }
};

export const SensorsTypes = {
  Sensors: {
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    },
    movement(rootValue) {
      return {
        x: rootValue.movement.x + rootValue.thrusterMovement.x,
        y: rootValue.movement.y + rootValue.thrusterMovement.y,
        z: rootValue.movement.z + rootValue.thrusterMovement.z
      };
    }
  },
  SensorContact: {
    /*startTime() {
      return 0;
    },
    endTime() {
      return 0;
    },*/
    movementTime({ startTime, endTime }) {
      return endTime - startTime;
    },
    targeted({ id, sensorId }) {
      const sensor = App.systems.find(s => s.id === sensorId);
      const targeting = App.systems.find(
        s => s.simulatorId === sensor.simulatorId && s.class === "Targeting"
      );
      const targetedContact = targeting.contacts.find(t => t.targeted === true);
      if (targetedContact && targetedContact.class === id) return true;
      return false;
    }
  }
};
