import App from "../../app.js";

export const TractorBeamQueries = {
  tractorBeam(root, { simulatorId }) {
    let returnVal = App.systems.filter(s => s.type === "TractorBeam");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const TractorBeamMutations = {
  setTractorBeamState(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamState", context);
  },
  setTractorBeamTarget(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamTarget", context);
  },
  setTractorBeamStrength(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamStrength", context);
  },
  setTractorBeamStress(rootValue, args, context) {
    App.handleEvent(args, "setTractorBeamStress", context);
  }
};

export const TractorBeamSubscriptions = {
  tractorBeamUpdate(rootValue, { simulatorId }) {
    let returnRes = rootValue;
    if (simulatorId)
      returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
