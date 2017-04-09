import App from '../../app.js';

export const ReactorQueries = {
  reactors(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'Reactor');
    console.log(App.systems);
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    console.log(returnVal);
    return returnVal;
  }
};

export const ReactorMutations = {
  reactorEject(root, args){
    App.handleEvent(args, 'reactorEject');
  },
  reactorChangeOutput(root, args){
    App.handleEvent(args, 'reactorChangeOutput');
  },
  reactorChangeEfficiency(root, args){
    App.handleEvent(args, 'reactorChangeEfficiency');
  },
  reactorBatteryChargeLevel(root, args){
    App.handleEvent(args, 'reactorBatteryChargeLevel');
  },
  reactorBatteryChargeRate(root, args){
    App.handleEvent(args, 'reactorBatteryChargeRate');
  },
};

export const ReactorSubscriptions = {
  reactorUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
