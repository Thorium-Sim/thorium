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
    App.handleEvent(args, 'setState');
  },
  setTractorBeamTarget(rootValue, args) {
    App.handleEvent(args, 'setTarget');
  },
  setTractorBeamStrength(rootValue, args) {
    App.handleEvent(args, 'setStrength');
  },
  setTractorBeamStress(rootValue, args) {
    App.handleEvent(args, 'setStress');
  },
};

export const TractorBeamSubscriptions = {
  tractorBeamUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
