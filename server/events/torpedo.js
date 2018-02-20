import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("torpedoAddWarhead", ({ id, warhead }) => {
  App.systems.find(s => s.id === id).addWarhead(warhead);
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
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
    station: "Core",
    title: `${sys.inventory.find(i => i.id === sys.loaded).type} Torpedo Fired`,
    body: "",
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      component: "TorpedoCore",
      title: `${
        sys.inventory.find(i => i.id === sys.loaded).type
      } Torpedo Fired`,
      body: null,
      color: "warning"
    },
    "addCoreFeed"
  );
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
});
App.on("torpedoSetWarheadCount", ({ id, warheadType, count }) => {
  App.systems.find(s => s.id === id).setWarheadCount(warheadType, count);
  pubsub.publish(
    "torpedosUpdate",
    App.systems.filter(s => s.type === "Torpedo")
  );
});
