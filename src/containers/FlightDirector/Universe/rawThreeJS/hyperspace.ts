import {
  Object3D,
  Texture,
  DirectionalLight,
  PointLight,
  RepeatWrapping,
  PlaneBufferGeometry,
  SphereGeometry,
  MeshLambertMaterial,
  BackSide,
  Mesh,
  TextureLoader,
  BoxGeometry,
  BoxBufferGeometry,
  MeshBasicMaterial,
  DoubleSide,
} from "three";
import {RenderState} from "./types";

const textureLoader = new TextureLoader();

export class Hyperspace extends Object3D {
  texture: Texture;
  hyperBox: Mesh;
  constructor() {
    super();
    //HyperSpace
    const light1 = new DirectionalLight(0xff8000, 0.75);
    light1.position.set(1, 1, 5).normalize();
    this.add(light1);
    const light2 = new DirectionalLight(0xff8000, 0.75);
    light2.position.set(-1, 1, 5).normalize();
    this.add(light2);
    const light3 = new PointLight(0x44ffaa, 0.5, 25);
    light3.position.set(0, -3, 5);
    this.add(light3);
    const light4 = new PointLight(0xff4400, 0.5, 30);
    light4.position.set(3, 3, 5);
    this.add(light4);
    const light5 = new DirectionalLight(0xff8000, 0.75);
    light5.position.set(1, 1, -5).normalize();
    this.add(light5);
    const light6 = new DirectionalLight(0xff8000, 0.75);
    light6.position.set(-1, 1, -5).normalize();
    this.add(light6);
    const light7 = new PointLight(0x44ffaa, 0.5, 25);
    light7.position.set(0, -3, -5);
    this.add(light7);
    const light8 = new PointLight(0xff4400, 0.5, 30);
    light8.position.set(3, 3, -5);
    this.add(light8);

    this.texture = textureLoader.load(require("./textures/water.png"));
    this.texture.wrapT = RepeatWrapping;
    const boxGeo = new SphereGeometry(5, 32, 32);
    const boxMat = new MeshLambertMaterial({
      transparent: true,
      color: 0xffffff,
      map: this.texture,
      side: BackSide,
    });

    const blackBox = new Mesh(
      new BoxBufferGeometry(100, 100, 100),
      new MeshBasicMaterial({color: 0x000000, side: DoubleSide}),
    );
    blackBox.position.set(0, 0, -5);
    this.add(blackBox);
    this.hyperBox = new Mesh(boxGeo, boxMat);

    this.hyperBox.name = "cube";
    this.hyperBox.position.x = 0;
    this.hyperBox.position.y = 0;
    this.hyperBox.position.z = -24;
    this.hyperBox.scale.y = 5;
    this.hyperBox.scale.z = 1;
    this.hyperBox.scale.x = 1;
    this.hyperBox.rotateX(Math.PI / 2);

    const PlaneGeo = new PlaneBufferGeometry(200, 200);
    var hyperPlane1 = new Mesh(PlaneGeo, boxMat);
    var hyperPlane2 = new Mesh(PlaneGeo, boxMat);
    hyperPlane1.position.y = 5;
    hyperPlane2.position.y = -5;
    hyperPlane1.position.z = 20;
    hyperPlane2.position.z = 20;
    hyperPlane1.rotateX(Math.PI / 2 + 0.05);
    hyperPlane2.rotateX(Math.PI / 2 - 0.05);
    hyperPlane1.visible = false;
    hyperPlane2.visible = false;

    this.add(hyperPlane1);
    this.add(hyperPlane2);

    this.add(this.hyperBox);
  }
  update({delta}: RenderState) {
    this.texture.offset.y -= 0.08 * delta;
    this.texture.offset.y %= 1;
    this.texture.needsUpdate = true;
    this.hyperBox.rotateY(0.04 * delta);
  }
}
