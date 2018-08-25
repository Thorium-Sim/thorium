import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ThrustersQueries = {
  thrusters(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === "Thrusters" && system.simulatorId === simulatorId;
    });
  },
  thruster(root, { id }) {
    return App.systems.find(s => s.id === id);
  }
};

export const ThrustersMutations = {
  rotationUpdate(root, params, context) {
    App.handleEvent(params, "rotationUpdate", context);
  },
  rotationSet(root, params, context) {
    App.handleEvent(params, "rotationSet", context);
  },
  directionUpdate(root, params, context) {
    App.handleEvent(params, "directionUpdate", context);
  },
  requiredRotationSet(root, params, context) {
    App.handleEvent(params, "requiredRotationSet", context);
  },
  setThrusterRotationSpeed(root, args, context) {
    App.handleEvent(args, "setThrusterRotationSpeed", context);
  },
  setThrusterMovementSpeed(root, args, context) {
    App.handleEvent(args, "setThrusterMovementSpeed", context);
  }
};

export const ThrustersSubscriptions = {
  rotationChange: {
    resolve(root, { simulatorId }) {
      if (simulatorId) {
        return root.simulatorId === simulatorId && root;
      }
      return root;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("rotationChange"),
      rootValue => !!rootValue
    )
  }
};
