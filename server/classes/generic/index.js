import uuid from "uuid";
import App from "../../app";
import {
  defaultOptionalSteps,
  damagePositions,
  randomFromList
} from "./damageReports/constants";
import * as damageStepFunctions from "./damageReports/functions";
import processReport from "./processReport";
import DamageStep from "./damageStep";

class Damage {
  constructor(params = {}) {
    this.damaged = params.damaged || false;
    this.report = params.report || null;
    this.reportSteps = params.reportSteps || null;
    this.requested = params.requested || false;
    this.currentStep = params.currentStep || 0;
    this.reactivationCode = params.reactivationCode || null;
    this.reactivationRequester = params.reactivationRequester || null;
    this.neededReactivationCode = params.neededReactivationCode || null;
    this.exocompParts = params.exocompParts || [];
    this.validate = params.validate || false;
    this.destroyed = params.destroyed || false;
  }
}
export class System {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.class = "System";
    this.type = "System";
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || null;
    this.displayName = params.displayName || params.name;
    this.power = params.power
      ? Object.assign({}, params.power)
      : {
          power: 5,
          powerLevels: params.extra ? [] : [5],
          defaultLevel: 0
        };
    this.damage = new Damage(params.damage || {});
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
  trainingMode() {
    return;
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
    if (this.power.defaultLevel >= levels.length) {
      this.power.defaultLevel = levels.length - 1;
    }
  }
  setDefaultPowerLevel(level) {
    this.power.defaultLevel = level;
  }
  break(report, destroyed) {
    this.damage.damaged = true;
    if (destroyed) this.damage.destroyed = true;
    this.damage.report = processReport(report, this);
    this.damage.requested = false;
    this.damage.currentStep = 0;
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

    //
    // Gather Information
    //

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

    //
    // Create a list of all the damage report steps
    //

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
    let optionalSteps = defaultOptionalSteps
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
          return widgets.indexOf("messages") > -1 && damageTeamCrew.length > 0;
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
            components.indexOf("LongRangeComm") > -1 &&
            this.class !== "LongRangeComm"
          );
        }
        if (step.name === "probeLaunch") {
          return (
            components.indexOf("ProbeConstruction") > -1 &&
            this.class !== "Probes"
          );
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
          return (
            components.indexOf("CommInternal") > -1 &&
            decks.length > -1 &&
            this.class !== "InternalComm"
          );
        }
        if (step.name === "exocomps") {
          return (
            components.indexOf("Exocomps") > -1 &&
            App.exocomps.find(e => e.simulatorId === sim.id)
          );
        }
        if (step.name === "softwarePanel") {
          return App.softwarePanels.find(e => e.simulatorId === sim.id);
        }
        if (step.name === "computerCore") {
          return components.indexOf("ComputerCore") > -1;
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
          if (optionalSteps[stepIndex].name !== "damageTeam") {
            // We need to remove this optional step from the list so it is not repeated;
            // Keep damage teams so we can get a cleanup team.
            optionalSteps = optionalSteps.filter((_, i) => i !== stepIndex);
          }
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
      : deck
        ? `Deck ${deck.number}`
        : `None`;
    // First create our context object
    const context = Object.assign(
      { damageSteps, simulator: sim, stations, deck, room, location, crew },
      this
    );
    const damageReport = damageSteps
      .map((d, index) => ({
        ...d,
        report: damageStepFunctions[d.name](d.args || {}, context, index)
      }))
      .filter(f => f.report)
      .reduce((prev, { report }, index) => {
        return `${prev}
Step ${index + 1}:
${report}

`;
      }, "");
    return damageReport;
  }

  damageReport(report) {
    this.damage.report = processReport(report, this);
    this.damage.requested = false;
  }
  repair() {
    this.damage.damaged = false;
    this.damage.destroyed = false;
    this.damage.report = null;
    this.damage.requested = false;
    this.damage.neededReactivationCode = null;
    this.damage.reactivationCode = null;
    this.damage.reactivationRequester = null;
    this.damage.exocompParts = [];
    this.damage.currentStep = 0;
  }
  updateCurrentStep(step) {
    this.damage.currentStep = step;
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
}
