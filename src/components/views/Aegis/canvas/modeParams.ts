import {Aegis_Mode, Aegis_Relay_Target} from "generated/graphql";
import {AegisControls, DroneParams} from "./types";

// Deterministic pseudo-random value for a drone index so formations are
// stable across renders and identical on every client.
export const seeded = (i: number, salt: number) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

// Orbit parameters for a drone in each mode. Radius is a multiple of the
// hull's extent at the drone's current screen angle; speed is radians per
// second. The crew's secondary controls reshape each mode's formation.
export function modeParams(
  mode: Aegis_Mode,
  i: number,
  count: number,
  controls: AegisControls,
): DroneParams {
  const spacing = (Math.PI * 2 * i) / Math.max(1, count);
  switch (mode) {
    case Aegis_Mode.Ecm: {
      // Higher jamming intensity spreads the swarm wider and faster
      const intensity = controls.ecmIntensity;
      return {
        radius: 1.8 + seeded(i, 1) * 0.9,
        speed:
          (0.5 + seeded(i, 2) * 0.6) *
          (0.7 + intensity * 0.8) *
          (seeded(i, 3) > 0.5 ? 1 : -1),
        inclination: seeded(i, 4) * Math.PI,
        node: seeded(i, 5) * Math.PI * 2,
        phaseOffset: seeded(i, 8) * Math.PI * 2,
        jitter: 0.06 + intensity * 0.2,
        conform: 0.5,
      };
    }
    case Aegis_Mode.Relay: {
      // Sensors: flat wide listening disc. Comms: upright transmission ring.
      const inclination =
        controls.relayTarget === Aegis_Relay_Target.Sensors
          ? 1.5
          : controls.relayTarget === Aegis_Relay_Target.Comms
          ? 0.25
          : 0.4;
      const radiusBonus =
        controls.relayTarget === Aegis_Relay_Target.Comms ? 0.2 : 0;
      return {
        radius: 2.2 + (i % 2) * 0.3 + radiusBonus,
        speed: 0.25 * (i % 2 === 0 ? 1 : -1),
        inclination,
        node: 0,
        phaseOffset: spacing,
        jitter: 0,
        conform: 0.35,
      };
    }
    case Aegis_Mode.Repair:
      return {
        radius: 1.05 + (i % 3) * 0.1,
        speed: 0.35 * (0.6 + controls.repairEffort) * (i % 2 === 0 ? 1 : -1),
        inclination: Math.PI / 2 - 0.4 + seeded(i, 6) * 0.8,
        node: Math.floor(i / 4) * (Math.PI / 7),
        phaseOffset: (i % 4) * 0.4,
        jitter: 0.02,
        conform: 1,
      };
    case Aegis_Mode.Screen:
    default: {
      // Pull each drone's orbit plane toward the crew's focus direction so
      // the screen huddles to that side while still orbiting
      const focusMag = Math.min(
        1,
        Math.hypot(controls.focusX, controls.focusY),
      );
      let node = spacing;
      if (focusMag > 0) {
        const focusAngle = Math.atan2(controls.focusY, controls.focusX);
        const delta = Math.atan2(
          Math.sin(focusAngle - spacing),
          Math.cos(focusAngle - spacing),
        );
        node = spacing + delta * 0.9 * focusMag;
      }
      return {
        // Focused screens pull tighter and orbit faster for a dramatic huddle
        radius: (1.25 + (i % 4) * 0.12) * (1 - 0.2 * focusMag),
        speed: 1.1 * (1 + 0.4 * focusMag),
        inclination: 0.6 + seeded(i, 7) * 0.9,
        node,
        phaseOffset: spacing,
        jitter: 0,
        conform: 0.85,
      };
    }
  }
}
