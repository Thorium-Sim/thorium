import {
  Object3D,
  Texture,
  DirectionalLight,
  PointLight,
  RepeatWrapping,
  SphereGeometry,
  MeshLambertMaterial,
  BackSide,
  Mesh,
  TextureLoader,
} from "three";
import {RenderState} from "./types";

const textureLoader = new TextureLoader();

export class Hyperspace extends Object3D {
  texture: Texture;
  hyperBox: Mesh;
  constructor() {
    super();
    //HyperSpace
    const light1 = new DirectionalLight(0xc08040, 0.25);
    light1.position.set(0, 0, 5).normalize();
    this.add(light1.target);
    this.add(light1);
    const light2 = new PointLight(0xa581c3, 0.5, 5000, 4);
    light2.position.set(0, 0, 0);
    this.add(light2);
    const light3 = new PointLight(0x479773, 0.75, 5000);
    light3.position.set(-2500, -2500, -2500);
    this.add(light3);
    const light5 = new DirectionalLight(0xc08040, 0.75);
    light5.position.set(0, 0, -5).normalize();
    this.add(light5.target);
    this.add(light5);
    const light7 = new PointLight(0x479773, 0.75, 5000);
    light7.position.set(2500, 2500, 2500);
    this.add(light7);

    this.texture = textureLoader.load(require("./textures/water copy.jpg"));
    this.texture.wrapT = RepeatWrapping;
    this.texture.wrapS = RepeatWrapping;
    const boxGeo = new SphereGeometry(5, 32, 32);
    const boxMat = new MeshLambertMaterial({
      transparent: true,
      color: 0xffffff,
      map: this.texture,
      side: BackSide,
    });

    this.hyperBox = new Mesh(boxGeo, boxMat);

    this.hyperBox.name = "cube";
    this.hyperBox.scale.y = 1500;
    this.hyperBox.scale.z = 300;
    this.hyperBox.scale.x = 300;
    this.hyperBox.rotateX(Math.PI / 2);

    this.add(this.hyperBox);
  }
  update({delta}: RenderState) {
    this.texture.offset.y -= 0.1 * delta;
    this.texture.offset.x -= 0.01 * delta;
    this.texture.offset.y %= 1;
    this.texture.offset.x %= 1;
    // this.texture.needsUpdate = true;
  }
}
