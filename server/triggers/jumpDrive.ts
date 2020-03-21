import App from "../app";

export function setJumpDriveRingsExtended({id, simulatorId, ringsExtended}) {
  if (simulatorId) return {simulatorId};
  const system = App.systems.find(s => s.id === id);
  return {
    simulatorId: system.simulatorId,
    ringsExtended: ringsExtended ? "true" : "false",
  };
}

export function setJumpdriveActivated({id, simulatorId, activated}) {
  if (simulatorId) return {simulatorId};
  const system = App.systems.find(s => s.id === id);
  return {
    simulatorId: system.simulatorId,
    activated: activated ? "true" : "false",
  };
}
