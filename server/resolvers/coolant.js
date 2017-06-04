import App from '../../app';

export const CoolantQueries = {
  coolant(root, {simulatorId}) {
    let returnVal = App.systems.filter(s => s.type === "Coolant");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const CoolantMutations = {
  setCoolantTank(root, args) {
    App.handleEvent(args, "setCoolantTank");
  },
  transferCoolant(root, args) {
    App.handleEvent(args, "transferCoolant");
  }
};

export const CoolantSubscriptions = {
  coolantUpdate(rootValue, {simulatorId}) {
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
