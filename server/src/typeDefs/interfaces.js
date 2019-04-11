import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
const mutationHelper = require("../helpers/mutationHelper").default;
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Interface {
    id: ID
    simulatorId: ID
    templateId: ID
    deviceType: InterfaceDevice
    name: String
    components: JSON
    connections: JSON
    values: JSON
    config: JSON
  }

  type InterfaceDevice {
    id: ID
    name: String
    width: Int
    height: Int
    isLandscape: Boolean
  }
  extend type Query {
    interfaces(simulatorId: ID): [Interface]
    interfaceDevices: [InterfaceDevice]
  }
  extend type Mutation {
    addInterface(name: String!): String
    renameInterface(id: ID!, name: String!): String
    removeInterface(id: ID!): String
    updateInterface(
      id: ID!
      deviceType: ID
      components: JSON
      connections: JSON
      values: JSON
      config: JSON
    ): String
    addInterfaceToSimulator(simulatorId: ID!, interfaceId: ID!): String
    removeInterfaceFromSimulator(simulatorId: ID!, interfaceId: ID!): String
    addInterfaceDevice(name: String!): String
    renameInterfaceDevice(id: ID!, name: String!): String
    removeInterfaceDevice(id: ID!): String
    updateInterfaceDevice(id: ID!, width: Int, height: Int): String
    triggerInterfaceObject(id: ID!, objectId: ID!): String
    """
    Macro: Interfaces: Set Object Hidden
    """
    toggleInterfaceObjectHidden(
      id: ID!
      objectId: ID!
      hidden: Boolean!
    ): String
  }
  extend type Subscription {
    interfaceUpdate(simulatorId: ID): [Interface]
  }
`;

const resolver = {
  Interface: {
    deviceType: int => {
      return App.interfaceDevices.find(d => d.id === int.deviceType);
    }
  },
  Query: {
    interfaces(root, { simulatorId }) {
      let returnVal = App.interfaces;
      if (simulatorId)
        returnVal = returnVal.filter(i => i.simulatorId === simulatorId);
      return returnVal;
    },
    interfaceDevices() {
      return App.interfaceDevices;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    interfaceUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId) {
          return rootValue.filter(s => s.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("interfaceUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
