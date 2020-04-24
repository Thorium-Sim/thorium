import {registerComponent} from "../component";
import {immerable} from "immer";

export class Physical {
  [immerable] = true;
  static class = "Physical";
  class: "Physical" = "Physical";
  mass?: number; // in kilograms
  solarMass?: number; // in solar mass
  temperature?: number; // in kelvin
  volume?: number; // in meters ^ 3
  age?: number; // in years
  constructor({mass, temperature, volume, age}: Partial<Physical> = {}) {
    this.mass = mass;
    this.temperature = temperature;
    this.volume = volume;
    this.age = age;
  }
}

registerComponent(Physical);
