import App from "../../app";
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
  pubsub.publish("widgetNotify", {
    widget: "messages",
    simulatorId: messageClass.simulatorId,
    station: messageClass.destination
  });
});
