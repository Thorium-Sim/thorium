import App from "../app";
import {pubsub} from "../helpers/subscriptionManager";
import * as Classes from "../classes";
import {capitalCase} from "change-case";
import uuid from "uuid";
function whichEvent({clamps, compress, doors, docked}) {
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

App.on("createDockingPort", ({port, cb}) => {
  const dockingPort = new Classes.DockingPort(port);
  App.dockingPorts.push(dockingPort);
  pubsub.publish("dockingUpdate", App.dockingPorts);
  cb();
});
App.on("updateDockingPort", ({port, simulatorId, cb, ...rest}) => {
  if (!port) return;
  let dockingPort = App.dockingPorts.find(d => {
    return d.id === port.id;
  });
  if (!dockingPort) return;
  if (simulatorId && dockingPort.simulatorId !== simulatorId) {
    // We're referencing a template simulator. We need to get
    // the docking port with that template ID
    let realDockingPort = App.dockingPorts.find(
      d => d.templateId === port.id && d.simulatorId === simulatorId,
    );
    if (realDockingPort) {
      dockingPort = realDockingPort;
    }
  }
  dockingPort.updateDockingPort(port);
  pubsub.publish("decksUpdate", App.decks);
  pubsub.publish("dockingUpdate", App.dockingPorts);
  if (!whichEvent(port)) return cb();
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: dockingPort.simulatorId,
    type: "Docking",
    station: "Core",
    title: `${capitalCase(dockingPort.type)} ${dockingPort.name} ${whichEvent(
      port,
    )}`,
    body: "",
    color: "info",
  });
  App.handleEvent(
    {
      simulatorId: dockingPort.simulatorId,
      title: `${capitalCase(dockingPort.type)} ${dockingPort.name} Update`,
      component: dockingPort.type === "shuttlebay" ? "ShuttlesCore" : null,
      body: "",
      color: "info",
    },
    "addCoreFeed",
  );
  cb();
});
App.on("removeDockingPort", ({port, cb}) => {
  App.dockingPorts = App.dockingPorts.filter(d => d.id !== port);
  pubsub.publish("dockingUpdate", App.dockingPorts);
  cb();
});
