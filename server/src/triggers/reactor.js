import App from "../app";

export function reactorChangeEfficiency({ id, efficiency }) {
  const sys = App.systems.find(s => s.id === id);
  return sys ? { simulatorId: sys.simulatorId, efficiency } : {};
}
