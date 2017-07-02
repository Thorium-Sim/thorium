import App from '../../app.js';
import uuid from 'uuid';
import { pubsub } from '../helpers/subscriptionManager';
import * as Classes from '../classes';

const sendUpdate = (sys) => {
  if (sys.type === 'Engine') pubsub.publish('speedChange', sys);
  if (sys.type === 'Transporters') pubsub.publish('transporterUpdate', sys);
  if (sys.type === 'Shield') pubsub.publish('shieldsUpdate', App.systems.filter((sys) => sys.type === 'Shield'));
  if (sys.type === 'Sensors') pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
  if (sys.type === 'LongRangeComm') pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LRCommunications'));
  if (sys.type === 'InternalComm') pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'));
  if (sys.type === 'Navigation')   pubsub.publish('navigationUpdate', App.systems.filter(s => s.type === 'Navigation'));
  if (sys.type === 'ShortRangeComm')   pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
  if (sys.type === 'TractorBeam')   pubsub.publish('tractorBeamUpdate', App.systems.filter(s => s.type === 'TractorBeam'));
  pubsub.publish('systemsUpdate', App.systems);
}
App.on('addSystemToSimulator', ({simulatorId, className, params}) => {
  const init = JSON.parse(params);
  init.simulatorId = simulatorId;
  const ClassObj = Classes[className];
  const obj = new ClassObj(init);
  App.systems.push(obj);
  pubsub.publish('systemsUpdate', App.systems);
});
App.on('removeSystemFromSimulator', ({systemId}) => {
  App.systems = App.systems.filter(s => s.id !== systemId);
  pubsub.publish('systemsUpdate', App.systems);
});
App.on('damageSystem', ({systemId, report}) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.break(report);
  sendUpdate(sys);
});
App.on('damageReport', ({systemId, report}) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.damageReport(report);
  sendUpdate(sys);
});
App.on('repairSystem', ({systemId}) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.repair();
  sendUpdate(sys);
});
App.on('changePower', ({systemId, power}) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.setPower(power);
  sendUpdate(sys);
});
App.on('requestDamageReport', ({systemId}) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.requestReport();
  sendUpdate(sys);
});
App.on('systemReactivationCode', ({systemId, station, code}) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.reactivationCode(code, station);
  sendUpdate(sys);
})
App.on('systemReactivationCodeResponse', ({systemId, response}) => {
  const sys = App.systems.find(s => s.id === systemId);
  pubsub.publish('notify', {id: uuid.v4(), 
    simulatorId: sys.simulatorId,
    station: sys.damage.reactivationRequester,
    title: 'Reactivation Code',
    body: `Reactivation Code for ${sys.name} was ${response ? 'Accepted' : 'Denied'}`,
    color: response ? 'success' : 'danger',
  });
  sys.reactivationCodeResponse(response);
  sendUpdate(sys);
})
App.on('setCoolant', ({systemId, coolant}) => {
  const sys = App.systems.find(s => s.id === systemId);
  if (sys.setCoolant) sys.setCoolant(coolant);
  sendUpdate(sys);
});
