import App from "../../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const SystemsQueries = {
  systems(rootValue, { simulatorId, type, power, heat }) {
    let returnSystems = App.systems;
    if (simulatorId) {
      returnSystems = returnSystems.filter(s => s.simulatorId === simulatorId);
    }
    if (type) {
      returnSystems = returnSystems.filter(s => s.type === type);
    }
    if (power) {
      returnSystems = returnSystems.filter(
        s => s.power.power || s.power.power === 0
      );
    }
    if (heat) {
      returnSystems = returnSystems.filter(s => s.heat || s.heat === 0);
    }
    return returnSystems;
  }
};

export const SystemsMutations = {
  addSystemToSimulator(rootValue, params, context) {
    App.handleEvent(params, "addSystemToSimulator", context);
  },
  removeSystemFromSimulator(rootValue, params, context) {
    App.handleEvent(params, "removeSystemFromSimulator", context);
  },
  updateSystemName(rootValue, params, context) {
    App.handleEvent(params, "updateSystemName", context);
  },
  damageSystem(rootValue, params, context) {
    App.handleEvent(params, "damageSystem", context);
  },
  damageReport(rootValue, params, context) {
    App.handleEvent(params, "damageReport", context);
  },
  repairSystem(rootValue, params, context) {
    App.handleEvent(params, "repairSystem", context);
  },
  requestDamageReport(rootValue, params, context) {
    App.handleEvent(params, "requestDamageReport", context);
  },
  systemReactivationCode(rootValue, params, context) {
    App.handleEvent(params, "systemReactivationCode", context);
  },
  systemReactivationCodeResponse(rootValue, params, context) {
    App.handleEvent(params, "systemReactivationCodeResponse", context);
  },
  changePower(rootValue, params, context) {
    App.handleEvent(params, "changePower", context);
  },
  changeSystemPowerLevels(rootValue, params, context) {
    App.handleEvent(params, "changeSystemPowerLevels", context);
  }
};

export const SystemsSubscriptions = {
  systemsUpdate: {
    resolve(rootValue, { simulatorId, type, power, heat }) {
      let returnSystems = rootValue;
      if (simulatorId) {
        returnSystems = returnSystems.filter(
          s => s.simulatorId === simulatorId
        );
      }
      if (type) {
        returnSystems = returnSystems.filter(s => s.type === type);
      }
      if (power) {
        returnSystems = returnSystems.filter(
          s => s.power.power || s.power.power === 0
        );
      }
      if (heat) {
        returnSystems = returnSystems.filter(s => s.heat || s.heat === 0);
      }
      return returnSystems;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("systemsUpdate"),
      rootValue => !!(rootValue && rootValue.length) > 0
    )
  }
};

export const SystemsTypes = {
  SystemUnion: {
    __resolveType(obj, context, info) {
      return obj.type || null;
    }
  }
};
