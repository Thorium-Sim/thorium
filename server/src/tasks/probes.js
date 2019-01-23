import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";
import { Probes } from "../classes";

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export default [
  {
    name: "Launch a Probe",
    class: "Probes",
    active({ simulator }) {
      const probeSystem = App.systems.find(
        s => s.simulatorId === simulator.id && s.class === "Probes"
      );
      return (
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ProbeConstruction")
        ) &&
        probeSystem &&
        !probeSystem.damage.damaged
      );
    },
    stations({ simulator }) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ProbeConstruction")
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A probe should be launched to provide additional data."
      },
      probeType: {
        input: ({ simulator }) => {
          const sys = simulator
            ? App.systems.find(
                s => s.simulatorId === simulator.id && s.class === "Probes"
              )
            : // Use the default if a system doesn't exist
              new Probes();
          return sys.types.map(t => ({ value: t.id, label: t.name }));
        },
        value: ({ simulator }) => {
          const sys = simulator
            ? App.systems.find(
                s => s.simulatorId === simulator.id && s.class === "Probes"
              )
            : // Use the default if a system doesn't exist
              new Probes();
          return randomFromList(sys.types.map(t => t.id));
        }
      },
      equipment: {
        input: ({ simulator }) => "probeEquipment",
        value: ({ simulator }) => {
          const sys = simulator
            ? App.systems.find(
                s => s.simulatorId === simulator.id && s.class === "Probes"
              )
            : // Use the default if a system doesn't exist
              new Probes();
          // Only equipment that can be used on regular probes
          const equipment = sys.equipment
            .filter(e => e.availableProbes.length === 0)
            .concat();
          return Array(Math.ceil(Math.random() * 3) + 1)
            .fill(0)
            .map((_, i) => {
              const count = Math.ceil(Math.random() * 1 + 1);
              return {
                id: equipment[i].id,
                count: count > equipment.count ? equipment.count : count
              };
            })
            .reduce((prev, next) => ({ [next.id]: next.count }));
        }
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, equipment, probeType, system },
      task = {}
    }) {
      const station =
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ProbeConstruction")
        );

      const sys = simulator
        ? App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "Probes"
          )
        : // Use the default if a system doesn't exist
          new Probes();
      const equipmentText =
        Object.entries(equipment).length === 0
          ? ""
          : Object.entries(equipment)
              .map(([id, count]) => {
                const equipment = sys.equipment.find(
                  e => e.id === id || e.name.toLowerCase() === id.toLowerCase()
                );
                return `${count} ${equipment ? equipment.name : id}\n`;
              })
              .join("\n");

      const probeTypeObj = sys.types.find(t => t.id === probeType);
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Launch a ${probeTypeObj.name} probe${
            equipmentText.length > 0
              ? ` with the following equipment:\n\n${equipmentText}`
              : ""
          }`,
          { simulator, system }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of security decks"
        } to launch a ${probeTypeObj.name} probe${
          equipmentText.length > 0
            ? ` with the following equipment:\n\n${equipmentText})}`
            : ""
        }`,
        { simulator, system }
      );
    },
    verify({ simulator, requiredValues: { equipment, probeType } }) {
      // Check if the probe is the right type and has all of the equipment.
      const sys = App.systems.find(
        s => s.simulatorId === simulator.id && s.class === "Probes"
      );

      return sys.probes.find(p => {
        if (p.type !== probeType) return false;
        const probeEquipment = Object.entries(p.equipment);
        for (let i = 0; i < probeEquipment.length; i++) {
          const [eqId, count] = probeEquipment[i];
          if (!equipment[eqId] || equipment[eqId] < count) return false;
        }
        return true;
      });
    }
  }
];

// Perform query
// Science Burst
