import App from '../../app';

export const InternalCommQueries = {
  internalComm(root, {simulatorId}){
    let comm = App.systems.filter(s => s.type === 'InternalComm');
    if (simulatorId) comm = comm.filter(s => s.simulatorId === simulatorId);
    return comm;
  }
};

export const InternalCommMutations = {
  createInternalComm(root, args){
    App.handleEvent(args, 'createInternalComm');
  },
  removeInternalComm(root, args){
    App.handleEvent(args, 'removeInternalComm');
  },
  internalCommConnectOutgoing(root, args){
    App.handleEvent(args, 'internalCommConnectOutgoing')
  },
  internalCommConnectIncoming(root, args){
    App.handleEvent(args, 'internalCommConnectIncoming')
  },
  internalCommCancelIncoming(root, args){
    App.handleEvent(args, 'internalCommCancelIncoming')
  },
  internalCommCancelOutgoing(root, args){
    App.handleEvent(args, 'internalCommCancelOutgoing')
  },
  internalCommCallIncoming(root, args){
    App.handleEvent(args, 'internalCommCallIncoming')
  },
  internalCommCallOutgoing(root, args){
    App.handleEvent(args, 'internalCommCallOutgoing')
  },
};

export const InternalCommSubscriptions = {
  internalCommUpdate(rootValue, {simulatorId}){
    if (simulatorId) rootValue = rootValue.filter(s => s.simulatorId === simulatorId);
    return rootValue;
  }
};


