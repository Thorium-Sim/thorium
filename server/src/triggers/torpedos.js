import App from "../app";
export function torpedoFire({ id }) {
  const torpedo = App.systems.find(s => s.id === id);
  const loaded = torpedo.loaded;
  const warhead = torpedo.inventory.find(t => t.id === loaded);
  return {
    type: warhead.probe === true ? "probe" : warhead.type,
    simulatorId: torpedo.simulatorId
  };
}
