import App from '../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../data/classes';

App.on('addedSensorsArray', ({ simulatorId }) => {
  App.systems.push(new Classes.Sensors(simulatorId));
  pubsub.publish('sensorsUpdate', App.systems[App.systems.length - 1]);
});
App.on('removedSensorsArray', ({ id }) => {

});
App.on('sensorScanRequested', ({ id, request }) => {

});
App.on('sensorScanResulted', ({ id, result }) => {

});
App.on('processedDatad', ({ id, data }) => {

});
App.on('createdSensorContact', ({ id, contact }) => {

});
App.on('movedSensorContact', ({ id, contact }) => {

});
App.on('removedSensorContact', ({ id, contact }) => {

});
App.on('destroyedSensorContact', ({ id, contact }) => {

});
App.on('updatedSensorContactInfrared', ({ id, contact }) => {

});
App.on('updatedSensorContactIcon', ({ id, contact }) => {

});
App.on('updatedSensorContactName', ({ id, contact }) => {

});
App.on('updatedSensorContactPicture', ({ id, contact }) => {

});