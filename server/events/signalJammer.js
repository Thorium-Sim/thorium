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
App.on("signalJammerSignals", ({ id, type, signals }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.signals = sys.signals.filter(s => s.type !== type);
  Array(signals)
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
