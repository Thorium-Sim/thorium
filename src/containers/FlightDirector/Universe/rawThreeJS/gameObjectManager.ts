import SafeArray from "./safeArray";
import {Object3D} from "three";
import {RenderState} from "./types";

type GameObject = Object3D & {
  update: (state: RenderState) => void;
  selected?: boolean;
};
export default class GameObjectManager {
  gameObjects: SafeArray<GameObject>;
  constructor() {
    this.gameObjects = new SafeArray();
  }
  addGameObject(object: GameObject) {
    this.gameObjects.add(object);
  }
  removeGameObject(gameObject: GameObject) {
    this.gameObjects.remove(gameObject);
  }
  update(state: RenderState) {
    this.gameObjects.forEach(gameObject => gameObject.update(state));
  }
}
