import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('createLongRange', ({simulatorId, name}) => {
  const system = new Classes.LongRangeComm({simulatorId, name});
  App.systems.push(system);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems);
});
App.on('removeLongRange', ({id}) => {
  App.systems = App.systems.filter(s => s.id !== id);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems);
});
App.on('sendLongRangeMessage', ({id, message, crew, decoded, sender}) => {
  App.systems.find(s => s.id === id).createMessage(message, crew, decoded, sender);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems);
});
App.on('updateLongRangeDecodedMessage', ({ id, messageId, decodedMessage }) => {
  App.systems.find(s => s.id === id).udpateDecodedMessage(id, decodedMessage);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems);
});