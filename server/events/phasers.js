import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('chargePhaserBeam', ({id, beamId}) => {
  App.systems.find(s => s.id === id).updateBeamState(beamId, 'charging');
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('dischargePhaserBeam', ({id, beamId}) => {
  App.systems.find(s => s.id === id).updateBeamState(beamId, 'discharging');
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('firePhaserBeam', ({id, beamId}) => {
  App.systems.find(s => s.id === id).updateBeamState(beamId, 'firing');
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('phaserArc', ({id, beamId, arc}) => {
  App.systems.find(s => s.id === id).updateArc(arc);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('setPhaserBeamCharge', ({id, beamId, charge}) => {
  App.systems.find(s => s.id === id).updateBeamCharge(beamId, charge);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});