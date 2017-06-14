import App from '../../app';

export const ShortRangeCommQueries = {
  shortRangeComm(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'ShortRangeComm');
    if (simulatorId) returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    return returnVal;
  }
};

export const ShortRangeCommMutations = {
  commAddSignal(root, args, context) {
    App.handleEvent(args, 'commAddSignal', context.clientId);
  },
  commUpdateSignal(root, args, context) {
    App.handleEvent(args, 'commUpdateSignal', context.clientId);
  },
  commRemoveSignal(root, args, context) {
    App.handleEvent(args, 'commRemoveSignal', context.clientId);
  },
  commAddArrow(root, args, context) {
    App.handleEvent(args, 'commAddArrow', context.clientId);
  },
  commRemoveArrow(root, args, context) {
    App.handleEvent(args, 'commRemoveArrow', context.clientId);
  },
  commConnectArrow(root, args, context) {
    App.handleEvent(args, 'commConnectArrow', context.clientId);
  },
  commDisconnectArrow(root, args, context) {
    App.handleEvent(args, 'commDisconnectArrow', context.clientId);
  },
  commUpdate(root, args, context) {
    App.handleEvent(args, 'commUpdate', context.clientId);
  },
  commHail(root, args, context) {
    App.handleEvent(args, 'commHail', context.clientId);
  },
  cancelHail(root, args, context) {
    App.handleEvent(args, 'cancelHail', context.clientId);
  },
  connectHail(root, args, context) {
    App.handleEvent(args, 'connectHail', context.clientId);
  },
};

export const ShortRangeCommSubscriptions = {
  shortRangeCommUpdate(rootValue, {simulatorId, crew, sent}){
    if (simulatorId) rootValue = rootValue.filter(s => s.simulatorId === simulatorId);
    return rootValue;
  }
};
