import App from '../app';
import { pubsub } from '../helpers/subscriptionManager.js';
import * as Classes from '../data/classes';

App.on('createdTransporter', (params) => {
  const transporter = new Classes.Transporters(params);
  App.systems.push(transporter);
  console.log(transporter);
});
App.on('removedTransporter', (params) => {

});
App.on('settedTransportDestination', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.setDestination(params.destination);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('settedTransportTarget', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.setRequestedTarget(params.target);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('beganTransportScan', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.beginScan();
  pubsub.publish('transporterUpdate', transporter);
});
App.on('canceledTransportScan', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.cancelScan();
  transporter.clearTargets();
  pubsub.publish('transporterUpdate', transporter);
});
App.on('clearedTransportTargets', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.clearTargets();
  pubsub.publish('transporterUpdate', transporter);
});
App.on('settedTransportCharge', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.setCharge(params.charge);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('completedTransport', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  transporter.completeTransport(params.target);
  pubsub.publish('transporterUpdate', transporter);
});
App.on('settedTransporterTargets', (params) => {
  const transporter = App.systems.find((sys) => sys.id === params.transporter);
  if (transporter.targets.length < params.targets) {
    transporter.addTargets(params.targets - transporter.targets.length);
  }
  if (transporter.targets.length > params.targets) {
    transporter.removeTargets(transporter.targets.length - params.targets);
  }
  pubsub.publish('transporterUpdate', transporter);
});
