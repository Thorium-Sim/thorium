import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("torpedoAddWarhead", ({ id, simulatorId, warhead }) => {
  const sys = App.systems.find(
    s => s.id === id || (s.simulatorId === simulatorId && s.class === "Torpedo")
  );
  sys && sys.addWarhead(warhead);
  pubsub.publish(
    "torpedosUpdate",
    App.systems.filter(s => s.type === "Torpedo")
  );
});
App.on("torpedoRemoveWarhead", ({ id, warheadId }) => {
  App.systems.find(s => s.id === id).removeWarhead(warheadId);
  pubsub.publish(
    "torpedosUpdate",
    App.systems.filter(s => s.type === "Torpedo")
  );
});
App.on("torpedoLoadWarhead", ({ id, warheadId }) => {
  App.systems.find(s => s.id === id).loadWarhead(warheadId);
  pubsub.publish(
    "torpedosUpdate",
    App.systems.filter(s => s.type === "Torpedo")
  );
});
App.on("torpedoUnload", ({ id }) => {
  App.systems.find(s => s.id === id).unload();
  pubsub.publish(
    "torpedosUpdate",
    App.systems.filter(s => s.type === "Torpedo")
  );
});
App.on("torpedoFire", ({ id }) => {
  const sys = App.systems.find(s => s.id === id);
  const torpedo = sys.inventory.find(i => i.id === sys.loaded);
  sys.fireWarhead();
  pubsub.publish(
    "torpedosUpdate",
    App.systems.filter(s => s.type === "Torpedo")
  );

  setTimeout(() => {
    sys.unload();
    pubsub.publish(
      "torpedosUpdate",
      App.systems.filter(s => s.type === "Torpedo")
    );
  }, 4000);

  // Launch the probe, if applicable
  if (torpedo.probe) {
    const probes = App.systems.find(
      s => s.simulatorId === sys.simulatorId && s.class === "Probes"
    );
    App.handleEvent({ id: probes.id, probeId: torpedo.probe }, "fireProbe");
    return;
  }

  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
    type: "Torpedos",
    station: "Core",
    title: `${torpedo.type} Torpedo Fired`,
    body: "",
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      component: "TorpedoCore",
      title: `${torpedo.type} Torpedo Fired`,
      body: null,
      color: "warning"
    },
    "addCoreFeed"
  );
});
App.on("torpedoSetWarheadCount", ({ id, warheadType, count }) => {
  App.systems.find(s => s.id === id).setWarheadCount(warheadType, count);
  pubsub.publish(
    "torpedosUpdate",
    App.systems.filter(s => s.type === "Torpedo")
  );
});
