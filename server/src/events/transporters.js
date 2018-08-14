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
    {
      simulatorId: transporter.simulatorId,
      component: "TransporterCore",
      title: `Transporter Scan`,
      body: "",
      color: "info"
    },
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
  if (transporter.training) {
    setTimeout(() => {
      App.handleEvent(
        { transporter: transporter.id, targets: 2 },
        "setTransporterTargets",
        { clientId: "training", simulatorId: transporter.simulatorId }
      );
    }, 5000);
  }
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
  App.handleEvent(
    {
      simulatorId: transporter.simulatorId,
      title: `Transporter Scan Canceled`,
      component: "TransporterCore",
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
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
  App.handleEvent(
    {
      simulatorId: transporter.simulatorId,
      title: `Transported`,
      component: "TransporterCore",
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish("transporterUpdate", transporter);
});
App.on("setTransporterTargets", params => {
  const transporter = App.systems.find(
    sys =>
      sys.id === params.transporter ||
      (sys.simulatorId === params.simulatorId && sys.type === "Transporters")
  );
  if (!transporter) return;
  transporter.state = "Inactive";
  const targetCount = parseInt(params.targets, 10);
  if (transporter.targets.length < targetCount) {
    transporter.addTargets(targetCount - transporter.targets.length);
  }
  if (transporter.targets.length > targetCount) {
    transporter.removeTargets(transporter.targets.length - targetCount);
  }

  pubsub.publish("transporterUpdate", transporter);
});
