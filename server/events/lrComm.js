import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('createdLongRange', ({ simulatorId, name }) => {
  const system = new Classes.LongRangeComm({ simulatorId, name });
  App.systems.push(system);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LRCommunications'));
});
App.on('removedLongRange', ({ id }) => {
  App.systems = App.systems.filter(s => s.id !== id);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LRCommunications'));
});
//Creating a new long range message
App.on('sentLongRangeMessage', ({ id, simulatorId, message, crew, decoded, sender }) => {
  if (id){
    App.systems.find(s => s.id === id).createMessage(message, crew, decoded, sender);
  }
  if (simulatorId) {
    App.systems.find(s => s.simulatorId === simulatorId && s.type === 'LRCommunications')
    .createMessage(message, crew, decoded, sender);
  }
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LRCommunications'));
});
//Queued messages are sent
App.on('longRangeMessageSent', ({ id, message }) => {
  App.systems.find(s => s.id === id).sendMessage(message);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LRCommunications'));
});
App.on('deletedLongRangeMessage', ({ id, message }) => {
  App.systems.find(s => s.id === id).deleteMessage(message);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LRCommunications'));
})
App.on('updatedLongRangeDecodedMessage', ({ id, messageId, decodedMessage, a, f }) => {
  App.systems.find(s => s.id === id).updateDecodedMessage(id, messageId, decodedMessage, a, f);
  pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LRCommunications'));
});