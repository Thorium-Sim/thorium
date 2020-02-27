import {registerComponent} from "../component";
import {immerable} from "immer";
export class Appearance {
  [immerable] = true;
  static class = "Appearance";
  class = "Appearance";
  modelAsset: string;
  constructor({modelAsset}) {
    this.modelAsset = modelAsset;
  }
}

registerComponent(Appearance);
