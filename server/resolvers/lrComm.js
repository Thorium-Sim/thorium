import App from '../../app';

export const LRCommQueries = {
  longRangeCommunications(root, {simulatorId, crew}){
    let systems = App.systems.filter(s => s.type === 'LongRangeCommunications');
    if (simulatorId) systems = systems.filter(s => s.simulatorId === simulatorId);
    if (typeof crew !== "undefined") {
      systems = systems.map(s => {
        s.messages = s.messages.filter(m => m.crew === crew);
        return s;
      });
    }
    return systems;
  }
};

export const LRCommMutations = {
  createLongRange(root, args){
    App.handleEvent(args, 'createLongRange', 'createdLongRange');
  },
  removeLongRange(root, args){
    App.handleEvent(args, 'removeLongRange', 'removedLongRange');
  },
  sendLongRangeMessage(root, args){
    App.handleEvent(args, 'sendLongRangeMessage', 'sentLongRangeMessage');
  },
  updateLongRangeDecodedMessage(root, args){
    App.handleEvent(args, 'updateLongRangeDecodedMessage', 'updatedLongRangeDecodedMessage');
  }
};

export const LRCommSubscriptions = {
  longRangeCommunicationsUpdate(rootValue, {simulatorId}){
    if (simulatorId) return rootValue.filter(s => s.simulatorId === simulatorId);
    return rootValue;
  }
};
