import App from '../../app';
import { pubsub } from '../helpers/subscriptionManager';
import * as Classes from '../classes';

App.on('addDeck', ({ simulatorId, number, svgPath, doors, evac }) => {
  const deck = new Classes.Deck({ simulatorId, number, svgPath, doors, evac });
  App.decks.push(deck);
  pubsub.publish('decksUpdate', App.decks);
});
App.on('removeDeck', ({ deckId }) => {
  App.decks = App.decks.filter(d => d.id !== deckId);
  pubsub.publish('decksUpdate', App.decks);
});
App.on('addDecksBulk', ({ simulatorId, decks }) => {
  const parsedDecks = JSON.parse(decks);
  parsedDecks.forEach((d) => {
    const deck = new Classes.Deck({ simulatorId, number: d.number, svgPath: d.svgPath, doors: d.doors, evac: d.evac });
    App.decks.push(deck);
  });
  pubsub.publish('decksUpdate', App.decks);
});
App.on('updateDeckSvg', ({ deckId, svg }) => {
  const deck = App.decks.find(d => d.id === deckId);
  deck.updateSvg(svg);
  pubsub.publish('decksUpdate', App.decks);
});
App.on('deckDoors', ({ deckId, doors }) => {
  const deck = App.decks.find(d => d.id === deckId);
  deck.setDoors(doors);
  pubsub.publish('decksUpdate', App.decks);
});
App.on('deckEvac', ({ deckId, evac }) => {
  const deck = App.decks.find(d => d.id === deckId);
  deck.setEvac(evac);
  pubsub.publish('decksUpdate', App.decks);
});
App.on('updateHallwaySvg', ({ deckId, svg }) => {
  const deck = App.decks.find(d => d.id === deckId);
  deck.updateHallwaySvg(svg);
  pubsub.publish('decksUpdate', App.decks);
});
App.on('addRoom', ({ simulatorId, deckId, name, svgPath }) => {
  const room = new Classes.Room({ simulatorId, deckId, name, svgPath });
  App.rooms.push(room);
  pubsub.publish('roomsUpdate', App.rooms);
});
App.on('removeRoom', ({ roomId }) => {
  App.rooms = App.rooms.filter(r => r.id !== roomId);
  pubsub.publish('roomsUpdate', App.rooms);
});
App.on('addRoomsBulk', ({ simulatorId, rooms }) => {
  const parsedRooms = JSON.parse(rooms);
  parsedRooms.forEach((r) => {
    // Get the deck id
    const deck = App.decks.find(d => (d.simulatorId === simulatorId && d.number === parseInt(r.deck, 10)));
    const room = new Classes.Room({ simulatorId, deck: deck.id, name: r.name, svgPath: r.svgPath });
    App.rooms.push(room);
  });
  pubsub.publish('roomsUpdate', App.rooms);
});
App.on('renameRoom', ({ roomId, name }) => {
  const room = App.rooms.find(r => r.id === roomId);
  room.rename(name);
  pubsub.publish('roomsUpdate', App.rooms);
});
App.on('updateRoomSvg', ({ roomId, svg }) => {
  const room = App.rooms.find(r => r.id === roomId);
  room.updateSvg(svg);
  pubsub.publish('roomsUpdate', App.rooms);
});
App.on('roomGas', ({roomId, gas}) => {
  const room = App.rooms.find(r => r.id === roomId);
  room.setGas(gas);
  pubsub.publish('roomsUpdate', App.rooms);
  pubsub.publish('decksUpdate', App.decks);
})