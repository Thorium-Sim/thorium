import App from '../../app';

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
      inventory = inventory.filter(i => (i.roomCount[room] > 0));
    }
    if (deck) {
      const rooms = App.rooms.filter(r => r.deckId === deck);
      inventory = inventory.map(i => {
        Object.keys(i.roomCount)
        .filter(r => rooms.indexOf(r) === -1)
        .forEach(r => delete i.roomCount[r]);
        return i;
      })
    }
    if (name) {
      const regex = new RegExp(name, 'gui');
      inventory = inventory.filter(i => i.name.match(regex));
    }
    // Remove any rooms that have no inventory of that inventory item.
    inventory = inventory.map(i => {
      Object.keys(i.roomCount)
      .filter(r => i.roomCount[r] === 0)
      .forEach(r => delete i.roomCount[r]);
      return i
    });
    return inventory;
  }
};

export const ShipStructureMutations = {
  // Decks
  addDeck(root, args) {
    App.handleEvent(args, 'addDeck');
  },
  removeDeck(root, args) {
    App.handleEvent(args, 'removeDeck');
  },
  addDecksBulk(root, args) {
    App.handleEvent(args, 'addDecksBulk');
  },
  updateDeckSvg(root, args) {
    App.handleEvent(args, 'updateDeckSvg');
  },
  deckDoors(root, args) {
    App.handleEvent(args, 'deckDoors');
  },
  deckEvac(root, args) {
    App.handleEvent(args, 'deckEvac');
  },
  updateHallwaySvg(root, args) {
    App.handleEvent(args, 'updateHallwaySvg');
  },

  // Rooms
  addRoom(root, args) {
    App.handleEvent(args, 'addRoom');
  },
  removeRoom(root, args) {
    App.handleEvent(args, 'removeRoom');
  },
  addRoomsBulk(root, args) {
    App.handleEvent(args, 'addRoomsBulk');
  },
  renameRoom(root, args) {
    App.handleEvent(args, 'renameRoom');
  },
  updateRoomSvg(root, args) {
    App.handleEvent(args, 'updateRoomSvg');
  },
  roomGas(root, args) {
    App.handleEvent(args, 'roomGas');
  },

  // Inventory
  addInventory(root, args) {
    App.handleEvent(args, 'addInventory');
  },
  removeInventory(root, args) {
    App.handleEvent(args, 'removeInventory');
  },
  moveInventory(root, args) {
    App.handleEvent(args, 'moveInventory');
  },
  updateInventoryCount(root, args) {
    App.handleEvent(args, 'updateInventoryCount');
  },
  updateInventoryMetadata(root, args) {
    App.handleEvent(args, 'updateInventoryMetadata');
  },
};

export const ShipStructureSubscriptions = {
  decksUpdate(rootValue, { simulatorId }) {
    if (simulatorId && rootValue) {
      return rootValue.filter(r => r.simulatorId === simulatorId);
    }
    return rootValue;
  },
  roomsUpdate(rootValue, { simulatorId }) {
    if (simulatorId && rootValue) {
      return rootValue.filter(r => r.simulatorId === simulatorId);
    }
    return rootValue;
  },
  inventoryUpdate(rootValue, { simulatorId, }) {
    if (simulatorId && rootValue) {
      return rootValue.filter(r => r.simulatorId === simulatorId);
    }
    return rootValue;
  }
};

export const ShipStructureTypes = {
  Deck: {
    rooms(deck) {
      return App.rooms.filter(r => r.deckId === deck.id);
    },
  },
  Room: {
    deck(room) {
      return App.decks.find(d => d.id === room.deckId);
    },
    inventory(room) {
      return App.inventory.filter(i => Object.keys(i.roomCount).indexOf(room.id) > -1)
      .map(i => {i.count = i.roomCount[room.id]; return i;}) 
    }
  },
  InventoryItem: {
    roomCount(inventory) {
      return Object.keys(inventory.roomCount).map(r => (
      {
        room: r === 'ready' ? {id: 'ready', name: 'Ready Cargo'} : App.rooms.find(room => room.id === r),
        count: inventory.roomCount[r]
      }))
    }
  }
};

