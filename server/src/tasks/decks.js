import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";

export default [
  {
    name: "Evacuate and Seal Deck",
    class: "Decks",
    active({ simulator }) {
      return (
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "SecurityDecks")
        ) &&
        App.decks.filter(s => s.simulatorId === simulator.id).length > 0
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "SecurityDecks")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () =>
          "For safety, the deck where the damage is should be evacuated and sealed."
      },
      deck: {
        input: ({ simulator }) =>
          simulator ? "deckPicker" : { type: "number" },
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.decks.filter(d => d.simulatorId === simulator.id)
              ).id
            : Math.ceil(Math.random() * 15)
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, deck, room: roomId, system: sys },
      task = {}
    }) {
      const system = App.systems.find(
        s =>
          sys &&
          (s.id === sys ||
            s.name.toLowerCase() === sys.toLowerCase() ||
            s.displayName.toLowerCase() === sys.toLowerCase())
      ) || { name: sys };
      const station =
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "SecurityDecks")
        );
      const deckNum = roomId
        ? App.decks.find(
            d => d.id === App.rooms.find(r => r.id === roomId).deckId
          ).number
        : isNaN(deck)
          ? App.decks.find(d => d.id === deck).number
          : deck ||
            randomFromList(
              App.decks
                .filter(d => d.simulatorId === simulator.id)
                .map(d => d.number)
            );
      if (station && task.station === station.name)
        return reportReplace(`${preamble} Evacuate and seal Deck ${deckNum}.`, {
          simulator,
          system
        });
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of security decks"
        } to evacuate and seal Deck ${deckNum}.`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues: { deck } }) {
      const deckObj = App.decks.find(
        d =>
          isNaN(deck)
            ? d.id === deck
            : d.simulatorId === simulator.id && d.number === parseInt(deck, 10)
      );
      return deckObj && deckObj.doors === true && deckObj.evac === true;
    }
  }
];
