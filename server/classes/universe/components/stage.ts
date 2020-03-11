import {registerComponent} from "../component";
import {immerable} from "immer";

export class Stage {
  [immerable] = true;
  static class = "Stage";
  class = "Stage";
  scaleLabel: string;
  scaleLabelShort: string;
  skyboxAsset: string;
  constructor({scaleLabel, scaleLabelShort, skyboxAsset}) {
    this.scaleLabel = scaleLabel || "Meter";
    this.scaleLabelShort = scaleLabelShort || "M";
    this.skyboxAsset = skyboxAsset || "";
  }
}

registerComponent(Stage);
