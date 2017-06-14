import App from '../../app';

export const InternalCommQueries = {
  internalComm(root, {simulatorId}){
    let comm = App.systems.filter(s => s.type === 'InternalComm');
    if (simulatorId) comm = comm.filter(s => s.simulatorId === simulatorId);
    return comm;
  }
};

export const InternalCommMutations = {
  createInternalComm(root, args, context){
    App.handleEvent(args, 'createInternalComm', context.clientId);
  },
  removeInternalComm(root, args, context){
    App.handleEvent(args, 'removeInternalComm', context.clientId);
  },
  internalCommConnectOutgoing(root, args, context){
    App.handleEvent(args, 'internalCommConnectOutgoing', context.clientId)
  },
  internalCommConnectIncoming(root, args, context){
    App.handleEvent(args, 'internalCommConnectIncoming', context.clientId)
  },
  internalCommCancelIncoming(root, args, context){
    App.handleEvent(args, 'internalCommCancelIncoming', context.clientId)
  },
  internalCommCancelOutgoing(root, args, context){
    App.handleEvent(args, 'internalCommCancelOutgoing', context.clientId)
  },
  internalCommCallIncoming(root, args, context){
    App.handleEvent(args, 'internalCommCallIncoming', context.clientId)
  },
  internalCommCallOutgoing(root, args, context){
    App.handleEvent(args, 'internalCommCallOutgoing', context.clientId)
  },
};

export const InternalCommSubscriptions = {
  internalCommUpdate(rootValue, {simulatorId}){
    if (simulatorId) rootValue = rootValue.filter(s => s.simulatorId === simulatorId);
    return rootValue;
  }
};


