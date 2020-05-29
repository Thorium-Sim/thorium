import {generateMaterials} from "../Nebula";
import {BoxBufferGeometry, MeshBasicMaterial, Mesh, Group} from "three";
import loadImage from "./loadImage";
import {RenderState} from "./types";
const radius = 1490000000000;

const nebulaGeometry = new BoxBufferGeometry(1, 1, 1);

class Nebula extends Group {
  activeMesh: Mesh;
  inactiveMesh: Mesh;
  t: number = 0;
  constructor(skyboxKey: string) {
    super();
    this.activeMesh = new Mesh(nebulaGeometry);
    this.activeMesh.scale.set(radius, radius, radius);
    this.inactiveMesh = new Mesh(nebulaGeometry);
    this.inactiveMesh.scale.set(radius + 10, radius + 10, radius + 10);
    this.add(this.activeMesh);
    this.add(this.inactiveMesh);
    this.generate(skyboxKey);
  }

  async generate(skyboxKey: string) {
    const bg = await loadImage(require("../stars.jpg"));

    this.t = 0;
    // Let's clean up any existing objects;
    if (Array.isArray(this.inactiveMesh.material)) {
      this.inactiveMesh.material?.forEach(m => {
        const mat = m as MeshBasicMaterial;
        mat.map?.dispose();
        mat.dispose();
      });
    } else {
      const mat = this.inactiveMesh.material as MeshBasicMaterial;
      mat?.map?.dispose();
      mat?.dispose();
    }
    const tempMesh = this.activeMesh;
    this.activeMesh = this.inactiveMesh;
    this.inactiveMesh = tempMesh;

    const mats = generateMaterials(skyboxKey, bg).map(m => {
      m.transparent = true;
      m.opacity = 1;
      return m;
    });
    this.activeMesh.material = mats;
    this.activeMesh.renderOrder = -100;
    this.inactiveMesh.renderOrder = -101;
  }
  update({delta}: RenderState) {
    if (this.t < 1) {
      this.t += delta / 10;
      if (Array.isArray(this.activeMesh.material)) {
        this.activeMesh.material.forEach(m => {
          m.opacity = this.t;
        });
      } else {
        this.activeMesh.material.opacity = this.t;
      }

      if (Array.isArray(this.inactiveMesh.material)) {
        this.inactiveMesh.material.forEach(m => {
          m.opacity = Math.abs(1 - this.t);
        });
      } else {
        this.inactiveMesh.material.opacity = Math.abs(1 - this.t);
      }
    }
  }
}

export default Nebula;
