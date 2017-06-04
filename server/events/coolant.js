import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';

App.on('setCoolantTank', ({id, coolant}) => {
  App.systems.find(s => s.id === id).setCoolant(coolant);
  pubsub.publish('coolantUpdate', App.systems.filter(s => s.type === 'Coolant'));
});
App.on('transferCoolant', ({coolantId, systemId, subsystemId, amount}) => {
  const coolant = App.systems.find(s => s.id === coolantId);
  coolant.setCoolant(coolant.coolantRate * amount * -1);
  // Then update the system
  const system = App.systems.find(s => s.id === systemId);
  if (system.type === 'Phaser') {
    system.updateBeamCoolant(subsystemId, amount);
  } else {
    system.setCoolant(amount);
  }
  pubsub.publish('coolantUpdate', App.systems.filter(s => s.type === 'Coolant'));
});