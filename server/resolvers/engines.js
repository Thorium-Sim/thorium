import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const EngineQueries = {
  engines(root, { simulatorId }) {
    return App.systems.filter(system => {
      return system.type === "Engine" && system.simulatorId === simulatorId;
    });
  }
};

export const EngineMutations = {
  setSpeed(root, { id, speed, on }, context) {
    App.handleEvent({ id, speed, on }, "speedChange", context);
    return "";
  },
  setEngineSpeeds(root, params, context) {
    App.handleEvent(params, "setEngineSpeeds", context);
  },
  // This mutation applies to all systems
  addHeat(root, { id, heat }, context) {
    App.handleEvent({ id, heat }, "addHeat", context);
    return "";
  },
  setHeatRate(root, args, context) {
    App.handleEvent(args, "setHeatRate", context);
  },
  engineCool(root, args, context) {
    App.handleEvent(args, "engineCool", context);
  },
  setEngineAcceleration(root, args, context) {
    App.handleEvent(args, "setEngineAcceleration", context);
  },
  setEngineUseAcceleration(root, args, context) {
    App.handleEvent(args, "setEngineUseAcceleration", context);
  },
  setEngineSpeedFactor(root, args, context) {
    App.handleEvent(args, "setEngineSpeedFactor", context);
  }
};

export const EngineSubscriptions = {
  speedChange: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId)
        return rootValue.simulatorId === simulatorId && rootValue;
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("speedChange"),
      rootValue => !!rootValue
    )
  },
  heatChange: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.simulatorId === simulatorId && rootValue;
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("heatChange"),
      rootValue => !!rootValue
    )
  },
  engineUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId) {
        return rootValue.simulatorId === simulatorId && rootValue;
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("engineUpdate"),
      rootValue => !!rootValue
    )
  }
};

export const EngineTypes = {
  Engine: {
    velocity(rootValue) {
      const sim = App.simulators.find(s => s.id === rootValue.simulatorId);
      return sim ? sim.ship.speed : 0;
    },
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  }
};
