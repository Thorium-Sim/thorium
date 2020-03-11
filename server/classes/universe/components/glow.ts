import {registerComponent} from "../component";
import {immerable} from "immer";

enum GlowMode {
  glow = "glow",
  halo = "halo",
  shell = "shell",
}
export class Glow {
  [immerable] = true;
  static class = "Glow";
  class = "Glow";
  glowMode: GlowMode;
  color: string;
  constructor({glowMode, color}) {
    this.glowMode = glowMode || "halo";
    this.color = color || "#ffff00";
  }
}

registerComponent(Glow);
