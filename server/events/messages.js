import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";

App.on(
  "toggleStationMessageGroup",
  ({ stationSetId, station, group, state }) => {
    App.stationSets
      .find(s => s.id === stationSetId)
      .setStationMessageGroup(station, group, state);
    pubsub.publish("stationSetUpdate", App.stationSets);
  }
);
App.on("sendMessage", ({ message }) => {
  const messageClass = new Classes.Message(message);
  App.messages.push(messageClass);
  pubsub.publish("sendMessage", messageClass);
  const messageGroups = ["Security Teams", "Damage Teams", "Medical Teams"];
  if (messageGroups.indexOf(messageClass.sender) > -1) {
    // Notify every station that has this class
    App.simulators
      .find(s => s.id === messageClass.simulatorId)
      .stations.filter(s => s.messageGroups.indexOf(messageClass.sender) > -1)
      .forEach(s => {
        pubsub.publish("widgetNotify", {
          widget: "messages",
          simulatorId: messageClass.simulatorId,
          station: s.name
        });
      });
  } else {
    pubsub.publish("widgetNotify", {
      widget: "messages",
      simulatorId: messageClass.simulatorId,
      station: messageClass.destination
    });
  }
});
