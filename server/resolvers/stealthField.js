import App from '../../app.js';

export const StealthFieldQueries = {
  stealthField(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'StealthField');
    console.log(App.systems);
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    console.log(returnVal);
    return returnVal;
  }
};

export const StealthFieldMutations = {
  setActivated(rootValue, args) {
    App.handleEvent(args, 'setActivated');
  },
  setCharge(rootValue, args) {
    App.handleEvent(args, 'setCharge');
  },
  activate(rootValue, args) {
    App.handleEvent(args, 'activate');
  },
  deactivate(rootValue, args) {
    App.handleEvent(args, 'deactivate');
  },
  setQuadrant(rootValue, args) {
    App.handleEvent(args, 'setQuadrant');
  },
  fluxQuadrants(rootValue, args) {
    App.handleEvent(args, 'fluxQuadrants');
  },
};

export const StealthFieldSubscriptions = {
  stealthFieldUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
