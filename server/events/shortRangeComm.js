import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('commAddSignal', ({id, commSignalInput}) => {
  App.systems.find(s => s.id === id).addCommSignal(commSignalInput);
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
});
App.on('commUpdateSignal', ({id, commSignalInput}) => {
  App.systems.find(s => s.id === id).updateCommSignal(commSignalInput);
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
});
App.on('commRemoveSignal', ({id, signalId}) => {
  App.systems.find(s => s.id === id).removeCommSignal(signalId);
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
});
App.on('commAddArrow', ({id, commArrowInput}) => {
  App.systems.find(s => s.id === id).addArrow(commArrowInput);
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
});
App.on('commRemoveArrow', ({id, arrowId}) => {
  App.systems.find(s => s.id === id).removeArrow(arrowId);
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
});
App.on('commConnectArrow', ({id, arrowId}) => {
  App.systems.find(s => s.id === id).connectArrow(arrowId);
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
});
App.on('commDisconnectArrow', ({id, arrowId}) => {
  App.systems.find(s => s.id === id).disconnectArrow(arrowId);
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
});
App.on('commUpdate', ({id, commUpdateInput}) => {
  App.systems.find(s => s.id === id).updateComm(commUpdateInput);
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
});
App.on('commHail', ({id}) => {
  App.systems.find(s => s.id === id).hail();
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
});
App.on('cancelHail', ({id}) => {
  App.systems.find(s => s.id === id).cancelHail();
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
})
App.on('connectHail', ({id}) => {
  App.systems.find(s => s.id === id).connectHail();
  pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
})