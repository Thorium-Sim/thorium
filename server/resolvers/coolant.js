import App from '../../app';

export const CoolantQueries = {
  coolant(root, {simulatorId, systemId}) {
    let returnVal = App.systems.filter(s => s.type === "Coolant");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    if (systemId) returnVal = returnVal.filter(s => s.id === systemId);
    return returnVal;
  },
  systemCoolant(root, {simulatorId}) {
    return App.systems.filter(s => s.simulatorId === simulatorId && (s.coolant || s.coolant === 0) && s.type !== 'Coolant')
    .map(s => {
      return {
        systemId: s.id,
        simulatorId: s.simulatorId,
        name: s.name,
        coolant: s.coolant,
      }
    });
  }
};

export const CoolantMutations = {
  setCoolantTank(root, args) {
    App.handleEvent(args, "setCoolantTank");
  },
  transferCoolant(root, args) {
    console.log(args);
    if (args.which === 'stop'){
      App.handleEvent(args, "cancelCoolantTransfer");
    } else {
      App.handleEvent(args, "transferCoolant");
    }
  }
};


export const CoolantSubscriptions = {
  coolantUpdate(rootValue, {simulatorId}) {
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  },
  coolantSystemUpdate(rootValue, {simulatorId, systemId}) {
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    if (systemId) returnRes = returnRes.filter(s => s.id === systemId);
    return returnRes;
  }
};
