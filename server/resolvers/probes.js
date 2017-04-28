import App from '../../app';

export const ProbesQueries = {
  probes(rootValue, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'Probes');
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const ProbesMutations = {
  destroyProbe(rootValue, args){
    App.handleEvent(args, 'destroyProbe');
  },
  launchProbe(rootValue, args){
    App.handleEvent(args, 'launchProbe');
  },
  fireProbe(rootValue, args) {
    App.handleEvent(args, 'fireProbe');
  },
  updateProbeType(rootValue, args){
    App.handleEvent(args, 'updateProbeType');
  },
  updateProbeEquipment(rootValue, args){
    App.handleEvent(args, 'updateProbeEquipment');
  },
  probeQuery(rootValue, args){
    App.handleEvent(args, 'probeQuery');
  },
  probeQueryResponse(rootValue, args){
    App.handleEvent(args, 'probeQueryResponse');
  },
};

export const ProbesSubscriptions = {
  probesUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};

export const ProbesTypes = {
  Probe: {
    equipment(probe){
      const parent = App.systems.find(s => s.id === probe.parentId);
      return probe.equipment.map(e => {
        return parent.equipment.find(eq => eq.id === e);
      })
    }
  },
  ProbeType: {
    availableEquipment(probeType) {
      const parent = App.systems.find(s => s.id === probeType.parentId);
      return parent.equipment.filter(e => {
        if (e.availableProbes.length === 0) return true;
        if (e.availableProbes.indexOf(probeType.id) > 0) return true;
        return false;
      })
    }
  }
};
