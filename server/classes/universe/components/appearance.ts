import {registerComponent} from "../component";
import {immerable} from "immer";

enum MeshTypeEnum {
  sphere = "sphere",
  cube = "cube",
  model = "model",
  sprite = "sprite",
}
export class Appearance {
  [immerable] = true;
  static class = "Appearance";
  class = "Appearance";
  color: string;
  meshType: MeshTypeEnum;
  modelAsset: string;
  materialMapAsset: string;

  constructor({meshType, modelAsset, materialMapAsset, color}) {
    this.meshType = meshType;
    this.modelAsset = modelAsset;
    this.materialMapAsset = materialMapAsset;
    this.color = color;
  }
}

registerComponent(Appearance);
