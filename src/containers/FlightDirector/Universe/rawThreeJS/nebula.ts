import {generateMaterials} from "../Nebula";
import {BoxBufferGeometry, MeshBasicMaterial, Mesh} from "three";
import loadImage from "./loadImage";
const radius = 1490000000000;

interface Textures {
  front: any;
  back: any;
  top: any;
  bottom: any;
  left: any;
  right: any;
}

const nebulaGeometry = new BoxBufferGeometry(1, 1, 1);
let mats: MeshBasicMaterial[];
async function generateNebula(skyboxKey: string) {
  const bg = await loadImage(require("../stars.jpg"));

  // Let's clean up any existing objects;
  mats?.forEach(m => {
    m.map?.dispose();
    m.dispose();
  });
  mats = generateMaterials(skyboxKey, bg);
  const mesh = new Mesh(nebulaGeometry);
  mesh.material = mats;
  mesh.scale.set(radius, radius, radius);

  return mesh;
}

export default generateNebula;
