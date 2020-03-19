import {registerComponent} from "../component";
import {immerable} from "immer";

export class StageChild {
  [immerable] = true;
  parentId: string;
  static class = "StageChild";
  class = "StageChild";
  constructor({parentId}) {
    this.parentId = parentId;
  }
}

registerComponent(StageChild);
