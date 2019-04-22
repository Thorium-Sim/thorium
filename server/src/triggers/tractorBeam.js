import App from "../app";

export function setTractorBeamState({ id, state }) {
  const system = App.systems.find(s => s.id === id);
  if (!system) return {};
  return { simulatorId: system.simulatorId, state: state ? "on" : "off" };
}
