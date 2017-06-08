import { System } from './generic';

export default class TractorBeam extends System {
  constructor(params) {
    super(params);
    this.class = 'TractorBeam';
    this.type = 'TractorBeam';
    this.name = params.name || 'Tractor Beam';
    this.state = params.state || false;
    this.target = params.target || false;
    this.strength = params.strength || 0.0;
    this.stress = params.stress || 0.15;
  }
  get stealthFactor() {
    return (this.stress / 5 + .8);
  }
  setState(tf) {
    this.state = tf;
  }
  setTarget(tf) {
    this.target = tf;
  }
  setStrength(perc) {
    this.strength = perc;
  }
  setStress(perc) {
    this.stress = perc;
  }
}