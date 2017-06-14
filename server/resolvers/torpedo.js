import App from '../../app.js';

export const TorpedoQueries = {
  torpedos(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'Torpedo');
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const TorpedoMutations = {
  torpedoAddWarhead(root, args, context){
    App.handleEvent(args, 'torpedoAddWarhead', context.clientId);
  },
  torpedoRemoveWarhead(root, args, context){
    App.handleEvent(args, 'torpedoRemoveWarhead', context.clientId);
  },
  torpedoLoadWarhead(root, args, context){
    App.handleEvent(args, 'torpedoLoadWarhead', context.clientId);
  },
  torpedoUnload(root, args, context){
    App.handleEvent(args, 'torpedoUnload', context.clientId);
  },
  torpedoFire(root, args, context){
    App.handleEvent(args, 'torpedoFire', context.clientId);
  },
  torpedoSetWarheadCount(root, args, context){
    App.handleEvent(args, 'torpedoSetWarheadCount', context.clientId);
  }
};

export const TorpedoSubscriptions = {
  torpedosUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
