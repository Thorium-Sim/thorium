import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('setActivated', ({id, state}) => {
  App.systems.find(s => s.id === id).setActivated(state);
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('setCharge', ({id, state}) => {
  App.systems.find(s => s.id === id).setCharge(state);
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('activate', ({id}) => {
  App.systems.find(s => s.id === id).activate();
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('deactivate', ({id}) => {
  App.systems.find(s => s.id === id).deactivate();
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('setQuadrant', ({id, which, value}) => {
  App.systems.find(s => s.id === id).setQuadrant(which, value);
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('fluxQuadrants', ({id}) => {
  App.systems.find(s => s.id === id).fluxQuadrants();
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
