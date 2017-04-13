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
  torpedoAddWarhead(root, args){
    App.handleEvent(args, 'torpedoAddWarhead');
  },
  torpedoRemoveWarhead(root, args){
    App.handleEvent(args, 'torpedoRemoveWarhead');
  },
  torpedoLoadWarhead(root, args){
    App.handleEvent(args, 'torpedoLoadWarhead');
  },
  torpedoUnload(root, args){
    App.handleEvent(args, 'torpedoUnload');
  },
  torpedoFire(root, args){
    App.handleEvent(args, 'torpedoFire');
  },
};

export const TorpedoSubscriptions = {
  torpedosUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
