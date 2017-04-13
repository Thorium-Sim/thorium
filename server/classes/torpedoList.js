import { System } from './generic';
import uuid from 'uuid';

export default class Torpedo extends System {
  constructor(params) {
    super(params);
    this.class = 'Torpedo';
    this.type = 'Torpedo';
    this.name = params.name || 'Torpedo';
    this.loaded = params.loaded || false;
    this.state = params.state || 'idle';
    this.inventory = []
    const warheads = params.inventory || [];
    warheads.forEach(w => this.inventory.push(new Warhead(w)));
  }
  addWarhead(warhead){
    this.inventory.push(new Warhead(warhead));
  }
  removeWarhead(id) {
    this.inventory = this.inventory.filter(w => w.id !== id);
  }
  loadWarhead(id){
    this.loaded = id;
    this.state = 'loaded';
  }
  unload(){
    this.loaded = false;
    this.state = 'idle';
  }
  fireWarhead(){
    this.loaded = false;
    this.state = 'fired';
  }
}

class Warhead {
  constructor(params){
    this.id = params.id || uuid.v4();
    this.type = params.type || 'Photon';
    this.probe = params.probe || null;
  }
}