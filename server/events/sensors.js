import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

// id always represents the ID of the sensor system

App.on('addedSensorsArray', ({ simulatorId, domain }) => {
  const system = new Classes.Sensors({ simulatorId, domain });
  App.systems.push(system);
  pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
});
App.on('removedSensorsArray', ({ id }) => {
 
});
App.on('sensorScanRequested', ({ id, request }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.scanRequested(request);
  pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
});
App.on('sensorScanResulted', ({ id, result }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.scanResulted(result);
  pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
});
App.on('processedDatad', ({ id, data }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.processedDatad(data);
  pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
});
App.on('sensorScanCanceled', ({ id }) => {
  console.log('Canceled', id);
  const system = App.systems.find((sys) => sys.id === id);
  system.scanCanceled();
  pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
});
App.on('createdSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.createContact(contact);
  pubsub.publish('sensorContactUpdate', system.contacts);
});
App.on('movedSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.moveContact(contact);
  pubsub.publish('sensorContactUpdate', system.contacts);
});
App.on('updatedSensorContactLocation', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.updateContact(contact);
  pubsub.publish('sensorContactUpdate', system.contacts);
});
App.on('removedSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.removeContact(contact);
  pubsub.publish('sensorContactUpdate', system.contacts);
});
App.on('destroyedSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.destroyContact(contact);
  pubsub.publish('sensorContactUpdate', system.contacts);
});
App.on('updatedSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.updateContact(contact);
  pubsub.publish('sensorContactUpdate', system.contacts);
});
App.on('createdSensorArmyContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.createArmyContact(contact);
  pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
});
App.on('removedSensorArmyContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.removeArmyContact(contact);
  pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
});
App.on('updatedSensorArmyContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.updateArmyContact(contact);
  pubsub.publish('sensorsUpdate', App.systems.filter(s => s.type === 'Sensors'));
});
