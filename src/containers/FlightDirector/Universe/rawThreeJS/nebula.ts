import {generateMaterials} from "../Nebula";
import {BoxBufferGeometry, MeshBasicMaterial, Mesh} from "three";
import loadImage from "./loadImage";
const radius = 1490000000000;

const nebulaGeometry = new BoxBufferGeometry(1, 1, 1);
let mats: MeshBasicMaterial[];

class Nebula extends Mesh {
  constructor(skyboxKey: string) {
    super(nebulaGeometry);

    this.scale.set(radius, radius, radius);
    this.generate(skyboxKey);
  }

  async generate(skyboxKey: string) {
    const bg = await loadImage(require("../stars.jpg"));

    // Let's clean up any existing objects;
    mats?.forEach(m => {
      m.map?.dispose();
      m.dispose();
    });
    mats = generateMaterials(skyboxKey, bg);
    this.material = mats;
    this.renderOrder = -100;
  }
}

export default Nebula;
