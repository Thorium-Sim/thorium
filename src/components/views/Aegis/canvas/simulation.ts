import {Aegis_Mode} from "generated/graphql";
import {modeParams, seeded} from "./modeParams";
import {sampleProfile, FALLBACK_HULL} from "./shipImage";
import {
  ActivePing,
  Drone,
  DrawState,
  Geometry,
  ImpactState,
  IMPACT_PING_DURATION,
  Renderable,
} from "./types";

// Per-frame easing rates (already converted from time constants)
interface Rates {
  param: number;
  deploy: number;
  life: number;
}

// How far around the impact bearing (radians) the swarm reacts
const IMPACT_CONE = 1.1;

// Add drones to the pool until it matches the configured fleet size. New
// drones start docked (deploy/life factor 0) and ease out from the ship.
export function growDronePool(drones: Drone[], state: DrawState) {
  while (drones.length < state.maxDrones) {
    const i = drones.length;
    drones.push({
      phase: seeded(i, 9) * Math.PI * 2,
      params: modeParams(state.mode, i, state.maxDrones, state.controls),
      deployFactor: 0,
      lifeFactor: 0,
    });
  }
}

// Smoothly drift the whole screen formation toward the crew's focus side.
export function updateFocusOffset(
  focusOffset: {x: number; y: number},
  state: DrawState,
  paramRate: number,
) {
  const focusing = state.mode === Aegis_Mode.Screen && state.deployed;
  const targetX = focusing ? state.controls.focusX * 0.6 : 0;
  const targetY = focusing ? state.controls.focusY * 0.6 : 0;
  focusOffset.x += (targetX - focusOffset.x) * paramRate;
  focusOffset.y += (targetY - focusOffset.y) * paramRate;
}

// Find the active structural impact, if any, and derive the screen-space
// angle it came from plus a 0..1 pulse that fades over the flare's lifetime.
export function resolveImpact(pings: ActivePing[], now: number): ImpactState {
  const impact = pings.find(
    ping =>
      ping.pingType === "impact" &&
      (now - ping.start) / 1000 < IMPACT_PING_DURATION,
  );
  if (!impact) {
    return {impact: undefined, angle: 0, pulse: 0};
  }
  // Bearing is degrees (0 = fore, clockwise); convert to a screen angle
  const angle =
    impact.bearing !== null
      ? Math.atan2(
          -Math.cos((impact.bearing * Math.PI) / 180),
          Math.sin((impact.bearing * Math.PI) / 180),
        )
      : 0;
  const pulse = 1 - (now - impact.start) / 1000 / IMPACT_PING_DURATION;
  return {impact, angle, pulse};
}

// 0..1 heat for a drone based on how close it is to the impact bearing.
function impactFlare(px: number, py: number, impact: ImpactState) {
  if (!impact.impact) {
    return 0;
  }
  const droneAngle = Math.atan2(py, px);
  const angleDiff = Math.abs(
    Math.atan2(
      Math.sin(droneAngle - impact.angle),
      Math.cos(droneAngle - impact.angle),
    ),
  );
  if (angleDiff >= IMPACT_CONE) {
    return 0;
  }
  return impact.pulse * (1 - angleDiff / IMPACT_CONE) * 1.2;
}

// Advance every drone one frame and resolve it to screen space. Mutates the
// drone objects (phase, params, ease factors) and returns the drawable list.
export function buildRenderables(params: {
  drones: Drone[];
  state: DrawState;
  hullProfile: {profile: number[]; avg: number} | null;
  focusOffset: {x: number; y: number};
  impact: ImpactState;
  geometry: Geometry;
  rates: Rates;
  dt: number;
  t: number;
}): Renderable[] {
  const {
    drones,
    state,
    hullProfile,
    focusOffset,
    impact,
    geometry,
    rates,
    dt,
    t,
  } = params;
  const {cx, cy, shipRadius} = geometry;
  const renderable: Renderable[] = [];

  drones.forEach((drone, i) => {
    const active = i < state.droneCount;
    const target = modeParams(
      state.mode,
      i,
      Math.max(1, state.droneCount),
      state.controls,
    );

    // Newly fabricated drones launch from the ship instead of popping in
    if (active && state.deployed && drone.lifeFactor < 0.05) {
      drone.deployFactor = 0;
    }

    // Ease the live orbit params toward the current mode's target
    const p = drone.params;
    (Object.keys(p) as (keyof typeof p)[]).forEach(key => {
      p[key] += (target[key] - p[key]) * rates.param;
    });
    drone.phase += p.speed * dt;
    const wantDeployed = state.deployed && active ? 1 : 0;
    drone.deployFactor += (wantDeployed - drone.deployFactor) * rates.deploy;
    // Drones fade out both when destroyed and when recalled, so a recalled
    // swarm vanishes as it dives back toward the ship
    drone.lifeFactor += (wantDeployed - drone.lifeFactor) * rates.life;

    if (drone.lifeFactor < 0.01) {
      return;
    }

    const angle = drone.phase + p.phaseOffset;
    const r = p.radius * drone.deployFactor;
    // Point on the orbit circle, tilted by inclination, then rotated around
    // the screen normal by the node angle
    const ox = Math.cos(angle) * r;
    const oy = Math.sin(angle) * r;
    const ty = oy * Math.cos(p.inclination);
    const depth =
      Math.sin(angle) * Math.sin(p.inclination) +
      p.jitter * Math.sin(t * 1.7 + i * 5.9);
    const sx = ox * Math.cos(p.node) - ty * Math.sin(p.node);
    const sy = ox * Math.sin(p.node) + ty * Math.cos(p.node);

    // Scale the planar offset by how far the hull actually extends toward
    // this screen angle, so paths trace long or wide ships rather than a
    // fixed circle
    const hull = hullProfile;
    const hullDist = hull
      ? hull.avg +
        (sampleProfile(hull.profile, Math.atan2(sy, sx)) - hull.avg) * p.conform
      : FALLBACK_HULL;
    const jx = p.jitter * Math.sin(t * 2.1 + i * 7.3);
    const jy = p.jitter * Math.sin(t * 2.7 + i * 3.1);
    const px = sx * hullDist + jx + focusOffset.x * drone.deployFactor;
    const py = sy * hullDist + jy + focusOffset.y * drone.deployFactor;

    // Drones near an incoming impact flare hot and get shoved outward as they
    // absorb it — the impact reads through the swarm itself
    const flare = drone.deployFactor > 0.5 ? impactFlare(px, py, impact) : 0;
    const shove = 1 + flare * 0.3;

    renderable.push({
      x: cx + px * shipRadius * shove,
      y: cy + py * shipRadius * shove,
      depth,
      alpha:
        (0.45 + (0.55 * (depth + 1)) / 2) *
          drone.lifeFactor *
          Math.min(1, drone.deployFactor * 3 + 0.15) +
        flare,
      scale: (0.6 + (0.4 * (depth + 1)) / 2) * (1 + flare * 0.5),
      flare,
    });
  });

  return renderable;
}
