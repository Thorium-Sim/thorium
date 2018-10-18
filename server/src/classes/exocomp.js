import uuid from "uuid";
import App from "../app";
import { randomFromList, partsList } from "./generic/damageReports/constants";
import reportReplace from "../helpers/reportReplacer";

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
      active({ simulator }) {
        if (!simulator) return false;
        // Check cards
        return (
          simulator.stations.find(s =>
            s.cards.find(c => c.component === "Exocomps")
          ) &&
          App.exocomps.filter(e => e.simulatorId === simulator.id).length > 0
        );
      },
      stations({ simulator }) {
        return (
          simulator &&
          simulator.stations.filter(s =>
            s.cards.find(c => c.component === "Exocomps")
          )
        );
      },
      values: {
        preamble: {
          input: () => "textarea",
          value: () => "An expocomp must be sent to operate on a system."
        },
        destination: {
          input: ({ simulator }) =>
            simulator
              ? App.systems
                  .filter(s => s.simulatorId === simulator.id)
                  .map(s => ({ value: s.id, label: s.displayName || s.name }))
              : "text",
          value: ({ simulator }) =>
            simulator
              ? randomFromList(
                  App.systems
                    .filter(s => s.simulatorId === simulator.id)
                    .map(s => s.id)
                )
              : ""
        },
        parts: {
          input: () => "partsPicker",
          value: () =>
            Array(Math.round(Math.random() * 3 + 1))
              .fill(0)
              .map(() => randomFromList(partsList))
        }
      },
      instructions({
        simulator,
        requiredValues: { preamble, destination, parts },
        task = {}
      }) {
        const station = simulator.stations.find(s =>
          s.cards.find(c => c.component === "Exocomps")
        );
        const system = App.systems.find(s => s.id === destination);
        if (station && task.station === station.name)
          return reportReplace(
            `${preamble} Send an exocomp to the #SYSTEMNAME with the following parts: ${parts.join(
              ", "
            )}.`,
            { system, simulator }
          );
        return reportReplace(
          `${preamble} Ask the ${
            station ? `${station.name} Officer` : "person in charge of exocomps"
          } to send an exocomp to the #SYSTEMNAME with the following parts: ${parts.join(
            ", "
          )}.`,
          { system, simulator }
        );
      },
      verify({ simulator, requiredValues }) {
        const exocomps = App.exocomps.filter(s => s.id === simulator.id);
        return exocomps.find(e => {
          if (e.destination !== requiredValues.destination) return false;
          // Figuring out parts is hard, especially when a system needs to have multiple parts
          // provided. There probably needs to be a property added to the system to collect parts.
          //if (requiredValues.filter(v => ).length > 0) return false;
          return true;
        });
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
