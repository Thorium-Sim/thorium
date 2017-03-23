import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../classes';

App.on('createTransporter', (params) => {
  const transporter = new Classes.Transporters(params);
  App.systems.push(transporter);
});
App.on('removedTransporter', (params) => {

});
App.on('setTransportDestination', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.setDestination(params.destination);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('setTransportTarget', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.setRequestedTarget(params.target);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('beginTransportScan', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.beginScan();
  pubsub.publish('transporterUpdate', transporter);
});
App.on('canceleTransportScan', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.cancelScan();
  transporter.clearTargets();
  pubsub.publish('transporterUpdate', transporter);
});
App.on('clearTransportTargets', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.clearTargets();
  pubsub.publish('transporterUpdate', transporter);
});
App.on('setTransportCharge', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.setCharge(params.charge);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('completeTransport', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.completeTransport(params.target);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('setTransporterTargets', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  if (transporter.targets.length < params.targets) {
    transporter.addTargets(params.targets - transporter.targets.length);
  }
  if (transporter.targets.length > params.targets) {
    transporter.removeTargets(transporter.targets.length - params.targets);
  }
  pubsub.publish('transporterUpdate', transporter);
});
