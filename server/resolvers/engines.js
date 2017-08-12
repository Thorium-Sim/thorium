import App from "../../app.js";

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
  engineCool(root, args, context) {
    App.handleEvent(args, "engineCool", context);
  }
};

export const EngineSubscriptions = {
  speedChange(rootValue) {
    return rootValue;
  },
  heatChange(rootValue, { simulatorId }) {
    if (simulatorId) {
      return rootValue.filter(s => s.simulatorId === simulatorId);
    }
    return rootValue;
  }
};
