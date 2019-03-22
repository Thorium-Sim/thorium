import App from "../app";

export function sensorScanRequest({ id, request }) {
  const sys = App.systems.find(s => s.id === id);
  return sys ? { simulatorId: sys.simulatorId, request: request } : {};
}

export function processedData({ id, simulatorId, data, flash }) {
  const sys = App.systems.find(s => s.id === id);
  return simulatorId || sys.simulatorId
    ? {
        simulatorId: simulatorId || sys.simulatorId,
        data,
        flash: flash ? "yes" : "no"
      }
    : {};
}
