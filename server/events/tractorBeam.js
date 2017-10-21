import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("setTractorBeamState", ({ id, state }) => {
  const system = App.systems.find(s => s.id === id);
  system.setState(state);
  system.setScanning(false);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Tractor Beam ${state ? "Activated" : "Deactivated"}`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "tractorBeamUpdate",
    App.systems.filter(s => s.type === "TractorBeam")
  );
});
App.on("setTractorBeamTarget", ({ id, target }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setTarget(target);
  sys.setScanning(false);
  pubsub.publish(
    "tractorBeamUpdate",
    App.systems.filter(s => s.type === "TractorBeam")
  );
});
App.on("setTractorBeamStrength", ({ id, strength }) => {
  App.systems.find(s => s.id === id).setStrength(strength);
  pubsub.publish(
    "tractorBeamUpdate",
    App.systems.filter(s => s.type === "TractorBeam")
  );
});
App.on("setTractorBeamStress", ({ id, stress }) => {
  App.systems.find(s => s.id === id).setStress(stress);
  pubsub.publish(
    "tractorBeamUpdate",
    App.systems.filter(s => s.type === "TractorBeam")
  );
});
App.on("setTractorBeamScanning", ({ id, scanning }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setScanning(scanning);
  pubsub.publish(
    "tractorBeamUpdate",
    App.systems.filter(s => s.type === "TractorBeam")
  );
  App.handleEvent(
    { simulatorId: sys.simulatorId, component: "TractorBeamCore" },
    "addCoreFeed"
  );
});
