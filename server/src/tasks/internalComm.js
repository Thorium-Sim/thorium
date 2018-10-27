import App from "../app";
import reportReplace from "../helpers/reportReplacer";
import {
  randomFromList,
  greekLetters
} from "../classes/generic/damageReports/constants";

export default [
  {
    name: "Internal Call",
    class: "Internal Comm",
    active({ simulator }) {
      // Check cards and system
      const decks = App.decks.filter(d => d.simulatorId === simulator.id);
      const rooms = App.rooms.filter(r => r.simulatorId === simulator.id);
      return (
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "CommInternal")
        ) &&
        decks.length > 0 &&
        rooms.length > 0
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "CommInternal")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A call must be made within the ship."
      },
      room: {
        input: ({ simulator }) => (simulator ? "roomPicker" : "text"),
        value: ({ simulator }) =>
          simulator
            ? randomFromList(
                App.rooms
                  .filter(r => r.simulatorId === simulator.id)
                  .map(r => r.id)
              )
            : ""
      },
      message: {
        input: () => "textarea",
        value: () => {
          const messageList = [
            `Run a level ${Math.floor(Math.random() * 5)} diagnostic.`,
            `Activate the ${randomFromList(greekLetters)} protocol.`,
            `Ensure there is no residual power flow in the junction capacitors.`
          ];
          return randomFromList(messageList);
        }
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, room: roomId, message },
      task = {}
    }) {
      const station = simulator.stations.find(s =>
        s.cards.find(c => c.component === "CommInternal")
      );
      const room = App.rooms.find(r => r.id === roomId);
      const deck = App.decks.find(d => d.id === (room ? room.deckId : roomId));
      const location =
        !room && !deck
          ? "All Decks"
          : room
            ? `${room.name}, Deck ${deck.number}`
            : `Deck ${deck.number}`;
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Make the following internal call:
        
Location: ${location}
Message: ${message}
        `,
          { simulator }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of internal communication"
        } to make the following internal call:
      
Location: ${location}
Message: ${message}
      `,
        { simulator }
      );
    },
    verify({ requiredValues, simulator }) {
      const system = App.systems.find(
        s => s.simulatorId === simulator.id && s.type === "InternalComm"
      );
      const room = App.rooms.find(r => r.id === requiredValues.room);
      const deck = App.decks.find(
        d => d.id === (room ? room.deck : requiredValues.room)
      );
      const locString = deck
        ? `${room ? `${room.name}, ` : ``}Deck ${deck.number}`
        : "All Decks";
      return system && system.outgoing === locString;
    }
  }
];
