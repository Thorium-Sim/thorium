import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("setTractorBeamState", ({ id, state }) => {
  const system = App.systems.find(s => s.id === id);
  system.setState(state);
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
  App.systems.find(s => s.id === id).setTarget(target);
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
