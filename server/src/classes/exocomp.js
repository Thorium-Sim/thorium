import uuid from "uuid";
import App from "../app";
import { randomFromList } from "./generic/damageReports/constants";

export default class Exocomp {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Exocomp";
    this.simulatorId = params.simulatorId;
    // idle, deploying, returning, repairing
    this.state = params.state || "idle";
    this.completion = params.completion || 0;
    this.parts = params.parts || [];
    // Destination refers to a system
    this.destination = params.destination || null;
    this.logs = params.logs || [];
    this.difficulty = params.difficulty || 0.05;
  }
  static tasks = [
    {
      name: "Send Exocomp",
      active({ simulator, stations }) {
        // Check cards
        return (
          stations.find(s => s.cards.find(c => c.component === "Exocomps")) &&
          App.exocomps.filter(e => e.simulatorId === simulator.id).length > 0
        );
      },
      values: {
        destination: {
          input: ({ simulator }) =>
            simulator
              ? App.systems
                  .filter(s => s.simulatorId === simulator.id)
                  .map(s => ({ key: s.id, label: s.displayName || s.name }))
              : "text",
          value: ({ simulator }) =>
            randomFromList(
              App.systems
                .filter(s => s.simulatorId === simulator.id)
                .map(s => s.displayName || s.name)
            )
        }
      },
      verify({ simulator }) {
        // TODO: Figure out a way to verify that the exocomp was deployed properly
        return false;
      }
    }
  ];
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
    this.logs.push({
      timestamp: Date.now(),
      message
    });
  }
  updateDifficulty(diff) {
    this.difficulty = Math.min(1, Math.max(0, diff));
  }
  updateCompletion(completion) {
    this.completion = completion;
  }
  deploy({ destination, parts }) {
    this.completion = 0;
    this.destination = destination;
    this.parts = parts;
    this.updateState("deploying");
  }
  recall() {
    if (this.state !== "returning") {
      this.completion = 0;
      this.destination = null;
      this.parts = [];
      this.updateState("returning");
    }
  }
}
