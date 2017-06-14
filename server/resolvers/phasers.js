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
  chargePhaserBeam(root, args, context){
    App.handleEvent(args, 'chargePhaserBeam', context.clientId);
  },
  dischargePhaserBeam(root, args, context){
    App.handleEvent(args, 'dischargePhaserBeam', context.clientId);
  },
  firePhaserBeam(root, args, context){
    App.handleEvent(args, 'firePhaserBeam', context.clientId);
  },
  stopPhaserBeams(root, args, context) {
    App.handleEvent(args, 'stopPhaserBeams', context.clientId);
  },
  phaserArc(root, args, context){
    App.handleEvent(args, 'phaserArc', context.clientId);
  },
  setPhaserBeamCharge(root, args, context){
    App.handleEvent(args, 'setPhaserBeamCharge', context.clientId);
  },
  setPhaserBeamHeat(root, args, context) {
    App.handleEvent(args, 'setPhaserBeamHeat', context.clientId);
  },
  coolPhaserBeam(root, args, context) {
    App.handleEvent(args, 'coolPhaserBeam', context.clientId);
  }
};


export const PhaserSubscriptions = {
  phasersUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
