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
  get stealthTractorBeamFactor() {
    return (this.stress / 5 + .8);
  }
  setTractorBeamState(tf) {
    this.state = tf;
  }
  setTractorBeamTarget(tf) {
    this.target = tf;
  }
  setTractorBeamStrength(perc) {
    this.strength = perc;
  }
  setTractorBeamStress(perc) {
    this.stress = perc;
  }
}