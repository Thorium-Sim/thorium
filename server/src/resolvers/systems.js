import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const SystemsQueries = {
  system(rootValue, { id }) {
    const sys = App.systems.find(s => s.id === id);
    if (!sys) return App.dockingPorts.find(s => s.id === id);
    return sys;
  },
  systems(
    rootValue,
    { simulatorId, type, power, heat, extra = false, damageWhich }
  ) {
    let returnSystems = App.systems;
    if (extra === false) {
      returnSystems = returnSystems.filter(s => s.extra === false);
    }
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
    if (damageWhich) {
      returnSystems = returnSystems.filter(s => s.damage.which === damageWhich);
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
  updateCurrentDamageStep(rootValue, params, context) {
    App.handleEvent(params, "updateCurrentDamageStep", context);
  },
  generateDamageReport(rootValue, params, context) {
    let sys = App.systems.find(s => s.id === params.systemId);
    App.handleEvent(params, "generateDamageReport", context);
    return sys.generateDamageReport(params.steps);
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
  },
  updateSystemRooms(rootValue, params, context) {
    App.handleEvent(params, "updateSystemRooms", context);
  },
  addSystemDamageStep(rootValue, params, context) {
    App.handleEvent(params, "addSystemDamageStep", context);
  },
  updateSystemDamageStep(rootValue, params, context) {
    App.handleEvent(params, "updateSystemDamageStep", context);
  },
  removeSystemDamageStep(rootValue, params, context) {
    App.handleEvent(params, "removeSystemDamageStep", context);
  },
  breakSystem(rootValue, params, context) {
    App.handleEvent(params, "breakSystem", context);
  },
  fixSystem(rootValue, params, context) {
    App.handleEvent(params, "fixSystem", context);
  },
  setDamageStepValidation(root, args, context) {
    App.handleEvent(args, "setDamageStepValidation", context);
  },
  validateDamageStep(root, args, context) {
    App.handleEvent(args, "validateDamageStep", context);
  },
  changeSystemDefaultPowerLevel(root, args, context) {
    App.handleEvent(args, "changeSystemDefaultPowerLevel", context);
  },
  fluxSystemPower(root, args, context) {
    App.handleEvent(args, "fluxSystemPower", context);
  }
};

export const SystemsSubscriptions = {
  systemsUpdate: {
    resolve(
      rootValue,
      { simulatorId, type, power, heat, extra = false, damageWhich }
    ) {
      let returnSystems = rootValue;
      if (extra === false) {
        returnSystems = returnSystems.filter(s => s.extra === false);
      }
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
      if (damageWhich) {
        returnSystems = returnSystems.filter(s => {
          return s.damage.which === damageWhich;
        });
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
  System: {
    isochips(rootValue) {
      return App.isochips.filter(i => i.system === rootValue.id);
    },
    locations(rootValue) {
      return rootValue.locations.map(r =>
        App.rooms.find(room => room.id === r)
      );
    }
  },
  SystemUnion: {
    __resolveType(obj, context, info) {
      return obj.type || null;
    }
  }
};
