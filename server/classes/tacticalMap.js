class TacticalItem {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.label = params.label || "";
    this.font = params.font || "Helvetica";
    this.fontSize = params.fontSize || 12;
    this.fontColor = params.fontColor || "white";
    this.flash = params.flash || false;
    this.icon = params.icon || null;
    this.size = params.size || 1;
    this.speed = params.speed || 1;
    this.velocity = params.velocity || { x: 0, y: 0, z: 0 };
    this.location = params.location || { x: 0, y: 0, z: 0 };
    this.destination = params.destination || { x: 0, y: 0, z: 0 };
    this.wasd = params.wasd || false;
    this.ijkl = params.ijkl || false;
  }
}

class TacticalLayer {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.type = params.type || "grid";
    this.image = params.image || null;
    this.color = params.color || "rgb(0,255,0)";
    this.labels = params.labels || false;
    this.gridCols = params.gridCols || 16;
    this.gridRows = params.gridRows || 9;
    this.items = [];
    (params.items || []).forEach(i => this.items.push(new TacticalItem(i)));
  }
}
export default class TacticalMap {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Tactical Map";
    this.template = params.template || false;
    this.flight = params.flight || null;
    this.frozen = params.frozen || false;
    this.layers = [];
    (params.layers || []).forEach(l => this.layers.push(new TacticalLayer(l)));
  }
}
