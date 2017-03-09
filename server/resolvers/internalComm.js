import App from '../../app';

export const InternalCommQueries = {
  internalComm(root, {simulatorId}){
    let comm = App.systems.filter(s => s.type === 'InternalCommunications');
    if (simulatorId) comm = comm.filter(s => s.simulatorId === simulatorId);
    return comm;
  }
};

export const InternalCommMutations = {
  createInternalComm(root, args){
    App.handleEvent(args, 'createInternalComm', 'createdInternalComm');
  },
  removeInternalComm(root, args){
    App.handleEvent(args, 'removeInternalComm', 'removedInternalComm');
  },
  internalCommConnectOutgoing(root, args){
    App.handleEvent(args, 'internalCommConnectOutgoing', 'internalCommConnectedOutgoing')
  },
  internalCommConnectIncoming(root, args){
    App.handleEvent(args, 'internalCommConnectIncoming', 'internalCommConnectedIncoming')
  },
  internalCommCancelIncoming(root, args){
    App.handleEvent(args, 'internalCommCancelIncoming', 'internalCommCanceledIncoming')
  },
  internalCommCancelOutgoing(root, args){
    App.handleEvent(args, 'internalCommCancelOutgoing', 'internalCommCanceledOutgoing')
  },
  internalCommCallIncoming(root, args){
    App.handleEvent(args, 'internalCommCallIncoming', 'internalCommCalledIncoming')
  },
  internalCommCallOutgoing(root, args){
    App.handleEvent(args, 'internalCommCallOutgoing', 'internalCommCalledOutgoing')
  },
};

export const InternalCommSubscriptions = {
  internalCommUpdate(rootValue, {simulatorId}){
    if (simulatorId) rootValue = rootValue.filter(s => s.simulatorId === simulatorId);
    return rootValue;
  }
};


