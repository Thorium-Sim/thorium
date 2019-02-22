import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Viewscreen {
    id: ID
    simulatorId: ID
    name: String
    component: String
    # JSON
    data: String
    auto: Boolean
    secondary: Boolean
    overlay: Boolean
  }
  extend type Query {
    viewscreens(simulatorId: ID): [Viewscreen]
  }
  extend type Mutation {
    updateViewscreenName(id: ID!, name: String!): String
    updateViewscreenSecondary(id: ID!, secondary: Boolean!): String

    #Macro: Viewscreen: Change Viewscreen Card
    updateViewscreenComponent(
      id: ID
      simulatorId: ID
      component: String!
      data: String
      secondary: Boolean
    ): String
    updateViewscreenData(id: ID!, data: String!): String

    #Macro: Viewscreen: Set Viewscreen to Auto
    setViewscreenToAuto(id: ID, simulatorId: ID, secondary: Boolean): String
    updateViewscreenAuto(id: ID!, auto: Boolean!): String
    toggleViewscreenVideo(simulatorId: ID!): String
  }
  extend type Subscription {
    viewscreensUpdate(simulatorId: ID): [Viewscreen]
    viewscreenVideoToggle(simulatorId: ID): Boolean
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
  Viewscreen: {
    overlay(v) {
      const client = App.clients.find(c => c.id === v.id);
      return client.overlay;
    }
  },
  Query: {
    viewscreens(rootValue, { simulatorId }) {
      let viewscreens = App.clients.filter(
        s => s.station === "Viewscreen" && s.connected
      );
      if (simulatorId) {
        viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
        return viewscreens.map(v =>
          App.viewscreens.find(
            av => av.id === v.id && av.simulatorId === simulatorId
          )
        );
      }
      return viewscreens.map(v => App.viewscreens.find(av => av.id === v.id));
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    viewscreensUpdate: {
      resolve(rootValue, { simulatorId }) {
        let viewscreens = App.clients.filter(
          s => s.station === "Viewscreen" && s.connected
        );
        if (simulatorId) {
          viewscreens = viewscreens.filter(v => v.simulatorId === simulatorId);
          return viewscreens.map(v =>
            rootValue.find(
              av => av.id === v.id && av.simulatorId === simulatorId
            )
          );
        }
        return viewscreens.map(v => rootValue.find(av => av.id === v.id));
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("viewscreensUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    },
    viewscreenVideoToggle: {
      resolve() {
        return true;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("viewscreenVideoToggle"),
        (rootValue, { simulatorId }) => {
          return rootValue === simulatorId;
        }
      )
    }
  }
};

export default { schema, resolver };
