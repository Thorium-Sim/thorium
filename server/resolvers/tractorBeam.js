import App from '../../app.js';

export const TractorBeamQueries = {
  tractorBeam(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'TractorBeam');
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const TractorBeamMutations = {
  setTractorBeamState(rootValue, args) {
    App.handleEvent(args, 'setTractorBeamState');
  },
  setTractorBeamTarget(rootValue, args) {
    App.handleEvent(args, 'setTractorBeamTarget');
  },
  setTractorBeamStrength(rootValue, args) {
    App.handleEvent(args, 'setTractorBeamStrength');
  },
  setTractorBeamStress(rootValue, args) {
    App.handleEvent(args, 'setTractorBeamStress');
  },
};

export const TractorBeamSubscriptions = {
  tractorBeamUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
