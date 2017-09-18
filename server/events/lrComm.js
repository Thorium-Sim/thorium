import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

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
  App.systems.find(s => s.id === id).sendMessage(message);
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
