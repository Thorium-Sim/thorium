import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

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
});
App.on("removeDockingPort", ({ port }) => {
  App.dockingPorts = App.dockingPorts.filter(d => d.id !== port);
  pubsub.publish("dockingUpdate", App.dockingPorts);
});
