import App from '../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../data/classes';

// id always represents the ID of the sensor system

App.on('addedSensorsArray', ({ simulatorId }) => {
  const system = new Classes.Sensors({ simulatorId });
  App.systems.push(system);
  pubsub.publish('sensorsUpdate', system);
});
App.on('removedSensorsArray', ({ id }) => {

});
App.on('sensorScanRequested', ({ id, request }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.scanRequested(request);
  pubsub.publish('sensorsUpdate', system);
});
App.on('sensorScanResulted', ({ id, result }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.scanResulted(result);
  pubsub.publish('sensorsUpdate', system);
});
App.on('processedDatad', ({ id, data }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.processedDatad(data);
  pubsub.publish('sensorsUpdate', system);
});
App.on('createdSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.createContact(contact);
  pubsub.publish('sensorsUpdate', system);
});
App.on('movedSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.moveContact(contact);
});
App.on('removedSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.removeContact(contact);
});
App.on('destroyedSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.destroyContact(contact);
});
App.on('updatedSensorContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.updateContact(contact);
});
App.on('createdSensorArmyContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.createArmyContact(contact);
  pubsub.publish('sensorsUpdate', system);
});
App.on('removedSensorArmyContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.removeArmyContact(contact);
  pubsub.publish('sensorsUpdate', system);
});
App.on('updatedSensorArmyContact', ({ id, contact }) => {
  const system = App.systems.find((sys) => sys.id === id);
  system.updateArmyContact(contact);
  pubsub.publish('sensorsUpdate', system);
});
