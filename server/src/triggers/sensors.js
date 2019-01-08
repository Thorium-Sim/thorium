import App from "../app";

export function sensorScanRequest({ id, request }) {
  const sys = App.systems.find(s => s.id === id);
  return sys ? { simulatorId: sys.simulatorId, request: request } : {};
}
