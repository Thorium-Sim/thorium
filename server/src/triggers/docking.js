import App from "../app";

export function updateDockingPort({ port }) {
  const dockingPort = App.dockingPorts.find(d => d.id === port.id);

  // Undocked
  // The shuttle/docking port is undocked if docked becomes false
  // and if all of the properties are false.
  if (
    dockingPort.docked === true &&
    port.docked === false &&
    dockingPort.clamps === false &&
    dockingPort.compress === false &&
    dockingPort.doors === false
  ) {
    return {
      simulatorId: dockingPort.simulatorId,
      isDocked: false,
      type: dockingPort.type
    };
  }

  // Docked
  // The shuttle/docking port is docked if docked is true and
  // and clamps attach if they weren't
  if (
    dockingPort.docked === true &&
    port.clamps === true &&
    dockingPort.clamps === false
  ) {
    return {
      simulatorId: dockingPort.simulatorId,
      isDocked: true,
      type: dockingPort.type
    };
  }

  return {};
}
