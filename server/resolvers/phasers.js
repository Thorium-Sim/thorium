import App from '../../app.js';

export const PhaserQueries = {
  phasers(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'Phasers');
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const PhaserMutations = {
  chargePhaser(root, args){
    App.handleEvent(args, 'chargePhaser');
  },
  dischargePhaser(root, args){
    App.handleEvent(args, 'dischargePhaser');
  },
  firePhaser(root, args){
    App.handleEvent(args, 'firePhaser');
  },
  phaserArc(root, args){
    App.handleEvent(args, 'phaserArc');
  },
  setPhaserCharge(root, args){
    App.handleEvent(args, 'setPhaserCharge');
  },
};

export const PhaserSubscriptions = {
  phasersUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
