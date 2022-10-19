import App from "../app";

export function lightingShakeLights({simulatorId, strength, duration}) {
  const lighting = App.simulators.find(s => s.id === simulatorId)?.lighting;
  if (!lighting) throw new Error("Lighting not found");
  const str = strength || lighting.actionStrength;
  return {
    simulatorId,
    strength: str === 0.2 ? "low" : str === 0.5 ? "mid" : "high",
    duration,
  };
}

export function lightingSetEffect({simulatorId, duration, strength, effect}) {
  return {simulatorId, duration, strength, effect};
}
