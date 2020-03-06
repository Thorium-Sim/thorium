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
  scale: number;

  constructor({meshType, modelAsset, materialMapAsset, color, scale = 1}) {
    this.meshType = meshType;
    this.modelAsset = modelAsset;
    this.materialMapAsset = materialMapAsset;
    this.color = color;
    this.scale = scale;
  }
}

registerComponent(Appearance);
