import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import { randomFromList } from "../classes/generic/damageReports/constants";
import { Probes } from "../classes";
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
          return randomFromList(
            sys.types.map(t => ({ value: t.id, label: t.name }))
          );
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
          return sys.equipment.map(t => ({ value: t.id, label: t.name }));
        }
      }
    },
    instructions({
      simulator,
      requiredValues: { preamble, equipment, probeType },
      task = {}
    }) {
      const station =
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "SecurityDecks")
        );

      const sys = simulator
        ? App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "Probes"
          )
        : // Use the default if a system doesn't exist
          new Probes();
      const probeTypeObj = sys.types.find(t => t.id === probeType);
      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Launch a ${probeTypeObj.name} probe${
            equipment.length > 0
              ? ` with the following equipment:\n\n${Object.entries(
                  equipment
                ).map(([id, count]) => {
                  const equipment = sys.equipment.find(e => e.id === id);
                  return `${count} ${equipment.name}\n`;
                })}`
              : ""
          }.`,
          {
            simulator
          }
        );
      return reportReplace(
        `${preamble} Ask the ${
          station
            ? `${station.name} Officer`
            : "person in charge of security decks"
        } to launch a ${probeTypeObj.name} probe${
          equipment.length > 0
            ? ` with the following equipment:\n\n${Object.entries(
                equipment
              ).map(([id, count]) => {
                const equipment = sys.equipment.find(e => e.id === id);
                return `${count} ${equipment.name}\n`;
              })}`
            : ""
        }.`,
        { simulator }
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
