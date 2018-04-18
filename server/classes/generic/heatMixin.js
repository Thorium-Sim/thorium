export default function HeatMixin(inheritClass) {
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
    setRate(rate) {
      this.heatRate = rate;
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
