import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Message {
    id: ID
    simulatorId: ID
    destination: String
    sender: String
    timestamp: String
    content: String
  }

  input MessageInput {
    simulatorId: ID
    destination: String
    sender: String
    timestamp: String
    content: String
  }
  extend type Query {
    messages(simulatorId: ID!, station: String, group: ID): [Message]
  }
  extend type Mutation {
    toggleStationMessageGroup(
      stationSetId: ID!
      station: String!
      group: String!
      state: Boolean!
    ): String
    """
    Macro: Messaging: Send an inter-ship message
    """
    sendMessage(message: MessageInput!): String
  }
  extend type Subscription {
    messageUpdates(simulatorId: ID!, station: String): [Message]
    sendMessage(simulatorId: ID!, station: String): Message
  }
`;

const teamMap = {
  DamageTeams: "damage",
  SecurityTeams: "security",
  MedicalTeams: "medical"
};

const resolver = {
  Query: {
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
  },
  Mutation: mutationHelper(schema),
  Subscription: {
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
              t =>
                rootValue.sender === t.name || rootValue.destination === t.name
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
  }
};

export default { schema, resolver };
