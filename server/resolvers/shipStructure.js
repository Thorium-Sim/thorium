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
  }
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
  },
};

