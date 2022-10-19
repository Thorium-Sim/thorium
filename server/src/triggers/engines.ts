import App from "../app";

export function setSpeed({id, on}) {
  const engine = App.systems.find(s => s.id === id);
  let name = engine.name;
  if (!on) name = "Full Stop";
  if (engine.simulatorId)
    return {simulatorId: engine.simulatorId, engine: name};
  return false;
}
