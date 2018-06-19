import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import * as Classes from "../classes";
import uuid from "uuid";

App.on(
  "toggleStationMessageGroup",
  ({ stationSetId, station, group, state }) => {
    App.stationSets
      .find(s => s.id === stationSetId)
      .setStationMessageGroup(station, group, state);
    pubsub.publish("stationSetUpdate", App.stationSets);
  }
);
App.on("sendMessage", args => {
  let message = args;
  if (args.message) message = args.message;
  const messageClass = new Classes.Message(message);
  App.messages.push(messageClass);
  pubsub.publish("sendMessage", messageClass);
  const messageGroups = ["SecurityTeams", "DamageTeams", "MedicalTeams"];
  const wordSplit = messageClass.content
    .split(" ")
    .slice(0, 30)
    .join(" ");
  const letterSplit = wordSplit.slice(0, 255);
  const truncatedContent = `${letterSplit}${
    letterSplit.length < messageClass.content.length ? "..." : ""
  }`;
  App.handleEvent(
    {
      simulatorId: messageClass.simulatorId,
      title: `Message: ${messageClass.sender} -> ${messageClass.destination}`,
      body: truncatedContent,
      color: "info"
    },
    "addCoreFeed"
  );
  if (messageGroups.indexOf(messageClass.sender) > -1) {
    // Notify every station that has this class
    App.simulators
      .find(s => s.id === messageClass.simulatorId)
      .stations.filter(s => s.messageGroups.indexOf(messageClass.sender) > -1)
      .forEach(s => {
        pubsub.publish("notify", {
          id: uuid.v4(),
          simulatorId: messageClass.simulatorId,
          station: s.name,
          title: `New Message - ${messageClass.sender}`,
          body: truncatedContent,
          color: "info"
        });
        pubsub.publish("widgetNotify", {
          widget: "messages",
          simulatorId: messageClass.simulatorId,
          station: s.name
        });
      });
  } else {
    pubsub.publish("notify", {
      id: uuid.v4(),
      simulatorId: messageClass.simulatorId,
      station: messageClass.destination,
      title: `New Message - ${messageClass.sender}`,
      body: truncatedContent,
      color: "info"
    });
    pubsub.publish("widgetNotify", {
      widget: "messages",
      simulatorId: messageClass.simulatorId,
      station: messageClass.destination
    });
  }
});
