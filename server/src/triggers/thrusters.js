import App from "../app";

let cachedIds = [];
let timeouts = {};

function checkId(simulatorId) {
  if (cachedIds.indexOf(simulatorId) > -1) return false;
  cachedIds.push(simulatorId);
  clearTimeout(timeouts[simulatorId]);
  timeouts[simulatorId] = setTimeout(() => {
    cachedIds = cachedIds.filter(c => c !== simulatorId);
  }, 5000);
  return true;
}

export function directionUpdate({ id, direction }) {
  if (direction.x === 0 && direction.y === 0 && direction.z === 0) return {};
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  if (checkId(system.simulatorId)) {
    return { simulatorId: system.simulatorId };
  }
  return {};
}

export function rotationUpdate({ id, rotation, on }) {
  if (
    (rotation.yaw === 0 && rotation.pitch === 0 && rotation.roll === 0) ||
    on === true
  )
    return {};
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  if (checkId(system.simulatorId)) {
    return { simulatorId: system.simulatorId };
  }
  return {};
}
