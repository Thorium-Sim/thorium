import App from "../app";
import { gql, withFilter } from "apollo-server-express";
import { pubsub } from "../helpers/subscriptionManager";
import mutationHelper from "../helpers/mutationHelper";
// We define a schema that encompasses all of the types
// necessary for the functionality in this file.
const schema = gql`
  type Room {
    id: ID
    simulatorId: ID
    deck: Deck
    name: String
    roles: [RoomRoles]
    gas: Boolean
    svgPath: String
    inventory: [InventoryItem]
    systems: [System]
  }

  input RoomInput {
    name: String
    deck: Int
    roles: [RoomRoles]
  }

  enum RoomRoles {
    probe
    torpedo
    damageTeam
    securityTeam
    medicalTeam
  }
  extend type Query {
    rooms(simulatorId: ID, deck: ID, name: String, role: RoomRoles): [Room]
  }
  extend type Mutation {
    addRoom(
      simulatorId: ID!
      deckId: ID
      deckNumber: Int
      name: String!
      svgPath: String
    ): String
    removeRoom(roomId: ID!): String

    addRoomsBulk(simulatorId: ID!, rooms: String!): String
    renameRoom(roomId: ID!, name: String!): String
    updateRoomRoles(roomId: ID!, roles: [RoomRoles]): String
    updateRoomSvg(roomId: ID!, svg: String!): String
    roomGas(roomId: ID!, gas: Boolean): String
    importRooms(simulatorId: ID!, rooms: [RoomInput]!): String
    changeRoomDeck(roomId: ID!, deckId: ID!): String
  }
  extend type Subscription {
    roomsUpdate(simulatorId: ID!, role: RoomRoles): [Room]
  }
`;

const resolver = {
  Room: {
    deck(room) {
      return App.decks.find(d => d.id === room.deckId);
    },
    inventory(room) {
      return App.inventory
        .filter(i => Object.keys(i.roomCount).indexOf(room.id) > -1)
        .map(i => {
          i.count = i.roomCount[room.id];
          return i;
        });
    },
    systems(room) {
      return App.systems.filter(s => s.locations.indexOf(room.id) > -1);
    }
  },
  Query: {
    rooms(root, { simulatorId, deck, name, role }) {
      // Include any rooms that are implied by docked ships
      let rooms = App.rooms.concat(
        App.dockingPorts.filter(d => d.deckId && d.docked).map(d => ({
          ...d,
          name: `${d.shipName || d.name} Loading`
        }))
      );
      if (simulatorId) {
        rooms = rooms.filter(r => r.simulatorId === simulatorId);
      }
      if (deck) {
        rooms = rooms.filter(r => r.deckId === deck);
      }
      if (name) {
        rooms = rooms.filter(r => r.name === name);
      }
      if (role) {
        rooms = rooms.filter(r => (r.roles || []).indexOf(role) > -1);
      }
      return rooms;
    }
  },
  Mutation: mutationHelper(schema),
  Subscription: {
    roomsUpdate: {
      resolve(rootValue, { simulatorId, role }) {
        let returnValue = rootValue;
        if (simulatorId && rootValue) {
          returnValue = returnValue.filter(r => r.simulatorId === simulatorId);
        }
        if (role) {
          returnValue = returnValue.filter(r => r.roles.indexOf(role) > -1);
        }
        return returnValue;
      },
      subscribe: withFilter(
        () => pubsub.asyncIterator("roomsUpdate"),
        rootValue => !!(rootValue && rootValue.length)
      )
    }
  }
};

export default { schema, resolver };
