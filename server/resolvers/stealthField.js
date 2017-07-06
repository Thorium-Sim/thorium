import App from '../../app.js';

export const StealthFieldQueries = {
  stealthField(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'StealthField');
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const StealthFieldMutations = {
  setStealthActivated(rootValue, args, context) {
    App.handleEvent(args, 'setStealthActivated', context);
  },
  setStealthCharge(rootValue, args, context) {
    App.handleEvent(args, 'setStealthCharge', context);
  },
  activateStealth(rootValue, args, context) {
    App.handleEvent(args, 'activateStealth', context);
  },
  deactivateStealth(rootValue, args, context) {
    App.handleEvent(args, 'deactivateStealth', context);
  },
  setStealthQuadrant(rootValue, args, context) {
    App.handleEvent(args, 'setStealthQuadrant', context);
  },
  fluxStealthQuadrants(rootValue, args, context) {
    App.handleEvent(args, 'fluxStealthQuadrants', context);
  },
};

export const StealthFieldSubscriptions = {
  stealthFieldUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
