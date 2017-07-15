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
  destroyProbe(rootValue, args, context){
    App.handleEvent(args, 'destroyProbe', context);
  },
  launchProbe(rootValue, args, context){
    App.handleEvent(args, 'launchProbe', context);
  },
  fireProbe(rootValue, args, context) {
    App.handleEvent(args, 'fireProbe', context);
  },
  updateProbeType(rootValue, args, context){
    App.handleEvent(args, 'updateProbeType', context);
  },
  updateProbeEquipment(rootValue, args, context){
    App.handleEvent(args, 'updateProbeEquipment', context);
  },
  probeQuery(rootValue, args, context){
    App.handleEvent(args, 'probeQuery', context);
  },
  probeQueryResponse(rootValue, args, context){
    App.handleEvent(args, 'probeQueryResponse', context);
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
      const eq = parent.equipment.find(eq => eq.id === e.id);
      return {
        id: e.id,
        name: eq.name,
        count: e.count,
        description: eq.description,
        size: eq.size
      }
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
