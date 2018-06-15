import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const TargetingQueries = {
  targeting(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "Targeting");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const TargetingMutations = {
  createTargetingContact(root, args, context) {
    App.handleEvent(args, "createTargetingContact", context);
  },
  targetTargetingContact(root, args, context) {
    App.handleEvent(args, "targetTargetingContact", context);
  },
  untargetTargetingContact(root, args, context) {
    App.handleEvent(args, "untargetTargetingContact", context);
  },
  targetSystem(root, args, context) {
    App.handleEvent(args, "targetSystem", context);
  },
  removeTarget(root, args, context) {
    App.handleEvent(args, "removeTarget", context);
  },
  addTargetClass(root, args, context) {
    App.handleEvent(args, "addTargetClass", context);
  },
  removeTargetClass(root, args, context) {
    App.handleEvent(args, "removeTargetClass", context);
  },
  updateTargetClass(root, args, context) {
    App.handleEvent(args, "updateTargetClass", context);
  },
  setTargetClassCount(root, args, context) {
    App.handleEvent(args, "setTargetClassCount", context);
  },
  setTargetingCalculatedTarget(root, args, context) {
    App.handleEvent(args, "setTargetingCalculatedTarget", context);
  },
  setTargetingEnteredTarget(root, args, context) {
    App.handleEvent(args, "setTargetingEnteredTarget", context);
  },
  setCoordinateTargeting(root, args, context) {
    App.handleEvent(args, "setCoordinateTargeting", context);
  }
};

export const TargetingSubscriptions = {
  targetingUpdate: {
    resolve(rootValue, { simulatorId }) {
      let returnRes = rootValue;
      if (simulatorId)
        returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
      return returnRes;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("targetingUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const TargetingTypes = {
  Targeting: {
    targetedSensorContact(targeting) {
      const sensors = App.systems.find(
        s =>
          s.simulatorId === targeting.simulatorId &&
          s.type === "Sensors" &&
          s.domain === "external"
      );
      if (
        targeting.calculatedTarget &&
        targeting.enteredTarget &&
        targeting.calculatedTarget.x === targeting.enteredTarget.x &&
        targeting.calculatedTarget.y === targeting.enteredTarget.y &&
        targeting.calculatedTarget.z === targeting.enteredTarget.z
      ) {
        return sensors
          ? sensors.contacts.find(c => c.id === targeting.targetedSensorContact)
          : null;
      }
      return null;
    }
  },
  TargetingContact: {
    name(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass) {
        return targetClass.name;
      }
    },
    size(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass) {
        return targetClass.size;
      }
    },
    icon(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass) {
        return targetClass.icon;
      }
    },
    picture(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass) {
        return targetClass.picture;
      }
    },
    speed(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass) {
        return targetClass.speed;
      }
    },
    quadrant(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass) {
        return targetClass.quadrant;
      }
    },
    moving(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass) {
        return targetClass.moving;
      }
    }
  }
};
