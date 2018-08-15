import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";
App.on("updateSignalJammer", ({ jammer }) => {
  const sys = App.systems.find(s => s.id === jammer.id);
  sys.update(jammer);
  if (jammer.active || jammer.active === false) {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      type: "Signal Jammer",
      station: "Core",
      title: `Signal Jammer ${jammer.active ? "Activated" : "Deactivated"}`,
      body: "",
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: sys.simulatorId,
        title: `Signal Jammer ${jammer.active ? "Activated" : "Deactivated"}`,
        component: "SignalJammerCore",
        body: null,
        color: "info"
      },
      "addCoreFeed"
    );
  }
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
