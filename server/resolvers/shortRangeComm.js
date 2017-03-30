import App from '../../app';

export const ShortRangeCommQueries = {
  shortRangeComm(root, {simulatorId}){
    let returnVal = App.systems.filter(s => s.type === 'ShortRangeComm');
    if (simulatorId) returnVal = returnVal.filter(s => s.simulatorId === simulatorId);
    return returnVal;
  }
};

export const ShortRangeCommMutations = {
  commAddSignal(root, args) {
    App.handleEvent(args, 'commAddSignal');
  },
  commUpdateSignal(root, args) {
    App.handleEvent(args, 'commUpdateSignal');
  },
  commRemoveSignal(root, args) {
    App.handleEvent(args, 'commRemoveSignal');
  },
  commAddArrow(root, args) {
    App.handleEvent(args, 'commAddArrow');
  },
  commRemoveArrow(root, args) {
    App.handleEvent(args, 'commRemoveArrow');
  },
  commConnectArrow(root, args) {
    App.handleEvent(args, 'commConnectArrow');
  },
  commDisconnectArrow(root, args) {
    App.handleEvent(args, 'commDisconnectArrow');
  },
  commUpdate(root, args) {
    App.handleEvent(args, 'commUpdate');
  },
  commHail(root, args) {
    App.handleEvent(args, 'commHail');
  },
  cancelHail(root, args) {
    App.handleEvent(args, 'cancelHail');
  },
  connectHail(root, args) {
    App.handleEvent(args, 'connectHail');
  },
};

export const ShortRangeCommSubscriptions = {
  shortRangeCommUpdate(rootValue, {simulatorId, crew, sent}){
    if (simulatorId) rootValue = rootValue.filter(s => s.simulatorId === simulatorId);
    return rootValue;
  }
};
