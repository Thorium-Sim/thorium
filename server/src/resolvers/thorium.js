import App from "../app.js";
import { pubsub } from "../helpers/subscriptionManager.js";
import GraphQLClient from "../helpers/graphqlClient";

export const ThoriumQueries = {
  thorium(root) {
    return App;
  }
};

export const ThoriumMutations = {
  snapshot() {
    App.snapshot(true);
  },
  toggleAutoUpdate(root, args, context) {
    App.handleEvent(args, "toggleAutoUpdate", context);
  },
  triggerAutoUpdate(root, args, context) {
    App.handleEvent(args, "triggerAutoUpdate", context);
  },
  setTrackingPreference(root, args, context) {
    App.handleEvent(args, "setTrackingPreference", context);
  },
  importTaskTemplates(root, args, context) {
    App.handleEvent(args, "importTaskTemplates", context);
  },
  setSpaceEdventuresToken(root, args, context) {
    return new Promise(resolve => {
      App.handleEvent(
        { ...args, cb: resolve },
        "setSpaceEdventuresToken",
        context
      );
    });
  }
};

export const ThoriumSubscriptions = {
  thoriumUpdate: {
    resolve(rootValue) {
      return rootValue;
    },
    subscribe: () => pubsub.asyncIterator("thoriumUpdate")
  },
  clockSync: {
    resolve() {
      return new Date();
    },
    subscribe: () => pubsub.asyncIterator("clockSync")
  }
};

export const ThoriumTypes = {
  Thorium: {
    spaceEdventuresCenter: async () => {
      const {
        data: { center }
      } = await GraphQLClient.query({
        query: `query {
          center {
            id
            name
          }
        }`
      });
      if (!center) return;
      return { ...center, token: App.spaceEdventuresToken };
    }
  },
  SpaceEdventuresCenter: {
    simulators: async () => {
      const {
        data: { center }
      } = await GraphQLClient.query({
        query: `query {
          center {
            id
            name
            simulators {
              id
              name
            }
          }
        }`
      });
      if (!center) return;
      return center.simulators;
    },
    missions: async () => {
      const {
        data: { center }
      } = await GraphQLClient.query({
        query: `query {
          center {
            id
            name
            badges(type:mission) {
              id
              name
            }
          }
        }`
      });
      if (!center) return;

      return center.badges;
    },
    badges: async () => {
      const {
        data: { center }
      } = await GraphQLClient.query({
        query: `query {
          center {
            id
            name
            badges(type:badge) {
              id
              name
            }
          }
        }`
      });
      if (!center) return;

      return center.badges;
    },
    flightTypes: async () => {
      const {
        data: { center }
      } = await GraphQLClient.query({
        query: `query {
          center {
            id
            name
            flightTypes {
              id
              name
              flightHours
              classHours
            }
          }
        }`
      });
      if (!center) return;

      return center.flightTypes;
    }
  }
};
