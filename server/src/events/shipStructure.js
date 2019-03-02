import App from "../app";
import { pubsub } from "../helpers/subscriptionManager";
import * as Classes from "../classes";
import uuid from "uuid";
// Decks
App.on("addDeck", ({ simulatorId, number, svgPath, doors, evac }) => {
  const deck = new Classes.Deck({ simulatorId, number, svgPath, doors, evac });
  App.decks.push(deck);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("removeDeck", ({ deckId }) => {
  App.decks = App.decks.filter(d => d.id !== deckId);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("addDecksBulk", ({ simulatorId, decks }) => {
  const parsedDecks = JSON.parse(decks);
  parsedDecks.forEach(d => {
    const deck = new Classes.Deck({
      simulatorId,
      number: d.number,
      svgPath: d.svgPath,
      doors: d.doors,
      evac: d.evac
    });
    App.decks.push(deck);
  });
  pubsub.publish("decksUpdate", App.decks);
});
App.on("updateDeckSvg", ({ deckId, svg }) => {
  const deck = App.decks.find(d => d.id === deckId);
  deck.updateSvg(svg);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("deckDoors", ({ deckId, doors }) => {
  const deck = App.decks.find(d => d.id === deckId);
  deck.setDoors(doors);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("deckEvac", ({ deckId, evac }) => {
  const deck = App.decks.find(d => d.id === deckId);
  deck.setEvac(evac);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("updateHallwaySvg", ({ deckId, svg }) => {
  const deck = App.decks.find(d => d.id === deckId);
  deck.updateHallwaySvg(svg);
  pubsub.publish("decksUpdate", App.decks);
});

// Rooms
App.on("addRoom", ({ simulatorId, deckId, deckNumber, name, svgPath }) => {
  let deck;
  if (deckNumber) {
    deck =
      App.decks.find(
        d => d.simulatorId === simulatorId && d.number === deckNumber
      ) || {};
  }
  const room = new Classes.Room({
    simulatorId,
    deckId: deckId ? deckId : deck.id,
    name,
    svgPath
  });
  App.rooms.push(room);
  pubsub.publish("decksUpdate", App.decks);
  pubsub.publish("roomsUpdate", App.rooms);
});
App.on("removeRoom", ({ roomId }) => {
  App.rooms = App.rooms.filter(r => r.id !== roomId);
  pubsub.publish("roomsUpdate", App.rooms);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("addRoomsBulk", ({ simulatorId, rooms }) => {
  const parsedRooms = JSON.parse(rooms);
  parsedRooms.forEach(r => {
    // Get the deck id
    const deck = App.decks.find(
      d => d.simulatorId === simulatorId && d.number === parseInt(r.deck, 10)
    );
    const room = new Classes.Room({
      simulatorId,
      deck: deck.id,
      name: r.name,
      svgPath: r.svgPath
    });
    App.rooms.push(room);
  });
  pubsub.publish("roomsUpdate", App.rooms);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("renameRoom", ({ roomId, name }) => {
  const room = App.rooms.find(r => r.id === roomId);
  room.rename(name);
  pubsub.publish("roomsUpdate", App.rooms);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("updateRoomSvg", ({ roomId, svg }) => {
  const room = App.rooms.find(r => r.id === roomId);
  room.updateSvg(svg);
  pubsub.publish("roomsUpdate", App.rooms);
});
App.on("roomGas", ({ roomId, gas }) => {
  const room = App.rooms.find(r => r.id === roomId);
  room.setGas(gas);
  pubsub.publish("roomsUpdate", App.rooms);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("updateRoomRoles", ({ roomId, roles }) => {
  const room = App.rooms.find(r => r.id === roomId);
  room.updateRoles(roles);
  pubsub.publish("roomsUpdate", App.rooms);
  pubsub.publish("decksUpdate", App.decks);
});
App.on("importRooms", ({ simulatorId, rooms }) => {
  const deckSet = new Set();
  rooms.forEach(d => deckSet.add(d.deck));
  const deckNums = [...deckSet].map(d => parseInt(d, 10));
  const decks = {};
  deckNums.forEach(d => {
    let deck = App.decks.find(
      deckSearch =>
        deckSearch.number === d && deckSearch.simulatorId === simulatorId
    );
    if (deck) {
      decks[d] = deck.id;
    } else {
      const newDeck = new Classes.Deck({ simulatorId, number: d });
      App.decks.push(newDeck);
      decks[d] = newDeck.id;
    }
  });
  rooms.forEach(r => {
    const room = App.rooms.find(roomSearch => {
      const deck = App.decks.find(d => d.id === roomSearch.deckId);
      if (!deck) return false;
      return (
        roomSearch.simulatorId === simulatorId &&
        r.deck === deck.number &&
        roomSearch.name === r.name
      );
    });
    if (!room) {
      const newRoom = new Classes.Room({
        simulatorId,
        deckId: decks[r.deck],
        name: r.name,
        roles: r.roles
      });
      App.rooms.push(newRoom);
    }
  });

  pubsub.publish("decksUpdate", App.decks);
  pubsub.publish("roomsUpdate", App.rooms);
});
App.on("changeRoomDeck", ({ deckId, roomId }) => {
  const room = App.rooms.find(r => r.id === roomId);
  room.setDeck(deckId);

  pubsub.publish("decksUpdate", App.decks);
  pubsub.publish("roomsUpdate", App.rooms);
});

// Inventory
App.on("addInventory", ({ inventory }) => {
  const {
    simulatorId,
    name,
    metadata,
    roomCount = [],
    crewCount = []
  } = inventory;
  // Check to see if an inventory item with the same name exists.
  const dupInventory = App.inventory.find(
    i => i.simulatorId === simulatorId && i.name === name
  );
  if (dupInventory) {
    dupInventory.updateMetadata(metadata);
    roomCount.forEach(r => {
      dupInventory.updateCount(r.room, r.count);
    });
    crewCount.forEach(c => {
      dupInventory.updateCount(c.crew, c.count);
    });
  } else {
    // Add a new inventory item
    App.inventory.push(
      new Classes.InventoryItem({
        simulatorId,
        name,
        roomCount,
        crewCount,
        metadata
      })
    );
  }
  pubsub.publish("inventoryUpdate", App.inventory);
  pubsub.publish("roomsUpdate", App.rooms);
  pubsub.publish("crewUpdate", App.crew);
});
App.on("removeInventory", ({ id }) => {
  App.inventory = App.inventory.filter(i => i.id !== id);
  pubsub.publish("inventoryUpdate", App.inventory);
});
App.on("moveInventory", ({ id, fromRoom, toRoom, count, toSimulator }) => {
  const inv = App.inventory.find(i => i.id === id);
  inv.move(fromRoom, toRoom, count, toSimulator);
  pubsub.publish("inventoryUpdate", App.inventory);
});
App.on("updateInventoryCount", ({ id, room, count }) => {
  const inv = App.inventory.find(i => i.id === id);
  inv.updateCount(room, count);
  pubsub.publish("inventoryUpdate", App.inventory);
});
App.on("updateInventoryMetadata", ({ id, metadata }) => {
  const inv = App.inventory.find(i => i.id === id);
  inv.updateMetadata(metadata);
  pubsub.publish("inventoryUpdate", App.inventory);
});
App.on("updateCrewInventory", ({ crewId, inventory, roomId }) => {
  inventory.forEach(e => {
    const inv = App.inventory.find(i => i.id === e.inventory);
    inv.moveToCrew(roomId, crewId, e.count);
  });
  pubsub.publish("roomsUpdate", App.rooms);
  pubsub.publish("crewUpdate", App.crew);
});
App.on("removeCrewInventory", ({ crewId, inventory, roomId }) => {
  inventory.forEach(e => {
    const inv = App.inventory.find(i => i.id === e.inventory);
    inv.moveFromCrew(crewId, roomId, e.count);
  });
  pubsub.publish("roomsUpdate", App.rooms);
  pubsub.publish("crewUpdate", App.crew);
});

App.on("transferCargo", ({ inventory, fromRoom, toRoom, cb }) => {
  let simId = null;
  inventory.forEach(({ id, count }) => {
    const inv = App.inventory.find(i => i.id === id);
    simId = inv.simulatorId;
    inv.move(fromRoom, toRoom, count, null);
  });

  // Add some logs for the cargo transfer
  const roomSearchList = App.rooms.concat(
    App.dockingPorts
      .filter(d => d.deckId && d.docked)
      .map(d => ({
        ...d,
        name: `${d.shipName || d.name} Loading`
      }))
  );
  const fromRoomObj = roomSearchList.find(r => r.id === fromRoom);
  const toRoomObj = roomSearchList.find(r => r.id === toRoom);
  const fromDeckObj = App.decks.find(d => d.id === fromRoomObj.deckId);
  const toDeckObj = App.decks.find(d => d.id === toRoomObj.deckId);
  const location = `From ${fromRoomObj.name}, Deck ${fromDeckObj.number} to ${
    toRoomObj.name
  }, Deck ${toDeckObj.number}`;
  const log = `Transfer ${location}
${inventory
  .map(
    ({ id, count }) => `${App.inventory.find(i => i.id === id).name}: ${count}`
  )
  .join("\n")}`;
  const simulator = App.simulators.find(s => s.id === simId);
  simulator.ship.inventoryLogs.push({
    timestamp: new Date(),
    log
  });

  pubsub.publish("notify", {
    id: uuid.v4(),
    simulatorId: simulator.id,
    type: "Cargo",
    station: "Core",
    title: `Inventory Transferred`,
    body: location,
    color: "info"
  });
  App.handleEvent(
    {
      simulatorId: simulator.id,
      title: `Inventory Transferred`,
      body: location,
      component: "CargoCore",
      color: "info"
    },
    "addCoreFeed"
  );
  pubsub.publish("simulatorsUpdate", App.simulators);

  pubsub.publish("inventoryUpdate", App.inventory);
  if (
    fromRoomObj.class === "DockingPort" ||
    toRoomObj.class === "DockingPort"
  ) {
    pubsub.publish("dockingUpdate", App.dockingPorts);
  }
  cb && cb();
});
