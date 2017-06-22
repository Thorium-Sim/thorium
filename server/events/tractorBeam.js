import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('setTractorBeamState', ({id, state}) => {
  App.systems.find(s => s.id === id).setState(state);
  pubsub.publish('tractorBeamUpdate', App.systems.filter(s => s.type === 'TractorBeam'));
});
App.on('setTractorBeamTarget', ({id, target}) => {
  App.systems.find(s => s.id === id).setTarget(target);
  pubsub.publish('tractorBeamUpdate', App.systems.filter(s => s.type === 'TractorBeam'));
});
App.on('setTractorBeamStrength', ({id, strength}) => {
  App.systems.find(s => s.id === id).setStrength(strength);
  pubsub.publish('tractorBeamUpdate', App.systems.filter(s => s.type === 'TractorBeam'));
});
App.on('setTractorBeamStress', ({id, stress}) => {
  App.systems.find(s => s.id === id).setStress(stress);
  pubsub.publish('tractorBeamUpdate', App.systems.filter(s => s.type === 'TractorBeam'));
});
