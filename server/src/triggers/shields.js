import App from "../app";

// Simple throttle to make sure the action doesn't happen too often
// or multiple times when all the shields are raised at once
let raisedIds = [];
let loweredIds = [];
function checkId(simulatorId, cachedIds) {
  if (cachedIds.indexOf(simulatorId) > -1) return false;
  cachedIds.push(simulatorId);
  setTimeout(() => {
    cachedIds = cachedIds.filter(c => c !== simulatorId);
  }, 2000);
  return true;
}
export function shieldRaised({ id }) {
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  if (checkId(system.simulatorId, raisedIds)) {
    return { simulatorId: system.simulatorId };
  }
}
export function shieldLowered({ id }) {
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  if (checkId(system.simulatorId, loweredIds)) {
    return { simulatorId: system.simulatorId };
  }
}
