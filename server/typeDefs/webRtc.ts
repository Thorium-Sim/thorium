import App from "../app";
import {gql, withFilter} from "apollo-server-express";
import {pubsub} from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`

  extend type Mutation {
   
  }
  extend type Subscription {
  
  }
`;

/**
 * Signaling Server
 * One Sound player client acts as the initiator. When first connected, all
 * sound player clients query to see if there is already an initiator available.
 * If there isn't one yet, it waits a random delay and then requests to be the
 * initiator.
 *
 * When a new client connect, the initiator creates a new peer and sends the
 * signalling data to the server, which forwards it to the new client.
 * Answers are returned the same way.
 * There needs to be a clear communication line open between the two so every
 * signal can be sent and received.
 */
const resolver = {
  Query: {
    viewscreens(rootValue, {simulatorId}) {
      let viewscreens = App.clients.filter(
        s => s.station === "Viewscreen" && s.connected,
      );
      if (simulatorId) {
        viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
        return viewscreens.map(v =>
          App.viewscreens.find(
            av => av.id === v.id && av.simulatorId === simulatorId,
          ),
        );
      }
      return viewscreens.map(v => App.viewscreens.find(av => av.id === v.id));
    },
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    viewscreensUpdate: {
      resolve(rootValue, {simulatorId}) {
        let viewscreens = App.clients.filter(
          s => s.station === "Viewscreen" && s.connected,
        );
        if (simulatorId) {
          viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
          return viewscreens.map(v =>
            rootValue.find(
              av => av.id === v.id && av.simulatorId === simulatorId,
            ),
          );
        }
        return viewscreens.map(v => rootValue.find(av => av.id === v.id));
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("viewscreensUpdate"),
        rootValue => !!(rootValue && rootValue.length),
      ),
    },
    viewscreenVideoToggle: {
      resolve() {
        return true;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("viewscreenVideoToggle"),
        (rootValue, {simulatorId, viewscreenId}) => {
          return (
            (rootValue.simulatorId &&
              simulatorId &&
              rootValue.simulatorId === simulatorId) ||
            (rootValue.viewscreenId &&
              viewscreenId &&
              rootValue.viewscreenId === viewscreenId)
          );
        },
      ),
    },
  },
};

export default {schema, resolver};
