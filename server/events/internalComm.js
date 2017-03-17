import App from '../../app.js';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('createdInternalComm', ({ simulatorId}) => {
  const system = new Classes.InternalComm({ simulatorId });
  App.systems.push(system);
  pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'))
});
App.on('removedInternalComm', ({ id}) => {
  App.systems = App.systems.filter(s => s.id !== id);
  pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'))
});
App.on('internalCommConnectedOutgoing', ({ id }) => {
  App.systems.find(s => s.id === id).connectOutgoing();
  pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'))
});
App.on('internalCommConnectedIncoming', ({ id }) => {
  App.systems.find(s => s.id === id).connectIncoming();
  pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'))
});
App.on('internalCommCanceledIncoming', ({ id }) => {
  App.systems.find(s => s.id === id).cancelIncomingCall();
  pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'))
});
App.on('internalCommCanceledOutgoing', ({ id }) => {
  App.systems.find(s => s.id === id).cancelOutgoingCall();
  pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'))
});
App.on('internalCommCalledIncoming', ({ id, incoming }) => {
  App.systems.find(s => s.id === id).callIncoming(incoming);
  pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'))
});
App.on('internalCommCalledOutgoing', ({ id, outgoing}) => {
  App.systems.find(s => s.id === id).callOutgoing(outgoing);
  pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'))
});