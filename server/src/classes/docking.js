import { System } from "./generic";

export default class DockingPort extends System {
  constructor(params = {}) {
    super(params);
    this.class = "DockingPort";

    // Type can be 'dockingport', 'shuttlebay', or 'specialized'
    this.type = params.type || "shuttlebay";
    if (this.type === "shuttlebay") {
      this.clamps = params.clamps || true;
      this.compress = params.compress || true;
      this.doors = params.doors || true; // Doors are closed
      this.image = params.image || "/Docking Images/Default.png";
      this.docked = params.docked || true;
    } else {
      this.clamps = params.clamps || false;
      this.compress = params.compress || false;
      this.doors = params.doors || false; // Doors are closed
      this.image = params.image || "/Docking Images/Default.png";
      this.docked = params.docked || false;
    }

    this.shipName = params.shipName || "";

    this.direction = params.direction || "unspecified"; // or 'arriving' or 'departing'

    this.deckId = params.deckId || null;
    // Position on the top image of the ship. A number between 0 and 1
    // so it can be easily scaled to the size of the image if it is bigger
    // or smaller.`
    this.position = params.position || { x: 0, y: 0 };
  }
  get displayName() {
    return this.name;
  }
  set displayName(name) {
    return;
  }
  updateDockingPort({
    name,
    shipName,
    type,
    clamps,
    compress,
    doors,
    image,
    docked,
    direction,
    deckId,
    position
  }) {
    if (name || name === "") {
      this.name = name;
    }
    if (shipName || shipName === "") {
      this.shipName = shipName;
    }
    if (type) {
      this.type = type;
    }
    if (clamps || clamps === false) {
      this.clamps = clamps;
    }
    if (compress || compress === false) {
      this.compress = compress;
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
    if (direction) {
      this.direction = direction;
    }
    if (deckId || deckId === false) {
      this.deckId = deckId;
    }
    if (position) {
      this.position = position;
    }
  }
}
