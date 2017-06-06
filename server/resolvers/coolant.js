import App from '../../app';

export const CoolantQueries = {
  coolant(root, {simulatorId}) {
    let returnVal = App.systems.filter(s => s.type === "Coolant");
    if (simulatorId) {
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  },
  systemCoolant(root, {simulatorId}) {
    const returnSystems = [];
    App.systems.filter(s => s.simulatorId === simulatorId)
    .forEach(s => {
      if (s.coolant && s.type !== 'Coolant') {
        returnSystems.push({
          systemId: s.id,
          simulatorId: s.simulatorId,
          subId: null,
          subKey: null,
          name: s.name,
          coolant: s.coolant,
        })
      }
      // Check for sub systems
      Object.keys(s).forEach(key => {
        if (s[key] instanceof Array) {
          s[key].forEach(subsys => {
            if (subsys.coolant) {
              returnSystems.push({
                systemId: s.id,
                simulatorId: s.simulatorId,
                subId: subsys.id,
                subKey: key,
                name: subsys.name || s.name,
                coolant: subsys.coolant
              })
            }
          });          
        }
      })
    });
    return returnSystems;
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
