import uuid from "uuid";
import App from "../app";
import {System} from "./generic";

export default class Exocomp extends System {
  state: "idle" | "deploying" | "returning" | "repairing";
  completion: number;
  parts: string[];
  destination: string | null;
  logs: {timestamp: number; message: string}[];
  difficulty: number;
  // @ts-expect-error This should be renamed someday
  upgrade: boolean;
  constructor(params: Partial<Exocomp> = {}) {
    super(params);
    this.name = "Exocomp";
    this.displayName = "Exocomp";
    this.id = params.id || uuid.v4();
    this.class = "Exocomp";
    if (!params.simulatorId) throw new Error("Simulator is required");
    this.simulatorId = params.simulatorId;
    // idle, deploying, returning, repairing
    this.state = params.state || "idle";
    this.completion = params.completion || 0;
    this.parts = params.parts || [];
    // Destination refers to a system
    this.destination = params.destination || null;
    this.logs = params.logs || [];
    this.difficulty = params.difficulty || 0.05;
    this.upgrade = params.upgrade || false;

    this.power = null;
  }
  break(report, destroyed, which) {
    this.state = "idle";
    this.parts = [];
    this.completion = 0;
    this.destination = null;
    this.upgrade = false;
    super.break(report, destroyed, which);
  }
  updateState(state) {
    this.state = state;
    const system = App.systems.find(s => s.id === this.destination) || {};
    let message;
    if (state === "idle") {
      message = "Returned to base.";
    }
    if (state === "deploying") {
      message = `Deployed to repair ${system.displayName || system.name}.`;
    }
    if (state === "repairing") {
      message = `Repairing ${system.displayName || system.name}`;
    }
    if (state === "returning") {
      message = `Returning to base.`;
    }
    if (state === "upgrading") {
      message = `Ready to upgrade.`;
    }
    this.logs.push({
      timestamp: Date.now(),
      message,
    });
  }
  updateDifficulty(diff) {
    this.difficulty = Math.min(1, Math.max(0, diff));
  }
  updateCompletion(completion) {
    this.completion = completion;
  }
  deploy({destination, parts, upgrade}) {
    this.completion = 0;
    this.destination = destination;
    this.parts = parts;
    this.upgrade = upgrade;
    this.updateState("deploying");
  }
  recall() {
    if (this.state !== "returning") {
      this.completion = 0;
      this.destination = null;
      this.parts = [];
      this.upgrade = false;
      this.updateState("returning");
    }
  }
}
