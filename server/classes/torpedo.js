import { System } from './generic';
export default class Torpedo extends System {
  constructor(params) {
    super(params);
    this.class = 'Torpedo';
    this.type = 'Torpedo';
    this.name = params.name || 'Torpedo';
    this.loaded = params.loaded || '';
    this.state = params.state || 'idle';
    this.inventory = params.inventory || {photon: 20, quantum: 10};
  }
}