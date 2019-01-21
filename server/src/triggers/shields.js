import App from "../app";

// Simple throttle to make sure the action doesn't happen too often
// or multiple times when all the shields are raised at once
let raisedIds = [];
let loweredIds = [];
function checkRaisedId(simulatorId) {
  if (raisedIds.indexOf(simulatorId) > -1) return false;
  raisedIds.push(simulatorId);
  setTimeout(() => {
    raisedIds = raisedIds.filter(c => c !== simulatorId);
  }, 2000);
  return true;
}
function checkLoweredId(simulatorId) {
  if (loweredIds.indexOf(simulatorId) > -1) return false;
  loweredIds.push(simulatorId);
  setTimeout(() => {
    loweredIds = loweredIds.filter(c => c !== simulatorId);
  }, 2000);
  return true;
}
export function shieldRaised({ id }) {
  console.log(raisedIds);
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  if (checkRaisedId(system.simulatorId, raisedIds)) {
    return { simulatorId: system.simulatorId };
  }
  return {};
}
export function shieldLowered({ id }) {
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  if (checkLoweredId(system.simulatorId, loweredIds)) {
    return { simulatorId: system.simulatorId };
  }
  return {};
}
