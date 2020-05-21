import {Mesh, GridHelper} from "three";
import {calculateGrid} from "../Grid";
import getOrthoCamera from "./orthoCamera";

class Grid extends GridHelper {
  dimensions: DOMRect;
  frameRef: string = "";
  constructor(dimensions: DOMRect) {
    super(100, 100);
    this.dimensions = dimensions;
    this.rotation.set(Math.PI / 2, 0, 0);
  }
  update() {
    const camera = getOrthoCamera();
    const {
      zoom,
      position: {x, y},
    } = camera;
    const {width, height} = this.dimensions;
    if (`${zoom},${x},${y}` === this.frameRef) return;

    this.frameRef = `${zoom},${x},${y}`;
    const geo = calculateGrid({width, height, zoom, x, y});
    this.geometry = geo;
  }
}

export default Grid;
