import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

//Creating a new long range message
App.on(
  "sendLongRangeMessage",
  ({ id, simulatorId, message, crew, decoded, sender }) => {
    if (id) {
      App.systems
        .find(s => s.id === id)
        .createMessage(message, crew, decoded, sender);
    }
    if (simulatorId) {
      App.systems
        .find(s => s.simulatorId === simulatorId && s.type === "LongRangeComm")
        .createMessage(message, crew, decoded, sender);
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
    station: "Core",
    title: `New Long Range Message`,
    body: ``,
    color: "info"
  });
  App.handleEvent(
    { simulatorId: sys.simulatorId, component: "LRCommCore" },
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
