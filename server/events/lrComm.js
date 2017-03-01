import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('createdLongRange', ({ simulatorId, name }) => {
  const system = new Classes.LongRangeComm({ simulatorId, name });
  App.systems.push(system);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems);
});
App.on('removedLongRange', ({ id }) => {
  App.systems = App.systems.filter(s => s.id !== id);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems);
});
App.on('sentLongRangeMessage', ({ id, message, crew, decoded, sender }) => {
  App.systems.find(s => s.id === id).createMessage(message, crew, decoded, sender);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems);
});
App.on('updatedLongRangeDecodedMessage', ({ id, messageId, decodedMessage }) => {
  App.systems.find(s => s.id === id).udpateDecodedMessage(id, decodedMessage);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems);
});