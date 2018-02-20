import App from "../app";
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
  App.handleEvent(
    {
      simulatorId: system.simulatorId,
      component: "TractorBeamCore",
      title: `Tractor Beam ${state ? "Activated" : "Deactivated"}`,
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
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
App.on("setTractorBeamTargetLabel", ({ id, label }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.setTargetLabel(label);
  pubsub.publish(
    "tractorBeamUpdate",
    App.systems.filter(s => s.type === "TractorBeam")
  );
});
App.on("addTractorTarget", ({ id, simulatorId, label }) => {
  let sys;
  if (id) {
    sys = App.systems.find(s => s.id === id);
  } else {
    sys = App.systems.find(
      s => s.simulatorId === simulatorId && s.class === "TractorBeam"
    );
  }
  if (!sys) return;
  sys.setTargetLabel(label);
  sys.setTarget(true);
  sys.setScanning(false);
  pubsub.publish(
    "tractorBeamUpdate",
    App.systems.filter(s => s.type === "TractorBeam")
  );
});
App.on("removeTractorTarget", ({ id, simulatorId, label }) => {
  let sys;
  if (id) {
    sys = App.systems.find(s => s.id === id);
  } else {
    sys = App.systems.find(
      s => s.simulatorId === simulatorId && s.class === "TractorBeam"
    );
  }
  if (!sys) return;
  sys.setTargetLabel(label);
  sys.setTarget(false);
  pubsub.publish(
    "tractorBeamUpdate",
    App.systems.filter(s => s.type === "TractorBeam")
  );
});
