import uuid from "uuid";
import App from "../app";
import {
  partsList,
  defaultOptionalSteps,
  damagePositions,
  randomFromList
} from "../damageReports/constants";
import * as damageStepFunctions from "../damageReports/functions";

export function HeatMixin(inheritClass) {
  return class Heat extends inheritClass {
    constructor(params) {
      super(params);
      this.heat = params.heat || this.heat || 0;
      this.heatRate = params.heatRate || this.heatRate || 1;
      this.coolant = params.coolant || this.coolant || 1;
      this.cooling = params.cooling || false;
    }
    setHeat(heat) {
      this.heat = Math.min(1, Math.max(0, heat));
    }
    setCoolant(coolant) {
      this.coolant = Math.min(1, Math.max(0, coolant));
    }
    applyCoolant() {
      this.coolant = this.coolant - 0.037;
      this.heat = this.heat - 0.89;
    }
    cool(state = true) {
      this.cooling = state;
    }
  };
}

export class DamageStep {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "generic";
    this.args = params.args || {};
  }
  update({ name, args }) {
    if (name) this.name = name;
    if (args) this.args = Object.assign({}, this.args, args);
  }
}

export class System {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.class = "System";
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || null;
    this.displayName = params.displayName || params.name;
    this.power = Object.assign({}, params.power) || {
      power: 5,
      powerLevels: [5]
    };
    this.damage = Object.assign({}, params.damage) || {
      damaged: false,
      report: null,
      requested: false,
      reactivationCode: null,
      reactivationRequester: null,
      neededReactivationCode: null
    };
    this.extra = params.extra || false;
    this.locations = params.locations || [];
    this.requiredDamageSteps = [];
    this.optionalDamageSteps = [];
    params.requiredDamageSteps &&
      params.requiredDamageSteps.forEach(s =>
        this.requiredDamageSteps.push(new DamageStep(s))
      );
    params.optionalDamageSteps &&
      params.optionalDamageSteps.forEach(s =>
        this.optionalDamageSteps.push(new DamageStep(s))
      );
  }
  get stealthFactor() {
    return null;
  }
  updateName({ name, displayName }) {
    if (name || name === "") this.name = name;
    if (displayName || displayName === "") this.displayName = displayName;
  }
  updateLocations(locations) {
    this.locations = locations || [];
  }
  setPower(powerLevel) {
    this.power.power = powerLevel;
  }
  setPowerLevels(levels) {
    this.power.powerLevels = levels;
  }
  break(report) {
    this.damage.damaged = true;
    this.damage.report = this.processReport(report);
    this.damage.requested = false;
  }
  addDamageStep({ name, args, type }) {
    this[`${type}DamageSteps`].push(new DamageStep({ name, args }));
  }
  updateDamageStep({ id, name, args }) {
    const step =
      this.requiredDamageSteps.find(s => s.id === id) ||
      this.optionalDamageSteps.find(s => s.id === id);
    step.update({ name, args });
  }
  removeDamageStep(stepId) {
    // Check both required and optional
    this.requiredDamageSteps = this.requiredDamageSteps.filter(
      s => s.id !== stepId
    );
    this.optionalDamageSteps = this.optionalDamageSteps.filter(
      s => s.id !== stepId
    );
  }
  generateDamageReport(stepCount = 5) {
    const sim = App.simulators.find(s => s.id === this.simulatorId);
    const decks = App.decks.filter(d => d.simulatorId === this.simulatorId);
    const rooms = App.rooms.filter(r => this.locations.indexOf(r.id) > -1);
    const crew = App.crew.filter(c => c.simulatorId === this.simulatorId);
    // Get the damage team positions
    const damageTeamCrew = crew
      .map(c => c.position)
      .filter(c => damagePositions.indexOf(c) > -1)
      .filter((c, i, a) => a.indexOf(c) === i);
    const securityTeamCrew = crew
      .map(c => c.position)
      .filter(c => c.indexOf("Security") > -1);
    const stations = sim.stations;
    const components = stations.reduce((prev, s) => {
      return prev.concat(s.cards.map(c => c.component));
    }, []);

    const widgets = stations
      .reduce((prev, s) => {
        return prev.concat(s.widgets);
      }, [])
      .filter((c, i, a) => a.indexOf(c) !== i);
    const damageSteps = [];
    // Create a list of all the damage report steps
    // Remove power if the system has power
    if (
      this.power.powerLevels &&
      this.power.powerLevels.length > 0 &&
      components.indexOf("PowerDistribution") > -1
    ) {
      damageSteps.push({ name: "power", args: { end: false } });
    }

    // Add in any required damage steps at the start
    this.requiredDamageSteps
      .concat(sim.requiredDamageSteps)
      .filter(step => step.args.end !== true)
      .forEach(step => damageSteps.push(step));

    // Add in a number of optional steps
    const optionalSteps = defaultOptionalSteps
      .concat(this.optionalDamageSteps)
      .concat(sim.optionalDamageSteps)
      .filter(step => {
        if (step.name === "damageTeam") {
          return (
            damageTeamCrew.length > 0 &&
            this.locations.length > 0 &&
            components.indexOf("DamageTeams") > -1
          );
        }
        if (step.name === "damageTeamMessage") {
          return widgets.indexOf("messages") > -1;
        }
        if (step.name === "remoteAccess") {
          return widgets.indexOf("remote") > -1;
        }
        if (step.name === "sendInventory") {
          return (
            App.inventory.filter(
              i =>
                i.simulatorId === this.simulatorId && i.metadata.repair === true
            ).length > 0
          );
        }
        if (step.name === "longRangeMessage") {
          return (
            widgets.indexOf("composer") > -1 &&
            components.indexOf("LongRangeComm") > -1
          );
        }
        if (step.name === "probeLaunch") {
          return components.indexOf("ProbeConstruction") > -1;
        }
        if (step.name === "generic") return true;
        if (step.name === "securityTeam") {
          return (
            components.indexOf("SecurityTeams") > -1 &&
            securityTeamCrew.length > -1
          );
        }
        if (step.name === "securityEvac") {
          return components.indexOf("SecurityDecks") > -1 && decks.length > -1;
        }
        if (step.name === "internalCall") {
          return components.indexOf("CommInternal") > -1 && decks.length > -1;
        }
        return false;
      });

    let stepIteration = 0;

    // Start with a damage team, if possible
    if (optionalSteps.find(s => s.name === "damageTeam")) {
      damageSteps.push({ name: "damageTeam", args: {} });
      stepIteration = 1;
    }
    while (damageSteps.length < stepCount && stepIteration < 50) {
      // Ensure we don't infinitely loop
      stepIteration++;
      // Grab a random optional step
      const stepIndex = Math.floor(Math.random() * optionalSteps.length);
      if (optionalSteps.length > 0) {
        if (
          optionalSteps[stepIndex].name === "generic" ||
          !damageSteps.find(d => d.name === optionalSteps[stepIndex].name)
        ) {
          damageSteps.push(optionalSteps[stepIndex]);
        } else if (
          optionalSteps[stepIndex].name === "damageTeam" &&
          damageSteps.filter(d => d.name === "damageTeam").length === 1
        ) {
          // Clear the damage team
          damageSteps.push({ name: "damageTeam", args: { end: true } });
          // Add a cleanup team
          damageSteps.push({
            name: "damageTeam",
            args: { end: false, cleanup: true }
          });
        }
      }
    }

    // Finishing Steps
    // Add in any required damage steps at the end
    this.requiredDamageSteps
      .concat(sim.requiredDamageSteps)
      .filter(step => step.args.end === true)
      .forEach(step => damageSteps.push(step));

    // Clear out any damage teams
    if (damageSteps.find(d => d.name === "damageTeam")) {
      damageSteps.push({ name: "damageTeam", args: { end: true } });
    }
    // Add power if the system has power
    if (damageSteps.find(d => d.name === "power")) {
      damageSteps.push({ name: "power", args: { end: true } });
    }

    // Add the finishing step. Include reactivation code.
    damageSteps.push({ name: "finish", args: { reactivate: true } });

    // Now put together our damage report usign the damage step functions
    // Pick a location for the damage team
    const randomRoom = randomFromList(this.locations || []);
    const room = rooms.find(r => r.id === randomRoom);
    const deck = room && App.decks.find(d => d.id === room.deckId);
    const location = room
      ? `${room.name}, Deck ${deck.number}`
      : deck ? `Deck ${deck.number}` : `None`;
    // First create our context object
    const context = Object.assign(
      { damageSteps, simulator: sim, stations, deck, room, location, crew },
      this
    );
    const damageReport = damageSteps.reduce((prev, { name, args }, index) => {
      return `${prev}
Step ${index + 1}:
${damageStepFunctions[name](args || {}, context, index)}

`;
    }, "");
    return damageReport;
  }

  damageReport(report) {
    this.damage.report = this.processReport(report);
    this.damage.requested = false;
  }
  repair() {
    this.damage.damaged = false;
    this.damage.report = null;
    this.damage.requested = false;
    this.damage.neededReactivationCode = null;
    this.damage.reactivationCode = null;
    this.damage.reactivationRequester = null;
  }
  requestReport() {
    this.damage.requested = true;
  }
  reactivationCode(code, station) {
    this.damage.reactivationCode = code;
    this.damage.reactivationRequester = station;
  }
  reactivationCodeResponse(response) {
    this.damage.reactivationCode = null;
    this.damage.reactivationRequester = null;
    // For now, lets repair the station when it is accepted
    if (response) this.repair();
  }
  processReport(report) {
    this.damage.neededReactivationCode = null;
    if (!report) return;
    let returnReport = report;
    // #PART
    const partMatches = report.match(/#PART/gi) || [];
    partMatches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, "");
      const part = randomFromList(partsList);
      returnReport = splice(returnReport, index, 0, part);
    });

    // #COLOR
    const colorMatches = report.match(/#COLOR/gi) || [];
    colorMatches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, "");
      returnReport = splice(
        returnReport,
        index,
        0,
        randomFromList(["red", "blue", "green", "yellow"])
      );
    });

    // #[1 - 2]
    const matches =
      returnReport.match(/#\[ ?([0-9]+) ?- ?([0-9]+) ?\]/gi) || [];
    matches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, "");
      const numbers = m.replace(/[ [\]#]/gi, "").split("-");
      const num = Math.round(Math.random() * numbers[1] + numbers[0]);
      returnReport = splice(returnReport, index, 0, num);
    });

    // #["String1", "String2", "String3", etc.]
    const stringMatches =
      returnReport.match(/#\[ ?("|')[^\]]*("|') ?]/gi) || [];
    stringMatches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, "");
      const strings = m.match(/"(.*?)"/gi);
      returnReport = splice(
        returnReport,
        index,
        0,
        randomFromList(strings).replace(/"/gi, "")
      );
    });

    // #NUMBER
    const numberMatches = returnReport.match(/#NUMBER/gi) || [];
    const num = Math.round(Math.random() * 12 + 1);
    numberMatches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, "");
      returnReport = splice(returnReport, index, 0, num);
    });

    // #DECK
    const deckMatches = returnReport.match(/#DECK/gi) || [];
    const deck = Math.round(Math.random() * 14 + 1);
    deckMatches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, "");
      returnReport = splice(returnReport, index, 0, deck);
    });

    // #REACTIVATIONCODE
    if (report.indexOf("#REACTIVATIONCODE") > -1) {
      const reactivationCode = Array(8)
        .fill("")
        .map(() =>
          randomFromList(["¥", "Ω", "∏", "-", "§", "∆", "£", "∑", "∂"])
        )
        .join("");
      this.damage.neededReactivationCode = reactivationCode;
      returnReport = returnReport.replace(
        /#REACTIVATIONCODE/gi,
        reactivationCode
      );
    }

    return returnReport;
  }
}

function splice(str, start, delCount, newSubStr) {
  return (
    str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount))
  );
}
