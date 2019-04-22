import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import uuid from "uuid";

//Creating a new long range message
App.on(
  "sendLongRangeMessage",
  ({ id, simulatorId, message = "", crew, decoded, sender }) => {
    let system;
    if (id) {
      system = App.systems.find(s => s.id === id);
    }
    if (simulatorId) {
      system = App.systems.find(
        s => s.simulatorId === simulatorId && s.type === "LongRangeComm"
      );
    }
    if (system) {
      const simulator = App.simulators.find(s => s.id === system.simulatorId);
      system &&
        system.createMessage(
          message.replace(/#SIM/gi, simulator.name),
          crew,
          decoded,
          sender
        );

      if (crew === false) {
        // Find the station(s) which has long range message sending

        // If the simulator has a comm review card, send it there first
        const cardName = simulator.stations.find(s =>
          s.cards.find(c => c.component === "CommReview")
        )
          ? "CommReview"
          : "LongRangeComm";

        const stations = simulator.stations.filter(s =>
          s.cards.find(c => c.component === cardName)
        );
        stations.forEach(s => {
          if (s.name !== sender) {
            pubsub.publish("notify", {
              id: uuid.v4(),
              simulatorId: system.simulatorId,
              type: "Long Range Comm",
              station: s.name,
              title: `New Long Range Message Queued`,
              body: `Message composed by ${sender}`,
              color: "info",
              relevantCards: [cardName]
            });
          }
        });
      } else {
        const stations = simulator.stations.filter(s =>
          s.cards.find(c => c.component === "CommDecoding")
        );
        stations.forEach(s => {
          if (s.name !== sender) {
            pubsub.publish("notify", {
              id: uuid.v4(),
              simulatorId: system.simulatorId,
              type: "Long Range Comm",
              station: s.name,
              title: `New Long Range Message`,
              body: `From ${sender}`,
              color: "info",
              relevantCards: ["CommDecoding"]
            });
          }
        });
      }
    }
    pubsub.publish(
      "longRangeCommunicationsUpdate",
      App.systems.filter(s => s.type === "LongRangeComm")
    );
  }
);
//Queued messages are sent
App.on("longRangeMessageSend", ({ id, message }) => {
  const sys = App.systems.find(s => s.id === id);
  sys.sendMessage(message);
  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: sys.simulatorId,
    type: "Long Range Comm",
    station: "Core",
    title: `New Long Range Message`,
    body: ``,
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: sys.simulatorId,
      component: "LRCommCore",
      title: `New Long Range Message`,
      body: ``,
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish(
    "longRangeCommunicationsUpdate",
    App.systems.filter(s => s.type === "LongRangeComm")
  );
});
App.on("deleteLongRangeMessage", ({ id, message }) => {
  App.systems.find(s => s.id === id).deleteMessage(message);
  pubsub.publish(
    "longRangeCommunicationsUpdate",
    App.systems.filter(s => s.type === "LongRangeComm")
  );
});
App.on("approveLongRangeMessage", ({ id, message }) => {
  const sys = App.systems.find(s => s.id === id);
  sys && sys.approveMessage(message);
  pubsub.publish(
    "longRangeCommunicationsUpdate",
    App.systems.filter(s => s.type === "LongRangeComm")
  );
  const simulator = App.simulators.find(s => s.id === sys.simulatorId);
  const messageObj = sys.messages.find(m => m.id === message);
  // Send the notification

  const stations = simulator.stations.filter(
    s =>
      s.cards.find(c => c.component === "LongRangeComm") &&
      !s.cards.find(c => c.component === "CommReview")
  );
  stations.forEach(s => {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: simulator.id,
      type: "Long Range Comm",
      station: s.name,
      title: `New Long Range Message Queued`,
      body: `Message composed by ${messageObj.sender}`,
      color: "info",
      relevantCards: ["LongRangeComm"]
    });
  });
});
App.on("encryptLongRangeMessage", ({ id, message }) => {
  App.systems.find(s => s.id === id).encryptMessage(message);
  pubsub.publish(
    "longRangeCommunicationsUpdate",
    App.systems.filter(s => s.type === "LongRangeComm")
  );
});
App.on(
  "updateLongRangeDecodedMessage",
  ({ id, messageId, decodedMessage, a, f }) => {
    App.systems
      .find(s => s.id === id)
      .updateDecodedMessage(id, messageId, decodedMessage, a, f);
    pubsub.publish(
      "longRangeCommunicationsUpdate",
      App.systems.filter(s => s.type === "LongRangeComm")
    );
  }
);
App.on("updateLongRangeComm", ({ longRangeComm }) => {
  const lr = App.systems.find(s => s.id === longRangeComm.id);
  lr.update(longRangeComm);
  if (longRangeComm.locked) {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: lr.simulatorId,
      type: "Interception",
      station: "Core",
      title: `Interception Signal Locked`,
      body: ``,
      color: "info"
    });
    App.handleEvent(
      {
        simulatorId: lr.simulatorId,
        title: `Interception Signal Locked`,
        body: null,
        component: "InterceptionCore",
        color: "info"
      },
      "addCoreFeed"
    );
  }
  pubsub.publish(
    "longRangeCommunicationsUpdate",
    App.systems.filter(s => s.type === "LongRangeComm")
  );
});

App.on("setLongRangeSatellites", ({ id, num }) => {
  const lr = App.systems.find(s => s.id === id);
  lr.setSatellites(num);
  pubsub.publish(
    "longRangeCommunicationsUpdate",
    App.systems.filter(s => s.type === "LongRangeComm")
  );
});

App.on("addInterceptionSignal", ({ id, simulatorId }) => {
  const lr = App.systems.find(
    s =>
      s.id === id ||
      (s.simulatorId === simulatorId && s.type === "LongRangeComm")
  );
  if (!lr) return;
  lr.update({ interception: true });
  pubsub.publish(
    "longRangeCommunicationsUpdate",
    App.systems.filter(s => s.type === "LongRangeComm")
  );
});

App.on("removeInterceptionSignal", ({ id, simulatorId }) => {
  const lr = App.systems.find(
    s =>
      s.id === id ||
      (s.simulatorId === simulatorId && s.type === "LongRangeComm")
  );
  if (!lr) return;
  lr.update({ interception: false });
  pubsub.publish(
    "longRangeCommunicationsUpdate",
    App.systems.filter(s => s.type === "LongRangeComm")
  );
});

App.on("setLongRangePresetMessages", ({ id, simulatorId, messages }) => {
  const system = App.systems.find(
    sys =>
      sys.id === id ||
      (sys.simulatorId === simulatorId && sys.class === "LongRangeComm")
  );
  if (!system) {
    console.error("Invalid system. Cannot set long range preset messages.");
    return;
  }
  const simulator = App.simulators.find(s => s.id === system.simulatorId);
  system.setPresetMessages(
    messages.map(p => {
      return {
        label: p.label ? p.label.replace(/#SIM/gi, simulator.name) : "",
        value: p.value ? p.value.replace(/#SIM/gi, simulator.name) : ""
      };
    })
  );
  pubsub.publish(
    "longRangeCommunicationsUpdate",
    App.systems.filter(s => s.type === "LongRangeComm")
  );
});
