import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

App.on("createInternalComm", ({ simulatorId }) => {
  const system = new Classes.InternalComm({ simulatorId });
  App.systems.push(system);
  pubsub.publish(
    "internalCommUpdate",
    App.systems.filter(s => s.type === "InternalComm")
  );
});
App.on("removeInternalComm", ({ id }) => {
  App.systems = App.systems.filter(s => s.id !== id);
  pubsub.publish(
    "internalCommUpdate",
    App.systems.filter(s => s.type === "InternalComm")
  );
});
App.on("internalCommConnectOutgoing", ({ id }) => {
  App.systems.find(s => s.id === id).connectOutgoing();
  pubsub.publish(
    "internalCommUpdate",
    App.systems.filter(s => s.type === "InternalComm")
  );
});
App.on("internalCommConnectIncoming", ({ id }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.connectIncoming();
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      title: `Internal Comm Connected`,
      component: "InternalCommCore",
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish(
    "internalCommUpdate",
    App.systems.filter(s => s.type === "InternalComm")
  );
});
App.on("internalCommCancelIncoming", ({ id }) => {
  App.systems.find(s => s.id === id).cancelIncomingCall();
  pubsub.publish(
    "internalCommUpdate",
    App.systems.filter(s => s.type === "InternalComm")
  );
});
App.on("internalCommCancelOutgoing", ({ id }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.cancelOutgoingCall();
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      title: `Internal Comm Cancelled`,
      component: "InternalCommCore",
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish(
    "internalCommUpdate",
    App.systems.filter(s => s.type === "InternalComm")
  );
});
App.on("internalCommCallIncoming", ({ id, incoming }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.callIncoming(incoming);
  pubsub.publish(
    "internalCommUpdate",
    App.systems.filter(s => s.type === "InternalComm")
  );

  // Send a notification to the stations
  const simulator = App.simulators.find(s => s.id === sys.simulatorId);
  const stations = simulator.stations.filter(s =>
    s.cards.find(c => c.component === "CommInternal")
  );
  stations.forEach(s => {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: sys.simulatorId,
      type: "Internal Comm",
      station: s.name,
      title: `New Internal Call`,
      body: incoming,
      color: "info"
    });
  });
});
App.on("internalCommCallOutgoing", ({ id, outgoing }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.callOutgoing(outgoing);
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      title: `New Internal Comm`,
      component: "InternalCommCore",
      body: null,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish(
    "internalCommUpdate",
    App.systems.filter(s => s.type === "InternalComm")
  );
});
