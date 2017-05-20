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
  setStealthActivated(rootValue, args) {
    App.handleEvent(args, 'setStealthActivated');
  },
  setStealthCharge(rootValue, args) {
    App.handleEvent(args, 'setStealthCharge');
  },
  activateStealth(rootValue, args) {
    App.handleEvent(args, 'activateStealth');
  },
  deactivateStealth(rootValue, args) {
    App.handleEvent(args, 'deactivateStealth');
  },
  setStealthQuadrant(rootValue, args) {
    App.handleEvent(args, 'setStealthQuadrant');
  },
  fluxStealthQuadrants(rootValue, args) {
    App.handleEvent(args, 'fluxStealthQuadrants');
  },
};

export const StealthFieldSubscriptions = {
  stealthFieldUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
