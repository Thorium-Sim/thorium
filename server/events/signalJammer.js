import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";

App.on("updateSignalJammer", ({ jammer }) => {
  const sys = App.systems.find(s => s.id === jammer.id);
  sys.update(jammer);
  pubsub.publish(
    "signalJammersUpdate",
    App.systems.filter(s => s.type === "SignalJammer")
  );
});
App.on("signalJammerSignals", ({ id, simulatorId, type, signals }) => {
  const sys = App.systems.find(
    s =>
      s.id === id ||
      (s.simulatorId === simulatorId && s.type === "SignalJammer")
  );
  if (!sys) return;
  const sig = parseInt(signals, 10);
  sys.signals = sys.signals.filter(s => s.type !== type);
  Array(sig)
    .fill(0)
    .forEach(() => sys.addSignal({ type }));
  pubsub.publish(
    "signalJammersUpdate",
    App.systems.filter(s => s.type === "SignalJammer")
  );
});
App.on("fluxSignalJammer", ({ id }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.fluxSignals();
  pubsub.publish(
    "signalJammersUpdate",
    App.systems.filter(s => s.type === "SignalJammer")
  );
});
