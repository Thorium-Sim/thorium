import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type WebRTCSignal {
    senderClientId: ID!
    destinationClientId: ID!
    signal: String!
  }
  extend type Mutation {
    # Request to become the WebRTC Initiator for this simulator.
    webRTCCandidate(clientId: ID!): String
    # Send signalling data between the initiator and connected clients
    webRTCSignal(clientId: ID!, signal: String!): String
  }
  extend type Subscription {
    webRTCreinitiate(simulatorId: ID!): Boolean
    webRTCSignal(clientId: ID!): WebRTCSignal
  }
`;

/**
 * Signaling Server
 * One Sound player client acts as the MCU. When first connected, all
 * sound player clients query to see if there is already an MCU available.
 * If there isn't one yet, it waits a random delay and then requests to be the
 * MCU.
 *
 * When a new client connect, the MCU creates a new peer and sends the
 * signalling data to the server, which forwards it to the new client.
 * Answers are returned the same way.
 * There needs to be a clear communication line open between the two so every
 * signal can be sent and received.
 */
const resolver = {
  Mutation: {
    webRTCCandidate(rootValue, {clientId}) {
      const client = App.clients.find(c => c.id === clientId);
      if (!client) return;
      const simulator = App.simulators.find(s => s.id === client.simulatorId);
      if (!simulator) return;
      const mcu = App.clients.find(
        c => c.simulatorId === simulator.id && c.webRTCInitiator,
      );
      if (!mcu) {
        client.setIsWebRTCInitiator();
        pubsub.publish("clientChanged", App.clients);
      }
    },
    webRTCSignal(rootValue, {clientId, signal}, {clientId: contextClientId}) {
      const contextClient = App.clients.find(c => c.id === contextClientId);
      const client = App.clients.find(c => c.id === clientId);
      if (!client || !contextClient) return;
      if (contextClient.webRTCInitiator) {
        // The client that sent the request is the mcu; send the request to clientId
        pubsub.publish("webRTCSignal", {
          destinationClientId: clientId,
          senderClientId: contextClient.id,
          signal,
        });
      } else if (clientId === contextClientId) {
        // The client that sent the request is a peer; send the request to the mcu
        const mcu = App.clients.find(
          c => c.simulatorId === client.simulatorId && c.webRTCInitiator,
        );
        if (!mcu) return;
        pubsub.publish("webRTCSignal", {
          destinationClientId: mcu.id,
          senderClientId: clientId,
          signal,
        });
      }
    },
  },
  Subscription: {
    webRTCreinitiate: {
      resolve() {
        return true;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("webRTCreinitiate"),
        (rootValue, {simulatorId}) => {
          return rootValue.simulatorId === simulatorId;
        },
      ),
    },
    webRTCSignal: {
      resolve(rootValue) {
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("webRTCSignal"),
        (rootValue, {clientId}) => {
          return rootValue.destinationClientId === clientId;
        },
      ),
    },
  },
};

export default {schema, resolver};
