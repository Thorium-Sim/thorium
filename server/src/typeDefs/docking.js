import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type DockingPort {
    id: ID
    simulatorId: ID
    name: String
    shipName: String
    type: DOCKING_TYPES
    clamps: Boolean
    compress: Boolean
    doors: Boolean
    image: String
    docked: Boolean
    damage: Damage
    direction: DOCKING_DIRECTION
    position: Coordinates
    deck: Deck
    inventory: [InventoryItem]
  }

  input DockingPortInput {
    id: ID
    simulatorId: ID
    name: String
    shipName: String
    type: String
    clamps: Boolean
    compress: Boolean
    doors: Boolean
    image: String
    docked: Boolean
    direction: DOCKING_DIRECTION
    position: CoordinatesInput
    deckId: ID
  }

  enum DOCKING_TYPES {
    shuttlebay
    dockingport
    specialized
  }

  enum DOCKING_DIRECTION {
    unspecified
    arriving
    departing
  }
  extend type Query {
    docking(id: ID, simulatorId: ID, type: DOCKING_TYPES): [DockingPort]
  }
  extend type Mutation {
    createDockingPort(port: DockingPortInput!): String
    updateDockingPort(port: DockingPortInput!): String
    removeDockingPort(port: ID!): String
  }
  extend type Subscription {
    dockingUpdate(id: ID, simulatorId: ID, type: DOCKING_TYPES): [DockingPort]
  }
`;

const resolver = {
  DockingPort: {
    deck: port => {
      return App.decks.find(d => d.id === port.deckId);
    },
    inventory(port) {
      return App.inventory
        .filter(i => Object.keys(i.roomCount).indexOf(port.id) > -1)
        .map(i => {
          i.count = i.roomCount[port.id];
          return i;
        });
    }
  },
  Query: {
    docking(rootValue, { id, simulatorId, type }) {
      let dockingPorts = App.dockingPorts;
      if (id) {
        return dockingPorts.filter(d => d.id === id);
      }
      if (simulatorId) {
        dockingPorts = dockingPorts.filter(d => d.simulatorId === simulatorId);
      }
      if (type) {
        dockingPorts = dockingPorts.filter(d => d.type === type);
      }
      return dockingPorts;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    dockingUpdate: {
      resolve(rootValue, { id, simulatorId, type }) {
        let dockingPorts = rootValue;
        if (id) {
          return dockingPorts.filter(d => d.id === id);
        }
        if (simulatorId) {
          dockingPorts = dockingPorts.filter(
            d => d.simulatorId === simulatorId
          );
        }
        if (type) {
          dockingPorts = dockingPorts.filter(d => d.type === type);
        }
        return dockingPorts.length && dockingPorts;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("dockingUpdate"),
        rootValue => {
          return !!(rootValue && rootValue.length);
        }
      )
    }
  }
};

export default { schema, resolver };
