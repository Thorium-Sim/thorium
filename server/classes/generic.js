import uuid from "uuid";
import App from "../app";

const defaultPower = {
  power: 5,
  powerLevels: [5]
};

const defaultDamage = {
  damaged: false,
  report: null,
  requested: false,
  reactivationCode: null,
  reactivationRequester: null,
  neededReactivationCode: null
};

const defaultOptionalSteps = [
  { name: "damageTeam" },
  { name: "remoteAccess" },
  { name: "damageTeamMessage" },
  { name: "sendInventory" },
  { name: "longRangeMessage" },
  { name: "probeLaunch" }
];

const damageStepFunctions = {
  power: ({ end }, context, index) => {},
  damageTeam: ({ end, cleanup, name, orders, room, officers }, context) => {},
  damageTeamMessage: ({ message }, context, index) => {},
  remoteAccess: ({ code }, context, index) => {},
  sendInventory: ({ inventory, room }, context, index) => {},
  longRangeMessage: ({ message, destination }, context, index) => {},
  probeLaunch: ({ equipment, query }, context, index) => {},
  generic: ({ message }, context, index) => {},
  finish: ({ reactivate }, context, index) => {}
};
/*
  Damage Report Steps:
    -- Power
    -- Remote Access
    Panel Switch
    -- Damage Control Team
      Officers
      Orders
      Team Name
      Deck/Room
    -- Damage Control Team Message
    Security Evac
    Security Bulkhead
    Security Team
    Alert Level
    -- Send parts
    Internal Call
      Shut off the system/Restart the system
      
    -- Long Range Message
    -- Probe Launch
    -- Reactivation Code
    Add Computer User
    Environment
    Exocomp
    Generic
*/

const damagePositions = [
  "Computer Specialist",
  "Custodian",
  "Quality Assurance",
  "Electrician",
  "Explosive Expert",
  "Fire Control",
  "General Engineer",
  "Hazardous Waste Expert",
  "Maintenance Officer",
  "Mechanic",
  "Plumber",
  "Structural Engineer",
  "Welder"
];

export function HeatMixin(inheritClass) {
  return class Heat extends inheritClass {
    constructor(params) {
      super(params);
      this.heat = params.heat || this.heat || 0;
      this.heatRate = params.heatRate || this.heatRate || 1;
      this.coolant = params.coolant || this.coolant || 1;
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
  };
}

export class System {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || null;
    this.displayName = params.displayName || params.name;
    this.power = params.power || defaultPower;
    this.damage = params.damage || defaultDamage;
    this.extra = params.extra || false;
    this.locations = params.locations || [];

    // Damage steps are objects which look like this:
    /*
        {
          name: 'damageStepName',
          args: { end: true, arg1: true, arg2: false}
        }
    */
    this.requiredDamageSteps = params.requiredDamageSteps || [];
    this.optionalDamageSteps = params.optionalDamageSteps || [];
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
    // TODO: Generate the damage report if
    // The report is null or blank.
    this.damage.damaged = true;
    this.damage.report = this.processReport(report);
    this.damage.requested = false;
  }
  generateDamageReport(stepCount = 5) {
    const sim = App.simulators.find(s => s.id === this.simulatorId);
    const rooms = App.rooms.filter(r => this.locations.indexOf(r.id) > -1);
    const crew = App.crew.filter(c => c.simulatorId === this.simulatorId);
    // Get the damage team positions
    const damageTeamCrew = crew
      .map(c => c.position)
      .filter(c => damagePositions.indexOf(c) > -1)
      .filter((c, i, a) => a.indexOf(c) === i);
    const stations = sim.stations;
    const components = stations
      .reduce(s => {
        return prev.concat(s.cards.map(c => c.component));
      }, [])
      .filter((c, i, a) => a.indexOf(c) !== i);

    const widgets = stations
      .reduce(s => {
        return prev.concat(s.widgets);
      }, [])
      .filter((c, i, a) => a.indexOf(c) !== i);
    const damageSteps = [];
    // Create a list of all the damage report steps
    // Remove power if the system has power
    if (
      this.power.powerLevels.length > 0 &&
      components.indexOf("PowerDistribution") > -1
    ) {
      damageSteps.push({ name: "power", args: { end: false } });
    }

    // Add in any required damage steps at the start
    this.requiredDamageSteps
      .filter(step => step.args.end !== true)
      .forEach(step => damageSteps.push(step));

    // Add in a number of optional steps
    const optionalSteps = defaultOptionalSteps
      .concat(this.optionalDamageSteps)
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
        return false;
      });
    let stepIteration = 0;
    while (damageSteps.length < stepCount || stepIteration < 50) {
      // Ensure we don't infinitely loop
      stepIteration++;

      // Grab a random optional step
      const stepIndex = Math.floor(Math.random() * optionalSteps.length);
      if (!damageSteps.find(d => d.name === optionalSteps[stepIndex].name)) {
        damageSteps.push(optionalDamageSteps[stepIndex]);
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

    // Finishing Steps
    // Add in any required damage steps at the end
    this.requiredDamageSteps
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
    // First create our context object
    const context = Object.assign(
      { damageSteps, simulator, stations, rooms, crew },
      this
    );
    const damageReport = damageSteps.reduce((prev, { name, args }, index) => {
      return prev + damageStepFunctions(args, context, index);
    }, "");
    return processReport(damageReport);
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
        .map(_ => randomFromList(["¥", "Ω", "∏", "-", "§", "∆", "£", "∑", "∂"]))
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

const partsList = [
  "Field Generator",
  "Isolinear Rods",
  "Eps Step-down Conduit",
  "Fuel Regulator",
  "Field Emitter",
  "Sensor Pallet",
  "EPS Power Node",
  "Isolinear Chips",
  "Network Adapter",
  "Fusion Generator",
  "Magnetic Coil",
  "Analog Buffer",
  "Coaxial Servo",
  "CASM Generator",
  "Computer Interface",
  "Digital Sequence Encoder",
  "Fiberoptic Wire Linkage",
  "Fusion Welder",
  "Holographic Servo Display",
  "IDC Power Cable",
  "Integrated Fluid Sensor",
  "Magnetic Bolt Fastener",
  "Power Coupling",
  "Power Splitter",
  "Prefire Chamber",
  "Residual Power Store",
  "Subspace Transceiver"
];

function randomFromList(list) {
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}
function splice(str, start, delCount, newSubStr) {
  return (
    str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount))
  );
}
