import reportReplace from "../helpers/reportReplacer";
import App from "../app";
import {randomFromList} from "../classes/generic/damageReports/constants";
import {Probes} from "../classes";
import Fuzz from "fuse.js";
import {capitalCase} from "change-case";
import {scienceProbeTypes} from "../classes/probes";
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
    active({simulator}) {
      const probeSystem = App.systems.find(
        s => s.simulatorId === simulator.id && s.class === "Probes",
      );
      return (
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ProbeConstruction"),
        ) &&
        probeSystem &&
        !probeSystem.damage.damaged
      );
    },
    stations({simulator}) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ProbeConstruction"),
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A probe should be launched to provide additional data.",
      },
      probeType: {
        input: ({simulator}) => {
          const sys = simulator
            ? App.systems.find(
                s => s.simulatorId === simulator.id && s.class === "Probes",
              )
            : // Use the default if a system doesn't exist
              new Probes();
          return sys.types.map(t => ({value: t.id, label: t.name}));
        },
        value: ({simulator}) => {
          const sys = simulator
            ? App.systems.find(
                s => s.simulatorId === simulator.id && s.class === "Probes",
              )
            : // Use the default if a system doesn't exist
              new Probes();
          return randomFromList(sys.types.map(t => t.id));
        },
      },
      equipment: {
        input: ({simulator}) => "probeEquipment",
        value: ({simulator}) => {
          const sys = simulator
            ? App.systems.find(
                s => s.simulatorId === simulator.id && s.class === "Probes",
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
                count: count > equipment.count ? equipment.count : count,
              };
            })
            .reduce((prev, next) => ({[next.id]: next.count}));
        },
      },
    },
    instructions({
      simulator,
      requiredValues: {preamble, equipment, probeType, system},
      task = {},
    }) {
      const station =
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ProbeConstruction"),
        );

      const sys = simulator
        ? App.systems.find(
            s => s.simulatorId === simulator.id && s.class === "Probes",
          )
        : // Use the default if a system doesn't exist
          new Probes();
      const equipmentText =
        Object.entries(equipment).length === 0
          ? ""
          : Object.entries(equipment)
              .map(([id, count]) => {
                const equipment = sys.equipment.find(
                  e => e.id === id || e.name.toLowerCase() === id.toLowerCase(),
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
          {simulator, system},
        );
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of probes"
        } to launch a ${probeTypeObj.name} probe${
          equipmentText.length > 0
            ? ` with the following equipment:\n\n${equipmentText})}`
            : ""
        }`,
        {simulator, system},
      );
    },
    verify({simulator, requiredValues: {equipment, probeType}}) {
      // Check if the probe is the right type and has all of the equipment.
      const sys = App.systems.find(
        s => s.simulatorId === simulator.id && s.class === "Probes",
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
    },
  },
  {
    name: "Perform Probe Query",
    class: "Probes",
    active({simulator}) {
      const probeSystem = App.systems.find(
        s => s.simulatorId === simulator.id && s.class === "Probes",
      );
      return (
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ProbeControl"),
        ) &&
        probeSystem
      );
    },
    stations({simulator}) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ProbeControl"),
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "We should use a probe to gather more information.",
      },
      query: {
        input: () => "text",
        value: () => "",
      },
    },
    instructions({
      simulator,
      requiredValues: {preamble, query, system},
      task = {},
    }) {
      const station =
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ProbeControl"),
        );

      if (station && task.station === station.name)
        return reportReplace(`${preamble} Perform a probe query: "${query}"`, {
          simulator,
          system,
        });
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of probes"
        } to perform a probe query: "${query}"`,
        {simulator, system},
      );
    },
    verify({simulator, requiredValues: {query}}) {
      const systems = App.systems.filter(
        s => s.simulatorId === simulator.id && s.class === "Probes",
      );
      // Create a fuzzy matcher
      const matcher = new Fuzz([query], {threshold: 0.2});
      return systems.find(s => {
        if (
          s.probes.find(
            probe => probe.querying && matcher.search(probe.query).length > 0,
          )
        )
          return true;
        return false;
      });
    },
  },
  {
    name: "Execute Science Probe Function",
    class: "Probes",
    active({simulator}) {
      const probeSystem = App.systems.find(
        s => s.simulatorId === simulator.id && s.class === "Probes",
      );
      return (
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ProbeConstruction"),
        ) &&
        probeSystem
      );
    },
    stations({simulator}) {
      return (
        simulator &&
        simulator.stations.filter(s =>
          s.cards.find(c => c.component === "ProbeConstruction"),
        )
      );
    },
    values: {
      preamble: {
        input: () => "textarea",
        value: () => "A science probe could perform a valuable function.",
      },
      type: {
        input: () =>
          scienceProbeTypes.map(p => ({
            value: p.id,
            label: `${p.name} ${capitalCase(p.type)}`,
          })),
        value: () => {
          const p = randomFromList(scienceProbeTypes);
          return p.id;
        },
      },
      charge: {
        input: () => ({type: "range", min: 0, max: 100}),
        value: () => Math.round(Math.random() * 100),
      },
    },
    instructions({
      simulator,
      requiredValues: {preamble, type, charge, system},
      task = {},
    }) {
      const station =
        simulator &&
        simulator.stations.find(s =>
          s.cards.find(c => c.component === "ProbeConstruction"),
        );

      const probeType = scienceProbeTypes.find(p => p.id === type);
      const typeLabel = `${probeType.name} ${capitalCase(probeType.type)}`;

      if (station && task.station === station.name)
        return reportReplace(
          `${preamble} Construct a science probe capable of ${typeLabel}. Then activate the ${typeLabel} at ${charge}% power.`,
          {
            simulator,
            system,
          },
        );
      return reportReplace(
        `${preamble} Ask the ${
          station ? `${station.name} Officer` : "person in charge of probes"
        } to construct a science probe capable of ${typeLabel}. Then activate the ${typeLabel} at ${charge}% power.`,
        {simulator, system},
      );
    },
    verify({simulator, requiredValues: {query}}) {
      // Cleared by an event.
    },
  },
];

// Science Burst
