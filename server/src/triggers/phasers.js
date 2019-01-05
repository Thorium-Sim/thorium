import App from "../app";

export function firePhaserBeam({ id, beamId }) {
  const sys = App.systems.find(s => s.id === id);
  const beam = sys.beams.find(b => b.id === beamId);
  return beam.charge > 0 ? { simulatorId: sys.simulatorId } : {};
}
