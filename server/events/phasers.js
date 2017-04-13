import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('chargePhaser', ({id}) => {
  App.systems.find(s => s.id === id).updateState('charging');
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('dischargePhaser', ({id}) => {
  App.systems.find(s => s.id === id).updateState('discharging');
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('firePhaser', ({id}) => {
  App.systems.find(s => s.id === id).updateState('firing');
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('phaserArc', ({id, arc}) => {
  App.systems.find(s => s.id === id).updateArc(arc);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('setPhaserCharge', ({id, charge}) => {
  App.systems.find(s => s.id === id).updateCharge(charge);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});