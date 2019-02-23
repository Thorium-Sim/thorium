import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
import escapeRegex from "escape-string-regexp";

// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type InventoryItem {
    id: ID
    simulatorId: ID
    name: String

    # Use only for subqueries with Room
    count: Int
    metadata: InventoryMetadata
    roomCount: [RoomCount]
    teamCount: [TeamCount]
  }

  input InventoryItemInput {
    simulatorId: ID
    name: String
    metadata: InventoryMetadataInput
    roomCount: [RoomCountInput]
    crewCount: [CrewCountInput]
  }

  type InventoryMetadata {
    type: String
    size: Int
    description: String
    image: String

    # For Probes
    science: Boolean
    # For Probes
    defense: Boolean
  }

  input InventoryCount {
    inventory: ID
    count: Int
  }

  input InventoryCountInput {
    id: ID
    count: Int
  }

  input InventoryMetadataInput {
    type: String
    size: Int
    description: String
    image: String

    # For Probes
    science: Boolean
    # For Probes
    defense: Boolean
  }
  type RoomCount {
    room: Room
    count: Int
  }
  type TeamCount {
    team: Team
    count: Int
  }
  input RoomCountInput {
    room: ID
    count: Int
  }
  input CrewCountInput {
    crew: ID
    count: Int
  }
  type TeamCountInput {
    team: ID
    count: Int
  }
  extend type Query {
    inventory(
      simulatorId: ID
      id: ID
      name: String
      deck: ID
      room: ID
    ): [InventoryItem]
  }
  extend type Mutation {
    addInventory(inventory: InventoryItemInput): String
    removeInventory(id: ID): String
    moveInventory(
      id: ID!
      fromRoom: ID!
      toRoom: ID!
      count: Int!
      toSimulator: ID
    ): String
    updateInventoryCount(id: ID!, room: ID!, count: Int!): String
    updateInventoryMetadata(id: ID, metadata: InventoryMetadataInput): String
    updateCrewInventory(
      crewId: ID!
      inventory: [InventoryCount]!
      roomId: ID
    ): String
    removeCrewInventory(
      crewId: ID!
      inventory: [InventoryCount]!
      roomId: ID!
    ): String
    transferCargo(
      inventory: [InventoryCountInput]
      fromRoom: ID!
      toRoom: ID!
    ): String
  }
  extend type Subscription {
    inventoryUpdate(simulatorId: ID!): [InventoryItem]
  }
`;

const resolver = {
  InventoryItem: {
    roomCount(inventory) {
      const rooms = App.rooms.concat(
        App.dockingPorts.filter(d => d.deckId && d.docked).map(d => ({
          ...d,
          name: `${d.shipName || d.name} Loading`
        }))
      );
      return Object.keys(inventory.roomCount).map(r => ({
        room:
          r === "ready"
            ? { id: "ready", name: "Ready Cargo" }
            : rooms.find(room => room.id === r),
        count: inventory.roomCount[r]
      }));
    },
    teamCount(inventory) {
      return Object.keys(inventory.teamCount).map(r => ({
        room: App.teams.find(team => team.id === r),
        count: inventory.teamCount[r]
      }));
    }
  },
  Query: {
    inventory(root, { simulatorId, id, name, deck, room }) {
      let inventory = App.inventory.concat();
      if (simulatorId) {
        inventory = inventory.filter(i => i.simulatorId === simulatorId);
      }
      if (id) {
        inventory = inventory.filter(i => i.id === id);
      }
      if (room) {
        inventory = inventory.filter(i => i.roomCount[room] > 0);
      }
      if (deck) {
        const rooms = App.rooms
          .concat(
            App.dockingPorts.filter(d => d.deckId && d.docked).map(d => ({
              ...d,
              name: `${d.shipName || d.name} Loading`
            }))
          )
          .filter(r => r.deckId === deck);
        inventory = inventory.map(i => {
          Object.keys(i.roomCount)
            .filter(r => rooms.indexOf(r) === -1)
            .forEach(r => delete i.roomCount[r]);
          return i;
        });
      }
      if (name) {
        const regex = new RegExp(escapeRegex(name || ""), "gui");
        inventory = inventory.filter(i => i.name.match(regex));
      }
      // Remove any rooms that have no inventory of that inventory item.
      inventory = inventory.map(i => {
        Object.keys(i.roomCount)
          .filter(r => i.roomCount[r] === 0)
          .forEach(r => delete i.roomCount[r]);
        return i;
      });
      return inventory;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    inventoryUpdate: {
      resolve(rootValue, { simulatorId }) {
        if (simulatorId && rootValue) {
          return rootValue.filter(r => r.simulatorId === simulatorId);
        }
        return rootValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("inventoryUpdate"),
        rootValue => {
          return !!(rootValue && rootValue.length);
        }
      )
    }
  }
};

export default { schema, resolver };
