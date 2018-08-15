import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import { titleCase } from "change-case";
import uuid from "uuid";
function whichEvent({ clamps, compress, doors, docked }) {
  if (compress) {
    return "Compressed";
  }
  if (compress === false) {
    return "Decompressed";
  }
  if (clamps) {
    return "Clamped";
  }
  if (clamps === false) {
    return "Unclamped";
  }
  if (doors) {
    return "Doors Closed";
  }
  if (doors === false) {
    return "Doors Open";
  }
  return null;
}

App.on("createDockingPort", ({ port }) => {
  const dockingPort = new Classes.DockingPort(port);
  App.dockingPorts.push(dockingPort);
  pubsub.publish("dockingUpdate", App.dockingPorts);
});
App.on("updateDockingPort", ({ port = {} }) => {
  const dockingPort = App.dockingPorts.find(d => {
    if (port.id) {
      return d.id === port.id;
    }

    let tf = true;
    if (port.simulatorId) {
      tf = port.simulatorId === d.simulatorId;
    }
    if (port.type) {
      tf = tf && port.type === d.type;
    }
    return tf;
  });
  dockingPort.updateDockingPort(port);
  pubsub.publish("dockingUpdate", App.dockingPorts);
  if (!whichEvent(port)) return;
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: dockingPort.simulatorId,
    type: "Docking",
    station: "Core",
    title: `${titleCase(dockingPort.type)} ${dockingPort.name} ${whichEvent(
      port
    )}`,
    body: "",
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: dockingPort.simulatorId,
      title: `${titleCase(dockingPort.type)} ${dockingPort.name} Update`,
      component: dockingPort.type === "shuttlebay" ? "ShuttlesCore" : null,
      body: "",
      color: "info"
    },
    "addCoreFeed"
  );
});
App.on("removeDockingPort", ({ port }) => {
  App.dockingPorts = App.dockingPorts.filter(d => d.id !== port);
  pubsub.publish("dockingUpdate", App.dockingPorts);
});
