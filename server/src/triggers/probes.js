import App from "../app";

export function launchProbe({ id }) {
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  return { simulatorId: system.simulatorId };
}
export function probeProcessedData({ id, simulatorId }) {
  if (simulatorId) return { simulatorId };
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  return { simulatorId: system.simulatorId };
}
