import uuid from "uuid";
type Coordinate = {x: number; y: number; z: number};
class TacticalPath {
  id: string;
  start: Coordinate;
  end: Coordinate;
  c1: Coordinate;
  c2: Coordinate;
  color: string;
  width: number;
  arrow: boolean;
  constructor(params) {
    this.id = params.dup ? uuid.v4() : params.id || uuid.v4();
    this.start = params.start || {x: 450, y: 50, z: 0};
    this.end = params.end || {x: 150, y: 450, z: 0};
    this.c1 = params.c1 || {x: 150, y: 100, z: 0};
    this.c2 = params.c2 || {x: 200, y: 250, z: 0};
    this.color = params.color || "white";
    this.width = params.width || 5;
    this.arrow = params.arrow || false;
  }
  update({start, end, c1, c2, color, width, arrow}) {
    if (start) this.start = start;
    if (end) this.end = end;
    if (c1) this.c1 = c1;
    if (c2) this.c2 = c2;
    if (color) this.color = color;
    if (width) this.width = width;
    if (arrow || arrow === false) this.arrow = arrow;
  }
}

const thrusterControls = {
  rotation: "",
  reversed: false,
  matchRotation: true,
  up: "",
  down: "",
  left: "",
  right: "",
};

class TacticalItem {
  id: string;
  label: string;
  font: string;
  fontSize: number;
  fontColor: string;
  flash: boolean;
  icon: string | null;
  size: number;
  speed: number;
  velocity: Coordinate;
  location: Coordinate;
  destination: Coordinate;
  opacity: number;
  rotation: number;
  wasd: boolean;
  ijkl: boolean;
  thrusters: boolean;
  thrusterControls: typeof thrusterControls;
  rotationMatch: unknown;
  constructor(params) {
    this.id = params.dup ? uuid.v4() : params.id || uuid.v4();
    this.label = params.label || "";
    this.font = params.font || "Helvetica";
    this.fontSize = params.fontSize || 12;
    this.fontColor = params.fontColor || "white";
    this.flash = params.flash || false;
    this.icon = params.icon || null;
    this.size = params.size || 1;
    this.speed = params.speed || 1000;
    this.velocity = params.velocity || {x: 0, y: 0, z: 0};
    this.location = params.location || {x: 0, y: 0, z: 0};
    this.destination = params.destination || {x: 0, y: 0, z: 0};
    this.opacity = params.opacity === 0 ? 0 : params.opacity || 1;
    this.rotation = params.rotation || 0;
    this.wasd = params.wasd || false;
    this.ijkl = params.ijkl || false;
    this.thrusters = params.thrusters || false;
    this.thrusterControls = params.thrusterControls || {...thrusterControls};
  }
  update({
    label,
    font,
    fontSize,
    fontColor,
    flash,
    icon,
    size,
    speed,
    velocity,
    location,
    destination,
    opacity,
    rotation,
    wasd,
    ijkl,
    thrusters,
    rotationMatch,
    thrusterControls,
  }: Partial<TacticalItem>) {
    if (label || label === null || label === "") this.label = label;
    if (font) this.font = font;
    if (fontSize) this.fontSize = fontSize;
    if (fontColor) this.fontColor = fontColor;
    if (flash || flash === false) this.flash = flash;
    if (icon || icon === "") this.icon = icon;
    if (size) this.size = size;
    if (speed || speed === 0) this.speed = speed;
    if (velocity) this.velocity = velocity;
    if (location) this.location = location;
    if (destination) this.destination = destination;
    if (opacity || opacity === 0) this.opacity = opacity;
    if (rotation || rotation === 0) this.rotation = rotation;
    if (wasd || wasd === false) this.wasd = wasd;
    if (ijkl || ijkl === false) this.ijkl = ijkl;
    if (thrusters || thrusters === false) this.thrusters = thrusters;
    if (rotationMatch || rotationMatch === false)
      this.rotationMatch = rotationMatch;
    if (thrusterControls) {
      this.thrusterControls = thrusterControls;
      // if the speed is set to instant, change it to a reasonable speed
      if (this.speed >= 1000) {
        this.speed = 0.05;
      }
    }
  }
}

class TacticalLayer {
  id: string;
  name: string;
  type: string;
  image: string | null;
  color: string;
  labels: boolean;
  gridCols: number;
  gridRows: number;
  advance: boolean;
  asset: string;
  autoplay: boolean;
  loop: boolean;
  playbackSpeed: number;
  opacity: number;
  items: TacticalItem[];
  paths: TacticalPath[];
  constructor(params: Partial<TacticalLayer> & {dup?: boolean} = {}) {
    this.id = params.dup ? uuid.v4() : params.id || uuid.v4();
    this.name = params.name || "Layer";
    this.type = params.type || "grid";
    this.image = params.image || null;
    this.color = params.color || "#00ff00";
    this.labels = params.labels || false;
    this.gridCols = params.gridCols || 16;
    this.gridRows = params.gridRows || 9;
    this.advance = params.advance || false;
    this.asset = params.asset || "";
    this.autoplay = params.autoplay ?? true;
    this.loop = params.loop || false;
    this.playbackSpeed = params.playbackSpeed || 1;
    this.opacity = params.opacity === 0 ? 0 : params.opacity || 1;
    this.items = [];
    this.paths = [];
    (params.items || []).forEach(i =>
      this.items.push(
        new TacticalItem(Object.assign({}, i, {dup: params.dup})),
      ),
    );
    (params.paths || []).forEach(i =>
      this.paths.push(
        new TacticalPath(Object.assign({}, i, {dup: params.dup})),
      ),
    );
  }
  update({
    type,
    image,
    color,
    labels,
    gridCols,
    gridRows,
    advance,
    asset,
    autoplay,
    loop,
    playbackSpeed,
    opacity,
  }) {
    if (type) this.type = type;
    if (image || image === null) this.image = image;
    if (color || color === 0) this.color = color;
    if (labels || labels === false) this.labels = labels;
    if (gridCols || gridCols === 0) this.gridCols = gridCols;
    if (gridRows || gridRows === 0) this.gridRows = gridRows;
    if (advance || advance === false) this.advance = advance;
    if (asset || asset === "") this.asset = asset;
    if (autoplay || autoplay === false) this.autoplay = autoplay;
    if (loop || loop === false) this.loop = loop;
    if (playbackSpeed || playbackSpeed === 0)
      this.playbackSpeed = playbackSpeed;
    if (opacity || opacity === 0) this.opacity = opacity;
  }
  addItem(item) {
    this.items.push(new TacticalItem(item));
  }
  updateItem(item) {
    const itemObj = this.items.find(i => i.id === item.id);
    itemObj && itemObj.update(item);
  }
  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
  }

  addPath(path) {
    this.paths.push(new TacticalPath(path));
  }
  updatePath(path) {
    const pathObj = this.paths.find(i => i.id === path.id);
    pathObj && pathObj.update(path);
  }
  removePath(pathId) {
    this.paths = this.paths.filter(i => i.id !== pathId);
  }
}
export default class TacticalMap {
  id: string;
  class: "TacticalMap";
  name: string;
  template: boolean;
  templateId: string | null;
  flightId: string | null;
  frozen: boolean;
  layers: TacticalLayer[];
  interval: number;
  constructor(params: Partial<TacticalMap & {dup: boolean}>) {
    this.id = params.id || uuid.v4();
    this.class = "TacticalMap";
    this.name = params.name || "Tactical Map";
    this.template = params.template || false;
    this.templateId = params.templateId || null;
    this.flightId = params.flightId || null;
    this.frozen = params.frozen || false;
    this.layers = [];
    this.interval = params.interval || 1000 / 20;
    (params.layers || []).forEach(l =>
      this.layers.push(
        new TacticalLayer(Object.assign({}, l, {dup: params.dup})),
      ),
    );
  }
  addLayer(layer) {
    this.layers.push(new TacticalLayer(layer));
  }
  removeLayer(id) {
    this.layers = this.layers.filter(l => l.id !== id);
  }
  updateLayer(layer) {
    this.layers.find(l => l.id === layer.id)?.update(layer);
  }
  reorderLayer(layer, order) {
    function move(array, oldIndex, newIndex) {
      if (newIndex >= array.length) {
        let k = newIndex - array.length;
        while (k-- + 1) {
          array.push(undefined);
        }
      }
      array.splice(newIndex, 0, array.splice(oldIndex, 1)[0]);
      return array; // for testing purposes
    }
    this.layers = move(
      this.layers,
      this.layers.findIndex(t => t.id === layer),
      order,
    );
  }
  addItemToLayer(layerId, item) {
    const layer = this.layers.find(l => l.id === layerId);
    if (!layer) throw new Error("Layer not found");
    layer.addItem(item);
  }
  updateItemInLayer(layerId, item) {
    const layer = this.layers.find(l => l.id === layerId);
    if (!layer) throw new Error("Layer not found");
    layer.updateItem(item);
  }
  removeItemFromLayer(layerId, itemId) {
    const layer = this.layers.find(l => l.id === layerId);
    if (!layer) throw new Error("Layer not found");
    layer.removeItem(itemId);
  }

  addPathToLayer(layerId, path) {
    const layer = this.layers.find(l => l.id === layerId);
    if (!layer) throw new Error("Layer not found");
    layer.addPath(path);
  }
  updatePathInLayer(layerId, path) {
    const layer = this.layers.find(l => l.id === layerId);
    if (!layer) throw new Error("Layer not found");
    layer.updatePath(path);
  }
  removePathFromLayer(layerId, pathId) {
    const layer = this.layers.find(l => l.id === layerId);
    if (!layer) throw new Error("Layer not found");
    layer.removePath(pathId);
  }
  freeze(tf) {
    this.frozen = tf;
  }
}
