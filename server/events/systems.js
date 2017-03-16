import App from '../../app.js';
import { pubsub } from '../helpers/subscriptionManager';
import * as Classes from '../classes';

App.on('addedSystemToSimulator', ({simulatorId, className, params}) => {
  const init = JSON.parse(params);
  init.simulatorId = simulatorId;
  const ClassObj = Classes[className];
  const obj = new ClassObj(init);
  App.systems.insert(obj);
  pubsub.publish('systemsUpdate', App.systems);
});
App.on('removedSystemFromSimulator', ({systemId}) => {
  App.systems = App.systems.filter(s => s.id !== systemId);
  pubsub.publish('systemsUpdate', App.systems);
});
App.on('damagedSystem', ({systemId, report}) => {
  const sys = App.systems.find(s => s.id === systemId);
  console.log(sys, systemId);
  sys.break(report);
  pubsub.publish('systemsUpdate', App.systems);
});
App.on('repairedSystem', ({systemId}) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.repair();
  pubsub.publish('systemsUpdate', App.systems);
});
App.on('changedPower', ({systemId, power}) => {
  const sys = App.systems.find(s => s.id === systemId);
  sys.setPower(power);
  pubsub.publish('systemsUpdate', App.systems);
});
