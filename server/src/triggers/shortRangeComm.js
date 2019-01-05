import App from "../app";

function getSimId(id, extra) {
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  return { simulatorId: system.simulatorId, ...extra };
}
export function commHail({ id }) {
  return getSimId(id);
}
export function cancelHail({ id }) {
  return getSimId(id);
}
export function connectHail({ id }) {
  return getSimId(id);
}
export function commAddArrow({ id }) {
  return getSimId(id);
}
export function commRemoveArrow({ id }) {
  // Add something to see if the comm is currently connected
  return getSimId(id);
}
export function commConnectArrow({ id }) {
  return getSimId(id);
}
export function commDisconnectArrow({ id }) {
  return getSimId(id);
}
export function muteShortRangeComm({ id, mute }) {
  return getSimId(id, { mute: mute ? "on" : "off" });
}
