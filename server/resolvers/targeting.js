import App from '../../app.js';
import getAsset from '../helpers/getAsset';

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
  removeTarget(root, args){
    App.handleEvent(args, "removeTarget");
  },
  addTargetClass(root, args){
    App.handleEvent(args, "addTargetClass");
  },
  removeTargetClass(root, args){
    App.handleEvent(args, "removeTargetClass");
  },
  updateTargetClass(root, args){
    App.handleEvent(args, "updateTargetClass");
  },
  setTargetClassCount(root, args){
    App.handleEvent(args, "setTargetClassCount");
  }
};

export const TargetingSubscriptions = {
  targetingUpdate(rootValue, {simulatorId}){
    let returnRes = rootValue;
    if (simulatorId) returnRes = returnRes.filter(s => s.simulatorId === simulatorId);
    return returnRes;
  }
};

export const TargetingTypes = {
  TargetingClass: {
    iconUrl(targetClass) {
      const system = App.systems.find(s => s.id === targetClass.systemId);
      if (targetClass){
        return getAsset(targetClass.icon, system.simulatorId);
      }
    },
    pictureUrl(targetClass) {
      const system = App.systems.find(s => s.id === targetClass.systemId);
      if (targetClass){
        return getAsset(targetClass.picture, system.simulatorId);
      }
    },
  },
  TargetingContact: {
    name(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass){
        return targetClass.name;
      }
    },
    size(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass){
        return targetClass.size;
      }
    },
    icon(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass){
        return targetClass.icon;
      }
    },
    iconUrl(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass){
        return getAsset(targetClass.icon, system.simulatorId);
      }
    },
    picture(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass){
        return targetClass.picture;
      }
    },
    pictureUrl(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass){
        return getAsset(targetClass.picture, system.simulatorId);
      }
    },
    speed(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass){
        return targetClass.speed;
      }
    },
    quadrant(rootValue) {
      const system = App.systems.find(s => s.id === rootValue.systemId);
      const targetClass = system.classes.find(c => c.id === rootValue.class);
      if (targetClass){
        return targetClass.quadrant;
      }
    },
  }
};
