import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('createTargetingContact', ({id, target}) => {
  App.systems.find(s => s.id === id).createTarget(target);
  pubsub.publish('targetingUpdate', App.systems.filter(s => s.type === 'Targeting'));
});
App.on('targetTargetingContact', ({id, targetId}) => {
  App.systems.find(s => s.id === id).targetTarget(targetId);
  pubsub.publish('targetingUpdate', App.systems.filter(s => s.type === 'Targeting'));
});
App.on('untargetTargetingContact', ({id, targetId}) => {
  App.systems.find(s => s.id === id).untargetTarget(targetId);
  pubsub.publish('targetingUpdate', App.systems.filter(s => s.type === 'Targeting'));
});
App.on('targetSystem', ({id, targetId, system}) => {
  App.systems.find(s => s.id === id).targetSystem(targetId, system);
  pubsub.publish('targetingUpdate', App.systems.filter(s => s.type === 'Targeting'));
});
App.on('updateTarget', ({id, target}) => {
  App.systems.find(s => s.id === id).updateTarget(target);
  pubsub.publish('targetingUpdate', App.systems.filter(s => s.type === 'Targeting'));
});
App.on('removeTarget', ({id, targetId}) => {
  App.systems.find(s => s.id === id).removeTarget(targetId);
  pubsub.publish('targetingUpdate', App.systems.filter(s => s.type === 'Targeting'));
});