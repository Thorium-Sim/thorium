import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('chargePhaserBeam', ({id, beamId}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateBeamState(beamId, 'charging');
  sys.updateBeamCharge(beamId, 1);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('dischargePhaserBeam', ({id, beamId}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.updateBeamState(beamId, 'discharging');
  sys.updateBeamCharge(beamId, 0);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('firePhaserBeam', ({id, beamId}) => {
  const sys = App.systems.find(s => s.id === id);
  sys.fireBeam(beamId);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
  setTimeout(() => {
    sys.updateBeamState(beamId, 'idle');
    pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
  },4000);
});
App.on('phaserArc', ({id, beamId, arc}) => {
  App.systems.find(s => s.id === id).updateArc(arc);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('setPhaserBeamCharge', ({id, beamId, charge}) => {
  App.systems.find(s => s.id === id).updateBeamCharge(beamId, charge);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});
App.on('setPhaserBeamHeat', ({id, beamId, heat}) => {
  App.systems.find(s => s.id === id).updateBeamHeat(beamId, heat);
  pubsub.publish('phasersUpdate', App.systems.filter(s => s.type === 'Phasers'));
});