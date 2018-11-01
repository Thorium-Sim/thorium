import App from "../app.js";
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
  sensor(root, { id }) {
    return App.systems.find(s => s.id === id);
  },
  sensorContacts(root, { simulatorId, sensorsId, hostile, type }) {
    let contacts = [];
    if (sensorsId) {
      const sensors = App.systems.find(system => {
        return system.type === "Sensors" && system.id === sensorsId;
      });
      contacts = sensors ? sensors.contacts : [];
    }
    if (simulatorId) {
      const sensors = App.systems.filter(system => {
        return system.type === "Sensors" && system.simulatorId === simulatorId;
      });
      contacts = sensors.reduce((prev, next) => prev.concat(next.contacts), []);
    }
    if (hostile || hostile === false)
      contacts = contacts.filter(c => c.hostile === hostile);
    if (type) {
      console.log(contacts);
      contacts = contacts.filter(c => c.type === type);
    }
    return contacts;
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
  processedData(root, args, context) {
    App.handleEvent(args, "processedData", context);
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
  createSensorContacts(root, args, context) {
    App.handleEvent(args, "createSensorContacts", context);
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
  removeAllSensorContacts(root, args, context) {
    App.handleEvent(args, "removeAllSensorContacts", context);
    return "";
  },
  stopAllSensorContacts(root, { id }, context) {
    App.handleEvent({ id }, "stopAllSensorContacts", context);
    return "";
  },
  destroySensorContact(root, args, context) {
    App.handleEvent(args, "destroySensorContact", context);
    return "";
  },
  updateSensorContact(root, args, context) {
    App.handleEvent(args, "updateSensorContact", context);
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
  },
  sensorsFireProjectile(root, args, context) {
    App.handleEvent(args, "sensorsFireProjectile", context);
  },
  setSensorsDefaultHitpoints(root, args, context) {
    App.handleEvent(args, "setSensorsDefaultHitpoints", context);
  },
  setSensorsDefaultSpeed(root, args, context) {
    App.handleEvent(args, "setSensorsDefaultSpeed", context);
  },
  setSensorsMissPercent(root, args, context) {
    App.handleEvent(args, "setSensorsMissPercent", context);
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
    resolve(root, { simulatorId, sensorId, hostile, type }) {
      if (root.id !== sensorId && root.simulatorId !== simulatorId) return null;
      let contacts = root.contacts;

      if (hostile || hostile === false)
        contacts = root.contacts.filter(c => c.hostile === hostile);
      if (type) {
        contacts = contacts.filter(c => c.type === type);
      }
      return contacts;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("sensorContactUpdate"),
      (rootValue, { simulatorId, sensorId }) => {
        let returnVal = false;
        if (sensorId) returnVal = rootValue.id === sensorId;
        if (simulatorId) returnVal = rootValue.simulatorId === simulatorId;
        return returnVal;
      }
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
