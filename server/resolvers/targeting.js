import App from '../../app.js';

export const TargetingQueries = {
  targeting(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'Targeting');
    if (simulatorId){
      returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    }
    return returnVal;
  }
};

export const TargetingMutations = {
  createTargetingContact(root, args){
    App.handleEvent(args, "createTargetingContact");
  },
  targetTargetingContact(root, args){
    App.handleEvent(args, "targetTargetingContact");
  },
  untargetTargetingContact(root, args){
    App.handleEvent(args, "untargetTargetingContact");
  },
  targetSystem(root, args){
    App.handleEvent(args, "targetSystem");
  },
  updateTarget(root, args){
    App.handleEvent(args, "updateTarget");
  },
  removeTarget(root, args){
    App.handleEvent(args, "removeTarget");
  },
};

export const TargetingSubscriptions = {
  targetingUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};
