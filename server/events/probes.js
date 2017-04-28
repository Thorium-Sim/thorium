import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('destroyProbe', ({id, probeId}) => {
  const sys = App.systems.find(s => s.id === sys);
  sys.destroyProbe(probeId);
  pubsub.publish('probesUpdate', App.systems.filter(s => s.type === 'Probes'));
});
App.on('launchProbe', ({id, probe}) => {
  const sys = App.systems.find(s => s.id === sys);
  sys.launchProbe(probe);
  pubsub.publish('probesUpdate', App.systems.filter(s => s.type === 'Probes'));
});
App.on('fireProbe', ({id, probeId}) => {
  const sys = App.systems.find(s => s.id === sys);
  sys.fireProbe(probeId);
  pubsub.publish('probesUpdate', App.systems.filter(s => s.type === 'Probes'));
});
App.on('updateProbeType', ({id, probeType}) => {
  const sys = App.systems.find(s => s.id === sys);
  sys.updateProbeType(probeType);
  pubsub.publish('probesUpdate', App.systems.filter(s => s.type === 'Probes'));
});
App.on('updateProbeEquipment', ({id, probeEquipment}) => {
  const sys = App.systems.find(s => s.id === sys);
  sys.updateProbeEquipment(probeEquipment);
  pubsub.publish('probesUpdate', App.systems.filter(s => s.type === 'Probes'));
});
App.on('probeQuery', ({id, probeId, query}) => {
  const sys = App.systems.find(s => s.id === sys);
  sys.probeQuery(probeId, query);
  pubsub.publish('probesUpdate', App.systems.filter(s => s.type === 'Probes'));
});
App.on('probeQueryResponse', ({id, probeId, response}) => {
  const sys = App.systems.find(s => s.id === sys);
  sys.probeQueryResponse(probeId, response);
  pubsub.publish('probesUpdate', App.systems.filter(s => s.type === 'Probes'));
});
