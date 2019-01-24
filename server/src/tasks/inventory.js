import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default [
  {
    name: "Transfer Cargo",
    class: "Cargo",
    active({ simulator }) {
      return (
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "CargoControl")
        ) &&
        App.inventory.find(i => i.simulatorId === simulator.id)
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "CargoControl")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "Supplies need to be transferred."
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
      inventory: {
        input: () => "inventoryInput",
        value: ({ simulator }) => {
          if (!simulator) return {};
          // Add up the count of the inventory, but only room count to keep it simple.
          const inventory = shuffleArray(
            App.inventory
              .filter(s => s.simulatorId === simulator.id)
              .map(i => ({
                id: i.id,
                count: Object.values(i.roomCount).reduce(
                  (prev, next) => prev + next,
                  0
                )
              }))
              .filter(c => c.count > 0)
          );

          const inventoryCount = Math.ceil(Math.random() * 3) + 1;

          return Array(
            inventory.length < inventoryCount
              ? inventory.length
              : inventoryCount
          )
            .fill(0)
            .map((_, i) => inventory[i])
            .reduce((prev, next) => ({ ...prev, [next.id]: [next.count] }), {});
        }
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, inventory, room: roomId, system },
      task = {}
    }) {
      const station =
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "CargoControl")
        );

      const room = App.rooms.find(r => r.id === roomId);
      const deck = App.decks.find(d => d.id === (room ? room.deckId : roomId));
      const location = `${room.name}, Deck ${deck.number}`;

      const cargoList = Object.entries(inventory)
        .map(([id, count]) => {
          // Support for ID being both an ID and the name of the inventory
          const inv = App.inventory.find(
            s =>
              s.id === id ||
              (s.simulatorId === simulator.id &&
                s.name.toLowerCase() === id.toLowerCase())
          );
          return {
            count: count,
            ...(inv || { name: id })
          };
        })
        .map(({ name, count }) => `${name}: ${count}`)
        .join("\n");
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Send the following cargo to ${location}:
          
${cargoList}`,
          {
            simulator,
            system
          }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of security decks"
        } to send the following cargo to ${location}:
          
${cargoList}`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues: { inventory, room } }) {
      // If the room has as much cargo as is requested (even if it was already there),
      // it counts.
    }
  }
];
