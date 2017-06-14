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
  createTargetingContact(root, args, context){
    App.handleEvent(args, "createTargetingContact", context.clientId);
  },
  targetTargetingContact(root, args, context){
    App.handleEvent(args, "targetTargetingContact", context.clientId);
  },
  untargetTargetingContact(root, args, context){
    App.handleEvent(args, "untargetTargetingContact", context.clientId);
  },
  targetSystem(root, args, context){
    App.handleEvent(args, "targetSystem", context.clientId);
  },
  removeTarget(root, args, context){
    App.handleEvent(args, "removeTarget", context.clientId);
  },
  addTargetClass(root, args, context){
    App.handleEvent(args, "addTargetClass", context.clientId);
  },
  removeTargetClass(root, args, context){
    App.handleEvent(args, "removeTargetClass", context.clientId);
  },
  updateTargetClass(root, args, context){
    App.handleEvent(args, "updateTargetClass", context.clientId);
  },
  setTargetClassCount(root, args, context){
    App.handleEvent(args, "setTargetClassCount", context.clientId);
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
