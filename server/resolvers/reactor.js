import App from '../../app.js';

export const ReactorQueries = {
  reactors(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'Reactor');
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const ReactorMutations = {
  reactorEject(root, args, context){
    App.handleEvent(args, 'reactorEject', context.clientId);
  },
  reactorChangeOutput(root, args, context){
    App.handleEvent(args, 'reactorChangeOutput', context.clientId);
  },
  reactorChangeEfficiency(root, args, context){
    App.handleEvent(args, 'reactorChangeEfficiency', context.clientId);
  },
  reactorBatteryChargeLevel(root, args, context){
    App.handleEvent(args, 'reactorBatteryChargeLevel', context.clientId);
  },
  reactorBatteryChargeRate(root, args, context){
    App.handleEvent(args, 'reactorBatteryChargeRate', context.clientId);
  },
};

export const ReactorSubscriptions = {
  reactorUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
