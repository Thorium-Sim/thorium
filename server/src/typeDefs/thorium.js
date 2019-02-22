import App from "../app";
import { gql } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
import GraphQLClient from "../helpers/graphqlClient";

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Thorium {
    thoriumId: String
    autoUpdate: Boolean
    doTrack: Boolean
    askedToTrack: Boolean
    addedTaskTemplates: Boolean
    spaceEdventuresToken: String
    spaceEdventuresCenter: SpaceEdventuresCenter
  }

  type SpaceEdventuresCenter {
    id: ID
    name: String
    token: String
    simulators: [NamedObject]
    missions: [NamedObject]
    badges: [NamedObject]
    flightTypes: [FlightType]
  }

  type NamedObject {
    id: ID
    name: String
    description: String
  }
  type FlightType {
    id: ID
    name: String
    flightHours: Float
    classHours: Float
  }
  extend type Query {
    thorium: Thorium
  }
  extend type Mutation {
    toggleAutoUpdate(autoUpdate: Boolean!): String
    triggerAutoUpdate: String
    setTrackingPreference(pref: Boolean!): String
    importTaskTemplates: String
    setSpaceEdventuresToken(token: String!): SpaceEdventuresCenter

    #Macro: Space EdVentures: Assign Space EdVentures Badge
    assignSpaceEdventuresBadge(badgeId: ID!): String

    #Macro: Space EdVentures: Assign Space EdVentures Mission
    assignSpaceEdventuresMission(badgeId: ID!): String

    assignSpaceEdventuresFlightRecord(flightId: ID!): String
  }
  extend type Subscription {
    thoriumUpdate: Thorium
    clockSync: String
  }
`;

// We define all of the resolvers necessary for
// the functionality in this file. These will be
// deep merged with the other resolvers.
const resolver = {
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
              description
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
              description
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
  },
  Query: {
    thorium(root) {
      return App;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
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
  }
};

export default { schema, resolver };
