import App from "../app";

export function completeTransport({ transporter }) {
  const system = App.systems.find(s => s.id === transporter);
  if (!system) return {};
  return { simulatorId: system.simulatorId };
}
