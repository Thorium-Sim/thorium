import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('setStealthActivated', ({id, state}) => {
  App.systems.find(s => s.id === id).setActivated(state);
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('setStealthCharge', ({id, state}) => {
  App.systems.find(s => s.id === id).setCharge(state);
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('activateStealth', ({id}) => {
  App.systems.find(s => s.id === id).activate();
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('deactivateStealth', ({id}) => {
  App.systems.find(s => s.id === id).deactivate();
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('setStealthQuadrant', ({id, which, value}) => {
  App.systems.find(s => s.id === id).setQuadrant(which, value);
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
App.on('fluxStealthQuadrants', ({id}) => {
  App.systems.find(s => s.id === id).fluxQuadrants();
  pubsub.publish('stealthFieldUpdate', App.systems.filter(s => s.type === 'StealthField'));
});
