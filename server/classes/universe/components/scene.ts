import {registerComponent} from "../component";
import {immerable} from "immer";

// No properties - yet? - just a placeholder
// so you know this is a scene of some kind
export class Scene {
  [immerable] = true;
  static class = "Scene";
  class = "Scene";
  // constructor({}) {

  // }
}

registerComponent(Scene);
