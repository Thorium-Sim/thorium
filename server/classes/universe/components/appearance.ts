import {registerComponent} from "../component";
import {immerable} from "immer";
export class Appearance {
  [immerable] = true;
  modelAsset: string;
  constructor({modelAsset}) {
    this.modelAsset = modelAsset;
  }
}

registerComponent(Appearance);
