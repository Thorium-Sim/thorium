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
};

export const ShipStructureMutations = {
  addDeck(root, args) {
    App.handleEvent(args, 'addDeck', 'addedDeck');
  },
  removeDeck(root, args) {
    App.handleEvent(args, 'removeDeck', 'removedDeck');
  },
  addDecksBulk(root, args) {
    App.handleEvent(args, 'addDecksBulk', 'addedDecksBulk');
  },
  updateDeckSvg(root, args) {
    App.handleEvent(args, 'updateDeckSvg', 'updatedDeckSvg');
  },
  deckDoors(root, args) {
    App.handleEvent(args, 'deckDoors', 'deckDoorsd');
  },
  deckEvac(root, args) {
    App.handleEvent(args, 'deckEvac', 'deckEvacd');
  },
  updateHallwaySvg(root, args) {
    App.handleEvent(args, 'updateHallwaySvg', 'updatedHallwaySvg');
  },
  addRoom(root, args) {
    App.handleEvent(args, 'addRoom', 'addedRoom');
  },
  removeRoom(root, args) {
    App.handleEvent(args, 'removeRoom', 'removedRoom');
  },
  addRoomsBulk(root, args) {
    App.handleEvent(args, 'addRoomsBulk', 'addedRoomsBulk');
  },
  renameRoom(root, args) {
    App.handleEvent(args, 'renameRoom', 'renamedRoom');
  },
  updateRoomSvg(root, args) {
    App.handleEvent(args, 'updateRoomSvg', 'updatedRoomSvg');
  },
  roomGas(root, args) {
    App.handleEvent(args, 'roomGas', 'roomGassed');
  }
};

export const ShipStructureSubscriptions = {
  decksUpdate(rootValue, { simulatorId }) {
    if (simulatorId) {
      return rootValue.filter(r => r.simulatorId === simulatorId);
    }
    return rootValue;
  },
  roomsUpdate(rootValue, { simulatorId }) {
    if (simulatorId) {
      return rootValue.filter(r => r.simulatorId === simulatorId);
    }
    return rootValue;
  },
};

export const ShipStructureTypes = {
  Deck: {
    rooms(deck) {
      return App.rooms.filter(r => r.deckId === deck.id);
    },
  },
  Room: {
    deck(room) {
      return App.deck.find(d => d.id === room.deckId);
    },
  },
};

