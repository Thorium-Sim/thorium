import uuid from "uuid";
import {System} from "./generic";

export type AegisMode = "screen" | "ecm" | "relay" | "repair";
export type AegisRelayTarget = "sensors" | "balanced" | "comms";

export interface AegisLogEntry {
  id: string;
  timestamp: string;
  type: string;
  contents: string;
}

// How many deployed drones it takes for the swarm to reach full
// effectiveness (mitigation coverage, relay boost, repair rate)
export const AEGIS_FULL_COVERAGE = 60;
// Most damage a fully-crewed, perfectly-focused screen can absorb
const MAX_MITIGATION = 0.85;
// Drones sacrificed per unit of absorbed damage
const DRONE_LOSS_FACTOR = 40;
const LOG_LIMIT = 50;

export default class Aegis extends System {
  maxDrones: number;
  droneCount: number;
  deployed: boolean;
  mode: AegisMode;
  fabricating: boolean;
  fabricationPaused: boolean;
  fabricationProgress: number;
  attritionEnabled: boolean;
  structuralIntegrity: number;
  screenFocus: {x: number; y: number};
  ecmIntensity: number;
  relayTarget: AegisRelayTarget;
  repairEffort: number;
  log: AegisLogEntry[];
  constructor(params: any = {}) {
    super({name: "Aegis System", displayName: "Aegis System", ...params});
    this.class = "Aegis";
    this.type = "Aegis";
    this.wing = params.wing || "right";
    this.maxDrones = params.maxDrones || 120;
    this.droneCount = params.droneCount || 0;
    this.deployed = params.deployed || false;
    this.mode = params.mode || "screen";
    this.fabricating = params.fabricating || false;
    this.fabricationPaused = params.fabricationPaused || false;
    this.fabricationProgress = params.fabricationProgress || 0;
    this.attritionEnabled = params.attritionEnabled ?? true;
    this.structuralIntegrity = params.structuralIntegrity ?? 1;
    this.screenFocus = params.screenFocus || {x: 0, y: 0};
    this.ecmIntensity = params.ecmIntensity ?? 0.5;
    this.relayTarget = params.relayTarget || "balanced";
    this.repairEffort = params.repairEffort ?? 0.5;
    this.log = params.log || [];
  }
  get stealthFactor() {
    if (this.deployed && this.mode === "ecm") {
      return 0.2 + this.ecmIntensity * 0.6;
    }
    if (this.deployed) {
      return 0.15;
    }
    return 0.05;
  }
  setMode(mode: AegisMode) {
    this.mode = mode;
  }
  deploy() {
    if (this.droneCount === 0) {
      return;
    }
    this.deployed = true;
  }
  recall() {
    this.deployed = false;
  }
  startFabrication() {
    if (this.droneCount >= this.maxDrones) {
      return;
    }
    this.fabricating = true;
  }
  stopFabrication() {
    this.fabricating = false;
  }
  pauseFabrication(paused: boolean) {
    this.fabricationPaused = paused;
  }
  setAttrition(enabled: boolean) {
    this.attritionEnabled = enabled;
  }
  destroyDrone() {
    this.droneCount = Math.max(0, this.droneCount - 1);
    if (this.droneCount === 0) {
      this.deployed = false;
    }
  }
  setDroneCount(count: number) {
    this.droneCount = Math.max(0, Math.min(this.maxDrones, count));
    if (this.droneCount === 0) {
      this.deployed = false;
    }
  }
  setMaxDrones(count: number) {
    this.maxDrones = Math.max(1, count);
    this.droneCount = Math.min(this.droneCount, this.maxDrones);
  }
  setStructuralIntegrity(integrity: number) {
    this.structuralIntegrity = Math.min(1, Math.max(0, integrity));
  }
  setScreenFocus(x: number, y: number) {
    this.screenFocus = {
      x: Math.min(1, Math.max(-1, x)),
      y: Math.min(1, Math.max(-1, y)),
    };
  }
  setEcmIntensity(intensity: number) {
    this.ecmIntensity = Math.min(1, Math.max(0, intensity));
  }
  setRelayTarget(target: AegisRelayTarget) {
    this.relayTarget = target;
  }
  setRepairEffort(effort: number) {
    this.repairEffort = Math.min(1, Math.max(0, effort));
  }
  addLog(type: string, contents: string) {
    this.log.unshift({
      id: uuid.v4(),
      timestamp: new Date().toISOString(),
      type,
      contents,
    });
    this.log = this.log.slice(0, LOG_LIMIT);
  }
  clearLog() {
    this.log = [];
  }
  // Apply an incoming structural hit from the given bearing (degrees,
  // 0 = fore, clockwise). A deployed defensive screen absorbs part of the
  // damage — more when the crew's focus is pointed at the attack — at the
  // cost of drones, and the outcome is recorded in the impact log.
  applyStructuralHit(amount: number, bearing: number) {
    const rad = (bearing * Math.PI) / 180;
    const attack = {x: Math.sin(rad), y: -Math.cos(rad)};
    let mitigation = 0;
    let dronesLost = 0;
    if (this.deployed && this.mode === "screen" && this.droneCount > 0) {
      const coverage = Math.min(1, this.droneCount / AEGIS_FULL_COVERAGE);
      const focusMag = Math.min(
        1,
        Math.hypot(this.screenFocus.x, this.screenFocus.y),
      );
      const alignment =
        focusMag === 0
          ? 0
          : (this.screenFocus.x / focusMag) * attack.x +
            (this.screenFocus.y / focusMag) * attack.y;
      mitigation = Math.min(
        MAX_MITIGATION,
        Math.max(0, coverage * (0.4 + 0.35 * alignment * focusMag)),
      );
      dronesLost = Math.min(
        this.droneCount,
        Math.max(1, Math.round(amount * mitigation * DRONE_LOSS_FACTOR)),
      );
      for (let i = 0; i < dronesLost; i++) {
        this.destroyDrone();
      }
    }
    const applied = amount * (1 - mitigation);
    this.setStructuralIntegrity(this.structuralIntegrity - applied);
    const integrityPercent = Math.round(this.structuralIntegrity * 100);
    if (mitigation > 0) {
      this.addLog(
        "screen",
        `Defensive screen absorbed ${Math.round(
          mitigation * 100,
        )}% of an incoming impact (${dronesLost} drone${
          dronesLost === 1 ? "" : "s"
        } lost). Structural integrity at ${integrityPercent}%.`,
      );
    } else {
      this.addLog(
        "damage",
        `Direct structural impact — no defensive screen. Structural integrity at ${integrityPercent}%.`,
      );
    }
    if (this.structuralIntegrity === 0) {
      this.addLog("critical", "Structural integrity field has collapsed.");
    }
    return {applied, mitigation, dronesLost};
  }
  break(report: string, destroyed: boolean, which: string = "default") {
    this.deployed = false;
    this.fabricating = false;
    this.fabricationProgress = 0;
    super.break(report, destroyed, which);
  }
}
