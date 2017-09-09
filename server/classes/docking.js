import { System } from "./generic";

export default class DockingPort extends System {
  constructor(params) {
    super(params);
    this.class = "DockingPort";
    this.type = params.type || "shuttlebay";
    if (this.type === "shuttlebay") {
      this.clamps = params.clamps || true;
      this.ramps = params.ramps || true;
      this.doors = params.doors || true; // Doors are closed
      this.image = params.image || "/Docking Images/Default";
      this.docked = params.docked || true;
    } else {
      this.clamps = params.clamps || false;
      this.ramps = params.ramps || false;
      this.doors = params.doors || false; // Doors are closed
      this.image = params.image || "/Docking Images/Default";
      this.docked = params.docked || false;
    }
  }
  updateDockingPort({ name, type, clamps, ramps, doors, image, docked }) {
    if (name || name === "") {
      this.name = name;
    }
    if (type) {
      this.type = type;
    }
    if (clamps || clamps === false) {
      this.clamps = clamps;
    }
    if (ramps || ramps === false) {
      this.ramps = ramps;
    }
    if (doors || doors === false) {
      this.doors = doors;
    }
    if (image) {
      this.image = image;
    }
    if (docked || docked === false) {
      this.docked = docked;
    }
  }
}
