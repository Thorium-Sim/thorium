import uuid from 'uuid';

const defaultPower = {
  power: 5,
  powerLevels: [5],
};

const defaultDamage = {
  damaged: false,
  report: null,
  requested: false,
  reactivationCode: null,
  reactivationRequester: null,
  neededReactivationCode: null
};

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
  }
}

export class System {
  constructor(params = {}) {
    this.id = params.id || uuid.v4();
    this.simulatorId = params.simulatorId || null;
    this.name = params.name || null;
    this.displayName = params.displayName || params.name;
    this.power = params.power || defaultPower;
    this.damage = params.damage || defaultDamage
  }
  get stealthFactor() {
    return null;
  }
  setPower(powerLevel) {
    this.power.power = powerLevel;
  }
  break(report) {
    // TODO: Generate the damage report if
    // The report is null or blank.
    this.damage.damaged = true;
    this.damage.report = this.processReport(report);
    this.damage.requested = false;
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
    const partMatches = report.match(/#PART/ig) || [];
    partMatches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, '');
      const part = randomFromList(partsList);
      returnReport = splice(returnReport, index, 0, part);
    });
    
    // #COLOR
    const colorMatches = report.match(/#COLOR/ig) || [];
    colorMatches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, '');
      returnReport = splice(returnReport, index, 0, randomFromList(['red','blue','green','yellow']));
    });

    // #[1 - 2]
    const matches = returnReport.match(/#\[ ?([0-9]+) ?- ?([0-9]+) ?\]/ig) || [];
    matches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, '');
      const numbers = m.replace(/[ [\]#]/gi, '').split('-');
      const num = Math.round(Math.random() * numbers[1] + numbers[0]);
      returnReport = splice(returnReport, index, 0, num);
    })  

    // #["String1", "String2", "String3", etc.]
    const stringMatches = returnReport.match(/#\[ ?("|')[^\]]*("|') ?]/ig) || [];
    stringMatches.forEach(m => {
      const index = returnReport.indexOf(m);
      returnReport = returnReport.replace(m, '');
      const strings = m.match(/"(.*?)"/gi);
      returnReport = splice(returnReport, index, 0, randomFromList(strings).replace(/"/gi, ""));
    })
    
    // #REACTIVATIONCODE
    if (report.indexOf('#REACTIVATIONCODE') > -1) {
      const reactivationCode = Array(8).fill('').map(_ => randomFromList(['¥','Ω','∏','-','§','∆','£','∑','∂'])).join('');
      this.damage.neededReactivationCode = reactivationCode;
      returnReport = returnReport.replace(/#REACTIVATIONCODE/ig, reactivationCode);
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
"Subspace Transceiver",
]

function randomFromList(list) {
  const length = list.length;
  const index = Math.floor(Math.random() * length);
  return list[index];
}
function splice(str, start, delCount, newSubStr) {
  return str.slice(0, start) + newSubStr + str.slice(start + Math.abs(delCount));
}

