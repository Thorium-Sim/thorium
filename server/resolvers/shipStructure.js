import App from "../../app";
import { pubsub } from "../helpers/subscriptionManager.js";
import { withFilter } from "graphql-subscriptions";

export const ShipStructureQueries = {
  decks(root, { simulatorId, number }) {
    let decks = App.decks;
    if (simulatorId) {
      decks = decks.filter(d => d.simulatorId === simulatorId);
    }
    if (number) {
      decks = decks.filter(d => d.number === number);
    }
    return decks;
  },
  rooms(root, { simulatorId, deck, name }) {
    let rooms = App.rooms;
    if (simulatorId) {
      rooms = rooms.filter(r => r.simulatorId === simulatorId);
    }
    if (deck) {
      rooms = rooms.filter(r => r.deckId === deck);
    }
    if (name) {
      rooms = rooms.filter(r => r.name === name);
    }
    return rooms;
  },
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
      const rooms = App.rooms.filter(r => r.deckId === deck);
      inventory = inventory.map(i => {
        Object.keys(i.roomCount)
          .filter(r => rooms.indexOf(r) === -1)
          .forEach(r => delete i.roomCount[r]);
        return i;
      });
    }
    if (name) {
      const regex = new RegExp(name, "gui");
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
};

export const ShipStructureMutations = {
  // Decks
  addDeck(root, args, context) {
    App.handleEvent(args, "addDeck", context);
  },
  removeDeck(root, args, context) {
    App.handleEvent(args, "removeDeck", context);
  },
  addDecksBulk(root, args, context) {
    App.handleEvent(args, "addDecksBulk", context);
  },
  updateDeckSvg(root, args, context) {
    App.handleEvent(args, "updateDeckSvg", context);
  },
  deckDoors(root, args, context) {
    App.handleEvent(args, "deckDoors", context);
  },
  deckEvac(root, args, context) {
    App.handleEvent(args, "deckEvac", context);
  },
  updateHallwaySvg(root, args, context) {
    App.handleEvent(args, "updateHallwaySvg", context);
  },

  // Rooms
  addRoom(root, args, context) {
    App.handleEvent(args, "addRoom", context);
  },
  removeRoom(root, args, context) {
    App.handleEvent(args, "removeRoom", context);
  },
  addRoomsBulk(root, args, context) {
    App.handleEvent(args, "addRoomsBulk", context);
  },
  renameRoom(root, args, context) {
    App.handleEvent(args, "renameRoom", context);
  },
  updateRoomSvg(root, args, context) {
    App.handleEvent(args, "updateRoomSvg", context);
  },
  roomGas(root, args, context) {
    App.handleEvent(args, "roomGas", context);
  },

  // Inventory
  addInventory(root, args, context) {
    App.handleEvent(args, "addInventory", context);
  },
  removeInventory(root, args, context) {
    App.handleEvent(args, "removeInventory", context);
  },
  moveInventory(root, args, context) {
    App.handleEvent(args, "moveInventory", context);
  },
  updateInventoryCount(root, args, context) {
    App.handleEvent(args, "updateInventoryCount", context);
  },
  updateInventoryMetadata(root, args, context) {
    App.handleEvent(args, "updateInventoryMetadata", context);
  }
};

export const ShipStructureSubscriptions = {
  decksUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId && rootValue) {
        return rootValue.filter(r => r.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("decksUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  },
  roomsUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId && rootValue) {
        return rootValue.filter(r => r.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("roomsUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  },
  inventoryUpdate: {
    resolve(rootValue, { simulatorId }) {
      if (simulatorId && rootValue) {
        return rootValue.filter(r => r.simulatorId === simulatorId);
      }
      return rootValue;
    },
    subscribe: withFilter(
      () => pubsub.asyncIterator("inventoryUpdate"),
      rootValue => !!(rootValue && rootValue.length)
    )
  }
};

export const ShipStructureTypes = {
  Deck: {
    rooms(deck) {
      return App.rooms.filter(r => r.deckId === deck.id);
    }
  },
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
    }
  },
  InventoryItem: {
    roomCount(inventory) {
      return Object.keys(inventory.roomCount).map(r => ({
        room:
          r === "ready"
            ? { id: "ready", name: "Ready Cargo" }
            : App.rooms.find(room => room.id === r),
        count: inventory.roomCount[r]
      }));
    }
  },
  Location: {
    __resolveType(obj, context, info) {
      return obj.class || null;
    }
  }
};
