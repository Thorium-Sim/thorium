import { System } from "./generic";
import HeatMixin from "./generic/heatMixin";

const efficiencies = [
  {
    label: "Overload",
    color: "danger",
    efficiency: 1.25
  },
  {
    label: "Cruise",
    color: "primary",
    efficiency: 1
  },
  {
    label: "Silent Running",
    color: "cloak",
    efficiency: 0.87
  },
  {
    label: "Reduced",
    color: "default",
    efficiency: 0.5
  },
  {
    label: "Auxilliary",
    color: "info",
    efficiency: 0.38
  },
  {
    label: "Minimal",
    color: "warning",
    efficiency: 0.27
  },
  {
    label: "Power Down",
    color: "danger",
    efficiency: 0
  },
  {
    label: "External Power",
    color: "success"
  }
];

export default class Reactor extends HeatMixin(System) {
  constructor(params = {}) {
    super(params);
    this.class = "Reactor";
    this.type = "Reactor";
    this.name = params.name || "Reactor";
    this.ejected = params.ejected || false;
    this.model = params.model || "reactor";
    this.powerOutput = params.powerOutput || 120;
    this.efficiency = params.efficiency || 1;
    this.externalPower = params.externalPower || true;
    this.batteryChargeLevel = params.batteryChargeLevel || 1;
    this.batteryChargeRate = params.batteryChargeRate || 1 / 1000;
    this.efficiencies = params.efficiencies || [...efficiencies];
    this.depletion = params.depletion || 0;
    if (this.model === "battery") {
      this.heat = null;
      this.coolant = null;
      this.heatRate = null;
    }

    // For Dilithium Stress
    const alpha = Math.round(Math.random() * 100);
    const beta = Math.round(Math.random() * 100);
    this.alphaLevel = params.alphaLevel || alpha;
    this.betaLevel = params.betaLevel || beta;
    this.alphaTarget = params.alphaTarget || alpha;
    this.betaTarget = params.betaTarget || beta;
    this.alerted = params.alerted || false;
  }
  get stealthFactor() {
    if (this.ejected) return 0;
    if (this.model === "battery") return 0.1;
    return Math.min(1, Math.max(this.efficiency - 1, 0));
  }
  eject(tf = true) {
    this.ejected = tf;
  }
  changeModel(model) {
    this.model = model;
  }
  changeOutput(output) {
    this.powerOutput = output;
  }
  updateEfficiencies(e) {
    this.efficiencies = e;
  }
  changeEfficiency(efficiency) {
    if (!efficiency && efficiency !== 0) {
      this.externalPower = true;
      this.efficiency = 1.5;
    } else {
      this.externalPower = false;
      this.efficiency = efficiency;
    }
  }
  changeBatteryChargeLevel(level) {
    this.batteryChargeLevel = Math.min(1, Math.max(0, level));
  }
  changeBatteryChargeRate(rate) {
    this.batteryChargeRate = rate;
  }
  setDepletion(value) {
    this.depletion = value;
  }
  updateDilithiumStress({ alphaLevel, betaLevel, alphaTarget, betaTarget }) {
    if (alphaLevel || alphaLevel === 0) this.alphaLevel = alphaLevel;
    if (betaLevel || betaLevel === 0) this.betaLevel = betaLevel;
    if (alphaTarget || alphaTarget === 0) this.alphaTarget = alphaTarget;
    if (betaTarget || betaTarget === 0) this.betaTarget = betaTarget;
  }
}
