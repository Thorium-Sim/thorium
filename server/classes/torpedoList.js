import { System } from "./generic";
import uuid from "uuid";

export default class Torpedo extends System {
  constructor(params) {
    super(params);
    this.class = "Torpedo";
    this.type = "Torpedo";
    this.name = params.name || "Torpedo";
    this.loaded = params.loaded || false;
    this.state = params.state || "idle";
    this.inventory = [];
    this.stealthCompromised = false;
    const warheads = params.inventory || [
      {
        type: "Photon"
      },
      {
        type: "Photon"
      },
      {
        type: "Photon"
      },
      {
        type: "Photon"
      },
      {
        type: "Photon"
      },
      {
        type: "Photon"
      },
      {
        type: "Photon"
      },
      {
        type: "Photon"
      },
      {
        type: "Quantum"
      },
      {
        type: "Quantum"
      }
    ];
    warheads.forEach(w => this.inventory.push(new Warhead(w)));
  }
  addWarhead(warhead) {
    this.inventory.push(new Warhead(warhead));
  }
  removeWarhead(id) {
    this.inventory = this.inventory.filter(w => w.id !== id);
  }
  loadWarhead(id) {
    this.loaded = id;
    this.state = "loaded";
  }
  unload() {
    this.loaded = false;
    this.state = "idle";
  }
  setWarheadCount(type, count) {
    const torps = this.inventory.filter(i => i.type === type);
    if (torps.length > count) {
      const idList = torps.map(t => t.id);
      for (let i = torps.length - count; i > 0; i--) {
        this.removeWarhead(idList[i - 1]);
      }
    }
    if (torps.length < count) {
      for (let i = count - torps.length; i > 0; i--) {
        this.addWarhead({ type: type });
      }
    }
  }
  fireWarhead() {
    //Remove the loaded warhead from inventory
    this.removeWarhead(this.loaded);
    this.loaded = false;
    this.state = "fired";
    this.stealthCompromised = true;
    setTimeout(() => (this.stealthCompromised = false), 10 * 1000);
  }
}

class Warhead {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.type = params.type || "Photon";
    this.probe = params.probe || null;
  }
}
