import {registerComponent} from "../component";
import {immerable} from "immer";

export enum MeshTypeEnum {
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
  ringMapAsset: string;
  cloudMapAsset: string;
  emissiveColor: string;
  emissiveIntensity: number;
  scale: number;

  constructor({
    meshType,
    modelAsset,
    materialMapAsset,
    color,
    scale = 1,
    ringMapAsset,
    cloudMapAsset,
    emissiveColor,
    emissiveIntensity,
  }: Partial<Appearance>) {
    this.meshType = meshType;
    this.modelAsset = modelAsset;
    this.materialMapAsset = materialMapAsset;
    this.ringMapAsset = ringMapAsset;
    this.cloudMapAsset = cloudMapAsset;
    this.emissiveColor = emissiveColor;
    this.emissiveIntensity = emissiveIntensity;
    this.color = color;
    this.scale = scale;
  }
}

registerComponent(Appearance);
