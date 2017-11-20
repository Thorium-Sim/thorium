import uuid from "uuid";
class TacticalItem {
  constructor(params) {
    this.id = params.dup ? uuid.v4() : params.id || uuid.v4();
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
    wasd,
    ijkl
  }) {
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
    if (wasd || wasd === false) this.wasd = wasd;
    if (ijkl || ijkl === false) this.ijkl = ijkl;
  }
}

class TacticalLayer {
  constructor(params) {
    this.id = params.dup ? uuid.v4() : params.id || uuid.v4();
    this.name = params.name || "Layer";
    this.type = params.type || "grid";
    this.image = params.image || null;
    this.color = params.color || "#00ff00";
    this.labels = params.labels || false;
    this.gridCols = params.gridCols || 16;
    this.gridRows = params.gridRows || 9;
    this.items = [];
    (params.items || []).forEach(i =>
      this.items.push(
        new TacticalItem(Object.assign({}, i, { dup: params.dup }))
      )
    );
  }
  update({ type, image, color, labels, gridCols, gridRows }) {
    if (type) this.type = type;
    if (image || image === null) this.image = image;
    if (color || color === 0) this.color = color;
    if (labels || labels === false) this.labels = labels;
    if (gridCols || gridCols === 0) this.gridCols = gridCols;
    if (gridRows || gridRows === 0) this.gridRows = gridRows;
  }
  addItem(item) {
    this.items.push(new TacticalItem(item));
  }
  updateItem(item) {
    console.log(item);
    const itemObj = this.items.find(i => i.id === item.id);
    itemObj && itemObj.update(item);
  }
  removeItem(itemId) {
    this.items = this.items.filter(i => i.id !== itemId);
  }
}
export default class TacticalMap {
  constructor(params) {
    this.id = params.id || uuid.v4();
    this.name = params.name || "Tactical Map";
    this.template = params.template || false;
    this.flightId = params.flightId || null;
    this.frozen = params.frozen || false;
    this.layers = [];
    (params.layers || []).forEach(l =>
      this.layers.push(
        new TacticalLayer(Object.assign({}, l, { dup: params.dup }))
      )
    );
  }
  addLayer(layer) {
    this.layers.push(new TacticalLayer(layer));
  }
  removeLayer(id) {
    this.layers = this.layers.filter(l => l.id !== id);
  }
  updateLayer(layer) {
    this.layers.find(l => l.id === layer.id).update(layer);
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
      order
    );
  }
  removeLayer(layerId) {
    this.layers = this.layers.filter(l => l.id !== layerId);
  }
  addItemToLayer(layerId, item) {
    this.layers.find(l => l.id === layerId).addItem(item);
  }
  updateItemInLayer(layerId, item) {
    this.layers.find(l => l.id === layerId).updateItem(item);
  }
  removeItemFromLayer(layerId, itemId) {
    this.layers.find(l => l.id === layerId).removeItem(itemId);
  }
  freeze(tf) {
    this.frozen = tf;
  }
}
