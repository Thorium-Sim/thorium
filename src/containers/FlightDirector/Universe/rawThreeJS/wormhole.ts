import {Object3D, TextureLoader, SpriteMaterial, Sprite} from "three";
import {RenderState} from "./types";

const textureLoader = new TextureLoader();
const materials = [
  require("./textures/wormhole1.png"),
  require("./textures/wormhole2.png"),
  require("./textures/wormhole3.png"),
  require("./textures/wormhole4.png"),
];
export class Wormhole extends Object3D {
  mesh1: Sprite;
  mesh2: Sprite;
  mesh3: Sprite;
  mesh4: Sprite;
  constructor() {
    super();

    const texture1 = textureLoader.load(materials[0]);
    const material1 = new SpriteMaterial({map: texture1, depthTest: false});
    this.mesh1 = new Sprite(material1);
    this.mesh1.position.z = 0.003;
    this.mesh1.renderOrder = 0;
    this.add(this.mesh1);
    const texture2 = textureLoader.load(materials[1]);
    const material2 = new SpriteMaterial({map: texture2, depthTest: false});
    this.mesh2 = new Sprite(material2);
    this.mesh2.position.z = 0.002;
    this.mesh2.renderOrder = 1;

    this.add(this.mesh2);
    const texture3 = textureLoader.load(materials[2]);
    const material3 = new SpriteMaterial({map: texture3, depthTest: false});
    this.mesh3 = new Sprite(material3);
    this.mesh3.scale.set(0.5, 0.5, 1);
    this.mesh3.renderOrder = 2;

    this.add(this.mesh3);
    const texture4 = textureLoader.load(materials[3]);
    const material4 = new SpriteMaterial({map: texture4, depthTest: false});
    this.mesh4 = new Sprite(material4);
    this.mesh4.scale.set(0.125, 0.125, 1);
    this.mesh4.position.z = 0.001;
    this.mesh4.renderOrder = 4;

    this.add(this.mesh4);
  }
  update({delta}: RenderState) {
    this.mesh1.material.rotation += 0.2 * delta;
    this.mesh2.material.rotation -= 0.2 * delta;
    this.mesh3.material.rotation += 0.7 * delta;
    this.mesh4.material.rotation -= 0.7 * delta;
  }
}
