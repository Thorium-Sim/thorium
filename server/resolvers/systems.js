import App from '../../app.js';

export const SystemsQueries = {
  systems(rootValue, {simulatorId, type, power}){
    let returnSystems = App.systems;
    if (simulatorId) {
      returnSystems = returnSystems.filter(s => s.simulatorId === simulatorId);
    }
    if (type) {
      returnSystems = returnSystems.filter(s => s.type === type);
    }
    if (power) {
      returnSystems = returnSystems.filter(s => s.power.power);
    }
    return returnSystems;
  }
};

export const SystemsMutations = {
  addSystemToSimulator(rootValue, params, context) {
    App.handleEvent(params, 'addSystemToSimulator', context.clientId);
  },
  removeSystemFromSimulator(rootValue, params, context) {
    App.handleEvent(params, 'removeSystemFromSimulator', context.clientId);
  },
  updateSystemName(rootValue, params, context) {
    App.handleEvent(params, 'updateSystemName', context.clientId);
  },
  damageSystem(rootValue, params, context) {
    App.handleEvent(params, 'damageSystem', context.clientId);
  },
  damageReport(rootValue, params, context) {
    App.handleEvent(params, 'damageReport', context.clientId);
  },
  repairSystem(rootValue, params, context) {
    App.handleEvent(params, 'repairSystem', context.clientId);
  },
  requestDamageReport(rootValue, params, context) {
    App.handleEvent(params, 'requestDamageReport', context.clientId);
  },
  systemReactivationCode(rootValue, params, context) {
    App.handleEvent(params, 'systemReactivationCode', context.clientId);
  },
  systemReactivationCodeResponse(rootValue, params, context) {
    App.handleEvent(params, 'systemReactivationCodeResponse', context.clientId);
  },
  changePower(rootValue, params, context) {
    App.handleEvent(params, 'changePower', context.clientId);
  },
  changeSystemPowerLevels(rootValue, params, context) {
    App.handleEvent(params, 'changeSystemPowerLevels', context.clientId);
  }
};

export const SystemsSubscriptions = {
  systemsUpdate(rootValue, {simulatorId, type}){
    let returnSystems = rootValue;
    if (simulatorId) {
      returnSystems = returnSystems.filter(s => s.simulatorId === simulatorId);
    }
    if (type) {
      returnSystems = returnSystems.filter(s => s.type === type);
    }
    return returnSystems;
  }
};

export const SystemsTypes = {
  SystemUnion: {
    __resolveType(obj, context, info) {
      return obj.type || null;
    }
  },

}
