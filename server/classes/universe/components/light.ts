import {registerComponent} from "../component";
import {immerable} from "immer";

export class Light {
  [immerable] = true;
  static class = "Light";
  class = "Light";
  intensity: number;
  decay: number;
  color: string;
  constructor({intensity, decay, color}: Partial<Light>) {
    this.intensity = intensity ?? 1;
    this.decay = decay ?? 1;
    this.color = color || "#ffffff";
  }
}

registerComponent(Light);
