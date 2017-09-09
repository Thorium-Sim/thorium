import App from "../../app.js";

export const DockingQueries = {
  docking(rootValue, { id, simulatorId, type }) {
    let dockingPorts = App.dockingPorts;
    if (id) {
      return dockingPorts.filter(d => d.id === id);
    }
    if (simulatorId) {
      dockingPorts = dockingPorts.filter(d => d.simulatorId === simulatorId);
    }
    if (type) {
      dockingPorts = dockingPorts.filter(d => d.type === type);
    }
    return dockingPorts;
  }
};

export const DockingMutations = {
  createDockingPort(rootValue, params, context) {
    App.handleEvent(params, "createDockingPort", context);
  },
  updateDockingPort(rootValue, params, context) {
    App.handleEvent(params, "updateDockingPort", context);
  },
  removeDockingPort(rootValue, params, context) {
    App.handleEvent(params, "removeDockingPort", context);
  }
};

export const DockingSubscriptions = {
  dockingUpdate(rootValue, { id, simulatorId, type }) {
    let dockingPorts = rootValue;
    if (id) {
      return dockingPorts.filter(d => d.id === id);
    }
    if (simulatorId) {
      dockingPorts = dockingPorts.filter(d => d.simulatorId === simulatorId);
    }
    if (type) {
      dockingPorts = dockingPorts.filter(d => d.type === type);
    }
    return dockingPorts.length && dockingPorts;
  }
};
