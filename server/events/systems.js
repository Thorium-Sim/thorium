import App from '../../app.js';
import { pubsub } from '../helpers/subscriptionManager';
import * as Classes from '../classes';

const sendUpdate = (sys) => {
  if (sys.type === 'Engine') pubsub.publish('speedChange', sys);
  if (sys.type === 'Transporters') pubsub.publish('transporterUpdate', sys);
  if (sys.type === 'Shield') pubsub.publish('shieldsUpdate', App.systems.filter((sys) => sys.type === 'Shield'));
  if (sys.type === 'Sensors') pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
  if (sys.type === 'LongRangeComm') pubsub.publish('longRangeCommunicationsUpdate', App.systems.filter(s => s.type === 'LRCommunications'));
  if (sys.type === 'InternalComm') pubsub.publish('internalCommUpdate', App.systems.filter(s => s.type === 'InternalComm'))
  if (sys.type === 'Naivgation')   pubsub.publish('navigationUpdate', App.systems.filter(s => s.type === 'Navigation'));
  if (sys.type === 'ShortRangeComm')   pubsub.publish('shortRangeCommUpdate', App.systems.filter(s => s.type === 'ShortRangeComm'));
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
