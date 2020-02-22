import {registerComponent} from "../component";

export class Appearance {
  modelAsset: string;
  constructor({modelAsset}) {
    this.modelAsset = modelAsset;
  }
}

registerComponent(Appearance);
