import App from "../app";

import {randomFromList} from "../classes/generic/damageReports/constants";

export function getLocation(simulatorId: string, roomId: string): string {
  const room = App.rooms.find(r => {
    // If we are looking for a room by specific Id
    if (r.id === roomId) return true;
    // By name
    if (r.name === roomId && r.simulatorId === simulatorId) return true;

    return false;
  });
  const deck = App.decks.find(d => {
    // If we found a room, get the deck
    if (d.id === room?.deckId) return true;
    // If roomId is actually a deck ID
    if (d.id === roomId) return true;
    // If room ID is a deck number of some kind
    if (
      d.simulatorId === simulatorId &&
      d.number === Number(roomId.replace("Deck", "").trim())
    )
      return true;
    return false;
  });
  const decks = App.decks.filter(d => d.simulatorId === simulatorId);
  const randomDeck = randomFromList(decks);
  if (!roomId) return `Deck ${randomDeck ? randomDeck.number : 1}`;
  if (!room && !deck) return roomId;
  if (!room) return `Deck ${deck.number}`;
  return `${room.name}, Deck ${deck.number}`;
}
