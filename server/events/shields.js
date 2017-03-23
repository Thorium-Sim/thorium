import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

const sendUpdate = () => {
  const shields = App.systems.filter((sys) => sys.type === 'Shield');
  pubsub.publish('shieldsUpdate', shields);
}
App.on('createShield', ({simulatorId, name, position}) => {
  const system = new Classes.Shield({ simulatorId, name, position});
  App.systems.push(system);
  sendUpdate();
});
App.on('shieldRaised', ({id}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.shieldState(true);
  sendUpdate();
});
App.on('shieldLowered', ({id}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.shieldState(false);
  sendUpdate();
});
App.on('shieldIntegritySet', ({id, integrity}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.setIntegrity(integrity);
  sendUpdate();
});
App.on('shieldFrequencySet', ({id, frequency}) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.setFrequency(frequency);
  sendUpdate();
});
