import {registerComponent} from "../component";
import {immerable} from "immer";

export class SceneChild {
  [immerable] = true;
  parentId: string;
  static class = "SceneChild";
  class = "SceneChild";
  constructor({parentId}) {
    this.parentId = parentId;
  }
}

registerComponent(SceneChild);
