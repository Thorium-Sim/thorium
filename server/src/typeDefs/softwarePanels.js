import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type SoftwarePanel {
    id: ID
    name: String
    cables: [PanelCable]
    components: [PanelComponent]
    connections: [PanelConnection]
  }

  type PanelCable {
    id: ID
    color: String
    components: [ID]
  }

  type PanelComponent {
    id: ID
    component: String
    level: Float
    label: String
    color: String
    x: Float
    y: Float
    scale: Float
  }

  type PanelConnection {
    id: ID
    to: ID
    from: ID
  }

  input SoftwarePanelInput {
    id: ID
    name: String
    cables: [PanelCableInput]
    components: [PanelComponentInput]
    connections: [PanelConnectionInput]
  }

  input PanelCableInput {
    id: ID
    color: String
    components: [ID]
  }
  input PanelComponentInput {
    id: ID
    component: String
    level: Float
    label: String
    color: String
    x: Float
    y: Float
    scale: Float
  }
  input PanelConnectionInput {
    id: ID
    to: ID
    from: ID
  }
  extend type Query {
    softwarePanels(simulatorId: ID): [SoftwarePanel]
  }
  extend type Mutation {
    createSoftwarePanel(panel: SoftwarePanelInput!): String
    updateSoftwarePanel(panel: SoftwarePanelInput!): String
    removeSoftwarePanel(panel: ID!): String
  }
  extend type Subscription {
    softwarePanelsUpdate(simulatorId: ID): [SoftwarePanel]
  }
`;

const resolver = {
  Query: {
    softwarePanels(rootQuery, { simulatorId }) {
      if (simulatorId) {
        return App.softwarePanels.filter(s => s.simulatorId === simulatorId);
      }
      return App.softwarePanels.filter(s => !s.simulatorId);
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    softwarePanelsUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue.filter(s => !s.simulatorId);
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("softwarePanelsUpdate"),
        rootValue => true
      )
    }
  }
};

export default { schema, resolver };
