import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

App.on("commAddSignal", ({ id, commSignalInput }) => {
  App.systems.find(s => s.id === id).addCommSignal(commSignalInput);
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("commUpdateSignal", ({ id, commSignalInput }) => {
  App.systems.find(s => s.id === id).updateCommSignal(commSignalInput);
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("commRemoveSignal", ({ id, signalId }) => {
  App.systems.find(s => s.id === id).removeCommSignal(signalId);
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("commAddArrow", ({ id, commArrowInput }) => {
  App.systems.find(s => s.id === id).addArrow(commArrowInput);
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("commRemoveArrow", ({ id, arrowId }) => {
  App.systems.find(s => s.id === id).removeArrow(arrowId);
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("commConnectArrow", ({ id, arrowId }) => {
  const system = App.systems.find(s => s.id === id);
  system.connectArrow(arrowId);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Call Connected`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("commDisconnectArrow", ({ id, arrowId }) => {
  const system = App.systems.find(s => s.id === id);
  system.disconnectArrow(arrowId);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Call Disconnected`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("commUpdate", ({ id, commUpdateInput }) => {
  App.systems.find(s => s.id === id).updateComm(commUpdateInput);
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("commHail", ({ id }) => {
  const system = App.systems.find(s => s.id === id);
  system.hail();
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `New Hail`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("cancelHail", ({ id }) => {
  const system = App.systems.find(s => s.id === id);
  system.cancelHail();
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: system.simulatorId,
    station: "Core",
    title: `Hail Canceled`,
    body: "",
    color: "info"
  });
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
App.on("connectHail", ({ id }) => {
  const system = App.systems.find(s => s.id === id);
  system.connectHail();
  pubsub.publish(
    "shortRangeCommUpdate",
    App.systems.filter(s => s.type === "ShortRangeComm")
  );
});
