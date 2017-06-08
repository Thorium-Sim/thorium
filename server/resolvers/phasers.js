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
  chargePhaserBeam(root, args){
    App.handleEvent(args, 'chargePhaserBeam');
  },
  dischargePhaserBeam(root, args){
    App.handleEvent(args, 'dischargePhaserBeam');
  },
  firePhaserBeam(root, args){
    App.handleEvent(args, 'firePhaserBeam');
  },
  stopPhaserBeams(root, args) {
    App.handleEvent(args, 'stopPhaserBeams');
  },
  phaserArc(root, args){
    App.handleEvent(args, 'phaserArc');
  },
  setPhaserBeamCharge(root, args){
    App.handleEvent(args, 'setPhaserBeamCharge');
  },
  setPhaserBeamHeat(root, args) {
    App.handleEvent(args, 'setPhaserBeamHeat');
  },
  coolPhaserBeam(root, args) {
    App.handleEvent(args, 'coolPhaserBeam');
  }
};


export const PhaserSubscriptions = {
  phasersUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
