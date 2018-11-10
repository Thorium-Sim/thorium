import App from "../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

const teamMap = {
  DamageTeams: "damage",
  SecurityTeams: "security",
  MedicalTeams: "medical"
};

export const MessagesQueries = {
  messages(_, { simulatorId, station }) {
    let returnValue = App.messages.concat();
    if (simulatorId) {
      returnValue = returnValue.filter(m => m.simulatorId === simulatorId);
    }
    if (station) {
      // Get the station object
      const stationObj = App.simulators
        .find(s => s.id === simulatorId)
        .stations.find(s => s.name.trim() === station.trim());
      // Get teams
      const teams = App.teams.filter(
        t =>
          t.simulatorId === simulatorId &&
          stationObj &&
          stationObj.messageGroups.findIndex(
            m => teamMap[m] === t.type.toLowerCase()
          ) > -1
      );
      // Get all of the messages which the station sent
      // And which are sent to the station
      returnValue = returnValue.filter(
        m =>
          m.sender === station.trim() ||
          m.destination === station.trim() ||
          stationObj.messageGroups.indexOf(m.sender) > -1 ||
          stationObj.messageGroups.indexOf(m.destination) > -1 ||
          !!teams.find(t => m.sender === t.name || m.destination === t.name)
      );
    }

    return returnValue;
  }
};

export const MessagesMutations = {
  toggleStationMessageGroup(root, args, context) {
    App.handleEvent(args, "toggleStationMessageGroup", context);
  },
  sendMessage(root, args, context) {
    App.handleEvent(args, "sendMessage", context);
  }
};

export const MessagesSubscriptions = {
  messageUpdates: {
    resolve(rootValue, { simulatorId, station }) {
      let returnValue = rootValue.concat();
      if (simulatorId) {
        returnValue = returnValue.filter(m => m.simulatorId === simulatorId);
      }
      if (station) {
        // Get the station object
        const stationObj = App.simulators
          .find(s => s.id === simulatorId)
          .stations.find(s => s.name.trim() === station.trim());
        // Get all of the messages which the station sent
        // And which are sent to the station
        returnValue = returnValue.filter(
          m =>
            m.sender === station.trim() ||
            m.destination === station.trim() ||
            stationObj.messageGroups.indexOf(m.sender) > -1 ||
            stationObj.messageGroups.indexOf(m.destination) > -1
        );
      }

      return returnValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("messageUpdate"),
      rootValue => {
        return !!(rootValue && rootValue.length);
      }
    )
  },
  sendMessage: {
    resolve(rootValue, { simulatorId, station }) {
      if (simulatorId) {
        if (rootValue.simulatorId !== simulatorId) return;
      }
      if (station) {
        // Get the station object
        const stationObj = App.simulators
          .find(s => s.id === simulatorId)
          .stations.find(s => s.name.trim() === station.trim());
        const teams = App.teams.filter(
          t =>
            t.simulatorId === simulatorId &&
            stationObj.messageGroups.findIndex(
              m => teamMap[m] === t.type.toLowerCase()
            ) > -1
        );

        // Get all of the messages which the station sent
        // And which are sent to the station
        if (
          rootValue.sender !== station.trim() &&
          rootValue.destination !== station.trim() &&
          stationObj.messageGroups.indexOf(rootValue.sender) === -1 &&
          stationObj.messageGroups.indexOf(rootValue.destination) === -1 &&
          !teams.find(
            t => rootValue.sender === t.name || rootValue.destination === t.name
          )
        )
          return;
      }

      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("sendMessage"),
      rootValue => !!rootValue
    )
  }
};
