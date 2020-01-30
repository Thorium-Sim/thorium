import {Station} from "~classes/stationSet";

export default (
  {room, preamble}: {room: string; preamble: string},
  {location, stations}: {location: string; stations: Station[]},
) => {
  // Find the station with the security decks
  const station = stations.find(s =>
    s.cards.find(c => c.component === "SecurityDecks"),
  );
  const stationName = station ? station.name : "Security Decks";
  return `${preamble ||
    `For safety, the deck where the damage is should be evacuated and sealed.`}
Ask the ${stationName} officer to evacuate and seal the entire deck where the damage is: ${
    room ? `Deck ${room}` : location
  }
  `;
};
