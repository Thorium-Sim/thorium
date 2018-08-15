import uuid from "uuid";

const labels = {
  "1": "LT-7211",
  "2": "YN-9128",
  "3": "PN-4815",
  "4": "UL-7720",
  "5": "HS-5807",
  "6": "IB-0826",
  "7": "BX-9801",
  "8": "GT-9106",
  "9": "TX-4219",
  "10": "KY-6210",
  "11": "WP-1022",
  "12": "JQ-2209",
  "13": "ND-2813",
  "14": "SU-8118",
  "15": "MI-4412",
  "16": "QB-1227",
  "17": "XE-0523",
  "18": "FZ-7905",
  "19": "EQ-1104",
  "20": "CG-7402",
  "21": "VT-2521",
  "22": "OC-5714",
  "23": "DP-3403",
  "24": "RF-3517"
};

const diagnosticChip = 31; // 11111

export default class Isochip {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.class = "Isochip";
    this.system = params.system || null;
    this.simulatorId = params.simulatorId || null;
    // Slot and chip numbers are based on the decimal
    // representation of the binary address
    this.slot = params.slot || -1;
    this.requiredChip = params.requiredChip || -1;
    this.chip = params.chip || 0;
    this.label = params.label || labels[this.requiredChip];
  }
  get state() {
    if (this.chip === 0) {
      return "empty";
    }
    if (this.chip === diagnosticChip) {
      return "diagnostic";
    }
    if (this.chip === this.requiredChip) {
      return "nominal";
    }
    return "invalid";
  }
  insertChip(chip) {
    this.chip = chip;
  }
  updateIsochip({ slot, requiredChip, chip, label }) {
    if (slot || slot === 0) {
      this.slot = slot;
    }
    if (requiredChip || requiredChip === 0) {
      this.requiredChip = requiredChip;
    }
    if (chip || chip === 0) {
      this.chip = chip;
    }
    if (label) this.label = label;
  }
}
