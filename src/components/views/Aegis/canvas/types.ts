import {Aegis_Mode, Aegis_Relay_Target} from "generated/graphql";

// Orbit shape for a single drone. The animation lerps each drone's live
// params toward the target params for its current mode, so formation changes
// are smooth rather than instantaneous.
export interface DroneParams {
  radius: number;
  speed: number;
  inclination: number;
  node: number;
  phaseOffset: number;
  jitter: number;
  // How strongly the path follows the hull silhouette (1 = hug the outline,
  // 0 = circular orbit at the hull's average extent).
  conform: number;
}

export interface Drone {
  phase: number;
  params: DroneParams;
  // 0..1 ease used when the swarm launches/recalls (drives orbit radius)
  deployFactor: number;
  // 0..1 ease used when a drone fabricates in or is destroyed (drives alpha)
  lifeFactor: number;
}

// The crew's secondary-control values, mirrored into the animation loop.
export interface AegisControls {
  focusX: number;
  focusY: number;
  ecmIntensity: number;
  relayTarget: Aegis_Relay_Target;
  repairEffort: number;
}

// Snapshot of the system state the draw loop reads each frame.
export interface DrawState {
  mode: Aegis_Mode;
  droneCount: number;
  maxDrones: number;
  deployed: boolean;
  structuralIntegrity: number;
  controls: AegisControls;
}

// A transient ship action surfaced to the canvas (transmission, scan, sonar,
// or structural impact). Pushed in via the imperative handle below.
export interface AegisPingEvent {
  pingType: string;
  strength: number;
  bearing: number | null;
}

export interface AegisCanvasHandle {
  addPing: (ping: AegisPingEvent) => void;
}

// A ping with the timestamp it was received, used to drive its animation.
export interface ActivePing extends AegisPingEvent {
  start: number;
}

// The currently-active structural impact (if any) plus its derived geometry,
// so the swarm and hull can react to it without recomputing per drone.
export interface ImpactState {
  impact: ActivePing | undefined;
  angle: number;
  pulse: number;
}

// Canvas geometry recomputed each frame from the measured element size.
export interface Geometry {
  cx: number;
  cy: number;
  shipRadius: number;
  width: number;
  height: number;
}

// A drone resolved to screen space, ready to z-sort and draw.
export interface Renderable {
  x: number;
  y: number;
  depth: number;
  alpha: number;
  scale: number;
  // 0..1 heat from a nearby impact; tints the drone and enlarges it
  flare: number;
}

// RGB triples (as "r, g, b" strings) for each kind of expanding action ring
export const PING_COLORS: {[key: string]: string} = {
  comm: "255, 205, 120",
  scan: "120, 215, 255",
  sonar: "150, 255, 200",
};
// Seconds an expanding action ring stays on screen
export const RING_PING_DURATION = 1.8;
// Seconds a structural impact flare lasts
export const IMPACT_PING_DURATION = 0.9;
