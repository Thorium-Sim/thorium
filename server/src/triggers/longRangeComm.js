import App from "../app";

export function sendLongRangeMessage({ id, simulatorId, crew }) {
  if (simulatorId) return { simulatorId };
  const system = App.systems.find(s => s.id === id);
  return { simulatorId: system.simulatorId, crew: crew ? "true" : "false" };
}
