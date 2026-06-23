import {Aegis_Mode, Aegis_Relay_Target} from "generated/graphql";

// Crew-facing label and one-line description for each swarm mode.
export const modeInfo: {
  mode: Aegis_Mode;
  label: string;
  description: string;
}[] = [
  {
    mode: Aegis_Mode.Screen,
    label: "Defensive Screen",
    description: "Tight orbit. Drones deflect incoming attacks.",
  },
  {
    mode: Aegis_Mode.Ecm,
    label: "Interference",
    description: "Wide erratic pattern. Jams enemy sensors and targeting.",
  },
  {
    mode: Aegis_Mode.Relay,
    label: "Sensor Relay",
    description: "Distributed halo. Extends sensor and comm range.",
  },
  {
    mode: Aegis_Mode.Repair,
    label: "Repair Swarm",
    description: "Hull-hugging clusters. Assists damage repair.",
  },
];

// Boost-target options for the Sensor Relay secondary control.
export const relayTargets: {target: Aegis_Relay_Target; label: string}[] = [
  {target: Aegis_Relay_Target.Sensors, label: "Sensors"},
  {target: Aegis_Relay_Target.Balanced, label: "Balanced"},
  {target: Aegis_Relay_Target.Comms, label: "Comms"},
];
