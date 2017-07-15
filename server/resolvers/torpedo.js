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
    App.handleEvent(args, 'torpedoAddWarhead', context);
  },
  torpedoRemoveWarhead(root, args, context){
    App.handleEvent(args, 'torpedoRemoveWarhead', context);
  },
  torpedoLoadWarhead(root, args, context){
    App.handleEvent(args, 'torpedoLoadWarhead', context);
  },
  torpedoUnload(root, args, context){
    App.handleEvent(args, 'torpedoUnload', context);
  },
  torpedoFire(root, args, context){
    App.handleEvent(args, 'torpedoFire', context);
  },
  torpedoSetWarheadCount(root, args, context){
    App.handleEvent(args, 'torpedoSetWarheadCount', context);
  }
};

export const TorpedoSubscriptions = {
  torpedosUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
