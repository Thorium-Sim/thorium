import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

App.on("createTransporter", params => {
  const transporter = new Classes.Transporters(params);
  App.systems.push(transporter);
});
App.on("removedTransporter", params => {});
App.on("setTransportDestination", params => {
  const transporter = App.systems.find(sys => sys.id === params.transporter);
  transporter.setDestination(params.destination);
  pubsub.publish("transporterUpdate", transporter);
});
App.on("setTransportTarget", params => {
  const transporter = App.systems.find(sys => sys.id === params.transporter);
  transporter.setRequestedTarget(params.target);
  pubsub.publish("transporterUpdate", transporter);
});
App.on("beginTransportScan", params => {
  const transporter = App.systems.find(sys => sys.id === params.transporter);
  transporter.beginScan();
  App.handleEvent(
    { simulatorId: transporter.simulatorId, component: "TransporterCore" },
    "addCoreFeed"
  );
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: transporter.simulatorId,
    station: "Core",
    title: `Transporter Scan`,
    body: "",
    color: "info"
  });
  pubsub.publish("transporterUpdate", transporter);
});
App.on("cancelTransportScan", params => {
  const transporter = App.systems.find(sys => sys.id === params.transporter);
  transporter.cancelScan();
  transporter.clearTargets();
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: transporter.simulatorId,
    station: "Core",
    title: `Transporter Scan Canceled`,
    body: "",
    color: "info"
  });
  pubsub.publish("transporterUpdate", transporter);
});
App.on("clearTransportTargets", params => {
  const transporter = App.systems.find(sys => sys.id === params.transporter);
  transporter.clearTargets();
  pubsub.publish("transporterUpdate", transporter);
});
App.on("setTransportCharge", params => {
  const transporter = App.systems.find(sys => sys.id === params.transporter);
  transporter.setCharge(params.charge);
  pubsub.publish("transporterUpdate", transporter);
});
App.on("completeTransport", params => {
  const transporter = App.systems.find(sys => sys.id === params.transporter);
  transporter.completeTransport(params.target);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: transporter.simulatorId,
    station: "Core",
    title: `Transported`,
    body: "",
    color: "info"
  });
  pubsub.publish("transporterUpdate", transporter);
});
App.on("setTransporterTargets", params => {
  const transporter = App.systems.find(sys => sys.id === params.transporter);
  if (transporter.targets.length < params.targets) {
    transporter.addTargets(params.targets - transporter.targets.length);
  }
  if (transporter.targets.length > params.targets) {
    transporter.removeTargets(transporter.targets.length - params.targets);
  }
  pubsub.publish("transporterUpdate", transporter);
});
